# Prompt for Antigravity: guided story, clear explanations, and smooth transitions

Open the existing Mnasa project in Antigravity and paste everything between **BEGIN PROMPT** and **END PROMPT**. Keep the companion research file `ANTIGRAVITY_CELESTIAL_CLARITY_PROMPT.md` available: it contains sourced facts for every NASA resource in the challenge. The latest screenshots are feedback about the current appearance, not the desired final style.

---

# BEGIN PROMPT

You are a senior React/Three.js developer, documentary director, UX designer, and science educator. Improve the existing NASA Space Apps website **Abandoned But Not Forgotten**. The owner has already improved some models and textures; **preserve and build on working improvements**. Do not start the project over, replace useful 3D with a generic landing page, delete existing features, or make the experience worse.

The goal is to make the entire story understandable and watchable in two ways:

1. **Watch the full story** with a clearly visible **Play guided demo** button: it advances through the complete story automatically, with enough time to see and read each scene.
2. **Explore by scrolling** with an equally clear **Scroll to explore** button, plus chapter navigation and accessible next/previous controls.

Whether the user watches or scrolls, every scene should tell them **where they are, what they are seeing, why the machine was sent, how it worked, what it discovered, and what happened afterward**—without clutter. All information must match the visual currently on screen. Make transitions between worlds coherent and calm.

## 1. What the new screenshots show and what to fix

The images show progress: the InSight and Ingenuity models are more detailed and surfaces have textures. Keep improvements like these. But:

- The solar-system opening has objects crossing in front of a huge Sun; the direction of travel can make it feel as if the viewer is going into the Sun before suddenly appearing on the Moon. The intended story must travel coherently from cosmic overview to Earth → Moon → Mars, not through the Sun or through a planet's interior.
- On the Moon, a close-up of simplified gold hardware is cropped and difficult to identify. The lunar terrain looks like a global crater photograph pasted repeatedly onto a flat surface: the craters look enormous, stretched and detached from the lighting and horizon. Scientific packages appear as anonymous shapes, with no explanation on screen.
- InSight is recognizable, but its model and solar panels are cropped at the viewport edges in the provided image. Ingenuity is visible but needs a calm hold and a clear explanation. The owner reports rover flicker and fleeting views; investigate the running app before deciding on a fix. It could be caused by several things, so don't claim a single cause without evidence.
- The asteroid scene shows cropped spacecraft, a very bright panel, a large dark spherical body and crowded generic rocks; it is not clear what the viewer is looking at or why.
- Much of the experience lacks visible information, narrative continuity, helpful labels, or a sense of which body and mission are on screen. A model alone—even a good one—is not a story.

The screenshots may come from a version newer than the repository snapshot. **Inspect the actual files and current app first**. Keep the best existing assets and code; adapt this prompt to what is really present rather than overwriting improvements.

## 2. Preserve the existing project and investigate before editing

Read `README.md`, `package.json`, `src/App.tsx`, `src/contracts/beats.ts`, `src/store.ts`, `src/scroll/useLenis.ts`, `src/data/{scenes,objects,sources}.ts`, `src/ui/{Overlay,SceneText,ProgressRail,FallbackStory}.tsx`, `src/three/{CanvasRoot,CameraRig}.tsx`, `src/three/systems/waypoints.ts`, `src/three/chapters/*`, `src/three/env/*`, `src/three/objects/*`, and the companion research prompt.

The repository snapshot previously inspected had:
- One document scroll progress in Zustand, consumed by both R3F and the DOM, with 17 scene beats and a long scroll track.
- `CameraRig.tsx` using separate position and look Catmull-Rom curves evaluated by `getPointAt(globalProgress)`, while FOV was interpolated by waypoint time. This can desynchronize the camera from scene timings because curve arc length does not equal the waypoint `t` values. Verify whether this is still true in the current version before changing it.
- `ChapterSwitch.tsx` switching whole chapter groups; inspect whether boundary mounting/unmounting causes flicker or object popping.
- `useLenis.ts` with Lenis and a native scroll listener; inspect whether its animation frame loop is actually driven and whether duplicate progress updates compete.
- `SceneText.tsx` showing the title only on the first narrative screen and animating paragraph reveals; verify whether headings or copy disappear at other local progress values. Never leave a scene unidentified.

