# COPY THIS PROMPT INTO ANTIGRAVITY

This is a **visual rebuild brief**, written for the existing Mnasa project and the screenshots supplied by the owner. Open the existing project in Antigravity, then copy everything between **BEGIN** and **END**. Keep `ANTIGRAVITY_CELESTIAL_CLARITY_PROMPT.md` in the repository as the companion source of the researched mission facts, source URLs and accuracy rules. This prompt takes priority on visual design and implementation.

---

# BEGIN

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
- **Constraints:** no fake live telemetry, fake distances or fabricated lander positions. Follow the facts and source rules in `ANTIGRAVITY_CELESTIAL_CLARITY_PROMPT.md` (especially its researched section 11). Preserve the existing story, accurate content and functionality while upgrading the presentation.

## 3. Inspect the existing project first; fix actual causes

Read `src/App.tsx`, `src/three/CanvasRoot.tsx`, `src/three/CameraRig.tsx`, `src/three/systems/waypoints.ts`, `src/three/chapters/*`, `src/three/env/*`, `src/three/objects/*`, `src/contracts/beats.ts`, `src/ui/Overlay.tsx`, `src/ui/SceneText.tsx`, `src/scroll/useLenis.ts`, `src/store.ts`, `src/data/{objects,scenes,sources}.ts`, `package.json` and the researched companion prompt.

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

Use `ANTIGRAVITY_CELESTIAL_CLARITY_PROMPT.md` section 11 as the in-repository source bank. It includes NASA links, dates, locations, instruments, discoveries, and cautions for Apollo 11/12/15, Surveyor 3, Pathfinder/Sojourner, Spirit/Opportunity, Viking 1, InSight, Dawn, NEAR, Pioneer 10, Ingenuity, Kepler and optional Viking 2, Phoenix, Pioneer 11. Keep the facts connected to exact source URLs, maintain uncertainty, and recheck them when adopting into data files. Do not invent coordinates for a rover's final location. Specific corrections include Dawn's Vesta departure in 2012, not 2017; Ingenuity's famous last-29-seconds navigation clip is from its sixth flight, not its last flight; Pioneer 10's 2003 signal distance is historical, not live.

Give me a final handoff with: (1) what changed; (2) real assets downloaded and credits; (3) actual tests and results; (4) remaining issues or inaccessible sources; and (5) how to run and review the website. Do not claim completion or visual quality that you did not verify.

# END
