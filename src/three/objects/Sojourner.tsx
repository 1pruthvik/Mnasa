// src/three/objects/Sojourner.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 0.45, 0] as [number, number, number],
}

interface SojournerProps extends React.ComponentPropsWithoutRef<'group'> {
  driveDist?: number // for wheel rotation and travel
}

export default function Sojourner({ driveDist = 0, ...props }: SojournerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('sojourner', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  // Wheel rotation based on distance travelled: rotation = d / r (r = 0.065m)
  const wheelRot = driveDist / 0.065

  return (
    <group ref={groupRef} {...props}>
      {/* Chassis Body: ~0.48m wide, ~0.65m long, sitting ~0.15m off the ground */}
      <mesh position={[0, 0.18, 0]} material={MATERIALS.goldFoil}>
        <boxGeometry args={[0.38, 0.12, 0.52]} />
      </mesh>

      {/* Flat solar array deck on top */}
      <mesh position={[0, 0.25, 0]} material={MATERIALS.solarPanel}>
        <boxGeometry args={[0.42, 0.02, 0.58]} />
      </mesh>

      {/* Front camera eyes */}
      <mesh position={[0, 0.28, 0.27]} material={MATERIALS.blackStrut}>
        <boxGeometry args={[0.14, 0.04, 0.04]} />
      </mesh>
      <mesh position={[-0.04, 0.28, 0.29]} material={MATERIALS.glassLens}>
        <sphereGeometry args={[0.015, 8, 8]} />
      </mesh>
      <mesh position={[0.04, 0.28, 0.29]} material={MATERIALS.glassLens}>
        <sphereGeometry args={[0.015, 8, 8]} />
      </mesh>

      {/* Rear whip antenna */}
      <mesh position={[-0.15, 0.38, -0.22]} rotation={[0.1, 0, -0.1]} material={MATERIALS.aluminium}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 6]} />
      </mesh>

      {/* 6 Wheels on rocker-bogie (3 on left, 3 on right) */}
      {[-0.24, 0.24].map((sideX, sideIdx) => (
        <group key={sideIdx}>
          {[-0.22, 0, 0.22].map((wheelZ, wIdx) => (
            <group key={wIdx} position={[sideX, 0.065, wheelZ]}>
              {/* Wheel tyre: 13cm diam = 0.065 radius, 0.06m wide */}
              <mesh rotation={[0, 0, Math.PI / 2 + wheelRot]} material={MATERIALS.aluminium}>
                <cylinderGeometry args={[0.065, 0.065, 0.06, 16]} />
              </mesh>
              {/* Bogie strut linking to chassis */}
              <mesh
                position={[-sideX * 0.25, 0.06, -wheelZ * 0.2]}
                rotation={[0, 0, sideX > 0 ? -0.4 : 0.4]}
                material={MATERIALS.blackStrut}
              >
                <cylinderGeometry args={[0.01, 0.01, 0.16, 6]} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  )
}
