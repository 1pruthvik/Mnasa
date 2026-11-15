# Antigravity prompt: make the worlds clear, make the machines matter

**How to use:** Open this repository in Antigravity. Paste everything from **BEGIN PROMPT** to **END PROMPT** into the agent. Ask it to work milestone by milestone. This is an upgrade brief for the existing website, not a request to start another project.

---

# BEGIN PROMPT

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
