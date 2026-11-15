# Abandoned but Not Forgotten: The Atlas of Quiet Explorers 🚀

**An accessible, scroll-led atlas of the machines that helped us understand other worlds.**  
*NASA Space Apps Challenge 2026 · Independent Educational Project*

---

## 📖 Mission & Educational Purpose

Between 1967 and today, humanity sent robotic and crewed explorers across the solar system. When their missions concluded or fuel was exhausted, the hardware remained: on the regolith of the Moon, across the basalt dunes of Mars, in stable orbits around asteroids, or coasting outward on escape trajectories into interstellar space.

**The Atlas of Quiet Explorers** tells their story for school-age students (ages 12+), educators, and the public. For every featured machine, visitors discover:
1. **World**: A recognizable celestial body in our solar system.
2. **Place**: A verified landing site or clearly labeled region.
3. **Machine**: High-fidelity 3D structural model or historical archival imagery.
4. **Discovery**: The direct link between a hardware component and a scientific breakthrough.
5. **Afterward**: What happened to the hardware, with uncertainty notes where historical outcomes are unconfirmed.

---

## 🌟 Key Features

- **Continuous 3D Camera Descent**: Smoothly navigates from the deep Milky Way and Sun down through the Moon, Mars, Asteroid Belt, and Interstellar space.
- **Persistent "WHERE AM I?" Breadcrumb**: Always displays current location hierarchy (e.g. `SOLAR SYSTEM → MOON → TRANQUILITY BASE`).
- **Quick Destination Navigation**: Jump immediately between Space, Moon, Mars, Asteroids, Deep Space, and the Archive without forced scrolling.
- **Structured 5-Part Mission Cards**: Provides concise, age-appropriate answers for every mission:
  - *Why It Went*
  - *How the Hardware Worked*
  - *What It Taught Us*
  - *Afterward & What Remains*
  - Direct citations to official NASA NSSDC/PDS archives
- **Interactive Lunar & Martian Surface Atlases**:
  - Near-side Moon map with LRO DE 421 coordinates (Apollo 11, 12, 15).
  - 2:1 Equirectangular Mars map separating verified measured coordinates from named regional sites.
- **Scientific Coordinate Utilities**: Typed conversion between latitude/longitude, 2:1 equirectangular UV mapping, and 3D spherical Cartesian projection.
- **Universal Accessibility & Reading Mode**:
  - Full non-WebGL **Reading Mode** (`Alt+R` or header button) providing the entire narrative, mission cards, quotes, and data tables.
  - Semantic landmarks, skip links, ARIA labels, and WCAG AA contrast.
  - Native support for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **3D Graphics & Post-Processing**: Three.js + React Three Fiber + Drei + postprocessing (Bloom)
- **State & Motion**: Zustand + Lenis scroll engine + anime.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## 🔬 Scientific Data & Citations

Every displayed number, coordinate, and date traces back to primary NASA sources:
- **Apollo 11 (NSSDCA 1969-059C)**: Mare Tranquillitatis (`0.67416° N, 23.47314° E`). Descent stage remains; ascent stage fate unknown.
- **Apollo 12 & Surveyor 3 (NSSDCA 1969-099C & NASA Science)**: Oceanus Procellarum (`3.0128° S, 23.4219° W`). 180 m proximity verified.
- **Apollo 15 LRV (NSSDCA 1971-063C)**: Hadley-Apennine (`26.13239° N, 3.63330° E`). 27.8 km driven.
- **Viking 1 (NASA Science)**: Chryse Planitia (`22.483° N, 47.94° W`). Did not establish life; organic tests negative.
- **Mars Pathfinder & Sojourner (NASA Science)**: Ares Vallis ancient catastrophic floodplain.
- **Spirit & Opportunity (NASA Science)**: Gusev Crater & Meridiani Planum (opposite sides of Mars).
- **InSight (NASA Science)**: Elysium Planitia (`4.5° N, 135.9° E`). >1,300 marsquakes recorded.
- **Ingenuity (NASA Mars 2020)**: Jezero Crater. 72 flights; retired 25 January 2024 following rotor damage.
- **Dawn (NASA Science & NSSDCA 2007-043A)**: Departed Vesta September 2012; entered Ceres orbit March 2015.
- **NEAR Shoemaker (NASA Science)**: Touched down on Asteroid 433 Eros on 12 February 2001.
- **Pioneer 10 (NASA Science)**: Last signal 23 January 2003 at 12.23 billion km (81.8 AU).
- **Kepler (NASA Science)**: Earth-trailing heliocentric orbit; 2,600+ exoplanets confirmed.

Full audit records and discrepancy resolutions are documented in [`docs/FACT_CHECK.md`](docs/FACT_CHECK.md).

---

## 🚀 Development & Verification

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Quality & Data Verification Audits
```bash
# Check 15 canonical objects data integrity
npm run check-data

# Check NASA voice, tone & forbidden vocabulary rules
npm run check-copy

# Check NASA credits, sources & archival citations
npm run check-credits

# Run coordinate conversion & Haversine distance unit tests
npx tsx scripts/test-coordinates.ts

# Run linter
npm run lint

# Production build
npm run build
```

---

## 📜 Disclaimer

This project is an independent educational entry created for the **NASA Space Apps Challenge 2026**. It is **not** official NASA software, and is not endorsed by NASA or the United States Government. 3D models and planetary orbits are schematic educational visualizations.
