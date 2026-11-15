# NASA 3D Deep Space & Mission Explorer 🚀

An interactive 3D Solar System & NASA Mission Telemetry visualizer built for the NASA Hackathon.

## 🌟 Key Features

- **3D Solar System Visualizer**: Real-time rendering of celestial bodies (The Sun, Earth, Moon, Mars, JWST) using **Three.js** and **React Three Fiber**.
- **Interactive Orbit Mechanics**: Dynamic orbital periods, planetary rotation, and multi-tier orbits (e.g. Moon orbiting Earth).
- **Time Warp Controls**: Real-time simulation speed adjustments (Pause, 1x, 3x, 10x).
- **Mission Control HUD**: Futuristic sci-fi telemetry overlay showing UTC time, physical specs (temperature, distance, orbital period), and active NASA missions (Artemis, Perseverance, JWST, Terra, etc.).
- **NASA Open APIs Integration**: Built-in drawer ready to query NASA Open APIs (such as APOD - Astronomy Picture of the Day) with live image rendering and explanation data.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

## 🛰️ NASA APIs
You can test and hook up live NASA APIs via `https://api.nasa.gov/`.
- Pre-configured with NASA `DEMO_KEY`
- APOD (Astronomy Picture of the Day)
- Extensible to Asteroids NeoWs, Mars Rover Photos, EPIC Earth Imagery, and Exoplanet Archive.
