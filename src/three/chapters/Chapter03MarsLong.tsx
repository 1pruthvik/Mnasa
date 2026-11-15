import { MarsTerrain } from '../env/MarsTerrain'
import { DustField } from '../env/DustField'
import { OpportunityRover } from '../objects/OpportunityRover'
import { InSightLander } from '../objects/InSightLander'
import { Ingenuity } from '../objects/Ingenuity'
import { useStore } from '../../store'
import { beatAt } from '../../contracts/beats'

export function Chapter03MarsLong() {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneId = beat.sceneId

  return (
    <group>
      {/* Martian Afternoon Sunlight */}
      <ambientLight intensity={0.35} color="#c2410c" />
      <directionalLight
        position={[40, 35, -15]}
        intensity={2.6}
        color="#fed7aa"
        castShadow
      />

      {/* Martian Surface Terrain */}
      <MarsTerrain />

      {/* Drifting Dust */}
      <DustField />

      {/* Scene 3.1: Opportunity Rover at Meridiani Planum */}
      {sceneId === '3.1' && <OpportunityRover />}

      {/* Scene 3.2: InSight Lander at Elysium Planitia */}
      {sceneId === '3.2' && <InSightLander />}

      {/* Scene 3.3: Ingenuity Mars Helicopter at Jezero Crater */}
      {sceneId === '3.3' && <Ingenuity />}
    </group>
  )
}
