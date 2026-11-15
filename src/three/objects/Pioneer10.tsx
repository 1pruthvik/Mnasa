import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  aluminiumMaterial,
  goldFoilMaterial,
  blackStrutMaterial,
  copperMaterial,
} from '../systems/materials'

export function Pioneer10() {
  const pioneerRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (pioneerRef.current) {
      // Very slow drift rotation as described in the script
      pioneerRef.current.rotation.z += dt * 0.02
    }
  })

  return (
    <group ref={pioneerRef} position={[0, 0, -180]} rotation={[0.2, 0.4, 0]}>
      {/* 2.74-meter Parabolic High-Gain Antenna Dish pointing to Earth */}
      <mesh material={aluminiumMaterial} castShadow>
        <sphereGeometry args={[2.74, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>

      {/* Subreflector Feed Tripod Horn */}
      <mesh position={[0, 0, 1.2]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.08, 0.22, 0.35, 8]} />
      </mesh>
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((ang, idx) => (
        <mesh
          key={idx}
          position={[Math.cos(ang) * 0.6, Math.sin(ang) * 0.6, 0.6]}
          rotation={[Math.sin(ang) * 0.5, -Math.cos(ang) * 0.5, ang]}
          material={blackStrutMaterial}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.3, 6]} />
        </mesh>
      ))}

      {/* Hexagonal Equipment Compartment behind dish */}
      <mesh position={[0, 0, -0.6]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.85, 0.85, 0.7, 6]} />
      </mesh>

      {/* Two SNAP-19 RTG Power Units on Extended Truss Booms */}
      {[-1, 1].map((dir, idx) => (
        <group key={idx} position={[dir * 2.8, -0.4, -0.8]} rotation={[0, 0, dir * 0.2]}>
          {/* Truss Boom */}
          <mesh position={[-dir * 1.2, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={blackStrutMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 2.4, 6]} />
          </mesh>
          {/* RTG Cylinders with Fins */}
          <mesh material={copperMaterial}>
            <cylinderGeometry args={[0.22, 0.22, 0.65, 10]} />
          </mesh>
        </group>
      ))}

      {/* Magnetometer Boom extending far out */}
      <mesh position={[0, 3.4, -0.8]} material={blackStrutMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 4.2, 6]} />
      </mesh>

      {/* The Famous Golden Pioneer Plaque */}
      <mesh position={[0.65, 0.2, -0.3]} rotation={[0, 0.3, 0]} material={goldFoilMaterial}>
        <planeGeometry args={[0.55, 0.38]} />
      </mesh>
    </group>
  )
}

