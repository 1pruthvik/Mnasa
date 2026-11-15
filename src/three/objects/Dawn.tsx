// src/three/objects/Dawn.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.2, 0] as [number, number, number],
}

interface DawnProps extends React.ComponentPropsWithoutRef<'group'> {
  wobble?: number // slow attitude wobble in rad
}

export default function Dawn({ wobble = 0, ...props }: DawnProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('dawn', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  return (
    <group ref={groupRef} rotation={[wobble, wobble * 0.7, 0]} {...props}>
      {/* Central Bus: 1.7 x 1.3 x 1.7m */}
      <mesh position={[0, 0, 0]} material={MATERIALS.whitePaint}>
        <boxGeometry args={[1.3, 1.7, 1.7]} />
      </mesh>

      {/* High-Gain Antenna Dish on +Z face: 1.5m diameter */}
      <group position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.75, 0.75, 0.04, 24]} />
        </mesh>
        <mesh position={[0, 0.25, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.015, 0.015, 0.45, 6]} />
        </mesh>
      </group>

      {/* Ion Engine Bell at -Z face: shallow cone, dark metal (NO GLOW - out of hydrazine/xenon) */}
      <mesh position={[0, 0, -0.95]} rotation={[-Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
        <cylinderGeometry args={[0.25, 0.45, 0.35, 16]} />
      </mesh>

      {/* Star Trackers: small cylinders */}
      <mesh position={[0.68, 0.4, 0.2]} rotation={[0, 0, Math.PI / 2]} material={MATERIALS.blackStrut}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 8]} />
      </mesh>

      {/* Two Double-Butterfly Solar Array Wings extending along +/- X (19.7m tip-to-tip span) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 0.7, 0, 0]}>
          {/* Hinge boom */}
          <mesh position={[side * 0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={MATERIALS.blackStrut}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          </mesh>

          {/* Wing Segment 1 (canted butterfly angle) */}
          <mesh
            position={[side * 2.4, 0, 0]}
            rotation={[0, 0, side * 0.04]}
            material={MATERIALS.solarPanel}
          >
            <boxGeometry args={[3.2, 1.5, 0.04]} />
          </mesh>

          {/* Wing Segment 2 (outer) */}
          <mesh
            position={[side * 5.8, 0, 0]}
            rotation={[0, 0, -side * 0.04]}
            material={MATERIALS.solarPanel}
          >
            <boxGeometry args={[3.4, 1.35, 0.04]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
