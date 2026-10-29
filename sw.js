const CACHE_NAME = "life-tracker-v5";
// Everything the app needs to open with no internet, including React and Recharts, which used to load from a CDN.
const ASSETS = [
  "./", "./index.html", "./app.bundle.js", "./manifest.json", "./icon-192.png", "./icon-512.png",
  "./vendor/react.production.min.js", "./vendor/react-dom.production.min.js", "./vendor/prop-types.min.js", "./vendor/Recharts.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first for THIS APP'S OWN files only, with { cache: "no-store" } to bypass
// the browser's own HTTP cache (GitHub Pages' cache-control headers can otherwise
// hand back a stale file for several minutes after a real deploy).
//
// Critically: cross-origin requests (the iCloud calendar feed, Google Calendar,
// the React/Recharts/pdf.js CDN scripts) are left completely alone and never
// reach event.respondWith(). Re-fetching a cross-origin request from inside the
// service worker's own context can fail CORS even when the page's own fetch()
// call succeeds — and this handler's catch-fallback was silently serving back
// index.html in that case, which then got parsed as if it were calendar data
// and produced a "successful" sync with zero real events. Only ever intercept
// this app's own same-origin files.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // not ours — don't touch it

  // Network first, so a new version shows as soon as it is online. If the network fails, or takes
  // more than 4 seconds (weak signal), fall back to the saved copy so the app still opens.
  const fromCache = () => caches.match(event.request, { ignoreSearch: true }).then((cached) => cached || caches.match("./index.html"));
  event.respondWith(
    new Promise((resolve) => {
      let settled = false;
      const timer = setTimeout(() => { if (!settled) fromCache().then((c) => { if (c && !settled) { settled = true; resolve(c); } }); }, 4000);
      fetch(event.request, { cache: "no-store" })
        .then((response) => {
          if (settled) return response;
          settled = true; clearTimeout(timer);
          if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {}); }
          resolve(response);
        })
        .catch(() => { if (settled) return; settled = true; clearTimeout(timer); fromCache().then(resolve); });
    })
  );
});
