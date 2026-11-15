// src/three/objects/NEARShoemaker.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 1.5, 0] as [number, number, number],
}

interface NEARShoemakerProps extends React.ComponentPropsWithoutRef<'group'> {
  flash?: boolean // 69-photograph flash beat on camera aperture
}

export default function NEARShoemaker({ flash = false, ...props }: NEARShoemakerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('near', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  return (
    <group ref={groupRef} {...props}>
      {/* Boxy main bus: ~2.7m long, 1.7m wide, 1.5m tall. Sitting directly on surface - NO LEGS, NO FOOTPADS */}
      <mesh position={[0, 0.75, 0]} material={MATERIALS.goldFoil}>
        <boxGeometry args={[1.7, 1.5, 2.7]} />
      </mesh>

      {/* 1.5m High-Gain Dish Antenna mounted on top */}
      <group position={[0, 1.8, 0.4]} rotation={[-0.2, 0, 0]}>
        <mesh material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.75, 0.75, 0.04, 24]} />
        </mesh>
        <mesh position={[0, 0.25, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 6]} />
        </mesh>
      </group>

      {/* Smaller X-band antenna mast */}
      <mesh position={[0.6, 1.6, -0.6]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
      </mesh>

      {/* Magnetometer boom extending forward */}
      <mesh position={[0, 0.5, 1.8]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
      </mesh>

      {/* Camera Aperture on underside / front face */}
      <group position={[0, 0.3, 1.36]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.blackStrut}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={MATERIALS.glassLens}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
        </mesh>
        {/* Subtle camera flash during 69-photo descent sequence */}
        {flash && (
          <pointLight
            position={[0, 0, 0.2]}
            intensity={0.05}
            distance={4}
            color="#ffffff"
          />
        )}
      </group>

      {/* Four Fixed Solar Panels in a Cross (two on sides, two on top/bottom or canted) */}
      {/* Lateral panels (X-axis) */}
      {[-1, 1].map((side, i) => (
        <group key={`lat-${i}`} position={[side * 1.8, 0.75, 0]}>
          <mesh material={MATERIALS.solarPanel}>
            <boxGeometry args={[1.8, 0.04, 1.4]} />
          </mesh>
        </group>
      ))}

      {/* Top / Forward canted panels */}
      {[-1, 1].map((side, i) => (
        <group key={`vert-${i}`} position={[0, 0.75 + side * 1.2, -0.4]}>
          <mesh material={MATERIALS.solarPanel}>
            <boxGeometry args={[1.2, 0.04, 1.6]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
