import { NASA3DModel } from '../components/NASA3DModel'
import {
  whitePaintMaterial,
  aluminiumMaterial,
  goldFoilMaterial,
  blackStrutMaterial,
} from '../systems/materials'

function ProceduralVikingLander() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Hexagonal Main Body Bus with thermal insulation blankets */}
      <mesh position={[0, 0.9, 0]} material={whitePaintMaterial} castShadow>
        <cylinderGeometry args={[1.7, 1.9, 0.9, 6]} />
      </mesh>

      {/* Gold thermal blankets on sides */}
      <mesh position={[0, 0.9, 0]} material={goldFoilMaterial}>
        <cylinderGeometry args={[1.72, 1.92, 0.4, 6]} />
      </mesh>

      {/* 3 Shock-Absorbing Landing Legs with Footpads */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
        const x = Math.cos(angle) * 2.4
        const z = Math.sin(angle) * 2.4
        return (
          <group key={idx}>
            <mesh position={[x * 0.5, 0.5, z * 0.5]} material={aluminiumMaterial}>
              <cylinderGeometry args={[0.06, 0.06, 1.9, 8]} />
            </mesh>
            <mesh position={[x, 0.06, z]} material={aluminiumMaterial} receiveShadow>
              <cylinderGeometry args={[0.35, 0.35, 0.08, 12]} />
            </mesh>
          </group>
        )
      })}

      {/* Two SNAP-19 RTG Cylindrical Power Housings */}
      {[-0.85, 0.85].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 1.4, -0.4]}>
          <mesh material={aluminiumMaterial}>
            <cylinderGeometry args={[0.26, 0.26, 0.55, 12]} />
          </mesh>
        </group>
      ))}

      {/* Parabolic High-Gain Dish Antenna */}
      <mesh position={[0, 1.7, 0.4]} rotation={[0.5, 0.3, 0]} material={whitePaintMaterial}>
        <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
      </mesh>

      {/* Surface Soil Collector Sampler Arm extended */}
      <group position={[0.8, 0.8, 0.8]}>
        <mesh position={[0.7, -0.2, 0.4]} rotation={[0.3, 0.5, -0.4]} material={blackStrutMaterial}>
          <boxGeometry args={[0.08, 0.08, 1.8]} />
        </mesh>
      </group>
    </group>
  )
}

export function VikingLander() {
  return (
    <NASA3DModel
      url="/models/viking-lander.glb"
      scale={1.3}
      position={[0, -0.2, 0]}
      fallback={<ProceduralVikingLander />}
    />
  )
}
