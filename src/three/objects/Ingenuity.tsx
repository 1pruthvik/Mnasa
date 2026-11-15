import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NASA3DModel } from '../components/NASA3DModel'
import {
  solarPanelMaterial,
  blackStrutMaterial,
  copperMaterial,
} from '../systems/materials'
import { useStore } from '../../store'

function ProceduralIngenuity() {
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
    <group>
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
      <group ref={bottomRotorRef} position={[0, 0.38, 0]}>
        <mesh material={blackStrutMaterial}>
          <boxGeometry args={[1.2, 0.02, 0.08]} />
        </mesh>
      </group>

      {/* 4 Carbon Composite Landing Legs */}
      {[
        [-0.32, -0.4, 0.32],
        [0.32, -0.4, 0.32],
        [-0.32, -0.4, -0.32],
        [0.32, -0.4, -0.32],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh rotation={[0.4 * Math.sign(x), 0, -0.4 * Math.sign(z)]} material={blackStrutMaterial}>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 6]} />
          </mesh>
          <mesh position={[0, -0.35, 0]} material={blackStrutMaterial}>
            <sphereGeometry args={[0.035, 8, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function Ingenuity() {
  return (
    <group position={[8, 9.0, -2]}>
      <NASA3DModel
        url="/models/ingenuity.glb"
        scale={1.4}
        fallback={<ProceduralIngenuity />}
      />
    </group>
  )
}
