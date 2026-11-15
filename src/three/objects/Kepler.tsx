import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  solarPanelMaterial,
  silverFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function Kepler() {
  const keplerRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (keplerRef.current) {
      // Slow tumble (~0.02 rad/s) as stated in the master script
      keplerRef.current.rotation.x += dt * 0.015
      keplerRef.current.rotation.y += dt * 0.02
    }
  })

  return (
    <group ref={keplerRef} position={[0, 0, -110]}>
      {/* Cylindrical Telescope Barrel with Silver MLI Thermal Wrap */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={silverFoilMaterial} castShadow>
        <cylinderGeometry args={[1.4, 1.4, 3.8, 24, 1, true]} />
      </mesh>

      {/* Interior Optical Tube & Photometer Array Cavity */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={blackStrutMaterial}>
        <cylinderGeometry args={[1.36, 1.36, 3.7, 20]} />
      </mesh>

      {/* Primary Mirror at Base */}
      <mesh position={[0, 0, -1.8]} material={aluminiumMaterial}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 20]} />
      </mesh>

      {/* 45-degree Angled Solar Cell Sunshield */}
      <group position={[0, 1.3, 0]}>
        <mesh rotation={[0.4, 0, 0]} material={solarPanelMaterial}>
          <boxGeometry args={[3.2, 0.04, 3.6]} />
        </mesh>
      </group>

      {/* Base Spacecraft Bus with Star Trackers and Reaction Wheel Housings */}
      <group position={[0, 0, -2.1]}>
        <mesh material={aluminiumMaterial}>
          <cylinderGeometry args={[1.5, 1.5, 0.6, 12]} />
        </mesh>
        {/* Reaction wheel pods */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(ang) * 1.55, 0, Math.sin(ang) * 1.55]}
            material={blackStrutMaterial}
          >
            <sphereGeometry args={[0.22, 8, 8]} />
          </mesh>
        ))}
      </group>

      {/* Steerable High-Gain Dish Antenna */}
      <mesh position={[1.6, -0.6, -1.5]} rotation={[0.5, 0.8, 0]} material={aluminiumMaterial}>
        <sphereGeometry args={[0.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>
    </group>
  )
}
