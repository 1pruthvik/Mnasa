import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { CelestialBodyData } from '../types'
import { CELESTIAL_BODIES } from '../data/spaceData'

interface SpaceCanvasProps {
  selectedBody: CelestialBodyData
  onSelectBody: (body: CelestialBodyData) => void
  speedMultiplier: number
}

// Orbit Ring component
function OrbitRing({ radius }: { radius: number }) {
  if (radius <= 0) return null
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
      <meshBasicMaterial color="#38bdf8" opacity={0.15} transparent side={THREE.DoubleSide} />
    </mesh>
  )
}

// Sun component with pulsing glow
function Sun({ body, isSelected, onClick }: { body: CelestialBodyData; isSelected: boolean; onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group onClick={(e) => { e.stopPropagation(); onClick() }}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[body.radius, 48, 48]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      {/* Sun glow atmosphere */}
      <mesh scale={1.15}>
        <sphereGeometry args={[body.radius, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.25} side={THREE.BackSide} />
      </mesh>
      <pointLight color="#fff" intensity={3} distance={100} decay={0.8} />
      {isSelected && (
        <mesh>
          <sphereGeometry args={[body.radius + 0.3, 32, 32]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  )
}

// Orbiting Planet / Spacecraft
function OrbitingBody({
  body,
  isSelected,
  onClick,
  speedMultiplier,
}: {
  body: CelestialBodyData
  isSelected: boolean
  onClick: () => void
  speedMultiplier: number
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const moonGroupRef = useRef<THREE.Group>(null!)
  const moonMeshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.2 * speedMultiplier

    if (groupRef.current && body.orbitRadius > 0) {
      const angle = time * body.orbitSpeed
      const x = Math.cos(angle) * body.orbitRadius
      const z = Math.sin(angle) * body.orbitRadius
      groupRef.current.position.set(x, 0, z)
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * speedMultiplier
    }

    // Moon orbiting Earth
    if (body.id === 'earth' && moonGroupRef.current) {
      const moonAngle = time * 2.5
      const moonX = Math.cos(moonAngle) * 2.2
      const moonZ = Math.sin(moonAngle) * 2.2
      moonGroupRef.current.position.set(moonX, 0, moonZ)
      if (moonMeshRef.current) {
        moonMeshRef.current.rotation.y += 0.008
      }
    }
  })

  return (
    <>
      <OrbitRing radius={body.orbitRadius} />
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto'
          }}
        >
          <sphereGeometry args={[body.radius, 32, 32]} />
          <meshStandardMaterial
            color={body.color}
            roughness={body.roughness}
            emissive={body.emissive ? body.emissive : '#000000'}
            emissiveIntensity={body.emissive ? 0.6 : 0}
          />
        </mesh>

        {/* Selected Highlight wireframe indicator */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[body.radius + 0.25, 24, 24]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.6} />
          </mesh>
        )}

        {/* If Earth, render Moon child system */}
        {body.id === 'earth' && (
          <>
            <OrbitRing radius={2.2} />
            <group ref={moonGroupRef}>
              <mesh ref={moonMeshRef}>
                <sphereGeometry args={[0.35, 24, 24]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.9} />
              </mesh>
            </group>
          </>
        )}
      </group>
    </>
  )
}

export const SpaceCanvas: React.FC<SpaceCanvasProps> = ({
  selectedBody,
  onSelectBody,
  speedMultiplier,
}) => {
  const sunData = CELESTIAL_BODIES.find((b) => b.id === 'sun')!
  const planetData = CELESTIAL_BODIES.filter((b) => b.id !== 'sun' && b.id !== 'moon')

  return (
    <div className="w-full h-full relative bg-slate-950">
      <Canvas
        camera={{ position: [0, 22, 28], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.15} />

        {/* Background stars */}
        <Stars radius={120} depth={60} count={6000} factor={4} saturation={0.5} fade speed={1.5} />

        {/* Sun in center */}
        <Sun
          body={sunData}
          isSelected={selectedBody.id === 'sun'}
          onClick={() => onSelectBody(sunData)}
        />

        {/* Planets and spacecraft */}
        {planetData.map((body) => (
          <OrbitingBody
            key={body.id}
            body={body}
            isSelected={selectedBody.id === body.id}
            onClick={() => onSelectBody(body)}
            speedMultiplier={speedMultiplier}
          />
        ))}

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          maxDistance={80}
          minDistance={4}
        />
      </Canvas>
    </div>
  )
}
