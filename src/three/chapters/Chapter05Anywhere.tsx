import { StarField } from '../env/StarField'
import { Pioneer10 } from '../objects/Pioneer10'
import { Kepler } from '../objects/Kepler'
import { useStore } from '../../store'
import { beatAt } from '../../contracts/beats'

export function Chapter05Anywhere() {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneId = beat.sceneId

  return (
    <group>
      {/* Cold Deep Space Starlight */}
      <ambientLight intensity={0.06} color="#94a3b8" />
      <directionalLight position={[50, 40, 80]} intensity={2.5} color="#e0e7ff" />

      {/* Sparse Deep-Space Starfield */}
      <StarField density="sparse" />

      {/* Scene 5.1: Pioneer 10 interstellar trajectory */}
      {sceneId === '5.1' && <Pioneer10 />}

      {/* Scene 5.2: Kepler Space Telescope heliocentric orbit */}
      {sceneId === '5.2' && <Kepler />}
    </group>
  )
}
