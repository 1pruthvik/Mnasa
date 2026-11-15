import { useStore } from '../../store'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { StarField } from '../env/StarField'

export function Chapter00Descent() {
  const scene = useStore(s => s.activeSceneId)
  const sunRef = useRef<THREE.Mesh>(null!)
  const coronaRef = useRef<THREE.Mesh>(null!)

  useFrame((_, dt) => {
    if (sunRef.current) sunRef.current.rotation.y += dt * 0.04
    if (coronaRef.current) coronaRef.current.rotation.z -= dt * 0.02
  })

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

      {/* Planetary Orbit Lines */}
      {[55, 95, 140, 195].map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.25, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Inner Planets */}
      {/* Mercury */}
      <mesh position={[55, 0, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>

      {/* Venus */}
      <mesh position={[-70, 0, 65]}>
        <sphereGeometry args={[2.8, 20, 20]} />
        <meshStandardMaterial color="#fed7aa" roughness={0.6} />
      </mesh>

      {/* Earth (Target of the descent) at [0, 0, 62] */}
      <group visible={scene === '0.2'} position={[0, 0, 62]}>
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
        {/* Atmosphere Blue Rim Glow */}
        <mesh scale={[1.12, 1.12, 1.12]}>
          <sphereGeometry args={[5.2, 32, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.22}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Mars */}
      <mesh position={[120, 0, -150]}>
        <sphereGeometry args={[2.5, 20, 20]} />
        <meshStandardMaterial color="#ea580c" roughness={0.8} />
      </mesh>

      {/* The Door Transition */}

    </group>
  )
}

