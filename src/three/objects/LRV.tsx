import {
  aluminiumMaterial,
  antennaMeshMaterial,
  blackStrutMaterial,
  whitePaintMaterial,
} from '../systems/materials'

export function LRV() {
  return (
    <group position={[22, -0.2, 8]}>
      {/* Chassis Frame (3.1m long, 1.8m wide, 1.14m high) */}
      <mesh position={[0, 0.45, 0]} material={aluminiumMaterial}>
        <boxGeometry args={[3.1, 0.18, 1.8]} />
      </mesh>

      {/* 4 Open Wire-Mesh Wheels with Chevron Treads (81.8cm diameter, 23cm wide) */}
      {[
        [-1.15, 0.41, 0.95],
        [1.15, 0.41, 0.95],
        [-1.15, 0.41, -0.95],
        [1.15, 0.41, -0.95],
      ].map(([x, y, z], idx) => (
        <group key={idx} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Wire Mesh Outer Tyre */}
          <mesh material={aluminiumMaterial}>
            <torusGeometry args={[0.41, 0.11, 8, 20]} />
          </mesh>
          {/* Spun Aluminium Hub */}
          <mesh material={aluminiumMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.22, 12]} />
          </mesh>
          {/* Chevron Cleat Ring */}
          <mesh material={blackStrutMaterial}>
            <cylinderGeometry args={[0.42, 0.42, 0.12, 16, 1, true]} />
          </mesh>
        </group>
      ))}

      {/* Two Crew Bucket Seats side-by-side with tubular frame */}
      {[-0.35, 0.35].map((zOffset, idx) => (
        <group key={idx} position={[-0.2, 0.75, zOffset]}>
          {/* Seat back */}
          <mesh rotation={[0, 0, -0.2]} material={whitePaintMaterial}>
            <boxGeometry args={[0.1, 0.7, 0.55]} />
          </mesh>
          {/* Seat base */}
          <mesh position={[0.25, -0.25, 0]} material={whitePaintMaterial}>
            <boxGeometry args={[0.55, 0.08, 0.55]} />
          </mesh>
        </group>
      ))}

      {/* Front Equipment Console & T-handle Joystick */}
      <mesh position={[0.5, 0.8, 0]} material={blackStrutMaterial}>
        <boxGeometry args={[0.25, 0.4, 0.4]} />
      </mesh>
      <mesh position={[0.45, 1.05, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 6]} />
      </mesh>

      {/* High-Gain Parabolic Mesh Dish Antenna on Forward Mast */}
      <group position={[1.1, 1.4, 0.4]}>
        <mesh material={aluminiumMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
        </mesh>
        {/* Parabolic Dish */}
        <mesh position={[0, 0.6, 0]} rotation={[0.4, 0.5, 0]} material={antennaMeshMaterial}>
          <sphereGeometry args={[0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        </mesh>
      </group>

      {/* Low-gain antenna & color TV camera */}
      <mesh position={[1.1, 1.0, -0.4]} material={whitePaintMaterial}>
        <boxGeometry args={[0.18, 0.18, 0.28]} />
      </mesh>
    </group>
  )
}
