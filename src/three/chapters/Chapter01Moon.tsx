// src/three/chapters/Chapter01Moon.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import MoonTerrain from '../env/MoonTerrain'
import LMDescent from '../objects/LMDescent'
import ALSEPStation from '../objects/ALSEPStation'
import LRRReflector from '../objects/LRRReflector'
import Surveyor from '../objects/Surveyor'
import LRV from '../objects/LRV'
import { useDisposeRegistry } from '../systems/dispose'
import { latLonToWorld, WORLD_SCALE } from '../systems/project'
import { useStore } from '../../store'

export default function Chapter01Moon() {
  const reg = useDisposeRegistry()
  const filterWorkingOnly = useStore(s => s.filterWorkingOnly)

  // Coordinates projected to world coordinates
  const eaglePos = useMemo(() => latLonToWorld(0.67416, 23.47314, 0, 0, 50), [])
  const intrepidPos = useMemo(() => latLonToWorld(-3.0128, -23.4219, 0, 0, 50), [])
  const falconPos = useMemo(() => latLonToWorld(26.13239, 3.63330, 0, 0, 50), [])

  // Surveyor is ~180m away from Intrepid
  const surveyorPos = useMemo<[number, number, number]>(() => {
    return [intrepidPos[0] + 180 * WORLD_SCALE, intrepidPos[1], intrepidPos[2] + 40 * WORLD_SCALE]
  }, [intrepidPos])

  // 180m Walk beam-line between Intrepid and Surveyor
  const beamLineObj = useMemo(() => {
    const pts = [
      new THREE.Vector3(...intrepidPos),
      new THREE.Vector3(...surveyorPos)
    ]
    const geo = reg.geo(new THREE.BufferGeometry().setFromPoints(pts))
    const mat = reg.mat(new THREE.LineBasicMaterial({ color: '#7fb3ff', transparent: true, opacity: 0.8 }))
    return new THREE.Line(geo, mat)
  }, [intrepidPos, surveyorPos, reg])

  const moonquakeGroupRef = useRef<THREE.Group>(null)
  const lrvUnfoldRef = useRef(1)

  useFrame(() => {
    const p = useStore.getState().progress

    // Scene 1.2: 180m ruler drawn between 0.225 and 0.275
    if (p >= 0.225 && p <= 0.275) {
      const u = (p - 0.225) / (0.275 - 0.225)
      // Moonquake shake at u >= 0.88
      if (moonquakeGroupRef.current) {
        if (u >= 0.88 && u <= 0.98) {
          moonquakeGroupRef.current.position.y = (Math.random() - 0.5) * 0.04
        } else {
          moonquakeGroupRef.current.position.y = 0
        }
      }
    }

    // Scrub LRV unfold across Scene 1.3: 0.275 -> 0.335
    if (p >= 0.275 && p <= 0.335) {
      lrvUnfoldRef.current = (p - 0.275) / (0.335 - 0.275)
    } else if (p > 0.335) {
      lrvUnfoldRef.current = 1
    } else {
      lrvUnfoldRef.current = 0
    }
  })

  // When StillWorkingToggle is on, dim powered objects by 70%, keeping reflectors full
  const poweredOpacity = filterWorkingOnly ? 0.3 : 1.0

  return (
    <group>
      {/* Directional key light from raking angle + faint fill */}
      <directionalLight
        position={[45, 12, 60]}
        intensity={3.2}
        color="#fff6e8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <ambientLight intensity={0.06} color="#d4d4d8" />

      {/* Lunar surface terrain */}
      <MoonTerrain />

      {/* ── Site 1: Eagle (Apollo 11) · Mare Tranquillitatis */}
      <group position={eaglePos}>
        <group scale={[poweredOpacity, poweredOpacity, poweredOpacity]}>
          <LMDescent id="eagle" />
          <ALSEPStation id="alsep-11" solar="easep" position={[6 * WORLD_SCALE, 0, 5 * WORLD_SCALE]} />
        </group>
        {/* LRRR is passive and still works, never dimmed */}
        <LRRReflector id="lrrr-11" position={[8 * WORLD_SCALE, 0, -4 * WORLD_SCALE]} />
      </group>

      {/* Moonquake Group for Oceanus Procellarum impact shock */}
      <group ref={moonquakeGroupRef}>
        {/* ── Site 2: Intrepid (Apollo 12) + Surveyor 3 · Oceanus Procellarum */}
        <group position={intrepidPos}>
          <group scale={[poweredOpacity, poweredOpacity, poweredOpacity]}>
            <LMDescent id="intrepid" />
            <ALSEPStation id="alsep-12" solar="rtg" position={[10 * WORLD_SCALE, 0, 8 * WORLD_SCALE]} />
          </group>
        </group>

        {/* Surveyor 3 (~180m from Intrepid) */}
        <group position={surveyorPos} scale={[poweredOpacity, poweredOpacity, poweredOpacity]}>
          <Surveyor id="surveyor-3" />
        </group>

        {/* 180m Walk Ruler line */}
        <primitive object={beamLineObj} />

        {/* ── Site 3: Falcon (Apollo 15) + LRV · Mare Imbrium */}
        <group position={falconPos}>
          <group scale={[poweredOpacity, poweredOpacity, poweredOpacity]}>
            <LMDescent id="falcon" />
            <ALSEPStation id="alsep-15" solar="rtg" position={[12 * WORLD_SCALE, 0, -10 * WORLD_SCALE]} />
            {/* LRV parked nearby */}
            <group position={[18 * WORLD_SCALE, 0, 8 * WORLD_SCALE]} rotation={[0, 0.4, 0]}>
              <LRV id="lrv" unfoldProgress={lrvUnfoldRef.current} />
            </group>
          </group>
          <LRRReflector id="lrrr-15" position={[-10 * WORLD_SCALE, 0, 6 * WORLD_SCALE]} />
        </group>
      </group>
    </group>
  )
}
