import { MarsTerrain } from '../env/MarsTerrain'
import { DustField } from '../env/DustField'
import { VikingLander } from '../objects/VikingLander'
import { PathfinderLander } from '../objects/PathfinderLander'

export function Chapter02MarsEarly() {
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

      {/* Viking 1 Lander at Chryse Planitia */}
      <VikingLander />

      {/* Pathfinder Lander & Sojourner Rover at Ares Vallis */}
      <PathfinderLander />
    </group>
  )
}

