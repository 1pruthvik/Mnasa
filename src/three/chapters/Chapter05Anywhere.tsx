import { NasaModel } from '../objects/NasaModel'
import { useStore } from '../../store'
import { StarField } from '../env/StarField'
import { Pioneer10 } from '../objects/Pioneer10'
import { Kepler } from '../objects/Kepler'

export function Chapter05Anywhere() {
  const scene = useStore((s) => s.activeSceneId)
  return (
    <group>
      {/* Cold Deep Space Starlight */}
      <ambientLight intensity={0.65} color="#94a3b8" />
      <directionalLight position={[50, 40, 80]} intensity={2.5} color="#e0e7ff" />

      {/* Sparse Deep-Space Starfield */}
      <StarField density="sparse" />

      {/* Pioneer 10: Interstellar probe with gold plaque and 2.74m dish */}
      {scene === '5.1' && <NasaModel url="/models/pioneer-10.glb" position={[0, 0, -180]} size={8} ground={false} fallback={<Pioneer10 />} />}

      {/* Kepler Space Telescope */}
      {scene === '5.2' && <NasaModel url="/models/kepler.glb" position={[0, 0, -110]} size={8} ground={false} fallback={<Kepler />} />}
    </group>
  )
}

