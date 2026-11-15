// src/three/chapters/Chapter03MarsLong.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'
import { localU } from '../../contracts/beats'
import { WORLD_SCALE } from '../systems/project'
import { useDisposeRegistry } from '../systems/dispose'
import MarsTerrain from '../env/MarsTerrain'
import DustField from '../env/DustField'
import SpiritRover from '../objects/SpiritRover'
import OpportunityRover from '../objects/OpportunityRover'
import InSightLander from '../objects/InSightLander'
import Ingenuity from '../objects/Ingenuity'

export default function Chapter03MarsLong() {
  useDisposeRegistry()
  const progress = useStore(s => s.progress)
  const frozenRef = useRef(false)

  // Freeze state latch: once progress >= 0.63, freeze forever while mounted
  if (progress >= 0.63) {
    frozenRef.current = true
  }

  const isFrozen = frozenRef.current

  // Local progress values:
  // Scene 3.1: MER (0.490 .. 0.535)
  const uMER = localU(progress, 0.490, 0.535)
  // Scene 3.2: InSight (0.535 .. 0.585)
  const uInSight = localU(progress, 0.535, 0.585)
  // Scene 3.3: Ingenuity (0.585 .. 0.660)
  const uIngenuity = localU(progress, 0.585, 0.660)

  // 1. Opportunity panel glint sweep across clean panels at u = 0.8
  const panelGlint = Math.max(0, 1 - Math.abs(uMER - 0.8) / 0.08)

  // 2. InSight robotic arm placement: u in [0.1, 0.45]
  const armProgress = Math.min(1, Math.max(0, (uInSight - 0.1) / 0.35))
  // Seismic pulse: concentric ring wave on terrain at u = 0.8
  let pulseTime = 0
  if (uInSight >= 0.75 && uInSight <= 0.90) {
    pulseTime = (uInSight - 0.75) / 0.15
  }

  // 3. Ingenuity flight choreography:
  // u 0.0..0.35: spin up rotors (0 -> 1)
  // u 0.35..0.60: flight arc (altitude up to 5m, lateral travel 3-4m)
  // u 0.60..0.63: deceleration to 0
  // u >= 0.63: frozen
  let rotorRpm = 0
  let heliY = 0
  let heliZ = 0
  let heliRotX = 0

  if (!isFrozen) {
    if (uIngenuity < 0.35) {
      rotorRpm = uIngenuity / 0.35
      heliY = rotorRpm * 0.4
    } else if (uIngenuity < 0.60) {
      rotorRpm = 1.0
      const flightU = (uIngenuity - 0.35) / 0.25
      heliY = 0.4 + Math.sin(flightU * Math.PI) * 4.5
      heliZ = flightU * 3.6
      heliRotX = 0.08 * Math.sin(flightU * Math.PI) // slight forward pitch
    } else if (uIngenuity < 0.63) {
      // Decelerate and settle
      const decel = (0.63 - uIngenuity) / 0.03
      rotorRpm = decel
      heliY = 0
      heliZ = 3.6
      heliRotX = 0
    }
  } else {
    rotorRpm = 0
    heliY = 0
    heliZ = 3.6
    heliRotX = 0
  }

  useFrame(() => {
    if (frozenRef.current) return // FIRST LINE: absolute freeze
  })

  // Site coordinates in world units
  const spiritPos = useMemo<[number, number, number]>(() => [-18, 0, 10], [])
  const oppyPos = useMemo<[number, number, number]>(() => [-8, 0, 0], [])
  const insightPos = useMemo<[number, number, number]>(() => [0, 0, -14], [])
  const ingenuityPos = useMemo<[number, number, number]>(() => [12, 0, -28], [])

  return (
    <group>
      {/* Fog for Mars Atmosphere */}
      <fogExp2 attach="fog" args={['#b4685a', 0.0075]} />

      {/* Terrain with pulse wave capability */}
      <MarsTerrain pulseTime={pulseTime} />

      {/* Atmospheric drifting dust particles (frozen when Ingenuity stops) */}
      <DustField frozen={isFrozen} />

      {/* Scene 3.1 — Spirit & Opportunity */}
      <group position={spiritPos} scale={WORLD_SCALE}>
        <SpiritRover />
      </group>
      <group position={oppyPos} scale={WORLD_SCALE}>
        <OpportunityRover panelGlint={panelGlint} />
      </group>

      {/* Scene 3.2 — InSight */}
      <group position={insightPos} scale={WORLD_SCALE}>
        <InSightLander armProgress={armProgress} />
      </group>

      {/* Scene 3.3 — Ingenuity */}
      <group position={ingenuityPos} scale={WORLD_SCALE}>
        <group
          position={[0, heliY, heliZ]}
          rotation={[heliRotX, 0, 0]}
        >
          <Ingenuity frozen={isFrozen} rotorRpm={rotorRpm} />
        </group>
      </group>
    </group>
  )
}