Run `npm ci`, `npm run build`, `npm run lint`, and existing data/copy checks if feasible. Note pre-existing problems separately. Run the site and capture initial screenshots/video at the opening, Apollo 11, Apollo 12/ALSEP, Pathfinder, Spirit/Opportunity, InSight, Ingenuity, Dawn, NEAR, Pioneer, and Kepler, in desktop and mobile viewports if tooling allows. Do not claim tests or visual review passed if unavailable.

## 3. Visitor experience and layout

### Opening controls

- Show an intentional title and a one-sentence explanation: **“Explore the machines left across space, and the discoveries they made possible.”**
- Provide two obvious, keyboard-accessible actions: **Play guided demo** and **Scroll to explore**. The demo must be launched by the visitor; no autoplay on page load. Scroll mode retains normal scrolling and works without pressing a button; the button gives it a clear entry point.
- Keep a compact, persistent chapter rail with meaningful labels: `Space`, `Moon`, `Mars`, `Asteroid belt`, `Beyond`, `Inventory`. The active location is clearly indicated. Preserve more precise scene navigation where it already works.
- Make it immediately clear what the mode is: `Guided demo · Playing`, `Guided demo · Paused`, or `Scroll to explore`. Provide accessible controls and visible focus states.

### Scene information: one compact, persistent card

For **every visual hold and transition**, render a matching, selectable HTML information card in available screen space—not inside the 3D canvas:

- Small breadcrumb: `SOLAR SYSTEM / MOON / MARE TRANQUILLITATIS` or another truthful location.
- Main heading: name of the actual body/machine currently shown.
- Short plain-language narrative, ideally 1–2 sentences, age 12+.
- One highlighted science or engineering fact: `HOW IT WORKED → WHAT IT TAUGHT US`.
- Current status or event date, correctly labeled (e.g. `Last communication`, `Last flight`, `Mission ended` are different).
- A small source link to the relevant NASA page, and visual credit/evidence label such as `NASA model · illustration`, `Historical NASA photograph`, or `Schematic · not to scale`.
- Where applicable, a small world-condition line such as `Moon: extremely thin exosphere · strong day/night temperature changes`, or `Mars: thin CO₂-rich atmosphere · dusty surface`. Conditions are general facts, not live weather or exact conditions during an event.

Desktop: use a readable left-side panel occupying roughly 30–38% of width, with the model framed in a safe area on the right. Don't place text over the important parts of a spacecraft. Tablet/mobile: use a compact, scrollable content area **outside or safely over** the visual, with responsive model framing and no clipped text. Provide `More details` / `Sources` for secondary facts, not five competing overlays. Don't hide crucial information behind interaction, and never make a camera-pan transition leave the visitor without a heading for several seconds.

The displayed card, location, model visibility and audio/transition state must derive from the **same current scene/shot**, not separate timers guessing independently.

### Example finished cards

Use concise source-backed copy, adapting to the current visual:

- **The Moon · Apollo 11 / Eagle:** “Eagle landed in 1969. Its descent stage stayed behind as the astronauts returned to orbit.” `INSTRUMENT → INSIGHT: A seismometer recorded lunar ground motion.` Distinguish the later fate of the ascent stage from the descent stage. Source: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- **Mars · InSight:** “A robotic arm placed a seismometer on the Martian surface.” `INSTRUMENT → INSIGHT: Marsquakes revealed clues about the planet's interior.` The science highlights page reports over 1,300 seismic events. Sources: https://science.nasa.gov/mission/insight/ and https://science.nasa.gov/mission/insight/science-highlights/
- **Mars · Ingenuity:** “Ingenuity demonstrated powered flight in Mars' thin air, then became an aerial scout.” `MISSION: 72 flights · last flight 18 January 2024.` Mission completion announced 25 January 2024. Source: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/

These are examples, not substitutes for the full scene coverage specified below.

## 4. Guided demo: precise behavior

Implement a real, complete, predictable guided playback mode—not a fake button or a simple timed animation disconnected from scroll. The demo must cover all existing story scenes including the final inventory/closing, even when individual scenes have multiple paragraphs or subshots. Do not silently skip the original story.

### User controls and behavior

