import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BeltRocks } from '../env/BeltRocks'
import { Dawn } from '../objects/Dawn'
import { NEARShoemaker } from '../objects/NEARShoemaker'
import { useStore } from '../../store'
import { beatAt } from '../../contracts/beats'

export function Chapter04Belt() {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneId = beat.sceneId

  const ceresRef = useRef<THREE.Group>(null!)
  const vestaRef = useRef<THREE.Group>(null!)
  const erosRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (ceresRef.current) ceresRef.current.rotation.y += dt * 0.02
    if (vestaRef.current) vestaRef.current.rotation.y += dt * 0.025
    if (erosRef.current) erosRef.current.rotation.y += dt * 0.018
  })

  return (
    <group>
      {/* Harsh Single-Source Directional Sunlight (Lonely deep space lighting) */}
      <ambientLight intensity={0.04} color="#64748b" />
      <directionalLight position={[-60, 40, 50]} intensity={4.2} color="#ffffff" />

      {/* Instanced Asteroid Belt Ring */}
      <BeltRocks />

      {/* Scene 4.1: Dawn at Dwarf Planet Ceres & Asteroid Vesta */}
      {sceneId === '4.1' && (
        <>
          {/* Dwarf Planet Ceres (Sphere with Occator Crater Bright Salt Faculae) */}
          <group ref={ceresRef} position={[-20, 0, -30]}>
            <mesh castShadow>
              <sphereGeometry args={[14, 48, 48]} />
              <meshStandardMaterial
                color="#475569"
                roughness={0.92}
                metalness={0.08}
              />
            </mesh>
            <mesh position={[6.8, 4.2, 11]}>
              <circleGeometry args={[1.2, 16]} />
              <meshBasicMaterial color="#f8fafc" />
            </mesh>
          </group>

          {/* Battered Asteroid Vesta */}
          <group ref={vestaRef} position={[45, 12, -45]} scale={[1, 0.86, 0.92]}>
            <mesh castShadow>
              <sphereGeometry args={[9, 36, 36]} />
              <meshStandardMaterial
                color="#64748b"
                roughness={0.88}
                metalness={0.14}
                flatShading
              />
            </mesh>
          </group>

          {/* Dawn Spacecraft in Ceres Orbit */}
          <Dawn />
        </>
      )}

      {/* Scene 4.2: NEAR Shoemaker landed on Asteroid 433 Eros */}
      {sceneId === '4.2' && (
        <>
          {/* Elongated Asteroid 433 Eros (Irregular peanut scale) */}
          <group ref={erosRef} position={[-40, -6, -10]} scale={[6.2, 4.2, 12]}>
            <mesh castShadow>
              <dodecahedronGeometry args={[1, 2]} />
              <meshStandardMaterial
                color="#78716c"
                roughness={0.94}
                metalness={0.08}
                flatShading
              />
            </mesh>
          </group>

          {/* NEAR Shoemaker landed on Eros surface */}
          <NEARShoemaker />
        </>
      )}
    </group>
  )
}
