// src/three/chapters/Chapter02MarsEarly.tsx
import { useMemo } from 'react'
import { useStore } from '../../store'
import { localU } from '../../contracts/beats'
import { WORLD_SCALE } from '../systems/project'
import { useDisposeRegistry } from '../systems/dispose'
import MarsTerrain from '../env/MarsTerrain'
import DustField from '../env/DustField'
import VikingLander from '../objects/VikingLander'
import PathfinderLander from '../objects/PathfinderLander'
import Sojourner from '../objects/Sojourner'

export default function Chapter02MarsEarly() {
  useDisposeRegistry()
  const progress = useStore(s => s.progress)

  // Local progress for Scene 2.1 (Viking 1): t in [0.400, 0.445]
  const uViking = localU(progress, 0.400, 0.445)
  // Local progress for Scene 2.2 (Pathfinder): t in [0.445, 0.490]
  const uPath = localU(progress, 0.445, 0.490)

  // 1. Viking beacon light fade at u = 0.92
  const beaconIntensity = uViking < 0.92 ? 1 : Math.max(0, 1 - (uViking - 0.92) / 0.06)

  // 2. Pathfinder bounce physics choreography
  // 4 bounce arcs: peaks at u = 0.18 (15m), 0.34 (6m), 0.48 (2.5m), 0.60 (0.8m)
  // settle wobble up to 0.74, petals open 0.74..0.88, Sojourner ramp descent 0.86..1.0
  let landerY = 0
  let landerRotX = 0
  let landerRotZ = 0
  let petalOpen = 0
  let sojournerZ = 0
  let sojournerY = 0

  if (uPath < 0.18) {
    const f = uPath / 0.18
    landerY = 15 * Math.sin(f * Math.PI * 0.5)
    landerRotX = f * Math.PI * 2
  } else if (uPath < 0.34) {
    const f = (uPath - 0.18) / (0.34 - 0.18)
    landerY = 6 + 9 * Math.cos(f * Math.PI)
    landerRotX = (uPath * 10) % (Math.PI * 2)
  } else if (uPath < 0.48) {
    const f = (uPath - 0.34) / (0.48 - 0.34)
    landerY = 2.5 + 3.5 * Math.cos(f * Math.PI)
    landerRotZ = (uPath * 8) % (Math.PI * 2)
  } else if (uPath < 0.60) {
    const f = (uPath - 0.48) / (0.60 - 0.48)
    landerY = 0.8 + 1.7 * Math.cos(f * Math.PI)
    landerRotX = (uPath * 6) % (Math.PI * 2)
  } else if (uPath < 0.74) {
    // Settle wobble
    const f = (uPath - 0.60) / 0.14
    landerY = 0.1 * Math.sin(f * Math.PI * 4) * (1 - f)
    landerRotX = 0.05 * Math.sin(f * Math.PI * 3) * (1 - f)
  } else {
    landerY = 0
    landerRotX = 0
    landerRotZ = 0
  }

  // Petal opening: 0.74 .. 0.88
  if (uPath >= 0.74 && uPath <= 0.88) {
    petalOpen = (uPath - 0.74) / 0.14
  } else if (uPath > 0.88) {
    petalOpen = 1
  }

  // Sojourner ramp descent: 0.86 .. 1.0
  if (uPath >= 0.86) {
    const sProgress = (uPath - 0.86) / 0.14
    sojournerZ = sProgress * 2.2 // rolls 2.2m off lander ramp onto Mars dirt
    sojournerY = Math.max(0, 0.25 * (1 - sProgress))
  }

  // Site positions in world scale
  // Viking at Chryse Planitia (~[0, 0, 0])
  // Pathfinder at Ares Vallis (~[16, 0, -22])
  const vikingPos = useMemo<[number, number, number]>(() => [0, 0, 0], [])
  const pathfinderPos = useMemo<[number, number, number]>(() => [16, 0, -22], [])

  return (
    <group>
      {/* Fog for Mars Atmosphere */}
      <fogExp2 attach="fog" args={['#b4685a', 0.0075]} />

      {/* Procedural Mars terrain with dunes and basalt/dust shader */}
      <MarsTerrain />

      {/* Atmospheric drifting dust particles */}
      <DustField />

      {/* Scene 2.1 — Viking 1 */}
      <group position={vikingPos} scale={WORLD_SCALE}>
        <VikingLander beaconIntensity={beaconIntensity} />
      </group>

      {/* Scene 2.2 — Pathfinder + Sojourner */}
      <group position={pathfinderPos} scale={WORLD_SCALE}>
        {/* Pathfinder with bounce arcs and opening petals */}
        <group
          position={[0, landerY, 0]}
          rotation={[landerRotX, 0, landerRotZ]}
        >
          <PathfinderLander petalOpen={petalOpen} />
          {/* Sojourner rolling down the ramp */}
          {petalOpen > 0.3 && (
            <group position={[0, sojournerY, sojournerZ]}>
              <Sojourner driveDist={sojournerZ} />
            </group>
          )}
        </group>
      </group>
    </group>
  )
}
