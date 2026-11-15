// src/three/CameraRig.tsx
import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { DESCENT } from './systems/waypoints'
import { updatePerfGovernor } from './systems/perf'

export default function CameraRig() {
  const { camera } = useThree()
  const reduced = useStore(s => s.reducedMotion)

  // Two curves: where we are, and what we are looking at. Both authored.
  const { posCurve, lookCurve } = useMemo(() => {
    const posCurve  = new THREE.CatmullRomCurve3(DESCENT.map(w => new THREE.Vector3(...w.pos)),  false, 'catmullrom', 0.5)
    const lookCurve = new THREE.CatmullRomCurve3(DESCENT.map(w => new THREE.Vector3(...w.look)), false, 'catmullrom', 0.5)
    posCurve.arcLengthDivisions = 1200
    lookCurve.arcLengthDivisions = 1200
    return { posCurve, lookCurve }
  }, [])

  // FOV and roll are looked up from the same table by linear interpolation.
  const fovAt = (t: number) => lerpTable(DESCENT, t, w => w.fov)
  const rollAt = (t: number) => lerpTable(DESCENT, t, w => w.roll ?? 0)

  const tmpP = useMemo(() => new THREE.Vector3(), [])
  const tmpL = useMemo(() => new THREE.Vector3(), [])
  const up   = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const clock = useRef(0)

  useFrame((_, dt) => {
    // RAW progress. No smoothing here — Lenis already smooths upstream.
    const state = useStore.getState()
    const t = state.progress
    const activeChapter = state.activeChapter
    const isFrozen = activeChapter === 'ch03-mars-long' && t >= 0.63

    clock.current += dt
    updatePerfGovernor(performance.now())

    posCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpP)
    lookCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpL)

    // Handheld drift: tiny, non-repeating, killed under reduced motion or Ingenuity freeze
    if (!reduced && !isFrozen) {
      const d = 0.004
      tmpP.x += Math.sin(clock.current * 0.31) * d
      tmpP.y += Math.sin(clock.current * 0.23 + 1.7) * d
    }

    camera.position.copy(tmpP)

    // In Chapter 05 (Anywhere), camera.up drifts gently by ±12 deg to disorient ground
    if (activeChapter === 'ch05-anywhere') {
      const uCh05 = THREE.MathUtils.clamp((t - 0.760) / 0.100, 0, 1)
      const rollAngle = Math.sin(uCh05 * Math.PI * 2) * (12 * (Math.PI / 180))
      camera.up.set(Math.sin(rollAngle), Math.cos(rollAngle), 0).normalize()
    } else {
      camera.up.copy(up)
    }

    camera.lookAt(tmpL)

    // Roll after lookAt, so it is a true camera roll.
    const rollDeg = rollAt(t) + ((reduced || isFrozen) ? 0 : Math.sin(clock.current * 0.19) * 1.2)
    camera.rotateZ(THREE.MathUtils.degToRad(rollDeg))

    const fov = fovAt(t)
    const pCam = camera as THREE.PerspectiveCamera
    if (Math.abs(pCam.fov - fov) > 0.01) {
      pCam.fov = fov
      pCam.updateProjectionMatrix()
    }
  })

  return null
}

function lerpTable<T extends { t: number }>(rows: T[], t: number, pick: (r: T) => number): number {
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i]!
    const b = rows[i + 1]!
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t || 1)
      return pick(a) + (pick(b) - pick(a)) * k
    }
  }
  return pick(rows[t <= rows[0]!.t ? 0 : rows.length - 1]!)
}
