// src/three/objects/VikingLander.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.8, 0] as [number, number, number],
}

interface VikingLanderProps extends React.ComponentPropsWithoutRef<'group'> {
  beaconIntensity?: number
}

export default function VikingLander({ beaconIntensity = 1, ...props }: VikingLanderProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('viking1', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  return (
    <group ref={groupRef} {...props}>
      {/* Central Hexagonal Body (2.2m across, 0.6m high, bottom at y=1.2m) */}
      <mesh
        position={[0, 1.5, 0]}
        material={MATERIALS.whitePaint}
      >
        <cylinderGeometry args={[1.1, 1.1, 0.6, 6]} />
      </mesh>

      {/* Gold thermal blanket on upper deck */}
      <mesh
        position={[0, 1.82, 0]}
        material={MATERIALS.goldFoil}
      >
        <cylinderGeometry args={[0.95, 0.95, 0.04, 6]} />
      </mesh>

      {/* 3 Splayed Legs (at 120 deg intervals) */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
        const dist = 1.3
        const x = Math.sin(angle) * dist
        const z = Math.cos(angle) * dist
        return (
          <group key={idx} position={[0, 0, 0]}>
            {/* Main leg strut */}
            <mesh
              position={[x * 0.6, 0.7, z * 0.6]}
              rotation={[Math.cos(angle) * 0.45, 0, -Math.sin(angle) * 0.45]}
              material={MATERIALS.aluminium}
            >
              <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
            </mesh>
            {/* Footpad */}
            <mesh position={[x, 0.04, z]} material={MATERIALS.aluminium}>
              <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
            </mesh>
          </group>
        )
      })}

      {/* Sampler Arm reaching forward (frozen mid-reach) */}
      <group position={[0, 1.4, 0.9]} rotation={[0.3, 0.15, 0]}>
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
        </mesh>
        <mesh position={[0, -0.2, 1.1]} rotation={[Math.PI / 4, 0, 0]} material={MATERIALS.aluminium}>
          <boxGeometry args={[0.15, 0.1, 0.25]} />
        </mesh>
      </group>

      {/* Dual SNAP-19 RTG Booms angled out on sides */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 1.05, 1.5, -0.4]} rotation={[0.2, side * 0.4, side * 0.3]}>
          <mesh material={MATERIALS.blackStrut}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          </mesh>
          {/* Finned RTG generator */}
          <mesh position={[0, 0.35, 0]} material={MATERIALS.aluminium}>
            <cylinderGeometry args={[0.16, 0.16, 0.38, 12]} />
          </mesh>
        </group>
      ))}

      {/* Camera head & meteorology mast */}
      <mesh position={[-0.4, 2.0, 0.2]} material={MATERIALS.whitePaint}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
      </mesh>
      <mesh position={[-0.4, 2.26, 0.2]} material={MATERIALS.blackStrut}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
      </mesh>

      {/* Beacon PointLight (fades out at u=0.92) */}
      <pointLight
        position={[0, 2.1, 0]}
        intensity={beaconIntensity * 1.5}
        distance={beaconIntensity > 0.01 ? 12 : 0}
        color="#a0e0ff"
      />
    </group>
  )
}
