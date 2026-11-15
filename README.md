# Abandoned, but not forgotten

An experimental, interactive story about NASA machines and the discoveries they left behind. Explore 17 scenes from the Moon to Mars and beyond, inspired by the cinematic orientation and exploratory spirit of Martian Map. The spacecraft and landscapes are **illustrative 3D models**, not exact, current depictions of their locations or condition. Apollo Lunar Module, Viking, Opportunity, InSight, Ingenuity, Dawn, NEAR, Pioneer 10 and Kepler use NASA 3D Resources models with procedural fallbacks; Pathfinder and Sojourner use a model by Space Radar contributors (MIT); see `public/models/ATTRIBUTION.md`.

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run dev -- --host 0.0.0.0
npm run build
npm run lint
npm run check-data
npm run check-copy
npm run check-story
npm run check-playback
```

Choose **Play demo** for a self-playing, approximately seven-minute tour at 1× (the speed selector can make it shorter or longer) (pause, resume, previous, next, speed and exit are available), or **Scroll to explore** for manual navigation. Wheel, touch or navigation-key input pauses a playing demo. Chapter buttons, the Moon/Mars atlas, credits, interactive story widgets and a reading fallback remain available. Open the top-right menu for maps, sources, reading mode and replay; expand “Explore details” for scene-specific widgets. Opening details or the 3D explorer pauses the guided story. Select **Explore in 3D** for draggable Earth, Moon, Mars and other maps or NASA spacecraft; rotation buttons provide a keyboard-accessible alternative. Earth is a color-coded relief map and Venus is a colorized radar surface; the Sun is schematic. Reduced-motion or unavailable WebGL uses the reading version instead of the animated canvas.

Scene facts link to NASA sources; maps and 3D scenes are schematic, not live tracking. The project is not affiliated with or endorsed by NASA. The story text and archive data are inherited from the existing project and still need a full scientific fact-check. Several other spacecraft remain procedural illustrations; expanding model coverage and reviewing every shot and transition visually are outstanding work.

The reference experience is https://martianmap.us/ . NASA source links appear in the story, archive and credits. The galaxy artwork is an AI-generated illustration, not a photograph of the Milky Way. The Earth, Moon, Mars, Venus and Jupiter global maps are NASA resources; the lunar globe uses the LROC-based NASA SVS Moon Kit. The local terrain uses repeated, processed crops from Apollo 11 and Spirit surface photographs, plus procedural topography and rocks; it remains an illustration, not a mapped landing site. Earth-to-Moon and Moon-to-Mars transit shots use schematic camera travel and are not to scale; scene transitions elsewhere remain edited cuts; see `public/images/ATTRIBUTION.md`. See `ANTIGRAVITY_COMPLETE_PROMPT.md` for the researched mission facts and proposed future enhancements.
