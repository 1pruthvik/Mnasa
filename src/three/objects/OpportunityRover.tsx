import { NASA3DModel } from '../components/NASA3DModel'
import {
  solarPanelMaterial,
  goldFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

function ProceduralOpportunityRover() {
  return (
    <group position={[-8, -0.2, -8]}>
      {/* Central Equipment Warm Electronics Box (WEB) */}
      <mesh position={[0, 0.55, 0]} material={goldFoilMaterial} castShadow>
        <boxGeometry args={[1.5, 0.45, 1.1]} />
      </mesh>

      {/* Distinctive Winged Solar Array Top Deck */}
      <group position={[0, 0.8, 0]}>
        {/* Center panel */}
        <mesh material={solarPanelMaterial}>
          <boxGeometry args={[1.6, 0.04, 1.2]} />
        </mesh>
        {/* Port wing */}
        <mesh position={[-1.15, -0.05, 0]} rotation={[0, 0, 0.08]} material={solarPanelMaterial}>
          <boxGeometry args={[0.7, 0.03, 1.1]} />
        </mesh>
        {/* Starboard wing */}
        <mesh position={[1.15, -0.05, 0]} rotation={[0, 0, -0.08]} material={solarPanelMaterial}>
          <boxGeometry args={[0.7, 0.03, 1.1]} />
        </mesh>
      </group>

      {/* Pancam Mast Assembly (PMA) with stereo cameras */}
      <group position={[0.45, 0.85, 0.35]}>
        <mesh position={[0, 0.65, 0]} material={aluminiumMaterial}>
          <cylinderGeometry args={[0.035, 0.035, 1.3, 8]} />
        </mesh>
        {/* Camera Bar Head */}
        <mesh position={[0, 1.35, 0]} material={blackStrutMaterial}>
          <boxGeometry args={[0.12, 0.1, 0.38]} />
        </mesh>
        {/* Left and Right Camera Optics */}
        {[-0.14, 0.14].map((z, idx) => (
          <mesh key={idx} position={[0.07, 1.35, z]} rotation={[0, Math.PI / 2, 0]} material={aluminiumMaterial}>
            <cylinderGeometry args={[0.025, 0.025, 0.06, 8]} />
          </mesh>
        ))}
      </group>

      {/* 6-Wheeled Rocker-Bogie Suspension */}
      {[
        [-0.8, 0.22, 0.65],
        [0, 0.22, 0.72],
        [0.8, 0.22, 0.65],
        [-0.8, 0.22, -0.65],
        [0, 0.22, -0.72],
        [0.8, 0.22, -0.65],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={aluminiumMaterial}>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
          </mesh>
        </group>
      ))}

      {/* Instrument Deployment Device (IDD) robotic arm */}
      <group position={[0.7, 0.45, 0]}>
        <mesh position={[0.4, -0.15, 0]} rotation={[0, 0, -0.4]} material={aluminiumMaterial}>
          <boxGeometry args={[0.75, 0.06, 0.06]} />
        </mesh>
      </group>
    </group>
  )
}

export function OpportunityRover() {
  return (
    <NASA3DModel
      url="/models/opportunity.glb"
      scale={1.2}
      position={[-8, -0.2, -8]}
      fallback={<ProceduralOpportunityRover />}
    />
  )
}