- **Play guided demo** from the beginning at the opening. If invoked after navigation, explicitly offer **Play from here** and **Restart from beginning**, or clearly state which behavior it uses. During playback show **Pause**, **Resume**, **Previous**, **Next**, **Exit demo**, and current chapter/scene progress.
- At the final scene stop cleanly, show **Replay** and **Explore by scrolling**, and do not loop unexpectedly. Exit demo returns to manual scrolling **at the current scene** without a jump or losing context.
- While playing, deliberate user scroll/touch/drag or keyboard scroll pauses the demo and gives control to the user. Distinguish user input from programmatic scroll events: do not stop on your own auto-scroll. Do not hijack ordinary keyboard use while an input, dialog, or interactive widget has focus.
- Pause when the browser tab is hidden; resume only after user action or clearly indicate paused. Pause while a modal/source drawer/interactive widget needs attention. On route/unmount/exit, cancel `requestAnimationFrame` and timers/listeners. Handle viewport resizing without teleporting or invalid progress.
- Never auto-play audio. If narration is added, it must be opt-in, credited, and have a transcript. The demo must be complete without sound.
- Respect `prefers-reduced-motion`: user can explicitly start a guided demo, but use static shots and short fades/no simulated flight, with the same cards and manual controls. Allow immediate stop. The no-WebGL/reading path must still reach every scene and preserve access to the narrative; if a timed guided mode isn't supported there, make that limitation explicit and present accessible next/previous navigation rather than a nonfunctional button.

### Timing and reading

- For every scene define an ordered list of **shots**, each with at least: `sceneId`, subject identifier, start/end progress, camera pose or transition, matching text ID, source references, transition duration and hold duration.
- Use deliberate editorial pacing, not a constant fast scroll. Suggested starting values: **1.2–2.5 seconds transition**, then **at least 8–12 seconds** on a short information card; allow **12–20+ seconds** for complex text. Compute a reasonable reading time from visible word count and choose the larger of that and the minimum. Do not demand the user reads 100 words in 5 seconds. Make the total duration visible, based on the actual storyboard. Offer `Normal` and `Slow` speed, plus pause and next.
- Keep the featured rover/lander/helicopter fully visible and stable during the hold. Small optional, gentle camera movement is fine; avoid constant spin, blinking, a slideshow-like one-frame appearance, or moving a historical object as if it is active today.
- For manual scrolling, progress still maps to the same shots and cards. Holding is achieved by suitable scroll-space windows, not by blocking the user's scroll. Ensure both directions work. If long content exists in a card, keep it readable without requiring the visitor to chase a changing card.

### Single source of truth: implementation constraints

- Existing state uses `progress` derived from document scroll. Prefer a single canonical progress/scene resolver shared by manual and demo modes, DOM, 3D, rail and info panel. A recommended design is: demo advances an explicit storyboard clock → converts current shot/time to target normalized scroll position → moves the actual scroll position through the existing scroll controller → the existing scroll listener writes progress → all visual/DOM consumers use that progress. Coordinate with Lenis or disable smooth interpolation while programmatically stepping; do not run two independent animation loops fighting over scroll. The exact design may differ if the current implementation changed, but it must keep URL/scroll/scene/DOM synchronized and be justified.
- Implement event input ownership with a clear state machine, e.g. `manual | playing | paused | finished`, rather than overlapping `setInterval` calls. Use monotonic elapsed time, avoid 60Hz unnecessary React renders, and guarantee cancel/cleanup. Prevent boundary churn and flicker at scene switches with stable keys, carefully managed preloading, crossfade or hysteresis; don't hide an actual error by disabling content.
- If you change beat windows, update `BEATS_VERSION`, camera timing, data checks, labels and all existing consumers. Don't alter the underlying science data solely to fit animation.
- Unit-test mapping of `storyboard time ↔ shot ↔ scene ↔ progress`, valid contiguous intervals, boundaries, final state, pause/resume, and reverse/manual handoff. Browser-test that the visual subject and card agree at each hold.

## 5. Story path, exact sequence and transition direction

Make each destination distinct. Use the existing scene IDs when possible and preserve all 17 scenes and the full inventory. If a scene contains multiple relevant machines or facts, split it into sequential holds; make every model visible long enough to understand. Label transitions such as “Leaving the Moon · Traveling to Mars”. The flight is an **illustration**, not an actual trip or live orbital simulation.

