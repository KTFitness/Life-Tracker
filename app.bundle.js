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
    { key: "food", label: "Food", color: "olive" },
    { key: "dogs", label: "Holly & Ruby", color: "slate" },
    { key: "purchases", label: "To Purchase", color: "plum" }
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
  var WEEKLY_SKIN = {
    1: {
      // Monday
      label: "Monday \u2014 Vit C / Retinoid",
      am: [
        { id: "cleanse", label: "Cleanse", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "vitc", label: "Vitamin C", options: ["LRP Pure Vitamin C10", "SkinCeuticals C E Ferulic"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum", "NIOD Multi-Molecular Hyaluronic Complex + SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Azelaic + NIOD SDSM Mist + Elemis Future Restore"] },
        { id: "eye", label: "Eye", options: ["Environ Youth EssentiA Eye", "Viviology Retinal Eye Cipher", "The Anomaly", "Allies of Skin Peptides & Omegas", "RoC Retinol Correxion (irritated: Emma Lewisham/LRP Toleriane)"] },
        { id: "moist", label: "Moisturiser", options: ["Embryolisse Lait-Cr\xE8me", "Elemis Marine Cream", "Elemis Morning Matrix", "Mecca Morphosis Gel Cream", "Origins Ginzing"] },
        { id: "neck", label: "Neck/Chest", options: ["NIOD Neck Elasticity Catalyst + Elemis Neck & D\xE9collet\xE9 Balm"] },
        { id: "eyemask", label: "Eye mask (weekly)", options: ["as available"] }
      ],
      pm: [
        { id: "cleanse1", label: "1st Cleanse", options: ["Emma Lewisham Oil"] },
        { id: "cleanse2", label: "2nd Cleanse", options: ["Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid", options: ["Retrieve Tretinoin 0.05%"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "barrier", label: "Barrier support", options: ["Cicaplast B5 Serum", "Cicaplast B5 Balm (if tender)", "Emma Lewisham Vitale Elixir", "Emma Lewisham Face Oil"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo", "Elemis Overnight Matrix"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest (daily)", options: ["NIOD Neck Elasticity Catalyst (before neck cream) + Elemis Neck & D\xE9collet\xE9 Balm (over NEC)"] }
      ]
    },
    2: {
      // Tuesday
      label: "Tuesday \u2014 Exfoliating masque / Tranexamic",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "masque", label: "Clay/exfoliating masque + hair mask", options: ["Kiehl's Rare Earth", "Go-To The Removalist", "NIOD Flavanone Mud", "+ Moisturising Hair Mask"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "niacinamide", label: "Niacinamide", options: ["LRP Niacinamide 10", "Paula's Choice Niacinamide"] },
        { id: "serums", label: "Serums (layer)", options: ["Perricone MD Face Firming + Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "tranexamic", label: "Tranexamic acid", options: ["SkinCeuticals Discoloration Defense", "Naturium Tranexamic Topical Acid 5%"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "repair", label: "Repair serum", options: ["NIOD Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    },
    3: {
      // Wednesday
      label: "Wednesday \u2014 Vit C / Retinoid (alt)",
      am: [
        { id: "cleanse", label: "Cleanse", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "mask", label: "Hydrating/soothing mask (after FCAS, optional)", options: ["Aesop Blue Chamomile", "Go-To Repair Shop"] },
        { id: "vitc", label: "Vitamin C", options: ["LRP Pure Vitamin C10", "SkinCeuticals C E Ferulic"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Azelaic + NIOD SDSM Mist + Elemis Future Restore"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] },
        { id: "eyemask", label: "Eye mask (weekly)", options: ["as available"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid (alt)", options: ["Go-To Very Amazing Retinal", "Dermalogica Dynamic Skin Retinol", "Eve Lom Radiance Repair Retinol", "Verso Night Cream (Retinol 8)", "BareMinerals Ageless Phyto Retinol", "Skinstitut Expert Reveal Retinol Oil"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "barrier", label: "Barrier", options: ["Cicaplast B5 Serum + Balm"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo", "Elemis Overnight Matrix"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    },
    4: {
      // Thursday
      label: "Thursday \u2014 EXFOLIATION night",
      am: [
        { id: "cleanse", label: "Cleanse", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "niacinamide", label: "Niacinamide", options: ["LRP Niacinamide 10", "Paula's Choice Niacinamide"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] },
        { id: "eyemask", label: "Eye mask + purple hair mask (weekly)", options: ["as available"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "exfoliant", label: "Exfoliant / peel \u2014 tonight's the night", options: ["Dr Dennis Gross Peel", "Alpha-H Liquid Gold", "Riversol Glycolic Peel", "T.O. AHA/BHA Peel", "Elemis Glow Boost Exfoliator", "Aesop Exfoliant Paste", "Go-To Glow Exfoliant", "Clarins Peeling Beaut\xE9 \xC9clair"] },
        { id: "step1", label: "Next Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "Then", options: ["Sulwhasoo FCAS"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "barrier", label: "Barrier", options: ["Cicaplast B5 Serum + Balm (if tender)", "Emma Lewisham Vitale Elixir", "Emma Lewisham Face Oil"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo", "Elemis Overnight Matrix"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    },
    5: {
      // Friday
      label: "Friday \u2014 Vit C / Retinoid",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "vitc", label: "Vitamin C", options: ["LRP Pure Vitamin C10", "SkinCeuticals C E Ferulic"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Perricone MD Face Firming + Azelaic + NIOD SDSM"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "retinoid", label: "Retinoid", options: ["Retrieve Tretinoin 0.05%"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + NIOD Multi-Molecular + SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo", "Elemis Overnight Matrix"] },
        { id: "eye", label: "Eye", options: ["LRP Toleriane Dermallergo Eye", "Emma Lewisham Eye Cream"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    },
    6: {
      // Saturday
      label: "Saturday \u2014 Clay masque / Tranexamic",
      am: [
        { id: "masque", label: "Clay/exfoliating masque", options: ["Kiehl's Rare Earth", "Go-To The Removalist", "NIOD Flavanone Mud"] },
        { id: "cleanse", label: "Cleanse", options: ["CeraVe Hydrating", "Sulwhasoo Gentle", "Elemis Marine"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "sheetmask", label: "Sheet mask / eye mask-patches", options: ["111Skin", "Black Pearl", "Collagen Eye", "Wrinkles Schminkles"] },
        { id: "vitc", label: "Vitamin C", options: ["LRP Pure Vitamin C10", "SkinCeuticals C E Ferulic"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + SDSM Mist"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "treatment", label: "Treatment (lines only)", options: ["Goldfaden MD Needle-less Line Smoothing"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "tranexamic", label: "Tranexamic acid", options: ["SkinCeuticals Discoloration Defense", "Naturium Tranexamic Topical Acid 5%"] },
        { id: "repair", label: "Repair", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + SDSM Mist + SNAIL"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "oil", label: "Oil", options: ["Emma Lewisham Supernatural Face Oil"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    },
    0: {
      // Sunday
      label: "Sunday \u2014 Active cleanse / Tranexamic",
      am: [
        { id: "active_cleanse", label: "Active cleanser", options: ["Elemis Dynamic Resurfacing", "Elemis Glow Boost Exfoliator"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "mask", label: "Hydrating/soothing mask + hair mask", options: ["Aesop Blue Chamomile", "Go-To Repair Shop", "+ Moisturising Hair Mask"] },
        { id: "hydrator", label: "Hydrator", options: ["SNAIL"] },
        { id: "serums", label: "Serums (layer)", options: ["Emma Lewisham Reset + NIOD SDSM Mist"] },
        { id: "repair", label: "Repair serum", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "eye", label: "Eye", options: ["as Monday"] },
        { id: "moist", label: "Moisturiser", options: ["as Monday"] },
        { id: "neck", label: "Neck/Chest", options: ["as Monday"] }
      ],
      pm: [
        { id: "cleanse", label: "1st + 2nd Cleanse", options: ["as above"] },
        { id: "step1", label: "1st Step", options: ["SK-II", "Mishka First Essence"] },
        { id: "step2", label: "2nd Step", options: ["Sulwhasoo FCAS"] },
        { id: "tranexamic", label: "Tranexamic acid", options: ["SkinCeuticals Discoloration Defense", "Naturium Tranexamic Topical Acid 5%"] },
        { id: "repair", label: "Repair", options: ["Allies of Skin Peptides", "NIOD Copper Amino"] },
        { id: "hydrator", label: "Hydrator", options: ["LRP Hyalu B5 Serum + SDSM Mist"] },
        { id: "moist", label: "Moisturiser", options: ["Sulwhasoo Overnight Mask"] },
        { id: "oil", label: "Oil", options: ["Emma Lewisham Supernatural Face Oil"] },
        { id: "eye", label: "Eye", options: ["Elemis Eye Revive Mask"] },
        { id: "neck", label: "Neck/Chest", options: ["as above"] }
      ]
    }
  };
  var IRON_DAYS = {
    1: { title: "Lower Body", exercises: ["Suitcase Squat", "Static Lunge", "Romanian Deadlift", "Rear Step Lunge", "Pause at Bottom Goblet Squat", "Lateral Lunge", "Finisher: 1/2 Rep Goblet Squat", "Full Range Goblet Squat", "Body Weight Squat", "1/2 Rep Body Weight Squat"] },
    2: { title: "Upper Body", exercises: ["Chest Press", "Chest Flys", "Alternating Renegade Rows", "Pullovers", "Shoulder Press (Goal Post)", "Bent Over Rear Delt Flys", "Lateral Raise", "Finisher: Alternating Frontal Raise", "Frontal Raise"] },
    3: { title: "Glutes & Hamstrings", exercises: ["Banded Hip Thrust (Pause at Top)", "Hip Thrust (Pause at Top)", "Staggered Hip Thrust", "Sumo Deadlift Squat (Pause at Bottom)", "Bulgarian Lunge"] },
    4: { title: "Full Body", exercises: ["Double Arm Bent Over Row", "Static/Stationary Lunge", "Romanian Deadlift (RDL)", "Chest Press", "Push Press", "Heel Elevated Squat", "Rear Step Lunge", "Finisher: Alternating Reverse Lunges"] },
    5: { title: "Arms & Abs", exercises: ["Palms Up Bicep Curl", "Diamond Press", "Wide Bicep Curls", "Tricep Press", "Skull Crushers", "Hammer Curls", "Straight Leg Reverse Crunch", "Alternating Rotational Curls"] },
    6: { title: "Lower Body", exercises: [["Closer Stance Lunge", "B", 17], ["Heel Elevated Squats", "B", 17], ["Heel Elevated Squat \u2013 Slow Eccentric", "B", 17], ["Bulgarian Lunge", "DB", 7.5], ["Close Stance Bulgarian Lunge", "DB", 7.5], ["Goblet Squat", "DB", 12.5]] },
    7: { title: "Shoulders & Triceps", exercises: [["Shoulder Press", "DB", "2x3.5"], ["Arnold Press", "DB", "2x3.5"], ["Face Pulls", "DB", "2x5"], ["Alternating Lateral Raises", "DB", "2x3.5"], ["Upright Rows", "B", 17.5], ["Tate Press", "DB", "2x6"], ["Skull Crushers", "DB", "2x6"], ["Overhead Extension", "DB", "2x4"], ["Lateral Raise", "DB", "2x3.5"], ["Lateral Raise Partials", "DB", "2x3.5"]] },
    8: { title: "Glutes & Hamstrings", exercises: [["Romanian Deadlift (RDL)", "B", 17.5], ["Banded Hip Thrusts \u2013 Slow", "DB", 15], ["Paused at Top Hip Thrusts", "DB", 15], ["1.5 Rep Hip Thrusts", "DB", 15], ["Hamstring Hip Thrusts", "DB", 7.5], ["Staggered RDL", "DB", "2x6"], ["Lunge to Staggered RDL", "DB", "2x6"], ["Single Leg Hamstring Lift", "DB", "1x5"], ["Weighted Hamstring Thrust", "DB", "1x15"]] },
    9: { title: "Full Body", exercises: [["Bent Over Rows", "B", 17.5], ["Squat Press", "DB", "2x7.5"], ["High Squats", "B", 17.5], ["Chest Press", "B", 17.5], ["Static Lunge", "DB", "2x7.5"], ["Single Arm Shoulder Press", "DB", "1x5"], ["Lateral Lunge", "DB", 12.5], ["1/2 rep squats", "B", 17.5], ["Push Press", "DB", "2x7.5"], ["Squat to Press", "DB", "2x7.5"]] },
    10: { title: "Back & Biceps", exercises: [["Single Arm Rows", "DB", "1x10"], ["Pullovers", "DB", "2x7"], ["Single Arm Supine Row", "DB", "1x8"], ["Hammer Curl", "DB", "2x6"], ["X Body Curl", "DB", "2x6"], ["Wide Curl", "DB", "2x6"], ["Supine Row", "DB", "2x7"], ["Palm Up Curls", "DB", "2x6"]] },
    11: { title: "Legs & Calves Focus", exercises: [["Paused Goblet Squat", "DB", "1x10"], ["Front Foot Elevated Lunge", "DB", "2x7.5"], ["Pause Lunge (static)", "DB", "2x7.5"], ["Rear Step Lunge", "DB", "2x7.5"], ["Rear Step \u2192 Forward Lean Lunge", "DB", "2x7.5"], ["Rear Step \u2192 Full Lunge sequence", "DB", "2x7.5"], ["Curtsy Lunge", "DB", "2x7.5"], ["Static Curtsy Lunge", "DB", "2x7.5"]] },
    12: { title: "Chest & Triceps", exercises: [["Chest Press", "DB", "1x18"], ["Diamond Press", "DB", "2x7.5"], ["Flyes", "DB", "2x7.5"], ["Tricep Press", "DB", "2x7.5"], ["Skullcrushers", "DB", "2x7.5"], ["Dips", "", ""], ["Wide/Regular/Tricep Push-ups", "DB", "2x7"]] },
    13: { title: "Posterior Chain: Glutes, Hamstrings, Back", exercises: [["Renegade Rows", "DB", "2x7.5"], ["Rotational Row", "DB", "2x7.5"], ["Deadstop Row", "DB", "2x7.5"], ["Pullover", "B", "1x15"], ["RDL (slow eccentric)", "B", "1x15"], ["RDL (pause at bottom)", "B", "1x15"], ["Staggered RDL & 1.5 rep", "DB", "1x7"], ["Sumo Deadlift Squat", "B", "1x15"], ["Hip Thrusts", "DB", "1x15"], ["Sumo Squat", "B", "1x15"]] },
    14: { title: "Unilateral Full Body", exercises: [["Alternating Chest Press", "DB", "2x7.5"], ["Static Lunge", "DB", "2x7.5"], ["Alternating Rear Step Lunges", "DB", "2x7.5"], ["Single Arm Renegade Row", "DB", "2x5"], ["Bulgarian Lunge", "DB", "2x7.5"], ["Forward Lean Lunge", "DB", "2x7.5"], ["Single Side Arnold Press", "DB", "1x5"], ["Clean to Single Side Arnold Press", "DB", "1x5"], ["Squat to Lunge", "DB", "2x7.5"], ["Bodyweight Squat to Lunge", "DB", "2x7.5"], ["\xBD-rep Bulgarian Lunges", "DB", "2x7.5"], ["Uneven Push-ups", "", ""]] },
    15: { title: "Shoulders: Compound & Isolation", exercises: [["Shoulder Press", "DB", "2x5"], ["Frontal Raise", "DB", "2x5"], ["Rear Delt Fly", "DB", "2x5"], ["Lateral Raise", "DB", "2x5"], ["Hammer Frontal Raise", "DB", "2x5"], ["Rear Delt Partial Raises", "DB", "2x5"], ["Lateral Partials", "DB", "2x5"], ["Arc Raise", "DB", "2x5"], ["Lateral-Frontal-Clean to Press combo", "DB", "2x5"]] },
    16: { title: "Hamstrings & Hips", exercises: [["Slow Eccentric RDL", "B", 17.5], ["Paused RDL", "B", 17.5], ["Normal Tempo RDL", "B", 17.5], ["Slow Staggered RDL", "B", 17.5], ["1.5 Rep Staggered RDL", "DB", 7.5], ["Stag RDL to Lunge", "DB", 7.5], ["Balance RDL", "", ""], ["Hamstring Thrust", "DB", "1x"], ["RDL x2 Dumbbells", "DB", "2x7.5"], ["RDL x1 Dumbbell", "DB", "1x"]] },
    17: { title: "Upper Body", exercises: [["Chest Press", "DB", "2x7.5"], ["Tricep Press/Skullcrushers", "DB", "2x7.5"], ["Pullovers", "DB", "2x7.5"], ["Diamond Press", "DB", "2x7.5"], ["Landmine Row", "B", "2x4"], ["Arnold Press", "DB", "2x4"], ["Lateral to Frontal Arcs", "DB", "2x4"], ["Partial Rear Delt Flyes", "DB", "2x4"], ["Around the World", "DB", "2x4"]] },
    18: { title: "Glutes", exercises: [["Warm Up Walks", "", ""], ["Sumo Squat Deadlift", "B", 17.5], ["Banded Hip Thrust", "DB", 15], ["Hip Thrust Pulses", "DB", 15], ["Elevated Lunge", "DB", "2x7.5"], ["Bodyweight Fwd Lean Hand Tap", "DB", "2x7.5"], ["Rear Step Lunge", "DB", "1x7.5"], ["Band Only Hip Thrust Hold", "", ""], ["x1 Leg Hip Thrust Pulses", "DB", "1x7.5"], ["Lateral Walk", "", ""], ["Squats", "", ""], ["One Side Abduction", "", ""], ["Faster Walk", "", ""]] },
    19: { title: "Full Body", exercises: [["Chest Press", "DB", "2x7.5"], ["Static Lunge", "DB", "2x7.5"], ["Rear Step Fwd Lean Lunge", "DB", "2x7.5"], ["Pullovers", "DB", "2x7.5"], ["Bent Over Row", "DB", "2x7.5"], ["Sumo Squat", "B", 17.5], ["Shoulder Press", "DB", "2x3.5"], ["Push Press", "DB", "2x7.5"], ["RDL", "B", 17.5], ["Row", "B", 17.5], ["Squat", "B", 17.5], ["Press", "B", 17.5], ["Rear Lunge", "B", 17.5]] },
    20: { title: "Arms, Abs & Core", exercises: [["Diamond Press", "DB", "2x7.5"], ["Tricep Press", "DB", "2x7.5"], ["Skullcrushers", "DB", "2x7.5"], ["Overhead Tricep Extension", "DB", "2x7.5"], ["Plank Hip Twist", "", ""], ["Plank Hips Up & Down", "", ""], ["Single Arm Plank Ladder", "", ""], ["Side Plank Lift", "", ""], ["Leg Lower Reverse Crunch", "", ""], ["Arc Crunch", "", ""], ["Toe Tap to Extension", "", ""], ["Bicep Curl Palms Up", "DB", "2x6"], ["Wide Curls Alternating", "DB", "2x6"], ["Hammer Curl", "DB", "2x6"], ["Cross Body Curl", "DB", "2x6"], ["Deadstop Tricep Push Up", "", ""], ["1 Dumbbell Curl", "DB", "1x6"]] }
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
        "Iron \u2014 Upper B (30 min) + Yoga flow (20 min)",
        "Cycling \u2014 ROUVY, Zone 2 (30\u201340 min)",
        "Iron \u2014 Lower B (30 min) + Yoga/mobility (20 min)",
        "Iron \u2014 Full Body PHA circuit (40 min) + Pilates finisher (15 min)",
        "Rest"
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
  var CALENDAR_SEED = [
    { date: "2026-08-23", text: "Arrive Adelaide 3:50pm from Doha", source: "calendar" },
    { date: "2026-08-27", text: "Bensons Radiology, 10:30am", source: "calendar" },
    { date: "2026-08-28", text: "Dentist 10am", source: "calendar" },
    { date: "2026-08-28", text: "Holly ear check (Felipe) \u2014 Glenelg Vet, 12:10pm", source: "calendar" },
    { date: "2026-08-29", text: "Henley dinner \u2014 our place, 6:00pm", source: "calendar" },
    { date: "2026-08-30", text: "Mounjaro 1.5mg, 9:00am", source: "calendar" },
    { date: "2026-09-07", text: "Mammogram, Flinders Private, 3:15pm \u2192 Dr O'Dea room 603", source: "calendar" },
    { date: "2026-09-10", text: "Cancel Fitbit/Google coach, 9:00pm", source: "calendar" },
    { date: "2026-09-11", text: "Holly appointment (Beransa/Felipe), 10:20am", source: "calendar" },
    { date: "2026-09-11", text: "Oddio run through, 11:30am", source: "calendar" },
    { date: "2026-09-12", text: "Mark & Simone's wedding, 4:00pm", source: "calendar" },
    { date: "2026-09-13", text: "Mounjaro 1mg, 9:00am", source: "calendar" },
    { date: "2026-09-19", text: "Wine and dine with Nikki and John, 12:00pm", source: "calendar" },
    { date: "2026-08-24", text: "Onsen \u2014 Contrast Bath and Sauna, 15:30", source: "retreat" },
    { date: "2026-08-25", text: "You Glow \u2014 Brazilian Lymphatic Drainage Massage, 13:00", source: "retreat" },
    { date: "2026-08-26", text: "Blue Lagoon \u2014 Honey & Cocoa Body Wrap Ritual, 15:15", source: "retreat" },
    { date: "2026-08-27", text: "You Glow \u2014 Detox Cleansing Facial, 15:15", source: "retreat" }
  ];
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
  function computeFitnessForDate(dateStr, fitnessSettings) {
    const daysSince = Math.max(0, daysBetween(fitnessSettings.startDate, dateStr));
    const weekNum = Math.floor(daysSince / 7) + 1;
    const blockIdx = Math.min(3, Math.floor((weekNum - 1) / 6));
    const dayInBlock = daysSince % 7;
    const block = BLOCKS[blockIdx];
    return { weekNum, blockIdx, dayInBlock, block, regularSession: block.days[dayInBlock] };
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
  function getActivesSummary(schedule) {
    const amActives = schedule.am.filter((s) => ["vitc", "niacinamide", "active_cleanse", "masque"].includes(s.id)).map((s) => s.label).join(", ");
    const pmActives = schedule.pm.filter((s) => ["retinoid", "exfoliant", "tranexamic"].includes(s.id)).map((s) => s.label).join(", ");
    return { amActives, pmActives };
  }
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
    "fitness-logs",
    "iron-exercise-logs",
    "iron-equipment",
    "fitness-settings",
    "ziip-settings",
    "ziip-done",
    "am-done",
    "pm-done",
    "todos",
    "weekly-pool",
    "meals",
    "dismissed-ids",
    "recipes",
    "shopping-list",
    "today-picks",
    "pool-done"
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
  function Btn({ children, onClick, tone = "green", style }) {
    const bg = tone === "green" ? COLORS.green : tone === "danger" ? COLORS.danger : "transparent";
    const color = tone === "ghost" ? COLORS.inkSoft : "#fff";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick,
        style: {
          background: bg,
          color,
          border: tone === "ghost" ? `1px solid ${COLORS.line}` : "none",
          borderRadius: 8,
          padding: "8px 14px",
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
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
    const [fitnessLogs, setFitnessLogs] = useState([]);
    const [ironLogs, setIronLogs] = useState({});
    const [ironEquipment, setIronEquipment] = useState({});
    const [fitnessSettings, setFitnessSettings] = useState({ startDate: "2026-08-24", startBlock: 1 });
    const [ziipSettings, setZiipSettings] = useState({ startDate: "2026-08-24" });
    const [ziipDone, setZiipDone] = useState({});
    const [amDone, setAmDone] = useState({});
    const [pmDone, setPmDone] = useState({});
    const [todos, setTodos] = useState(null);
    const [weeklyPool, setWeeklyPool] = useState([]);
    const [todayPicks, setTodayPicks] = useState({});
    const [poolDone, setPoolDone] = useState({});
    const [meals, setMeals] = useState({});
    const [recipes, setRecipes] = useState([]);
    const [shoppingList, setShoppingList] = useState(null);
    const [dismissedIds, setDismissedIds] = useState([]);
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
          const todayPicksR = await readOrMissing("today-picks");
          const poolDoneR = await readOrMissing("pool-done");
          const weightLogsR = await readOrMissing("weight-logs");
          const fitnessLogsR = await readOrMissing("fitness-logs");
          const ironLogsR = await readOrMissing("iron-exercise-logs");
          const ironEquipmentR = await readOrMissing("iron-equipment");
          const fitnessSettingsR = await readOrMissing("fitness-settings");
          const ziipSettingsR = await readOrMissing("ziip-settings");
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
          setFitnessLogs(fitnessLogsR.found ? fitnessLogsR.value : []);
          setIronLogs(ironLogsR.found ? ironLogsR.value : {});
          setIronEquipment(ironEquipmentR.found ? ironEquipmentR.value : {});
          setFitnessSettings(fitnessSettingsR.found ? fitnessSettingsR.value : { startDate: "2026-08-24", startBlock: 1 });
          setZiipSettings(ziipSettingsR.found ? ziipSettingsR.value : { startDate: "2026-08-24" });
          setZiipDone(ziipDoneR.found ? ziipDoneR.value : {});
          setAmDone(amDoneR.found ? amDoneR.value : {});
          setPmDone(pmDoneR.found ? pmDoneR.value : {});
          const baseTodos = seededTodos !== null ? seededTodos : CALENDAR_SEED.map((c, i) => ({ id: "cal-" + i, date: c.date, text: c.text, source: c.source, done: false })).filter((t) => !dismissedIdsV.includes(t.id));
          setTodos(baseTodos);
          const basePool = poolLoaded !== null ? poolLoaded : EXTRA_SEED.map((e) => ({ id: e.id, text: e.text })).filter((e) => !dismissedIdsV.includes(e.id));
          setWeeklyPool(basePool);
          setMeals(mealsR.found ? mealsR.value : {});
          setDismissedIds(dismissedIdsV);
          setRecipes(recipesR.found ? recipesR.value : RECIPE_SEED);
          setShoppingList(shoppingListR.found ? shoppingListR.value : null);
          setTodayPicks(todayPicksR.found ? todayPicksR.value : {});
          setPoolDone(poolDoneR.found ? poolDoneR.value : {});
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
    };
    const [importMessage, setImportMessage] = useState("");
    const importBackup = async (file) => {
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const data = parsed.data || parsed;
        for (const key of ALL_STORAGE_KEYS) {
          if (data[key] !== void 0) await storageSet(key, data[key]);
        }
        setImportMessage("Backup imported \u2014 reloading\u2026");
        setTimeout(() => setLoadAttempt((n) => n + 1), 800);
      } catch (e) {
        setImportMessage("Couldn't read that file \u2014 is it a backup exported from this tracker?");
      }
    };
    usePersist(loaded, persist, "weight-logs", weightLogs);
    usePersist(loaded, persist, "fitness-logs", fitnessLogs);
    usePersist(loaded, persist, "iron-exercise-logs", ironLogs);
    usePersist(loaded, persist, "iron-equipment", ironEquipment);
    usePersist(loaded, persist, "fitness-settings", fitnessSettings);
    usePersist(loaded, persist, "ziip-settings", ziipSettings);
    usePersist(loaded, persist, "ziip-done", ziipDone);
    usePersist(loaded, persist, "am-done", amDone);
    usePersist(loaded, persist, "pm-done", pmDone);
    usePersist(loaded && !!todos, persist, "todos", todos);
    usePersist(loaded, persist, "meals", meals);
    usePersist(loaded, persist, "dismissed-ids", dismissedIds);
    usePersist(loaded, persist, "weekly-pool", weeklyPool);
    usePersist(loaded, persist, "today-picks", todayPicks);
    usePersist(loaded, persist, "pool-done", poolDone);
    usePersist(loaded, persist, "recipes", recipes);
    usePersist(loaded && !!shoppingList, persist, "shopping-list", shoppingList);
    const today = todayISO();
    const [viewDate, setViewDate] = useState(today);
    const isRetreatDay = RETREAT_DATES.includes(today);
    const { ziipDayIdx, ziipToday } = computeZiipForDate(today, ziipSettings);
    const { weekNum, blockIdx, dayInBlock, block, regularSession } = computeFitnessForDate(today, fitnessSettings);
    if (!loaded) {
      return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.inkSoft, padding: 24 } }, loadError ? /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 420, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", fontSize: 22, color: COLORS.ink, marginBottom: 10 } }, "Couldn't load your saved tracker data"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.5, marginBottom: 16 } }, "The tracker has not substituted old/default data. Retry the storage read before continuing."), /* @__PURE__ */ React.createElement(Btn, { onClick: () => setLoadAttempt((n) => n + 1) }, "Retry loading")) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif" } }, "Loading saved data\u2026"));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: COLORS.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", paddingBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 640, margin: "0 auto", padding: "20px 16px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Georgia, serif", fontSize: 26, color: COLORS.ink } }, "Kirsty"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft } }, fmtDate(today))), /* @__PURE__ */ React.createElement("div", { style: { height: 2, background: COLORS.gold, width: 40, marginBottom: 10, opacity: 0.6 } }), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14, fontSize: 12, fontWeight: 600, color: saveError ? COLORS.danger : savingCount > 0 ? COLORS.clay : COLORS.green, display: "flex", alignItems: "center", gap: 6 } }, saveError ? /* @__PURE__ */ React.createElement(React.Fragment, null, "\u26A0 A change still needs to be saved") : savingCount > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, '\u23F3 Saving \u2014 wait for "All changes saved" before closing') : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u2713 All changes saved")), saveError && /* @__PURE__ */ React.createElement("div", { style: { background: COLORS.danger, color: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600 } }, "\u26A0 A change didn't save \u2014 check your connection"), /* @__PURE__ */ React.createElement("button", { onClick: retryAllSaves, style: { background: "#fff", color: COLORS.danger, border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" } }, "Retry now")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", marginBottom: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: exportBackup, style: { background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: "5px 10px", fontSize: 11.5, color: COLORS.inkSoft, cursor: "pointer", fontFamily: "inherit" } }, "\u2B07 Export backup"), /* @__PURE__ */ React.createElement("label", { style: { background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 6, padding: "5px 10px", fontSize: 11.5, color: COLORS.inkSoft, cursor: "pointer", fontFamily: "inherit" } }, "\u2B06 Import backup", /* @__PURE__ */ React.createElement("input", { type: "file", accept: "application/json", style: { display: "none" }, onChange: (e) => {
      if (e.target.files[0]) importBackup(e.target.files[0]);
    } })), importMessage && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: COLORS.green } }, importMessage)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", borderBottom: `1px solid ${COLORS.line}`, marginBottom: 16, overflowX: "auto" } }, /* @__PURE__ */ React.createElement(TabButton, { active: tab === "today", onClick: () => setTab("today") }, "Glance"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "week", onClick: () => setTab("week") }, "Week"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "weight", onClick: () => setTab("weight") }, "Weight"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "fitness", onClick: () => setTab("fitness") }, "Fitness"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "skin", onClick: () => setTab("skin") }, "Skin"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "meals", onClick: () => setTab("meals") }, "Meals"), /* @__PURE__ */ React.createElement(TabButton, { active: tab === "todo", onClick: () => setTab("todo") }, "To-Do")), tab === "today" && /* @__PURE__ */ React.createElement(
      TodayTab,
      {
        today,
        viewDate,
        setViewDate,
        fitnessSettings,
        ziipSettings,
        todos,
        setTodos,
        weightLogs,
        meals,
        weeklyPool,
        todayPicks,
        setTodayPicks,
        poolDone,
        setPoolDone,
        setTab
      }
    ), tab === "week" && /* @__PURE__ */ React.createElement(
      WeekTab,
      {
        today,
        fitnessSettings,
        ziipSettings,
        todos,
        meals,
        setTab,
        setViewDate
      }
    ), tab === "weight" && /* @__PURE__ */ React.createElement(WeightTab, { logs: weightLogs, setLogs: setWeightLogs }), tab === "fitness" && /* @__PURE__ */ React.createElement(
      FitnessTab,
      {
        settings: fitnessSettings,
        setSettings: setFitnessSettings,
        logs: fitnessLogs,
        setLogs: setFitnessLogs,
        ironLogs,
        setIronLogs,
        ironEquipment,
        setIronEquipment,
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
        setPmDone
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
        setShoppingList
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
        today
      }
    )));
  }
  function TodayTab({ today, viewDate, setViewDate, fitnessSettings, ziipSettings, todos, setTodos, weightLogs, meals, weeklyPool, todayPicks, setTodayPicks, poolDone, setPoolDone, setTab }) {
    const isRetreatDay = RETREAT_DATES.includes(viewDate);
    const retreat = isRetreatDay ? RETREAT[viewDate] : null;
    const { ziipDayIdx, ziipToday } = computeZiipForDate(viewDate, ziipSettings);
    const { weekNum, block, regularSession } = computeFitnessForDate(viewDate, fitnessSettings);
    const appts = (todos || []).filter((t) => t.date === viewDate && (t.source === "calendar" || t.source === "retreat"));
    const otherTodos = (todos || []).filter((t) => t.date === viewDate && t.source !== "calendar" && t.source !== "retreat");
    const lastWeight = weightLogs.length ? weightLogs[weightLogs.length - 1] : null;
    const dow = dayOfWeekISO(viewDate);
    const schedule = WEEKLY_SKIN[dow];
    const mealEntry = meals[viewDate];
    const isToday = viewDate === today;
    const pickedIds = todayPicks[viewDate] || [];
    const pickedItems = weeklyPool.filter((p) => pickedIds.includes(p.id));
    const doneIds = poolDone[viewDate] || [];
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
    const shiftDay = (n) => {
      setViewDate(addDaysISO(viewDate, n));
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => shiftDay(-1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14.5, fontWeight: 700, color: COLORS.ink } }, isToday ? "Today" : fmtDate(viewDate)), !isToday && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: COLORS.inkSoft } }, fmtDate(viewDate)), !isToday && /* @__PURE__ */ React.createElement("button", { onClick: () => setViewDate(today), style: { background: "none", border: "none", color: COLORS.clay, fontSize: 11, cursor: "pointer", padding: 0 } }, "back to today")), /* @__PURE__ */ React.createElement("button", { onClick: () => shiftDay(1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u203A")), /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: isRetreatDay ? COLORS.claySoft : COLORS.card } }, retreat ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "RETREAT \u2014 ", retreat.theme), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 14, lineHeight: 1.6, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Yoga:"), " ", retreat.yoga), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Training:"), " ", retreat.training), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Treatment:"), " ", retreat.treatment), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontStyle: "italic", color: COLORS.clay } }, retreat.skinNote))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Pill, null, "Week ", weekNum, " \u2014 ", block.name), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 15, color: COLORS.ink } }, regularSession))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Appointments & events"), appts.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Nothing on the calendar.") : appts.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { fontSize: 14, padding: "5px 0", color: COLORS.ink } }, "\u2022 ", t.text))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Skin \u2014 ZIIP"), ziipToday && !ziipToday.rest ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink } }, "Day ", ziipDayIdx + 1, ": ", ziipToday.t.map(([n, m]) => `${n} (${m}min)`).join(" \xB7 ")) : ziipToday === null ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Outside the current 30-day plan.") : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Rest day")), /* @__PURE__ */ React.createElement(Card, { style: dow === 4 && !isRetreatDay ? { borderColor: COLORS.clay } : {} }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: schedule.label }, "Skin \u2014 actives ", dow === 4 && !isRetreatDay && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), isRetreatDay ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Recovery week \u2014 hydrating only, no actives.") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("b", null, "AM:"), " ", getActivesSummary(schedule).amActives || "standard routine"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink, marginTop: 3 } }, /* @__PURE__ */ React.createElement("b", null, "PM:"), " ", getActivesSummary(schedule).pmActives || "standard routine")), isToday && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("skin"), style: { background: "none", border: "none", color: COLORS.green, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 } }, "Open full skin checklist \u2192"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Meals"), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.7, color: COLORS.ink } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Breakfast:"), " ", RETREAT_CONSTANTS.breakfast), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Lunch:"), " ", retreat.lunch), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Dinner:"), " ", retreat.dinner)) : mealEntry && (mealEntry.breakfast || mealEntry.lunch || mealEntry.dinner) ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, lineHeight: 1.7, color: COLORS.ink } }, mealEntry.breakfast && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Breakfast:"), " ", mealEntry.breakfast), mealEntry.lunch && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Lunch:"), " ", mealEntry.lunch), mealEntry.dinner && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "Dinner:"), " ", mealEntry.dinner)) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Nothing planned yet \u2014 add it in the Meals tab.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Tick weekly-pool items as you finish them, add anything one-off for this day, or pick more from the pool in the To-Do tab." }, isToday ? "Today's to-do list" : `To-do \u2014 ${fmtDate(viewDate)}`), pickedItems.length === 0 && otherTodos.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft, marginBottom: 8 } }, "Nothing on the list for this day yet.") : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, pickedItems.map((t) => {
      const done = doneIds.includes(t.id);
      return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: done, onChange: () => togglePoolDoneToday(t.id), style: { accentColor: COLORS.clay, width: 16, height: 16, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: done ? COLORS.inkSoft : COLORS.ink, textDecoration: done ? "line-through" : "none" } }, t.text), /* @__PURE__ */ React.createElement("button", { onClick: () => unpickToday(t.id), title: "Remove from today's list (stays in the pool)", style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 11 } }, "remove"));
    }), otherTodos.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: !!t.done, onChange: () => toggleTodoDone(t.id), style: { accentColor: COLORS.clay, width: 16, height: 16, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: t.done ? COLORS.inkSoft : COLORS.ink, textDecoration: t.done ? "line-through" : "none" } }, t.text), /* @__PURE__ */ React.createElement("button", { onClick: () => removeQuickTask(t.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(
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
    ), /* @__PURE__ */ React.createElement(Btn, { onClick: addQuickTask }, "Add")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setTab("todo"), style: { background: "none", border: "none", color: COLORS.green, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 } }, "Pick more from the weekly pool \u2192"))), isToday && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Weight"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink } }, lastWeight ? `Last logged: ${lastWeight.weight}kg on ${fmtDate(lastWeight.date)}` : "No entries yet."), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginTop: 3 } }, "Goal: 57kg")));
  }
  function WeekTab({ today, fitnessSettings, ziipSettings, todos, meals, setTab, setViewDate }) {
    const [weekStart, setWeekStart] = useState(mondayOfWeekISO(today));
    const days = Array.from({ length: 7 }, (_, i) => addDaysISO(weekStart, i));
    const shiftWeek = (n) => {
      setWeekStart(addDaysISO(weekStart, n * 7));
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => shiftWeek(-1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: COLORS.ink } }, fmtDate(days[0]), " \u2013 ", fmtDate(days[6])), /* @__PURE__ */ React.createElement("button", { onClick: () => shiftWeek(1), style: { background: "none", border: "none", color: COLORS.green, fontSize: 18, cursor: "pointer", padding: "4px 8px" } }, "\u203A")), weekStart !== mondayOfWeekISO(today) && /* @__PURE__ */ React.createElement("button", { onClick: () => setWeekStart(mondayOfWeekISO(today)), style: { background: "none", border: "none", color: COLORS.clay, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 10 } }, "back to this week"), days.map((d) => {
      const isRetreatDay = RETREAT_DATES.includes(d);
      const retreat = isRetreatDay ? RETREAT[d] : null;
      const { ziipDayIdx, ziipToday } = computeZiipForDate(d, ziipSettings);
      const { regularSession } = computeFitnessForDate(d, fitnessSettings);
      const appts = (todos || []).filter((t) => t.date === d && (t.source === "calendar" || t.source === "retreat"));
      const mealEntry = meals[d];
      const isToday = d === today;
      const dow = dayOfWeekISO(d);
      const schedule = WEEKLY_SKIN[dow];
      const { amActives, pmActives } = getActivesSummary(schedule);
      const isExfoliationNight = dow === 4 && !isRetreatDay;
      return /* @__PURE__ */ React.createElement(
        Card,
        {
          key: d,
          style: { borderColor: isToday ? COLORS.green : isExfoliationNight ? COLORS.clay : COLORS.line, cursor: "pointer" }
        },
        /* @__PURE__ */ React.createElement("div", { onClick: () => {
          setViewDate(d);
          setTab("today");
        } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14.5, fontWeight: 700, color: isToday ? COLORS.green : COLORS.ink } }, fmtDate(d)), isRetreatDay && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, retreat.theme), !isRetreatDay && isExfoliationNight && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.ink, marginTop: 4 } }, isRetreatDay ? retreat.training : regularSession), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, ziipToday && !ziipToday.rest ? `ZIIP: ${ziipToday.t.map(([n]) => n).join(", ")}` : "ZIIP: rest"), !isRetreatDay && (amActives || pmActives) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: isExfoliationNight ? COLORS.clay : COLORS.inkSoft, marginTop: 3, fontWeight: isExfoliationNight ? 700 : 400 } }, "Actives \u2014 ", [amActives && `AM: ${amActives}`, pmActives && `PM: ${pmActives}`].filter(Boolean).join(" \xB7 ")), appts.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.clay, marginTop: 3 } }, appts.map((a) => a.text).join(" \xB7 ")), mealEntry && mealEntry.dinner && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, "Dinner: ", mealEntry.dinner), isRetreatDay && !mealEntry && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: COLORS.inkSoft, marginTop: 3 } }, "Dinner: ", retreat.dinner))
      );
    }));
  }
  function WeightTab({ logs, setLogs }) {
    const [weight, setWeight] = useState("");
    const [bodyFat, setBodyFat] = useState("");
    const [muscleMass, setMuscleMass] = useState("");
    const [date, setDate] = useState(todayISO());
    const [showFull, setShowFull] = useState(false);
    const [fullValues, setFullValues] = useState({});
    const [openDetail, setOpenDetail] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState("");
    const [scanPreview, setScanPreview] = useState(null);
    const setFullField = (key, val) => setFullValues({ ...fullValues, [key]: val });
    const RENPHO_PDF_LABELS = [
      { key: "weight", re: /Weight\s*\(?kg\)?\D{0,10}([\d.]+)/i },
      { key: "bodyFatMass", re: /Body\s*Fat\s*Mass\D{0,10}([\d.]+)/i },
      { key: "boneMass", re: /Bone\s*Mass\D{0,10}([\d.]+)/i },
      { key: "proteinMass", re: /Protein\s*Mass\D{0,10}([\d.]+)/i },
      { key: "waterMass", re: /Body\s*Water\s*Mass\D{0,10}([\d.]+)/i },
      { key: "muscleMass", re: /(?<!Skeletal\s)Muscle\s*Mass\D{0,10}([\d.]+)/i },
      { key: "skeletalMuscleMass", re: /Skeletal\s*Muscle\s*Mass\D{0,10}([\d.]+)/i },
      { key: "bmi", re: /BMI\D{0,6}([\d.]+)/i },
      { key: "bodyFat", re: /Body\s*Fat\s*Percentage\D{0,10}([\d.]+)/i },
      { key: "visceralFat", re: /Visceral\s*Fat\D{0,6}([\d.]+)/i },
      { key: "bmr", re: /BMR\D{0,6}([\d.]+)/i },
      { key: "fatFreeMass", re: /Fat-?Free\s*Mass\D{0,10}([\d.]+)/i },
      { key: "subcutaneousFatPct", re: /Subcutaneous\s*Fat\D{0,10}([\d.]+)/i },
      { key: "smi", re: /\bSMI\b\D{0,10}([\d.]+)/i },
      { key: "metabolicAge", re: /Metabolic\s*Age\D{0,6}([\d.]+)/i },
      { key: "whr", re: /(?:WHR|Waist-to-Hip Ratio)\D{0,10}([\d.]+)/i }
    ];
    const DATE_RE = /Test\s*Date\s*:?\s*(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})/i;
    const MONTHS = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
    const scanPdf = async (file) => {
      setScanning(true);
      setScanError("");
      setScanPreview(null);
      try {
        const buf = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((it) => it.str).join(" ") + "\n";
        }
        const found = {};
        for (const f of RENPHO_PDF_LABELS) {
          const m = text.match(f.re);
          if (m) found[f.key] = m[1];
        }
        let parsedDate = todayISO();
        const dm = text.match(DATE_RE);
        if (dm) {
          const mon = MONTHS[dm[2].slice(0, 3).toLowerCase()];
          if (mon) parsedDate = `${dm[3]}-${mon}-${dm[1].padStart(2, "0")}`;
        }
        if (!found.weight) {
          setScanError("Couldn't find a weight value in this PDF \u2014 it may not match the expected RENPHO report layout. You can still enter values manually below.");
        } else {
          setScanPreview({ date: parsedDate, ...found });
        }
      } catch (e) {
        setScanError("Couldn't read this PDF: " + (e && e.message ? e.message : String(e)));
      } finally {
        setScanning(false);
      }
    };
    const confirmScan = () => {
      if (!scanPreview) return;
      const entry = { date: scanPreview.date, weight: parseFloat(scanPreview.weight) };
      if (scanPreview.bodyFat) entry.bodyFat = parseFloat(scanPreview.bodyFat);
      if (scanPreview.muscleMass) entry.muscleMass = parseFloat(scanPreview.muscleMass);
      RENPHO_FIELDS.forEach((f) => {
        if (scanPreview[f.key]) entry[f.key] = parseFloat(scanPreview[f.key]);
      });
      const next = [...logs.filter((l) => l.date !== entry.date), entry].sort((a, b) => a.date.localeCompare(b.date));
      setLogs(next);
      setScanPreview(null);
    };
    const add = () => {
      if (!weight) return;
      const entry = { date, weight: parseFloat(weight) };
      if (bodyFat) entry.bodyFat = parseFloat(bodyFat);
      if (muscleMass) entry.muscleMass = parseFloat(muscleMass);
      RENPHO_FIELDS.forEach((f) => {
        if (fullValues[f.key]) entry[f.key] = parseFloat(fullValues[f.key]);
      });
      const next = [...logs.filter((l) => l.date !== date), entry].sort((a, b) => a.date.localeCompare(b.date));
      setLogs(next);
      setWeight("");
      setBodyFat("");
      setMuscleMass("");
      setFullValues({});
    };
    const remove = (d) => setLogs(logs.filter((l) => l.date !== d));
    const chartData = logs.map((l) => ({ date: l.date.slice(5), weight: l.weight }));
    const current = logs.length ? logs[logs.length - 1].weight : null;
    const progress = current ? Math.max(0, Math.min(100, (72 - current) / (72 - 57) * 100)) : 0;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "72kg \u2192 57kg goal" }, "Progress"), /* @__PURE__ */ React.createElement("div", { style: { height: 8, background: COLORS.line, borderRadius: 4, overflow: "hidden", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${progress}%`, background: COLORS.green } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft } }, current ? `${current}kg current \xB7 ${(current - 57).toFixed(1)}kg to go` : "Log a weight to see progress")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Upload the PDF report RENPHO generates after a weigh-in. It's read on your device only \u2014 nothing is uploaded anywhere else \u2014 and you'll get a chance to check the numbers before anything saves." }, "Scan a RENPHO report"), /* @__PURE__ */ React.createElement("label", { style: { display: "inline-block", background: COLORS.green, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" } }, scanning ? "Reading PDF\u2026" : "Choose RENPHO PDF", /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "file",
        accept: "application/pdf",
        style: { display: "none" },
        disabled: scanning,
        onChange: (e) => {
          if (e.target.files[0]) scanPdf(e.target.files[0]);
        }
      }
    )), scanError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, color: COLORS.danger } }, scanError), scanPreview && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, padding: 12, background: COLORS.greenSoft, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, marginBottom: 8 } }, "Check these before saving \u2014 ", fmtDate(scanPreview.date)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12.5, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", null, "Weight: ", /* @__PURE__ */ React.createElement("b", null, scanPreview.weight, "kg")), scanPreview.bodyFat && /* @__PURE__ */ React.createElement("div", null, "Body fat: ", /* @__PURE__ */ React.createElement("b", null, scanPreview.bodyFat, "%")), RENPHO_FIELDS.filter((f) => scanPreview[f.key]).map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key }, f.label, ": ", /* @__PURE__ */ React.createElement("b", null, scanPreview[f.key], f.unit)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: confirmScan }, "Looks right \u2014 save it"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => setScanPreview(null) }, "Discard")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Body fat % and muscle mass are quick fields \u2014 tap below for the full RENPHO breakdown when you've got a scale reading." }, "Log entry"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "kg", value: weight, onChange: (e) => setWeight(e.target.value), style: { width: 80 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "body fat %", value: bodyFat, onChange: (e) => setBodyFat(e.target.value), style: { width: 100 } }), /* @__PURE__ */ React.createElement(Input, { type: "number", step: "0.1", placeholder: "muscle mass kg", value: muscleMass, onChange: (e) => setMuscleMass(e.target.value), style: { width: 120 } })), /* @__PURE__ */ React.createElement("button", { onClick: () => setShowFull(!showFull), style: { background: "none", border: "none", color: COLORS.green, fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: showFull ? 10 : 0 } }, showFull ? "\u2212 hide full RENPHO fields" : "+ add full RENPHO reading"), showFull && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10, padding: "10px", background: COLORS.greenSoft, borderRadius: 8 } }, RENPHO_FIELDS.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { width: "31%", minWidth: 96 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: COLORS.inkSoft, marginBottom: 2 } }, f.label, f.unit ? ` (${f.unit})` : ""), /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "number",
        step: "0.1",
        value: fullValues[f.key] || "",
        onChange: (e) => setFullField(f.key, e.target.value),
        style: { width: "100%", padding: "6px 8px", fontSize: 12.5 }
      }
    )))), /* @__PURE__ */ React.createElement(Btn, { onClick: add }, "Add")), chartData.length > 1 && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Trend"), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: 200 } }, /* @__PURE__ */ React.createElement(ResponsiveContainer, null, /* @__PURE__ */ React.createElement(LineChart, { data: chartData }, /* @__PURE__ */ React.createElement(CartesianGrid, { stroke: COLORS.line }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "date", fontSize: 11, stroke: COLORS.inkSoft }), /* @__PURE__ */ React.createElement(YAxis, { fontSize: 11, stroke: COLORS.inkSoft, domain: ["dataMin - 1", "dataMax + 1"] }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(ReferenceLine, { y: 57, stroke: COLORS.gold, strokeDasharray: "4 4" }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "weight", stroke: COLORS.green, strokeWidth: 2, dot: { r: 3 } }))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "History"), [...logs].reverse().map((l) => {
      const extraKeys = RENPHO_FIELDS.filter((f) => l[f.key] !== void 0);
      const detailOpen = openDetail === l.date;
      return /* @__PURE__ */ React.createElement("div", { key: l.date, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13.5 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", null, fmtDate(l.date)), /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 10, alignItems: "center" } }, l.weight, "kg", /* @__PURE__ */ React.createElement("button", { onClick: () => remove(l.date), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "remove"))), (l.bodyFat || l.muscleMass) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 } }, l.bodyFat ? `${l.bodyFat}% body fat` : "", l.bodyFat && l.muscleMass ? " \xB7 " : "", l.muscleMass ? `${l.muscleMass}kg muscle mass` : ""), extraKeys.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenDetail(detailOpen ? null : l.date), style: { background: "none", border: "none", color: COLORS.green, fontSize: 11, cursor: "pointer", padding: 0, marginTop: 3 } }, detailOpen ? "hide full reading" : "full RENPHO reading \u2192"), detailOpen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 5, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}`, display: "flex", flexWrap: "wrap", gap: "2px 14px" } }, extraKeys.map((f) => /* @__PURE__ */ React.createElement("div", { key: f.key, style: { fontSize: 11.5, color: COLORS.inkSoft } }, f.label, ": ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.ink } }, l[f.key], f.unit))))));
    })));
  }
  function FitnessTab({ settings, setSettings, logs, setLogs, ironLogs, setIronLogs, ironEquipment, setIronEquipment, today, isRetreatDay, regularSession, block, blockIdx, weekNum, dayInBlock }) {
    const [note, setNote] = useState("");
    const [ironDay, setIronDay] = useState(1);
    const [openHistory, setOpenHistory] = useState(null);
    const retreat = isRetreatDay ? RETREAT[today] : null;
    const sessionLabel = retreat ? retreat.training : regularSession;
    const isIronSession = /iron/i.test(sessionLabel);
    const logToday = () => {
      const next = [...logs.filter((l) => l.date !== today), { date: today, session: sessionLabel, note }];
      setLogs(next.sort((a, b) => a.date.localeCompare(b.date)));
      setNote("");
    };
    const doneToday = logs.some((l) => l.date === today);
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
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Today's session"), /* @__PURE__ */ React.createElement(Pill, null, retreat ? "Retreat override" : `${block.name} \xB7 Week ${weekNum}`), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 15, color: COLORS.ink } }, sessionLabel), !doneToday ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Notes (how it felt overall)", value: note, onChange: (e) => setNote(e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Btn, { onClick: logToday }, "Log done")) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 13, color: COLORS.green } }, "\u2713 Logged for today")), isIronSession && /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Weeks 1\u20134 exercise reference \u2014 pick the Iron day this session matches. Weeks 5\u20136 can be added once you have that data." }, "Iron Series exercises"), /* @__PURE__ */ React.createElement(Select, { value: ironDay, onChange: (e) => setIronDay(parseInt(e.target.value)), style: { marginBottom: 10 } }, Object.entries(IRON_DAYS).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, "Day ", k, " \u2014 ", v.title))), ironData.exercises.map((ex, i) => {
      const isTuple = Array.isArray(ex);
      const name = isTuple ? ex[0] : ex;
      const sheetEquip = isTuple ? ex[1] : "";
      const start = isTuple ? ex[2] : "";
      const last = lastEntryFor(name);
      const todayEntry = (ironLogs[name] || []).find((h) => h.date === today);
      const hist = ironLogs[name] || [];
      const historyOpen = openHistory === name;
      const equipValue = ironEquipment[name] !== void 0 ? ironEquipment[name] : equipDefault(sheetEquip);
      return /* @__PURE__ */ React.createElement("div", { key: ironDay + "-" + i, style: { padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: COLORS.ink } }, name), start && /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, "start: ", start)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 5, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
        Input,
        {
          id: "w-" + i + "-" + ironDay,
          placeholder: "weight",
          defaultValue: todayEntry ? todayEntry.weight : "",
          onBlur: (e) => saveExercise(name, e.target.value),
          style: { width: 80, padding: "6px 8px", fontSize: 13 }
        }
      ), /* @__PURE__ */ React.createElement(Select, { value: equipValue, onChange: (e) => setEquip(name, e.target.value), style: { padding: "6px 8px", fontSize: 12.5 } }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Equipment"), /* @__PURE__ */ React.createElement("option", { value: "Dumbbell" }, "Dumbbell"), /* @__PURE__ */ React.createElement("option", { value: "Barbell" }, "Barbell"), /* @__PURE__ */ React.createElement("option", { value: "Bodyweight" }, "Bodyweight"), /* @__PURE__ */ React.createElement("option", { value: "Band" }, "Band"), /* @__PURE__ */ React.createElement("option", { value: "Kettlebell" }, "Kettlebell")), last && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: COLORS.inkSoft } }, "last: ", last.weight, " (", fmtDate(last.date), ")"), hist.length > 0 && /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenHistory(historyOpen ? null : name), style: { background: "none", border: "none", color: COLORS.green, fontSize: 11, cursor: "pointer", marginLeft: "auto", padding: 0 } }, historyOpen ? "hide" : `history (${hist.length})`)), historyOpen && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}` } }, [...hist].reverse().map((h, hi) => /* @__PURE__ */ React.createElement("div", { key: hi, style: { fontSize: 11.5, color: COLORS.inkSoft, padding: "2px 0" } }, fmtDate(h.date), ": ", h.weight))));
    })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Block settings"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft, marginBottom: 6 } }, "Block 1 start date (used to calculate week/day)"), /* @__PURE__ */ React.createElement(Input, { type: "date", value: settings.startDate, onChange: (e) => setSettings({ ...settings, startDate: e.target.value }) })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, block.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginBottom: 8 } }, block.weeks), block.days.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, width: 18 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { color: i === dayInBlock && !isRetreatDay ? COLORS.green : COLORS.ink, fontWeight: i === dayInBlock && !isRetreatDay ? 700 : 400 } }, d)))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Recent history"), [...logs].reverse().slice(0, 10).map((l) => /* @__PURE__ */ React.createElement("div", { key: l.date, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, fmtDate(l.date)), /* @__PURE__ */ React.createElement("div", null, l.session), l.note && /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 12 } }, l.note)))));
  }
  function SkinTab({ today, isRetreatDay, ziipSettings, setZiipSettings, ziipToday, ziipDayIdx, ziipDone, setZiipDone, amDone, setAmDone, pmDone, setPmDone }) {
    const retreat = isRetreatDay ? RETREAT[today] : null;
    const dow = dayOfWeekISO(today);
    const schedule = WEEKLY_SKIN[dow];
    const isExfoliationNight = dow === 4;
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
    return /* @__PURE__ */ React.createElement("div", null, retreat && /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold, background: COLORS.claySoft } }, /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Post-sun recovery week"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 13.5, color: COLORS.ink } }, retreat.skinNote), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: 12.5, color: COLORS.clay } }, "No at-home actives (retinol/exfoliants/Vit C) this week \u2014 hydrating serum + moisturiser AM and PM is enough. Normal weekly rotation resumes after.")), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: `Day ${ziipDayIdx + 1} of 30` }, "ZIIP Halo \u2014 Tone Reset"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "Plan start date: "), /* @__PURE__ */ React.createElement(Input, { type: "date", value: ziipSettings.startDate, onChange: (e) => setZiipSettings({ startDate: e.target.value }), style: { marginLeft: 4 } })), !ziipToday ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "30-day plan complete \u2014 update the start date to begin a new cycle.") : ziipToday.rest ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.inkSoft } }, "Rest day \u2014 no treatments.") : ziipToday.t.map(([name, mins]) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: name,
        checked: !!(ziipDone[today] || {})[name],
        onChange: () => toggleZiip(name),
        label: name,
        sub: `${mins} min`
      }
    ))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: schedule.label }, "AM Routine"), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Recovery week: cleanse \xB7 hydrating serum \xB7 moisturiser \xB7 eye cream. No Vit C / actives.") : schedule.am.map((step) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: step.id,
        checked: !!(amDone[today] || {})[step.id],
        onChange: () => toggleAm(step.id),
        label: step.label,
        sub: step.options.join(" \xB7 ")
      }
    ))), /* @__PURE__ */ React.createElement(Card, { style: isExfoliationNight && !retreat ? { borderColor: COLORS.clay } : {} }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: schedule.label }, "PM Routine ", isExfoliationNight && !retreat && /* @__PURE__ */ React.createElement(Pill, { tone: "clay" }, "Exfoliation night")), retreat ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft } }, "Recovery week: cleanse \xB7 hydrating serum \xB7 barrier balm if needed \xB7 moisturiser \xB7 eye cream. No retinoid/exfoliant/Vit C.") : schedule.pm.map((step) => /* @__PURE__ */ React.createElement(
      Check,
      {
        key: step.id,
        checked: !!(pmDone[today] || {})[step.id],
        onChange: () => togglePm(step.id),
        label: step.label,
        sub: step.options.join(" \xB7 ")
      }
    ))));
  }
  function ingredientKey(name, unit) {
    return `${name.trim().toLowerCase()}||${(unit || "").trim().toLowerCase()}`;
  }
  function MealsTab({ today, meals, setMeals, recipes, setRecipes, shoppingList, setShoppingList }) {
    const [day, setDay] = useState(today);
    const retreat = RETREAT_DATES.includes(day) ? RETREAT[day] : null;
    const entry = meals[day] || { breakfast: "", breakfastRecipeId: null, lunch: "", lunchRecipeId: null, dinner: "", dinnerRecipeId: null, notes: "" };
    const update = (field, val) => {
      setMeals({ ...meals, [day]: { ...entry, [field]: val } });
    };
    const pickRecipeForSlot = (slot, recipeIdField, e) => {
      const val = e.target.value;
      if (val === "__custom__") {
        setMeals({ ...meals, [day]: { ...entry, [slot]: "", [recipeIdField]: null } });
      } else {
        const r = recipes.find((r2) => r2.id === val);
        setMeals({ ...meals, [day]: { ...entry, [slot]: r ? r.name : "", [recipeIdField]: val } });
      }
    };
    const [showAddRecipe, setShowAddRecipe] = useState(false);
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newServings, setNewServings] = useState("");
    const [newIngredients, setNewIngredients] = useState([{ name: "", qty: "", unit: "" }]);
    const [newInstructions, setNewInstructions] = useState("");
    const [pasteText, setPasteText] = useState("");
    const [openRecipeId, setOpenRecipeId] = useState(null);
    const [editRecipeId, setEditRecipeId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editServings, setEditServings] = useState("");
    const [editIngredients, setEditIngredients] = useState([]);
    const [editInstructions, setEditInstructions] = useState("");
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
      setRecipes([...recipes, { id: "recipe-" + Date.now(), name: newRecipeName, servings: newServings ? parseFloat(newServings) : null, ingredients, instructions: newInstructions }]);
      setNewRecipeName("");
      setNewServings("");
      setNewIngredients([{ name: "", qty: "", unit: "" }]);
      setNewInstructions("");
      setShowAddRecipe(false);
    };
    const startEditRecipe = (r) => {
      setEditRecipeId(r.id);
      setEditName(r.name);
      setEditServings(r.servings != null ? String(r.servings) : "");
      setEditIngredients(r.ingredients.length ? r.ingredients.map((ing) => ({ name: ing.name, qty: String(ing.qty), unit: ing.unit || "" })) : [{ name: "", qty: "", unit: "" }]);
      setEditInstructions(r.instructions || "");
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
      setRecipes(recipes.map((r) => r.id === editRecipeId ? { ...r, name: editName, servings: editServings ? parseFloat(editServings) : null, ingredients, instructions: editInstructions } : r));
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
    const [rangeStart, setRangeStart] = useState(today);
    const [rangeDays, setRangeDays] = useState(7);
    const generateShoppingList = () => {
      const dates = Array.from({ length: Math.max(1, parseInt(rangeDays) || 1) }, (_, i) => addDaysISO(rangeStart, i));
      const aggregated = {};
      const unmatched = [];
      dates.forEach((d) => {
        const dayRetreat = RETREAT_DATES.includes(d) ? RETREAT[d] : null;
        const dayEntry = meals[d];
        ["breakfast", "lunch", "dinner"].forEach((slot) => {
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
      { slot: "breakfast", idField: "breakfastRecipeId", label: "Breakfast" },
      { slot: "lunch", idField: "lunchRecipeId", label: "Lunch" },
      { slot: "dinner", idField: "dinnerRecipeId", label: "Dinner" }
    ].map(({ slot, idField, label }) => /* @__PURE__ */ React.createElement("div", { key: slot, style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 3 } }, label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Select, { value: entry[idField] || "__custom__", onChange: (e) => pickRecipeForSlot(slot, idField, e), style: { minWidth: 140 } }, /* @__PURE__ */ React.createElement("option", { value: "__custom__" }, "Custom / type below"), recipes.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.id, value: r.id }, r.name))), !entry[idField] && /* @__PURE__ */ React.createElement(Input, { placeholder: label, value: entry[slot], onChange: (e) => update(slot, e.target.value), style: { flex: 1, minWidth: 120 } })))), /* @__PURE__ */ React.createElement(Input, { placeholder: "Notes", value: entry.notes, onChange: (e) => update("notes", e.target.value), style: { marginTop: 4 } })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Add manually, or paste a recipe as: name on the first line, then one ingredient per line like '2 cup flour', then instructions." }, "Recipe library"), recipes.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.inkSoft, marginBottom: 10 } }, "No recipes yet.") : recipes.map((r) => {
      const open = openRecipeId === r.id;
      const editing = editRecipeId === r.id;
      return /* @__PURE__ */ React.createElement("div", { key: r.id, style: { padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setOpenRecipeId(open ? null : r.id), style: { background: "none", border: "none", color: COLORS.ink, fontWeight: 600, fontSize: 14, cursor: "pointer", padding: 0, textAlign: "left" } }, r.name, " ", /* @__PURE__ */ React.createElement("span", { style: { color: COLORS.inkSoft, fontWeight: 400, fontSize: 12 } }, "(", r.ingredients.length, " ingredients", r.servings ? `, makes ${r.servings} serving${r.servings === 1 ? "" : "s"}` : "", ")")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => editing ? cancelEditRecipe() : startEditRecipe(r), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, editing ? "cancel" : "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => removeRecipe(r.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), open && editing && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, padding: 10, background: COLORS.greenSoft, borderRadius: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Recipe name", value: editName, onChange: (e) => setEditName(e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "Servings", value: editServings, onChange: (e) => setEditServings(e.target.value), style: { width: 90 } })), editIngredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 6, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "qty", value: ing.qty, onChange: (e) => updateEditIngredientRow(i, "qty", e.target.value), style: { width: 55 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "unit", value: ing.unit, onChange: (e) => updateEditIngredientRow(i, "unit", e.target.value), style: { width: 65 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "ingredient", value: ing.name, onChange: (e) => updateEditIngredientRow(i, "name", e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => removeEditIngredientRow(i), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), /* @__PURE__ */ React.createElement("button", { onClick: addEditIngredientRow, style: { background: "none", border: "none", color: COLORS.green, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 } }, "+ add ingredient"), /* @__PURE__ */ React.createElement(Input, { placeholder: "Instructions (optional)", value: editInstructions, onChange: (e) => setEditInstructions(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: saveEditRecipe }, "Save changes"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: cancelEditRecipe }, "Cancel"))), open && !editing && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, paddingLeft: 8, borderLeft: `2px solid ${COLORS.line}` } }, r.ingredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12.5, color: COLORS.ink } }, ing.qty, " ", ing.unit, " ", ing.name)), r.instructions && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: COLORS.inkSoft, marginTop: 6 } }, r.instructions)));
    }), !showAddRecipe ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setShowAddRecipe(true), style: { background: "none", border: "none", color: COLORS.green, fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0 } }, "+ add recipe manually")) : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, padding: 10, background: COLORS.greenSoft, borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Recipe name", value: newRecipeName, onChange: (e) => setNewRecipeName(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "Servings (optional)", value: newServings, onChange: (e) => setNewServings(e.target.value), style: { width: 140, marginBottom: 8 } }), newIngredients.map((ing, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 6, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "qty", value: ing.qty, onChange: (e) => updateIngredientRow(i, "qty", e.target.value), style: { width: 55 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "unit", value: ing.unit, onChange: (e) => updateIngredientRow(i, "unit", e.target.value), style: { width: 65 } }), /* @__PURE__ */ React.createElement(Input, { placeholder: "ingredient", value: ing.name, onChange: (e) => updateIngredientRow(i, "name", e.target.value), style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => removeIngredientRow(i), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"))), /* @__PURE__ */ React.createElement("button", { onClick: addIngredientRow, style: { background: "none", border: "none", color: COLORS.green, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 } }, "+ add ingredient"), /* @__PURE__ */ React.createElement(Input, { placeholder: "Instructions (optional)", value: newInstructions, onChange: (e) => setNewInstructions(e.target.value), style: { width: "100%", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement(Btn, { onClick: saveNewRecipe }, "Save recipe"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: () => setShowAddRecipe(false) }, "Cancel"))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 4 } }, "Or paste a recipe to parse automatically"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        value: pasteText,
        onChange: (e) => setPasteText(e.target.value),
        placeholder: "Mushroom Risotto\n1 cup arborio rice\n250 g mixed mushrooms\nSaut\xE9 mushrooms, add rice, stock gradually...",
        style: { width: "100%", minHeight: 90, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: 8, fontSize: 13, fontFamily: "inherit", marginBottom: 8 }
      }
    ), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: parsePastedRecipe }, "Parse & add"))), /* @__PURE__ */ React.createElement(Card, { style: { borderColor: COLORS.gold } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Aggregates ingredients from every recipe-linked meal in the range. Meals without a linked recipe show up as a reminder list underneath instead." }, "Shopping list"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: rangeStart, onChange: (e) => setRangeStart(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { type: "number", min: "1", max: "30", value: rangeDays, onChange: (e) => setRangeDays(e.target.value), style: { width: 70 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: COLORS.inkSoft } }, "days"), /* @__PURE__ */ React.createElement(Btn, { tone: "clay", onClick: generateShoppingList, style: { background: COLORS.clay } }, "Generate")), shoppingList && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 8 } }, shoppingList.range), shoppingList.items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft } }, "No recipe-linked meals in this range yet.") : shoppingList.items.map((i) => /* @__PURE__ */ React.createElement("div", { key: i.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${COLORS.line}` } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: i.done, onChange: () => toggleShoppingItem(i.id), style: { accentColor: COLORS.green, width: 15, height: 15 } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: COLORS.ink, textDecoration: i.done ? "line-through" : "none", opacity: i.done ? 0.5 : 1 } }, i.qty, " ", i.unit, " ", i.name))), shoppingList.unmatched && shoppingList.unmatched.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: COLORS.clay, marginBottom: 4 } }, "Not itemised (no recipe linked) \u2014 plan for these separately:"), shoppingList.unmatched.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { fontSize: 12, color: COLORS.inkSoft, padding: "2px 0" } }, u))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Logged days"), Object.keys(meals).sort().reverse().slice(0, 10).map((d) => /* @__PURE__ */ React.createElement("div", { key: d, style: { padding: "6px 0", borderBottom: `1px solid ${COLORS.line}`, fontSize: 13 } }, /* @__PURE__ */ React.createElement("div", { style: { color: COLORS.inkSoft, fontSize: 11.5 } }, fmtDate(d)), /* @__PURE__ */ React.createElement("div", null, [meals[d].breakfast, meals[d].lunch, meals[d].dinner].filter(Boolean).join(" \xB7 "))))));
  }
  function TodoTab({ todos, setTodos, weeklyPool, setWeeklyPool, todayPicks, setTodayPicks, dismissedIds, setDismissedIds, today }) {
    const [text, setText] = useState("");
    const [date, setDate] = useState(todayISO());
    const [poolText, setPoolText] = useState("");
    const [poolCategory, setPoolCategory] = useState("sewing");
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editTodoText, setEditTodoText] = useState("");
    const [editingPoolId, setEditingPoolId] = useState(null);
    const [editPoolText, setEditPoolText] = useState("");
    if (!todos) return null;
    const dismiss = (id) => {
      if (!dismissedIds.includes(id)) setDismissedIds([...dismissedIds, id]);
    };
    const add = () => {
      if (!text) return;
      setTodos([...todos, { id: "t-" + Date.now(), date, text, source: "manual", done: false }]);
      setText("");
    };
    const toggle = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
    const remove = (id) => {
      setTodos(todos.filter((t) => t.id !== id));
      dismiss(id);
    };
    const startEditTodo = (t) => {
      setEditingTodoId(t.id);
      setEditTodoText(t.text);
    };
    const saveEditTodo = (id) => {
      if (editTodoText.trim()) setTodos(todos.map((t) => t.id === id ? { ...t, text: editTodoText.trim() } : t));
      setEditingTodoId(null);
    };
    const upcoming = [...todos].sort((a, b) => a.date.localeCompare(b.date));
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
    const picksToday = todayPicks[today] || [];
    const togglePick = (id) => {
      const cur = todayPicks[today] || [];
      const next = cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id];
      setTodayPicks({ ...todayPicks, [today]: next });
    };
    const renderPoolGroup = (items) => items.map((p) => {
      const editing = editingPoolId === p.id;
      return /* @__PURE__ */ React.createElement("div", { key: p.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${COLORS.line}`, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: picksToday.includes(p.id), onChange: () => togglePick(p.id), style: { accentColor: COLORS.clay, width: 16, height: 16 } }), editing ? /* @__PURE__ */ React.createElement(
        Input,
        {
          value: editPoolText,
          onChange: (e) => setEditPoolText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEditPool(p.id);
            if (e.key === "Escape") setEditingPoolId(null);
          },
          autoFocus: true,
          style: { flex: 1, minWidth: 100, fontSize: 14 }
        }
      ) : /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: COLORS.ink, minWidth: 100 } }, p.text), /* @__PURE__ */ React.createElement(Select, { value: categoryOf(p), onChange: (e) => moveItem(p.id, e.target.value), style: { fontSize: 11.5, padding: "3px 6px" } }, POOL_CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.key, value: c.key }, c.label))), editing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => saveEditPool(p.id), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingPoolId(null), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 12 } }, "cancel")) : /* @__PURE__ */ React.createElement("button", { onClick: () => startEditPool(p), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => removePoolItem(p.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"));
    });
    const [syncMessage, setSyncMessage] = useState("");
    const syncCalendar = () => {
      const freshCalendar = CALENDAR_SEED.map((c, i) => ({ id: "cal-" + i, date: c.date, text: c.text, source: c.source, done: false })).filter((c) => !dismissedIds.includes(c.id));
      const withDonePreserved = freshCalendar.map((f) => {
        const prior = todos.find((t) => t.date === f.date && t.text === f.text);
        return prior ? { ...f, done: prior.done } : f;
      });
      const nonCalendarTodos = todos.filter((t) => t.source !== "calendar" && t.source !== "retreat");
      setTodos([...nonCalendarTodos, ...withDonePreserved]);
      setSyncMessage(`Synced ${freshCalendar.length} calendar/retreat item(s) \u2014 just now`);
    };
    const restorePoolDefaults = () => {
      const existingPoolIds = new Set(weeklyPool.map((p) => p.id));
      const missingPool = EXTRA_SEED.map((e) => ({ id: e.id, text: e.text })).filter((e) => !existingPoolIds.has(e.id) && !dismissedIds.includes(e.id));
      if (missingPool.length) {
        setWeeklyPool([...weeklyPool, ...missingPool]);
        setSyncMessage(`Restored ${missingPool.length} pool item(s) \u2014 just now`);
      } else {
        setSyncMessage("Nothing to restore \u2014 either everything's already here, or you deliberately removed it.");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "A standing pool of recurring/ongoing tasks. Tick which ones you're doing today \u2014 they'll show on the Glance tab. Nothing here is date-bound, so it rolls week to week until you remove it. Use the dropdown on any item to move it between sections." }, "Weekly task pool"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { placeholder: "Add a recurring/ongoing task", value: poolText, onChange: (e) => setPoolText(e.target.value), style: { flex: 1, minWidth: 140 } }), /* @__PURE__ */ React.createElement(Select, { value: poolCategory, onChange: (e) => setPoolCategory(e.target.value) }, POOL_CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.key, value: c.key }, c.label))), /* @__PURE__ */ React.createElement(Btn, { onClick: addPoolItem }, "Add")), POOL_CATEGORIES.map((c) => {
      const items = weeklyPool.filter((p) => categoryOf(p) === c.key);
      return /* @__PURE__ */ React.createElement("div", { key: c.key }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS[c.color], marginTop: 14, marginBottom: 2 } }, c.label), items.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: COLORS.inkSoft, paddingBottom: 8 } }, "Nothing here.") : renderPoolGroup(items));
    }), weeklyPool.filter((p) => categoryOf(p) === "other").length > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: COLORS.inkSoft, marginTop: 14, marginBottom: 2 } }, "Uncategorised"), renderPoolGroup(weeklyPool.filter((p) => categoryOf(p) === "other")))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, null, "Add a dated to-do"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }), /* @__PURE__ */ React.createElement(Input, { placeholder: "What needs doing", value: text, onChange: (e) => setText(e.target.value), style: { flex: 1, minWidth: 140 } }), /* @__PURE__ */ React.createElement(Btn, { onClick: add }, "Add"))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Appointments marked 'calendar' or 'retreat' were pulled from your iCloud calendar \u2014 say 'refresh from calendar' any time for the latest." }, "All dated items"), upcoming.map((t) => {
      const editing = editingTodoId === t.id;
      return /* @__PURE__ */ React.createElement("div", { key: t.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.line}`, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: t.done, onChange: () => toggle(t.id), style: { accentColor: COLORS.green, width: 16, height: 16 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 120 } }, editing ? /* @__PURE__ */ React.createElement(
        Input,
        {
          value: editTodoText,
          onChange: (e) => setEditTodoText(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEditTodo(t.id);
            if (e.key === "Escape") setEditingTodoId(null);
          },
          autoFocus: true,
          style: { width: "100%", fontSize: 14, marginBottom: 3 }
        }
      ) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: COLORS.ink, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.55 : 1 } }, t.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: COLORS.inkSoft } }, fmtDate(t.date), t.source !== "manual" ? ` \xB7 ${t.source}` : "")), editing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { onClick: () => saveEditTodo(t.id), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12, fontWeight: 700 } }, "save"), /* @__PURE__ */ React.createElement("button", { onClick: () => setEditingTodoId(null), style: { background: "none", border: "none", color: COLORS.inkSoft, cursor: "pointer", fontSize: 12 } }, "cancel")) : /* @__PURE__ */ React.createElement("button", { onClick: () => startEditTodo(t), style: { background: "none", border: "none", color: COLORS.green, cursor: "pointer", fontSize: 12 } }, "edit"), /* @__PURE__ */ React.createElement("button", { onClick: () => remove(t.id), style: { background: "none", border: "none", color: COLORS.danger, cursor: "pointer", fontSize: 12 } }, "\u2715"));
    })), /* @__PURE__ */ React.createElement(Card, { style: { background: COLORS.claySoft, borderColor: COLORS.gold } }, /* @__PURE__ */ React.createElement(SectionTitle, { sub: "Sync now refreshes calendar/retreat appointment times and dates. It will never bring back anything you've deleted yourself \u2014 deleting is treated as final. Restore pool defaults only re-adds original starter items you never touched." }, "Sync & restore"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Btn, { tone: "clay", onClick: syncCalendar, style: { background: COLORS.clay } }, "Sync calendar now"), /* @__PURE__ */ React.createElement(Btn, { tone: "ghost", onClick: restorePoolDefaults }, "Restore pool defaults")), syncMessage && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 12.5, color: COLORS.green, fontWeight: 600 } }, "\u2713 ", syncMessage)));
  }
  var rootEl = document.getElementById("root");
  var root = window.ReactDOM.createRoot(rootEl);
  root.render(React.createElement(App));
})();
