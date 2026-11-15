import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
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

  // Use NASA regolith texture for high-detail asteroid cratering
  const regolithTexture = useTexture('/textures/moon.jpg')

  useEffect(() => {
    regolithTexture.wrapS = THREE.RepeatWrapping
    regolithTexture.wrapT = THREE.RepeatWrapping
    regolithTexture.needsUpdate = true
  }, [regolithTexture])

  useFrame((_, dt) => {
    if (ceresRef.current) ceresRef.current.rotation.y += dt * 0.02
    if (vestaRef.current) vestaRef.current.rotation.y += dt * 0.025
    if (erosRef.current) erosRef.current.rotation.y += dt * 0.018
  })

  return (
    <group>
      {/* Harsh Single-Source Directional Sunlight (Deep asteroid belt illumination) */}
      <ambientLight intensity={0.06} color="#94a3b8" />
      <directionalLight position={[-60, 40, 50]} intensity={4.5} color="#f8fafc" castShadow />

      {/* Instanced Asteroid Belt Ring */}
      <BeltRocks />

      {/* Scene 4.1: Dawn at Dwarf Planet Ceres & Asteroid Vesta */}
      {sceneId === '4.1' && (
        <>
          {/* Dwarf Planet Ceres (Textured Sphere with Occator Crater Bright Salt Faculae) */}
          <group ref={ceresRef} position={[-20, 0, -30]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[14, 64, 64]} />
              <meshStandardMaterial
                map={regolithTexture}
                color="#52525b"
                roughness={0.92}
                metalness={0.08}
                bumpMap={regolithTexture}
                bumpScale={0.16}
              />
            </mesh>
            {/* Occator Crater Bright Sodium Carbonate Faculae (Cerealia & Vinalia Faculae) */}
            <mesh position={[6.8, 4.2, 11]}>
              <circleGeometry args={[1.4, 24]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <pointLight position={[6.8, 4.2, 11]} intensity={1.5} color="#e0e7ff" distance={8} />
          </group>

          {/* Battered Asteroid Vesta in background */}
          <group ref={vestaRef} position={[45, 12, -45]} scale={[1, 0.86, 0.92]}>
            <mesh castShadow>
              <sphereGeometry args={[9, 48, 48]} />
              <meshStandardMaterial
                map={regolithTexture}
                color="#64748b"
                roughness={0.88}
                metalness={0.14}
                bumpMap={regolithTexture}
                bumpScale={0.2}
              />
            </mesh>
          </group>

          {/* NASA Dawn Spacecraft in Ceres Orbit */}
          <Dawn />
        </>
      )}

      {/* Scene 4.2: NEAR Shoemaker landed on Asteroid 433 Eros */}
      {sceneId === '4.2' && (
        <>
          {/* Elongated Asteroid 433 Eros (Irregular peanut / saddle shaped) */}
          <group ref={erosRef} position={[-40, -6, -10]} scale={[6.2, 4.2, 12]}>
            <mesh castShadow receiveShadow>
              <dodecahedronGeometry args={[1, 3]} />
              <meshStandardMaterial
                map={regolithTexture}
                color="#78716c"
                roughness={0.94}
                metalness={0.08}
                bumpMap={regolithTexture}
                bumpScale={0.25}
              />
            </mesh>
          </group>

          {/* NEAR Shoemaker landed on Eros surface at Himeros */}
          <NEARShoemaker />
        </>
      )}
    </group>
  )
}
