# Complete Antigravity prompt: Abandoned But Not Forgotten

Open the existing project in Antigravity and paste everything between **BEGIN PROMPT** and **END PROMPT**. This is a single self-contained prompt; no companion prompt file is needed. The screenshots supplied by the owner are feedback about the current appearance, not the desired final style.

# BEGIN PROMPT

This is one integrated brief. Part A is the latest and highest-priority direction, including preserving improvements and the guided demo. Part B adds detailed visual and asset guidance. Part C provides the complete research, facts, sources, and supplemental requirements. Apply them together; where older wording conflicts with Part A, Part A wins. Scientific accuracy and verified source-specific limitations always apply. References to sections are within their respective parts. Work in the existing project, and do not assume that assets have already been downloaded or that prior visual checks have been performed.

# Part A — Current priorities: guided story and smooth playback

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

Read `README.md`, `package.json`, `src/App.tsx`, `src/contracts/beats.ts`, `src/store.ts`, `src/scroll/useLenis.ts`, `src/data/{scenes,objects,sources}.ts`, `src/ui/{Overlay,SceneText,ProgressRail,FallbackStory}.tsx`, `src/three/{CanvasRoot,CameraRig}.tsx`, `src/three/systems/waypoints.ts`, `src/three/chapters/*`, `src/three/env/*`, `src/three/objects/*`, and the embedded research and source bank in Part C below.

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

- Use the detailed extracted data in Part C, section 11 below. It covers all supplied NASA sources: Apollo 11/12/15, Surveyor 3, Pathfinder, Spirit/Opportunity, Viking, InSight, Dawn, NEAR, Pioneer 10, Ingenuity, Kepler, plus optional Phoenix, Viking 2 and Pioneer 11. Each scene card must link to its relevant NASA source.
- Preserve source/event precision and uncertainties. No fake current coordinates, live status, telemetry, temperatures, exact fictional landscape or fabricated facts. Kepler and Pioneer are not on a surface. Dawn orbited Ceres. NASA's NSSDCA record gives Dawn's Vesta departure as 5 September **2012**, not 2017: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A.
- Use existing verified models first. If additional NASA models are needed, inspect the exact asset and permissions in https://github.com/nasa/NASA-3D-Resources . NASA media guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/ . Provide exact credits and non-endorsement notice. Part B below contains candidate model links. Don't assume those models are already downloaded or that every model depicts the correct mission state.
- All images and models require an asset manifest with attribution, source, processing and local path; ensure critical assets have graceful loading/error fallbacks. Never add a runtime dependency on a NASA API or API key for the main demo.
- Retain existing responsive behavior, data citations, accessible reading mode, map, inventory, interactive widgets, source/credit access and reduced-motion support. If a feature already works, preserve it; if it conflicts, integrate it instead of deleting it.

## 9. Implement in stages and prove it works

**Stage 0 — Audit:** establish current state, reproduce the flicker, review screenshots and read the project and the embedded research below. Record issues and test baselines before edits.

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

# Part B — Detailed visual design and candidate assets

You are a senior creative director, WebGL engineer, visual storyteller and frontend designer. Work directly in the existing React/Vite/TypeScript/React Three Fiber repository. My NASA Space Apps story is **Abandoned But Not Forgotten**. The site currently runs, but its visuals look like an unfinished 3D prototype. I need a dramatic improvement in visual quality **and** clear educational storytelling. Build it; do not just describe a concept or make a generic landing page.

## 1. Understand the problem shown in my screenshots

The screenshots show the existing site, not a desired visual style. They are examples of what to fix:

1. **Opening:** a huge starfield with tiny unlabeled dots and a tiny yellow Sun in the middle. The viewer cannot identify planets or understand the journey. Text is small and pushed against an edge.
2. **Moon:** a floating thin gray strip, an empty black background and a tiny object. It does not look like a recognizable lunar surface and the important hardware is almost invisible.
3. **Mars:** huge flat orange/brown ground and sky blocks separated by a black gap. The vehicles are small, partially off-screen or unidentified. Large square dust particles add noise rather than depth.
4. **Asteroids/Ceres:** generic gray faceted rocks, a featureless sphere with a harsh white shape, and a spacecraft cut off at the edge. Visitors cannot tell Ceres from Eros or know which machine they are seeing.
5. **Deep space:** a tiny isolated object with no meaningful composition, readable story or visual indication of what it is.
6. Across scenes: enormous unused empty space, camera changes that do not center their subject, visible terrain edges, confusing hierarchy, inconsistent contrast, few useful annotations, and no strong connection between the machine and its discovery.

The answer is not “add more particles, bloom, dark gradients, or random 3D objects.” Fix composition, camera framing, visual assets, terrain/horizon, lighting, labels, and scene-to-story continuity. Every featured machine must be recognizable at its story beat.

## 2. Design direction: cinematic science documentary, not a game demo

Build **The Atlas of Quiet Explorers**: a premium, scroll-led digital museum experience. It should feel like an editorial NASA documentary and a carefully designed physical science exhibit. Large, credible visuals and simple explanations should help a child understand the worlds and the machines.

- **Mood:** quiet, wondrous, credible, humane. The subject is the story, not decorative sci-fi HUDs.
- **Palette:** near-black space `#080d17`, lunar stone `#c8c6bf`, Mars mineral rust `#a55b3a`, readable warm white `#f4f1ea`, restrained archival amber `#d8aa68` and desaturated blue `#88aac1`. Use colors as a starting point, adjust for contrast.
- **Typography:** strong editorial headline and readable sans-serif body; use existing fonts or licensed/self-hosted alternatives, with robust system fallbacks. Aim for a clear 3-level hierarchy: location/kicker, large title, concise narrative. Avoid wall-to-wall tiny monospace.
- **Composition:** on desktop, place short narrative text in a deliberate left column and the main visual in the remaining right/center area. On mobile use text above or below a dedicated visual frame; do not hide machines underneath text. Use responsive layout, no overlapping cards.
- **Evidence labels:** small but legible badges: “Historical NASA image,” “NASA-derived visualization,” “3D illustration,” “Schematic,” or “Not to scale,” as appropriate. Place visual credit and source near the asset. Do not imply a model is a current photograph.
- **Story rhythm:** wide establishing view → identifiable world → named site → well-framed machine → how the instrument works → discovery → current status. Each screen communicates one idea. User can move by scrolling or directly through accessible chapter navigation.
- **Constraints:** no fake live telemetry, fake distances or fabricated lander positions. Follow the facts and source rules in Part C below (especially its researched section 11). Preserve the existing story, accurate content and functionality while upgrading the presentation.

## 3. Inspect the existing project first; fix actual causes

Read `src/App.tsx`, `src/three/CanvasRoot.tsx`, `src/three/CameraRig.tsx`, `src/three/systems/waypoints.ts`, `src/three/chapters/*`, `src/three/env/*`, `src/three/objects/*`, `src/contracts/beats.ts`, `src/ui/Overlay.tsx`, `src/ui/SceneText.tsx`, `src/scroll/useLenis.ts`, `src/store.ts`, `src/data/{objects,scenes,sources}.ts`, `package.json` and the embedded research and source bank in Part C below.

Particular issues to investigate:

- `CameraRig.tsx` constructs separate Catmull-Rom position and look curves from every waypoint but calls `getPointAt(globalProgress)` on each, while `fovAt` uses the waypoint `t` values. `getPointAt` follows normalized arc length, not the supplied `t` timestamps. The separate curves also have different arc lengths. Consequently camera, target, FOV, DOM beat and chapter switch can become desynchronized. Verify this in the running app rather than assuming it is the only problem.
- `ChapterSwitch.tsx` swaps groups at chapter boundaries while the camera is driven by a global path. Different chapter groups use their own local coordinates, so verify camera/target relative to the active group's objects at every beat, including both sides of switches, deep links and reverse scroll.
- `MoonTerrain.tsx` and `MarsTerrain.tsx` use finite plane geometries; Mars also uses a hemisphere that may not cover the horizon from every camera position. Fix the black line and floating strip by correcting framing, sky coverage and terrain extent. Do not merely cover gaps with a UI panel.
- `MarsTerrain.tsx` currently scatters rocks using `Math.random()`. Make any procedural dressing deterministic so scenes do not change on rerender. Generated rocks and terrain are **illustrative**, not evidence of the real site.
- Existing procedural hardware and untextured globe geometry look like placeholders. Replace selected key subjects with verifiable NASA model/imagery where appropriate; do not claim an image or model is more accurate than its source.
- The website uses a 38-screen scroll track and `BEATS`. Don't throw away the source-backed 17-scene story or break navigation, fallback or accessibility. Adapt contracts deliberately. If changing timing, keep a single progress/scene source, update `BEATS_VERSION` when necessary, and test all dependents.
- The existing README may describe a different earlier concept. Ensure final docs reflect the actual implemented app.

Start by running `npm ci`, `npm run build`, `npm run lint` and existing data/copy checks if feasible. Report baseline errors. Run the app and inspect it at 1440×900 and 390×844. Take representative screenshots at key scene anchors before and after, if browser automation is available. Never say tests or screenshots succeeded if they did not run.

