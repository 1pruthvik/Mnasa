import { MarsTerrain } from '../env/MarsTerrain'
import { DustField } from '../env/DustField'
import { OpportunityRover } from '../objects/OpportunityRover'
import { InSightLander } from '../objects/InSightLander'
import { Ingenuity } from '../objects/Ingenuity'

export function Chapter03MarsLong() {
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

      {/* Opportunity Rover at Perseverance Valley */}
      <OpportunityRover />

      {/* InSight Lander at Elysium Planitia */}
      <InSightLander />

      {/* Ingenuity Mars Helicopter with animated rotors */}
      <Ingenuity />
    </group>
  )
}

