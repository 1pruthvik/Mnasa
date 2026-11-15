import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store'

export function PaperPlane() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const progress = useStore((s) => s.progress)

  // Paper Door active around progress 0.138 - 0.165
  const isNearDoor = progress >= 0.12 && progress <= 0.18
  const mix = THREE.MathUtils.smoothstep(progress, 0.138, 0.158)

  useFrame(() => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = THREE.MathUtils.clamp((mix > 0.5 ? 1 - mix : mix) * 1.8, 0, 0.95)
    }
  })

  if (!isNearDoor) return null

  return (
    <mesh ref={meshRef} position={[0, 0, 60]}>
      <planeGeometry args={[120, 80]} />
      <meshBasicMaterial
        color="#f8fafc"
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