## 4. Concrete real assets: use these first

These paths were found in the NASA 3D Resources GitHub tree, not guessed. They are candidate assets, **not already included or visually verified**. Open each source, inspect whether it is suitable and self-contained, verify applicable usage conditions/credits, download only what is used, and keep files local under `public/` for a resilient demo. Inspect the actual GLB in the app. If the asset host is inaccessible, use a sourced photograph with attribution or a clear illustrated fallback; do not silently substitute wrong hardware.

NASA resource repository and usage guidance:
- https://github.com/nasa/NASA-3D-Resources
- https://www.nasa.gov/nasa-brand-center/images-and-media/

**Ready-to-inspect GLB models (file sizes below are approximate GitHub tree sizes, not compressed download or performance guarantees):**
- Apollo Lunar Module, ~0.72 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Apollo%20Lunar%20Module/Apollo%20Lunar%20Module.glb
- Ingenuity, ~2.02 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Ingenuity%20Mars%20Helicopter/Ingenuity%20Mars%20Helicopter.glb
- InSight, arm deployed, ~3.95 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/InSight%20Cruise%20Lander/InSight%20Cruise%20Lander%20%28arm%20deployed%29.glb
- Opportunity (MER-B), ~0.04 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Mars%20Exploration%20Rover%20-%20Opportunity%20%28MER-B%29/Mars%20Exploration%20Rover%20-%20Opportunity%20%28MER-B%29.glb
- Dawn, ~0.93 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Dawn/Dawn.glb
- NEAR Shoemaker, ~0.70 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/NEAR%20Shoemaker/NEAR%20Shoemaker.glb
- Pioneer 10, ~2.05 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Pioneer%2010/Pioneer%2010.glb
- Kepler (A), ~2.00 MB: https://github.com/nasa/NASA-3D-Resources/blob/master/3D%20Models/Kepler%20%28A%29/Kepler%20%28A%29.glb

Important: the Apollo model may show the complete landed lunar module, not just the descent stage that remained. Inspect its nodes/geometry. If you cannot isolate or accurately show the descent stage, use the intact model only as a **historical landing configuration** and separately illustrate what stayed, or use a correctly captioned photograph/diagram. Similarly inspect InSight configuration and GLB materials before asserting it represents a specific date or present state. Do not display Apollo 15 rover, Eagle and Surveyor as neighboring objects. If an appropriate Sojourner model isn't found, use a dated NASA photograph instead of falsely relabeling an Opportunity model.

**Globe textures and historical images:**
- Moon color/elevation resources: https://svs.gsfc.nasa.gov/4720/ ; small 2K color candidate: https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg . NASA describes this as an LRO-derived processed visualization, with limitations and gap filling. Credit according to its asset page. Check orientation and texture color space.
- NASA repository has a Mars image file: https://github.com/nasa/NASA-3D-Resources/blob/master/Images%20and%20Textures/Mars/Mars.jpg . Inspect actual dimensions, projection, orientation, provenance and permissions before using on a globe. If unsuitable, find and document a verified NASA/USGS global mosaic; use a visibly schematic fallback if unavailable. A terrain photo is not a globe texture.
- Historical Ares Vallis panorama on NASA Pathfinder page: https://science.nasa.gov/wp-content/uploads/2024/03/mars-pathfinder-presidential-panorama-lg.jpg — source https://science.nasa.gov/mission/mars-pathfinder/ . NASA/JPL-Caltech; the page describes processing and retouching. Show as a historical image and do not imply a live or fully reconstructed 360° physical environment. Inspect aspect ratio and seam before using as a panorama.
- Surveyor 3 with Apollo 12 LM in the background: https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/07/as12-48-7134_1280.jpg — https://science.nasa.gov/mission/surveyor-3/ . Credit NASA; label it a historical photo.
- Eros image mosaic: https://assets.science.nasa.gov/content/dam/science/psd/solar/internal_resources/3964/Asteroid_Eros.jpeg — https://science.nasa.gov/mission/near-shoemaker/ . Credit NASA and identify as a historical mosaic, not current/live.
- Jezero regional datasets if a real terrain crop is feasible: https://astrogeology.usgs.gov/search/map/mars-2020-jezero-crater-landing-site-products . These are large scientific products; verify projection, metadata, terms and area before claiming location accuracy. Don't download multi-gigabyte files just to improve appearance.

For GitHub `blob` links, use a supported GitHub download mechanism or API to get the binary content, not the HTML page. Check magic bytes (`glTF` for GLB), file sizes, all GLB dependencies, and successful loading. Never commit a downloaded HTML error as an asset. Follow NASA's terms and exact asset-specific credits; avoid NASA logos and any implication of endorsement. Maintain a manifest with original URL, credit, local path, date, modifications, and use.

**Tooling:** use the existing `three`, `@react-three/fiber` and `@react-three/drei` stack. Drei's `useGLTF`, `Bounds`/bounding-box utilities, `useTexture`, `Suspense` and image/video fallback are sufficient. Blender or glTF Transform may be used locally to optimize a GLB if available, preserving license, original source and documented edits. No ML model, Hugging Face dependency, backend, API key, or paid service is required. AI-generated scenery, if ever used, must be labeled as artwork and must not replace documentary evidence.

## 5. Exact visual redesign: scene-by-scene

### A. Opening and orientation — stop the tiny solar-system problem

- Design an intentional full-viewport hero: strong title **ABANDONED BUT NOT FORGOTTEN**, a one-sentence subtitle explaining the story, an unobtrusive entry/scroll cue and clear navigation. Place a large recognizable textured Moon or Mars as a cinematic visual anchor, or transition into it within the opening—not just a tiny Sun surrounded by noise.
- Use a restrained star background with natural variation in size. Do not create a bright square-pixel cloud that competes with the text. Nothing should suggest a specific real star catalog unless sourced.
- For the solar-system overview, use readable names and a structured diagram or carefully composed 3D scene. If distances, scales, or planetary positions are stylized, state **“Schematic · not to scale · not live”**. Show the Earth–Moon relationship and where Mars is, then make destination transitions obvious.
- Provide clear chapter controls: `Moon`, `Mars`, `Asteroids`, `Beyond`, `Sources`, and an accessible reading mode. Preserve scroll storytelling. On mobile these controls must remain usable without obscuring the story.

### B. Moon — recognizable environment and close-up hardware

- First show a substantial lunar globe with real, processed LRO-derived texture and a site label. The globe should be large enough to recognize continents/maria and craters on desktop and mobile, not a dot. Reveal a source-backed Apollo 11 site marker. NASA record: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C .
- Transition into a surface-focused chapter. The horizon must fill the screen width and the terrain must not float as a visible finite plane. Avoid artificially giant curvature at close range. Use a verified site photograph where available, or a well-lit, shaded illustration with subtle terrain variation, named as such. No claim of exact current dust or precise locally measured terrain unless supported.
- Frame the relevant lunar module so its legs, body and surroundings are immediately legible. Use an object-fit shot, gentle directional side lighting, restrained fill and sufficient contrast against the background. An important featured model should occupy roughly **25–45% of the visual frame's shorter dimension** at its close-up beat, subject to actual layout; never allow narrative text to obscure it.
- Make the story explicit: `Eagle · 20 July 1969` → descent stage stayed → EASEP seismometer measured lunar vibrations. Distinguish ascent-stage fate from the descent stage. The text and source link must remain readable during the shot.
- Apollo 12/Surveyor and Apollo 15 are separate sites: introduce clear location transitions and use their own visual/photograph and accurate captions. The real Surveyor/Apollo 12 photograph can provide a dramatic comparison; it must be dated/credited.

### C. Mars — an actual world and legible machines

- Begin with a large recognizable Mars globe, then transition to the location being discussed. Show only sourced site locations; if a final rover location isn't known in the data, say “region” and don't pretend to know the exact pin.
- Replace the flat orange strip and rectangular maroon sky with an environment that has a continuous horizon, textured ground, controlled atmospheric depth and natural framing. Use an actual historical photo as a 2D backdrop/plate only if it is captioned and represents the mission/site being discussed; don't present an Ares Vallis photo as a precise Jezero terrain reconstruction.
- Show Sojourner/Pathfinder with the appropriate historical imagery. Show InSight and Ingenuity with their own verified models or honest photo fallbacks, each filling a meaningful portion of the visual area and accompanied by a short title, site and one fact.
- Ingenuity should appear as a recognizable helicopter; do not leave it as a tiny flying black speck. Historical flight vs present grounded artifact must be separate and clearly labeled; do not animate an active present-day flight. Show only verified damage if a source supports it.
- Keep dust subtle and low-cost; avoid square particles, solid color slabs, black seams, enormous boulders, or random floating objects. It's better to use a beautiful credited archival image than a poor fake 3D world.

### D. Asteroids / beyond — meaningful bodies and well-framed spacecraft

