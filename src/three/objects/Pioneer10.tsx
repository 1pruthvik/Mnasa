// src/three/objects/Pioneer10.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.8, 0] as [number, number, number],
}

interface PioneerProps extends React.ComponentPropsWithoutRef<'group'> {
  glint?: number // dish glint 0..1
}

export default function Pioneer10({ glint = 0, ...props }: PioneerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('pioneer10', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  return (
    <group ref={groupRef} {...props}>
      {/* Hexagonal Equipment Compartment Bus */}
      <mesh position={[0, -0.4, 0]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.9, 0.9, 0.45, 6]} />
      </mesh>

      {/* 2.9m Parabolic High-Gain Dish Antenna: dominant silhouette feature */}
      <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <mesh material={MATERIALS.wireMesh}>
          <sphereGeometry args={[1.45, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
        </mesh>
        {/* Feed Horn Tripod & Subreflector at center focus */}
        <mesh position={[0, 0.85, 0]} material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
        </mesh>
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rot, i) => (
          <mesh
            key={i}
            position={[Math.sin(rot) * 0.45, 0.45, Math.cos(rot) * 0.45]}
            rotation={[Math.cos(rot) * 0.4, 0, -Math.sin(rot) * 0.4]}
            material={MATERIALS.blackStrut}
          >
            <cylinderGeometry args={[0.015, 0.015, 1.0, 6]} />
          </mesh>
        ))}

        {/* Specular glint highlight on dish */}
        {glint > 0.01 && (
          <mesh position={[0, 0.2, 0]}>
            <circleGeometry args={[1.2, 32]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={glint * 0.35}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>

      {/* Two SNAP-19 RTG Booms on short outriggers (3m reach at 120 deg angles) */}
      {[-(5 * Math.PI) / 6, -(Math.PI) / 6].map((rot, i) => {
        const dist = 2.4
        const rx = Math.sin(rot) * dist
        const rz = Math.cos(rot) * dist
        return (
          <group key={i} position={[0, -0.4, 0]}>
            {/* Outrigger truss */}
            <mesh
              position={[rx * 0.5, 0, rz * 0.5]}
              rotation={[0, rot + Math.PI / 2, 0]}
              material={MATERIALS.blackStrut}
            >
              <cylinderGeometry args={[0.02, 0.02, dist, 6]} />
            </mesh>
            {/* SNAP-19 finned RTG pair */}
            <mesh position={[rx, 0, rz]} material={MATERIALS.aluminium}>
              <cylinderGeometry args={[0.18, 0.18, 0.5, 12]} />
            </mesh>
          </group>
        )
      })}

      {/* 6.0m Instrument Boom with Magnetometer at tip */}
      <group position={[0, -0.4, 0]}>
        {/* Long boom */}
        <mesh position={[0, 0, 3.0]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.02, 0.02, 6.0, 6]} />
        </mesh>
        {/* Magnetometer sphere at tip */}
        <mesh position={[0, 0, 6.0]} material={MATERIALS.aluminium}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>
      </group>

      {/* The Famous Gold-Anodized Aluminium Plaque (0.23m x 0.15m) mounted on bus strut */}
      <group position={[0.75, -0.4, 0.4]} rotation={[0, -0.6, 0]}>
        <mesh material={MATERIALS.goldFoil}>
          <boxGeometry args={[0.23, 0.15, 0.005]} />
        </mesh>
      </group>
    </group>
  )
}
