import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { isWorldOverview } from '../data/experience'
import { travelAt, travelFraction } from './chapters/Travel'

// Each scene gets a deliberate, stable composition. These are illustrative
// models, not reconstructions of the equipment's precise present-day condition.
const SHOTS: Record<string, { pos: [number, number, number]; target: [number, number, number]; fov: number }> = {
  '0.1': { pos: [0, 55, 550], target: [0, 0, 0], fov: 50 },
  '0.2': { pos: [0, 5, 91], target: [0, 0, 62], fov: 45 },
  '1.1': { pos: [8, 5, 15], target: [0, 1.2, 0], fov: 44 },
  '1.2': { pos: [-9, 4, 6], target: [-16, 1, -6], fov: 46 },
  '1.3': { pos: [29, 4, 19], target: [22, 0.8, 8], fov: 45 },
  '1.4': { pos: [32, 4, 21], target: [25, 0.5, 11], fov: 45 },
  '2.1': { pos: [7, 4, 11], target: [0, 1, 0], fov: 44 },
  '2.2': { pos: [15, 4, 5], target: [8, 0.8, -6], fov: 46 },
  '3.1': { pos: [-1, 4, 2], target: [-8, 1, -8], fov: 45 },
  '3.2': { pos: [12, 5, 7], target: [4, 0.8, -6], fov: 46 },
  '3.3': { pos: [11, 11, 3], target: [8, 9.2, -2], fov: 46 },
  '4.1': { pos: [-8, 13, 10], target: [-25, 8, -15], fov: 45 },
  '4.2': { pos: [-32, 5, 2], target: [-40, -1.9, -7], fov: 46 },
  '5.1': { pos: [5, 3, -168], target: [0, 0, -180], fov: 45 },
  '5.2': { pos: [7, 4, -92], target: [0, 0, -110], fov: 42 },
  '6.1': { pos: [0, 2, 36], target: [0, 0, 0], fov: 48 },
  '6.2': { pos: [0, 2, 36], target: [0, 0, 0], fov: 48 },
}

export default function CameraRig() {
  const { camera, size } = useThree()
  const position = useMemo(() => new THREE.Vector3(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    const state = useStore.getState()
    const shot = state.activeSceneId === '2.1' && isWorldOverview(state.progress) ? { pos: [0, 1, 16] as [number, number, number], target: [0, 0, 0] as [number, number, number], fov: 42 } : SHOTS[state.activeSceneId] || SHOTS['0.1']
    const route = travelAt(state.progress)
    if (route) {
      const fraction = travelFraction(state.progress, route)
      const x = THREE.MathUtils.lerp(-11, 11, fraction)
      // Pull back to keep both destinations in view during the crossing.
      position.set(x, 1, 18 + Math.sin(Math.PI * fraction) * 16)
      target.set(x, 0, 0)
    } else {
      position.set(...shot.pos)
      target.set(...shot.target)
    }
    camera.position.copy(position)
    camera.up.set(0, 1, 0)
    camera.lookAt(target)
    const perspective = camera as THREE.PerspectiveCamera
    // Shift the principal point so the subject sits clear of the story panel.
    perspective.setViewOffset(size.width, size.height, size.width >= 768 ? -size.width * 0.18 : 0, size.width < 768 ? size.height * 0.12 : 0, size.width, size.height)
    perspective.fov = size.width < 768 ? (route ? 54 : shot.fov + 12) : (route ? 42 : shot.fov)
    perspective.updateProjectionMatrix()
  })
  return null
}
