import { useStore } from '../../store'
import { NasaModel } from '../objects/NasaModel'
import { MoonTerrain } from '../env/MoonTerrain'
import { LMDescent } from '../objects/LMDescent'
import { Surveyor } from '../objects/Surveyor'
import { LRV } from '../objects/LRV'
import { ALSEPStation } from '../objects/ALSEPStation'

export function Chapter01Moon() {
  const scene = useStore((s) => s.activeSceneId)
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
      {scene === '1.1' && <NasaModel url="/models/apollo-lunar-module.glb" position={[0, -0.2, 0]} size={7.5} fallback={<LMDescent />} />}

      {/* Surveyor 3 (~180m away representation, visited by Apollo 12) */}
      {scene === '1.2' && <Surveyor />}

      {/* Apollo 15 Lunar Roving Vehicle (LRV) */}
      {scene === '1.3' && <LRV />}

      {/* Apollo ALSEP Central Science Station & SNAP-27 RTG */}
      {scene === '1.4' && <ALSEPStation />}
    </group>
  )
}

