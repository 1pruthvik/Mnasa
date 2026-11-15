// src/three/objects/LRRReflector.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'

interface LRRRProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function LRRReflector({
  id = 'lrrr',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: LRRRProps) {
  const groupRef = useRef<THREE.Group>(null)
  const s = WORLD_SCALE * scale

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(id, groupRef.current, [0, 0.2 * s, 0])
    }
  }, [id, s])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Base platform: 0.6m x 0.05m x 0.6m */}
      <mesh position={[0, 0.025 * s, 0]}>
        <boxGeometry args={[0.6 * s, 0.05 * s, 0.6 * s]} />
        <primitive object={MATERIALS.whitePaint} attach="material" />
      </mesh>

      {/* 3x3 corner cube reflectors */}
      {[-1, 0, 1].map(x =>
        [-1, 0, 1].map(z => (
          <mesh
            key={`${x}-${z}`}
            position={[x * 0.16 * s, 0.06 * s, z * 0.16 * s]}
          >
            <cylinderGeometry args={[0.05 * s, 0.05 * s, 0.02 * s, 16]} />
            <primitive object={MATERIALS.retroReflector} attach="material" />
          </mesh>
        ))
      )}
    </group>
  )
}
