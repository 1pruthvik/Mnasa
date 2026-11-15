import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { StarField } from '../env/StarField'
import { PaperPlane } from '../env/PaperPlane'

export function Chapter00Descent() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const coronaRef = useRef<THREE.Mesh>(null!)

  useFrame((_, dt) => {
    if (sunRef.current) sunRef.current.rotation.y += dt * 0.04
    if (coronaRef.current) coronaRef.current.rotation.z -= dt * 0.02
  })

  // 8 Planetary Orbit Radii (Schematic representation — not to scale)
  const orbits = [55, 85, 120, 165, 230, 300, 360, 420]

  return (
    <group>
      {/* Rich Multi-Layer Cosmic Starfield */}
      <StarField density="dense" />

      {/* The Sun at [0, 0, 0] */}
      <group position={[0, 0, 0]}>
        {/* Core luminous stellar body */}
        <mesh ref={sunRef}>
          <sphereGeometry args={[22, 32, 32]} />
          <meshBasicMaterial color="#fef08a" />
        </mesh>
        {/* Glowing Solar Corona Rim */}
        <mesh ref={coronaRef} scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[22, 32, 32]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.42}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Outer Solar Flare Glow */}
        <mesh scale={[1.35, 1.35, 1.35]}>
          <sphereGeometry args={[22, 24, 24]} />
          <meshBasicMaterial
            color="#ea580c"
            transparent
            opacity={0.16}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Solar Point Light */}
        <pointLight intensity={320} color="#fef08a" distance={1500} decay={0.8} />
      </group>

      {/* 8 Schematic Planetary Orbit Rings */}
      {orbits.map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.35, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* 1. Mercury */}
      <mesh position={[55, 0, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>

      {/* 2. Venus */}
      <mesh position={[-70, 0, 50]}>
        <sphereGeometry args={[2.8, 20, 20]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.6} />
      </mesh>

      {/* 3. Earth & Moon System (Target of the descent) at [0, 0, 62] */}
      <group position={[0, 0, 62]}>
        {/* Earth Globe */}
        <mesh>
          <sphereGeometry args={[5.2, 32, 32]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Earth Clouds */}
        <mesh scale={[1.025, 1.025, 1.025]}>
          <sphereGeometry args={[5.2, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.36}
            roughness={0.9}
          />
        </mesh>
        {/* Rayleigh Scattering Atmosphere Rim */}
        <mesh scale={[1.12, 1.12, 1.12]}>
          <sphereGeometry args={[5.2, 32, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.22}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Moon in Orbit around Earth */}
        <group position={[11, 2, -4]}>
          <mesh>
            <sphereGeometry args={[1.42, 20, 20]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* 4. Mars */}
      <mesh position={[120, 0, -110]}>
        <sphereGeometry args={[2.7, 20, 20]} />
        <meshStandardMaterial color="#ea580c" roughness={0.8} />
      </mesh>

      {/* 5. Jupiter */}
      <mesh position={[-180, 0, -140]}>
        <sphereGeometry args={[9.5, 24, 24]} />
        <meshStandardMaterial color="#d97706" roughness={0.7} />
      </mesh>

      {/* 6. Saturn with Rings */}
      <group position={[230, 0, 180]} rotation={[0.4, 0.2, 0.2]}>
        <mesh>
          <sphereGeometry args={[7.8, 24, 24]} />
          <meshStandardMaterial color="#fef08a" roughness={0.7} />
        </mesh>
        {/* Saturn's Rings */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10.5, 16.5, 32]} />
          <meshStandardMaterial
            color="#e2e8f0"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 7. Uranus */}
      <mesh position={[-280, 0, 220]}>
        <sphereGeometry args={[4.2, 20, 20]} />
        <meshStandardMaterial color="#67e8f9" roughness={0.5} />
      </mesh>

      {/* 8. Neptune */}
      <mesh position={[330, 0, -250]}>
        <sphereGeometry args={[4.0, 20, 20]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.5} />
      </mesh>

      {/* The Door Transition */}
      <PaperPlane />
    </group>
  )
}
