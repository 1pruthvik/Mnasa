import { useState } from 'react'
import { SpaceCanvas } from './components/SpaceCanvas'
import { HUD } from './components/HUD'
import { NasaApiDrawer } from './components/NasaApiDrawer'
import { CELESTIAL_BODIES } from './data/spaceData'
import type { CelestialBodyData } from './types'

export function App() {
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData>(CELESTIAL_BODIES[1]) // Default to Earth
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1)
  const [isApiDrawerOpen, setIsApiDrawerOpen] = useState<boolean>(false)

  return (
    <main className="w-screen h-screen relative overflow-hidden bg-slate-950">
      {/* 3D Scene Viewport */}
      <SpaceCanvas
        selectedBody={selectedBody}
        onSelectBody={setSelectedBody}
        speedMultiplier={speedMultiplier}
      />

      {/* Mission Control HUD Overlay */}
      <HUD
        selectedBody={selectedBody}
        onSelectBody={setSelectedBody}
        speedMultiplier={speedMultiplier}
        setSpeedMultiplier={setSpeedMultiplier}
        onToggleApiDrawer={() => setIsApiDrawerOpen(!isApiDrawerOpen)}
      />

      {/* NASA API Telemetry & Data Drawer */}
      <NasaApiDrawer
        isOpen={isApiDrawerOpen}
        onClose={() => setIsApiDrawerOpen(false)}
      />
    </main>
  )
}

export default App
