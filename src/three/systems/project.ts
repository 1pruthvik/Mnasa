import * as THREE from 'three'

export const WORLD_SCALE = 0.01 // 1 real metre = 0.01 world units

// Equirectangular projection onto a local tangent patch
export function latLonToWorld(lat: number, lon: number, centreLat: number, centreLon: number, radius = 60) {
  const x = (lon - centreLon) * (Math.PI / 180) * Math.cos((centreLat * Math.PI) / 180) * radius
  const z = (lat - centreLat) * (Math.PI / 180) * radius
  return [x, 0, z] as [number, number, number]
}

export const LABEL_IDS = ['eagle', 'surveyor', 'lrv', 'viking', 'pathfinder', 'insight', 'ingenuity']

// Registered by each chapter on mount: objectId -> Object3D + local anchor offset
const anchors = new Map<string, { obj: THREE.Object3D; offset: THREE.Vector3 }>()

export function registerAnchor(id: string, obj: THREE.Object3D, offset: [number, number, number]) {
  anchors.set(id, { obj, offset: new THREE.Vector3(...offset) })
  return () => anchors.delete(id)
}

const v = new THREE.Vector3()

/** Returns {x,y,visible} in CSS pixels, or null if the id is not mounted */
export function projectToScreen(
  id: string,
  camera: THREE.Camera,
  size: { width: number; height: number }
): { x: number; y: number; visible: boolean } | null {
  const a = anchors.get(id)
  if (!a) return null
  v.copy(a.offset)
  a.obj.localToWorld(v)
  v.project(camera)
  return {
    x: (v.x * 0.5 + 0.5) * size.width,
    y: (-v.y * 0.5 + 0.5) * size.height,
    visible: v.z < 1 && v.z > -1,
  }
}