- **Dawn / Ceres:** show a recognizable labeled Ceres reference image or source-appropriate globe with Dawn in a clear, **schematic, not-to-scale orbit**. Do not represent Ceres as an untextured featureless gray ball or show the asteroid belt as a dense field of colliding boulders. Dawn remains in orbit; it did not land.
- **NEAR / Eros:** show NASA's Eros mosaic or a verified irregular Eros model; label it as Eros and separate it from the Ceres view. Show NEAR Shoemaker as a close-up model or historical illustration and explain its descent and post-landing science. Do not invent its precise current orientation or coordinates.
- **Pioneer 10 / Kepler:** use their appropriate models in a large, dignified composition with enough illumination to reveal antenna/shape. Give each a name, purpose, historical milestone and clearly marked conceptual trajectory or orbit. No current live position. Pioneer last signal is a dated historical value, not a current location.
- Keep screenshots from showing a sliced-off spacecraft, huge white specular blob, or a generic empty star field where an educational story is supposed to be.

## 6. Camera, layout and transition engineering

Do not just tweak the last waypoint and hope. Implement a coherent, testable per-beat composition system:

1. Map `progress` to the active `BEATS` entry and local scene progress, using the same timeline as the DOM. Replace the faulty assumption that global normalized Catmull arc length matches the supplied waypoint timestamps. Interpolate **between correctly timestamped camera poses** or use per-scene curves parameterized by local progress. Position and look target must be evaluated with the same segment and temporal parameter. Ensure FOV is synchronized.
2. Define explicit shot data for each key story beat: `chapter`, `sceneId`, local start/end, camera position, target, FOV, and subject identifier/bounds. Specify whether transitions are continuous, fade-through-black or a deliberate editorial cut. Scenes on different worlds may use a labeled crossfade rather than an impossible unbroken camera path.
3. Calculate framing from `THREE.Box3` or equivalent bounding sphere and account for FOV, aspect ratio, padding and on-screen DOM safe zones. Apply model scale/centering consistently based on its bounds. Confirm camera near/far planes and object lighting. For a close-up, keep the primary object within the visible safe region without clipping; treat the 25–45% rule above as a target, adjust for actual shape and mobile layout.
4. Correct horizon coverage: terrain/sky must cover every view ray in surface shots; avoid seeing plane edges, camera below the surface, holes, or a black strip between terrain and sky. Use modest fog or a sky backdrop only where appropriate and label visual reconstructions. Avoid overbright flat lighting, pure black shadows, and blown-out specular highlights.
5. Make text in normal DOM, not embedded in WebGL. The active scene's title, short explanation, location, date/source and status must not disappear while its scene is held. Do not use `pointer-events: none` on things that must be interactive. Ensure scroll pacing allows reading, and previous/next/chapter navigation does not desynchronize camera and copy.
6. Re-entering a chapter, deep linking, scrolling quickly and reversing must show the right subject. Remove aggressive forced motion for reduced-motion users. Avoid long animations that delay the actual story.
7. Avoid mismatched marker geography: preserve source coordinate convention, uncertainty and actual site versus approximate region. A stylized enlarged icon isn't the real object visible from orbit.

## 7. Loading, performance and accessible alternatives

- Load a minimum set of priority visuals first. Lazy-load chapter-specific GLBs and textures. Use `Suspense` with a real loading state and a failure boundary; if an asset fails or WebGL is unavailable, render a credited image plus the same narrative in reading mode. A grey cube or endless spinner is not an acceptable final state.
- Avoid shipping huge raw datasets; optimize only selected models/textures, set reasonable DPR caps, dispose resources and keep mobile tier lightweight. Don't install a second 3D engine for effects the existing stack can handle.
- Provide keyboard-accessible chapter links, visible focus, meaningful image alt text and source links, and 44px touch targets. Text must remain selectable; no flashing or forced autopilot. Respect `prefers-reduced-motion`; the non-3D path includes full content and credits.
- Test 320px/390px widths and desktop, including landscape, reduced motion, WebGL disabled, asset load failure, reverse scrolling and slow network. Avoid horizontal overflow and text under fixed controls.
- Suggested targets, not proof: critical initial assets around 5 MB or less, other assets lazy-loaded, mobile textures around 1K–2K where suitable, and no obvious hitching during interaction. Measure what you actually ship; report device and conditions, not invented FPS claims.

## 8. Order of implementation and acceptance gates

Build a vertical slice first, then extend it. Do not call the project finished while the shots still look like the attached screenshots.

**M0: diagnostic + baseline** — run the existing app and checks, find actual causes of the camera/overlay/horizon bugs. Report baseline and identify planned fixes.

**M1: polished opening + Apollo 11** — implement the new title/intro, labeled scale transition, NASA-derived Moon globe and a well-composed Apollo shot using a verified model or a properly credited historical photograph. Fix shot timing and camera/DOM sync. Add an explicit “what stayed / what it taught us” panel and its source. Test this entire vertical slice on desktop and phone.

**M2: Mars** — build Mars globe and one high-quality readable InSight or Ingenuity chapter first, then connect Pathfinder and the remaining existing Mars narrative. Fix terrain horizon and object framing, integrate the correct sources.

**M3: beyond** — replace the confusing belt scenes with distinct Ceres/Dawn and Eros/NEAR presentations; then fix Pioneer and Kepler close-ups and readable story. Historical photos are an acceptable high-quality fallback when accurate 3D isn't available.

**M4: review and handoff** — check every beat, not just M1–M3. Fix blank or tiny subjects, broken visuals, hidden copy and reverse-scroll transitions. Run build, lint, available data checks and tests; update docs and assets/credits; deliver actual screen captures when possible and state limitations.

**Visual acceptance checklist:**
- The opening makes the project's subject and navigation clear immediately.
- Moon and Mars are recognizably different. No screenshot shows a floating strip of terrain or a black horizon gap.
- At every featured hardware beat the correct machine or historical image is clearly identified, properly framed and not clipped; its source and whether it is an image or 3D illustration are visible.
- Apollo 11, Apollo 12 and Apollo 15 do not appear together as one actual site. Dawn is in a schematic Ceres orbit, NEAR is connected to Eros, and Pioneer/Kepler are not on a planetary surface.
- Every scene answers at least `Where? What machine? Why did it matter?` using accurate sources. On-screen copy remains readable while the visual is shown.
- Desktop and mobile layouts are intentionally composed. The reading/no-WebGL mode and keyboard navigation carry equivalent information.
- A failed model or texture does not create an empty experience. No fake telemetry, fake certainty or undisclosed AI imagery.
- Before/after visual review was performed on representative scenes, or the final report explicitly says it could not be performed and why.

## 9. Scientific content and existing research

Use Part C section 11 below as the source bank. It includes NASA links, dates, locations, instruments, discoveries, and cautions for Apollo 11/12/15, Surveyor 3, Pathfinder/Sojourner, Spirit/Opportunity, Viking 1, InSight, Dawn, NEAR, Pioneer 10, Ingenuity, Kepler and optional Viking 2, Phoenix, Pioneer 11. Keep the facts connected to exact source URLs, maintain uncertainty, and recheck them when adopting into data files. Do not invent coordinates for a rover's final location. Specific corrections include Dawn's Vesta departure in 2012, not 2017; Ingenuity's famous last-29-seconds navigation clip is from its sixth flight, not its last flight; Pioneer 10's 2003 signal distance is historical, not live.

Give me a final handoff with: (1) what changed; (2) real assets downloaded and credits; (3) actual tests and results; (4) remaining issues or inaccessible sources; and (5) how to run and review the website. Do not claim completion or visual quality that you did not verify.

# Part C — Complete original requirements and extracted NASA research

You are a senior React/Three.js engineer, scientific-visualization designer, and museum storyteller. Improve the existing **Abandoned But Not Forgotten** NASA Space Apps project so a school-age visitor can clearly see **which celestial body they are looking at, where the artifact is, what the hardware did, and what people learned from it**.

## 1. Your mission

Turn the current abstract descent into **The Atlas of Quiet Explorers**: an accessible, scroll-led journey from space to the Moon, Mars, the asteroid belt, and beyond. Preserve the existing quiet documentary voice and the script's narrative arc. The experience should feel like opening a scientific atlas, not operating a fictional spacecraft.

The visual storytelling pattern for each featured mission is:

1. **World:** a recognizable, labeled celestial body and its place in the solar system.
2. **Place:** a correctly located landing site or honestly labeled region.
3. **Machine:** a close-up of the appropriate hardware, clearly identified as a model or historical image.
4. **Discovery:** a simple explanation connecting a component to a scientific result.
5. **Afterward:** what happened to the hardware, with a source and a clear uncertainty note if needed.

Target audience: ages 12+, general public, educators, and judges. Accessible navigation and a readable non-WebGL experience are requirements, not stretch goals. Prioritize a polished, accurate end-to-end demo over a large collection of incomplete scenes. Do not claim this is official NASA software.

### Success in the first minute

