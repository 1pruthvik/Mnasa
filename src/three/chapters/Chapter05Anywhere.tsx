// src/three/chapters/Chapter05Anywhere.tsx
import { useMemo } from 'react'
import { useStore } from '../../store'
import { localU } from '../../contracts/beats'
import { WORLD_SCALE } from '../systems/project'
import { useDisposeRegistry } from '../systems/dispose'
import StarField from '../env/StarField'
import Pioneer10 from '../objects/Pioneer10'
import Kepler from '../objects/Kepler'

export default function Chapter05Anywhere() {
  useDisposeRegistry()
  const progress = useStore(s => s.progress)

  // Local progress:
  // Scene 5.1 (Pioneer 10): t in [0.760, 0.810]
  const uPioneer = localU(progress, 0.760, 0.810)
  // Scene 5.2 (Kepler): t in [0.810, 0.860]
  const uKepler = localU(progress, 0.810, 0.860)

  // 1. Pioneer 10: constant drift along vector + slow tumble + dish glint + 15% distance shrink at u=0.9
  const pioneerTumble = uPioneer * Math.PI * 1.5
  const pioneerGlint = Math.max(0, 1 - Math.abs(uPioneer - 0.45) / 0.08)
  const pioneerScaleMult = uPioneer > 0.88 ? 1.0 - 0.15 * Math.min(1, (uPioneer - 0.88) / 0.08) : 1.0
  const pioneerPos = useMemo<[number, number, number]>(() => [-4, 0, 8], [])

  // 2. Kepler: slow tumble + aperture rotates into view + transit blink at u=0.7
  const keplerPos = useMemo<[number, number, number]>(() => [6, -1, -12], [])
  const keplerRotX = -0.4 + uKepler * 1.2
  const keplerRotY = 0.3 + uKepler * 0.8

  return (
    <group>
      {/* Sparse StarField with no planets */}
      <StarField density="sparse" />

      {/* Raking key light far away — NO AMBIENT FILL */}
      <directionalLight
        position={[40, 20, 60]}
        intensity={2.0}
        color="#e8f0ff"
      />

      {/* Scene 5.1 — Pioneer 10 */}
      <group
        position={pioneerPos}
        scale={WORLD_SCALE * pioneerScaleMult}
        rotation={[0.2, pioneerTumble, 0.1]}
      >
        <Pioneer10 glint={pioneerGlint} />
      </group>

      {/* Scene 5.2 — Kepler */}
      <group
        position={keplerPos}
        scale={WORLD_SCALE}
        rotation={[keplerRotX, keplerRotY, 0.1]}
      >
        <Kepler transitU={uKepler} />
      </group>
    </group>
  )
}
