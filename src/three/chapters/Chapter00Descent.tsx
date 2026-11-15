import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { StarField } from '../env/StarField'
import { PaperPlane } from '../env/PaperPlane'

export function Chapter00Descent() {
  const sunRef = useRef<THREE.Mesh>(null!)
  const coronaRef = useRef<THREE.Mesh>(null!)
  const earthRef = useRef<THREE.Group>(null!)

  // Load NASA/JPL planetary textures
  const textures = useTexture({
    sun: '/textures/sun.jpg',
    mercury: '/textures/mercury.jpg',
    venus: '/textures/venus.jpg',
    earth: '/textures/earth.jpg',
    moon: '/textures/moon.jpg',
    mars: '/textures/mars.jpg',
    jupiter: '/textures/jupiter.jpg',
    saturn: '/textures/saturn.jpg',
    uranus: '/textures/uranus.jpg',
    neptune: '/textures/neptune.jpg',
  })

  useFrame((_, dt) => {
    if (sunRef.current) sunRef.current.rotation.y += dt * 0.04
    if (coronaRef.current) coronaRef.current.rotation.z -= dt * 0.02
    if (earthRef.current) earthRef.current.rotation.y += dt * 0.05
  })

  // 8 Planetary Orbit Radii (Schematic representation — not to scale)
  const orbits = [45, 68, 92, 125, 175, 230, 280, 330]

  return (
    <group>
      {/* Rich Multi-Layer Cosmic Starfield */}
      <StarField density="dense" />

      {/* The Sun at [0, 0, 0] */}
      <group position={[0, 0, 0]}>
        {/* Core luminous stellar body with NASA Sun texture */}
        <mesh ref={sunRef}>
          <sphereGeometry args={[26, 48, 48]} />
          <meshBasicMaterial map={textures.sun} />
        </mesh>
        {/* Glowing Solar Corona Rim */}
        <mesh ref={coronaRef} scale={[1.12, 1.12, 1.12]}>
          <sphereGeometry args={[26, 32, 32]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.38}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Outer Solar Flare Glow */}
        <mesh scale={[1.28, 1.28, 1.28]}>
          <sphereGeometry args={[26, 24, 24]} />
          <meshBasicMaterial
            color="#ea580c"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Solar Point Light */}
        <pointLight intensity={380} color="#fffbeb" distance={2000} decay={0.8} />
      </group>

      {/* 8 Schematic Planetary Orbit Rings */}
      {orbits.map((radius, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius, radius + 0.35, 96]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* 1. Mercury */}
      <mesh position={[45, 0, 0]}>
        <sphereGeometry args={[1.6, 24, 24]} />
        <meshStandardMaterial map={textures.mercury} roughness={0.9} />
      </mesh>

      {/* 2. Venus */}
      <mesh position={[-52, 0, 44]}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshStandardMaterial map={textures.venus} roughness={0.7} />
      </mesh>

      {/* 3. Earth & Moon System (Target of the descent) at [0, 0, 62] */}
      <group ref={earthRef} position={[0, 0, 62]}>
        {/* Earth Globe with NASA Earth texture */}
        <mesh>
          <sphereGeometry args={[5.6, 48, 48]} />
          <meshStandardMaterial map={textures.earth} roughness={0.5} metalness={0.05} />
        </mesh>
        {/* Rayleigh Scattering Atmosphere Rim */}
        <mesh scale={[1.08, 1.08, 1.08]}>
          <sphereGeometry args={[5.6, 32, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
        {/* The Moon in orbit */}
        <mesh position={[14, 2, 4]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial map={textures.moon} roughness={0.94} />
        </mesh>
      </group>

      {/* 4. Mars */}
      <mesh position={[75, 0, 100]}>
        <sphereGeometry args={[2.9, 32, 32]} />
        <meshStandardMaterial map={textures.mars} roughness={0.85} />
      </mesh>

      {/* 5. Jupiter */}
      <mesh position={[-130, 0, -115]}>
        <sphereGeometry args={[10.5, 48, 48]} />
        <meshStandardMaterial map={textures.jupiter} roughness={0.6} />
      </mesh>

      {/* 6. Saturn with rings */}
      <group position={[170, 0, -155]} rotation={[0.4, 0.2, 0.1]}>
        <mesh>
          <sphereGeometry args={[8.5, 48, 48]} />
          <meshStandardMaterial map={textures.saturn} roughness={0.65} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 18, 64]} />
          <meshBasicMaterial
            color="#fed7aa"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* 7. Uranus */}
      <mesh position={[-210, 0, 185]}>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshStandardMaterial map={textures.uranus} roughness={0.6} />
      </mesh>

      {/* 8. Neptune */}
      <mesh position={[245, 0, 220]}>
        <sphereGeometry args={[5.0, 32, 32]} />
        <meshStandardMaterial map={textures.neptune} roughness={0.6} />
      </mesh>

      {/* Solitary Paper Plane metaphor descending */}
      <PaperPlane />
    </group>
  )
}