| Order / existing scene | What the visitor sees | What the card must explain | Transition and hold |
|---|---|---|---|
| 0.1 opening | A legible Milky Way / Sun / solar system orientation, with planets labeled or a clear schematic | Machines were sent from Earth to explore other worlds. Solar-system positions/sizes are not to scale if stylized. | Establish view, hold, then focus toward Earth without entering Sun geometry. |
| 0.2 catalog | An accessible archive card and Earth/Moon context | NSSDCA preserves mission records; uncertainties are part of the record. | Editorial dissolve to Moon overview; no random terrain flash. |
| 1.1 Apollo 11 | Moon globe → Tranquility Base → Eagle descent stage / EASEP | What stayed, what the seismometer did and distinction from ascent stage; lunar conditions. | First identify the world, then show stable hardware close-up. |
| 1.2 Apollo 12 and Surveyor 3 | A clearly different lunar site; Surveyor photo/model and Apollo 12 context | Surveyor tested soil; Apollo 12 astronauts visited and returned components. | Named site transition; distinguish the two machines. |
| 1.3 Apollo 15 | Hadley-Apennine overview → rover and Falcon | The LRV expanded astronauts' reach for geology. | Separate Apollo 15 from Apollo 11/12; hold on rover. |
| 1.4 ALSEP | Legible experiments, ideally annotated diagram or verified model | Instruments continued working; powered ALSEP stations were shut down in 1977. Apollo 11 EASEP's 1969 end is distinct. | Hold with visible instrument labels; avoid anonymous uncaptioned boxes. |
| 2.1 Viking 1 | Mars globe → Chryse Planitia → lander | Its cameras, sampling arm and lab studied Mars; results did not prove life. | Clearly leave Moon and arrive at Mars before showing surface. |
| 2.2 Pathfinder and Sojourner | Ares Vallis historical panorama and correct rover/lander representation | Airbags enabled landing; rock studies supported a wetter past. | Keep the relevant scene and source visible; don't mistake another rover for Sojourner. |
| 3.1 Spirit and Opportunity | Two separate, named sites or clearly split panels | Twin rovers studied evidence of ancient water; their histories and final locations differ. | Stable individual rover holds; no flashing or rapid swap. |
| 3.2 InSight | Elysium Planitia → InSight model and seismometer | Marsquakes helped reveal Mars' interior. | Fit whole model including panels and arm inside safe visual region; hold. |
| 3.3 Ingenuity | Jezero Crater → helicopter | First powered controlled flight on another planet; 72 flights. Show last-flight date and mission-end date as different events. | Clear stable close-up; historical flight illustration must be labeled. |
| 4.1 Dawn | Mars outward to asteroid belt → Ceres with Dawn orbit | Dawn visited Vesta and Ceres; it remains in orbit around Ceres. | Schematic orbit, not landed or a live position. |
| 4.2 NEAR | Distinct asteroid Eros → NEAR | An asteroid orbiter touched down and returned data afterward. | Use appropriate image/model, not a second Ceres view. |
| 5.1 Pioneer 10 | Outbound conceptual view → recognizable spacecraft | First Jupiter flyby; last signal in 2003 at a historical distance. | No claim of live coordinates or verified heliopause crossing. |
| 5.2 Kepler | Sun-orbiting telescope → simple transit demonstration | A planet crossing a star causes a small dimming; Kepler used this to discover exoplanets. | Schematic animation clearly labeled; hold the explanation. |
| 6.1 inventory | Readable, interactive list of the featured artifacts | Summarize location, mission, discovery and status; show unknowns honestly. | Demo should give enough time; manual browsing remains possible. |
| 6.2 closing | An elegant, legible conclusion | The machines' data continues to teach us. Credits and sources remain accessible. | End demo; offer replay and scrolling. |

Do not imply that Apollo 11, Surveyor 3 and the Apollo 15 LRV share the same landing site. Do not force a physically continuous camera fly-through through unrelated worlds just to hide a cut. Clear labeled fades and distinct scale changes are better than an impossible transition.

## 6. Environment: show planetary conditions accurately and beautifully

### Moon

- NASA describes the Moon as having a solid cratered surface, a very thin exosphere and about one-sixth Earth's surface gravity. Its source notes temperature ranges around **127°C in full sun** to **−173°C in darkness**; these are general extremes, not live measurements at the displayed site. https://science.nasa.gov/moon/facts/
- Stop wrapping a whole-global-Moon crater texture across a small ground plane as if giant global craters were beneath the lander. Use a **site-appropriate archival panorama** with accurate caption, a documented local terrain crop if available, or a modest procedural regolith material/heightfield labeled `illustrative surface`. NASA SVS global color map is suitable for a globe, not directly as meter-scale ground texture: https://svs.gsfc.nasa.gov/4720/.
- Improve blending between foreground, midground and distant horizon: match horizon line, lighting direction, tone and scale; use coherent contact shadows and limited depth. If a historical panorama is a flat background plate, label it as such instead of pretending it is measured 3D terrain. No invented present-day photographs, no over-saturated gold, no giant crater stamps, no hard seams or floating terrain.
- A complete Apollo LM model is not necessarily the descent stage alone. Inspect the GLB; if it includes the ascent stage, label it as the historical landing configuration or switch to a clearly identified descent-stage illustration/photo for the “what remained” hold.

