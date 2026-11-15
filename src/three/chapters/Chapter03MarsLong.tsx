import { useStore } from '../../store'
import { NasaModel } from '../objects/NasaModel'
import { MarsTerrain } from '../env/MarsTerrain'
import { OpportunityRover } from '../objects/OpportunityRover'
import { InSightLander } from '../objects/InSightLander'
import { Ingenuity } from '../objects/Ingenuity'

export function Chapter03MarsLong() {
  const scene = useStore((s) => s.activeSceneId)
  return (
    <group>
      {/* Martian Afternoon Sunlight */}
      <ambientLight intensity={1.0} color="#f2ded0" />
      <directionalLight
        position={[40, 35, -15]}
        intensity={2.6}
        color="#fed7aa"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />

      {/* Martian Surface Terrain */}
      <MarsTerrain />


      {/* Opportunity Rover at Perseverance Valley */}
      {scene === '3.1' && <OpportunityRover />}

      {/* InSight Lander at Elysium Planitia */}
      {scene === '3.2' && <NasaModel url="/models/insight.glb" position={[4, -0.2, -6]} size={8} fallback={<InSightLander />} />}

      {/* Ingenuity Mars Helicopter with animated rotors */}
      {scene === '3.3' && <NasaModel url="/models/ingenuity.glb" position={[8, 9.2, -2]} size={2.6} ground={false} fallback={<Ingenuity />} />}
    </group>
  )
}

