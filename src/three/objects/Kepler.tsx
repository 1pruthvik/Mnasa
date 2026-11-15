// src/three/objects/Kepler.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 2.5, 0] as [number, number, number],
}

interface KeplerProps extends React.ComponentPropsWithoutRef<'group'> {
  transitU?: number // 0..1 for transit blink event at u = 0.7
}

export default function Kepler({ transitU = 0, ...props }: KeplerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('kepler', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  // Transit blink: dark disc crossing aperture horizontally when transitU is near 0.7
  // u in [0.62 .. 0.78]
  const isTransiting = transitU >= 0.62 && transitU <= 0.78
  const discX = isTransiting ? ((transitU - 0.62) / 0.16 - 0.5) * 0.9 : -2
  const emissiveDip = isTransiting ? 0.96 : 1.0

  return (
    <group ref={groupRef} {...props}>
      {/* 4.7m Long Cylindrical Photometer Barrel with 0.95m Aperture */}
      <group position={[0, 0, 0]}>
        {/* Outer Telescope Tube: 1.4m diameter, 4.7m long */}
        <mesh position={[0, 2.35, 0]} material={MATERIALS.goldFoil}>
          <cylinderGeometry args={[0.7, 0.7, 4.7, 32, 1, true]} />
        </mesh>

        {/* Outer white thermal blanket wrap */}
        <mesh position={[0, 1.8, 0]} material={MATERIALS.whitePaint}>
          <cylinderGeometry args={[0.72, 0.72, 3.4, 32, 1, true]} />
        </mesh>

        {/* Front Open Aperture Ring with faint emissive edge (dips 4% during transit) */}
        <mesh position={[0, 4.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.475, 0.72, 32]} />
          <meshBasicMaterial color={new THREE.Color(0.2 * emissiveDip, 0.25 * emissiveDip, 0.3 * emissiveDip)} />
        </mesh>

        {/* Inner Dark Baffle Stack (Concentric Rings Receding Inside the Barrel) */}
        {[4.4, 3.8, 3.2, 2.6, 2.0, 1.4].map((ringY, idx) => (
          <mesh key={idx} position={[0, ringY, 0]} rotation={[-Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
            <ringGeometry args={[0.48 - idx * 0.02, 0.68, 24]} />
          </mesh>
        ))}

        {/* Focal Plane Array at bottom of barrel */}
        <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
          <circleGeometry args={[0.48, 24]} />
        </mesh>

        {/* Exoplanet Transit: small dark disc crossing the open aperture at y=4.71 */}
        {isTransiting && (
          <mesh position={[discX, 4.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.07, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        )}
      </group>

      {/* Service Module Bus at rear */}
      <mesh position={[0, -0.4, 0]} material={MATERIALS.goldFoil}>
        <cylinderGeometry args={[0.9, 0.9, 0.8, 6]} />
      </mesh>

      {/* Curved Solar Array Panel wrapped around one side of the cylinder */}
      <mesh position={[0.76, 2.2, 0]} rotation={[0, 0, -0.05]} material={MATERIALS.solarPanel}>
        <boxGeometry args={[0.04, 3.8, 1.2]} />
      </mesh>

      {/* Steerable High-Gain Antenna on rear deck */}
      <group position={[0, -0.85, 0.5]} rotation={[0.4, 0, 0]}>
        <mesh material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.4, 0.4, 0.03, 16]} />
        </mesh>
        <mesh position={[0, 0.15, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.01, 0.01, 0.25, 6]} />
        </mesh>
      </group>
    </group>
  )
}
