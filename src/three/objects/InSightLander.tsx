// src/three/objects/InSightLander.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.4, 0] as [number, number, number],
}

interface InSightProps extends React.ComponentPropsWithoutRef<'group'> {
  armProgress?: number // 0 = stowed, 1 = placed on ground
}

export default function InSightLander({ armProgress = 1, ...props }: InSightProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('insight', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  return (
    <group ref={groupRef} {...props}>
      {/* Circular Instrument Deck (1.6m diameter, 0.3m thick, elevated 0.85m off ground) */}
      <mesh position={[0, 0.95, 0]} material={MATERIALS.whitePaint}>
        <cylinderGeometry args={[0.8, 0.8, 0.25, 24]} />
      </mesh>

      {/* Domed top deck thermal cover */}
      <mesh position={[0, 1.1, 0]} material={MATERIALS.goldFoil}>
        <sphereGeometry args={[0.75, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3]} />
      </mesh>

      {/* 3 Splayed Legs (at 120 deg intervals) */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((rot, i) => {
        const radius = 1.1
        const lx = Math.sin(rot) * radius
        const lz = Math.cos(rot) * radius
        return (
          <group key={i}>
            <mesh
              position={[lx * 0.5, 0.45, lz * 0.5]}
              rotation={[Math.cos(rot) * 0.4, 0, -Math.sin(rot) * 0.4]}
              material={MATERIALS.aluminium}
            >
              <cylinderGeometry args={[0.035, 0.035, 0.95, 8]} />
            </mesh>
            <mesh position={[lx, 0.04, lz]} material={MATERIALS.aluminium}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
            </mesh>
          </group>
        )
      })}

      {/* Two ROUND UltraFlex Fan-Out Solar Arrays (The 2 Big Pancakes, 2.15m diam each) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 2.15, 0.95, 0]}>
          {/* Circular solar disc */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.solarPanel}>
            <cylinderGeometry args={[1.08, 1.08, 0.02, 24]} />
          </mesh>
          {/* Radial structural ribs */}
          {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((rAngle, rIdx) => (
            <mesh key={rIdx} rotation={[0, rAngle, 0]} material={MATERIALS.blackStrut}>
              <boxGeometry args={[2.16, 0.03, 0.02]} />
            </mesh>
          ))}
          {/* Mounting bracket arm to deck */}
          <mesh position={[-side * 0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={MATERIALS.aluminium}>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
          </mesh>
        </group>
      ))}

      {/* 1.8m Robotic Arm (IDA) - reaching from deck (y=0.95) to ground (y=0.05) beside the lander */}
      <group position={[0, 0.95, 0.8]}>
        {/* Shoulder segment */}
        <mesh
          position={[0.2 * armProgress, -0.25 * armProgress, 0.4 * armProgress]}
          rotation={[0.6 * armProgress, 0.2 * armProgress, 0]}
          material={MATERIALS.blackStrut}
        >
          <cylinderGeometry args={[0.03, 0.03, 0.65, 8]} />
        </mesh>
        {/* Forearm segment */}
        <mesh
          position={[0.4 * armProgress, -0.6 * armProgress, 0.85 * armProgress]}
          rotation={[0.9 * armProgress, 0.1 * armProgress, 0]}
          material={MATERIALS.aluminium}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        </mesh>
        {/* Arm Grapple Hand */}
        <mesh position={[0.5 * armProgress, -0.9 * armProgress, 1.2 * armProgress]} material={MATERIALS.blackStrut}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
        </mesh>
      </group>

      {/* Ground instruments (deployed ~1.5m in front of deck) */}
      <group position={[0.5, 0.05, 1.5]}>
        {/* SEIS Seismometer Package: Hexagonal white dome with wind & thermal shield */}
        <mesh position={[0, 0.1, 0]} material={MATERIALS.whitePaint}>
          <cylinderGeometry args={[0.22, 0.28, 0.2, 6]} />
        </mesh>
        {/* Tether ribbon connecting SEIS to lander body */}
        <mesh position={[-0.2, 0.01, -0.45]} rotation={[-Math.PI / 2, 0, -0.3]} material={MATERIALS.goldFoil}>
          <planeGeometry args={[0.08, 1.0]} />
        </mesh>

        {/* HP3 Heat Flow and Physical Properties Probe ('The Mole') */}
        <group position={[0.6, 0, 0.2]}>
          <mesh position={[0, 0.15, 0]} material={MATERIALS.aluminium}>
            <boxGeometry args={[0.15, 0.3, 0.15]} />
          </mesh>
          {/* Mole probe entering ground */}
          <mesh position={[0, 0.02, 0]} material={MATERIALS.blackStrut}>
            <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          </mesh>
        </group>
      </group>

      {/* TWINS Meteorology sensor boomer */}
      <mesh position={[0.5, 1.3, -0.3]} rotation={[0, 0, 0.3]} material={MATERIALS.whitePaint}>
        <cylinderGeometry args={[0.015, 0.015, 0.45, 6]} />
      </mesh>
    </group>
  )
}
