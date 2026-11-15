# Abandoned, but not forgotten

An experimental, interactive story about NASA machines and the discoveries they left behind. Explore 17 scenes from the Moon to Mars and beyond, inspired by the cinematic orientation and exploratory spirit of Martian Map. The spacecraft and landscapes are **illustrative 3D models**, not exact, current depictions of their locations or condition. Apollo Lunar Module, InSight and Ingenuity use NASA 3D Resources models with procedural fallbacks; see `public/models/ATTRIBUTION.md`.

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
```

Choose **Play guided demo** for a paragraph-by-paragraph tour (pause, resume, previous, next, speed and exit are available), or **Scroll to explore** for manual navigation. Wheel, touch or navigation-key input pauses a playing demo. Chapter buttons, the Moon/Mars atlas, credits, interactive story widgets and a reading fallback remain available. Open the top-right menu for maps, sources, reading mode and replay; expand “Explore details” for scene-specific widgets. Opening details pauses the guided story. Reduced-motion or unavailable WebGL uses the reading version instead of the animated canvas.

Scene facts link to NASA sources; maps and 3D scenes are schematic, not live tracking. The project is not affiliated with or endorsed by NASA. The story text and archive data are inherited from the existing project and still need a full scientific fact-check. Several other spacecraft remain procedural illustrations; expanding model coverage and reviewing every shot and transition visually are outstanding work.

The reference experience is https://martianmap.us/ . NASA source links appear in the story, archive and credits. See `ANTIGRAVITY_COMPLETE_PROMPT.md` for the researched mission facts and proposed future enhancements.
