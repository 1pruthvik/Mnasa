// src/three/objects/RTG_SNAP27.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'

interface RTGProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function RTG_SNAP27({
  id = 'rtg-snap27',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: RTGProps) {
  const groupRef = useRef<THREE.Group>(null)
  const s = WORLD_SCALE * scale

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(id, groupRef.current, [0, 0.46 * s, 0])
    }
  }, [id, s])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Central Cylinder: 46 cm high (0.46m) */}
      <mesh position={[0, 0.23 * s, 0]}>
        <cylinderGeometry args={[0.08 * s, 0.08 * s, 0.46 * s, 24]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>

      {/* Fuel rod cap: matte cylinder */}
      <mesh position={[0, 0.47 * s, 0]}>
        <cylinderGeometry args={[0.045 * s, 0.045 * s, 0.04 * s, 16]} />
        <meshStandardMaterial color="#3b3f46" roughness={0.8} />
      </mesh>

      {/* Exactly 8 radiating rectangular fins, 40 cm (0.40m) tip-to-tip */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const angle = (i * Math.PI) / 4
        return (
          <mesh
            key={i}
            position={[0, 0.23 * s, 0]}
            rotation={[0, angle, 0]}
          >
            {/* Box spanning across cylinder, width = 0.40m, thickness = 0.008m, height = 0.44m */}
            <boxGeometry args={[0.40 * s, 0.44 * s, 0.008 * s]} />
            <primitive object={MATERIALS.aluminium} attach="material" />
          </mesh>
        )
      })}
    </group>
  )
}
