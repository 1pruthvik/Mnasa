import {
  solarPanelMaterial,
  goldFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function OpportunityRover() {
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
        [-0.85, 0.25, 0.85],
        [0, 0.25, 0.95],
        [0.85, 0.25, 0.85],
        [-0.85, 0.25, -0.85],
        [0, 0.25, -0.95],
        [0.85, 0.25, -0.85],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]}>
          {/* Wheel */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={aluminiumMaterial}>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 16]} />
          </mesh>
          {/* Suspension strut connecting to chassis */}
          <mesh position={[0, 0.18, z > 0 ? -0.2 : 0.2]} material={blackStrutMaterial}>
            <cylinderGeometry args={[0.02, 0.02, 0.42, 6]} />
          </mesh>
        </group>
      ))}

      {/* High-Gain Dish Antenna */}
      <mesh position={[-0.45, 1.05, -0.3]} rotation={[-0.4, 0.2, 0]} material={aluminiumMaterial}>
        <sphereGeometry args={[0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
      </mesh>

      {/* Robotic Arm (Instrument Deployment Device) extending forward to rock */}
      <group position={[0.7, 0.45, 0]}>
        <mesh position={[0.35, -0.15, 0]} rotation={[0, 0, -0.7]} material={blackStrutMaterial}>
          <boxGeometry args={[0.06, 0.06, 0.7]} />
        </mesh>
        {/* Turret with Microscopic Imager */}
        <mesh position={[0.7, -0.35, 0]} material={aluminiumMaterial}>
          <boxGeometry args={[0.15, 0.15, 0.18]} />
        </mesh>
      </group>
    </group>
  )
}