### Mars

- NASA describes Mars as a rocky world with a **thin atmosphere mostly carbon dioxide**, dust storms, and surface colors including brown, gold, and tan caused in part by oxidized iron. Temperature varies widely by place and season. https://science.nasa.gov/mars/facts/ . Do not show a single temperature as live/current or assign a global range to a specific mission site.
- Ingenuity operated in air less than 1% as dense as Earth's, as stated in its mission page; explain how its rotor design relates to the challenge of flight. https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/
- Match environment to the named mission. Ares Vallis imagery is appropriate as a historical Pathfinder image; it is not automatically Jezero or Elysium. NASA Pathfinder's processed panorama is described at https://science.nasa.gov/mission/mars-pathfinder/ and credited NASA/JPL-Caltech. Use it only as an accurately labeled historical image; do not pretend it depicts the current lander's condition.
- Correct reddish sky/ground lighting, natural terrain scale, contact shadows, continuous horizon and restrained atmospheric haze. Avoid oversized floating square particles, glaring repeating seams, exaggerated surface cracks or a backdrop visibly pasted behind the model. Subtle camera parallax is acceptable only when layers are visibly labeled/treated as illustrations, not claimed as a precise reconstruction.

### Ceres, Eros, deep space

- Ceres is a dwarf planet; Eros is an irregular asteroid. Label their depictions, source and scale. Avoid a dense wall of generic asteroid rocks and white untextured solar panels. The asteroid belt is not a close-packed obstacle course. No fake weather for Ceres/Eros; if conditions are included, add a verified NASA source for each claim.
- Use source-backed illustrations/models/photos with clear orientation and metadata. Scene mood should be readable and cinematic without overwhelming bloom, dark unreadable silhouettes, or foreground objects blocking primary hardware.

## 7. Fix flicker, framing, and transitions systematically

Do not mask a bug with a dark fade or just replace models with static photos. Use a recorded slow scroll and the guided demo to reproduce it, identify the cause and fix it. Investigate all of these where relevant:

- **Progress jitter at thresholds:** two competing progress writers, eased vs raw scroll, rounding or `>=` boundary checks can rapidly toggle scenes. Ensure one authoritative timeline, stable boundary semantics, clamp progress, and test adjacent values on both sides. Any hysteresis must not prevent accurate manual navigation or accessibility.
- **Asset lifecycle:** changes of React `key`, repeated suspense/unmount/mount, async asset arrival or cleanup/disposal of still-used assets can flash a model. Use stable scene/model identities, cache loaded GLBs/textures, preload the next scene and transition only when ready, with an error fallback. Avoid rendering the same object in duplicate overlapping locations.
- **Z-fighting / clipping:** check coplanar surfaces, near/far camera planes, depth precision, surface and background overlap, shadow bias and overly aggressive material transparency. Offset/remove duplicate geometry rather than relying on random polygon offsets. Verify a model isn't inside the terrain or behind a backdrop.
- **Camera path:** use per-shot timestamped position and target on the same time parameter, synchronize FOV and progress, and explicitly define safe framing on mobile and desktop. Avoid camera entering celestial spheres, clipping surfaces, passing through the Sun or cutting off panels and legs. Use a safe `Box3`/bounding-sphere fit where applicable, accounting for left-card safe area and aspect ratio.
- **Lighting:** inspect overexposure and near-black silhouettes. Use an intentional directional key and subtle fill appropriate to the world; preserve actual GLB materials and correct color spaces. Eliminate blown-out pure-white solar panels.
- **Transitions:** use a short stable view → clear transition label → dissolve/cut to the destination's establishing shot → zoom to the machine → stable hold. Do not show the wrong text over the next scene, leave a blank black frame, or send the camera through an object. For reverse scrolling, the transition must work backward too.

Add a developer-only scene inspector if helpful: show scene ID, local progress, active camera target, subject name and asset status. Keep it hidden in the user-facing build.

