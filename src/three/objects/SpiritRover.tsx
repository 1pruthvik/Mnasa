// src/three/objects/SpiritRover.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.8, 0] as [number, number, number],
}

export interface MERProps extends React.ComponentPropsWithoutRef<'group'> {
  variant?: 'spirit' | 'opportunity'
  panelGlint?: number // 0..1 sweep
}

export function MERModel({ variant = 'spirit', panelGlint = 0, ...props }: MERProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(variant, groupRef.current, SITE.labelAnchor)
    }
  }, [variant])

  return (
    <group ref={groupRef} {...props}>
      {/* Warm Electronics Box (WEB) Core: 1.5m long, 0.9m wide, 0.45m high */}
      <mesh position={[0, 0.55, 0]} material={MATERIALS.goldFoil}>
        <boxGeometry args={[0.9, 0.45, 1.4]} />
      </mesh>

      {/* Solar Array Deck: shaped wings extending over wheels */}
      <group position={[0, 0.78, 0]}>
        <mesh material={MATERIALS.solarPanel}>
          <boxGeometry args={[1.6, 0.04, 1.6]} />
        </mesh>
        {/* Panel glint highlight mesh for Opportunity March 2014 wind clean event */}
        {panelGlint > 0.01 && (
          <mesh position={[0, 0.03, 0]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={panelGlint * 0.45}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>

      {/* Pancam Mast Assembly (PMA): 1.5m vertical mast */}
      <group position={[0.3, 0.8, 0.5]}>
        {/* Mast tube */}
        <mesh position={[0, 0.75, 0]} material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
        </mesh>
        {/* Pancam camera head (two eyes separated horizontally) */}
        <mesh position={[0, 1.52, 0]} material={MATERIALS.whitePaint}>
          <boxGeometry args={[0.26, 0.1, 0.14]} />
        </mesh>
        <mesh position={[-0.08, 1.52, 0.08]} material={MATERIALS.glassLens}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh position={[0.08, 1.52, 0.08]} material={MATERIALS.glassLens}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        {/* Mini-TES cylinder */}
        <mesh position={[0, 1.42, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 8]} />
        </mesh>
      </group>

      {/* Instrument Deployment Device (IDD): robotic arm folded at front */}
      <group position={[0, 0.4, 0.75]} rotation={[0.4, 0, 0]}>
        <mesh position={[0, -0.15, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 6]} />
        </mesh>
        <mesh position={[0, -0.3, 0.1]} material={MATERIALS.aluminium}>
          <boxGeometry args={[0.12, 0.12, 0.15]} />
        </mesh>
      </group>

      {/* High-Gain Antenna (HGA) dish and Low-Gain mast at rear */}
      <mesh position={[-0.3, 0.95, -0.45]} rotation={[-0.3, 0.2, 0]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
      </mesh>
      <mesh position={[0.3, 1.05, -0.5]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 6]} />
      </mesh>

      {/* Rocker-Bogie Suspension & 6 Wheels (26cm diam = 0.13m radius, 0.16m wide) */}
      {[-0.65, 0.65].map((sideX, sideIdx) => (
        <group key={sideIdx}>
          {/* Main rocker strut */}
          <mesh
            position={[sideX * 0.8, 0.4, 0]}
            rotation={[0, 0, sideX > 0 ? -0.2 : 0.2]}
            material={MATERIALS.blackStrut}
          >
            <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
          </mesh>

          {/* 3 Wheels on this side: Front (+0.6m), Middle (0m), Rear (-0.6m) */}
          {[0.6, 0, -0.6].map((wZ, wIdx) => (
            <group key={wIdx} position={[sideX, 0.13, wZ]}>
              {/* Aluminium wheel with cleat treads */}
              <mesh rotation={[0, 0, Math.PI / 2]} material={MATERIALS.aluminium}>
                <cylinderGeometry args={[0.13, 0.13, 0.16, 20]} />
              </mesh>
              {/* Hub motor */}
              <mesh rotation={[0, 0, Math.PI / 2]} material={MATERIALS.blackStrut}>
                <cylinderGeometry args={[0.06, 0.06, 0.18, 12]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}

export default function SpiritRover(props: Omit<MERProps, 'variant'>) {
  return <MERModel variant="spirit" {...props} />
}
