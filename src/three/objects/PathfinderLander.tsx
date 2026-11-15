import {
  solarPanelMaterial,
  goldFoilMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
} from '../systems/materials'

export function Sojourner() {
  return (
    <group position={[3.2, 0.05, 2.5]}>
      {/* 6-wheeled Rocker-Bogie Micro-Rover Chassis */}
      <mesh position={[0, 0.22, 0]} material={goldFoilMaterial}>
        <boxGeometry args={[0.65, 0.16, 0.48]} />
      </mesh>

      {/* Solar Panel Array Top Deck */}
      <mesh position={[0, 0.31, 0]} material={solarPanelMaterial}>
        <boxGeometry args={[0.63, 0.02, 0.46]} />
      </mesh>

      {/* 6 Cleated Aluminium Wheels */}
      {[
        [-0.26, 0.1, 0.28],
        [0, 0.1, 0.29],
        [0.26, 0.1, 0.28],
        [-0.26, 0.1, -0.28],
        [0, 0.1, -0.29],
        [0.26, 0.1, -0.28],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} material={aluminiumMaterial}>
          <cylinderGeometry args={[0.07, 0.07, 0.08, 12]} />
        </mesh>
      ))}

      {/* Front Stereoscopic Hazard Cameras */}
      {[-0.08, 0.08].map((zOffset, idx) => (
        <mesh key={idx} position={[0.34, 0.26, zOffset]} material={blackStrutMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.04, 6]} />
        </mesh>
      ))}

      {/* Rear APXS (Alpha Proton X-ray Spectrometer) sensor head touching a nearby rock */}
      <mesh position={[-0.38, 0.12, 0]} material={aluminiumMaterial}>
        <boxGeometry args={[0.12, 0.08, 0.08]} />
      </mesh>
    </group>
  )
}

export function PathfinderLander() {
  return (
    <group position={[8, -0.2, -6]}>
      {/* Tetrahedral Base Petal Structure */}
      <mesh position={[0, 0.15, 0]} material={goldFoilMaterial}>
        <cylinderGeometry args={[1.6, 2.2, 0.25, 3]} />
      </mesh>

      {/* Three Opened Petals with Solar Cell Arrays */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
        const x = Math.cos(angle) * 1.5
        const z = Math.sin(angle) * 1.5
        return (
          <mesh
            key={idx}
            position={[x, 0.08, z]}
            rotation={[-0.1, angle, 0]}
            material={solarPanelMaterial}
          >
            <boxGeometry args={[1.3, 0.05, 1.1]} />
          </mesh>
        )
      })}

      {/* Deflated Airbag Protective Buffer Folds (White canvas look) */}
      {[0.4, -0.5, 0.9].map((offset, idx) => (
        <mesh key={idx} position={[offset, 0.06, -offset]} material={aluminiumMaterial}>
          <sphereGeometry args={[0.45, 8, 8]} scale={[1.8, 0.35, 1.1]} />
        </mesh>
      ))}

      {/* IMP Camera Mast (Imager for Mars Pathfinder) */}
      <mesh position={[0, 0.9, 0]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.035, 0.035, 1.4, 8]} />
      </mesh>
      <mesh position={[0, 1.6, 0]} material={blackStrutMaterial}>
        <boxGeometry args={[0.14, 0.18, 0.25]} />
      </mesh>

      {/* Low-gain antenna & Meteorology mast */}
      <mesh position={[-0.5, 0.7, 0.3]} material={aluminiumMaterial}>
        <cylinderGeometry args={[0.015, 0.015, 1.0, 6]} />
      </mesh>

      {/* Deployed Sojourner Rover exploring 3m away */}
      <Sojourner />
    </group>
  )
}
