import {
  aluminiumMaterial,
  solarPanelMaterial,
  whitePaintMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function Surveyor() {
  return (
    <group position={[-16, -0.2, -6]}>
      {/* Triangular Tubular Aluminum Spaceframe */}
      <mesh position={[0, 0.8, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.9, 1.2, 1.1, 3]} />
      </mesh>

      {/* 3 Landing Gear Legs with shock absorbers and footpads */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
        const x = Math.cos(angle) * 1.8
        const z = Math.sin(angle) * 1.8
        return (
          <group key={idx}>
            <mesh position={[x * 0.5, 0.45, z * 0.5]} material={aluminiumMaterial}>
              <cylinderGeometry args={[0.04, 0.04, 1.8, 8]} />
            </mesh>
            <mesh position={[x, 0.05, z]} material={aluminiumMaterial}>
              <cylinderGeometry args={[0.22, 0.22, 0.06, 12]} />
            </mesh>
          </group>
        )
      })}

      {/* Central Mast */}
      <mesh position={[0, 1.9, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 1.4, 8]} />
      </mesh>

      {/* Planar Solar Panel Array on top of mast */}
      <mesh position={[0.2, 2.6, 0]} rotation={[0.4, 0.2, 0.6]} material={solarPanelMaterial}>
        <boxGeometry args={[0.85, 1.1, 0.04]} />
      </mesh>

      {/* Planar High-Gain Antenna */}
      <mesh position={[-0.2, 2.4, 0]} rotation={[-0.3, 0.5, 0]} material={whitePaintMaterial}>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 16]} />
      </mesh>

      {/* Surface Soil Sampler Scoop Arm extended into regolith */}
      <group position={[0.6, 0.5, 0.4]}>
        <mesh position={[0.4, 0, 0.3]} rotation={[0.4, 0.6, -0.5]} material={aluminiumMaterial}>
          <boxGeometry args={[0.06, 0.06, 1.2]} />
        </mesh>
        {/* Sampler scoop head touching ground */}
        <mesh position={[0.8, -0.4, 0.6]} material={blackStrutMaterial}>
          <boxGeometry args={[0.12, 0.08, 0.16]} />
        </mesh>
      </group>

      {/* Television Camera Housing */}
      <mesh position={[-0.4, 1.1, 0.2]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 0.42, 12]} />
      </mesh>
    </group>
  )
}
