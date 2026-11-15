import { useStore } from '../../store'
import { StarField } from '../env/StarField'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Dawn } from '../objects/Dawn'
import { NEARShoemaker } from '../objects/NEARShoemaker'

export function Chapter04Belt() {
  const ceresRef = useRef<THREE.Group>(null!)
  const erosRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (ceresRef.current) ceresRef.current.rotation.y += dt * 0.02
  })

  const scene = useStore(s => s.activeSceneId)

  return (
    <group>
      {/* Harsh Single-Source Directional Sunlight (Lonely deep space lighting) */}
      <ambientLight intensity={0.04} color="#64748b" />
      <directionalLight position={[-60, 40, 50]} intensity={4.2} color="#ffffff" />

      {/* Instanced Asteroid Belt Ring */}
      <StarField density="sparse" />

      {/* Dwarf Planet Ceres (Sphere with Occator Crater Bright Salt Faculae) */}
      <group visible={scene === '4.1'} ref={ceresRef} position={[-20, 0, -30]}>
        <mesh castShadow>
          <sphereGeometry args={[14, 48, 48]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.92}
            metalness={0.08}
          />
        </mesh>
        {/* Occator Crater Bright Salt Faculae Spot */}
        <mesh position={[6.8, 4.2, 11]}>
          <circleGeometry args={[1.2, 16]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      </group>

      {/* Elongated Asteroid 433 Eros (Irregular peanut scale [1.0, 0.62, 2.4]) */}
      <group visible={scene === '4.2'} ref={erosRef} position={[-40, -6, -10]} scale={[6.2, 4.2, 12]}>
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

      {/* Dawn Spacecraft in Ceres Orbit */}
      {scene === '4.1' && <Dawn />}

      {/* NEAR Shoemaker landed on Eros */}
      {scene === '4.2' && <NEARShoemaker />}
    </group>
  )
}

