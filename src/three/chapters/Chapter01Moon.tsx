import { MoonTerrain } from '../env/MoonTerrain'
import { LMDescent } from '../objects/LMDescent'
import { Surveyor } from '../objects/Surveyor'
import { LRV } from '../objects/LRV'
import { ALSEPStation } from '../objects/ALSEPStation'

export function Chapter01Moon() {
  return (
    <group>
      {/* Stark Apollo Directional Sunlight (Stark contrast, minimal fill) */}
      <ambientLight intensity={0.08} color="#94a3b8" />
      <directionalLight
        position={[45, 24, 35]}
        intensity={3.8}
        color="#fffbeb"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Realistic Cratered Lunar Terrain with Boulders and Earthrise */}
      <MoonTerrain />

      {/* Apollo 11 Eagle Descent Stage at [0, 0, 0] */}
      <LMDescent />

      {/* Surveyor 3 (~180m away representation, visited by Apollo 12) */}
      <Surveyor />

      {/* Apollo 15 Lunar Roving Vehicle (LRV) */}
      <LRV />

      {/* Apollo ALSEP Central Science Station & SNAP-27 RTG */}
      <ALSEPStation />
    </group>
  )
}

