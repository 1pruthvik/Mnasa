import {
  solarPanelMaterial,
  goldFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function NEARShoemaker() {
  return (
    <group position={[-40, -1.9, -7]}>
      {/* Octagonal Main Spacecraft Bus */}
      <mesh position={[0, 0.7, 0]} material={goldFoilMaterial}>
        <cylinderGeometry args={[0.9, 0.9, 1.2, 8]} />
      </mesh>

      {/* 4 Fixed Solar Array Wings */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
        const x = Math.cos(angle) * 1.8
        const z = Math.sin(angle) * 1.8
        return (
          <mesh
            key={idx}
            position={[x, 0.7, z]}
            rotation={[0, angle, 0]}
            material={solarPanelMaterial}
          >
            <boxGeometry args={[1.4, 0.9, 0.04]} />
          </mesh>
        )
      })}

      {/* 1.8m High-Gain Dish Antenna */}
      <mesh position={[0, 1.45, 0]} rotation={[-0.3, 0.4, 0]} material={aluminiumMaterial}>
        <sphereGeometry args={[0.65, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
      </mesh>

      {/* Magnetometer Boom */}
      <mesh position={[0.6, 0.4, 0.6]} rotation={[0.4, 0.6, 0]} material={blackStrutMaterial}>
        <cylinderGeometry args={[0.02, 0.02, 1.4, 6]} />
      </mesh>
    </group>
  )
}
