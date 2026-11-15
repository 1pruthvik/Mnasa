import {
  goldFoilMaterial,
  silverFoilMaterial,
  blackStrutMaterial,
  aluminiumMaterial,
} from '../systems/materials'

export function LMDescent() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Octagonal Central Descent Body (4.2m width, 1.7m height) */}
      <mesh position={[0, 1.8, 0]} material={goldFoilMaterial} castShadow>
        <cylinderGeometry args={[2.1, 2.1, 1.7, 8]} />
      </mesh>

      {/* Top Ascent Stage Stub (Where ascent stage detached) */}
      <mesh position={[0, 2.75, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[1.4, 1.4, 0.2, 16]} />
      </mesh>

      {/* Descent Rocket Engine Skirt (Bell nozzle protruding downward) */}
      <mesh position={[0, 0.7, 0]} material={silverFoilMaterial} castShadow>
        <cylinderGeometry args={[0.5, 0.85, 1.0, 20]} />
      </mesh>

      {/* Four Landing Legs spanning 9.4m */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const footX = cos * 4.7
        const footZ = sin * 4.7

        return (
          <group key={idx}>
            {/* Primary Strut */}
            <mesh
              position={[footX * 0.5, 1.0, footZ * 0.5]}
              rotation={[
                sin * -0.38,
                angle,
                cos * 0.38,
              ]}
              material={blackStrutMaterial}
            >
              <cylinderGeometry args={[0.07, 0.07, 4.4, 8]} />
            </mesh>

            {/* Circular Dished Footpad (0.92m diameter) */}
            <mesh position={[footX, 0.08, footZ]} material={aluminiumMaterial} receiveShadow>
              <cylinderGeometry args={[0.46, 0.46, 0.08, 16]} />
            </mesh>

            {/* Surface Contact Lunar Sensing Probe */}
            <mesh position={[footX, -0.3, footZ]} material={blackStrutMaterial}>
              <cylinderGeometry args={[0.015, 0.015, 0.8, 4]} />
            </mesh>

            {/* Egress Ladder on Forward Leg (idx === 0) */}
            {idx === 0 && (
              <group position={[footX * 0.5, 1.0, footZ * 0.5]}>
                {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((y, rungIdx) => (
                  <mesh
                    key={rungIdx}
                    position={[0, y, 0.15]}
                    material={aluminiumMaterial}
                  >
                    <boxGeometry args={[0.4, 0.03, 0.03]} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        )
      })}

      {/* Commemorative Plaque mounted between forward legs */}
      <mesh position={[1.5, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} material={silverFoilMaterial}>
        <planeGeometry args={[0.3, 0.22]} />
      </mesh>
    </group>
  )
}
