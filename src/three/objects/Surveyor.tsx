// src/three/objects/Surveyor.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'

interface SurveyorProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function Surveyor({
  id = 'surveyor-3',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: SurveyorProps) {
  const groupRef = useRef<THREE.Group>(null)
  const s = WORLD_SCALE * scale

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(id, groupRef.current, [0, 2.8 * s, 0])
    }
  }, [id, s])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Central tubular aluminum body: ~1.5m tall */}
      <mesh position={[0, 1.0 * s, 0]}>
        <cylinderGeometry args={[0.55 * s, 0.45 * s, 1.2 * s, 12]} />
        <primitive object={MATERIALS.whitePaint} attach="material" />
      </mesh>

      {/* 3 Tripod Landing Legs (120 deg apart), footpads on ground */}
      {[0, 1, 2].map(i => {
        const angle = (i * 2 * Math.PI) / 3
        const rFoot = 2.1 * s
        const fx = Math.cos(angle) * rFoot
        const fz = Math.sin(angle) * rFoot

        return (
          <group key={i}>
            {/* Main leg strut */}
            <mesh position={[fx / 2, 0.5 * s, fz / 2]} rotation={[0, -angle, 0.55]}>
              <cylinderGeometry args={[0.03 * s, 0.03 * s, 2.3 * s, 8]} />
              <primitive object={MATERIALS.aluminium} attach="material" />
            </mesh>
            {/* Crushable footpad */}
            <mesh position={[fx, 0.04 * s, fz]}>
              <cylinderGeometry args={[0.22 * s, 0.22 * s, 0.08 * s, 16]} />
              <primitive object={MATERIALS.aluminium} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* Vertical Mast with TV Camera */}
      <mesh position={[0.2 * s, 2.0 * s, 0]}>
        <cylinderGeometry args={[0.04 * s, 0.04 * s, 1.0 * s, 8]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>
      {/* TV Camera Head */}
      <mesh position={[0.2 * s, 2.5 * s, 0.1 * s]}>
        <boxGeometry args={[0.22 * s, 0.35 * s, 0.22 * s]} />
        <primitive object={MATERIALS.whitePaint} attach="material" />
      </mesh>

      {/* Surface Sampler Scoop boom extending horizontally (1.5m reach) */}
      <mesh position={[-0.75 * s, 0.5 * s, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02 * s, 0.02 * s, 1.5 * s, 8]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>
      {/* Soil scoop bucket */}
      <mesh position={[-1.55 * s, 0.2 * s, 0]}>
        <boxGeometry args={[0.18 * s, 0.12 * s, 0.15 * s]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>

      {/* Solar panel & planar antenna mast */}
      <mesh position={[0, 2.6 * s, -0.2 * s]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.8 * s, 0.5 * s, 0.02 * s]} />
        <primitive object={MATERIALS.solarPanel} attach="material" />
      </mesh>
    </group>
  )
}
