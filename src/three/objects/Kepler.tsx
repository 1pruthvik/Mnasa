import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NASA3DModel } from '../components/NASA3DModel'
import {
  solarPanelMaterial,
  silverFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

function ProceduralKepler() {
  return (
    <group>
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
      </group>
    </group>
  )
}

export function Kepler() {
  const keplerRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (keplerRef.current) {
      keplerRef.current.rotation.x += dt * 0.015
      keplerRef.current.rotation.y += dt * 0.02
    }
  })

  return (
    <group ref={keplerRef} position={[0, 0, -30]}>
      <NASA3DModel
        url="/models/kepler.glb"
        scale={1.3}
        fallback={<ProceduralKepler />}
      />
    </group>
  )
}