- At the opening, the visitor understands that this is a story of real machines and the discoveries they enabled.
- The visitor can see a recognizable Moon and Mars, not just unlabeled colored spheres.
- A labeled destination selection or chapter rail lets the visitor reach the Moon, Mars, and the ending without scrolling through the entire story. Keep scrolling as the primary narrative input; navigation is an accessibility enhancement and explicitly overrides the older “scroll only/no menus” instruction.
- Within the first Moon chapter, show Apollo 11's place on a real-data-derived lunar globe, followed by its descent stage and the seismic experiment. A visitor can answer: “What stayed, what did it do, and why?”
- A visitor using keyboard, mobile, reduced motion, or no WebGL can reach the same essential facts and sources.

## 2. Inspect before changing anything

This is an existing Vite + React 19 + TypeScript app using React Three Fiber, Three.js, Drei, Zustand, Lenis, anime.js, Tailwind/CSS, and an existing scroll story. Do not replace the project or assume older prompt versions describe the current stack.

Read the repository and both project documents first:

- `Abandoned_But_Not_Forgotten_Storytelling_Script.pdf`: the narrative source. Its broad framing and facts must still be checked against primary sources.
- `MASTER_PROMPT_DETAILED_PROMPT.md`: the original 17-scene vision, tone, data rules, and division of work. Treat it as design context, not unquestionable fact. This new brief takes precedence on interactions, factual corrections, and implementation choices.
- `src/App.tsx`, `src/three/CanvasRoot.tsx`, `src/three/CameraRig.tsx`, `src/three/chapters/ChapterSwitch.tsx`, chapter components, `src/three/systems/waypoints.ts` and `project.ts`.
- `src/contracts/beats.ts` and `types.ts`, `src/store.ts`, `src/scroll/useLenis.ts`, `src/data/objects.ts`, `scenes.ts`, `sources.ts`, `widgets.ts`.
- `src/ui/Overlay.tsx`, `ProgressRail.tsx`, `LunarMap.tsx`, `MarsMap.tsx`, `FallbackStory.tsx`, `InventoryTable.tsx`, `Credits.tsx`.
- `docs/ACCEPTANCE.md`, `package.json`, the check scripts, and `README.md`.

Known issues worth verifying rather than assuming fixed:

- `Chapter00Descent.tsx` currently uses mostly untextured spheres; its visible orbit radii and Earth position are not a reliable planetary simulation. It includes only the inner planets. Don't present it as a faithful or complete solar system.
- `MoonTerrain.tsx` uses procedurally generated craters and rocks. It is a visualization, not measured site terrain. Label it as an illustration unless replaced with a verified, correctly aligned site dataset.
- `Chapter01Moon.tsx` renders Eagle, Surveyor, the rover and ALSEP in one shared terrain. Their true sites are distinct. Apollo 12 visited Surveyor 3, not Apollo 11. Do not imply all these objects are co-located. Gate objects by scene or transition between clearly named locations.
- `MarsMap.tsx` has manually positioned SVG markers, including hollow markers for named sites. Do not imply that a hollow pin has a measured coordinate: prefer a separate named-sites list when coordinates are unavailable, or a labeled approximate region tied to a source.
- `App.tsx` currently has a 3,800vh scroll track, an overlay, a chapter rail, a fallback, and map modals. Check their behavior before refactoring. `docs/ACCEPTANCE.md` is a historical status log, not proof that every current feature works or fact has been verified.
- `README.md` describes a different “live telemetry” concept; update it to describe the actual product after implementation. Do not expose simulated data as live.
- `package.json` defines `check-data` and `check-copy` using `ts-node/esm`, but `ts-node` is not listed in devDependencies. Confirm what actually runs. Fix the tooling or document a real alternative; don't silently report checks as passing.

Start by running `npm ci`, `npm run build`, `npm run lint`, and the existing check commands, if feasible. Record existing failures separately from new ones. Inspect the app in a browser if available, and summarize the baseline briefly before editing. Do not erase unrelated features or user work.

## 3. Exact content hierarchy and UX

### Entry and navigation

- Title: **Abandoned but Not Forgotten**. Subtitle: **An atlas of the machines that helped us understand other worlds.**
- Explain in a short, age-appropriate paragraph that some hardware remains on worlds, some remains in orbit or travels onward, and the evidence they gathered still helps researchers.
- Provide “Begin the journey,” “Explore the Moon,” “Explore Mars,” “Read without 3D,” and “Sources.” Use in-page anchors or existing routing, not an unrelated multi-page rebuild.
- A persistent small location indicator answers **WHERE AM I?**: e.g. `SOLAR SYSTEM → MOON → TRANQUILITY BASE`. At each transition state the destination and scale. A visitor should not confuse Earth, the Moon, Mars, Ceres and Eros.
- Clearly mark what is *schematic*, *illustrated*, *historical*, *approximate*, or *not to scale*. Never imply orbit drawings are live tracking. Prefer restrained styling: deep navy, warm parchment text, Moon gray, Mars rust, unobtrusive gold accents, legible contrast. Do not rely on color alone.
- Preserve the chronological/story scene IDs and the single scroll-progress source. Use explicit previous/next or chapter links so the experience is not scroll-only. Any interactive maps are optional, not required to advance the narrative.

### Five named views

1. **Orientation:** A clear schematic Sun and eight named planets, plus Moon relationship where useful. If positions and sizes are not physical, display “Schematic — sizes, spacing and positions not to scale.” Use labels and a simple key, not fictitious real-time motion. Static or subtle motion; no need for ephemeris or expensive simulation.
2. **Moon atlas:** Textured globe derived from a documented lunar global map. Show north/equator, a labeled coordinate system, and source-backed pins for Apollo 11, 12, and 15. Select a pin to reveal a concise card and move the user to the correct story scene. Readable list and keyboard controls must offer equivalent access. Lunar globe color image is a processed visualization, not a real-time camera view.
3. **Mars atlas:** Textured global image from a verified, credited Mars mosaic. Show the same clear hierarchy: globe → site or named region → mission card. If precise coordinates for a specific final site are not verified, show the region in a list rather than inventing a pin. Separate landing location from final resting location for moving vehicles. Do not imply Jezero, Gusev, Meridiani and Ares Vallis are neighboring locations.
4. **Beyond Mars:** Differentiate Ceres, a dwarf planet that Dawn orbits, from Eros, an asteroid where NEAR landed. Kepler and Pioneer are not objects sitting on Mars. Render locations/orbits as labeled conceptual diagrams unless valid dated ephemeris data exists. No false current positions.
5. **Inventory:** A browsable summary with object name, world or orbit, mission purpose, discovery, status and source. Sort by a meaningful explicit date (e.g. mission end date, last contact or last flight). Handle date precision and unknown values; do not mix different event types silently. No invented exact coordinates or dates.

### Mission card: minimum contract

Every featured scene must provide the following content using the existing source-linked data where possible:

- **Name / type** and **where** (site, world or orbit); mission overview/arrival date if verified.
- **Why it went:** one sentence suitable for a 12-year-old.
- **How it worked:** one named component and its task.
- **What it taught us:** one specific, source-supported finding or technology demonstration; explain the link rather than listing trivia.
- **What remains / status:** distinguish landed stage from ascent stage, end of operations from final flight/contact, passive instruments from powered equipment, and static surface site from moving orbit.
- **Source and image/model attribution** visible or clearly accessible nearby. Quote only text verified verbatim against the referenced source. Use meaningful link text.
- Clear evidence tags: `NASA observation`, `historical image`, `3D illustration`, `schematic`, or `estimated` as appropriate. These tags do not replace citations.

Representative stories for the MVP:

- **Apollo 11, Moon:** the descent stage remained; the EASEP seismometer measured lunar vibrations; distinguish the independently deployed passive laser reflector. The jettisoned ascent stage's fate is uncertain according to the NSSDCA record. [A1]
- **Apollo 12 + Surveyor 3, Moon:** identify the two separate spacecraft, their nearby site and the astronauts' collection of Surveyor parts. Surveyor's surface tests helped assess soil support for Apollo. [A2, A4]
- **Apollo 15 LRV, Moon:** a battery-powered vehicle expanded astronauts' geological exploration; show it at Hadley-Apennine, not at Eagle's site. [A3]
- **Pathfinder / Sojourner, Mars:** airbags enabled landing; the rover's instruments and images helped investigate rocks and the possibility of a wetter past. Last data transmission date is a historical fact, not rover coordinates. [A5]
- **Spirit and Opportunity, Mars:** twin geological rovers investigated evidence of ancient water; distinguish their two different locations and individual histories. [A6]
- **InSight, Mars:** a seismometer detected marsquakes and contributed to understanding the planet's interior. Do not imply the heat probe successfully reached its intended depth without separate evidence. [A8]
- **Ingenuity, Mars:** first powered controlled flight on another planet; 72 flights; distinguish last flight from end-of-flight mission announcement and rotor damage. [A12]
- **Dawn, Ceres/Vesta:** one spacecraft visited two bodies; show an orbit around Ceres, not a landing. [A9]
- **NEAR Shoemaker, Eros:** orbiting and controlled touchdown on an asteroid; make it visually different from a planet. [A10]
- **Pioneer 10:** last signal was in 2003, at a historical distance reported by NASA. Show an outgoing trajectory conceptually, not its live position. [A11]
- **Kepler:** heliocentric orbit, not a landing; illustrate detection via a dip in brightness during a transit. [A13]
- **Viking 1:** the lander studied Mars and conducted biology experiments. Explain that the results did not establish life; do not frame debated interpretations as confirmed life. [A7]

