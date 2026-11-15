// src/three/objects/PathfinderLander.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.2, 0] as [number, number, number],
}

interface PathfinderProps extends React.ComponentPropsWithoutRef<'group'> {
  petalOpen?: number // 0 = folded, 1 = flat
}

export default function PathfinderLander({ petalOpen = 1, ...props }: PathfinderProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('pathfinder', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  // Angle: when folded, petals are angled upward ~70 deg (1.22 rad). When open, 0 deg.
  const angle = (1 - petalOpen) * 1.25

  return (
    <group ref={groupRef} {...props}>
      {/* Central triangular base */}
      <mesh position={[0, 0.08, 0]} material={MATERIALS.goldFoil}>
        <cylinderGeometry args={[0.7, 0.7, 0.16, 3]} />
      </mesh>

      {/* Center electronics box & low-gain antenna */}
      <mesh position={[0, 0.35, 0]} material={MATERIALS.whitePaint}>
        <boxGeometry args={[0.55, 0.4, 0.55]} />
      </mesh>
      <mesh position={[0, 0.8, 0]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
      </mesh>

      {/* 3 Petals opened around the base */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rot, i) => {
        const radius = 0.65
        const px = Math.sin(rot) * radius
        const pz = Math.cos(rot) * radius

        return (
          <group
            key={i}
            position={[px, 0.08, pz]}
            rotation={[0, rot, 0]}
          >
            {/* Hinge rotation */}
            <group rotation={[angle, 0, 0]}>
              {/* Petal body */}
              <mesh position={[0, 0.02, 0.65]} material={MATERIALS.goldFoil}>
                <boxGeometry args={[0.9, 0.04, 1.3]} />
              </mesh>
              {/* Solar cells on inner surface */}
              <mesh position={[0, 0.05, 0.65]} material={MATERIALS.solarPanel}>
                <boxGeometry args={[0.8, 0.02, 1.2]} />
              </mesh>
              {/* Egress ramp on petal 0 */}
              {i === 0 && (
                <mesh position={[0, 0.06, 1.5]} rotation={[-0.1, 0, 0]} material={MATERIALS.aluminium}>
                  <boxGeometry args={[0.4, 0.02, 0.8]} />
                </mesh>
              )}
            </group>
          </group>
        )
      })}
    </group>
  )
}
