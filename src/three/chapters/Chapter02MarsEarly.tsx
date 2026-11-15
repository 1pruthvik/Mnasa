import { useStore } from '../../store'
import { MarsTerrain } from '../env/MarsTerrain'
import { VikingLander } from '../objects/VikingLander'
import { PathfinderLander } from '../objects/PathfinderLander'

export function Chapter02MarsEarly() {
  const scene = useStore((s) => s.activeSceneId)
  return (
    <group>
      {/* Warm Diffuse Martian Sunlight & Atmosphere Fill */}
      <ambientLight intensity={0.95} color="#f2ded0" />
      <directionalLight
        position={[35, 45, 20]}
        intensity={2.8}
        color="#ffedd5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />

      {/* Martian Red-Ochre Basin Terrain */}
      <MarsTerrain />


      {/* Viking 1 Lander at Chryse Planitia */}
      {scene === '2.1' && <VikingLander />}

      {/* Pathfinder Lander & Sojourner Rover at Ares Vallis */}
      {scene === '2.2' && <PathfinderLander />}
    </group>
  )
}

