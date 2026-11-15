import { NASA3DModel } from '../components/NASA3DModel'
import {
  solarPanelMaterial,
  whitePaintMaterial,
  aluminiumMaterial,
  blackStrutMaterial,
  copperMaterial,
} from '../systems/materials'

function ProceduralInSightLander() {
  return (
    <group position={[4, -0.2, -6]}>
      {/* Central Lander Deck and Body */}
      <mesh position={[0, 0.7, 0]} material={whitePaintMaterial} castShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.5, 8]} />
      </mesh>

      {/* 3 Landing Gear Legs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
        const x = Math.cos(angle) * 1.8
        const z = Math.sin(angle) * 1.8
        return (
          <group key={idx}>
            <mesh position={[x * 0.5, 0.38, z * 0.5]} material={aluminiumMaterial}>
              <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
            </mesh>
            <mesh position={[x, 0.05, z]} material={aluminiumMaterial}>
              <cylinderGeometry args={[0.24, 0.24, 0.06, 12]} />
            </mesh>
          </group>
        )
      })}

      {/* Dual Decagonal UltraFlex Solar Array Wings (2.15m diameter each) */}
      {[-2.3, 2.3].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0.75, 0]}>
          {/* Circular/Decagonal Array */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={solarPanelMaterial}>
            <cylinderGeometry args={[1.08, 1.08, 0.03, 10]} />
          </mesh>
          {/* Central Mount Bracket */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={aluminiumMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
          </mesh>
        </group>
      ))}

      {/* Instrument Deployment Arm (IDA) reaching to surface */}
      <group position={[0.6, 0.8, 0.5]}>
        <mesh position={[0.4, -0.2, 0.3]} rotation={[0.4, 0.6, -0.6]} material={blackStrutMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
        </mesh>
      </group>

      {/* SEIS Seismometer Wind and Thermal Shield (WTS) Dome on ground */}
      <group position={[1.8, 0.05, 1.2]}>
        <mesh material={copperMaterial} receiveShadow>
          <sphereGeometry args={[0.35, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        </mesh>
      </group>

      {/* HP3 "Mole" Heat Flow Probe Support Structure on ground */}
      <group position={[-1.6, 0.1, 1.0]}>
        <mesh material={aluminiumMaterial}>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
        </mesh>
      </group>
    </group>
  )
}

export function InSightLander() {
  return (
    <NASA3DModel
      url="/models/insight.glb"
      scale={1.2}
      position={[4, -0.2, -6]}
      fallback={<ProceduralInSightLander />}
    />
  )
}
