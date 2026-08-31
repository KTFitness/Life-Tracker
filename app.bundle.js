(() => {
  // tracker-standalone.tsx
  var React = window.React;
  var { useState, useEffect, useCallback, useRef } = window.React;
  var { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } = window.Recharts;
  var COLORS = {
    bg: "#FAF6EE",
    card: "#FFFFFF",
    ink: "#2B2A28",
    inkSoft: "#6B6459",
    green: "#3E5641",
    greenSoft: "#EAF0EA",
    clay: "#B9714B",
    claySoft: "#F5E7DE",
    gold: "#C9A961",
    olive: "#6E7F4E",
    slate: "#5B7C8C",
    plum: "#6B5B7A",
    line: "#E7E0D2",
    danger: "#A0453A"
  };
  var POOL_CATEGORIES = [
    { key: "sewing", label: "Sewing", color: "clay" },
    { key: "life", label: "General life", color: "green" },
    { key: "food", label: "Grocery Shopping", color: "olive" },
    { key: "dogs", label: "Holly & Ruby", color: "slate" },
    { key: "purchases", label: "To Purchase", color: "plum" },
    { key: "tracker", label: "Tracker", color: "gold" }
  ];
  var ZIIP_PLAN = /* @__PURE__ */ (() => {
    const cycle = [
      { t: [["Glow Renewal", 10], ["Tone Balancer", 4]] },
      // day1
      { rest: true },
      { t: [["Barrier Boost", 6], ["Eyes", 2], ["Glow Renewal", 10]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Barrier Boost", 6], ["Eyes", 2], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Glow Renewal", 10]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Barrier Boost", 6], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Pigmentation", 1]] },
      { rest: true },
      { t: [["Barrier Boost", 6], ["Pigmentation", 1]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Barrier Boost", 6], ["Calm", 1]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Tone Balancer", 4]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Pigmentation", 1]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Pigmentation", 1]] },
      { rest: true },
      { t: [["Glow Renewal", 10], ["Eyes", 2], ["Tone Balancer", 4]] },
      { t: [["Glow Renewal", 10], ["Eyes", 2], ["Tone Balancer", 4]] }
    ];
    return cycle;
  })();
  var WEEKLY_SKIN_DEFAULT = {
    1: {
      // Monday
      label: "Monday \u2014 Vit C / Retinoid",
      am: [
        { id: "cleanse", label: "Cleanser", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine", "Korres Probiotic Foaming Cleansing Wash"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "vitc", label: "Vitamin C", options: ["La Roche-Posay Pure Vitamin C10", "SkinCeuticals C E Ferulic", "Mario Badescu Vitamin C Serum", "Lanc\xF4me R\xE9nergie H.C.F. Triple Serum"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Azelaic + NIOD SDSM Mist + Elemis Future Restore"] },
        { id: "eye", label: "Eye", options: ["Eye Environ Youth EssentiA Eye", "Viviology Retinal Eye Cipher", "The Anomaly", "Allies of Skin Peptides & Omegas Firming Eye Cream", "RoC Retinol Correxion Eye"] },
        { id: "moist", label: "Moisturiser", options: ["Mix", "Embryolisse Lait-Cr\xE8me", "Elemis Marine Cream", "Elemis Morning Matrix", "Mecca Morphosis Gel Cream", "Origins Ginzing", "Summer Fridays Cloud Dew", "Malin+Goetz Vitamin E Moisturizer"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["NIOD Neck Elasticity Catalyst + Elemis Neck & D\xE9collet\xE9 Balm (over NEC)"] }
      ],
      pm: [
        { id: "cleanse1", label: "1st Cleanse", options: ["Emma Lewisham Oil"] },
        { id: "cleanse2", label: "2nd Cleanse", options: ["Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid", options: ["Retrieve Tretinoin 0.05%"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "barrier", label: "Barrier support", options: ["Cicaplast B5 Serum", "Cicaplast B5 Balm (if skin is tender)", "Emma Lewisham Supernatural Vitale Face Elixir (*on very dry nights, use over moisturiser as a seal)", "Emma Lewisham Supernatural Face Oil"] },
        { id: "moist", label: "Moisturiser", options: ["Elemis Overnight Matrix", "Youth to the People Adaptogen Deep Moisture Cream"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest Serum (daily)", options: ["NIOD Neck Elasticity Catalyst"] }
      ]
    },
    2: {
      // Tuesday
      label: "Tuesday \u2014 Exfoliating masque / Treatment serum",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "masque", label: "Clay/exfoliating masque (after cleanse/before FCAS) + hair mask", options: ["Kiehl's Rare Earth", "NIOD Flavanone Mud", "+ Moisturising Hair Mask"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "niacinamide", label: "Niacinamide", options: ["La Roche-Posay Niacinamide 10", "Paula's Choice Niacinamide"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "treatment", label: "Treatment serum", options: ["Naturium Tranexamic Topical Acid 5%"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "repair", label: "Repair serum", options: ["Copper Peptides"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    },
    3: {
      // Wednesday
      label: "Wednesday \u2014 Vit C / Retinoid (alt)",
      am: [
        // ⚠ Source document had two overlapping text boxes for this day —
        // Kirsty flagged it as unclear. Best reading below; check/edit via the
        // Skin page editor.
        { id: "cleanse", label: "Cleanser [unverified \u2014 overlapping text in source]", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "vitc", label: "Vitamin C [unverified]", options: ["La Roche-Posay Pure Vitamin C10", "SkinCeuticals C E Ferulic", "Mario Badescu Vitamin C Serum", "Lanc\xF4me R\xE9nergie H.C.F. Triple Serum"] },
        { id: "hydrator", label: "Hydrator [unverified]", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "serums", label: "Serums (layer) [unverified]", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum [unverified]", options: ["Copper Peptides"] },
        { id: "mask", label: "Hydrating/soothing mask (optional, after FCAS) [unverified]", options: ["Aesop Blue Chamomile", "Go-To Repair Shop"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid (alt)", options: ["Go-To Very Amazing Retinal", "Dermalogica Dynamic Skin Retinol Serum", "Eve Lom Repair Retinol Serum", "Verso Night Cream (Retinol 8)", "BareMinerals Ageless Phyto Retinol Cream", "Skinstitut Expert Reveal Retinol Face Oil"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "barrier", label: "Barrier", options: ["Cicaplast B5 Serum + Cicaplast B5 Balm"] },
        { id: "moist", label: "Moisturiser", options: ["Elemis Overnight Matrix", "Youth to the People Adaptogen Deep Moisture Cream"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    },
    4: {
      // Thursday
      label: "Thursday \u2014 EXFOLIATION night",
      am: [
        { id: "cleanse", label: "Cleanser", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "niacinamide", label: "Niacinamide", options: ["La Roche-Posay Niacinamide 10", "Paula's Choice Niacinamide"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Copper Peptides"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "exfoliant", label: "Exfoliant / peel \u2014 tonight's the night", options: ["Dr Dennis Gross Peel", "Alpha-H Liquid Gold", "Riversol Glycolic Peel", "T.O. AHA/BHA Peel", "Elemis Glow Boost Exfoliator", "Elemis Face Exfoliant", "Aesop Exfoliant Paste", "Go-To Glow Exfoliant", "Clarins Peeling Beaut\xE9 \xC9clair"] },
        { id: "step1", label: "Next Step", options: ["Sulwhasoo FCAS"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "barrier", label: "Barrier", options: ["Cicaplast B5 Serum + Cicaplast B5 Balm (if skin is tender)", "Emma Lewisham Supernatural Vitale Face Elixir", "Emma Lewisham Supernatural Face Oil"] },
        { id: "moist", label: "Moisturiser", options: ["Elemis Overnight Matrix"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    },
    5: {
      // Friday
      label: "Friday \u2014 Vit C / Retinoid",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "vitc", label: "Vitamin C", options: ["La Roche-Posay Pure Vitamin C10", "SkinCeuticals C E Ferulic", "Mario Badescu Vitamin C Serum"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Perricone MD Face Firming Serum", "Azelaic + NIOD SDSM"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid", options: ["Retrieve Tretinoin 0.05%"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "barrier", label: "Barrier support", options: ["Cicaplast B5 Serum", "Cicaplast B5 Balm (if skin is tender)", "Emma Lewisham Supernatural Vitale Face Elixir", "Emma Lewisham Supernatural Face Oil"] },
        { id: "moist", label: "Moisturiser", options: ["Elemis Overnight Matrix", "Youth to the People Adaptogen Deep Moisture Cream"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    },
    6: {
      // Saturday
      label: "Saturday \u2014 Clay masque / Sheet mask",
      am: [
        // ⚠ Source document had overlapping text boxes for this day too —
        // this reading looked internally consistent, but worth a check.
        { id: "masque", label: "Clay/exfoliating masque [check]", options: ["Kiehl's Rare Earth", "Go-To The Removalist", "NIOD Flavanone Mud"] },
        { id: "cleanse", label: "Cleanser", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "sheetmask", label: "Sheet mask / eye mask-patches", options: ["111Skin", "Black Pearl", "Collagen Eye", "Wrinkles Schminkles"] },
        { id: "vitc", label: "Vitamin C", options: ["La Roche-Posay Pure Vitamin C10", "SkinCeuticals C E Ferulic"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "eye", label: "Eye", options: ["as above"] },
        { id: "moist", label: "Moisturiser", options: ["As above"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["As above"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "tranexamic", label: "Tranexamic acid", options: ["Naturium Tranexamic Topical Acid 5%"] },
        { id: "repair", label: "Repair", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist + SNAIL"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "oil", label: "Oil", options: ["Emma Lewisham Supernatural Face Oil"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    },
    0: {
      // Sunday
      label: "Sunday \u2014 Active cleanse / Tranexamic",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "mask", label: "Hydrating/soothing mask (after FCAS)", options: ["Aesop Blue Chamomile", "Go-To Repair Shop"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Copper Peptides"] },
        { id: "eye", label: "Eye", options: ["as above"] },
        { id: "moist", label: "Moisturiser", options: ["As above"] }
        // Neck/Chest Serum isn't listed for Sunday AM in the source — not
        // added here rather than guessed; add it via the editor if it should be there.
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["Sulwhasoo FCAS"] },
        { id: "tranexamic", label: "Tranexamic acid", options: ["Naturium Tranexamic Topical Acid 5%"] },
        { id: "hydrator", label: "Hydrator", options: ["Hyaluronic Acid + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Copper Peptides"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "oil", label: "Oil", options: ["Emma Lewisham Supernatural Face Oil"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest Serum", options: ["as above"] }
      ]
    }
  };
  var IRON_DAYS = {
    1: { title: "Leg Workout \u2014 Dumbbell Leg Day", exercises: ["Suitcase Squat", "Static Lunge", "Romanian Deadlift", "Rear Step Lunge", "Pause at Bottom Goblet Squat", "Lateral Lunge", "Finisher: 1/2 Rep Goblet Squat", "Full Range Goblet Squat", "Body Weight Squat", "1/2 Rep Body Weight Squat"] },
    2: { title: "Upper Body \u2014 Shoulders, Back & Chest", exercises: ["Chest Press", "Chest Flys", "Alternating Renegade Rows", "Pullovers", "Shoulder Press (Goal Post)", "Bent Over Rear Delt Flys", "Lateral Raise", "Finisher: Alternating Frontal Raise", "Frontal Raise"] },
    3: { title: "Glute Workout \u2014 Dumbbell Lower Body", exercises: ["Banded Hip Thrust (Pause at Top)", "Hip Thrust (Pause at Top)", "Staggered Hip Thrust", "Sumo Deadlift Squat (Pause at Bottom)", "Bulgarian Lunge"] },
    4: { title: "Full Body \u2014 Dumbbell Circuits", exercises: ["Double Arm Bent Over Row", "Static/Stationary Lunge", "Romanian Deadlift (RDL)", "Chest Press", "Push Press", "Heel Elevated Squat", "Rear Step Lunge", "Finisher: Alternating Reverse Lunges"] },
    5: { title: "Arms & Abs \u2014 Biceps & Triceps", exercises: ["Palms Up Bicep Curl", "Diamond Press", "Wide Bicep Curls", "Tricep Press", "Skull Crushers", "Hammer Curls", "Straight Leg Reverse Crunch", "Alternating Rotational Curls"] },
    6: { title: "Quad Workout \u2014 Dumbbell Leg Day", exercises: [["Closer Stance Lunge", "B", 17], ["Heel Elevated Squats", "B", 17], ["Heel Elevated Squat \u2013 Slow Eccentric", "B", 17], ["Bulgarian Lunge", "DB", 7.5], ["Close Stance Bulgarian Lunge", "DB", 7.5], ["Goblet Squat", "DB", 12.5]] },
    7: { title: "Shoulders & Triceps", exercises: [["Shoulder Press", "DB", "2x3.5"], ["Arnold Press", "DB", "2x3.5"], ["Face Pulls", "DB", "2x5"], ["Alternating Lateral Raises", "DB", "2x3.5"], ["Upright Rows", "B", 17.5], ["Tate Press", "DB", "2x6"], ["Skull Crushers", "DB", "2x6"], ["Overhead Extension", "DB", "2x4"], ["Lateral Raise", "DB", "2x3.5"], ["Lateral Raise Partials", "DB", "2x3.5"]] },
    8: { title: "Glutes & Hamstrings \u2014 Hip Thrusts & RDLs", exercises: [["Romanian Deadlift (RDL)", "B", 17.5], ["Banded Hip Thrusts \u2013 Slow", "DB", 15], ["Paused at Top Hip Thrusts", "DB", 15], ["1.5 Rep Hip Thrusts", "DB", 15], ["Hamstring Hip Thrusts", "DB", 7.5], ["Staggered RDL", "DB", "2x6"], ["Lunge to Staggered RDL", "DB", "2x6"], ["Single Leg Hamstring Lift", "DB", "1x5"], ["Weighted Hamstring Thrust", "DB", "1x15"]] },
    9: { title: "Full Body \u2014 Dumbbell Cardio", exercises: [["Bent Over Rows", "B", 17.5], ["Squat Press", "DB", "2x7.5"], ["High Squats", "B", 17.5], ["Chest Press", "B", 17.5], ["Static Lunge", "DB", "2x7.5"], ["Single Arm Shoulder Press", "DB", "1x5"], ["Lateral Lunge", "DB", 12.5], ["1/2 rep squats", "B", 17.5], ["Push Press", "DB", "2x7.5"], ["Squat to Press", "DB", "2x7.5"]] },
    10: { title: "Back & Biceps \u2014 Rows & Curls", exercises: [["Single Arm Rows", "DB", "1x10"], ["Pullovers", "DB", "2x7"], ["Single Arm Supine Row", "DB", "1x8"], ["Hammer Curl", "DB", "2x6"], ["X Body Curl", "DB", "2x6"], ["Wide Curl", "DB", "2x6"], ["Supine Row", "DB", "2x7"], ["Palm Up Curls", "DB", "2x6"]] },
    11: { title: "Dumbbell Leg Workout \u2014 Calves Included", exercises: [["Paused Goblet Squat", "DB", "1x10"], ["Front Foot Elevated Lunge", "DB", "2x7.5"], ["Pause Lunge (static)", "DB", "2x7.5"], ["Rear Step Lunge", "DB", "2x7.5"], ["Rear Step \u2192 Forward Lean Lunge", "DB", "2x7.5"], ["Rear Step \u2192 Full Lunge sequence", "DB", "2x7.5"], ["Curtsy Lunge", "DB", "2x7.5"], ["Static Curtsy Lunge", "DB", "2x7.5"]] },
    12: { title: "Upper Body \u2014 Chest & Triceps", exercises: [["Chest Press", "DB", "1x18"], ["Diamond Press", "DB", "2x7.5"], ["Flyes", "DB", "2x7.5"], ["Tricep Press", "DB", "2x7.5"], ["Skullcrushers", "DB", "2x7.5"], ["Dips", "", ""], ["Wide/Regular/Tricep Push-ups", "DB", "2x7"]] },
    13: { title: "Posterior Chain \u2014 Glutes, Hamstrings & Back", exercises: [["Renegade Rows", "DB", "2x7.5"], ["Rotational Row", "DB", "2x7.5"], ["Deadstop Row", "DB", "2x7.5"], ["Pullover", "B", "1x15"], ["RDL (slow eccentric)", "B", "1x15"], ["RDL (pause at bottom)", "B", "1x15"], ["Staggered RDL & 1.5 rep", "DB", "1x7"], ["Sumo Deadlift Squat", "B", "1x15"], ["Hip Thrusts", "DB", "1x15"], ["Sumo Squat", "B", "1x15"]] },
    14: { title: "Unilateral Training \u2014 Full Body", exercises: [["Alternating Chest Press", "DB", "2x7.5"], ["Static Lunge", "DB", "2x7.5"], ["Alternating Rear Step Lunges", "DB", "2x7.5"], ["Single Arm Renegade Row", "DB", "2x5"], ["Bulgarian Lunge", "DB", "2x7.5"], ["Forward Lean Lunge", "DB", "2x7.5"], ["Single Side Arnold Press", "DB", "1x5"], ["Clean to Single Side Arnold Press", "DB", "1x5"], ["Squat to Lunge", "DB", "2x7.5"], ["Bodyweight Squat to Lunge", "DB", "2x7.5"], ["\xBD-rep Bulgarian Lunges", "DB", "2x7.5"], ["Uneven Push-ups", "", ""]] },
    15: { title: "Shoulders \u2014 Compound & Isolation", exercises: [["Shoulder Press", "DB", "2x5"], ["Frontal Raise", "DB", "2x5"], ["Rear Delt Fly", "DB", "2x5"], ["Lateral Raise", "DB", "2x5"], ["Hammer Frontal Raise", "DB", "2x5"], ["Rear Delt Partial Raises", "DB", "2x5"], ["Lateral Partials", "DB", "2x5"], ["Arc Raise", "DB", "2x5"], ["Lateral-Frontal-Clean to Press combo", "DB", "2x5"]] },
    16: { title: "Hamstrings \u2014 Hip Extension & Flexion", exercises: [["Slow Eccentric RDL", "B", 17.5], ["Paused RDL", "B", 17.5], ["Normal Tempo RDL", "B", 17.5], ["Slow Staggered RDL", "B", 17.5], ["1.5 Rep Staggered RDL", "DB", 7.5], ["Stag RDL to Lunge", "DB", 7.5], ["Balance RDL", "", ""], ["Hamstring Thrust", "DB", "1x"], ["RDL x2 Dumbbells", "DB", "2x7.5"], ["RDL x1 Dumbbell", "DB", "1x"]] },
    17: { title: "Complete Upper Body", exercises: [["Chest Press", "DB", "2x7.5"], ["Tricep Press/Skullcrushers", "DB", "2x7.5"], ["Pullovers", "DB", "2x7.5"], ["Diamond Press", "DB", "2x7.5"], ["Landmine Row", "B", "2x4"], ["Arnold Press", "DB", "2x4"], ["Lateral to Frontal Arcs", "DB", "2x4"], ["Partial Rear Delt Flyes", "DB", "2x4"], ["Around the World", "DB", "2x4"]] },
    18: { title: "Glute Workout \u2014 Supersets", exercises: [["Warm Up Walks", "", ""], ["Sumo Squat Deadlift", "B", 17.5], ["Banded Hip Thrust", "DB", 15], ["Hip Thrust Pulses", "DB", 15], ["Elevated Lunge", "DB", "2x7.5"], ["Bodyweight Fwd Lean Hand Tap", "DB", "2x7.5"], ["Rear Step Lunge", "DB", "1x7.5"], ["Band Only Hip Thrust Hold", "", ""], ["x1 Leg Hip Thrust Pulses", "DB", "1x7.5"], ["Lateral Walk", "", ""], ["Squats", "", ""], ["One Side Abduction", "", ""], ["Faster Walk", "", ""]] },
    19: { title: "Muscle Building \u2014 Full Body", exercises: [["Chest Press", "DB", "2x7.5"], ["Static Lunge", "DB", "2x7.5"], ["Rear Step Fwd Lean Lunge", "DB", "2x7.5"], ["Pullovers", "DB", "2x7.5"], ["Bent Over Row", "DB", "2x7.5"], ["Sumo Squat", "B", 17.5], ["Shoulder Press", "DB", "2x3.5"], ["Push Press", "DB", "2x7.5"], ["RDL", "B", 17.5], ["Row", "B", 17.5], ["Squat", "B", 17.5], ["Press", "B", 17.5], ["Rear Lunge", "B", 17.5]] },
    20: { title: "Supersets \u2014 Arms, Abs & Core", exercises: [["Diamond Press", "DB", "2x7.5"], ["Tricep Press", "DB", "2x7.5"], ["Skullcrushers", "DB", "2x7.5"], ["Overhead Tricep Extension", "DB", "2x7.5"], ["Plank Hip Twist", "", ""], ["Plank Hips Up & Down", "", ""], ["Single Arm Plank Ladder", "", ""], ["Side Plank Lift", "", ""], ["Leg Lower Reverse Crunch", "", ""], ["Arc Crunch", "", ""], ["Toe Tap to Extension", "", ""], ["Bicep Curl Palms Up", "DB", "2x6"], ["Wide Curls Alternating", "DB", "2x6"], ["Hammer Curl", "DB", "2x6"], ["Cross Body Curl", "DB", "2x6"], ["Deadstop Tricep Push Up", "", ""], ["1 Dumbbell Curl", "DB", "1x6"]] },
    21: { title: "Dumbbell Leg Day \u2014 Step-Ups", exercises: ["Heel Elevated Squat", "Static Lunge", "Slow Step Up", "Rear Step Lunge", "Lateral Lunge", "Side Step Up", "Forward Lean Lunge", "Forward Lean Step Up", "Single Leg Calf Raise", "Finisher \u2014 Heel Elevated Squat"] },
    22: { title: "Upper Body \u2014 Chest & Back", exercises: ["Chest Press", "Chest Fly", "Single-Arm Bent-Over Row", "Pullover", "Momentum Row", "Push-Ups", "Supine Double Row", "Finisher: Alternating Renegade Row \u2192 Push-Up"] },
    23: { title: "Supersets \u2014 Glutes & Hamstrings", exercises: ["RDL \u2014 Slow Eccentric", "Sumo Deadlift \u2014 Slow Eccentric", "Slow Banded Hip Thrust", "Banded Hip Thrust \u2014 Faster Pace", "Slow Hip Thrust", "Hamstring Thrust", "Glute Bridge", "Hamstring Bridge", "Single-Leg Glute Bridge", "Single-Leg Hamstring Bridge"] },
    24: { title: "Full Body \u2014 Dumbbell Circuits", exercises: ["High Squats", "Squat to Press", "Bent Over Row", "Maker", "Romanian Deadlift (RDL)", "RDL to High Squat", "Shoulder Press", "Clean to Press", "Forward Step Alternating Lunges", "Rear Step Alternating Lunges"] },
    25: { title: "Shoulders \u2014 Dumbbell Supersets", exercises: ["Arnold Press \u2014 STAPLE", "Rear Delt Fly", "Hammer Raise", "90\xB0 Bent-Elbow Lateral Raise", "Alternating 90\xB0 Bent-Elbow Lateral Raise", "Rear Delt Row", "Upright Row", "Arc Frontal Raise", "Alternating Arc Frontal Raise", "Lateral Raise", "Partial Lateral Raise", "Partial Rear Delt Fly", "Partial Lateral Raise", "Partial Shoulder Press"] },
    26: { title: "Leg Workout \u2014 Circuits & Step-Ups", exercises: ["Sumo Deadlift Squat", "Lunge Hold", "Alternating Rear Lunge", "Romanian Deadlift (RDL)", "Step Up", "Finisher: Sumo Deadlift Hold", "Full-Range Sumo Deadlift Squat", "Bodyweight Sumo Hold", "Full-Range Sumo Deadlift Squat", "Bodyweight \xBD Reps"] },
    27: { title: "Upper Body \u2014 Antagonist Sets", exercises: ["Alternating Renegade Row", "Pullover", "Diamond Press", "Single-Arm Hammer Press", "Single-Arm Shoulder Press", "Single-Arm Rear Delt Fly", "Slow Lateral Raise", "Slow Frontal Raise", "Finisher: Landmine Row"] },
    28: { title: "Glute Workout \u2014 Iron Glutes", exercises: ["Slow Banded Hip Thrust", "\xBD-Rep Banded Hip Thrust", "Hip Thrust \u2014 5 Pulses", "Hip Thrust \u2014 1 Pulse", "Staggered Hip Thrust", "Staggered Hip Thrust Hold", "Forward-Leaning Bulgarian Lunge", "Slow Banded Hip Thrust", "\xBD-Rep Banded Hip Thrust", "Fast Banded Hip-Thrust Burnout"] },
    29: { title: "Final Full Body Workout \u2014 Hypertrophy", exercises: ["Shoulder Press", "Static Lunge \u2014 Right", "Static Lunge \u2014 Left", "Chest Press", "Paused Goblet Squat", "Pullover", "Romanian Deadlift (RDL)", "Bulgarian Lunge \u2014 Right", "Bulgarian Lunge \u2014 Left"] },
    30: { title: "Finale \u2014 Arms, Abs & Core", exercises: ["Dips (Alternative Exercise: Tricep Extensions)", "Tricep Press", "Skull Crushers", "Cross-Body Curl", "Hammer Curls", "Alternating Curls"] }
  };
  var RETREAT_DATES = ["2026-08-24", "2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28"];
  var RETREAT = {
    "2026-08-24": {
      theme: "Grounding",
      yoga: "\u201CGentle Morning Yoga\u201D (Yoga With Adriene) \u2014 06:30\u201306:50",
      training: "Iron \u2014 Combined Upper A + Lower A \u2014 09:15\u201310:15 (60 min)",
      lunch: "Big green salad, tinned tuna or chickpeas, olive oil, lemon",
      dinner: "Baked salmon, roasted vegetables, herb yoghurt sauce",
      treatment: "15:30 Onsen \u2014 Contrast Bath and Sauna",
      evening: "\u201CYoga Rinse\u201D (Yoga With Adriene), 15 min",
      skinNote: "Body moisturiser/oil on damp skin straight after every shower. No at-home actives this week."
    },
    "2026-08-25": {
      theme: "Movement",
      yoga: "\u201CYoga For The Future\u201D (Yoga With Adriene) \u2014 06:30\u201307:00",
      training: "Cycling \u2014 ROUVY, easy Zone 2 \u2014 09:25\u201310:10 (45 min)",
      lunch: "Soup (fridge leftovers or recipe)",
      dinner: "Stir-fried chicken and greens, ginger, garlic, tamari",
      treatment: "13:00 You Glow \u2014 Brazilian Lymphatic Drainage Massage",
      evening: "\u201C10-Minute Bedtime Yoga\u201D (Yoga With Adriene)",
      skinNote: "Body moisturiser/oil on damp skin after shower."
    },
    "2026-08-26": {
      theme: "Release",
      yoga: "\u201C20 Min Deep Fascia Stretch \u2014 Yin Yoga\u201D (Sarah Beth Yoga) \u2014 06:30\u201306:50",
      training: "Iron \u2014 Upper B \u2014 09:15\u201309:45 (30 min, yoga finisher skipped)",
      lunch: "Boiled eggs, avocado, sourdough or rye",
      dinner: "Grilled fish, steamed greens, lemon (kept simple)",
      treatment: "15:15 Blue Lagoon \u2014 Honey & Cocoa Body Wrap Ritual",
      evening: "Legs-up-the-wall, 10 min",
      skinNote: "Hydrate well \u2014 sauna heat pulls extra moisture. Moisturiser straight after."
    },
    "2026-08-27": {
      theme: "Restore",
      yoga: "\u201CYoga For Beginners \u2014 30 Min\u201D (Yoga With Adriene) \u2014 06:30\u201307:00",
      training: "Cycling \u2014 ROUVY, easy Zone 2 \u2014 09:25\u201310:00 (30\u201340 min)",
      lunch: "Leftovers or grain bowl (quinoa, roast veg, feta, seeds)",
      dinner: "\u201CTreat\u201D night \u2014 mushroom risotto, glass of wine",
      treatment: "15:15 You Glow \u2014 Detox Cleansing Facial (hydrating focus \u2014 tell therapist skin is post-sun/dry)",
      evening: "\u201CYoga Rinse\u201D (Yoga With Adriene), 15 min",
      skinNote: "Facial is hydration-only \u2014 no exfoliation/actives today."
    },
    "2026-08-28": {
      theme: "Integration",
      yoga: "\u201CYoga Morning Fresh\u201D (Yoga With Adriene) \u2014 06:30\u201307:05",
      training: "Iron \u2014 Lower B \u2014 09:30\u201310:00 (30 min, mobility finisher skipped)",
      lunch: "Big salad, use up what's left in the fridge",
      dinner: "Celebratory \u2014 herb-crusted lamb (or vegetarian roast)",
      treatment: "No spa treatment confirmed yet \u2014 dentist 10am, Holly ear check (Felipe) 12:10pm",
      evening: "\u201CYoga For Gratitude\u201D (Yoga With Adriene), 35 min",
      skinNote: "Full moisturising routine after \u2014 take your time. Week's actives pause ends here."
    }
  };
  var RETREAT_CONSTANTS = {
    breakfast: "Kefir chia pudding (soak overnight, batch every 2\u20133 days)",
    snack: "Green smoothie \u2014 spinach, frozen banana, cucumber, ginger, coconut water/milk, nut butter"
  };
  var RECIPE_SEED = [
    {
      id: "r-1",
      name: "Kefir Chia Pudding",
      ingredients: [
        { name: "chia seeds", qty: 4, unit: "tbsp" },
        { name: "kefir", qty: 1.5, unit: "cup" },
        { name: "honey", qty: 1, unit: "tbsp" },
        { name: "berries", qty: 0.5, unit: "cup" },
        { name: "mixed nuts/seeds", qty: 2, unit: "tbsp" }
      ],
      instructions: "Soak chia in kefir overnight (roughly 1 part chia to 4 parts kefir), honey or vanilla stirred through. Top with berries and toasted nuts. Batch every 2\u20133 days."
    },
    {
      id: "r-2",
      name: "Green Smoothie",
      ingredients: [
        { name: "spinach", qty: 1, unit: "cup" },
        { name: "frozen banana", qty: 1, unit: "" },
        { name: "cucumber", qty: 0.5, unit: "" },
        { name: "ginger", qty: 1, unit: "tsp" },
        { name: "coconut water/milk", qty: 1, unit: "cup" },
        { name: "nut butter", qty: 1, unit: "tbsp" }
      ],
      instructions: "Blend all. Good just before or after morning yoga/walk."
    },
    {
      id: "r-3",
      name: "Baked Salmon with Herb Yoghurt",
      ingredients: [
        { name: "salmon fillet", qty: 1, unit: "" },
        { name: "lemon", qty: 1, unit: "" },
        { name: "dill", qty: 2, unit: "tbsp" },
        { name: "Greek yoghurt", qty: 0.5, unit: "cup" },
        { name: "garlic", qty: 1, unit: "clove" },
        { name: "salt", qty: 1, unit: "pinch" }
      ],
      instructions: "Bake salmon 12\u201315 min at 200\xB0C with lemon and dill. Sauce: Greek yoghurt, chopped dill, lemon zest, garlic, salt."
    },
    {
      id: "r-4",
      name: "Mushroom Risotto",
      ingredients: [
        { name: "arborio rice", qty: 1, unit: "cup" },
        { name: "mixed mushrooms", qty: 250, unit: "g" },
        { name: "butter", qty: 2, unit: "tbsp" },
        { name: "white wine", qty: 0.5, unit: "cup" },
        { name: "stock", qty: 3, unit: "cup" },
        { name: "parmesan", qty: 0.33, unit: "cup" },
        { name: "thyme", qty: 1, unit: "tsp" }
      ],
      instructions: "Saut\xE9 mushrooms in butter, add rice, wine, stock gradually. Parmesan and a knob of butter to finish. Fresh thyme."
    },
    {
      id: "r-5",
      name: "Herb-Crusted Lamb",
      ingredients: [
        { name: "lamb backstrap", qty: 500, unit: "g" },
        { name: "rosemary", qty: 2, unit: "tbsp" },
        { name: "garlic", qty: 2, unit: "clove" },
        { name: "breadcrumbs", qty: 0.5, unit: "cup" },
        { name: "dijon mustard", qty: 2, unit: "tbsp" }
      ],
      instructions: "Crust lamb with rosemary, garlic, breadcrumbs, dijon. Roast to liking. Serve with roast vegetables and pan jus."
    }
  ];
  var BLOCKS = [
    {
      name: "Block 1 \u2014 Strength Priority",
      weeks: "Weeks 1\u20136",
      days: [
        "Iron \u2014 Combined Upper A + Lower A (60 min)",
        "Cycling \u2014 ROUVY, Zone 2 (45 min)",
        "Iron \u2014 Upper B + Lower B (60 min)",
        "__PILATES_ROTATION__",
        "Cycling \u2014 ROUVY, Zone 2 (45 min)",
        "Iron \u2014 Full Body PHA circuit (40 min)",
        "__PILATES_ROTATION__"
      ]
    },
    {
      name: "Block 2 \u2014 Running Priority",
      weeks: "Weeks 7\u201312",
      days: [
        "C25K \u2014 Week 1 run/walk intervals",
        "Iron \u2014 Full Body maintenance (40 min)",
        "C25K \u2014 Week 1 run/walk intervals",
        "Cycling \u2014 ROUVY, Zone 2 (30\u201340 min)",
        "C25K \u2014 Week 1 (or rest per plan)",
        "Iron \u2014 Full Body maintenance (40 min) + Pilates/yoga (15\u201320 min)",
        "Rest"
      ]
    },
    {
      name: "Block 3 \u2014 Cycling Priority",
      weeks: "Weeks 13\u201318",
      days: [
        "Cycling \u2014 ROUVY structured/interval session",
        "Iron \u2014 Full Body maintenance (40 min)",
        "Cycling \u2014 ROUVY endurance ride",
        "C25K \u2014 maintenance run (30 min)",
        "Cycling \u2014 ROUVY structured/interval session",
        "Iron \u2014 Full Body maintenance (40 min) + yoga (15\u201320 min)",
        "Rest"
      ]
    },
    {
      name: "Block 4 \u2014 Pilates / Yoga / Mobility Priority",
      weeks: "Weeks 19\u201324",
      days: [
        "Pilates \u2014 Nell Hoess, full session",
        "Yoga \u2014 full practice",
        "Pilates \u2014 Nell Hoess, full session",
        "Cycling \u2014 ROUVY, Zone 2 (30 min)",
        "Yoga \u2014 full practice",
        "Iron \u2014 Full Body maintenance (40 min) + C25K easy jog if time",
        "Rest"
      ]
    }
  ];
  function parseDateStamp(value) {
    const m = value.match(/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2}))?/);
    if (!m) return null;
    return { date: `${m[1]}-${m[2]}-${m[3]}`, time: m[4] ? `${m[5]}:${m[6]}` : null };
  }
  function addDaysToISO(iso, days) {
    const d = /* @__PURE__ */ new Date(iso + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function parseICS(text, windowStartISO, windowEndISO) {
    const unfolded = text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
    const lines = unfolded.split("\n");
    const rawEvents = [];
    let cur = null;
    for (const line of lines) {
      if (line.startsWith("BEGIN:VEVENT")) {
        cur = { exdates: [] };
        continue;
      }
      if (line.startsWith("END:VEVENT")) {
        if (cur) rawEvents.push(cur);
        cur = null;
        continue;
      }
      if (!cur) continue;
      const idx = line.indexOf(":");
      if (idx === -1) continue;
      const rawKey = line.slice(0, idx);
      const value = line.slice(idx + 1);
      const key = rawKey.split(";")[0];
      if (key === "SUMMARY") cur.summary = value.replace(/\\,/g, ",").replace(/\\n/gi, " ");
      if (key === "DTSTART") {
        const p = parseDateStamp(value);
        if (p) {
          cur.date = p.date;
          cur.time = p.time;
        }
      }
      if (key === "UID") cur.uid = value;
      if (key === "RRULE") cur.rrule = value;
      if (key === "EXDATE") {
        value.split(",").forEach((v) => {
          const p = parseDateStamp(v);
          if (p) cur.exdates.push(p.date);
        });
      }
      if (key === "RECURRENCE-ID") {
        const p = parseDateStamp(value);
        if (p) cur.recurrenceId = p.date;
      }
    }
    const masters = rawEvents.filter((e) => !e.recurrenceId);
    const overrides = rawEvents.filter((e) => e.recurrenceId);
    const overrideMap = {};
    overrides.forEach((o) => {
      overrideMap[`${o.uid}::${o.recurrenceId}`] = o;
    });
    const results = [];
    for (const ev of masters) {
      if (!ev.date) continue;
      if (!ev.rrule) {
        const override = overrideMap[`${ev.uid}::${ev.date}`];
        results.push(override || ev);
        continue;
      }
      const parts = {};
      ev.rrule.split(";").forEach((p) => {
        const [k, v] = p.split("=");
        parts[k] = v;
      });
      const freq = parts.FREQ;
      const interval = parseInt(parts.INTERVAL || "1", 10);
      const until = parts.UNTIL ? addDaysToISO(parseDateStamp(parts.UNTIL).date, 1) : null;
      const count = parts.COUNT ? parseInt(parts.COUNT, 10) : null;
      if (!freq || !["DAILY", "WEEKLY", "MONTHLY", "YEARLY"].includes(freq)) {
        results.push(ev);
        continue;
      }
      let occDate = ev.date;
      let occCount = 0;
      let iterations = 0;
      while (iterations < 500) {
        iterations++;
        if (until && occDate > until) break;
        if (count && occCount >= count) break;
        if (occDate > windowEndISO) break;
        if (occDate >= windowStartISO && !ev.exdates.includes(occDate)) {
          const override = overrideMap[`${ev.uid}::${occDate}`];
          if (override) {
            results.push(override);
          } else {
            results.push({ ...ev, date: occDate });
          }
        }
        occCount++;
        if (freq === "DAILY") occDate = addDaysToISO(occDate, interval);
        else if (freq === "WEEKLY") occDate = addDaysToISO(occDate, 7 * interval);
        else if (freq === "MONTHLY") {
          const d = /* @__PURE__ */ new Date(occDate + "T00:00:00Z");
          d.setUTCMonth(d.getUTCMonth() + interval);
          occDate = d.toISOString().slice(0, 10);
        } else if (freq === "YEARLY") {
          const d = /* @__PURE__ */ new Date(occDate + "T00:00:00Z");
          d.setUTCFullYear(d.getUTCFullYear() + interval);
          occDate = d.toISOString().slice(0, 10);
        }
      }
    }
    return results;
  }
  var EXTRA_SEED = [
    { id: "sew-1", date: todayDateOnly(), text: "Cover body model with .5mm foam", source: "sewing" },
    { id: "sew-2", date: todayDateOnly(), text: "Mark body lines", source: "sewing" },
    { id: "sew-3", date: todayDateOnly(), text: "Make moulage (once foam + body lines done)", source: "sewing" },
    { id: "sew-4", date: todayDateOnly(), text: "Dotti t-shirt as knit base \u2014 measure stretch %, make slopers at various stretch %s", source: "sewing" },
    { id: "sew-5", date: todayDateOnly(), text: "Go through iPhone photos to decide on makes", source: "sewing" },
    { id: "sew-6", date: todayDateOnly(), text: "Second-hand Lutterloh alerts \u2014 keep watching", source: "sewing" },
    { id: "sew-7", date: todayDateOnly(), text: "Bags? \u2014 decide on project", source: "sewing" },
    { id: "sew-8", date: todayDateOnly(), text: "Bucket hats? \u2014 decide on project", source: "sewing" },
    { id: "sew-9", date: todayDateOnly(), text: "Go through fabric bins", source: "sewing" },
    { id: "life-1", date: todayDateOnly(), text: "Order new iPhone + case + screen protector", source: "life" },
    { id: "life-2", date: todayDateOnly(), text: "Shopping list and Woolworths order", source: "life" },
    { id: "life-3", date: todayDateOnly(), text: "Make massage and soak bookings", source: "life" },
    { id: "life-4", date: todayDateOnly(), text: "Order MV for Holly's food and hemp seed", source: "life" },
    { id: "life-5", date: todayDateOnly(), text: "Follow up replacing Ray-Ban lens, and prescription lenses on all other glasses", source: "life" },
    { id: "life-6", date: todayDateOnly(), text: "Kefir chia puddings for breakfast (batch)", source: "life" },
    { id: "life-7", date: todayDateOnly(), text: "Holly \u2014 slippery elm", source: "life" },
    { id: "life-8", date: todayDateOnly(), text: "Laundry", source: "life" },
    { id: "life-9", date: todayDateOnly(), text: "Plants", source: "life" },
    { id: "life-10", date: todayDateOnly(), text: "Wallet", source: "life" },
    { id: "life-11", date: todayDateOnly(), text: "Go back and look at NZ trip \u2014 timing, pacing etc", source: "life" },
    { id: "life-12", date: todayDateOnly(), text: "Holly \u2014 homemade food costing and trial", source: "life" }
  ];
  function todayDateOnly() {
    return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  }
  function computeZiipForDate(dateStr, ziipSettings) {
    const idx = Math.max(0, daysBetween(ziipSettings.startDate, dateStr));
    const plan = idx < ZIIP_PLAN.length ? ZIIP_PLAN[idx] : null;
    return { ziipDayIdx: idx, ziipToday: plan };
  }
  var PILATES_LEVEL5_SWITCH_DATE = "2026-09-14";
  var PILATES_LEVEL4_SESSION = "Pilates \u2014 Nell Hoess Level 4, Full Body";
  var PILATES_LEVEL5_SERIES = [
    "Pilates \u2014 Nell Hoess Level 5A, Stability focus (45 min)",
    "Pilates \u2014 Nell Hoess Level 5B, Warmup focus (30 min)",
    "Pilates \u2014 Nell Hoess Level 5C, Leg & footwork focus (50 min)",
    "Pilates \u2014 Nell Hoess Level 5D, Abdominal focus (40 min)",
    "Pilates \u2014 Nell Hoess Level 5E, Feet in straps focus (30 min)",
    "Pilates \u2014 Nell Hoess Level 5F, Lunge and Hip Disassociation (35 min)",
    "Pilates \u2014 Nell Hoess Level 5G, Long and Short Box focus (35 min)",
    "Pilates \u2014 Nell Hoess Level 5, Full Body (65 min)"
  ];
  var PILATES_LEVEL6_SERIES = [
    "Pilates \u2014 Nell Hoess Level 6A, Stability focus (45 min)",
    "Pilates \u2014 Nell Hoess Level 6B, Warmup focus (30 min)",
    "Pilates \u2014 Nell Hoess Level 6C, Leg & footwork focus (50 min)",
    "Pilates \u2014 Nell Hoess Level 6D, Abdominal focus (40 min)",
    "Pilates \u2014 Nell Hoess Level 6E, Feet in straps focus (30 min)",
    "Pilates \u2014 Nell Hoess Level 6F, Lunge and Hip Disassociation (35 min)",
    "Pilates \u2014 Nell Hoess Level 6G, Long and Short Box focus (35 min)",
    "Pilates \u2014 Nell Hoess Level 6, Full Body (65 min)"
  ];
  var PILATES_ROTATION_SERIES = [...PILATES_LEVEL5_SERIES, ...PILATES_LEVEL6_SERIES];
  var PILATES_ALL_OPTIONS = [PILATES_LEVEL4_SESSION, ...PILATES_ROTATION_SERIES];
  function computePilatesSession(dateStr) {
    if (dateStr < PILATES_LEVEL5_SWITCH_DATE) {
      return PILATES_LEVEL4_SESSION;
    }
    const daysSince = daysBetween(PILATES_LEVEL5_SWITCH_DATE, dateStr);
    const weekNum = Math.floor(daysSince / 7);
    const isThursday = dayOfWeekISO(dateStr) === 4;
    const n = weekNum * 2 + (isThursday ? 0 : 1);
    const idx = (n % PILATES_ROTATION_SERIES.length + PILATES_ROTATION_SERIES.length) % PILATES_ROTATION_SERIES.length;
    return PILATES_ROTATION_SERIES[idx];
  }
  function computeFitnessForDate(dateStr, fitnessSettings, fitnessOverrides) {
    const daysSince = Math.max(0, daysBetween(fitnessSettings.startDate, dateStr));
    const weekNum = Math.floor(daysSince / 7) + 1;
    const blockIdx = Math.min(3, Math.floor((weekNum - 1) / 6));
    const dayInBlock = daysSince % 7;
    const block = BLOCKS[blockIdx];
    let scheduledSession = block.days[dayInBlock];
    if (scheduledSession === "__PILATES_ROTATION__") {
      scheduledSession = computePilatesSession(dateStr);
    }
    const override = fitnessOverrides && fitnessOverrides[dateStr];
    return {
      weekNum,
      blockIdx,
      dayInBlock,
      block,
      scheduledSession,
      regularSession: override || scheduledSession,
      isOverridden: !!override
    };
  }
  var RENPHO_FIELDS = [
    { key: "bmi", label: "BMI", unit: "" },
    { key: "bodyFatMass", label: "Body fat mass", unit: "kg" },
    { key: "musclePct", label: "Muscle %", unit: "%" },
    { key: "skeletalMusclePct", label: "Skeletal muscle %", unit: "%" },
    { key: "skeletalMuscleMass", label: "Skeletal muscle mass", unit: "kg" },
    { key: "bonePct", label: "Bone %", unit: "%" },
    { key: "boneMass", label: "Bone mass", unit: "kg" },
    { key: "proteinPct", label: "Protein %", unit: "%" },
    { key: "proteinMass", label: "Protein mass", unit: "kg" },
    { key: "waterPct", label: "Body water %", unit: "%" },
    { key: "waterMass", label: "Body water mass", unit: "kg" },
    { key: "fatFreeMass", label: "Fat-free mass", unit: "kg" },
    { key: "subcutaneousFatPct", label: "Subcutaneous fat %", unit: "%" },
    { key: "visceralFat", label: "Visceral fat", unit: "" },
    { key: "bmr", label: "BMR", unit: "kcal" },
    { key: "metabolicAge", label: "Metabolic age", unit: "yrs" },
    { key: "whr", label: "Waist-hip ratio", unit: "" },
    { key: "smi", label: "SMI (Skeletal Muscle Index)", unit: "kg/m\xB2" }
  ];
  function todayISO() {
    const d = /* @__PURE__ */ new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function addDaysISO(iso, n) {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    dt.setUTCDate(dt.getUTCDate() + n);
    return dt.toISOString().slice(0, 10);
  }
  function dayOfWeekISO(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  }
  function mondayOfWeekISO(iso) {
    const dow = dayOfWeekISO(iso);
    const offsetToMonday = dow === 0 ? -6 : 1 - dow;
    return addDaysISO(iso, offsetToMonday);
  }
  function fmtDate(iso) {
    const d = /* @__PURE__ */ new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" });
  }
  function daysBetween(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 864e5);
  }
  function rollForwardIncomplete(todos, todayPicks, poolDone, todayStr) {
    const rolledTodos = todos.map((t) => {
      if (t.source === "manual" && !t.done && t.date && t.date < todayStr) {
        return { ...t, date: todayStr };
      }
      return t;
    });
    const rolledTodayPicks = { ...todayPicks };
    const carriedForward = new Set(rolledTodayPicks[todayStr] || []);
    for (const d of Object.keys(todayPicks)) {
      if (d >= todayStr) continue;
      const doneOnD = new Set(poolDone[d] || []);
      const stillPending = (todayPicks[d] || []).filter((id) => !doneOnD.has(id));
      if (stillPending.length === 0) continue;
      stillPending.forEach((id) => carriedForward.add(id));
      rolledTodayPicks[d] = (todayPicks[d] || []).filter((id) => doneOnD.has(id));
    }
    rolledTodayPicks[todayStr] = Array.from(carriedForward);
    return { rolledTodos, rolledTodayPicks };
  }
  var WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function isRecurringDueOnDate(task, dateISO) {
    if (task.endDate && dateISO > task.endDate) return false;
    if (task.frequency === "daily") {
      return !task.startDate || dateISO >= task.startDate;
    }
    if (task.frequency === "weekly") {
      return dayOfWeekISO(dateISO) === task.dayOfWeek;
    }
    if (task.frequency === "monthly") {
      return parseInt(dateISO.slice(8, 10), 10) === task.dayOfMonth;
    }
    if (task.frequency === "interval-days") {
      const diff = daysBetween(task.anchorDate, dateISO);
      return diff >= 0 && diff % task.intervalDays === 0;
    }
    if (task.frequency === "interval-months") {
      const dom = parseInt(dateISO.slice(8, 10), 10);
      if (dom !== task.dayOfMonth) return false;
      const [ay, am] = task.anchorDate.split("-").map(Number);
      const [dy, dm] = dateISO.split("-").map(Number);
      const diff = dy * 12 + (dm - 1) - (ay * 12 + (am - 1));
      return diff >= 0 && diff % task.intervalMonths === 0;
    }
    return false;
  }
  function dueRecurringTasksForDate(dateISO, recurringTasks) {
    return (recurringTasks || []).filter((t) => isRecurringDueOnDate(t, dateISO));
  }
  function describeRecurrence(task) {
    let base = "";
    if (task.frequency === "daily") base = `Every day from ${fmtDate(task.startDate)}`;
    else if (task.frequency === "weekly") base = `Every ${WEEKDAY_NAMES[task.dayOfWeek]}`;
    else if (task.frequency === "monthly") base = `Monthly on the ${ordinal(task.dayOfMonth)}`;
    else if (task.frequency === "interval-days") base = `Every ${task.intervalDays} day${task.intervalDays === 1 ? "" : "s"}, starting ${fmtDate(task.anchorDate)}`;
    else if (task.frequency === "interval-months") base = `Every ${task.intervalMonths} month${task.intervalMonths === 1 ? "" : "s"}, on the ${ordinal(task.dayOfMonth)}`;
    if (task.endDate) base += ` until ${fmtDate(task.endDate)}`;
    return base;
  }
  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function dailyTaskStats(dateISO, todos, todayPicks, poolDone, recurringTasks, recurringDone) {
    const pickedIds = todayPicks[dateISO] || [];
    const poolDoneIds = poolDone[dateISO] || [];
    const poolTotal = pickedIds.length;
    const poolDoneCount = poolDoneIds.filter((id) => pickedIds.includes(id)).length;
    const dayTodos = (todos || []).filter((t) => t.date === dateISO && t.source === "manual");
    const todosTotal = dayTodos.length;
    const todosDoneCount = dayTodos.filter((t) => t.done).length;
    const dueRecurring = dueRecurringTasksForDate(dateISO, recurringTasks);
    const recurDoneIds = recurringDone[dateISO] || [];
    const recurTotal = dueRecurring.length;
    const recurDoneCount = dueRecurring.filter((t) => recurDoneIds.includes(t.id)).length;
    return { total: poolTotal + todosTotal + recurTotal, done: poolDoneCount + todosDoneCount + recurDoneCount };
  }
  function computeWorkoutStreak(today, fitnessSettings, fitnessOverrides, fitnessLogs) {
    let streak = 0;
    let d = today;
    for (let i = 0; i < 400; i++) {
      const { regularSession } = computeFitnessForDate(d, fitnessSettings, fitnessOverrides);
      const isRest = regularSession && regularSession.trim().toLowerCase() === "rest";
      if (isRest) {
        d = addDaysISO(d, -1);
        continue;
      }
      const entry = (fitnessLogs || []).find((l) => l.date === d);
      const isDone = entry && (entry.status || "done") === "done";
      if (isDone) {
        streak++;
      } else if (d === today) {
      } else {
        break;
      }
      d = addDaysISO(d, -1);
    }
    return streak;
  }
  function computeTaskStreak(today, todos, todayPicks, poolDone, recurringTasks, recurringDone) {
    let streak = 0;
    let d = today;
    for (let i = 0; i < 400; i++) {
      const { total, done } = dailyTaskStats(d, todos, todayPicks, poolDone, recurringTasks, recurringDone);
      if (total === 0) {
        d = addDaysISO(d, -1);
        continue;
      }
      if (done === total) {
        streak++;
      } else if (d === today) {
      } else {
        break;
      }
      d = addDaysISO(d, -1);
    }
    return streak;
  }
  function backupAgoLabel(iso) {
    if (!iso) return "Never backed up";
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);
    if (days <= 0) return "Backed up today";
    if (days === 1) return "Last backed up 1 day ago";
    return `Last backed up ${days} days ago`;
  }
  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("storage timeout")), ms))
    ]);
  }
  var DB_NAME = "life-tracker-db";
  var STORE_NAME = "kv";
  var dbPromise = null;
  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }
  function idbGet(key) {
    return openDB().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result === void 0 ? null : req.result);
      req.onerror = () => reject(req.error);
    }));
  }
  function idbSet(key, value) {
    return openDB().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    }));
  }
  var ALL_STORAGE_KEYS = [
    "weight-logs",
    "segmental-muscle-logs",
    "fitness-logs",
    "iron-exercise-logs",
    "iron-equipment",
    "iron-substitutions",
    "iron-notes",
    "fitness-settings",
    "fitness-overrides",
    "fitness-change-log",
    "ziip-settings",
    "ziip-done",
    "am-done",
    "pm-done",
    "skin-plan",
    "led-mask-done",
    "todos",
    "weekly-pool",
    "meals",
    "dismissed-ids",
    "recipes",
    "shopping-list",
    "today-picks",
    "pool-done",
    "icloud-url",
    "daily-order",
    "cors-proxy-url",
    "nutrition-targets",
    "recurring-tasks",
    "recurring-done",
    "daily-reflections",
    "weekly-reflections",
    "weight-goal"
  ];
  async function storageRead(key, attempts = 3) {
    let lastError = null;
    for (let i = 0; i < attempts; i++) {
      try {
        const raw = await withTimeout(idbGet(key), 5e3);
        if (raw === null) return { ok: true, found: false, value: null };
        return { ok: true, found: true, value: JSON.parse(raw) };
      } catch (e) {
        lastError = e;
        if (i < attempts - 1) {
          await new Promise((r) => setTimeout(r, 400 * (i + 1)));
        }
      }
    }
    console.error("storage read failed", key, lastError);
    return { ok: false, found: false, value: null, error: lastError };
  }
  async function storageSet(key, value) {
    try {
      await withTimeout(idbSet(key, JSON.stringify(value)), 5e3);
      return true;
    } catch (e) {
      console.error("storage set failed", key, e);
      return false;
    }
  }
  function Card({ children, style }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          padding: "16px 18px",
          marginBottom: 14,
          ...style
        }
      },
      children
    );
  }
  function SectionTitle({ children, sub }) {
    return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", fontSize: 20, color: COLORS.ink, letterSpacing: 0.2 } }, children), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginTop: 2 } }, sub));
  }
  function Check({ checked, onChange, label, sub }) {
    return /* @__PURE__ */ React.createElement(
      "label",
      {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: "9px 0",
          borderBottom: `1px solid ${COLORS.line}`,
          cursor: "pointer"
        }
      },
      /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "checkbox",
          checked,
          onChange,
          style: { marginTop: 3, width: 16, height: 16, accentColor: COLORS.green, flexShrink: 0 }
        }
      ),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14.5, color: COLORS.ink, textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.55 : 1 } }, label), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 1 } }, sub))
    );
  }
  function Pill({ children, tone = "green" }) {
    const bg = tone === "green" ? COLORS.greenSoft : COLORS.claySoft;
    const fg = tone === "green" ? COLORS.green : COLORS.clay;
    return /* @__PURE__ */ React.createElement("span", { style: { background: bg, color: fg, fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 20, letterSpacing: 0.3 } }, children);
  }
  function TabButton({ active, onClick, children }) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick,
        style: {
          flex: 1,
          padding: "10px 4px",
          background: "none",
          border: "none",
          borderBottom: active ? `2px solid ${COLORS.green}` : `2px solid transparent`,
          color: active ? COLORS.green : COLORS.inkSoft,
          fontWeight: active ? 700 : 500,
          fontSize: 12.5,
          cursor: "pointer",
          fontFamily: "inherit"
        }
      },
      children
    );
  }
  function Input(props) {
    return /* @__PURE__ */ React.createElement(
      "input",
      {
        ...props,
        style: {
          border: `1px solid ${COLORS.line}`,
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 14,
          fontFamily: "inherit",
          color: COLORS.ink,
          background: "#fff",
          ...props.style
        }
      }
    );
  }
  function Select(props) {
    return /* @__PURE__ */ React.createElement(
      "select",
      {
        ...props,
        style: {
          border: `1px solid ${COLORS.line}`,
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 13.5,
          fontFamily: "inherit",
          color: COLORS.ink,
          background: "#fff",
          ...props.style
        }
      },
      props.children
    );
  }
  function Btn({ children, onClick, tone = "green", style, disabled }) {
    const bg = tone === "green" ? COLORS.green : tone === "danger" ? COLORS.danger : "transparent";
    const color = tone === "ghost" ? COLORS.inkSoft : "#fff";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick,
        disabled,
        style: {
          background: bg,
          color,
          border: tone === "ghost" ? `1px solid ${COLORS.line}` : "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13.5,
          fontWeight: 600,
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.6 : 1,
          fontFamily: "inherit",
          ...style
        }
      },
      children
    );
  }
  function usePersist(loaded, persistFn, key, value) {
    const firstRun = useRef(true);
    useEffect(() => {
      if (!loaded) return;
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      persistFn(key, value);
    }, [value, loaded]);
  }
  function App() {
    const [tab, setTab] = useState("today");
    const [loaded, setLoaded] = useState(false);
    const [saveError, setSaveError] = useState(false);
    const [weightLogs, setWeightLogs] = useState([]);
    const [weightGoal, setWeightGoal] = useState(55.7);
    const [segmentalMuscleLogs, setSegmentalMuscleLogs] = useState([]);
    const [fitnessLogs, setFitnessLogs] = useState([]);
    const [ironLogs, setIronLogs] = useState({});
    const [ironEquipment, setIronEquipment] = useState({});
    const [ironSubstitutions, setIronSubstitutions] = useState({});
    const [ironNotes, setIronNotes] = useState({});
    const [fitnessSettings, setFitnessSettings] = useState({ startDate: "2026-08-24", startBlock: 1 });
    const [fitnessOverrides, setFitnessOverrides] = useState({});
    const [fitnessChangeLog, setFitnessChangeLog] = useState([]);
    const [ziipSettings, setZiipSettings] = useState({ startDate: "2026-08-24" });
    const [skinPlan, setSkinPlan] = useState(WEEKLY_SKIN_DEFAULT);
    const [ledMaskDone, setLedMaskDone] = useState({});
    const [ziipDone, setZiipDone] = useState({});
    const [amDone, setAmDone] = useState({});
    const [pmDone, setPmDone] = useState({});
    const [todos, setTodos] = useState(null);
    const [weeklyPool, setWeeklyPool] = useState([]);
    const [nutritionTargets, setNutritionTargets] = useState({ calories: null, protein: null, carbs: null, fat: null });
    const [todayPicks, setTodayPicks] = useState({});
    const [poolDone, setPoolDone] = useState({});
    const [dailyOrder, setDailyOrder] = useState({});
    const [meals, setMeals] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState(null);
    const [dismissedIds, setDismissedIds] = useState([]);
    const [recurringTasks, setRecurringTasks] = useState([]);
    const [recurringDone, setRecurringDone] = useState({});
    const [dailyReflections, setDailyReflections] = useState({});
    const [weeklyReflections, setWeeklyReflections] = useState({});
    const [lastBackupAt, setLastBackupAt] = useState(null);
    const [icloudUrl, setIcloudUrl] = useState("");
    const [icloudUrlInput, setIcloudUrlInput] = useState("");
    const [icloudStatus, setIcloudStatus] = useState("disconnected");
    const [icloudError, setIcloudError] = useState("");
    const [icloudLastSync, setIcloudLastSync] = useState(null);
    const [corsProxyUrl, setCorsProxyUrl] = useState("");
    const [corsProxyUrlInput, setCorsProxyUrlInput] = useState("");
    const syncIcloudCalendar = async (urlOverride) => {
      const rawUrl = urlOverride || icloudUrl;
      if (!rawUrl) {
        setIcloudError("Paste your iCloud public calendar link first.");
        return;
      }
      const httpsUrl = rawUrl.replace(/^webcal:\/\//i, "https://");
      const fetchUrl = corsProxyUrl ? `${corsProxyUrl}${corsProxyUrl.includes("?") ? "&" : "?"}url=${encodeURIComponent(httpsUrl)}` : httpsUrl;
      setIcloudStatus("syncing");
      setIcloudError("");
      try {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error(`iCloud returned ${res.status}. If this persists, your browser may be blocking cross-site calendar requests (CORS) \u2014 let me know and we'll switch approach.`);
        const text = await res.text();
        const todayStr = todayISO();
        const maxDateStr = new Date(Date.now() + 60 * 24 * 60 * 60 * 1e3).toISOString().slice(0, 10);
        const events = parseICS(text, todayStr, maxDateStr);
        const items = events.filter((ev) => ev.date && ev.date >= todayStr && ev.date <= maxDateStr).map((ev) => {
          const text2 = ev.time ? `${ev.time} \u2014 ${ev.summary || "(untitled)"}` : ev.summary || "(untitled)";
          const idBase = ev.uid ? `${ev.uid}-${ev.date}` : `${ev.date}-${ev.summary || ""}`;
          return { id: "ical-" + idBase, date: ev.date, text: text2, source: "calendar-live", done: false };
        });
        setTodos((prev) => {
          const withoutOldIcal = (prev || []).filter((t) => t.source !== "calendar-live");
          return [...withoutOldIcal, ...items];
        });
        setIcloudStatus("connected");
        setIcloudLastSync((/* @__PURE__ */ new Date()).toISOString());
      } catch (e) {
        setIcloudStatus("error");
        const msg = e && e.message ? e.message : String(e);
        setIcloudError(msg.includes("Failed to fetch") ? "Couldn't reach iCloud \u2014 this is a confirmed CORS restriction. Set up the proxy below to fix this." : msg);
      }
    };
    const saveIcloudUrl = () => {
      if (!icloudUrlInput.trim()) return;
      setIcloudUrl(icloudUrlInput.trim());
      syncIcloudCalendar(icloudUrlInput.trim());
    };
    const saveCorsProxyUrl = () => {
      setCorsProxyUrl(corsProxyUrlInput.trim());
      if (icloudUrl) syncIcloudCalendar(icloudUrl);
    };
    const [loadError, setLoadError] = useState(false);
    const [loadAttempt, setLoadAttempt] = useState(0);
    useEffect(() => {
      let cancelled = false;
      (async () => {
        setLoaded(false);
        setLoadError(false);
        const readOrMissing = async (key) => {
          const result = await storageRead(key, 3);
          if (!result.ok) throw new Error(`Could not read ${key}`);
          return result;
        };
        try {
          const todosR = await readOrMissing("todos");
          const poolR = await readOrMissing("weekly-pool");
          const dismissedR = await readOrMissing("dismissed-ids");
          const recurringTasksR = await readOrMissing("recurring-tasks");
          const recurringDoneR = await readOrMissing("recurring-done");
          const dailyReflectionsR = await readOrMissing("daily-reflections");
          const weeklyReflectionsR = await readOrMissing("weekly-reflections");
          const todayPicksR = await readOrMissing("today-picks");
          const poolDoneR = await readOrMissing("pool-done");
          const dailyOrderR = await readOrMissing("daily-order");
          const icloudUrlR = await readOrMissing("icloud-url");
          const corsProxyUrlR = await readOrMissing("cors-proxy-url");
          const nutritionTargetsR = await readOrMissing("nutrition-targets");
          const lastBackupAtR = await readOrMissing("last-backup-at");
          const weightLogsR = await readOrMissing("weight-logs");
          const weightGoalR = await readOrMissing("weight-goal");
          const segmentalMuscleLogsR = await readOrMissing("segmental-muscle-logs");
          const fitnessLogsR = await readOrMissing("fitness-logs");
          const ironLogsR = await readOrMissing("iron-exercise-logs");
          const ironEquipmentR = await readOrMissing("iron-equipment");
          const ironSubstitutionsR = await readOrMissing("iron-substitutions");
          const ironNotesR = await readOrMissing("iron-notes");
          const fitnessSettingsR = await readOrMissing("fitness-settings");
          const fitnessOverridesR = await readOrMissing("fitness-overrides");
          const fitnessChangeLogR = await readOrMissing("fitness-change-log");
          const ziipSettingsR = await readOrMissing("ziip-settings");
          const skinPlanR = await readOrMissing("skin-plan");
          const ledMaskDoneR = await readOrMissing("led-mask-done");
          const ziipDoneR = await readOrMissing("ziip-done");
          const amDoneR = await readOrMissing("am-done");
          const pmDoneR = await readOrMissing("pm-done");
          const mealsR = await readOrMissing("meals");
          const recipesR = await readOrMissing("recipes");
          const shoppingListR = await readOrMissing("shopping-list");
          if (cancelled) return;
          const dismissedIdsV = dismissedR.found ? dismissedR.value : [];
          const seededTodos = todosR.found ? todosR.value : null;
          const poolLoaded = poolR.found ? poolR.value : null;
          setWeightLogs(weightLogsR.found ? weightLogsR.value : []);
          setWeightGoal(weightGoalR.found ? weightGoalR.value : 55.7);
          setSegmentalMuscleLogs(segmentalMuscleLogsR.found ? segmentalMuscleLogsR.value : []);
          setFitnessLogs(fitnessLogsR.found ? fitnessLogsR.value : []);
          setIronLogs(ironLogsR.found ? ironLogsR.value : {});
          setIronEquipment(ironEquipmentR.found ? ironEquipmentR.value : {});
          setIronSubstitutions(ironSubstitutionsR.found ? ironSubstitutionsR.value : {});
          setIronNotes(ironNotesR.found ? ironNotesR.value : {});
          setFitnessSettings(fitnessSettingsR.found ? fitnessSettingsR.value : { startDate: "2026-08-24", startBlock: 1 });
          setFitnessOverrides(fitnessOverridesR.found ? fitnessOverridesR.value : {});
          setFitnessChangeLog(fitnessChangeLogR.found ? fitnessChangeLogR.value : []);
          setZiipSettings(ziipSettingsR.found ? ziipSettingsR.value : { startDate: "2026-08-24" });
          setSkinPlan(skinPlanR.found ? skinPlanR.value : WEEKLY_SKIN_DEFAULT);
          setLedMaskDone(ledMaskDoneR.found ? ledMaskDoneR.value : {});
          setZiipDone(ziipDoneR.found ? ziipDoneR.value : {});
          setAmDone(amDoneR.found ? amDoneR.value : {});
          setPmDone(pmDoneR.found ? pmDoneR.value : {});
          setRecurringTasks(recurringTasksR.found ? recurringTasksR.value : []);
          setRecurringDone(recurringDoneR.found ? recurringDoneR.value : {});
          setDailyReflections(dailyReflectionsR.found ? dailyReflectionsR.value : {});
          setWeeklyReflections(weeklyReflectionsR.found ? weeklyReflectionsR.value : {});
          const baseTodos = seededTodos !== null ? seededTodos : [];
          const todayStr = todayISO();
          const todayPicksV = todayPicksR.found ? todayPicksR.value : {};
          const poolDoneV = poolDoneR.found ? poolDoneR.value : {};
          const { rolledTodos, rolledTodayPicks } = rollForwardIncomplete(baseTodos, todayPicksV, poolDoneV, todayStr);
          setTodos(rolledTodos);
          const basePool = poolLoaded !== null ? poolLoaded : EXTRA_SEED.map((e) => ({ id: e.id, text: e.text })).filter((e) => !dismissedIdsV.includes(e.id));
          setWeeklyPool(basePool);
          setMeals(mealsR.found ? mealsR.value : {});
          setDismissedIds(dismissedIdsV);
          setRecipes(recipesR.found ? recipesR.value : RECIPE_SEED);
          setShoppingList(shoppingListR.found ? shoppingListR.value : null);
          setTodayPicks(rolledTodayPicks);
          setPoolDone(poolDoneV);
          setDailyOrder(dailyOrderR.found ? dailyOrderR.value : {});
          if (icloudUrlR.found && icloudUrlR.value) {
            setIcloudUrl(icloudUrlR.value);
            setIcloudUrlInput(icloudUrlR.value);
          }
          if (corsProxyUrlR.found && corsProxyUrlR.value) {
            setCorsProxyUrl(corsProxyUrlR.value);
            setCorsProxyUrlInput(corsProxyUrlR.value);
          }
          if (nutritionTargetsR.found && nutritionTargetsR.value) setNutritionTargets(nutritionTargetsR.value);
          setLastBackupAt(lastBackupAtR.found ? lastBackupAtR.value : null);
          setLoaded(true);
        } catch (e) {
          console.error("Startup storage load failed", e);
          if (!cancelled) {
            setLoadError(true);
            setLoaded(false);
          }
        }
      })();
      return () => {
        cancelled = true;
      };
    }, [loadAttempt]);
    const todosRef = useRef(todos);
    useEffect(() => {
      todosRef.current = todos;
    }, [todos]);
    const todayPicksRef = useRef(todayPicks);
    useEffect(() => {
      todayPicksRef.current = todayPicks;
    }, [todayPicks]);
    const poolDoneRef = useRef(poolDone);
    useEffect(() => {
      poolDoneRef.current = poolDone;
    }, [poolDone]);
    const lastSeenDateRef = useRef(todayISO());
    useEffect(() => {
      if (!loaded) return;
      const checkDateChange = () => {
        if (document.visibilityState !== "visible") return;
        const nowStr = todayISO();
        if (nowStr === lastSeenDateRef.current) return;
        lastSeenDateRef.current = nowStr;
        const { rolledTodos, rolledTodayPicks } = rollForwardIncomplete(todosRef.current || [], todayPicksRef.current || {}, poolDoneRef.current || {}, nowStr);
        setTodos(rolledTodos);
        setTodayPicks(rolledTodayPicks);
      };
      document.addEventListener("visibilitychange", checkDateChange);
      window.addEventListener("focus", checkDateChange);
      return () => {
        document.removeEventListener("visibilitychange", checkDateChange);
        window.removeEventListener("focus", checkDateChange);
      };
    }, [loaded]);
    const saveChainRef = useRef(Promise.resolve());
    const pendingWritesRef = useRef(0);
    const [savingCount, setSavingCount] = useState(0);
    const persist = useCallback((key, value) => {
      const snapshot = JSON.parse(JSON.stringify(value));
      pendingWritesRef.current += 1;
      setSavingCount(pendingWritesRef.current);
      const runSave = async () => {
        let ok = await storageSet(key, snapshot);
        if (!ok) {
          await new Promise((r) => setTimeout(r, 1200));
          ok = await storageSet(key, snapshot);
        }
        setSaveError(!ok);
        pendingWritesRef.current = Math.max(0, pendingWritesRef.current - 1);
        setSavingCount(pendingWritesRef.current);
      };
      saveChainRef.current = saveChainRef.current.then(runSave, runSave);
    }, []);
    const retryAllSaves = () => {
      setSaveError(false);
      persist("weight-logs", weightLogs);
      persist("fitness-logs", fitnessLogs);
      persist("iron-exercise-logs", ironLogs);
      persist("iron-equipment", ironEquipment);
      persist("fitness-settings", fitnessSettings);
      persist("ziip-settings", ziipSettings);
      persist("ziip-done", ziipDone);
      persist("am-done", amDone);
      persist("pm-done", pmDone);
      if (todos) persist("todos", todos);
      persist("meals", meals);
      persist("dismissed-ids", dismissedIds);
      persist("weekly-pool", weeklyPool);
      persist("today-picks", todayPicks);
      persist("pool-done", poolDone);
      persist("daily-order", dailyOrder);
      if (icloudUrl) persist("icloud-url", icloudUrl);
      if (corsProxyUrl) persist("cors-proxy-url", corsProxyUrl);
      persist("recipes", recipes);
      if (shoppingList) persist("shopping-list", shoppingList);
    };
    const exportBackup = async () => {
      const data = {};
      for (const key of ALL_STORAGE_KEYS) {
        const result = await storageRead(key, 1);
        if (result.found) data[key] = result.value;
      }
      const payload = { exportedAt: (/* @__PURE__ */ new Date()).toISOString(), data };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `life-tracker-backup-${todayISO()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      const stamp = (/* @__PURE__ */ new Date()).toISOString();
      setLastBackupAt(stamp);
      persist("last-backup-at", stamp);
    };
    const [importMessage, setImportMessage] = useState("");
    const importBackup = async (file) => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const data = parsed.data || parsed;
        for (const key of ALL_STORAGE_KEYS) {
          if (data[key] === void 0) continue;
          if (key === "weight-logs" && Array.isArray(data[key])) {
            const currentResult = await storageRead(key, 1);
            const current = (currentResult.found ? currentResult.value : []).map(migrateLogEntry);
            const incoming = data[key].map(migrateLogEntry);
            const incomingById = {};
            incoming.forEach((e) => {
              incomingById[e.id] = e;
            });
            const { result } = applySourceImport(current, incomingById);
            await storageSet(key, result);
          } else {
            await storageSet(key, data[key]);
          }
        }
        setImportMessage("Backup imported \u2014 reloading\u2026");
        setTimeout(() => setLoadAttempt((n) => n + 1), 800);
        setTimeout(() => setImportMessage(""), 4e3);
      } catch (e) {
        setImportMessage("Couldn't read that file \u2014 is it a backup exported from this tracker?");
      }
    };
    usePersist(loaded, persist, "weight-logs", weightLogs);
    usePersist(loaded, persist, "weight-goal", weightGoal);
    usePersist(loaded, persist, "segmental-muscle-logs", segmentalMuscleLogs);
    usePersist(loaded, persist, "fitness-logs", fitnessLogs);
    usePersist(loaded, persist, "iron-exercise-logs", ironLogs);
    usePersist(loaded, persist, "iron-equipment", ironEquipment);
    usePersist(loaded, persist, "iron-substitutions", ironSubstitutions);
    usePersist(loaded, persist, "iron-notes", ironNotes);
    usePersist(loaded, persist, "fitness-settings", fitnessSettings);
    usePersist(loaded, persist, "fitness-overrides", fitnessOverrides);
    usePersist(loaded, persist, "fitness-change-log", fitnessChangeLog);
    usePersist(loaded, persist, "ziip-settings", ziipSettings);
    usePersist(loaded, persist, "skin-plan", skinPlan);
    usePersist(loaded, persist, "led-mask-done", ledMaskDone);
    usePersist(loaded, persist, "ziip-done", ziipDone);
    usePersist(loaded, persist, "am-done", amDone);
    usePersist(loaded, persist, "pm-done", pmDone);
    usePersist(loaded && !!todos, persist, "todos", todos);
    usePersist(loaded, persist, "meals", meals);
    usePersist(loaded, persist, "dismissed-ids", dismissedIds);
    usePersist(loaded, persist, "recurring-tasks", recurringTasks);
    usePersist(loaded, persist, "recurring-done", recurringDone);
    usePersist(loaded, persist, "daily-reflections", dailyReflections);
    usePersist(loaded, persist, "weekly-reflections", weeklyReflections);
    usePersist(loaded, persist, "weekly-pool", weeklyPool);
    usePersist(loaded, persist, "nutrition-targets", nutritionTargets);
    usePersist(loaded, persist, "today-picks", todayPicks);
    usePersist(loaded, persist, "pool-done", poolDone);
    usePersist(loaded, persist, "daily-order", dailyOrder);
    usePersist(loaded, persist, "icloud-url", icloudUrl);
    usePersist(loaded, persist, "cors-proxy-url", corsProxyUrl);
    usePersist(loaded, persist, "last-backup-at", lastBackupAt);
    usePersist(loaded, persist, "recipes", recipes);
    usePersist(loaded && !!shoppingList, persist, "shopping-list", shoppingList);
    const today = todayISO();
    const [viewDate, setViewDate] = useState(today);
    const isRetreatDay = RETREAT_DATES.includes(today);
    const { ziipDayIdx, ziipToday } = computeZiipForDate(today, ziipSettings);
    const { weekNum, blockIdx, dayInBlock, block, regularSession } = computeFitnessForDate(today, fitnessSettings, fitnessOverrides);
    if (!loaded) {
      return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.inkSoft, padding: 24 } }, loadError ? /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 420, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", fontSize: 22, color: COLORS.ink, marginBottom: 10 } }, "Couldn't load your saved tracker data"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.5, marginBottom: 16 } }, "The tracker has not substituted old/default data. Retry the storage read before continuing."), /* @__PURE__ */ React.createElement(Btn, { onClick: () => setLoadAttempt((n) => n + 1) }, "Retry loading")) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif" } }, "Loading saved data\u2026"));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: COLORS.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", paddingBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 640, margin: "0 auto", padding: "20px 16px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", fontSize: 26, color: COLORS.ink } }, "Kirsty"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: COLORS.ink } }, fmtDate(today)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setTab("settings"),
        title: "Settings",
        style: {
          background: tab === "settings" ? COLORS.green : "none",
          border: `1px solid ${tab === "settings" ? COLORS.green : COLORS.line}`,
          borderRadius: 999,
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 15,
          lineHeight: 1,
          color: tab === "settings" ? "#fff" : COLORS.inkSoft,
          padding: 0
        }
      },
      "\u2699"
    ))), /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: COLORS.gold, width: 40, marginBottom: 10, opacity: 0.6 } }), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, fontSize: 12, fontWeight: 600, color: saveError ? COLORS.danger : savingCount > 0 ? COLORS.clay : COLORS.green, display: "flex", alignItems: "center", gap: 6 } }, saveError ? /* @__PURE__ */ React.createElement(React.Fragment, null, "\u26A0 A change still needs to be saved") : savingCount > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, '\u23F3 Saving \u2014 wait for "All changes saved" before closing') : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u2713 All changes saved")), saveError && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.danger, color: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, "\u26A0 A change didn't save \u2014 check your connection"), /* @__PURE__ */ React.createElement("button", { onClick: retryAllSaves, style: { background: "#fff", color: COLORS.danger, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "Retry now")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", borderBottom: `1px solid ${COLORS.line}`, marginBottom: 16, overflowX: "auto" } }, /* @__PURE__ */ React.createElement(TabButton, { active: tab === "today", onClick: () => setTab("today") }, "Glance"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "week", onClick: () => setTab("week") }, "Week"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "weight", onClick: () => setTab("weight") }, "Weight"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "fitness", onClick: () => setTab("fitness") }, "Fitness"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "skin", onClick: () => setTab("skin") }, "Skin"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "meals", onClick: () => setTab("meals") }, "Meals"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "todo", onClick: () => setTab("todo") }, "To-Do")), tab === "today" && /* @__PURE__ */ React.createElement(
      TodayTab,
      {
        today,
        viewDate,
        setViewDate,
        fitnessSettings,
        fitnessOverrides,
        fitnessLogs,
        ziipSettings,
        skinPlan,
        ledMaskDone,
        setLedMaskDone,
        todos,
        setTodos,
        weightLogs,
        weightGoal,
        meals,
        weeklyPool,
        todayPicks,
        setTodayPicks,
        poolDone,
        setPoolDone,
        dailyOrder,
        setDailyOrder,
        recurringTasks,
        recurringDone,
        setRecurringDone,
        dailyReflections,
        setDailyReflections,
        setTab
      }
    ), tab === "week" && /* @__PURE__ */ React.createElement(
      WeekTab,
      {
        today,
        fitnessSettings,
        fitnessOverrides,
        fitnessLogs,
        ziipSettings,
        skinPlan,
        ledMaskDone,
        todos,
        meals,
        weeklyPool,
        todayPicks,
        poolDone,
        recurringTasks,
        recurringDone,
        weeklyReflections,
        setWeeklyReflections,
        setTab,
        setViewDate
      }
    ), tab === "weight" && /* @__PURE__ */ React.createElement(WeightTab, { logs: weightLogs, setLogs: setWeightLogs, segmentalMuscleLogs, setSegmentalMuscleLogs, weightGoal, setWeightGoal }), tab === "fitness" && /* @__PURE__ */ React.createElement(
      FitnessTab,
      {
        settings: fitnessSettings,
        setSettings: setFitnessSettings,
        fitnessOverrides,
        setFitnessOverrides,
        fitnessChangeLog,
        setFitnessChangeLog,
        logs: fitnessLogs,
        setLogs: setFitnessLogs,
        ironLogs,
        setIronLogs,
        ironEquipment,
        setIronEquipment,
        ironSubstitutions,
        setIronSubstitutions,
        ironNotes,
        setIronNotes,
        today,
        isRetreatDay,
        regularSession,
        block,
        blockIdx,
        weekNum,
        dayInBlock
      }
    ), tab === "skin" && /* @__PURE__ */ React.createElement(
      SkinTab,
      {
        today,
        isRetreatDay,
        ziipSettings,
        setZiipSettings,
        ziipToday,
        ziipDayIdx,
        ziipDone,
        setZiipDone,
        amDone,
        setAmDone,
        pmDone,
        setPmDone,
        skinPlan,
        setSkinPlan,
        ledMaskDone,
        setLedMaskDone
      }
    ), tab === "meals" && /* @__PURE__ */ React.createElement(
      MealsTab,
      {
        today,
        meals,
        setMeals,
        recipes,
        setRecipes,
        shoppingList,
        setShoppingList,
        nutritionTargets,
        setNutritionTargets
      }
    ), tab === "todo" && /* @__PURE__ */ React.createElement(
      TodoTab,
      {
        todos,
        setTodos,
        weeklyPool,
        setWeeklyPool,
        todayPicks,
        setTodayPicks,
        dismissedIds,
        setDismissedIds,
        recurringTasks,
        setRecurringTasks,
        today
      }
    ), tab === "settings" && /* @__PURE__ */ React.createElement(
      SettingsTab,
      {
        weightLogs,
        setWeightLogs,
        weeklyPool,
        setWeeklyPool,
        dismissedIds,
        todos,
        setTodos,
        icloudUrlInput,
        setIcloudUrlInput,
        icloudStatus,
        icloudError,
        icloudLastSync,
        saveIcloudUrl,
        syncIcloudCalendar,
        corsProxyUrlInput,
        setCorsProxyUrlInput,
        saveCorsProxyUrl,
        exportBackup,
        importBackup,
        importMessage,
        lastBackupAt
      }
    )));
  }
  function TodayTab({ today, viewDate, setViewDate, fitnessSettings, fitnessOverrides, fitnessLogs, ziipSettings, skinPlan, ledMaskDone, setLedMaskDone, todos, setTodos, weightLogs, weightGoal, meals, weeklyPool, todayPicks, setTodayPicks, poolDone, setPoolDone, dailyOrder, setDailyOrder, recurringTasks, recurringDone, setRecurringDone, dailyReflections, setDailyReflections, setTab }) {
    const isRetreatDay = RETREAT_DATES.includes(viewDate);
    const retreat = isRetreatDay ? RETREAT[viewDate] : null;
    const { ziipDayIdx, ziipToday } = computeZiipForDate(viewDate, ziipSettings);
    const { weekNum, block, regularSession, isOverridden } = computeFitnessForDate(viewDate, fitnessSettings, fitnessOverrides);
    const dailyStats = dailyTaskStats(viewDate, todos, todayPicks, poolDone, recurringTasks, recurringDone);
    const taskStreak = computeTaskStreak(today, todos, todayPicks, poolDone, recurringTasks, recurringDone);
    const workoutStreak = computeWorkoutStreak(today, fitnessSettings, fitnessOverrides, fitnessLogs);
    const isRestDay = regularSession && regularSession.trim().toLowerCase() === "rest";
    const workoutLoggedToday = (fitnessLogs || []).some((l) => l.date === viewDate);
    const appts = (todos || []).filter((t) => t.date === viewDate && (t.source === "calendar" || t.source === "calendar-live" || t.source === "retreat"));
    const otherTodos = (todos || []).filter((t) => t.date === viewDate && t.source !== "calendar" && t.source !== "calendar-live" && t.source !== "retreat");
    const lastWeight = weightLogs.length ? weightLogs[weightLogs.length - 1] : null;
    const dow = dayOfWeekISO(viewDate);
    const schedule = skinPlan[dow];
    const isNonZiipDay = !ziipToday || ziipToday.rest;
    const ledMaskDoneToday = !!ledMaskDone[viewDate];
    const toggleLedMask = () => setLedMaskDone({ ...ledMaskDone, [viewDate]: !ledMaskDoneToday });
    const hasExfoliatingCleanseAm = schedule.am.some((s) => s.id === "active_cleanse");
    const mealEntry = meals[viewDate];
    const isToday = viewDate === today;
    const pickedIds = todayPicks[viewDate] || [];
    const pickedItems = weeklyPool.filter((p) => pickedIds.includes(p.id));
    const doneIds = poolDone[viewDate] || [];
    const dueRecurring = dueRecurringTasksForDate(viewDate, recurringTasks);
    const recurringDoneIds = recurringDone[viewDate] || [];
    const [quickAddText, setQuickAddText] = useState("");
    const addQuickTask = () => {
      if (!quickAddText.trim()) return;
      setTodos([...todos || [], { id: "t-" + Date.now(), date: viewDate, text: quickAddText.trim(), source: "manual", done: false }]);
      setQuickAddText("");
    };
    const togglePoolDoneToday = (id) => {
      const cur = poolDone[viewDate] || [];
      const next = cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id];
      setPoolDone({ ...poolDone, [viewDate]: next });
    };
    const toggleTodoDone = (id) => {
      setTodos((todos || []).map((t) => t.id === id ? { ...t, done: !t.done } : t));
    };
    const removeQuickTask = (id) => {
      setTodos((todos || []).filter((t) => t.id !== id));
    };
    const unpickToday = (id) => {
      const cur = todayPicks[viewDate] || [];
      setTodayPicks({ ...todayPicks, [viewDate]: cur.filter((i) => i !== id) });
    };
    const toggleRecurringDone = (id) => {
      const cur = recurringDone[viewDate] || [];
      const next = cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id];
      setRecurringDone({ ...recurringDone, [viewDate]: next });
    };
    const naturalItems = [
      ...pickedItems.map((t) => ({ ...t, kind: "pool" })),
      ...otherTodos.map((t) => ({ ...t, kind: "todo" })),
      ...dueRecurring.map((t) => ({ ...t, kind: "recurring" }))
    ];
    const savedOrder = dailyOrder[viewDate] || [];
    const isItemDone = (t) => t.kind === "pool" ? doneIds.includes(t.id) : t.kind === "recurring" ? recurringDoneIds.includes(t.id) : !!t.done;
    const orderedItems = [...naturalItems].sort((a, b) => {
      const doneA = isItemDone(a);
      const doneB = isItemDone(b);
      if (doneA !== doneB) return doneA ? 1 : -1;
      const ia = savedOrder.indexOf(a.id);
      const ib = savedOrder.indexOf(b.id);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    const moveItem = (id, direction) => {
      const currentIds = orderedItems.map((it) => it.id);
      const idx = currentIds.indexOf(id);
      const swapWith = idx + direction;
      if (swapWith < 0 || swapWith >= currentIds.length) return;
      [currentIds[idx], currentIds[swapWith]] = [currentIds[swapWith], currentIds[idx]];
      setDailyOrder({ ...dailyOrder, [viewDate]: currentIds });
    };
    const shiftDay = (n) => {
      setViewDate(addDaysISO(viewDate, n));
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => shiftDay(-1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14.5, fontWeight: 700, color: COLORS.ink } }, isToday ? "Today" : fmtDate(viewDate)), !isToday && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft } }, fmtDate(viewDate)), !isToday && /* @__PURE__ */ React.createElement("button", { onClick: () => setViewDate(today), style: { background: "none", border: "none", color: COLORS.clay, fontSize: 11, cursor: "pointer", padding: 0 } }, "back to today")), /* @__PURE__ */ React.createElement("button", { onClick: () => shiftDay(1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u203A")), /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: isRetreatDay ? COLORS.claySoft : COLORS.card } }, retreat ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "RETREAT \u2014 ", retreat.theme), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 14, lineHeight: 1.6, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Yoga:"), " ", retreat.yoga), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Training:"), " ", retreat.training), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Treatment:"), " ", retreat.treatment), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontStyle: "italic", color: COLORS.clay } }, retreat.skinNote))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, null, "Week ", weekNum, " \u2014 ", block.name), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 15, color: COLORS.ink } }, regularSession), isOverridden && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: 11.5, color: COLORS.clay } }, "Swapped from the regular schedule \u2014 change it back anytime in Fitness."))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Appointments & events"), appts.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Nothing on the calendar.") : appts.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { fontSize: 14, padding: "5px 0", color: COLORS.ink } }, "\u2022 ", t.text))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Skin \u2014 ZIIP"), ziipToday && !ziipToday.rest ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink } }, "Day ", ziipDayIdx + 1, ": ", ziipToday.t.map(([n, m]) => `${n} (${m}min)`).join(" \xB7 ")) : ziipToday === null ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Outside the current 30-day plan.") : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Rest day"), isNonZiipDay && !isRetreatDay && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.line}`, display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: ledMaskDoneToday, onChange: toggleLedMask, style: { accentColor: COLORS.clay, width: 16, height: 16 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: COLORS.ink } }, "LED mask"))), !isRetreatDay && (hasExfoliatingCleanseAm || dow === 4) && /* @__PURE__ */ React.createElement(Card, { style: dow === 4 ? { borderColor: COLORS.clay } : {} }, /* @__PURE__ */ React.createElement(SectionTitle, null, "Skin ", dow === 4 && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), hasExfoliatingCleanseAm && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink } }, "AM: Exfoliating cleanse day"), dow === 4 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink, marginTop: hasExfoliatingCleanseAm ? 3 : 0 } }, "PM: Exfoliation night"), isToday && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("skin"), style: { background: "none", border: "none", color: COLORS.green, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 } }, "Open full skin checklist \u2192"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Meals"), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.7, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Breakfast:"), " ", RETREAT_CONSTANTS.breakfast), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Lunch:"), " ", retreat.lunch), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Dinner:"), " ", retreat.dinner)) : mealEntry && (mealEntry.breakfast || mealEntry.lunch || mealEntry.dinner || mealEntry.snacks) ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.7, color: COLORS.ink } }, mealEntry.breakfast && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Breakfast:"), " ", mealEntry.breakfast), mealEntry.lunch && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Lunch:"), " ", mealEntry.lunch), mealEntry.dinner && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Dinner:"), " ", mealEntry.dinner), mealEntry.snacks && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Snacks:"), " ", mealEntry.snacks)) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Nothing planned yet \u2014 add it in the Meals tab.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Tick weekly-pool items as you finish them, add anything one-off for this day, or pick more from the pool in the To-Do tab." }, isToday ? "Today's to-do list" : `To-do \u2014 ${fmtDate(viewDate)}`), orderedItems.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft, marginBottom: 8 } }, "Nothing on the list for this day yet.") : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, orderedItems.map((t, i) => {
      const done = t.kind === "pool" ? doneIds.includes(t.id) : t.kind === "recurring" ? recurringDoneIds.includes(t.id) : !!t.done;
      const toggle = t.kind === "pool" ? () => togglePoolDoneToday(t.id) : t.kind === "recurring" ? () => toggleRecurringDone(t.id) : () => toggleTodoDone(t.id);
      const removeAction = t.kind === "pool" ? () => unpickToday(t.id) : t.kind === "recurring" ? null : () => removeQuickTask(t.id);
      const removeLabel = t.kind === "pool" ? "remove" : "\u2715";
      const removeColor = t.kind === "pool" ? COLORS.inkSoft : COLORS.danger;
      return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 6, padding: "5px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => moveItem(t.id, -1), disabled: i === 0, style: { background: "none", border: "none", color: i === 0 ? COLORS.line : COLORS.inkSoft, cursor: i === 0 ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: "1px 4px" } }, "\u25B2"), /* @__PURE__ */ React.createElement("button", { onClick: () => moveItem(t.id, 1), disabled: i === orderedItems.length - 1, style: { background: "none", border: "none", color: i === orderedItems.length - 1 ? COLORS.line : COLORS.inkSoft, cursor: i === orderedItems.length - 1 ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: "1px 4px" } }, "\u25BC")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: done, onChange: toggle, style: { accentColor: COLORS.clay, width: 16, height: 16, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: done ? COLORS.inkSoft : COLORS.ink, textDecoration: done ? "line-through" : "none" } }, t.text, t.kind === "recurring" && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 6, fontSize: 10.5, fontWeight: 700, color: COLORS.slate, border: `1px solid ${COLORS.slate}`, borderRadius: 4, padding: "1px 5px" } }, "RECURRING")), removeAction && /* @__PURE__ */ React.createElement("button", { onClick: removeAction, title: t.kind === "pool" ? "Remove from today's list (stays in the pool)" : void 0, style: { background: "none", border: "none", color: removeColor, cursor: "pointer", fontSize: t.kind === "pool" ? 11 : 12 } }, removeLabel));
    })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: isToday ? "Add a task for today\u2026" : `Add a task for ${fmtDate(viewDate)}\u2026`,
        value: quickAddText,
        onChange: (e) => setQuickAddText(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") addQuickTask();
        },
        style: { flex: 1 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { onClick: addQuickTask }, "Add")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("todo"), style: { background: "none", border: "none", color: COLORS.green, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 } }, "Pick more from the weekly pool \u2192"))), isToday && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Weight"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink } }, lastWeight ? `Last logged: ${lastWeight.weight}kg on ${fmtDate(lastWeight.date)}` : "No entries yet."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginTop: 3 } }, "Goal: ", weightGoal, "kg")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Task and workout counts are automatic \u2014 the rest is up to you." }, "Daily reflection"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink, marginBottom: 10, lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("div", null, dailyStats.total > 0 ? `${dailyStats.done} of ${dailyStats.total} tasks done` : "No tasks tracked today"), /* @__PURE__ */ React.createElement("div", null, isRestDay ? "Rest day" : workoutLoggedToday ? "Workout logged \u2713" : "Workout not logged yet"), (taskStreak > 1 || workoutStreak > 1) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, color: COLORS.clay, fontWeight: 600 } }, [taskStreak > 1 && `\u{1F525} ${taskStreak}-day task streak`, workoutStreak > 1 && `\u{1F525} ${workoutStreak}-day workout streak`].filter(Boolean).join(" \xB7 "))), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: dailyReflections[viewDate] || "",
        onChange: (e) => setDailyReflections({ ...dailyReflections, [viewDate]: e.target.value }),
        placeholder: "How did today go?",
        rows: 4,
        style: { width: "100%", fontFamily: "inherit", fontSize: 14, padding: 10, borderRadius: 8, border: `1px solid ${COLORS.line}`, background: COLORS.card, color: COLORS.ink, resize: "vertical", boxSizing: "border-box" }
      }
    )));
  }
  function WeekTab({ today, fitnessSettings, fitnessOverrides, fitnessLogs, ziipSettings, skinPlan, ledMaskDone, todos, meals, weeklyPool, todayPicks, poolDone, recurringTasks, recurringDone, weeklyReflections, setWeeklyReflections, setTab, setViewDate }) {
    const [weekStart, setWeekStart] = useState(mondayOfWeekISO(today));
    const days = Array.from({ length: 7 }, (_, i) => addDaysISO(weekStart, i));
    const shiftWeek = (n) => {
      setWeekStart(addDaysISO(weekStart, n * 7));
    };
    const weeklyTaskTotals = days.reduce(
      (acc, d) => {
        const { total, done } = dailyTaskStats(d, todos, todayPicks, poolDone, recurringTasks, recurringDone);
        return { total: acc.total + total, done: acc.done + done };
      },
      { total: 0, done: 0 }
    );
    const scheduledWorkouts = days.filter((d) => {
      const { regularSession } = computeFitnessForDate(d, fitnessSettings, fitnessOverrides);
      return regularSession && regularSession.trim().toLowerCase() !== "rest";
    }).length;
    const completedWorkouts = days.filter((d) => (fitnessLogs || []).some((l) => l.date === d)).length;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => shiftWeek(-1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: COLORS.ink } }, fmtDate(days[0]), " \u2013 ", fmtDate(days[6])), /* @__PURE__ */ React.createElement("button", { onClick: () => shiftWeek(1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u203A")), weekStart !== mondayOfWeekISO(today) && /* @__PURE__ */ React.createElement("button", { onClick: () => setWeekStart(mondayOfWeekISO(today)), style: { background: "none", border: "none", color: COLORS.clay, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 10 } }, "back to this week"), days.map((d) => {
      const isRetreatDay = RETREAT_DATES.includes(d);
      const retreat = isRetreatDay ? RETREAT[d] : null;
      const { ziipDayIdx, ziipToday } = computeZiipForDate(d, ziipSettings);
      const { regularSession } = computeFitnessForDate(d, fitnessSettings, fitnessOverrides);
      const appts = (todos || []).filter((t) => t.date === d && (t.source === "calendar" || t.source === "calendar-live" || t.source === "retreat"));
      const dueRecurring = dueRecurringTasksForDate(d, recurringTasks);
      const mealEntry = meals[d];
      const isToday = d === today;
      const dow = dayOfWeekISO(d);
      const schedule = skinPlan[dow];
      const isExfoliationNight = dow === 4 && !isRetreatDay;
      const hasExfoliatingCleanseAm = schedule.am.some((s) => s.id === "active_cleanse");
      const isNonZiipDay = !ziipToday || ziipToday.rest;
      const ledMaskDoneOnDay = !!ledMaskDone[d];
      return /* @__PURE__ */ React.createElement(
        Card,
        {
          key: d,
          style: { borderColor: isToday ? COLORS.green : isExfoliationNight ? COLORS.clay : COLORS.line, cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement("div", { onClick: () => {
          setViewDate(d);
          setTab("today");
        } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14.5, fontWeight: 700, color: isToday ? COLORS.green : COLORS.ink } }, fmtDate(d)), isRetreatDay && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, retreat.theme), !isRetreatDay && isExfoliationNight && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink, marginTop: 4 } }, isRetreatDay ? retreat.training : regularSession), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, ziipToday && !ziipToday.rest ? `ZIIP: ${ziipToday.t.map(([n]) => n).join(", ")}` : "ZIIP: rest", isNonZiipDay && ` \xB7 LED mask${ledMaskDoneOnDay ? " \u2713" : ""}`), !isRetreatDay && (hasExfoliatingCleanseAm || isExfoliationNight) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: isExfoliationNight ? COLORS.clay : COLORS.inkSoft, marginTop: 3, fontWeight: isExfoliationNight ? 700 : 400 } }, "Skin \u2014 ", [hasExfoliatingCleanseAm && "AM: Exfoliating cleanse", isExfoliationNight && "PM: Exfoliation night"].filter(Boolean).join(" \xB7 ")), appts.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.clay, marginTop: 3 } }, appts.map((a) => a.text).join(" \xB7 ")), dueRecurring.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.slate, marginTop: 3 } }, dueRecurring.map((r) => r.text).join(" \xB7 ")), mealEntry && mealEntry.dinner && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, "Dinner: ", mealEntry.dinner), isRetreatDay && !mealEntry && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, "Dinner: ", retreat.dinner))
      );
    }), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Task and workout counts are automatic \u2014 the rest is up to you." }, "Weekly reflection"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink, marginBottom: 10, lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("div", null, weeklyTaskTotals.total > 0 ? `${weeklyTaskTotals.done} of ${weeklyTaskTotals.total} tasks done this week` : "No tasks tracked this week"), /* @__PURE__ */ React.createElement("div", null, completedWorkouts, " of ", scheduledWorkouts, " scheduled workout", scheduledWorkouts === 1 ? "" : "s", " completed")), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: weeklyReflections[weekStart] || "",
        onChange: (e) => setWeeklyReflections({ ...weeklyReflections, [weekStart]: e.target.value }),
        placeholder: "How did this week go?",
        rows: 5,
        style: { width: "100%", fontFamily: "inherit", fontSize: 14, padding: 10, borderRadius: 8, border: `1px solid ${COLORS.line}`, background: COLORS.card, color: COLORS.ink, resize: "vertical", boxSizing: "border-box" }
      }
    )));
  }
  function migrateLogEntry(l) {
    if (l.id && l.source) {
      return l.source === "manual" ? { ...l, id: l.id.replace(/^manual-/, "fitbit-"), source: "fitbit" } : l;
    }
    const rawSource = l.weightSource || l.bodyFatSource || "fitbit";
    const source = rawSource === "manual" ? "fitbit" : rawSource;
    const { weightSource, bodyFatSource, ...rest } = l;
    return { ...rest, id: `${source}-${l.date}`, source };
  }
  function mergeWeightLogEntry(existing, incoming) {
    const merged = { ...existing };
    let changed = false;
    for (const key of Object.keys(incoming)) {
      if (["id", "date", "source"].includes(key)) continue;
      if (merged[key] === void 0 && incoming[key] !== void 0) {
        merged[key] = incoming[key];
        changed = true;
      }
    }
    return { merged, changed };
  }
  function applySourceImport(logs, incomingById) {
    const byId = {};
    logs.forEach((l) => {
      byId[l.id] = l;
    });
    let newCount = 0;
    let enrichedCount = 0;
    const touchedDates = [];
    for (const incoming of Object.values(incomingById)) {
      const existing = byId[incoming.id];
      if (!existing) {
        byId[incoming.id] = incoming;
        newCount++;
        touchedDates.push(incoming.date);
      } else {
        const { merged, changed } = mergeWeightLogEntry(existing, incoming);
        if (changed) {
          byId[incoming.id] = merged;
          enrichedCount++;
          touchedDates.push(incoming.date);
        }
      }
    }
    const result = Object.values(byId).sort((a, b) => a.date.localeCompare(b.date) || a.source.localeCompare(b.source));
    return { result, newCount, enrichedCount, touchedDates };
  }
  function WeightTab({ logs: rawLogs, setLogs, segmentalMuscleLogs, setSegmentalMuscleLogs, weightGoal, setWeightGoal }) {
    const logs = (() => {
      const byId = {};
      for (const raw of rawLogs.map(migrateLogEntry)) {
        const existing = byId[raw.id];
        byId[raw.id] = existing ? mergeWeightLogEntry(existing, raw).merged : raw;
      }
      return Object.values(byId).sort((a, b) => a.date.localeCompare(b.date) || a.source.localeCompare(b.source));
    })();
    const [weight, setWeight] = useState("");
    const [bodyFat, setBodyFat] = useState("");
    const [muscleMass, setMuscleMass] = useState("");
    const [date, setDate] = useState(todayISO());
    const [showFull, setShowFull] = useState(false);
    const [fullValues, setFullValues] = useState({});
    const [openDetail, setOpenDetail] = useState(null);
    const setFullField = (key, val) => setFullValues({ ...fullValues, [key]: val });
    const add = () => {
      if (!weight) return;
      const entry = { id: `fitbit-${date}`, date, source: "fitbit", weight: parseFloat(weight) };
      if (bodyFat) entry.bodyFat = parseFloat(bodyFat);
      if (muscleMass) entry.muscleMass = parseFloat(muscleMass);
      RENPHO_FIELDS.forEach((f) => {
        if (fullValues[f.key]) entry[f.key] = parseFloat(fullValues[f.key]);
      });
      const next = [...logs.filter((l) => l.id !== entry.id), entry].sort((a, b) => a.date.localeCompare(b.date) || a.source.localeCompare(b.source));
      setLogs(next);
      setWeight("");
      setBodyFat("");
      setMuscleMass("");
      setFullValues({});
    };
    const remove = (id) => setLogs(logs.filter((l) => l.id !== id));
    const [trendRange, setTrendRange] = useState("7");
    const [trendCustomStart, setTrendCustomStart] = useState("");
    const [trendCustomEnd, setTrendCustomEnd] = useState("");
    const trendStartDate = (() => {
      if (trendRange === "all") return null;
      if (trendRange === "custom") return trendCustomStart || null;
      return addDaysISO(todayISO(), -parseInt(trendRange, 10));
    })();
    const trendEndDate = trendRange === "custom" ? trendCustomEnd || todayISO() : todayISO();
    const trendLogs = logs.filter((l) => (!trendStartDate || l.date >= trendStartDate) && l.date <= trendEndDate);
    const buildSourceSplitData = (field) => {
      return trendLogs.filter((l) => l[field] !== void 0).map((l) => {
        const point = { date: l.date.slice(5) };
        point[l.source] = l[field];
        return point;
      });
    };
    const weightTrendData = buildSourceSplitData("weight");
    const bodyFatTrendData = buildSourceSplitData("bodyFat");
    const hasSource = (data, src) => data.some((d) => d[src] !== void 0);
    const METRIC_PICKER_FIELDS = [
      { key: "bodyFat", label: "Body fat %", unit: "%" },
      ...RENPHO_FIELDS.filter((f) => !["musclePct", "skeletalMusclePct", "skeletalMuscleMass"].includes(f.key))
    ];
    const [selectedMetric, setSelectedMetric] = useState(METRIC_PICKER_FIELDS[0].key);
    const selectedField = METRIC_PICKER_FIELDS.find((f) => f.key === selectedMetric);
    const metricTrendData = trendLogs.filter((l) => l.source === "renpho" && l[selectedMetric] !== void 0).map((l) => ({ date: l.date.slice(5), value: l[selectedMetric] }));
    const [segImporting, setSegImporting] = useState(false);
    const [segError, setSegError] = useState("");
    const [segResult, setSegResult] = useState("");
    const importSegmentalCsv = async (file) => {
      setSegImporting(true);
      setSegError("");
      setSegResult("");
      try {
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < 2) throw new Error("File looks empty.");
        const header = lines[0].split(",").map((h) => h.trim());
        const dateIdx = header.findIndex((h) => /date/i.test(h));
        const laIdx = header.findIndex((h) => /left arm/i.test(h));
        const raIdx = header.findIndex((h) => /right arm/i.test(h));
        const trIdx = header.findIndex((h) => /trunk/i.test(h));
        const llIdx = header.findIndex((h) => /left leg/i.test(h));
        const rlIdx = header.findIndex((h) => /right leg/i.test(h));
        if (dateIdx === -1) throw new Error("Couldn't find a 'Date' column.");
        const byDate = {};
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim());
          const rawDate = cols[dateIdx];
          let isoDate = null;
          if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
            isoDate = rawDate;
          } else {
            const m = rawDate && rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (m) isoDate = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
          }
          if (!isoDate) continue;
          const entry = { id: "seg-" + isoDate, date: isoDate };
          if (laIdx !== -1 && cols[laIdx]) entry.leftArm = parseFloat(cols[laIdx]);
          if (raIdx !== -1 && cols[raIdx]) entry.rightArm = parseFloat(cols[raIdx]);
          if (trIdx !== -1 && cols[trIdx]) entry.trunk = parseFloat(cols[trIdx]);
          if (llIdx !== -1 && cols[llIdx]) entry.leftLeg = parseFloat(cols[llIdx]);
          if (rlIdx !== -1 && cols[rlIdx]) entry.rightLeg = parseFloat(cols[rlIdx]);
          byDate[isoDate] = entry;
        }
        if (Object.keys(byDate).length === 0) {
          setSegError("No usable rows found \u2014 check the CSV has Date, Left Arm, Right Arm, Trunk, Left Leg and Right Leg columns.");
          return;
        }
        const existingByDate = {};
        segmentalMuscleLogs.forEach((l) => {
          existingByDate[l.date] = l;
        });
        let newCount = 0, updatedCount = 0;
        Object.values(byDate).forEach((e) => {
          if (existingByDate[e.date]) updatedCount++;
          else newCount++;
          existingByDate[e.date] = e;
        });
        const merged = Object.values(existingByDate).sort((a, b) => a.date.localeCompare(b.date));
        setSegmentalMuscleLogs(merged);
        const parts = [];
        if (newCount) parts.push(`${newCount} new day(s)`);
        if (updatedCount) parts.push(`${updatedCount} day(s) updated`);
        setSegResult(parts.join(", ") + ".");
      } catch (e) {
        setSegError("Couldn't read that file: " + (e && e.message ? e.message : String(e)));
      } finally {
        setSegImporting(false);
      }
    };
    const segmentalRangeLogs = segmentalMuscleLogs.filter((l) => (!trendStartDate || l.date >= trendStartDate) && l.date <= trendEndDate);
    const armsTrendData = segmentalRangeLogs.filter((l) => l.leftArm !== void 0 || l.rightArm !== void 0).map((l) => ({ date: l.date.slice(5), leftArm: l.leftArm, rightArm: l.rightArm }));
    const legsTrendData = segmentalRangeLogs.filter((l) => l.leftLeg !== void 0 || l.rightLeg !== void 0).map((l) => ({ date: l.date.slice(5), leftLeg: l.leftLeg, rightLeg: l.rightLeg }));
    const trunkTrendData = segmentalRangeLogs.filter((l) => l.trunk !== void 0).map((l) => ({ date: l.date.slice(5), trunk: l.trunk }));
    const muscleMassPairData = trendLogs.filter((l) => l.source === "renpho" && (l.muscleMass !== void 0 || l.skeletalMuscleMass !== void 0)).map((l) => ({ date: l.date.slice(5), muscleMass: l.muscleMass, skeletalMuscleMass: l.skeletalMuscleMass }));
    const musclePctPairData = trendLogs.filter((l) => l.source === "renpho" && (l.musclePct !== void 0 || l.skeletalMusclePct !== void 0)).map((l) => ({ date: l.date.slice(5), musclePct: l.musclePct, skeletalMusclePct: l.skeletalMusclePct }));
    const hasField = (data, field) => data.some((d) => d[field] !== void 0);
    const chartData = logs.map((l) => ({ date: l.date.slice(5), weight: l.weight }));
    const current = logs.length ? logs[logs.length - 1].weight : null;
    const progress = current ? Math.max(0, Math.min(100, (72 - current) / (72 - weightGoal) * 100)) : 0;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Progress"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "72kg \u2192"), /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", value: weightGoal, onChange: (e) => setWeightGoal(parseFloat(e.target.value) || 0), style: { width: 70, padding: "4px 8px", fontSize: 12.5 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "kg goal")), /* @__PURE__ */ React.createElement("div", { style: { height: 8, background: COLORS.line, borderRadius: 4, overflow: "hidden", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${progress}%`, background: COLORS.green } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft } }, current ? `${current}kg current \xB7 ${(current - weightGoal).toFixed(1)}kg to go` : "Log a weight to see progress")), logs.length > 1 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Trend"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } }, [["7", "7 days"], ["30", "30 days"], ["90", "90 days"], ["365", "1 year"], ["all", "All time"], ["custom", "Custom"]].map(([val, label]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: val,
        onClick: () => setTrendRange(val),
        style: {
          padding: "5px 12px",
          borderRadius: 999,
          fontSize: 12.5,
          cursor: "pointer",
          fontFamily: "inherit",
          border: `1px solid ${trendRange === val ? COLORS.green : COLORS.line}`,
          background: trendRange === val ? COLORS.green : "transparent",
          color: trendRange === val ? "#fff" : COLORS.inkSoft
        }
      },
      label
    ))), trendRange === "custom" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: trendCustomStart, onChange: (e) => setTrendCustomStart(e.target.value), style: { width: 150 } }), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, alignSelf: "center" } }, "to"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: trendCustomEnd, onChange: (e) => setTrendCustomEnd(e.target.value), style: { width: 150 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 11.5, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.clay } }, "\u25CF RENPHO"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.slate } }, "\u25CF Fitbit")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 10, marginBottom: 4 } }, "Weight (kg)"), weightTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: weightTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 1", "dataMax + 1"] }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(ReferenceLine, { y: weightGoal, stroke: COLORS.gold, strokeDasharray: "4 4" }), hasSource(weightTrendData, "renpho") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "renpho", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasSource(weightTrendData, "fitbit") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "fitbit", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, "No weight readings in this range."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 16, marginBottom: 4 } }, "Body fat %"), bodyFatTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: bodyFatTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 1", "dataMax + 1"] }), /* @__PURE__ */ React.createElement(Tooltip, null), hasSource(bodyFatTrendData, "renpho") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "renpho", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasSource(bodyFatTrendData, "fitbit") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "fitbit", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "No body fat readings in this range.")), (segmentalMuscleLogs.length > 0 || logs.some((l) => l.source === "renpho")) && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Segmental muscle"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("label", { style: { display: "inline-block", background: COLORS.green, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, segImporting ? "Importing\u2026" : "Choose segmental muscle CSV", /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: ".csv,text/csv",
        style: { display: "none" },
        disabled: segImporting,
        onChange: (e) => {
          if (e.target.files[0]) importSegmentalCsv(e.target.files[0]);
        }
      }
    )), segError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.danger } }, segError), segResult && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.green, fontWeight: 600 } }, "\u2713 ", segResult)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 } }, "Arms (kg)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 11.5, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.clay } }, "\u25CF Left"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.slate } }, "\u25CF Right")), armsTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 180 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: armsTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 0.2", "dataMax + 0.2"] }), /* @__PURE__ */ React.createElement(Tooltip, null), hasField(armsTrendData, "leftArm") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "leftArm", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasField(armsTrendData, "rightArm") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "rightArm", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, "No arm readings in this range."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 16, marginBottom: 4 } }, "Legs (kg)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 11.5, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.clay } }, "\u25CF Left"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.slate } }, "\u25CF Right")), legsTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 180 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: legsTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 0.2", "dataMax + 0.2"] }), /* @__PURE__ */ React.createElement(Tooltip, null), hasField(legsTrendData, "leftLeg") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "leftLeg", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasField(legsTrendData, "rightLeg") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "rightLeg", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, "No leg readings in this range."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 16, marginBottom: 4 } }, "Trunk (kg)"), trunkTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 180 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: trunkTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 0.5", "dataMax + 0.5"] }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "trunk", stroke: COLORS.green, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, "No trunk readings in this range."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 16, marginBottom: 4 } }, "Muscle mass, whole body (kg)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 11.5, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.clay } }, "\u25CF Muscle mass"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.slate } }, "\u25CF Skeletal muscle mass")), muscleMassPairData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 180 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: muscleMassPairData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 0.5", "dataMax + 0.5"] }), /* @__PURE__ */ React.createElement(Tooltip, null), hasField(muscleMassPairData, "muscleMass") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "muscleMass", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasField(muscleMassPairData, "skeletalMuscleMass") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "skeletalMuscleMass", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, "No whole-body muscle mass readings in this range."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 16, marginBottom: 4 } }, "Muscle %, whole body"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, fontSize: 11.5, marginBottom: 4, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.clay } }, "\u25CF Muscle %"), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.slate } }, "\u25CF Skeletal muscle %")), musclePctPairData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 180 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: musclePctPairData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 1", "dataMax + 1"] }), /* @__PURE__ */ React.createElement(Tooltip, null), hasField(musclePctPairData, "musclePct") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "musclePct", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }), hasField(musclePctPairData, "skeletalMusclePct") && /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "skeletalMusclePct", stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "No whole-body muscle % readings in this range.")), logs.length > 1 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "RENPHO detail trend"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } }, METRIC_PICKER_FIELDS.map((f) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: f.key,
        onClick: () => setSelectedMetric(f.key),
        style: {
          padding: "5px 12px",
          borderRadius: 999,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          border: `1px solid ${selectedMetric === f.key ? COLORS.clay : COLORS.line}`,
          background: selectedMetric === f.key ? COLORS.clay : "transparent",
          color: selectedMetric === f.key ? "#fff" : COLORS.inkSoft
        }
      },
      f.label
    ))), metricTrendData.length ? /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: metricTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 1", "dataMax + 1"] }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => `${v}${selectedField.unit}` }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "value", stroke: COLORS.clay, strokeWidth: 2, dot: { r: 3 }, connectNulls: true, name: selectedField.label })))) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, 'No "', selectedField.label, '" readings in this range.')), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Log entry (Fitbit)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "kg", value: weight, onChange: (e) => setWeight(e.target.value), style: { width: 80 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "body fat %", value: bodyFat, onChange: (e) => setBodyFat(e.target.value), style: { width: 100 } }), /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "muscle mass kg", value: muscleMass, onChange: (e) => setMuscleMass(e.target.value), style: { width: 120 } })), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowFull(!showFull), style: { background: "none", border: "none", color: COLORS.green, fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: showFull ? 10 : 0 } }, showFull ? "\u2212 hide full RENPHO fields" : "+ add full RENPHO reading"), showFull && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10, padding: "10px", background: COLORS.greenSoft, borderRadius: 8 } }, RENPHO_FIELDS.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { width: "31%", minWidth: 96 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: COLORS.inkSoft, marginBottom: 2 } }, f.label, f.unit ? ` (${f.unit})` : ""), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "number",
        step: "0.1",
        value: fullValues[f.key] || "",
        onChange: (e) => setFullField(f.key, e.target.value),
        style: { width: "100%", padding: "6px 8px", fontSize: 12.5 }
      }
    )))), /* @__PURE__ */ React.createElement(Btn, { onClick: add }, "Add")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "History"), [...logs].reverse().map((l) => {
      const extraKeys = RENPHO_FIELDS.filter((f) => f.key !== "bmi" && l[f.key] !== void 0);
      const hasBmiOnly = l.bmi !== void 0 && extraKeys.length === 0;
      const detailOpen = openDetail === l.id;
      const sourceLabel = l.source === "renpho" ? "RENPHO" : "Fitbit";
      const sourceColor = l.source === "renpho" ? COLORS.clay : COLORS.slate;
      return /* @__PURE__ */ React.createElement("div", { key: l.id, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13.5 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", null, fmtDate(l.date), " ", /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: sourceColor, border: `1px solid ${sourceColor}`, borderRadius: 4, padding: "1px 5px", marginLeft: 4 } }, sourceLabel)), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 10, alignItems: "center" } }, l.weight, "kg", /* @__PURE__ */ React.createElement("button", { onClick: () => remove(l.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "remove"))), (l.bodyFat || l.muscleMass) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 } }, l.bodyFat ? `${l.bodyFat}% body fat` : "", l.bodyFat && l.muscleMass ? " \xB7 " : "", l.muscleMass ? `${l.muscleMass}kg muscle mass` : ""), hasBmiOnly && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 } }, "BMI: ", l.bmi), extraKeys.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenDetail(detailOpen ? null : l.id), style: { background: "none", border: "none", color: COLORS.green, fontSize: 11, cursor: "pointer", padding: 0, marginTop: 3 } }, detailOpen ? "hide full reading" : "full RENPHO reading \u2192"), detailOpen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 5, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}`, display: "flex", flexWrap: "wrap", gap: "2px 14px" } }, (l.bmi !== void 0 ? [{ key: "bmi", label: "BMI", unit: "" }, ...extraKeys] : extraKeys).map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { fontSize: 11.5, color: COLORS.inkSoft } }, f.label, ": ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.ink } }, l[f.key], f.unit))))));
    })));
  }
  function FitnessTab({ settings, setSettings, fitnessOverrides, setFitnessOverrides, fitnessChangeLog, setFitnessChangeLog, logs, setLogs, ironLogs, setIronLogs, ironEquipment, setIronEquipment, ironSubstitutions, setIronSubstitutions, ironNotes, setIronNotes, today, isRetreatDay, regularSession, block, blockIdx, weekNum, dayInBlock }) {
    const [note, setNote] = useState("");
    const [ironDay, setIronDay] = useState(1);
    const [openHistory, setOpenHistory] = useState(null);
    const retreat = isRetreatDay ? RETREAT[today] : null;
    const sessionLabel = retreat ? retreat.training : regularSession;
    const isOverridden = !retreat && !!fitnessOverrides[today];
    const isIronSession = /iron/i.test(sessionLabel);
    const [swapDateA, setSwapDateA] = useState(today);
    const [swapDateB, setSwapDateB] = useState(addDaysISO(today, 1));
    const [singleDate, setSingleDate] = useState(today);
    const [singleSessionChoice, setSingleSessionChoice] = useState("");
    const sessionForDate = (d) => computeFitnessForDate(d, settings, fitnessOverrides).regularSession;
    const logChange = (text) => {
      const entry = { id: "chg-" + Date.now(), at: (/* @__PURE__ */ new Date()).toISOString(), text };
      setFitnessChangeLog([entry, ...fitnessChangeLog || []].slice(0, 50));
    };
    const swapTwoDates = () => {
      if (!swapDateA || !swapDateB || swapDateA === swapDateB) return;
      const sessionA = sessionForDate(swapDateA);
      const sessionB = sessionForDate(swapDateB);
      setFitnessOverrides({ ...fitnessOverrides, [swapDateA]: sessionB, [swapDateB]: sessionA });
      logChange(`Swapped ${fmtDate(swapDateA)} (was "${sessionA}") with ${fmtDate(swapDateB)} (was "${sessionB}")`);
    };
    const applySingleOverride = () => {
      if (!singleDate) return;
      if (!singleSessionChoice) {
        const previous = fitnessOverrides[singleDate];
        const next = { ...fitnessOverrides };
        delete next[singleDate];
        setFitnessOverrides(next);
        if (previous) logChange(`Reset ${fmtDate(singleDate)} back to its scheduled session (was "${previous}")`);
      } else {
        const previous = sessionForDate(singleDate);
        setFitnessOverrides({ ...fitnessOverrides, [singleDate]: singleSessionChoice });
        logChange(`Changed ${fmtDate(singleDate)} from "${previous}" to "${singleSessionChoice}"`);
      }
    };
    const clearOverride = (d) => {
      const previous = fitnessOverrides[d];
      const next = { ...fitnessOverrides };
      delete next[d];
      setFitnessOverrides(next);
      if (previous) logChange(`Reset ${fmtDate(d)} back to its scheduled session (was "${previous}")`);
    };
    const overrideDates = Object.keys(fitnessOverrides).sort();
    const logToday = (status = "done") => {
      const next = [...logs.filter((l) => l.date !== today), { date: today, session: sessionLabel, note, status }];
      setLogs(next.sort((a, b) => a.date.localeCompare(b.date)));
      setNote("");
    };
    const todayEntry = logs.find((l) => l.date === today);
    const doneToday = !!todayEntry && (todayEntry.status || "done") === "done";
    const skippedToday = !!todayEntry && todayEntry.status === "skipped";
    const skippedSessions = logs.filter((l) => l.status === "skipped").sort((a, b) => b.date.localeCompare(a.date));
    const markSkippedDone = (date) => {
      setLogs(logs.map((l) => l.date === date && l.status === "skipped" ? { ...l, status: "done" } : l));
    };
    const dismissSkipped = (date) => {
      setLogs(logs.filter((l) => !(l.date === date && l.status === "skipped")));
    };
    const ironData = IRON_DAYS[ironDay];
    const lastEntryFor = (name) => {
      const hist = ironLogs[name] || [];
      return hist.length ? hist[hist.length - 1] : null;
    };
    const saveExercise = (name, weight) => {
      if (!weight) return;
      const hist = ironLogs[name] || [];
      const withoutToday = hist.filter((h) => h.date !== today);
      const next = [...withoutToday, { date: today, weight }].sort((a, b) => a.date.localeCompare(b.date));
      setIronLogs({ ...ironLogs, [name]: next });
    };
    const equipDefault = (equip) => equip === "B" ? "Barbell" : equip === "DB" ? "Dumbbell" : "";
    const setEquip = (name, val) => setIronEquipment({ ...ironEquipment, [name]: val });
    const [editingSubFor, setEditingSubFor] = useState(null);
    const [subInputValue, setSubInputValue] = useState("");
    const startEditSub = (name) => {
      setEditingSubFor(name);
      setSubInputValue(ironSubstitutions[name] || "");
    };
    const saveSub = (name) => {
      const val = subInputValue.trim();
      const next = { ...ironSubstitutions };
      if (val) next[name] = val;
      else delete next[name];
      setIronSubstitutions(next);
      setEditingSubFor(null);
    };
    const resetSub = (name) => {
      const next = { ...ironSubstitutions };
      delete next[name];
      setIronSubstitutions(next);
    };
    const setExerciseNote = (name, val) => setIronNotes({ ...ironNotes, [name]: val });
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Today's session"), /* @__PURE__ */ React.createElement(Pill, null, retreat ? "Retreat override" : `${block.name} \xB7 Week ${weekNum}`), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 15, color: COLORS.ink } }, sessionLabel), isOverridden && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: 11.5, color: COLORS.clay } }, "Changed from the regular rotation."), !retreat && PILATES_ALL_OPTIONS.includes(sessionLabel) && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 4 } }, "Change today's Pilates session"), /* @__PURE__ */ React.createElement(
      Select,
      {
        value: sessionLabel,
        onChange: (e) => {
          if (e.target.value === sessionLabel) return;
          setFitnessOverrides({ ...fitnessOverrides, [today]: e.target.value });
          logChange(`Changed today's (${fmtDate(today)}) Pilates session from "${sessionLabel}" to "${e.target.value}"`);
        },
        style: { minWidth: 220 }
      },
      /* @__PURE__ */ React.createElement("option", { value: PILATES_LEVEL4_SESSION }, PILATES_LEVEL4_SESSION),
      /* @__PURE__ */ React.createElement("optgroup", { label: "Level 5" }, PILATES_LEVEL5_SERIES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s))),
      /* @__PURE__ */ React.createElement("optgroup", { label: "Level 6" }, PILATES_LEVEL6_SERIES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s)))
    )), !doneToday && !skippedToday ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Notes (how it felt overall)", value: note, onChange: (e) => setNote(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: () => logToday("done") }, "Log done"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => logToday("skipped") }, "Skip (come back later)"))) : doneToday ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 13, color: COLORS.green } }, "\u2713 Logged for today") : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 13, color: COLORS.clay, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", null, "\u26A0 Skipped \u2014 on your list to revisit"), /* @__PURE__ */ React.createElement("button", { onClick: () => logToday("done"), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12.5, fontWeight: 600 } }, "mark done now"))), skippedSessions.length > 0 && /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: COLORS.claySoft } }, /* @__PURE__ */ React.createElement(SectionTitle, null, "Skipped \u2014 come back to these"), skippedSessions.map((l) => /* @__PURE__ */ React.createElement("div", { key: l.date, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, fmtDate(l.date)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink } }, l.session), l.note && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 } }, l.note)), /* @__PURE__ */ React.createElement("button", { onClick: () => markSkippedDone(l.date), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 600 } }, "mark done"), /* @__PURE__ */ React.createElement("button", { onClick: () => dismissSkipped(l.date), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "dismiss")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Swap two days"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 3 } }, "Date A"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: swapDateA, onChange: (e) => setSwapDateA(e.target.value) }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 3, maxWidth: 150 } }, sessionForDate(swapDateA))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 3 } }, "Date B"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: swapDateB, onChange: (e) => setSwapDateB(e.target.value) }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 3, maxWidth: 150 } }, sessionForDate(swapDateB))), /* @__PURE__ */ React.createElement(Btn, { onClick: swapTwoDates }, "Swap")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginTop: 16, marginBottom: 4 } }, "Or just change one day (no second date affected)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: singleDate, onChange: (e) => setSingleDate(e.target.value) }), /* @__PURE__ */ React.createElement(Select, { value: singleSessionChoice, onChange: (e) => setSingleSessionChoice(e.target.value), style: { minWidth: 200 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Reset to scheduled \u2014"), BLOCKS.map((b) => /* @__PURE__ */ React.createElement("optgroup", { key: b.name, label: b.name }, b.days.flatMap((d) => d === "__PILATES_ROTATION__" ? PILATES_ALL_OPTIONS : [d]).map((d) => /* @__PURE__ */ React.createElement("option", { key: d, value: d }, d))))), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: applySingleOverride }, "Save")), overrideDates.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, paddingTop: 12, borderTop: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 6 } }, "Active swaps / overrides"), overrideDates.map((d) => /* @__PURE__ */ React.createElement("div", { key: d, style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, fmtDate(d)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink } }, fitnessOverrides[d])), /* @__PURE__ */ React.createElement("button", { onClick: () => clearOverride(d), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "reset"))))), (fitnessChangeLog || []).length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "A running record of every swap, override, and Pilates change you've made, most recent first \u2014 so you can see what happened and when." }, "Recent changes"), fitnessChangeLog.map((entry) => /* @__PURE__ */ React.createElement("div", { key: entry.id, style: { padding: "7px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, new Date(entry.at).toLocaleString("en-AU", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink } }, entry.text)))), isIronSession && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Weeks 1\u20136 exercise reference \u2014 pick the Iron day this session matches." }, "Iron Series exercises"), /* @__PURE__ */ React.createElement(Select, { value: ironDay, onChange: (e) => setIronDay(parseInt(e.target.value)), style: { marginBottom: 10 } }, Object.entries(IRON_DAYS).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, "Day ", k, " \u2014 ", v.title))), ironData.exercises.map((ex, i) => {
      const isTuple = Array.isArray(ex);
      const name = isTuple ? ex[0] : ex;
      const sheetEquip = isTuple ? ex[1] : "";
      const start = isTuple ? ex[2] : "";
      const last = lastEntryFor(name);
      const todayEntry2 = (ironLogs[name] || []).find((h) => h.date === today);
      const hist = ironLogs[name] || [];
      const historyOpen = openHistory === name;
      const equipValue = ironEquipment[name] !== void 0 ? ironEquipment[name] : equipDefault(sheetEquip);
      const displayName = ironSubstitutions[name] || name;
      const editingSub = editingSubFor === name;
      return /* @__PURE__ */ React.createElement("div", { key: ironDay + "-" + i, style: { padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 6 } }, /* @__PURE__ */ React.createElement("div", null, editingSub ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
        Input,
        {
          value: subInputValue,
          onChange: (e) => setSubInputValue(e.target.value),
          placeholder: name,
          onKeyDown: (e) => {
            if (e.key === "Enter") saveSub(name);
            if (e.key === "Escape") setEditingSubFor(null);
          },
          autoFocus: true,
          style: { fontSize: 13.5, width: 200 }
        }
      ), /* @__PURE__ */ React.createElement("button", { onClick: () => saveSub(name), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingSubFor(null), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 12 } }, "cancel")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: COLORS.ink } }, displayName), ironSubstitutions[name] && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: COLORS.inkSoft, marginLeft: 6 } }, "(sheet says: ", name, ")"), /* @__PURE__ */ React.createElement("button", { onClick: () => startEditSub(name), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 11, marginLeft: 8 } }, "swap exercise"), ironSubstitutions[name] && /* @__PURE__ */ React.createElement("button", { onClick: () => resetSub(name), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 11, marginLeft: 6 } }, "reset"))), start && /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, "start: ", start)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 5, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
        Input,
        {
          id: "w-" + i + "-" + ironDay,
          placeholder: "weight",
          defaultValue: todayEntry2 ? todayEntry2.weight : "",
          onBlur: (e) => saveExercise(name, e.target.value),
          style: { width: 80, padding: "6px 8px", fontSize: 13 }
        }
      ), /* @__PURE__ */ React.createElement(Select, { value: equipValue, onChange: (e) => setEquip(name, e.target.value), style: { padding: "6px 8px", fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Equipment"), /* @__PURE__ */ React.createElement("option", { value: "Dumbbell" }, "Dumbbell"), /* @__PURE__ */ React.createElement("option", { value: "Barbell" }, "Barbell"), /* @__PURE__ */ React.createElement("option", { value: "Bodyweight" }, "Bodyweight"), /* @__PURE__ */ React.createElement("option", { value: "Band" }, "Band"), /* @__PURE__ */ React.createElement("option", { value: "Kettlebell" }, "Kettlebell")), last && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "last: ", last.weight, " (", fmtDate(last.date), ")"), hist.length > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenHistory(historyOpen ? null : name), style: { background: "none", border: "none", color: COLORS.green, fontSize: 11, cursor: "pointer", marginLeft: "auto", padding: 0 } }, historyOpen ? "hide" : `history (${hist.length})`)), /* @__PURE__ */ React.createElement(
        Input,
        {
          placeholder: "Notes (form cues, why you swapped it, etc.)",
          defaultValue: ironNotes[name] || "",
          onBlur: (e) => setExerciseNote(name, e.target.value),
          style: { width: "100%", marginTop: 6, fontSize: 12.5, padding: "5px 8px" }
        }
      ), historyOpen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}` } }, [...hist].reverse().map((h, hi) => /* @__PURE__ */ React.createElement("div", { key: hi, style: { fontSize: 11.5, color: COLORS.inkSoft, padding: "2px 0" } }, fmtDate(h.date), ": ", h.weight))));
    })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Block settings"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft, marginBottom: 6 } }, "Block 1 start date (used to calculate week/day)"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: settings.startDate, onChange: (e) => setSettings({ ...settings, startDate: e.target.value }) })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, block.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, block.weeks), block.days.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, width: 18 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { color: i === dayInBlock && !isRetreatDay ? COLORS.green : COLORS.ink, fontWeight: i === dayInBlock && !isRetreatDay ? 700 : 400 } }, d)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Recent history"), [...logs].reverse().slice(0, 10).map((l) => /* @__PURE__ */ React.createElement("div", { key: l.date, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, fmtDate(l.date)), /* @__PURE__ */ React.createElement("div", null, l.session), l.note && /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 12 } }, l.note)))));
  }
  function SkinTab({ today, isRetreatDay, ziipSettings, setZiipSettings, ziipToday, ziipDayIdx, ziipDone, setZiipDone, amDone, setAmDone, pmDone, setPmDone, skinPlan, setSkinPlan, ledMaskDone, setLedMaskDone }) {
    const retreat = isRetreatDay ? RETREAT[today] : null;
    const dow = dayOfWeekISO(today);
    const schedule = skinPlan[dow];
    const isExfoliationNight = dow === 4;
    const isNonZiipDay = !ziipToday || ziipToday.rest;
    const ledMaskDoneToday = !!ledMaskDone[today];
    const toggleZiip = (item) => {
      const key = today;
      const cur = ziipDone[key] || {};
      setZiipDone({ ...ziipDone, [key]: { ...cur, [item]: !cur[item] } });
    };
    const toggleAm = (id) => {
      const cur = amDone[today] || {};
      setAmDone({ ...amDone, [today]: { ...cur, [id]: !cur[id] } });
    };
    const togglePm = (id) => {
      const cur = pmDone[today] || {};
      setPmDone({ ...pmDone, [today]: { ...cur, [id]: !cur[id] } });
    };
    const toggleLedMask = () => setLedMaskDone({ ...ledMaskDone, [today]: !ledMaskDoneToday });
    const successionSub = (step) => {
      if (step.options.length <= 1) return step.options[0] || "";
      return `Now: ${step.options[0]}  \u2192  next: ${step.options.slice(1).join(" \u27A4 ")}`;
    };
    const [showEditor, setShowEditor] = useState(false);
    const [editDay, setEditDay] = useState(dow);
    const [editPeriod, setEditPeriod] = useState("am");
    const [newProductText, setNewProductText] = useState({});
    const [newStepLabel, setNewStepLabel] = useState("");
    const updateStep = (dayKey, period, stepId, patch) => {
      setSkinPlan({
        ...skinPlan,
        [dayKey]: {
          ...skinPlan[dayKey],
          [period]: skinPlan[dayKey][period].map((s) => s.id === stepId ? { ...s, ...patch } : s)
        }
      });
    };
    const addProduct = (dayKey, period, stepId) => {
      const text = (newProductText[stepId] || "").trim();
      if (!text) return;
      const step = skinPlan[dayKey][period].find((s) => s.id === stepId);
      updateStep(dayKey, period, stepId, { options: [...step.options, text] });
      setNewProductText({ ...newProductText, [stepId]: "" });
    };
    const removeProduct = (dayKey, period, stepId, idx) => {
      const step = skinPlan[dayKey][period].find((s) => s.id === stepId);
      updateStep(dayKey, period, stepId, { options: step.options.filter((_, i) => i !== idx) });
    };
    const moveProduct = (dayKey, period, stepId, idx, direction) => {
      const step = skinPlan[dayKey][period].find((s) => s.id === stepId);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= step.options.length) return;
      const next = [...step.options];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      updateStep(dayKey, period, stepId, { options: next });
    };
    const removeStep = (dayKey, period, stepId) => {
      setSkinPlan({
        ...skinPlan,
        [dayKey]: { ...skinPlan[dayKey], [period]: skinPlan[dayKey][period].filter((s) => s.id !== stepId) }
      });
    };
    const moveStep = (dayKey, period, stepId, direction) => {
      const list = skinPlan[dayKey][period];
      const idx = list.findIndex((s) => s.id === stepId);
      const swapIdx = idx + direction;
      if (idx === -1 || swapIdx < 0 || swapIdx >= list.length) return;
      const next = [...list];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      setSkinPlan({ ...skinPlan, [dayKey]: { ...skinPlan[dayKey], [period]: next } });
    };
    const addStep = (dayKey, period) => {
      const label = newStepLabel.trim();
      if (!label) return;
      const id = "step-" + Date.now();
      setSkinPlan({
        ...skinPlan,
        [dayKey]: { ...skinPlan[dayKey], [period]: [...skinPlan[dayKey][period], { id, label, options: [] }] }
      });
      setNewStepLabel("");
    };
    const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
    return /* @__PURE__ */ React.createElement("div", null, retreat && /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: COLORS.claySoft } }, /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Post-sun recovery week"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 13.5, color: COLORS.ink } }, retreat.skinNote), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: 12.5, color: COLORS.clay } }, "No at-home actives (retinol/exfoliants/Vit C) this week \u2014 hydrating serum + moisturiser AM and PM is enough. Normal weekly rotation resumes after.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: `Day ${ziipDayIdx + 1} of 30` }, "ZIIP Halo \u2014 Tone Reset"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "Plan start date: "), /* @__PURE__ */ React.createElement(Input, { type: "date", value: ziipSettings.startDate, onChange: (e) => setZiipSettings({ startDate: e.target.value }), style: { marginLeft: 4 } })), !ziipToday ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "30-day plan complete \u2014 update the start date to begin a new cycle.") : ziipToday.rest ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Rest day \u2014 no treatments.") : ziipToday.t.map(([name, mins]) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: name,
        checked: !!(ziipDone[today] || {})[name],
        onChange: () => toggleZiip(name),
        label: name,
        sub: `${mins} min`
      }
    )), isNonZiipDay && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement(Check, { checked: ledMaskDoneToday, onChange: toggleLedMask, label: "LED mask" }))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: schedule.label }, "AM Routine"), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Recovery week: cleanse \xB7 hydrating serum \xB7 moisturiser \xB7 eye cream. No Vit C / actives.") : schedule.am.map((step) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: step.id,
        checked: !!(amDone[today] || {})[step.id],
        onChange: () => toggleAm(step.id),
        label: step.label,
        sub: successionSub(step)
      }
    ))), /* @__PURE__ */ React.createElement(Card, { style: isExfoliationNight && !retreat ? { borderColor: COLORS.clay } : {} }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: schedule.label }, "PM Routine ", isExfoliationNight && !retreat && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Recovery week: cleanse \xB7 hydrating serum \xB7 barrier balm if needed \xB7 moisturiser \xB7 eye cream. No retinoid/exfoliant/Vit C.") : schedule.pm.map((step) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: step.id,
        checked: !!(pmDone[today] || {})[step.id],
        onChange: () => togglePm(step.id),
        label: step.label,
        sub: successionSub(step)
      }
    ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Edit any day's routine directly \u2014 add or remove a product, or reorder a succession list \u2014 no rebuild needed. The top product in each list is the one currently in use; once it runs out, remove it (or drag the next one up) to move on." }, "Edit full routine"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => setShowEditor(!showEditor) }, showEditor ? "Hide editor" : "Open editor"), showEditor && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Select, { value: editDay, onChange: (e) => setEditDay(parseInt(e.target.value, 10)) }, DAY_ORDER.map((k) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, WEEKDAY_NAMES[k]))), /* @__PURE__ */ React.createElement(Select, { value: editPeriod, onChange: (e) => setEditPeriod(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "am" }, "AM"), /* @__PURE__ */ React.createElement("option", { value: "pm" }, "PM"))), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: skinPlan[editDay].label,
        onChange: (e) => setSkinPlan({ ...skinPlan, [editDay]: { ...skinPlan[editDay], label: e.target.value } }),
        style: { width: "100%", marginBottom: 14, fontWeight: 700 }
      }
    ), skinPlan[editDay][editPeriod].map((step, stepIdx) => /* @__PURE__ */ React.createElement("div", { key: step.id, style: { marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => moveStep(editDay, editPeriod, step.id, -1), disabled: stepIdx === 0, title: "Move step up", style: { background: "none", border: "none", color: stepIdx === 0 ? COLORS.line : COLORS.inkSoft, cursor: stepIdx === 0 ? "default" : "pointer", fontSize: 11, lineHeight: 1, padding: "0 4px" } }, "\u25B2"), /* @__PURE__ */ React.createElement("button", { onClick: () => moveStep(editDay, editPeriod, step.id, 1), disabled: stepIdx === skinPlan[editDay][editPeriod].length - 1, title: "Move step down", style: { background: "none", border: "none", color: stepIdx === skinPlan[editDay][editPeriod].length - 1 ? COLORS.line : COLORS.inkSoft, cursor: stepIdx === skinPlan[editDay][editPeriod].length - 1 ? "default" : "pointer", fontSize: 11, lineHeight: 1, padding: "0 4px" } }, "\u25BC")), /* @__PURE__ */ React.createElement(
      Input,
      {
        value: step.label,
        onChange: (e) => updateStep(editDay, editPeriod, step.id, { label: e.target.value }),
        style: { flex: 1, fontWeight: 600, fontSize: 13.5 }
      }
    ), /* @__PURE__ */ React.createElement("button", { onClick: () => removeStep(editDay, editPeriod, step.id), title: "Remove this whole step", style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "remove step")), step.options.map((opt, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, style: { display: "flex", alignItems: "center", gap: 6, padding: "3px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => moveProduct(editDay, editPeriod, step.id, idx, -1), disabled: idx === 0, style: { background: "none", border: "none", color: idx === 0 ? COLORS.line : COLORS.inkSoft, cursor: idx === 0 ? "default" : "pointer", fontSize: 11, lineHeight: 1, padding: "0 4px" } }, "\u25B2"), /* @__PURE__ */ React.createElement("button", { onClick: () => moveProduct(editDay, editPeriod, step.id, idx, 1), disabled: idx === step.options.length - 1, style: { background: "none", border: "none", color: idx === step.options.length - 1 ? COLORS.line : COLORS.inkSoft, cursor: idx === step.options.length - 1 ? "default" : "pointer", fontSize: 11, lineHeight: 1, padding: "0 4px" } }, "\u25BC")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: COLORS.ink, flex: 1 } }, idx === 0 ? /* @__PURE__ */ React.createElement("b", null, opt) : opt, idx === 0 && step.options.length > 1 && /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.green, fontSize: 10.5, marginLeft: 6, fontWeight: 700 } }, "CURRENT")), /* @__PURE__ */ React.createElement("button", { onClick: () => removeProduct(editDay, editPeriod, step.id, idx), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 6 } }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "Add a product to this step",
        value: newProductText[step.id] || "",
        onChange: (e) => setNewProductText({ ...newProductText, [step.id]: e.target.value }),
        onKeyDown: (e) => {
          if (e.key === "Enter") addProduct(editDay, editPeriod, step.id);
        },
        style: { flex: 1, fontSize: 12.5 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => addProduct(editDay, editPeriod, step.id) }, "Add")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 8 } }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "Add a new step (e.g. 'Toner')",
        value: newStepLabel,
        onChange: (e) => setNewStepLabel(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") addStep(editDay, editPeriod);
        },
        style: { flex: 1 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { onClick: () => addStep(editDay, editPeriod) }, "Add step")))));
  }
  function ingredientKey(name, unit) {
    return `${name.trim().toLowerCase()}||${(unit || "").trim().toLowerCase()}`;
  }
  function dayNutritionTotals(dayEntry, recipes) {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    let filledSlots = 0;
    let loggedSlots = 0;
    if (!dayEntry) return { totals, filledSlots, loggedSlots };
    ["breakfast", "lunch", "dinner", "snacks"].forEach((slot) => {
      const recipeId = dayEntry[slot + "RecipeId"];
      const hasText = !!dayEntry[slot];
      if (!hasText) return;
      filledSlots++;
      if (!recipeId) return;
      const r = recipes.find((rec) => rec.id === recipeId);
      if (!r || r.calories == null) return;
      const servings = dayEntry[slot + "Servings"] || 1;
      loggedSlots++;
      totals.calories += (r.calories || 0) * servings;
      totals.protein += (r.protein || 0) * servings;
      totals.carbs += (r.carbs || 0) * servings;
      totals.fat += (r.fat || 0) * servings;
    });
    return { totals, filledSlots, loggedSlots };
  }
  var SERVING_SIZE_OPTIONS = [
    { value: 0.25, label: "1/4 serving" },
    { value: 0.33, label: "1/3 serving" },
    { value: 0.5, label: "1/2 serving" },
    { value: 0.67, label: "2/3 serving" },
    { value: 0.75, label: "3/4 serving" },
    { value: 1, label: "1 serving" },
    { value: 1.5, label: "1 1/2 servings" },
    { value: 2, label: "2 servings" }
  ];
  function MealsTab({ today, meals, setMeals, recipes, setRecipes, shoppingList, setShoppingList, nutritionTargets, setNutritionTargets }) {
    const [day, setDay] = useState(today);
    const retreat = RETREAT_DATES.includes(day) ? RETREAT[day] : null;
    const entry = meals[day] || { breakfast: "", breakfastRecipeId: null, breakfastServings: 1, lunch: "", lunchRecipeId: null, lunchServings: 1, dinner: "", dinnerRecipeId: null, dinnerServings: 1, snacks: "", snacksRecipeId: null, snacksServings: 1, notes: "" };
    const update = (field, val) => {
      setMeals({ ...meals, [day]: { ...entry, [field]: val } });
    };
    const pickRecipeForSlot = (slot, recipeIdField, e) => {
      const val = e.target.value;
      const servingsField = slot + "Servings";
      if (val === "__custom__") {
        setMeals({ ...meals, [day]: { ...entry, [slot]: "", [recipeIdField]: null } });
      } else {
        const r = recipes.find((r2) => r2.id === val);
        setMeals({ ...meals, [day]: { ...entry, [slot]: r ? r.name : "", [recipeIdField]: val, [servingsField]: entry[servingsField] || 1 } });
      }
    };
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newServings, setNewServings] = useState("");
    const [newIngredients, setNewIngredients] = useState([{ name: "", qty: "", unit: "" }]);
    const [newInstructions, setNewInstructions] = useState("");
    const [newCalories, setNewCalories] = useState("");
    const [newProtein, setNewProtein] = useState("");
    const [newCarbs, setNewCarbs] = useState("");
    const [newFat, setNewFat] = useState("");
    const [pasteText, setPasteText] = useState("");
    const [openRecipeId, setOpenRecipeId] = useState(null);
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editServings, setEditServings] = useState("");
    const [editIngredients, setEditIngredients] = useState([]);
    const [editInstructions, setEditInstructions] = useState("");
    const [editCalories, setEditCalories] = useState("");
    const [editProtein, setEditProtein] = useState("");
    const [editCarbs, setEditCarbs] = useState("");
    const [editFat, setEditFat] = useState("");
    const addIngredientRow = () => setNewIngredients([...newIngredients, { name: "", qty: "", unit: "" }]);
    const updateIngredientRow = (i, field, val) => {
      const next = [...newIngredients];
      next[i] = { ...next[i], [field]: val };
      setNewIngredients(next);
    };
    const removeIngredientRow = (i) => setNewIngredients(newIngredients.filter((_, idx) => idx !== i));
    const saveNewRecipe = () => {
      if (!newRecipeName) return;
      const ingredients = newIngredients.filter((ing) => ing.name).map((ing) => ({ name: ing.name, qty: parseFloat(ing.qty) || 1, unit: ing.unit }));
      const recipe = { id: "recipe-" + Date.now(), name: newRecipeName, servings: newServings ? parseFloat(newServings) : null, ingredients, instructions: newInstructions };
      if (newCalories) recipe.calories = parseFloat(newCalories);
      if (newProtein) recipe.protein = parseFloat(newProtein);
      if (newCarbs) recipe.carbs = parseFloat(newCarbs);
      if (newFat) recipe.fat = parseFloat(newFat);
      setRecipes([...recipes, recipe]);
      setNewRecipeName("");
      setNewServings("");
      setNewIngredients([{ name: "", qty: "", unit: "" }]);
      setNewInstructions("");
      setNewCalories("");
      setNewProtein("");
      setNewCarbs("");
      setNewFat("");
      setShowAddRecipe(false);
    };
    const startEditRecipe = (r) => {
      setEditRecipeId(r.id);
      setEditName(r.name);
      setEditServings(r.servings != null ? String(r.servings) : "");
      setEditIngredients(r.ingredients.length ? r.ingredients.map((ing) => ({ name: ing.name, qty: String(ing.qty), unit: ing.unit || "" })) : [{ name: "", qty: "", unit: "" }]);
      setEditInstructions(r.instructions || "");
      setEditCalories(r.calories != null ? String(r.calories) : "");
      setEditProtein(r.protein != null ? String(r.protein) : "");
      setEditCarbs(r.carbs != null ? String(r.carbs) : "");
      setEditFat(r.fat != null ? String(r.fat) : "");
      setOpenRecipeId(r.id);
    };
    const updateEditIngredientRow = (i, field, val) => {
      const next = [...editIngredients];
      next[i] = { ...next[i], [field]: val };
      setEditIngredients(next);
    };
    const addEditIngredientRow = () => setEditIngredients([...editIngredients, { name: "", qty: "", unit: "" }]);
    const removeEditIngredientRow = (i) => setEditIngredients(editIngredients.filter((_, idx) => idx !== i));
    const saveEditRecipe = () => {
      if (!editName) return;
      const ingredients = editIngredients.filter((ing) => ing.name).map((ing) => ({ name: ing.name, qty: parseFloat(ing.qty) || 1, unit: ing.unit }));
      setRecipes(recipes.map((r) => r.id === editRecipeId ? {
        ...r,
        name: editName,
        servings: editServings ? parseFloat(editServings) : null,
        ingredients,
        instructions: editInstructions,
        calories: editCalories ? parseFloat(editCalories) : void 0,
        protein: editProtein ? parseFloat(editProtein) : void 0,
        carbs: editCarbs ? parseFloat(editCarbs) : void 0,
        fat: editFat ? parseFloat(editFat) : void 0
      } : r));
      setEditRecipeId(null);
    };
    const cancelEditRecipe = () => setEditRecipeId(null);
    const parsePastedRecipe = () => {
      if (!pasteText.trim()) return;
      const lines = pasteText.split("\n").map((l) => l.trim()).filter(Boolean);
      const name = lines[0] || "Untitled recipe";
      const ingredients = [];
      const instructionLines = [];
      let pastIngredients = false;
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/^(\d+\.?\d*)\s*([a-zA-Z%]*)\s+(.+)$/);
        if (match && !pastIngredients) {
          ingredients.push({ name: match[3], qty: parseFloat(match[1]) || 1, unit: match[2] || "" });
        } else {
          pastIngredients = true;
          instructionLines.push(line);
        }
      }
      setRecipes([...recipes, { id: "recipe-" + Date.now(), name, ingredients, instructions: instructionLines.join(" ") }]);
      setPasteText("");
    };
    const removeRecipe = (id) => setRecipes(recipes.filter((r) => r.id !== id));
    const { totals: dayTotals, filledSlots: dayFilledSlots, loggedSlots: dayLoggedSlots } = dayNutritionTotals(entry, recipes);
    const setTarget = (field, val) => setNutritionTargets({ ...nutritionTargets, [field]: val === "" ? null : parseFloat(val) });
    const [nutTrendRange, setNutTrendRange] = useState("30");
    const [nutTrendCustomStart, setNutTrendCustomStart] = useState("");
    const [nutTrendCustomEnd, setNutTrendCustomEnd] = useState("");
    const nutTrendStartDate = (() => {
      if (nutTrendRange === "all") return null;
      if (nutTrendRange === "custom") return nutTrendCustomStart || null;
      return addDaysISO(todayISO(), -parseInt(nutTrendRange, 10));
    })();
    const nutTrendEndDate = nutTrendRange === "custom" ? nutTrendCustomEnd || todayISO() : todayISO();
    const nutTrendData = Object.keys(meals).filter((d) => (!nutTrendStartDate || d >= nutTrendStartDate) && d <= nutTrendEndDate).sort().map((d) => {
      const { totals, loggedSlots } = dayNutritionTotals(meals[d], recipes);
      return loggedSlots > 0 ? { date: d.slice(5), ...totals } : null;
    }).filter(Boolean);
    const MACRO_PICKER_FIELDS = [
      { key: "protein", label: "Protein", unit: "g" },
      { key: "carbs", label: "Carbs", unit: "g" },
      { key: "fat", label: "Fat", unit: "g" }
    ];
    const [selectedMacro, setSelectedMacro] = useState("protein");
    const selectedMacroField = MACRO_PICKER_FIELDS.find((f) => f.key === selectedMacro);
    const [rangeStart, setRangeStart] = useState(today);
    const [rangeDays, setRangeDays] = useState(7);
    const generateShoppingList = () => {
      const dates = Array.from({ length: Math.max(1, parseInt(rangeDays) || 1) }, (_, i) => addDaysISO(rangeStart, i));
      const aggregated = {};
      const unmatched = [];
      dates.forEach((d) => {
        const dayRetreat = RETREAT_DATES.includes(d) ? RETREAT[d] : null;
        const dayEntry = meals[d];
        ["breakfast", "lunch", "dinner", "snacks"].forEach((slot) => {
          const recipeIdField = slot + "RecipeId";
          const recipeId = dayEntry && dayEntry[recipeIdField];
          if (recipeId) {
            const r = recipes.find((rec) => rec.id === recipeId);
            if (r) {
              r.ingredients.forEach((ing) => {
                const key = ingredientKey(ing.name, ing.unit);
                if (!aggregated[key]) aggregated[key] = { name: ing.name, unit: ing.unit, qty: 0 };
                aggregated[key].qty += ing.qty;
              });
              return;
            }
          }
          const text = dayEntry && dayEntry[slot] || (dayRetreat && slot !== "breakfast" ? dayRetreat[slot] : dayRetreat && slot === "breakfast" ? RETREAT_CONSTANTS.breakfast : "");
          if (text) unmatched.push(`${fmtDate(d)} ${slot}: ${text}`);
        });
      });
      const items = Object.values(aggregated).sort((a, b) => a.name.localeCompare(b.name)).map((i, idx) => ({ id: "sl-" + idx, name: i.name, qty: Math.round(i.qty * 100) / 100, unit: i.unit, done: false }));
      setShoppingList({ generatedAt: todayISO(), range: `${fmtDate(rangeStart)} \u2013 ${fmtDate(addDaysISO(rangeStart, dates.length - 1))}`, items, unmatched });
    };
    const toggleShoppingItem = (id) => {
      setShoppingList({ ...shoppingList, items: shoppingList.items.map((i) => i.id === id ? { ...i, done: !i.done } : i) });
    };
    return /* @__PURE__ */ React.createElement("div", null, retreat && /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: COLORS.claySoft } }, /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Retreat menu \u2014 ", retreat.theme), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 14, lineHeight: 1.7, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Breakfast:"), " ", RETREAT_CONSTANTS.breakfast), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Snack:"), " ", RETREAT_CONSTANTS.snack), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Lunch:"), " ", retreat.lunch), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Dinner:"), " ", retreat.dinner))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Pick a recipe from your library for each slot, or choose Custom to type freeform." }, "Plan a day"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: day, onChange: (e) => setDay(e.target.value), style: { marginBottom: 10 } }), [
      { slot: "breakfast", idField: "breakfastRecipeId", servingsField: "breakfastServings", label: "Breakfast" },
      { slot: "lunch", idField: "lunchRecipeId", servingsField: "lunchServings", label: "Lunch" },
      { slot: "dinner", idField: "dinnerRecipeId", servingsField: "dinnerServings", label: "Dinner" },
      { slot: "snacks", idField: "snacksRecipeId", servingsField: "snacksServings", label: "Snacks" }
    ].map(({ slot, idField, servingsField, label }) => {
      const linkedRecipe = entry[idField] ? recipes.find((r) => r.id === entry[idField]) : null;
      return /* @__PURE__ */ React.createElement("div", { key: slot, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 3 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Select, { value: entry[idField] || "__custom__", onChange: (e) => pickRecipeForSlot(slot, idField, e), style: { minWidth: 140 } }, /* @__PURE__ */ React.createElement("option", { value: "__custom__" }, "Custom / type below"), recipes.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, r.name))), !entry[idField] && /* @__PURE__ */ React.createElement(Input, { placeholder: label, value: entry[slot], onChange: (e) => update(slot, e.target.value), style: { flex: 1, minWidth: 120 } }), linkedRecipe && /* @__PURE__ */ React.createElement(Select, { value: entry[servingsField] || 1, onChange: (e) => update(servingsField, parseFloat(e.target.value)), style: { minWidth: 120 } }, SERVING_SIZE_OPTIONS.map((o) => /* @__PURE__ */ React.createElement("option", { key: o.value, value: o.value }, o.label)))), linkedRecipe && linkedRecipe.calories == null && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginTop: 2 } }, "This recipe has no nutrition info yet, so serving size won't affect the totals below."));
    }), /* @__PURE__ */ React.createElement(Input, { placeholder: "Notes", value: entry.notes, onChange: (e) => update("notes", e.target.value), style: { marginTop: 4 } })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Set your daily aim for each, then link recipes with nutrition info to your meals above \u2014 totals below pull from whichever meals have that data attached." }, "Nutrition"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 4 } }, "Daily targets"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "kcal", type: "number", value: nutritionTargets.calories ?? "", onChange: (e) => setTarget("calories", e.target.value), style: { width: 70 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "protein g", type: "number", value: nutritionTargets.protein ?? "", onChange: (e) => setTarget("protein", e.target.value), style: { width: 85 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "carbs g", type: "number", value: nutritionTargets.carbs ?? "", onChange: (e) => setTarget("carbs", e.target.value), style: { width: 80 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "fat g", type: "number", value: nutritionTargets.fat ?? "", onChange: (e) => setTarget("fat", e.target.value), style: { width: 70 } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 6 } }, "Totals for ", fmtDate(day)), [
      { key: "calories", label: "Calories", unit: "" },
      { key: "protein", label: "Protein", unit: "g" },
      { key: "carbs", label: "Carbs", unit: "g" },
      { key: "fat", label: "Fat", unit: "g" }
    ].map(({ key, label, unit }) => {
      const target = nutritionTargets[key];
      const value = Math.round(dayTotals[key] * 10) / 10;
      const pct = target ? Math.max(0, Math.min(100, value / target * 100)) : 0;
      return /* @__PURE__ */ React.createElement("div", { key, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 12.5, color: COLORS.ink, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft } }, value, unit, target ? ` / ${target}${unit}` : "")), target ? /* @__PURE__ */ React.createElement("div", { style: { height: 6, background: COLORS.line, borderRadius: 3, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: pct > 100 ? COLORS.clay : COLORS.green } })) : null);
    }), dayFilledSlots > 0 && dayLoggedSlots < dayFilledSlots && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.clay, marginTop: 6 } }, dayLoggedSlots, " of ", dayFilledSlots, " planned meal", dayFilledSlots === 1 ? "" : "s", " today ", dayFilledSlots === 1 ? "has" : "have", " nutrition data \u2014 totals above are a partial picture. Custom-typed meals and recipes without nutrition info aren't counted."), dayFilledSlots === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "Nothing planned for this day yet.")), nutTrendData.length > 0 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Only counts days where at least one meal is linked to a recipe with nutrition info attached." }, "Nutrition trends"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } }, [["30", "30 days"], ["90", "90 days"], ["365", "1 year"], ["all", "All time"], ["custom", "Custom"]].map(([val, label]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: val,
        onClick: () => setNutTrendRange(val),
        style: {
          padding: "5px 12px",
          borderRadius: 999,
          fontSize: 12.5,
          cursor: "pointer",
          fontFamily: "inherit",
          border: `1px solid ${nutTrendRange === val ? COLORS.green : COLORS.line}`,
          background: nutTrendRange === val ? COLORS.green : "transparent",
          color: nutTrendRange === val ? "#fff" : COLORS.inkSoft
        }
      },
      label
    ))), nutTrendRange === "custom" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: nutTrendCustomStart, onChange: (e) => setNutTrendCustomStart(e.target.value), style: { width: 150 } }), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, alignSelf: "center" } }, "to"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: nutTrendCustomEnd, onChange: (e) => setNutTrendCustomEnd(e.target.value), style: { width: 150 } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginTop: 6, marginBottom: 4 } }, "Calories"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: nutTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 50", "dataMax + 50"] }), /* @__PURE__ */ React.createElement(Tooltip, null), nutritionTargets.calories != null && /* @__PURE__ */ React.createElement(ReferenceLine, { y: nutritionTargets.calories, stroke: COLORS.gold, strokeDasharray: "4 4" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "calories", stroke: COLORS.green, strokeWidth: 2, dot: { r: 3 }, connectNulls: true })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap", marginTop: 16, marginBottom: 4 } }, MACRO_PICKER_FIELDS.map((f) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: f.key,
        onClick: () => setSelectedMacro(f.key),
        style: {
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          border: `1px solid ${selectedMacro === f.key ? COLORS.green : COLORS.line}`,
          background: selectedMacro === f.key ? COLORS.green : "transparent",
          color: selectedMacro === f.key ? "#fff" : COLORS.inkSoft
        }
      },
      f.label
    ))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.ink, marginBottom: 4 } }, selectedMacroField.label, " (", selectedMacroField.unit, ")"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: nutTrendData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 5", "dataMax + 5"] }), /* @__PURE__ */ React.createElement(Tooltip, null), nutritionTargets[selectedMacro] != null && /* @__PURE__ */ React.createElement(ReferenceLine, { y: nutritionTargets[selectedMacro], stroke: COLORS.gold, strokeDasharray: "4 4" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: selectedMacro, stroke: COLORS.slate, strokeWidth: 2, dot: { r: 3 }, connectNulls: true }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Add manually, or paste a recipe as: name on the first line, then one ingredient per line like '2 cup flour', then instructions." }, "Recipe library"), recipes.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft, marginBottom: 10 } }, "No recipes yet.") : recipes.map((r) => {
      const open = openRecipeId === r.id;
      const editing = editRecipeId === r.id;
      return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenRecipeId(open ? null : r.id), style: { background: "none", border: "none", color: COLORS.ink, fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 0, textAlign: "left" } }, r.name, " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, fontWeight: 400, fontSize: 12 } }, "(", r.ingredients.length, " ingredients", r.servings ? `, makes ${r.servings} serving${r.servings === 1 ? "" : "s"}` : "", ")"), r.calories != null && /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.clay, fontWeight: 600, fontSize: 11.5, marginTop: 2 } }, r.calories, " kcal", r.protein != null ? ` \xB7 ${r.protein}g protein` : "", r.carbs != null ? ` \xB7 ${r.carbs}g carbs` : "", r.fat != null ? ` \xB7 ${r.fat}g fat` : "", " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, fontWeight: 400 } }, "per serving"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => editing ? cancelEditRecipe() : startEditRecipe(r), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, editing ? "cancel" : "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeRecipe(r.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), open && editing && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, padding: 10, background: COLORS.greenSoft, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Recipe name", value: editName, onChange: (e) => setEditName(e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "Servings", value: editServings, onChange: (e) => setEditServings(e.target.value), style: { width: 90 } })), editIngredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 6, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "qty", value: ing.qty, onChange: (e) => updateEditIngredientRow(i, "qty", e.target.value), style: { width: 55 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "unit", value: ing.unit, onChange: (e) => updateEditIngredientRow(i, "unit", e.target.value), style: { width: 65 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "ingredient", value: ing.name, onChange: (e) => updateEditIngredientRow(i, "name", e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => removeEditIngredientRow(i), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), /* @__PURE__ */ React.createElement("button", { onClick: addEditIngredientRow, style: { background: "none", border: "none", color: COLORS.green, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 } }, "+ add ingredient"), /* @__PURE__ */ React.createElement(Input, { placeholder: "Instructions (optional)", value: editInstructions, onChange: (e) => setEditInstructions(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 4 } }, "Nutrition per serving (optional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "kcal", value: editCalories, onChange: (e) => setEditCalories(e.target.value), style: { width: 70 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "protein g", value: editProtein, onChange: (e) => setEditProtein(e.target.value), style: { width: 80 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "carbs g", value: editCarbs, onChange: (e) => setEditCarbs(e.target.value), style: { width: 80 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "fat g", value: editFat, onChange: (e) => setEditFat(e.target.value), style: { width: 70 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: saveEditRecipe }, "Save changes"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: cancelEditRecipe }, "Cancel"))), open && !editing && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}` } }, r.ingredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12.5, color: COLORS.ink } }, ing.qty, " ", ing.unit, " ", ing.name)), r.instructions && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginTop: 6 } }, r.instructions), r.calories == null && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 6, fontStyle: "italic" } }, "No nutrition info yet \u2014 add it via edit.")));
    }), !showAddRecipe ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAddRecipe(true), style: { background: "none", border: "none", color: COLORS.green, fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0 } }, "+ add recipe manually")) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: 10, background: COLORS.greenSoft, borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Recipe name", value: newRecipeName, onChange: (e) => setNewRecipeName(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "Servings (optional)", value: newServings, onChange: (e) => setNewServings(e.target.value), style: { width: 140, marginBottom: 8 } }), newIngredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 6, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "qty", value: ing.qty, onChange: (e) => updateIngredientRow(i, "qty", e.target.value), style: { width: 55 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "unit", value: ing.unit, onChange: (e) => updateIngredientRow(i, "unit", e.target.value), style: { width: 65 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "ingredient", value: ing.name, onChange: (e) => updateIngredientRow(i, "name", e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => removeIngredientRow(i), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), /* @__PURE__ */ React.createElement("button", { onClick: addIngredientRow, style: { background: "none", border: "none", color: COLORS.green, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 } }, "+ add ingredient"), /* @__PURE__ */ React.createElement(Input, { placeholder: "Instructions (optional)", value: newInstructions, onChange: (e) => setNewInstructions(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft, marginBottom: 4 } }, "Nutrition per serving (optional)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "kcal", value: newCalories, onChange: (e) => setNewCalories(e.target.value), style: { width: 70 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "protein g", value: newProtein, onChange: (e) => setNewProtein(e.target.value), style: { width: 80 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "carbs g", value: newCarbs, onChange: (e) => setNewCarbs(e.target.value), style: { width: 80 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "fat g", value: newFat, onChange: (e) => setNewFat(e.target.value), style: { width: 70 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: saveNewRecipe }, "Save recipe"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => setShowAddRecipe(false) }, "Cancel"))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 4 } }, "Or paste a recipe to parse automatically"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: pasteText,
        onChange: (e) => setPasteText(e.target.value),
        placeholder: "Mushroom Risotto\n1 cup arborio rice\n250 g mixed mushrooms\nSaut\xE9 mushrooms, add rice, stock gradually...",
        style: { width: "100%", minHeight: 90, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: 8, fontSize: 13, fontFamily: "inherit", marginBottom: 8 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: parsePastedRecipe }, "Parse & add"))), /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Aggregates ingredients from every recipe-linked meal in the range. Meals without a linked recipe show up as a reminder list underneath instead." }, "Shopping list"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: rangeStart, onChange: (e) => setRangeStart(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { type: "number", min: "1", max: "30", value: rangeDays, onChange: (e) => setRangeDays(e.target.value), style: { width: 70 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "days"), /* @__PURE__ */ React.createElement(Btn, { tone: "clay", onClick: generateShoppingList, style: { background: COLORS.clay } }, "Generate")), shoppingList && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 8 } }, shoppingList.range), shoppingList.items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft } }, "No recipe-linked meals in this range yet.") : shoppingList.items.map((i) => /* @__PURE__ */ React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: i.done, onChange: () => toggleShoppingItem(i.id), style: { accentColor: COLORS.green, width: 15, height: 15 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink, textDecoration: i.done ? "line-through" : "none", opacity: i.done ? 0.5 : 1 } }, i.qty, " ", i.unit, " ", i.name))), shoppingList.unmatched && shoppingList.unmatched.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: COLORS.clay, marginBottom: 4 } }, "Not itemised (no recipe linked) \u2014 plan for these separately:"), shoppingList.unmatched.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12, color: COLORS.inkSoft, padding: "2px 0" } }, u))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Logged days"), Object.keys(meals).sort().reverse().slice(0, 10).map((d) => /* @__PURE__ */ React.createElement("div", { key: d, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, fmtDate(d)), /* @__PURE__ */ React.createElement("div", null, [meals[d].breakfast, meals[d].lunch, meals[d].dinner, meals[d].snacks].filter(Boolean).join(" \xB7 "))))));
  }
  function TodoTab({ todos, setTodos, weeklyPool, setWeeklyPool, todayPicks, setTodayPicks, dismissedIds, setDismissedIds, recurringTasks, setRecurringTasks, today }) {
    const [text, setText] = useState("");
    const [date, setDate] = useState(todayISO());
    const [poolText, setPoolText] = useState("");
    const [poolCategory, setPoolCategory] = useState("sewing");
    const [editingPoolId, setEditingPoolId] = useState(null);
    const [editPoolText, setEditPoolText] = useState("");
    const [newRecurringText, setNewRecurringText] = useState("");
    const [newRecurringFrequency, setNewRecurringFrequency] = useState("weekly");
    const [newRecurringDayOfWeek, setNewRecurringDayOfWeek] = useState("1");
    const [newRecurringDayOfMonth, setNewRecurringDayOfMonth] = useState("1");
    const [newRecurringIntervalDays, setNewRecurringIntervalDays] = useState("2");
    const [newRecurringIntervalMonths, setNewRecurringIntervalMonths] = useState("3");
    const [newRecurringAnchorDate, setNewRecurringAnchorDate] = useState(todayISO());
    const [newRecurringStartDate, setNewRecurringStartDate] = useState(todayISO());
    const [newRecurringEndDate, setNewRecurringEndDate] = useState("");
    const [editingRecurringId, setEditingRecurringId] = useState(null);
    const [editRecurringText, setEditRecurringText] = useState("");
    if (!todos) return null;
    const dismiss = (id) => {
      if (!dismissedIds.includes(id)) setDismissedIds([...dismissedIds, id]);
    };
    const add = () => {
      if (!text) return;
      setTodos([...todos, { id: "t-" + Date.now(), date, text, source: "manual", done: false }]);
      setText("");
    };
    const addForTomorrow = () => {
      if (!text) return;
      setTodos([...todos, { id: "t-" + Date.now(), date: addDaysISO(today, 1), text, source: "manual", done: false }]);
      setText("");
    };
    const upcoming = [...todos].filter((t) => t.source === "calendar" || t.source === "calendar-live").sort((a, b) => a.date.localeCompare(b.date));
    const categoryOf = (p) => p.category || (p.id.startsWith("sew-") ? "sewing" : p.id.startsWith("life-") ? "life" : "other");
    const addPoolItem = () => {
      if (!poolText) return;
      setWeeklyPool([...weeklyPool, { id: "pool-" + Date.now(), text: poolText, category: poolCategory }]);
      setPoolText("");
    };
    const removePoolItem = (id) => {
      setWeeklyPool(weeklyPool.filter((p) => p.id !== id));
      dismiss(id);
      const next = {};
      Object.entries(todayPicks).forEach(([d, ids]) => {
        next[d] = ids.filter((i) => i !== id);
      });
      setTodayPicks(next);
    };
    const moveItem = (id, newCategory) => {
      setWeeklyPool(weeklyPool.map((p) => p.id === id ? { ...p, category: newCategory } : p));
    };
    const startEditPool = (p) => {
      setEditingPoolId(p.id);
      setEditPoolText(p.text);
    };
    const saveEditPool = (id) => {
      if (editPoolText.trim()) setWeeklyPool(weeklyPool.map((p) => p.id === id ? { ...p, text: editPoolText.trim() } : p));
      setEditingPoolId(null);
    };
    const movePoolItem = (id, direction) => {
      const item = weeklyPool.find((p) => p.id === id);
      if (!item) return;
      const sameCategory = weeklyPool.filter((p) => categoryOf(p) === categoryOf(item));
      const idx = sameCategory.findIndex((p) => p.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sameCategory.length) return;
      const otherId = sameCategory[swapIdx].id;
      const fullIdxA = weeklyPool.findIndex((p) => p.id === id);
      const fullIdxB = weeklyPool.findIndex((p) => p.id === otherId);
      const next = [...weeklyPool];
      [next[fullIdxA], next[fullIdxB]] = [next[fullIdxB], next[fullIdxA]];
      setWeeklyPool(next);
    };
    const movePoolItemToTop = (id) => {
      const item = weeklyPool.find((p) => p.id === id);
      if (!item) return;
      const category = categoryOf(item);
      const rest = weeklyPool.filter((p) => p.id !== id);
      const firstSameCategoryIdx = rest.findIndex((p) => categoryOf(p) === category);
      const next = [...rest];
      next.splice(firstSameCategoryIdx === -1 ? 0 : firstSameCategoryIdx, 0, item);
      setWeeklyPool(next);
    };
    const picksToday = todayPicks[today] || [];
    const togglePick = (id) => {
      const cur = todayPicks[today] || [];
      const next = cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id];
      setTodayPicks({ ...todayPicks, [today]: next });
    };
    const renderPoolGroup = (items) => items.map((p, i) => {
      const editing = editingPoolId === p.id;
      return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { padding: "10px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", flexShrink: 0, marginTop: 1 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => movePoolItem(p.id, -1), disabled: i === 0, style: { background: "none", border: "none", color: i === 0 ? COLORS.line : COLORS.inkSoft, cursor: i === 0 ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: "1px 4px" } }, "\u25B2"), /* @__PURE__ */ React.createElement("button", { onClick: () => movePoolItem(p.id, 1), disabled: i === items.length - 1, style: { background: "none", border: "none", color: i === items.length - 1 ? COLORS.line : COLORS.inkSoft, cursor: i === items.length - 1 ? "default" : "pointer", fontSize: 12, lineHeight: 1, padding: "1px 4px" } }, "\u25BC")), /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: picksToday.includes(p.id), onChange: () => togglePick(p.id), style: { accentColor: COLORS.clay, width: 16, height: 16, marginTop: 3, flexShrink: 0 } }), editing ? /* @__PURE__ */ React.createElement(
        Input,
        {
          value: editPoolText,
          onChange: (e) => setEditPoolText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEditPool(p.id);
            if (e.key === "Escape") setEditingPoolId(null);
          },
          autoFocus: true,
          style: { flex: 1, fontSize: 14 }
        }
      ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: COLORS.ink, lineHeight: 1.4 } }, p.text)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 6, marginLeft: 32, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Select, { value: categoryOf(p), onChange: (e) => moveItem(p.id, e.target.value), style: { fontSize: 11.5, padding: "3px 6px" } }, POOL_CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.key, value: c.key }, c.label))), i > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => movePoolItemToTop(p.id), title: "Move to top", style: { background: "none", border: "none", color: COLORS.clay, cursor: "pointer", fontSize: 11 } }, "top"), editing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => saveEditPool(p.id), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingPoolId(null), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 12 } }, "cancel")) : /* @__PURE__ */ React.createElement("button", { onClick: () => startEditPool(p), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => removePoolItem(p.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715")));
    });
    const addRecurringTask = () => {
      if (!newRecurringText.trim()) return;
      const t = { id: "rt-" + Date.now(), text: newRecurringText.trim(), frequency: newRecurringFrequency };
      if (newRecurringFrequency === "daily") {
        t.startDate = newRecurringStartDate || todayISO();
      } else if (newRecurringFrequency === "weekly") {
        t.dayOfWeek = parseInt(newRecurringDayOfWeek, 10);
      } else if (newRecurringFrequency === "monthly") {
        t.dayOfMonth = Math.min(31, Math.max(1, parseInt(newRecurringDayOfMonth, 10) || 1));
      } else if (newRecurringFrequency === "interval-days") {
        t.intervalDays = Math.max(1, parseInt(newRecurringIntervalDays, 10) || 1);
        t.anchorDate = newRecurringAnchorDate;
      } else if (newRecurringFrequency === "interval-months") {
        t.intervalMonths = Math.max(1, parseInt(newRecurringIntervalMonths, 10) || 1);
        t.anchorDate = newRecurringAnchorDate;
        t.dayOfMonth = parseInt(newRecurringAnchorDate.slice(8, 10), 10);
      }
      if (newRecurringEndDate) t.endDate = newRecurringEndDate;
      setRecurringTasks([...recurringTasks, t]);
      setNewRecurringText("");
      setNewRecurringEndDate("");
    };
    const removeRecurringTask = (id) => setRecurringTasks(recurringTasks.filter((t) => t.id !== id));
    const startEditRecurring = (t) => {
      setEditingRecurringId(t.id);
      setEditRecurringText(t.text);
    };
    const saveEditRecurring = (id) => {
      if (editRecurringText.trim()) setRecurringTasks(recurringTasks.map((t) => t.id === id ? { ...t, text: editRecurringText.trim() } : t));
      setEditingRecurringId(null);
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Weekly task pool"), picksToday.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginBottom: 10 } }, picksToday.length, " picked for today \u2014 see them on Glance."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Add a recurring/ongoing task", value: poolText, onChange: (e) => setPoolText(e.target.value), style: { flex: 1, minWidth: 140 } }), /* @__PURE__ */ React.createElement(Select, { value: poolCategory, onChange: (e) => setPoolCategory(e.target.value) }, POOL_CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.key, value: c.key }, c.label))), /* @__PURE__ */ React.createElement(Btn, { onClick: addPoolItem }, "Add")), POOL_CATEGORIES.map((c) => {
      const items = weeklyPool.filter((p) => categoryOf(p) === c.key && !picksToday.includes(p.id));
      return /* @__PURE__ */ React.createElement("div", { key: c.key }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS[c.color], marginTop: 14, marginBottom: 2 } }, c.label), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft, paddingBottom: 8 } }, "Nothing here.") : renderPoolGroup(items));
    }), weeklyPool.filter((p) => categoryOf(p) === "other" && !picksToday.includes(p.id)).length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.inkSoft, marginTop: 14, marginBottom: 2 } }, "Uncategorised"), renderPoolGroup(weeklyPool.filter((p) => categoryOf(p) === "other" && !picksToday.includes(p.id))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Recurring tasks"), /* @__PURE__ */ React.createElement(Input, { placeholder: "What's the task?", value: newRecurringText, onChange: (e) => setNewRecurringText(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Select, { value: newRecurringFrequency, onChange: (e) => setNewRecurringFrequency(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "daily" }, "Every day"), /* @__PURE__ */ React.createElement("option", { value: "weekly" }, "Every week"), /* @__PURE__ */ React.createElement("option", { value: "monthly" }, "Every month"), /* @__PURE__ */ React.createElement("option", { value: "interval-days" }, "Every N days"), /* @__PURE__ */ React.createElement("option", { value: "interval-months" }, "Every N months")), newRecurringFrequency === "daily" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, "starting"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: newRecurringStartDate, onChange: (e) => setNewRecurringStartDate(e.target.value) })), newRecurringFrequency === "weekly" && /* @__PURE__ */ React.createElement(Select, { value: newRecurringDayOfWeek, onChange: (e) => setNewRecurringDayOfWeek(e.target.value) }, WEEKDAY_NAMES.map((name, i) => /* @__PURE__ */ React.createElement("option", { key: i, value: i }, name))), newRecurringFrequency === "monthly" && /* @__PURE__ */ React.createElement(Input, { type: "number", min: "1", max: "31", placeholder: "Day of month", value: newRecurringDayOfMonth, onChange: (e) => setNewRecurringDayOfMonth(e.target.value), style: { width: 130 } }), newRecurringFrequency === "interval-days" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Input, { type: "number", min: "1", placeholder: "Every N days", value: newRecurringIntervalDays, onChange: (e) => setNewRecurringIntervalDays(e.target.value), style: { width: 130 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, "starting"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: newRecurringAnchorDate, onChange: (e) => setNewRecurringAnchorDate(e.target.value) })), newRecurringFrequency === "interval-months" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Input, { type: "number", min: "1", placeholder: "Every N months", value: newRecurringIntervalMonths, onChange: (e) => setNewRecurringIntervalMonths(e.target.value), style: { width: 130 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, "starting"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: newRecurringAnchorDate, onChange: (e) => setNewRecurringAnchorDate(e.target.value) }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, "Ends (optional \u2014 leave blank to repeat indefinitely)"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: newRecurringEndDate, onChange: (e) => setNewRecurringEndDate(e.target.value) }), /* @__PURE__ */ React.createElement(Btn, { onClick: addRecurringTask }, "Add")), recurringTasks.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft } }, "Nothing set up yet.") : recurringTasks.map((t) => {
      const editing = editingRecurringId === t.id;
      return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${COLORS.line}`, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 140 } }, editing ? /* @__PURE__ */ React.createElement(
        Input,
        {
          value: editRecurringText,
          onChange: (e) => setEditRecurringText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEditRecurring(t.id);
            if (e.key === "Escape") setEditingRecurringId(null);
          },
          autoFocus: true,
          style: { width: "100%", fontSize: 14, marginBottom: 3 }
        }
      ) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink } }, t.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, describeRecurrence(t))), editing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => saveEditRecurring(t.id), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingRecurringId(null), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 12 } }, "cancel")) : /* @__PURE__ */ React.createElement("button", { onClick: () => startEditRecurring(t), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeRecurringTask(t.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"));
    })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Add a dated to-do"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { placeholder: "What needs doing", value: text, onChange: (e) => setText(e.target.value), style: { flex: 1, minWidth: 140 } }), /* @__PURE__ */ React.createElement(Btn, { onClick: add }, "Add"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: addForTomorrow, disabled: !text }, "+ Tomorrow"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Calendar"), upcoming.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "No synced calendar appointments yet.") : upcoming.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: COLORS.slate } }, fmtDate(t.date)), /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.ink } }, " \u2014 ", t.text)))));
  }
  function SettingsTab({
    weightLogs,
    setWeightLogs,
    weeklyPool,
    setWeeklyPool,
    dismissedIds,
    todos,
    setTodos,
    icloudUrlInput,
    setIcloudUrlInput,
    icloudStatus,
    icloudError,
    icloudLastSync,
    saveIcloudUrl,
    syncIcloudCalendar,
    corsProxyUrlInput,
    setCorsProxyUrlInput,
    saveCorsProxyUrl,
    exportBackup,
    importBackup,
    importMessage,
    lastBackupAt
  }) {
    const [renphoImporting, setRenphoImporting] = useState(false);
    const [renphoError, setRenphoError] = useState("");
    const [renphoResult, setRenphoResult] = useState("");
    const [fitbitImporting, setFitbitImporting] = useState(false);
    const [fitbitResult, setFitbitResult] = useState("");
    const [fitbitError, setFitbitError] = useState("");
    const [restoreMessage, setRestoreMessage] = useState("");
    const importFitbitWeightFiles = async (fileList) => {
      setFitbitImporting(true);
      setFitbitError("");
      setFitbitResult("");
      try {
        const allEntries = [];
        for (const file of fileList) {
          const text = await file.text();
          let parsed;
          try {
            parsed = JSON.parse(text);
          } catch {
            continue;
          }
          if (Array.isArray(parsed)) allEntries.push(...parsed);
        }
        if (allEntries.length === 0) {
          setFitbitError("No readable weight entries found in the selected files.");
          setFitbitImporting(false);
          return;
        }
        allEntries.sort((a, b) => (a.logId || 0) - (b.logId || 0));
        const byId = {};
        for (const e of allEntries) {
          if (!e.date || typeof e.weight !== "number") continue;
          const m = e.date.match(/^(\d{2})\/(\d{2})\/(\d{2})$/);
          if (!m) continue;
          const yearNum = parseInt(m[3], 10);
          const fullYear = yearNum < 50 ? 2e3 + yearNum : 1900 + yearNum;
          const isoDate = `${fullYear}-${m[1]}-${m[2]}`;
          const entry = {
            id: `fitbit-${isoDate}`,
            date: isoDate,
            source: "fitbit",
            weight: Math.round(e.weight * 0.45359237 * 10) / 10
            // lbs -> kg
          };
          if (typeof e.fat === "number") entry.bodyFat = Math.round(e.fat * 10) / 10;
          if (typeof e.bmi === "number") entry.bmi = e.bmi;
          byId[entry.id] = entry;
        }
        const { result, newCount, enrichedCount, touchedDates } = applySourceImport(weightLogs, byId);
        if (newCount === 0 && enrichedCount === 0) {
          setFitbitResult("Nothing new to import \u2014 every date and field in these files is already in your log.");
          setFitbitImporting(false);
          return;
        }
        setWeightLogs(result);
        const dates = touchedDates.sort();
        const parts = [];
        if (newCount) parts.push(`${newCount} new day(s)`);
        if (enrichedCount) parts.push(`${enrichedCount} existing day(s) filled in`);
        setFitbitResult(`${parts.join(", ")}, spanning ${fmtDate(dates[0])} to ${fmtDate(dates[dates.length - 1])}. Nothing already recorded was changed.`);
      } catch (e) {
        setFitbitError("Something went wrong reading those files: " + (e && e.message ? e.message : String(e)));
      } finally {
        setFitbitImporting(false);
      }
    };
    const RENPHO_CSV_COLUMNS = [
      { header: "Weight(kg)", key: "weight" },
      { header: "BMI", key: "bmi" },
      { header: "Body Fat Percentage(%)", key: "bodyFat" },
      { header: "Body Fat Mass(kg)", key: "bodyFatMass" },
      { header: "Muscle Percentage(%)", key: "musclePct" },
      { header: "Muscle Mass(kg)", key: "muscleMass" },
      { header: "Skeletal Muscle Percentage(%)", key: "skeletalMusclePct" },
      { header: "Skeletal Muscle Mass(kg)", key: "skeletalMuscleMass" },
      { header: "Bone Percentage(%)", key: "bonePct" },
      { header: "Bone Mass(kg)", key: "boneMass" },
      { header: "Protein Percentage(%)", key: "proteinPct" },
      { header: "Protein Mass(kg)", key: "proteinMass" },
      { header: "Body Water Percentage(%)", key: "waterPct" },
      { header: "Body Water Mass(kg)", key: "waterMass" },
      { header: "Fat-Free Mass(kg)", key: "fatFreeMass" },
      { header: "Subcutaneous Fat(%)", key: "subcutaneousFatPct" },
      { header: "Visceral Fat", key: "visceralFat" },
      { header: "BMR(kcal)", key: "bmr" },
      { header: "Metabolic Age", key: "metabolicAge" },
      { header: "WHR (Waist-to-Hip Ratio)", key: "whr" }
    ];
    const parseCsvLine = (line) => line.split(",").map((c) => c.trim());
    const importRenphoCsv = async (file) => {
      setRenphoImporting(true);
      setRenphoError("");
      setRenphoResult("");
      try {
        const text = await file.text();
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < 2) throw new Error("File looks empty.");
        const header = parseCsvLine(lines[0]);
        const dateIdx = header.indexOf("Date");
        const timeIdx = header.indexOf("Time");
        if (dateIdx === -1) throw new Error("Couldn't find a 'Date' column \u2014 is this the RENPHO export CSV?");
        const colIdx = {};
        RENPHO_CSV_COLUMNS.forEach((c) => {
          colIdx[c.key] = header.indexOf(c.header);
        });
        const byId = {};
        for (let i = 1; i < lines.length; i++) {
          const cols = parseCsvLine(lines[i]);
          const rawDate = cols[dateIdx];
          const m = rawDate && rawDate.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
          if (!m) continue;
          const isoDate = `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
          const time = timeIdx !== -1 ? cols[timeIdx] : "";
          const entry = { date: isoDate };
          for (const c of RENPHO_CSV_COLUMNS) {
            const idx = colIdx[c.key];
            if (idx === -1) continue;
            const raw = cols[idx];
            if (raw === void 0 || raw === "--" || raw === "") continue;
            const num = parseFloat(raw);
            if (!isNaN(num)) entry[c.key] = num;
          }
          if (entry.weight === void 0) continue;
          entry.id = `renpho-${isoDate}`;
          entry.source = "renpho";
          const existing = byId[entry.id];
          if (!existing || time && time > existing._time) {
            byId[entry.id] = { ...entry, _time: time || "" };
          }
        }
        const parsed = {};
        Object.entries(byId).forEach(([id, e]) => {
          const { _time, ...rest } = e;
          parsed[id] = rest;
        });
        if (Object.keys(parsed).length === 0) {
          setRenphoError("No usable rows found \u2014 check this is the RENPHO History export CSV.");
          return;
        }
        const { result, newCount, enrichedCount, touchedDates } = applySourceImport(weightLogs, parsed);
        if (newCount === 0 && enrichedCount === 0) {
          setRenphoResult("Nothing new \u2014 every date and field in this file is already in your log.");
          return;
        }
        setWeightLogs(result);
        const dates = touchedDates.sort();
        const parts = [];
        if (newCount) parts.push(`${newCount} new day(s)`);
        if (enrichedCount) parts.push(`${enrichedCount} existing day(s) filled in`);
        setRenphoResult(`${parts.join(", ")}, spanning ${fmtDate(dates[0])} to ${fmtDate(dates[dates.length - 1])}. Nothing already recorded was changed.`);
      } catch (e) {
        setRenphoError("Couldn't read that file: " + (e && e.message ? e.message : String(e)));
      } finally {
        setRenphoImporting(false);
      }
    };
    const staleCalendarCount = todos ? todos.filter((t) => t.source === "calendar" || t.source === "retreat").length : 0;
    const removeStaleCalendarItems = () => {
      setTodos(todos.filter((t) => t.source !== "calendar" && t.source !== "retreat"));
    };
    const restorePoolDefaults = () => {
      const existingPoolIds = new Set(weeklyPool.map((p) => p.id));
      const missingPool = EXTRA_SEED.map((e) => ({ id: e.id, text: e.text })).filter((e) => !existingPoolIds.has(e.id) && !dismissedIds.includes(e.id));
      if (missingPool.length) {
        setWeeklyPool([...weeklyPool, ...missingPool]);
        setRestoreMessage(`Restored ${missingPool.length} pool item(s) \u2014 just now`);
      } else {
        setRestoreMessage("Nothing to restore \u2014 either everything's already here, or you deliberately removed it.");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "A full snapshot of everything the tracker stores, downloaded as one JSON file \u2014 or bring one back in. Importing merges rather than overwrites: weight logs are filled in field-by-field like the RENPHO/Fitbit importers below, and everything else is replaced with the backup's version." }, "Backup"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Btn, { onClick: exportBackup }, "\u2B07 Export backup"), /* @__PURE__ */ React.createElement("label", { style: { background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, color: COLORS.ink, cursor: "pointer", fontFamily: "inherit" } }, "\u2B06 Import backup", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "application/json", style: { display: "none" }, onChange: (e) => {
      if (e.target.files[0]) importBackup(e.target.files[0]);
    } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, backupAgoLabel(lastBackupAt))), importMessage && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.green, fontWeight: 600 } }, importMessage)), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "RENPHO app \u2192 Trends \u2192 History icon \u2192 Select Data \u2192 Select all \u2192 export as CSV. This is real text data, unlike RENPHO's PDF/JPEG report shares \u2014 much more reliable. Adds new days, and fills in any blank fields on existing days (e.g. adding RENPHO's muscle/bone/protein/water detail to a day that only has a Fitbit weight) \u2014 it never changes a value that's already there." }, "Import RENPHO CSV history"), /* @__PURE__ */ React.createElement("label", { style: { display: "inline-block", background: COLORS.green, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, renphoImporting ? "Importing\u2026" : "Choose RENPHO CSV", /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: ".csv,text/csv",
        style: { display: "none" },
        disabled: renphoImporting,
        onChange: (e) => {
          if (e.target.files[0]) importRenphoCsv(e.target.files[0]);
        }
      }
    )), renphoError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.danger } }, renphoError), renphoResult && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.green, fontWeight: 600 } }, "\u2713 ", renphoResult)), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Select every weight-*.json file from your Google Takeout export (Google Health \u2192 Global Export Data) at once \u2014 hold Ctrl/Cmd while clicking to select many. Fitbit stores weight in pounds; this converts to kg automatically. Only fills in dates you don't already have \u2014 your existing entries are never overwritten." }, "Import Fitbit weight history"), /* @__PURE__ */ React.createElement("label", { style: { display: "inline-block", background: COLORS.green, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, fitbitImporting ? "Importing\u2026" : "Choose weight-*.json files", /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: "application/json",
        multiple: true,
        style: { display: "none" },
        disabled: fitbitImporting,
        onChange: (e) => {
          if (e.target.files.length) importFitbitWeightFiles(Array.from(e.target.files));
        }
      }
    )), fitbitError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.danger } }, fitbitError), fitbitResult && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.green, fontWeight: 600 } }, "\u2713 ", fitbitResult)), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Paste the public read-only link from iPhone Calendar \u2192 Calendars \u2192 (i) next to your calendar \u2192 Share Link. Anyone with this exact link can view it, so keep it private." }, "iCloud Calendar"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "webcal://p...-caldav.icloud.com/published/2/...",
        value: icloudUrlInput,
        onChange: (e) => setIcloudUrlInput(e.target.value),
        style: { flex: 1, minWidth: 220 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { onClick: saveIcloudUrl, disabled: icloudStatus === "syncing" }, icloudStatus === "syncing" ? "Syncing\u2026" : "Save & Sync"), icloudUrlInput && /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => syncIcloudCalendar(icloudUrlInput), disabled: icloudStatus === "syncing" }, "Sync now")), icloudStatus === "connected" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: COLORS.green } }, "\u2713 Connected"), icloudLastSync && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 11.5, color: COLORS.inkSoft } }, "Last synced: ", new Date(icloudLastSync).toLocaleString()), icloudError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 12.5, color: COLORS.danger } }, icloudError), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 12, borderTop: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: COLORS.ink, marginBottom: 4 } }, "CORS proxy (required for iCloud)"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 8 } }, "Apple's server blocks direct browser access from this site \u2014 confirmed, not fixable in the app itself. A small proxy fetches the calendar on your behalf instead. Paste your deployed proxy URL here once it's set up."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
      Input,
      {
        placeholder: "https://your-proxy.workers.dev",
        value: corsProxyUrlInput,
        onChange: (e) => setCorsProxyUrlInput(e.target.value),
        style: { flex: 1, minWidth: 220 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: saveCorsProxyUrl }, "Save proxy URL")))), staleCalendarCount > 0 && /* @__PURE__ */ React.createElement(Card, { style: { background: COLORS.claySoft, borderColor: COLORS.gold } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "These are duplicates of what iCloud sync now provides \u2014 safe to remove on each device separately." }, "Clean up old calendar duplicates"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink, marginBottom: 8 } }, "Found ", staleCalendarCount, " leftover item", staleCalendarCount === 1 ? "" : "s", " from the old static calendar list and/or the old retreat schedule seed."), /* @__PURE__ */ React.createElement(Btn, { onClick: removeStaleCalendarItems }, "Remove ", staleCalendarCount, " old item", staleCalendarCount === 1 ? "" : "s")), /* @__PURE__ */ React.createElement(Card, { style: { background: COLORS.claySoft, borderColor: COLORS.gold } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Only re-adds original starter items you never touched \u2014 won't bring back anything you've deleted yourself." }, "Restore pool defaults"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: restorePoolDefaults }, "Restore pool defaults"), restoreMessage && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 12.5, color: COLORS.green } }, restoreMessage)));
  }
  var rootEl = document.getElementById("root");
  var root = window.ReactDOM.createRoot(rootEl);
  root.render(React.createElement(App));
})();
