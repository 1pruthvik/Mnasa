import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export type World = 'earth' | 'moon' | 'mars' | 'venus' | 'jupiter'
const maps: Record<World, string> = { earth: '/images/earth-relief.jpg', moon: '/images/moon-lroc-2k.jpg', mars: '/images/mars.jpg', venus: '/images/venus.jpg', jupiter: '/images/jupiter.jpg' }

/** Global maps on spheres, not high-resolution site terrain or live imagery. */
export function AtlasGlobe({ world, radius = 4 }: { world: World; radius?: number }) {
  const texture = useTexture(maps[world])
  texture.colorSpace = THREE.SRGBColorSpace
  return <mesh><sphereGeometry args={[radius, 96, 64]} /><meshStandardMaterial map={texture} roughness={1} /></mesh>
}