If the sprint is short, implement the full experience for Apollo 11, Apollo 12/Surveyor 3, Pathfinder/Sojourner, InSight and Ingenuity first, and retain existing readable source-linked summaries for all other scenes. Do not represent unbuilt scenes as complete. Include Viking 2, Phoenix, Pioneer 11 only if independently sourced and implementable; the user-provided Viking 1, InSight, and Pioneer 10 pages alone do not verify those separate spacecraft.

## 4. Scientific correctness: override earlier documents where needed

- Source claims directly from primary sources below. The original PDF and master prompt are narrative drafts, not proof of correctness. Recheck all public text, existing data, labels, and quotes as you touch them. Track any unresolved issues in `docs/FACT_CHECK.md`.
- Eagle's **descent stage** stayed on the lunar surface. NSSDCA's uncertain fate concerns the jettisoned **ascent stage**. Do not attach the ascent uncertainty to the descent stage. [A1]
- Apollo 11 EASEP and later ALSEP stations are distinct; its early package stopped accepting commands in 1969, not the 1977 network shutdown. The laser retroreflector is passive; do not turn it into a powered active spacecraft. Verify any claim of present-day ranging activity using a suitable current source, or simply say it is a passive reflector. [A1–A3]
- Apollo 12 was near Surveyor 3. Apollo 11 and Apollo 15 were elsewhere. Do not render them together without prominent “not to scale / not co-located” labels; better render correct scenes separately. [A2, A3, A4]
- The older master prompt claims Dawn left Vesta in 2017 but reached Ceres in 2015. This is internally contradictory: verify the Vesta departure date with a primary source before publishing, or omit it. Avoid “forever” and “perpetual” orbital guarantees without evidence; describe Dawn as retired in orbit around Ceres with a citation and date of source.
- Old script statements such as “everything stays exactly where it was put,” “nothing up there moves,” “Pioneer 10 is being tracked to within a metre per second,” or presenting Pioneer as already in interstellar space are not supported by the provided last-signal fact. Remove or qualify them. Orbiters and outbound probes move; last contact is not current position. Use “heading outward on a trajectory” instead of asserting a verified heliopause crossing. [A11, A13]
- No unsourced exact location for a rover's final position; last known region may differ from landing site. A coordinate's precision is not the same as positional accuracy. Preserve longitude convention, latitude type, source epoch and uncertainty where given. Treat unknown as unknown.
- A NASA page may report one historic figure and a newer page another. Record source and date rather than silently combining counts or implying live updates. Do not automatically copy the PDF's unsourced mission claims or assume all quoted passages are exact.
- Mission objects versus component packages may be grouped differently in existing data. Avoid making a “15 objects” claim unless the grouping is explicitly reconciled. Audit sort order and date precision.
- NASA's image/data usage and non-endorsement rules apply, including third-party exceptions. Respect asset-specific terms and credits; no NASA insignia as a brand identity. [R6]

## 5. Concrete data and asset plan

Use actual small, individually selected assets, not an unreviewed bulk clone of huge datasets. Record source URL, exact asset filename, creator/credit, access date, license/terms, changes made, pixel dimensions and purpose. Put the machine-readable manifest under `src/data/` or adjacent to public assets and show it in the Credits UI. Never claim an asset was acquired if you could not download and verify it. If network is unavailable, provide a labeled fallback and a short acquisition checklist; do not fake an image or link to an asset that isn't there.

### Preferred resources, in priority order

- **Moon globe:** NASA Goddard Scientific Visualization Studio's CGI Moon Kit [R1]. It provides a 2K JPEG color map (2048×1024), a 1K displacement JPEG and higher-resolution TIFFs. Use the 2K JPEG as the desktop starting point and produce an appropriately compressed mobile variant only after verifying usage/credit. The page states its color map is processed for visual aesthetics, with gap-filling: label it **NASA LRO-derived visualization** rather than raw/current photograph or precision scientific basemap. Don't commit the giant EXR/TIFF versions. The map is centered at 0° longitude; verify image orientation against the texture and globe.
- **Mars global imagery:** browse NASA's 3D Resources repository textures [R2], identify an actual Mars global texture file, inspect its provenance and projection, and use it only if verified suitable and permitted. The link is a catalog, not a guarantee a particular filename exists. If not found, use a verified NASA/USGS Mars global mosaic and record its projection and processing; if that cannot be obtained, use an honestly labeled schematic globe plus a historical NASA photo and retain the asset task as open.
- **Jezero context:** USGS Mars 2020 CTX/HiRISE landing-site products [R3] are useful for a documented regional crop or later terrain. Check the individual product's projection, coordinates, resolution, terms and enormous download sizes first. Do not claim this is a precise Ingenuity final-location image without a separate source and georeferencing.
- **Reference image:** NASA's Surveyor 3 page includes a historical photograph of Surveyor with the Apollo 12 LM in the background, credit NASA. [A4] NASA's Pathfinder page provides a rover/lander panorama credited NASA/JPL-Caltech; it notes retouching and color processing. [A5] Use these with correct captions and asset-specific credit, as appropriate.
- **Spacecraft models:** NASA's 3D Resources catalog/repository [R2, R4] may contain suitable models. Search for exact Apollo/rover/lander models and confirm the exact asset, its suitability and terms. Convert locally to GLB with optimized geometry and baked or appropriately compressed textures. Avoid inventing unavailable asset URLs. If no suitable model is usable, keep the existing procedural object as a **simplified 3D illustration** and pair it with a credited archival photograph. Never depict the 3D reconstruction as a current photograph or precise damage state.
- **Mission data:** NSSDCA catalog records and NASA Science pages below provide verified narratives and historical coordinates. Convert only checked fields into small local typed datasets, not runtime scraping. For a specific Apollo site, the NSSDCA records provide coordinate/reference-frame details. [A1–A3]
- **AI models / Hugging Face:** not necessary for the MVP. Do not use generative AI to invent geography or mission facts, or send student data to a third party. Only consider a specific model/dataset after verifying license, provenance and whether it provides measurable value. A procedural illustration must never be marketed as measured terrain.

### Practical pipeline

1. Inspect each asset page and download only explicitly chosen, permitted assets. Keep a small source record, include source URL and transformations. For inaccessible sources say so.
2. Convert images into browser-friendly WebP/JPEG as appropriate while preserving equirectangular projection and a mobile-friendly resolution. Color maps use `THREE.SRGBColorSpace`; elevation/roughness/normal maps are non-color data. Avoid aggressive filters that imply nonexistent features. Supply poster images and accessible alt text.
3. For 3D models, use `useGLTF` / `Suspense` with bounded loading states and a safe failure boundary. Do not leave the app stuck blank if a model fails. Keep the existing procedural visualization as fallback. Attribute originals and clearly record modifications.
4. Load only the current chapter and optionally the next one. Reuse cached geometry/materials/textures and dispose resources correctly when no longer needed. Test offline after initial page load by serving local selected assets; external references must not be mandatory for the core journey.
5. Suggested targets, not claims: initial required assets under ~5 MB compressed; total downloaded scene assets ideally under ~20 MB for the MVP, and lower mobile texture tiers. Measure actual sizes and report them. Cap device pixel ratio, avoid massive particle systems and post-processing by default, and provide a low-quality switch.

## 6. Coordinates and atlas implementation

Implement a single shared typed coordinate conversion for maps/globes, with tests. Do not hardcode SVG pixel locations.

- Normalize each source's longitude convention to **east-positive degrees in [-180, 180)** while preserving the original display value and source. North-positive latitude. Don't assume Mars sources all use the same latitude type/reference frame: record convention and don't combine incompatible datasets without explicit conversion.
- For a 2:1 equirectangular image whose longitude range is -180°..180° left-to-right and whose north pole is at the top, use normalized `u=(lonEast+180)/360`, `v=(90-lat)/180`. This is conditional on the actual image's seam and horizontal orientation. If the NASA source map uses a different seam, rotate/reproject consistently or document an offset. Apply the same transform to the image, pins, and globe. Adjust for Three.js texture orientation without silently mirroring east and west.
- A body-local sphere convention you may adopt: for φ = latitude and λ = east-positive longitude, `x = r*cos(φ)*cos(λ)`, `y = r*sin(φ)`, `z = r*cos(φ)*sin(λ)`. Match mesh texture UV orientation and chosen rotation to that convention; keep site markers attached to the rotating globe. Use a normal slightly above the surface and hide or occlude back-side pins.
- Unit-test at least (0°,0°), (0°,90°E), (90°N,0°), and signed longitude normalization. Check Apollo 11 at `0.67416° N, 23.47314° E` from [A1] and Apollo 12 at `3.0128° S, 23.4219° W` from [A2]. Add image-orientation visual checks using known named features. A correct mathematical test alone does not prove the texture is oriented correctly.
- Support values of unknown, region-only, approximate and point precision. Never map an undefined coordinate to 0,0. Don't suggest a global 2K texture resolves a small rover or its exact landing site. Pins are enlarged UI markers, not physical objects, and should be labeled as such.
- Clicking a pin (or selecting its equivalent list button) shows a fact card and its source, and can jump to a relevant story. Clear focus styling, keyboard operability and an accessible equivalent are mandatory.

