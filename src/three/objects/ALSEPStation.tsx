import {
  whitePaintMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
  copperMaterial,
} from '../systems/materials'

export function RTG_SNAP27() {
  return (
    <group position={[2, 0, -2]}>
      {/* Central RTG Cylinder (46cm high) */}
      <mesh position={[0, 0.35, 0]} material={copperMaterial}>
        <cylinderGeometry args={[0.18, 0.18, 0.46, 16]} />
      </mesh>

      {/* Radial Heat Dissipation Cooling Fins */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((ang, idx) => (
        <mesh key={idx} position={[0, 0.35, 0]} rotation={[0, ang, 0]} material={aluminiumMaterial}>
          <boxGeometry args={[0.55, 0.42, 0.02]} />
        </mesh>
      ))}

      {/* Graphite Fuel Cask Dome */}
      <mesh position={[0, 0.6, 0]} material={blackStrutMaterial}>
        <sphereGeometry args={[0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
      </mesh>

      {/* Power Cable Ribbon connecting to ALSEP Central Station */}
      <mesh position={[-1.0, 0.03, 0]} material={blackStrutMaterial}>
        <boxGeometry args={[2.0, 0.02, 0.08]} />
      </mesh>
    </group>
  )
}

export function ALSEPStation() {
  return (
    <group position={[25, -0.2, 11]}>
      {/* Central Station Box (25kg, 0.5m cube) on short legs */}
      <mesh position={[0, 0.38, 0]} material={whitePaintMaterial}>
        <boxGeometry args={[0.62, 0.48, 0.55]} />
      </mesh>

      {/* Radiator Face Louvers */}
      {[-0.15, -0.05, 0.05, 0.15].map((y, idx) => (
        <mesh key={idx} position={[0, 0.38 + y, 0.28]} material={aluminiumMaterial}>
          <boxGeometry args={[0.5, 0.03, 0.02]} />
        </mesh>
      ))}

      {/* Helical Antenna Mast (58cm long) */}
      <mesh position={[0, 0.95, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
      </mesh>

      {/* Four Supporting Legs */}
      {[
        [-0.26, 0.1, -0.22],
        [0.26, 0.1, -0.22],
        [-0.26, 0.1, 0.22],
        [0.26, 0.1, 0.22],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]} material={aluminiumMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 6]} />
        </mesh>
      ))}

      {/* SNAP-27 RTG Unit */}
      <RTG_SNAP27 />
    </group>
  )
}
