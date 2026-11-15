import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { DESCENT, type WP } from './systems/waypoints'

function interpolateVec3(wps: WP[], t: number, key: 'pos' | 'look', out: THREE.Vector3): void {
  if (t <= wps[0].t) {
    out.set(...wps[0][key])
    return
  }
  if (t >= wps[wps.length - 1].t) {
    out.set(...wps[wps.length - 1][key])
    return
  }

  let i = 0
  while (i < wps.length - 2 && wps[i + 1].t <= t) {
    i++
  }

  const w0 = wps[Math.max(0, i - 1)]
  const w1 = wps[i]
  const w2 = wps[Math.min(wps.length - 1, i + 1)]
  const w3 = wps[Math.min(wps.length - 1, i + 2)]

  const dt = w2.t - w1.t || 1e-5
  const u = Math.min(1, Math.max(0, (t - w1.t) / dt))

  const dt0 = w2.t - w0.t || 1e-5
  const dt1 = w3.t - w1.t || 1e-5

  const u2 = u * u
  const u3 = u2 * u
  const h00 = 2 * u3 - 3 * u2 + 1
  const h10 = u3 - 2 * u2 + u
  const h01 = -2 * u3 + 3 * u2
  const h11 = u3 - u2

  const p0 = w0[key]
  const p1 = w1[key]
  const p2 = w2[key]
  const p3 = w3[key]

  const m0x = ((p2[0] - p0[0]) / dt0) * dt
  const m1x = ((p3[0] - p1[0]) / dt1) * dt
  const rx = h00 * p1[0] + h10 * m0x + h01 * p2[0] + h11 * m1x

  const m0y = ((p2[1] - p0[1]) / dt0) * dt
  const m1y = ((p3[1] - p1[1]) / dt1) * dt
  const ry = h00 * p1[1] + h10 * m0y + h01 * p2[1] + h11 * m1y

  const m0z = ((p2[2] - p0[2]) / dt0) * dt
  const m1z = ((p3[2] - p1[2]) / dt1) * dt
  const rz = h00 * p1[2] + h10 * m0z + h01 * p2[2] + h11 * m1z

  out.set(rx, ry, rz)
}

function lerpTable(rows: { t: number }[], t: number, pick: (r: WP) => number): number {
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i] as WP
    const b = rows[i + 1] as WP
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t || 1)
      return pick(a) + (pick(b) - pick(a)) * k
    }
  }
  return pick(rows[t <= rows[0].t ? 0 : rows.length - 1] as WP)
}

export default function CameraRig() {
  const { camera } = useThree()
  const reduced = useStore((s) => s.reducedMotion)

  const fovAt = (t: number) => lerpTable(DESCENT, t, (w) => w.fov)
  const rollAt = (t: number) => lerpTable(DESCENT, t, (w) => w.roll ?? 0)

  const tmpP = useRef(new THREE.Vector3())
  const tmpL = useRef(new THREE.Vector3())
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const clock = useRef(0)

  useFrame((_, dt) => {
    // RAW progress directly drove by Lenis scroll
    const t = useStore.getState().progress
    clock.current += dt

    const pos = tmpP.current
    const look = tmpL.current

    interpolateVec3(DESCENT, t, 'pos', pos)
    interpolateVec3(DESCENT, t, 'look', look)

    // Handheld micro-drift
    if (!reduced) {
      const d = 0.003
      pos.x += Math.sin(clock.current * 0.31) * d
      pos.y += Math.sin(clock.current * 0.23 + 1.7) * d
    }

    camera.position.copy(pos)
    camera.up.copy(up)
    camera.lookAt(look)

    // Roll after lookAt
    const rollDeg = rollAt(t) + (reduced ? 0 : Math.sin(clock.current * 0.19) * 0.8)
    if (Math.abs(rollDeg) > 0.01) {
      camera.rotateZ(THREE.MathUtils.degToRad(rollDeg))
    }

    const fov = fovAt(t)
    if (Math.abs((camera as THREE.PerspectiveCamera).fov - fov) > 0.01) {
      ;(camera as THREE.PerspectiveCamera).fov = fov
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }
  })

  return null
}
