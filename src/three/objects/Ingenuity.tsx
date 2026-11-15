import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  solarPanelMaterial,
  blackStrutMaterial,
  aluminiumMaterial,
  copperMaterial,
} from '../systems/materials'
import { useStore } from '../../store'

export function Ingenuity() {
  const topRotorRef = useRef<THREE.Group>(null!)
  const bottomRotorRef = useRef<THREE.Group>(null!)
  const progress = useStore((s) => s.progress)

  // Rotor freeze at t >= 0.63 as per flight 72 rotor strike narrative
  const isFrozen = progress >= 0.63

  useFrame((_, dt) => {
    if (!isFrozen) {
      if (topRotorRef.current) topRotorRef.current.rotation.y += dt * 28
      if (bottomRotorRef.current) bottomRotorRef.current.rotation.y -= dt * 28
    }
  })

  return (
    <group position={[8, 9.0, -2]}>
      {/* Central Avionics Fuselage Cube (13.6cm x 19.5cm x 16.3cm scaled) */}
      <mesh position={[0, 0, 0]} material={copperMaterial} castShadow>
        <boxGeometry args={[0.38, 0.42, 0.38]} />
      </mesh>

      {/* Solar Panel Wafer Top Deck (Above rotors) */}
      <mesh position={[0, 0.72, 0]} material={solarPanelMaterial}>
        <boxGeometry args={[0.42, 0.02, 0.42]} />
      </mesh>

      {/* Rotor Mast Shaft */}
      <mesh position={[0, 0.36, 0]} material={blackStrutMaterial}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
      </mesh>

      {/* Top Carbon-Fiber Rotor Blade (1.2m diameter) */}
      <group ref={topRotorRef} position={[0, 0.55, 0]}>
        <mesh material={blackStrutMaterial}>
          <boxGeometry args={[1.2, 0.02, 0.08]} />
        </mesh>
      </group>

      {/* Bottom Counter-Rotating Rotor Blade */}
      <group ref={bottomRotorRef} position={[0, 0.4, 0]}>
        <mesh material={blackStrutMaterial}>
          <boxGeometry args={[1.2, 0.02, 0.08]} />
        </mesh>
      </group>

      {/* 4 Carbon Fiber Angled Landing Legs */}
      {[
        [-0.22, -0.22, 0.22],
        [0.22, -0.22, 0.22],
        [-0.22, -0.22, -0.22],
        [0.22, -0.22, -0.22],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh
            position={[x * 0.8, -0.25, z * 0.8]}
            rotation={[z * 1.4, 0, -x * 1.4]}
            material={blackStrutMaterial}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.65, 6]} />
          </mesh>
          <mesh position={[x * 1.6, -0.55, z * 1.6]} material={aluminiumMaterial}>
            <sphereGeometry args={[0.03, 6, 6]} />
          </mesh>
        </group>
      ))}

      {/* Horizon Sensor Camera Pod */}
      <mesh position={[0, -0.24, 0.1]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
      </mesh>
    </group>
  )
}