## 8. Sources, facts, assets and non-regression

- Read the detailed extracted data in `ANTIGRAVITY_CELESTIAL_CLARITY_PROMPT.md` section 11. It covers all supplied NASA sources: Apollo 11/12/15, Surveyor 3, Pathfinder, Spirit/Opportunity, Viking, InSight, Dawn, NEAR, Pioneer 10, Ingenuity, Kepler, plus optional Phoenix, Viking 2 and Pioneer 11. Each scene card must link to its relevant NASA source.
- Preserve source/event precision and uncertainties. No fake current coordinates, live status, telemetry, temperatures, exact fictional landscape or fabricated facts. Kepler and Pioneer are not on a surface. Dawn orbited Ceres. NASA's NSSDCA record gives Dawn's Vesta departure as 5 September **2012**, not 2017: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A.
- Use existing verified models first. If additional NASA models are needed, inspect the exact asset and permissions in https://github.com/nasa/NASA-3D-Resources . NASA media guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/ . Provide exact credits and non-endorsement notice. The companion `ANTIGRAVITY_VISUAL_REBUILD_PROMPT.md` contains candidate model links. Don't assume those models are already downloaded or that every model depicts the correct mission state.
- All images and models require an asset manifest with attribution, source, processing and local path; ensure critical assets have graceful loading/error fallbacks. Never add a runtime dependency on a NASA API or API key for the main demo.
- Retain existing responsive behavior, data citations, accessible reading mode, map, inventory, interactive widgets, source/credit access and reduced-motion support. If a feature already works, preserve it; if it conflicts, integrate it instead of deleting it.

## 9. Implement in stages and prove it works

**Stage 0 — Audit:** establish current state, reproduce the flicker, review screenshots and read project/companion research. Record issues and test baselines before edits.

**Stage 1 — Shared storyboard and info:** create typed scene/shot configuration that maps every existing scene to a visual, card, citation and transition. Ensure the visible explanation is always synchronized. Add location breadcrumbs and useful mission/status labels. Implement the opening `Play guided demo` and `Scroll to explore` controls.

**Stage 2 — Playback:** implement full automatic guided mode across all scenes with holds, transitions, pause/resume/previous/next/replay/exit, input takeover, cleanup and reduced-motion handling. Verify no skipping, no dual scroll race, no jump on exit, and complete ending. Provide a real total duration based on shot timings.

**Stage 3 — Quality of shots:** fix opening path, lunar material/horizon, InSight framing, stable rover/Ingenuity shots, and distinct Ceres/Eros composition. Maintain good existing GLBs. Ensure every scene has a readable, uncluttered card and an appropriate visual hold.

**Stage 4 — End-to-end testing:**
1. Automated checks: existing build/lint/data checks plus unit tests for player time mapping, shot boundaries, play/pause/resume/end, input ownership and coordinate handling where applicable. Document pre-existing vs new failures.
2. Browser end-to-end: start demo, observe at least one full run to ending, pause/resume, next/previous, change speed, exit to scroll, input takeover, restart and revisit scene in reverse. Assert all 17 existing scene IDs become visible and their card title matches the active visual subject. Test actual measured hold duration for at least Apollo 11, InSight and Ingenuity.
3. Visual review at 1440×900 and 390×844: opening, lunar globe and Apollo 11, ALSEP, Mars globe, Pathfinder, rover, InSight, Ingenuity, Dawn/Ceres, NEAR/Eros, Pioneer, Kepler, inventory and closing. Test screenshots around both sides of every chapter boundary and in reverse; check no flash, empty frame, cropped spacecraft, mismatched label, or stretched planetary texture.
4. Accessibility/resilience: keyboard, reduced motion, reading mode, WebGL disabled/context failure, missing GLB or texture, modal focus, source links, resize while paused, hidden-tab handling, and 320px width. Never report a test as passed if it was not actually run.
5. Update README, source/asset credits and a brief implementation report: what changed, actual demo duration, key commands/results, visual review evidence, known issues, untested cases and how to use the two modes.

**Definition of done:** A viewer can choose to watch the complete story without scrolling or explore it manually. Every displayed scene has a clear name, world, context, discovery, source and appropriate environment; visuals hold long enough to understand, transitions follow an intelligible path, important models do not flicker or get cropped, and existing working features remain intact. If time is short, do not present an incomplete demo as a complete one—report exactly which scenes or tests remain.

# END PROMPT
