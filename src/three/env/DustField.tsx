import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DustField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 1200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80
      pos[i * 3 + 1] = Math.random() * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    return pos
  }, [count])

  useFrame((_, dt) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const array = pos.array as Float32Array

    for (let i = 0; i < count; i++) {
      // Wind drift in X direction
      array[i * 3] += dt * 2.5
      array[i * 3 + 1] -= dt * 0.2 // subtle gravity fall

      if (array[i * 3] > 40) array[i * 3] = -40
      if (array[i * 3 + 1] < 0) array[i * 3 + 1] = 20
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fdba74"
        size={0.18}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