## 7. Data design and integration

Adapt existing contracts rather than breaking every consumer. Keep `BEATS` and the progress store as the single timeline seam; `BEATS_VERSION` must be incremented and all call sites/tests updated if beat windows change. Keep source data separate from the rendering components. A suggested extension (adapt to existing names):

```ts
type Location =
  | { kind: 'surface'; body: 'moon' | 'mars' | 'eros'; site: string;
      latDeg: number | null; lonEastDeg: number | null;
      coordinateKind: 'point' | 'approximate' | 'region-only';
      originalNotation?: string; referenceFrame?: string; uncertainty?: string;
      sourceId: string }
  | { kind: 'orbit'; centralBody: string; description: string; sourceId: string }
  | { kind: 'trajectory'; description: string; epoch?: string; sourceId: string }

type SourceRecord = { id: string; title: string; url: string; accessed: string }
type Evidence = { text: string; sourceIds: string[]; observationDate?: string }
type AssetRecord = { id: string; localPath: string; originalUrl: string;
  credit: string; termsUrl: string; transformations: string; kind: string }
```

Require explicit source IDs for the historical claims shown on screen, including coordinates and displayed dates. Never populate fake source IDs or asset paths. `null` means unknown, not zero. Render a clear, helpful unknown state. Limit the expansion of types to what the existing code needs; avoid building an unnecessary backend, accounts, API key dependency, or a live data feed. Avoid importing any huge raw science dataset into the client bundle.

## 8. Accessibility, performance, and resilience

- Semantic page landmarks, descriptive headings, normal scroll, focus-visible state, logical tab order, adequate contrast, descriptive alt text, meaningful links, 44px touch targets where practicable, and no color-only meaning.
- Source content must be selectable text, not trapped in WebGL. Annotate visuals with a summary for screen readers; don't put dozens of meaningless objects into the accessibility tree. Don't use ARIA as a substitute for correct HTML.
- For `prefers-reduced-motion`, stop camera fly-throughs and automatic spinning; offer immediate transitions and preserve interactive information. Do not force unnecessary animations when clicking chapter links.
- A complete readable fallback must still allow journey navigation, sites, mission facts, attribution and credits if WebGL fails, context is lost, images fail to load, or the visitor chooses reading mode. Test these modes separately.
- Avoid pointer capture that prevents normal scrolling on mobile. If draggable globes interfere with scrolling, provide explicit rotate buttons and allow text-list navigation. Support 320px-wide screens and landscape; avoid text clipped by fixed overlays.
- No autoplay audio; if optional audio is used, include explicit controls, transcript and credit. Never synthesize historical audio or invented telemetry.
- Test with throttled CPU/network if possible; measure and report results without claiming performance on untested devices.

## 9. Work plan and deliverables

Implement in small runnable milestones. At each milestone report changed files, decisions, commands/results and remaining risks; repair regressions before continuing. If the environment cannot access external asset hosts, continue with a truthful, graceful fallback and list exactly what remains. Do not stop after only providing a plan unless a genuine blocker requires it.

**M0 — Audit and fact-check.** Baseline build/lint/checks, inspect the project and documents, record the specific visual and accuracy gaps and sources. Flag the contradictory Dawn date and wrong co-location, plus any other issue you find. Define a small MVP and what is deferred.

**M1 — Clarity and navigation.** Add clear title, visitor orientation, labeled schematic solar system, destination rail, skip links and reading mode. Keep existing story and scroll seam functioning. Fix misleading visual labels and unsupported live claims. Verify at desktop/mobile and without WebGL.

**M2 — Data-driven Moon.** One properly textured lunar globe if the verified low-resolution asset is available; shared coordinate helper, at least Apollo 11/12/15 sourced pins, list equivalent, evidence labels, scene-specific correctly placed hardware and story cards. Demonstrate Apollo 11 and Apollo 12/Surveyor as distinct places. If asset unavailable, use labeled schematic and record blocker.

**M3 — Data-driven Mars.** Verified Mars globe asset if available, source-backed markers only when precise coordinates and frame match are checked, a named-sites list otherwise, and at least Pathfinder, InSight and Ingenuity cards with component → discovery explanations. Never guess a final rover position.

**M4 — Beyond and inventory.** Differentiate Ceres orbit, Eros surface, Pioneer trajectory and Kepler heliocentric orbit. Integrate old scenes and correct erroneous assertions; enable source navigation and an honest inventory. Mark all simplified scales and non-current positions.

**M5 — QA, documentation and handoff.** Run build, lint, fact/data checks, unit tests for coordinate math and navigation where feasible, and manual browser smoke tests. Review reading mode, reduced motion, keyboard, screen reader labels, WebGL-disabled/context-loss state, missing assets, slow network and 320px width. Produce `docs/FACT_CHECK.md` and asset manifest; update `README.md` with truthful current setup, controls, sources, limitations and verification commands. Record all untested scenarios explicitly.

Suggested test assertions:

- Every rendered known site coordinate has a valid source, correct latitude/longitude range, and convention metadata; unknowns do not create point pins.
- Moon and Mars use different underlying body records; no Apollo 15 LRV is placed in the Apollo 11 scene as if co-located.
- Every featured mission provides purpose, hardware, result, status and source, including in reading mode.
- Sun/solar-system diagrams disclose schematic scale. Pioneer/Kepler are not surface markers; Dawn is a Ceres orbiter and NEAR an Eros surface artifact.
- Pin and keyboard list lead to the same scene, with visible focus and no modal trapping. Verify correct scroll navigation from initial load and reverse scrolling.
- Texture or model loading errors leave readable content and do not show infinite loaders. With reduced motion, no forced fly-through. Verify the public app works from the Vite production build on a static host.

### Definition of done

The result is a working improvement to this repository, not a mockup or a generic landing page. A visitor can identify the body, connect at least five featured machines to their sites and discoveries, inspect citations, use keyboard and no-WebGL reading mode, and distinguish a real historical observation from an illustration. All crucial claims and assets have source/credit records. Build and tests run or failures are reported honestly. End with a concise changelog, actual commands and results, known limitations, and next highest-value steps. Never claim a prize, NASA endorsement, source verification, or successful test you cannot demonstrate.

## 10. Primary resources supplied with the challenge

Use these in the actual app as meaningful source links, not just a hidden list. The supplied list contains Apollo 12 twice; listed once below.

- [A0] NSSDCA catalog: https://nssdc.gsfc.nasa.gov/
- [A1] Apollo 11 Lunar Module / EASEP: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C
- [A2] Apollo 12 Lunar Module / ALSEP: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C
- [A3] Apollo 15 Lunar Module / ALSEP / LRV: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C
- [A4] Surveyor 3: https://science.nasa.gov/mission/surveyor-3/
- [A5] Mars Pathfinder / Sojourner: https://science.nasa.gov/mission/mars-pathfinder/
- [A6] Spirit and Opportunity: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/
- [A7] Viking 1: https://science.nasa.gov/mission/viking-1/
- [A8] InSight: https://science.nasa.gov/mission/insight/
- [A9] Dawn: https://science.nasa.gov/mission/dawn/
- [A10] NEAR Shoemaker: https://science.nasa.gov/mission/near-shoemaker/
- [A11] Pioneer 10: https://science.nasa.gov/mission/pioneer-10/
- [A12] Ingenuity: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/
- [A13] Kepler: https://science.nasa.gov/mission/kepler/
- Challenge: https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/

Additional asset and rights starting points (check individual entries):

- [R1] NASA SVS CGI Moon Kit: https://svs.gsfc.nasa.gov/4720/
- [R2] NASA 3D models and textures: https://github.com/nasa/NASA-3D-Resources
- [R3] USGS Jezero CTX/HiRISE products: https://astrogeology.usgs.gov/search/map/mars-2020-jezero-crater-landing-site-products
- [R4] NASA 3D resource portal: https://science.nasa.gov/3d-resources/
- [R5] Apollo landing sites and experiment locations, linked from NSSDCA: https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.txt
- [R6] NASA image/media usage guidelines: https://www.nasa.gov/nasa-brand-center/images-and-media/

## 11. Research already extracted from every supplied NASA link

**Use the actual data below, not just the links.** These are concise paraphrases extracted from the supplied pages on 15 November 2026. Link each displayed fact to its source, carry event types and original precision into the dataset, and recheck sources if content changes. This is a researched starter set—not a complete download of every NASA archive or a substitute for checking any additional claims. The original list repeats Apollo 12; it is included once here. Supplemental NASA sources are identified separately. Select short story-sized facts rather than putting this whole research section on one screen.

### A0 — NSSDCA archive: the story's memory

Source: https://nssdc.gsfc.nasa.gov/

