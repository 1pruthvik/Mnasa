import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store'
import type { ChapterId } from '../../contracts/types'

// Chapter 00: Milky Way, Sun, Orbits, Earth, Door
function Chapter00Descent() {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.05
  })

  return (
    <group>
      <Stars radius={400} depth={100} count={5000} factor={4} fade />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={200} color="#fbbf24" distance={1000} />
      {/* Sun */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[18, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      {/* Earth marker */}
      <mesh position={[0, 0, -50]}>
        <sphereGeometry args={[4, 24, 24]} />
        <meshStandardMaterial color="#2563eb" roughness={0.6} />
      </mesh>
    </group>
  )
}

// Chapter 01: The Moon
function Chapter01Moon() {
  return (
    <group>
      <ambientLight intensity={0.06} />
      <directionalLight position={[20, 10, 15]} intensity={3.2} color="#fff6e8" />
      {/* Moon Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial color="#64748b" roughness={0.95} />
      </mesh>
      {/* Apollo 11 Eagle LM Descent Stage Marker */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.1, 2.1, 1.7, 8]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Surveyor 3 (~180m away representation) */}
      <mesh position={[-16, 0, -6]}>
        <coneGeometry args={[1, 1.5, 3]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>
      {/* LRV Lunar Roving Vehicle */}
      <mesh position={[12, -1, 5]}>
        <boxGeometry args={[3.1, 1.1, 1.8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Chapter 02: Mars Early (Viking 1, Pathfinder, Sojourner)
function Chapter02MarsEarly() {
  return (
    <group>
      <ambientLight intensity={0.25} color="#b4685a" />
      <directionalLight position={[15, 26, 10]} intensity={2.4} color="#ffd9b0" />
      {/* Mars Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial color="#a8563a" roughness={0.85} />
      </mesh>
      {/* Viking 1 Lander */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 1.2, 6]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
      </mesh>
      {/* Pathfinder & Sojourner */}
      <mesh position={[8, -1, -6]}>
        <boxGeometry args={[1.5, 0.8, 1.5]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
    </group>
  )
}

// Chapter 03: Mars Long (Spirit, Opportunity, InSight, Ingenuity)
function Chapter03MarsLong() {
  const rotorRef = useRef<THREE.Group>(null!)
  const progress = useStore((s) => s.progress)
  // Freeze at t >= 0.63
  const isFrozen = progress >= 0.63

  useFrame((_, dt) => {
    if (rotorRef.current && !isFrozen) {
      rotorRef.current.rotation.y += dt * 25
    }
  })

  return (
    <group>
      <ambientLight intensity={0.25} color="#b4685a" />
      <directionalLight position={[10, 25, 10]} intensity={2.4} color="#ffd9b0" />
      {/* Mars Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[200, 200, 32, 32]} />
        <meshStandardMaterial color="#a8563a" roughness={0.85} />
      </mesh>
      {/* InSight Lander with solar arrays */}
      <mesh position={[4, 0, -8]}>
        <cylinderGeometry args={[1.6, 1.6, 0.6, 16]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Ingenuity Helicopter */}
      <group position={[8, 4, -2]}>
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <group ref={rotorRef} position={[0, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[1.2, 0.02, 0.1]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// Chapter 04: Asteroid Belt (Dawn, NEAR Shoemaker at Eros)
function Chapter04Belt() {
  return (
    <group>
      <ambientLight intensity={0.05} />
      <directionalLight position={[30, 20, 20]} intensity={3.6} color="#ffffff" />
      {/* Ceres Dwarf Planet */}
      <mesh position={[-20, 0, -30]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>
      {/* Asteroid 433 Eros elongated potato */}
      <mesh position={[-40, -6, -10]} scale={[1, 0.62, 2.4]}>
        <icosahedronGeometry args={[4, 2]} />
        <meshStandardMaterial color="#78716c" roughness={0.85} />
      </mesh>
      {/* NEAR Spacecraft */}
      <mesh position={[-40, -2, -10]}>
        <boxGeometry args={[1.2, 0.8, 1.2]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
      </mesh>
    </group>
  )
}

// Chapter 05: Deep Space & Interstellar (Pioneer 10, Kepler)
function Chapter05Anywhere() {
  const dishRef = useRef<THREE.Group>(null!)
  useFrame((_, dt) => {
    if (dishRef.current) dishRef.current.rotation.y += dt * 0.05
  })

  return (
    <group>
      <Stars radius={300} depth={80} count={3000} factor={3} fade />
      <ambientLight intensity={0.1} />
      <directionalLight position={[-10, 10, 20]} intensity={2.0} />
      {/* Pioneer 10 with 2.9m parabolic dish */}
      <group ref={dishRef} position={[0, 0, -180]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3, 0.5, 0.8, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      {/* Kepler Barrel Telescope */}
      <mesh position={[0, 0, -120]} rotation={[0.4, 0.6, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 4.7, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.3} />
      </mesh>
    </group>
  )
}

// Chapter 06: Inventory & Resolution Room
function Chapter06Inventory() {
  return (
    <group>
      <ambientLight intensity={0.4} />
      {/* Constellation of 15 dots for each object */}
      <Stars radius={200} count={1000} factor={2} fade />
    </group>
  )
}

const CHAPTER_MAP: Record<ChapterId, React.ComponentType> = {
  'ch00-descent': Chapter00Descent,
  'ch01-moon': Chapter01Moon,
  'ch02-mars-early': Chapter02MarsEarly,
  'ch03-mars-long': Chapter03MarsLong,
  'ch04-belt': Chapter04Belt,
  'ch05-anywhere': Chapter05Anywhere,
  'ch06-inventory': Chapter06Inventory,
}

export default function ChapterSwitch() {
  const activeChapter = useStore((s) => s.activeChapter)
  const Component = CHAPTER_MAP[activeChapter] || Chapter00Descent
  return <Component key={activeChapter} />
}

