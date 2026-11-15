import { MarsTerrain } from '../env/MarsTerrain'
import { DustField } from '../env/DustField'
import { VikingLander } from '../objects/VikingLander'
import { PathfinderLander } from '../objects/PathfinderLander'
import { useStore } from '../../store'
import { beatAt } from '../../contracts/beats'

export function Chapter02MarsEarly() {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneId = beat.sceneId

  return (
    <group>
      {/* Warm Diffuse Martian Sunlight & Atmosphere Fill */}
      <ambientLight intensity={0.4} color="#9a3412" />
      <directionalLight
        position={[35, 45, 20]}
        intensity={2.8}
        color="#ffedd5"
        castShadow
      />

      {/* Martian Red-Ochre Basin Terrain */}
      <MarsTerrain />

      {/* Drifting Airborne Dust Particles */}
      <DustField />

      {/* Scene 2.1: Viking 1 Lander at Chryse Planitia */}
      {sceneId === '2.1' && <VikingLander />}

      {/* Scene 2.2: Pathfinder Lander & Sojourner Rover at Ares Vallis */}
      {sceneId === '2.2' && <PathfinderLander />}
    </group>
  )
}
