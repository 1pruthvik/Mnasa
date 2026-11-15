import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  solarPanelMaterial,
  whitePaintMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function Dawn() {
  const dawnRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (dawnRef.current) {
      dawnRef.current.rotation.y += dt * 0.04
    }
  })

  return (
    <group ref={dawnRef} position={[-25, 8, -15]}>
      {/* Central Box Bus Body */}
      <mesh material={whitePaintMaterial} castShadow>
        <boxGeometry args={[1.6, 1.8, 1.4]} />
      </mesh>

      {/* 1.52m High-Gain Parabolic Dish Antenna */}
      <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]} material={aluminiumMaterial}>
        <sphereGeometry args={[0.76, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>

      {/* Two Enormous Solar Array Wings (19.8m total span) */}
      {[-1, 1].map((dir, idx) => (
        <group key={idx} position={[dir * 5.5, 0, 0]}>
          <mesh material={solarPanelMaterial}>
            <boxGeometry args={[8.2, 1.4, 0.04]} />
          </mesh>
          {/* Mount Yoke */}
          <mesh position={[-dir * 4.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={blackStrutMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 1.2, 6]} />
          </mesh>
        </group>
      ))}

      {/* 3 Xenon Ion Thruster Nozzles with subtle blue glow */}
      {[-0.4, 0, 0.4].map((x, idx) => (
        <group key={idx} position={[x, -0.95, -0.2]}>
          <mesh rotation={[Math.PI, 0, 0]} material={aluminiumMaterial}>
            <cylinderGeometry args={[0.16, 0.08, 0.25, 12]} />
          </mesh>
          {/* Xenon Glow Point */}
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