- The NASA Space Science Data Coordinated Archive describes itself as NASA's permanent archive for space science mission data. Its home page links to a Master Catalog, planetary science, astrophysics, heliophysics, images, and data access.
- Story use: open a legible archival record showing a spacecraft name, its NSSDCA/COSPAR identifier when the record actually supplies one, and a link to the relevant mission page. Do not claim that the archive precisely knows the final location of every spacecraft.
- Visual design: show the record as a real HTML card with selectable text. A visual catalog is a narrative device, not an instrument or a live connection.

### A1 — Apollo 11: Eagle descent stage, EASEP and reflector

Source: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C

- Mission record: Apollo 11 Lunar Module / EASEP, NSSDCA/COSPAR ID **1969-059C**; launch 16 July 1969. Eagle landed on **20 July 1969 at 20:17:40 UT** in Mare Tranquilitatis at **0.67416° N, 23.47314° E**. The page identifies these coordinates as derived from Lunar Reconnaissance Orbiter images in the DE 421 mean Earth/polar rotation-axis reference frame.
- Engineering: the lower descent stage carried the landing rocket and became the launch platform for the ascent stage. It remained on the Moon. The record lists **15,103 kg for the whole LM at launch, including ascent, descent and propellants**; it is not the mass of the discarded descent stage alone.
- Instrument and science: the solar-powered Early Apollo Scientific Experiment Package included a passive seismometer intended to measure lunar seismic activity and interior properties, and a dust detector. It was deployed approximately 17 m south of the LM and turned on at **04:40:39 UT on 21 July 1969**. It stopped accepting commands on **27 August 1969**. A separately deployed laser-ranging retroreflector required no power.
- What is uncertain: the ascent stage later separated from the command module in lunar orbit. The record says its fate is not known and an impact was assumed. Do not assign this uncertainty to the descent stage. Do not imply the seismometer operated until the later ALSEP shutdown.
- Story panel: “The part that landed became a launch pad. Nearby, a seismometer listened for movement inside the Moon.” Show a historical component diagram, source-backed site pin and separate callout for the passive reflector.

### A2 — Apollo 12: Intrepid, ALSEP, and visiting Surveyor

Source: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C

- Mission record: Apollo 12 Lunar Module / ALSEP, ID **1969-099C**. Intrepid landed **19 November 1969 at 06:54:35 UT** in Oceanus Procellarum at **3.0128° S, 23.4219° W**, about **180 m** from Surveyor 3. Coordinates are described as LRO-derived, DE 421 mean Earth/polar rotation-axis reference frame.
- Pete Conrad and Alan Bean collected around **10 kg of Surveyor parts** for examination on Earth. Intrepid's descent stage stayed on the Moon; its ascent stage was intentionally crashed to generate an artificial moonquake recorded by the Apollo 12 seismic station.
- ALSEP: six listed experiments included a passive seismometer, magnetometer, solar wind spectrometer, ion detector, ion gauge and dust detector. A radioisotope thermoelectric generator supplied power to the central station; it was switched on **19 November 1969 at 14:21 UT** and shut down **30 September 1977**. The station coordinates **3.0094° S, 23.4246° W** are not the same as the LM coordinates.
- Story panel: “A new crew landed near an older robot. They brought parts home and left instruments to listen for moonquakes.” Keep the mission year, 180 m distance, and paired historical locations clearly labeled as a site comparison, not the placement of all Apollo vehicles.

### A3 — Apollo 15: Falcon, lunar rover, ALSEP

Source: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C

- Mission record: Apollo 15 Lunar Module / ALSEP, ID **1971-063C**. Falcon landed **30 July 1971 at 22:16:29 UT**, near the Apennine mountains in Mare Imbrium at **26.13239° N, 3.63330° E**; the coordinates are LRO-derived in the record's stated lunar reference frame.
- David Scott and James Irwin used the first Lunar Roving Vehicle on the Moon to reach sites within **5 km** of the LM, making geology observations and collecting samples. The record reports **27.9 km** covered during the surface activities and **77.31 kg** of rock and soil collected.
- Seven ALSEP instruments included a seismometer and heat-flow experiment. The station was turned on **31 July 1971 at 18:37 UT** and shut down **30 September 1977**. The SNAP-27 generator converted heat from radioactive decay into electricity.
- The record's **16,430 kg** is the initial total lunar module mass including propellants, not the mass of its descent stage or rover.
- Story panel: “A foldable electric vehicle extended the astronauts' reach. Science instruments stayed behind and continued gathering data.” Mark the rover as a site illustration, not proof of its precise final parking coordinates.

**Extra LRV-specific NSSDCA source**, https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html: three LRVs were driven, on Apollo 15, 16 and 17. The rover's mass is **210 kg** and it carried two non-rechargeable 36-volt batteries. This rover-specific page reports **27.8 km** driving on Apollo 15; A3 reports **27.9 km** for surface activities. Use the rover-specific number only with its citation and describe what it measures. Do not average them or call the difference an error without further investigation.

### A4 — Surveyor 3: robot soil tests before Apollo

Source: https://science.nasa.gov/mission/surveyor-3/

- Landed **20 April 1967 at 00:04:17 UT** in Oceanus Procellarum, approximately **3° S, 23.41° W** as stated on the page. Its final contact was **4 May 1967**.
- A TV camera and surface sampler returned **6,326 pictures**; the sampler dug four trenches and made bearing and impact tests. Those tests led scientists to conclude the soil was sufficiently supportive for an Apollo lunar module.
- Apollo 12 later landed nearby and astronauts brought back parts including the camera and soil scoop. A4's narrative gives Apollo 12 dates that conflict with A2; use the Apollo 12 NSSDCA UT record for the landing date (19 November) and EVA timing, or explicitly flag the discrepancy. Don't reproduce the conflicting dates without context.
- Story panel: “Before astronauts returned, a robotic scoop tested whether lunar soil could hold their lander.” Pair the documented historical Apollo 12/Surveyor photo with its NASA credit, distinguish image date from present-day appearance.

### A5 — Mars Pathfinder and Sojourner: airbags, wheels and wet Mars

Source: https://science.nasa.gov/mission/mars-pathfinder/

- Pathfinder launched **4 December 1996** and landed **4 July 1997** in **Ares Vallis**, an ancient floodplain. Last mission data transmission: **27 September 1997**. The page does not provide a final rover coordinate; use the region label, not a guessed final pin.
- Engineering: a parachute and airbag system cushioned landing. The airbag-encased lander bounced roughly **15 times**. The **10.6 kg** Sojourner rover carried cameras and an Alpha Proton X-ray Spectrometer to examine rocks and soils; the lander carried atmospheric instruments.
- Science: rounded pebbles and cobbles, among other observations, suggested material formed in running water in a warmer past. Data also showed magnetic airborne dust and early-morning water-ice clouds.
- Story panel: “A bouncing lander delivered a small rover. Its images and rock measurements helped scientists investigate a wetter Mars.” Label the page's Pathfinder panorama historical and processed/retouched, with **NASA/JPL-Caltech** credit as stated.

### A6 — Spirit and Opportunity: geological twins in different places

Source: https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/

- The twin rovers landed on opposite sides of Mars: **Spirit at Gusev Crater on 3 January 2004**, and **Opportunity at Meridiani Planum on 24 January 2004**. These are landing sites, not automatically exact final rover coordinates.
- Both explored the rock record. NASA says their observations confirmed water had stood on the Martian surface for long periods in ancient times.
- Spirit's mission ended in **2010**, after **7.7 km** of travel. Opportunity last communicated **10 June 2018**, during a planet-wide dust storm, after **45.16 km** of travel.
- The page's distance comparison says Perseverance passed Opportunity's record on **11 October 2026**, reaching **45.22 km as of that date**. If shown, date the figure and identify Perseverance as a separate, then-operating rover; don't label that number current or live.
- Story panel: “Two robotic geologists went to different places. Their rocks preserve evidence of ancient water.” Use NASA's cited **NASA/JPL-Caltech/Cornell Univ./Arizona State Univ.** credit for the dated 2014 Opportunity self-portrait if used.

### A7 — Viking 1: an early Mars lander and life-search laboratory

Source: https://science.nasa.gov/mission/viking-1/

- Viking 1 launched **20 August 1975**. Its lander arrived in **Chryse Planitia, 20 July 1976 at 11:53:06 UT**, at **22.483° N, 47.94° W** according to the page. Before rendering a precision map point, verify the Mars coordinate frame and compatibility with the chosen basemap.
- It had cameras, a sampling arm, a biology laboratory, a gas chromatograph mass spectrometer and weather instruments. The lander's seismometer was inoperable. The biology data produced ambiguous readings, while a major organic-compound test was negative; **the mission did not establish life**.
- The lander returned weather reports and was renamed the Thomas Mutch Memorial Station in 1982. On **11 November 1982**, a faulty command interrupted communications; attempts to regain contact failed. Don't claim the entire lander was knowingly switched off or its exact present condition is observed.
- Story panel: “A robotic arm delivered soil to a laboratory. The results raised questions, but did not prove life existed.” Distinguish the lander from the orbiter, whose operations ended in 1980.

