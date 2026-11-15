import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { DESCENT } from './systems/waypoints'

function lerpTable(rows: { t: number }[], t: number, pick: (r: any) => number) {
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i]
    const b = rows[i + 1]
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t || 1)
      return pick(a) + (pick(b) - pick(a)) * k
    }
  }
  return pick(rows[t <= rows[0].t ? 0 : rows.length - 1])
}

export default function CameraRig() {
  const { camera } = useThree()
  const reduced = useStore((s) => s.reducedMotion)

  // Two curves: camera position and look target
  const { posCurve, lookCurve } = useMemo(() => {
    const posCurve = new THREE.CatmullRomCurve3(
      DESCENT.map((w) => new THREE.Vector3(...w.pos)),
      false,
      'catmullrom',
      0.5
    )
    const lookCurve = new THREE.CatmullRomCurve3(
      DESCENT.map((w) => new THREE.Vector3(...w.look)),
      false,
      'catmullrom',
      0.5
    )
    posCurve.arcLengthDivisions = 1200
    lookCurve.arcLengthDivisions = 1200
    return { posCurve, lookCurve }
  }, [])

  const fovAt = (t: number) => lerpTable(DESCENT, t, (w) => w.fov)
  const rollAt = (t: number) => lerpTable(DESCENT, t, (w) => w.roll ?? 0)

  const tmpP = useMemo(() => new THREE.Vector3(), [])
  const tmpL = useMemo(() => new THREE.Vector3(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const clock = useRef(0)

  useFrame((_, dt) => {
    // RAW progress. No smoothing here — Lenis smooths upstream
    const t = useStore.getState().progress
    clock.current += dt

    posCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpP)
    lookCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpL)

    // Handheld micro-drift
    if (!reduced) {
      const d = 0.004
      tmpP.x += Math.sin(clock.current * 0.31) * d
      tmpP.y += Math.sin(clock.current * 0.23 + 1.7) * d
    }

    camera.position.copy(tmpP)
    camera.up.copy(up)
    camera.lookAt(tmpL)

    // Roll after lookAt
    const rollDeg = rollAt(t) + (reduced ? 0 : Math.sin(clock.current * 0.19) * 1.2)
    camera.rotateZ(THREE.MathUtils.degToRad(rollDeg))

    const fov = fovAt(t)
    if (Math.abs((camera as THREE.PerspectiveCamera).fov - fov) > 0.01) {
      ;(camera as THREE.PerspectiveCamera).fov = fov
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }
  })

  return null
}

