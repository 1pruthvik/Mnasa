import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { NASA3DModel } from '../components/NASA3DModel'
import {
  aluminiumMaterial,
  goldFoilMaterial,
  blackStrutMaterial,
  copperMaterial,
} from '../systems/materials'

function ProceduralPioneer10() {
  return (
    <group rotation={[0.2, 0.4, 0]}>
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
          <mesh material={copperMaterial}>
            <cylinderGeometry args={[0.22, 0.22, 0.58, 8]} />
          </mesh>
          {/* Boom strut */}
          <mesh position={[-dir * 1.3, 0.2, 0.4]} rotation={[0, 0, dir * 0.3]} material={blackStrutMaterial}>
            <cylinderGeometry args={[0.025, 0.025, 2.6, 4]} />
          </mesh>
        </group>
      ))}

      {/* Magnetometer 6.6-meter Boom */}
      <mesh position={[0, 3.2, -0.8]} rotation={[0.2, 0, 0]} material={blackStrutMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 3.8, 4]} />
      </mesh>

      {/* The Gold-Anodized Aluminum Plaque */}
      <group position={[0.42, -0.5, 0.45]} rotation={[0.1, -0.2, 0]}>
        <mesh material={goldFoilMaterial}>
          <boxGeometry args={[0.46, 0.32, 0.02]} />
        </mesh>
      </group>
    </group>
  )
}

export function Pioneer10() {
  const pioneerRef = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (pioneerRef.current) {
      pioneerRef.current.rotation.z += dt * 0.02
    }
  })

  return (
    <group ref={pioneerRef} position={[0, 0, -36]}>
      <NASA3DModel
        url="/models/pioneer10.glb"
        scale={1.4}
        fallback={<ProceduralPioneer10 />}
      />
    </group>
  )
}
