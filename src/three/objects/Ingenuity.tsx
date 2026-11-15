// src/three/objects/Ingenuity.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MATERIALS } from '../systems/materials'
import { registerAnchor } from '../systems/project'

export const SITE = {
  center: [0, 0, 0] as [number, number, number],
  labelAnchor: [0, 0.75, 0] as [number, number, number],
}

interface IngenuityProps extends React.ComponentPropsWithoutRef<'group'> {
  frozen?: boolean
  rotorRpm?: number // normalised 0..1 spin speed
}

export default function Ingenuity({ frozen = false, rotorRpm = 0, ...props }: IngenuityProps) {
  const groupRef = useRef<THREE.Group>(null)
  const topRotorRef = useRef<THREE.Group>(null)
  const bottomRotorRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor('ingenuity', groupRef.current, SITE.labelAnchor)
    }
  }, [])

  useFrame((_, dt) => {
    if (frozen) {
      // In freeze state, hold rotors at asymmetric fixed angles
      // One blade restored to plausible position, one visibly bent 8-12 deg
      if (topRotorRef.current) topRotorRef.current.rotation.y = 0.42
      if (bottomRotorRef.current) bottomRotorRef.current.rotation.y = -0.78
      return
    }

    if (rotorRpm > 0.001) {
      const speed = rotorRpm * 38.0 * dt
      if (topRotorRef.current) topRotorRef.current.rotation.y += speed
      if (bottomRotorRef.current) bottomRotorRef.current.rotation.y -= speed
    }
  })

  return (
    <group ref={groupRef} {...props}>
      {/* Fuselage core: 14x14x14 cm cube */}
      <mesh position={[0, 0.28, 0]} material={MATERIALS.goldFoil}>
        <boxGeometry args={[0.14, 0.14, 0.14]} />
      </mesh>

      {/* Solar Panel above rotor mast */}
      <mesh position={[0, 0.58, 0]} material={MATERIALS.solarPanel}>
        <boxGeometry args={[0.16, 0.015, 0.22]} />
      </mesh>

      {/* Rotor Mast: vertical shaft connecting fuselage to top solar panel */}
      <mesh position={[0, 0.42, 0]} material={MATERIALS.blackStrut}>
        <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
      </mesh>

      {/* Lower Rotor Pair (rotates clockwise) at y = 0.40m, span 1.2m (blades 0.58m each) */}
      <group ref={bottomRotorRef} position={[0, 0.40, 0]}>
        {/* Rotor Hub */}
        <mesh material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.03, 0.03, 0.025, 12]} />
        </mesh>
        {/* Blade 1 */}
        <mesh position={[0.29, 0, 0]} rotation={[0.08, 0, 0]} material={MATERIALS.blackStrut}>
          <boxGeometry args={[0.58, 0.008, 0.045]} />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[-0.29, 0, 0]} rotation={[-0.08, 0, 0]} material={MATERIALS.blackStrut}>
          <boxGeometry args={[0.58, 0.008, 0.045]} />
        </mesh>
      </group>

      {/* Upper Rotor Pair (rotates counter-clockwise) at y = 0.48m */}
      <group ref={topRotorRef} position={[0, 0.48, 0]}>
        {/* Rotor Hub */}
        <mesh material={MATERIALS.aluminium}>
          <cylinderGeometry args={[0.03, 0.03, 0.025, 12]} />
        </mesh>
        {/* Blade 1 - normal blade */}
        <mesh position={[0.29, 0, 0]} rotation={[-0.08, 0, 0]} material={MATERIALS.blackStrut}>
          <boxGeometry args={[0.58, 0.008, 0.045]} />
        </mesh>
        {/* Blade 2 - damaged/bent tip when frozen: 10 deg bend */}
        <group position={[-0.29, 0, 0]} rotation={frozen ? [0, 0, -0.17] : [0, 0, 0]}>
          <mesh rotation={[0.08, 0, 0]} material={MATERIALS.blackStrut}>
            <boxGeometry args={[0.58, 0.008, 0.045]} />
          </mesh>
        </group>
      </group>

      {/* Four Fragile Splayed Carbon-Fiber Landing Skids */}
      {[Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4].map((rot, i) => {
        const skidDist = 0.38
        const sx = Math.sin(rot) * skidDist
        const sz = Math.cos(rot) * skidDist
        return (
          <group key={i}>
            {/* Splayed leg strut from fuselage */}
            <mesh
              position={[sx * 0.5, 0.16, sz * 0.5]}
              rotation={[Math.cos(rot) * 0.75, 0, -Math.sin(rot) * 0.75]}
              material={MATERIALS.blackStrut}
            >
              <cylinderGeometry args={[0.006, 0.006, 0.36, 6]} />
            </mesh>
            {/* Skid footpad */}
            <mesh position={[sx, 0.015, sz]} material={MATERIALS.aluminium}>
              <cylinderGeometry args={[0.025, 0.025, 0.015, 8]} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
