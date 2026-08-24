const CACHE_NAME = "life-tracker-v4";
const ASSETS = ["./", "./index.html", "./app.bundle.js", "./manifest.json"];

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

  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