### A8 — InSight: listening to the inside of Mars

Source: https://science.nasa.gov/mission/insight/

- InSight launched **5 May 2018** and landed **26 November 2018** in **Elysium Planitia**. The mission page describes the site as centered at approximately **4.5° N, 135.9° E**; this is an approximate location, not a surveyed point claim. Its mission ended **15 December 2022**.
- A robotic arm longer than **1.8 m** deployed a seismometer and a heat-flow probe. The goal was to study the interior of Mars. The page includes a NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell credited recording derived from wind-related vibrations on 1 December 2018; use only with a transcript, permission check and that credit.
- Supplemental primary source for results: https://science.nasa.gov/mission/insight/science-highlights/ says the seismometer detected **more than 1,300 seismic events** and data helped estimate layers inside Mars, including the crust beneath the lander. Do not present the heat probe as having achieved its intended depth without checking another source.
- Story panel: “The seismometer turned tiny ground movements into clues about the layers beneath Mars.” A waveform must be either an identified real recording or clearly marked as a conceptual illustration.

### A9 — Dawn: compare Vesta and Ceres, then remain in orbit

User-supplied source: https://science.nasa.gov/mission/dawn/

- The supplied NASA page describes Dawn as an orbiter launched **27 September 2007** that made extended visits to **Vesta**, a giant asteroid, and **Ceres**, a dwarf planet. Both are in the main asteroid belt between Mars and Jupiter.
- Supplemental catalog record: https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A — Dawn reached Vesta **16 July 2011**, departed **5 September 2012 at 06:26 UT**, entered Ceres orbit **6 March 2015 at 12:29 UT**, and communications ended **31 October 2018** according to that record. The old prompt's 2017 Vesta departure is wrong; replace it. Some sources use other dates/time zones for arrival or the public mission-end announcement, so label the event and the specific source rather than merging values.
- Engineering/science: solar-electric ion propulsion helped Dawn travel between worlds; imaging and spectral mapping helped investigate their surfaces and histories. NASA's challenge resources say it ran out of fuel and remains in Ceres orbit. The NSSDCA page estimates a several-hundred-year orbital lifetime: do not promise “forever.”
- Story panel: “One spacecraft compared two small worlds. After its mission, it stayed in orbit around Ceres.” The depicted orbit is schematic, not a live position.

### A10 — NEAR Shoemaker: orbiting and touching an asteroid

Source: https://science.nasa.gov/mission/near-shoemaker/

- Launched **17 February 1996**; flew past **Mathilde** on 27 June 1997; entered orbit around **433 Eros** on **14 February 2000**. On **12 February 2001 at 19:44 UT**, it touched down just south of Himeros. Last contact: **28 February 2001**.
- Its instruments included a multispectral imager, magnetometer, near-infrared spectrometer, X-ray/gamma-ray spectrometer and laser rangefinder. NASA says data showed Eros had no magnetic field and the near-infrared spectrometer mapped more than 70% of its surface.
- Although not designed as a lander, the spacecraft survived touchdown and sent useful data, especially gamma-ray data, for about two weeks. The location is a named feature, not an exact coordinate.
- Story panel: “An asteroid orbiter descended gently and continued measuring Eros from the surface.” Show Eros as an irregular asteroid and its actual historical mosaic or a labeled 3D approximation, not as Ceres or Mars.

### A11 — Pioneer 10: a Jupiter explorer still traveling outward

Source: https://science.nasa.gov/mission/pioneer-10/

- Launch **2 March 1972**. It passed through the asteroid belt and made closest approach to Jupiter **4 December 1973**. NASA identifies it as the first spacecraft to fly past Jupiter and the first placed on a trajectory to escape the solar system.
- The magnetometer and other instruments studied Jupiter and its environment; the imaging photopolarimeter returned images. Pioneer 10 also used radioisotope power.
- NASA reports its last signal on **23 January 2003**, when it was **12.23 billion km from Earth**, with a signal travel time of **11 hours 20 minutes**. Those are historical values, not present measurements. No precise present location, tracking claim or verified crossing into interstellar space is provided here.
- Story panel: “The signal stopped, but the spacecraft continued outward. Its instruments had already sent home a new view of Jupiter.” Label trajectory illustration “not live, not to scale.”

### A12 — Ingenuity: powered flight on Mars

Source: https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/

- Landed with Perseverance in **Jezero Crater, 18 February 2021**. First powered controlled flight on another planet: **19 April 2021**. Last flight: **18 January 2024**. NASA announced mission completion on **25 January 2024**; rotor damage is stated in the challenge resource and NASA's mission-end announcement: https://www.nasa.gov/news-release/after-three-years-on-mars-nasas-ingenuity-helicopter-mission-ends/.
- Designed as a technology demonstration for no more than **five flights in 30 days**; ultimately completed **72 flights**, about **128.8 minutes** and **17.0 km** total, reaching **24 m** altitude according to the page. These are historical aggregate values, not live telemetry.
- Engineering: mass **1.8 kg**, rotor span about **1.2 m**, solar-charged battery; flight in Martian air less than 1% as dense as Earth's. After the original demonstration it acted as an aerial scout.
- Important correction: the navigation-camera animation described as the **last 29 seconds of flight six** is not the final 29 seconds of its final flight. Never mislabel it. Landing within Jezero is not a precise verified final resting coordinate.
- Story panel: “A helicopter built to test flight in thin air became an aerial scout.” Show historical footage only with date, credit and source; label a rotor-damage depiction as an illustration unless supported by actual imagery.

### A13 — Kepler: detecting planets through starlight

Source: https://science.nasa.gov/mission/kepler/

- Launched **6 March 2009**, Kepler orbited the Sun rather than landing on a planet. It used a telescope and light sensor to observe small dips in a star's brightness when a planet transited in front of it.
- In **May 2013**, the loss of a second reaction wheel ended the original pointing strategy. Engineers used solar pressure for the K2 mission, which completed **19 campaigns**, according to NASA's page.
- NASA retired Kepler on **30 October 2018** after it ran out of fuel. The page attributes **more than 2,600 exoplanet discoveries** to Kepler's legacy; this is not the count of every exoplanet discovered by all missions.
- Story panel: “A telescope watched stars dim slightly. Those tiny dips revealed worlds orbiting other stars.” Build a simple transit demo marked as conceptual; illustrate Kepler in heliocentric orbit, not stationary on the Moon or Mars.

### Additional NASA pages for spacecraft named in the challenge but not covered by their paired link

These are optional scope extensions; they are distinct spacecraft and require separate records and scene cards if implemented.

- **Viking 2:** https://science.nasa.gov/mission/viking-2/ — landed **3 September 1976** in Utopia Planitia; lander mission ended **12 April 1980**. Its biology results were inconclusive. The page gives **47.968° N, 225.71° W** and notes historic difficulty precisely locating the lander from orbiter imagery: preserve its convention and uncertainty; don't treat its digits as guaranteed accuracy.
- **Phoenix:** https://science.nasa.gov/mission/mars-phoenix/ — landed **25 May 2008** in Vastitas Borealis; mission page lists end **2 November 2008**. Its robotic arm and thermal analyzer confirmed subsurface water ice and it detected perchlorate; that does not confirm life. The page's historical panorama caption gives **68.22° N, 234.25° E**. Verify frame/projection before plotting.
- **Pioneer 11:** https://science.nasa.gov/mission/pioneer-11/ — launched **6 April 1973**, flew by Jupiter **3 December 1974** and was the first spacecraft to fly by Saturn on **1 September 1979**. Its Saturn data provided evidence of a magnetic field and revealed the F ring. The page distinguishes NASA Ames last contact on **30 September 1995** from engineering data received **24 November 1995**; do not conflate the two events or invent a current position.

### Asset choices found in the sources

- Lunar globe: NASA SVS CGI Moon Kit https://svs.gsfc.nasa.gov/4720/ offers a 2,048 × 1,024 image at https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg and notes that the visualization is processed for aesthetics, including gap filling. Verify asset terms and alignment before use. This is a **candidate URL**, not an asset already downloaded into the project.
- Mars environment: the Pathfinder page provides a historical, processed “presidential panorama”: https://science.nasa.gov/wp-content/uploads/2024/03/mars-pathfinder-presidential-panorama-lg.jpg ; its caption credits NASA/JPL-Caltech and notes retouching. It is a **site panorama**, not a global texture or photograph of present conditions.
- Surveyor 3 and Apollo 12 historical photograph: https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/07/as12-48-7134_1280.jpg , source A4, credit NASA. Photograph shows Surveyor in foreground and Apollo 12 LM in background.
- Ingenuity flight log (actual historical flight data, not an ML model): https://science.nasa.gov/wp-content/uploads/2024/06/ingenuity-helicopter-flight-log.pdf — linked on A12. Extract and validate if a detailed flight timeline is built; preserve units and dates and credit NASA.
- NASA 3D asset repository: https://github.com/nasa/NASA-3D-Resources — browse and choose exact model/texture only after confirming relevant file, permissions and suitability. No model file has been included or tested just by naming this repository.

# END PROMPT
