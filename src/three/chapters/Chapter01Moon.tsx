import { MoonTerrain } from '../env/MoonTerrain'
import { LMDescent } from '../objects/LMDescent'
import { Surveyor } from '../objects/Surveyor'
import { LRV } from '../objects/LRV'
import { ALSEPStation } from '../objects/ALSEPStation'
import { useStore } from '../../store'
import { beatAt } from '../../contracts/beats'

export function Chapter01Moon() {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneId = beat.sceneId

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

      {/* Scene 1.1: Apollo 11 Eagle Descent Stage at Tranquility Base */}
      {sceneId === '1.1' && <LMDescent />}

      {/* Scene 1.2: Surveyor 3 & Apollo 12 Intrepid (~180m apart in Oceanus Procellarum) */}
      {sceneId === '1.2' && (
        <>
          <Surveyor />
          {/* Apollo 12 Intrepid Descent Stage ~180m away */}
          <group position={[18, 0, 14]} scale={[0.9, 0.9, 0.9]}>
            <LMDescent />
          </group>
        </>
      )}

      {/* Scene 1.3: Apollo 15 LRV at Hadley-Apennine */}
      {sceneId === '1.3' && (
        <>
          <LRV />
          {/* Apollo 15 Falcon Descent Stage in background */}
          <group position={[28, 0, -10]} scale={[0.85, 0.85, 0.85]}>
            <LMDescent />
          </group>
        </>
      )}

      {/* Scene 1.4: Apollo ALSEP Central Science Station & SNAP-27 RTG */}
      {sceneId === '1.4' && <ALSEPStation />}
    </group>
  )
}
