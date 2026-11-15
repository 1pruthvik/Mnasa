import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { StarField } from './StarField'

export function MarsGlobe() {
  const texture = useTexture('/images/mars.jpg')
  texture.colorSpace = THREE.SRGBColorSpace
  return <group>
    <StarField density="sparse" />
    <ambientLight intensity={0.8} />
    <directionalLight position={[8, 5, 10]} intensity={2.1} />
    <mesh><sphereGeometry args={[4, 64, 48]} /><meshStandardMaterial map={texture} roughness={1} /></mesh>
  </group>
}
