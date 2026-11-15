// src/three/objects/ALSEPStation.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'
import RTG_SNAP27 from './RTG_SNAP27'

interface ALSEPProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  solar?: 'easep' | 'rtg'
}

export default function ALSEPStation({
  id = 'alsep',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  solar = 'rtg',
}: ALSEPProps) {
  const groupRef = useRef<THREE.Group>(null)
  const s = WORLD_SCALE * scale

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(id, groupRef.current, [0, 1.0 * s, 0])
    }
  }, [id, s])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Central Station Box: ~0.5m cube, 4 short legs */}
      <mesh position={[0, 0.35 * s, 0]}>
        <boxGeometry args={[0.55 * s, 0.45 * s, 0.55 * s]} />
        <primitive object={MATERIALS.whitePaint} attach="material" />
      </mesh>

      {/* 4 Short Legs holding it 0.12m above ground */}
      {[-0.24, 0.24].map(x =>
        [-0.24, 0.24].map(z => (
          <mesh key={`${x}-${z}`} position={[x * s, 0.06 * s, z * s]}>
            <cylinderGeometry args={[0.02 * s, 0.02 * s, 0.12 * s, 8]} />
            <primitive object={MATERIALS.blackStrut} attach="material" />
          </mesh>
        ))
      )}

      {/* Antenna mast: 58 cm long, 3.8 cm diameter CylinderGeometry */}
      <mesh position={[0.15 * s, (0.575 + 0.29) * s, 0.15 * s]}>
        <cylinderGeometry args={[0.019 * s, 0.019 * s, 0.58 * s, 12]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>
      {/* Helical antenna top */}
      <mesh position={[0.15 * s, (0.575 + 0.58) * s, 0.15 * s]}>
        <sphereGeometry args={[0.05 * s, 12, 12]} />
        <primitive object={MATERIALS.aluminium} attach="material" />
      </mesh>

      {/* Variant: EASEP with east/west canted solar panels */}
      {solar === 'easep' ? (
        <group>
          {/* East Solar panel */}
          <mesh position={[0.55 * s, 0.35 * s, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.65 * s, 0.02 * s, 0.45 * s]} />
            <primitive object={MATERIALS.solarPanel} attach="material" />
          </mesh>
          {/* West Solar panel */}
          <mesh position={[-0.55 * s, 0.35 * s, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.65 * s, 0.02 * s, 0.45 * s]} />
            <primitive object={MATERIALS.solarPanel} attach="material" />
          </mesh>
        </group>
      ) : (
        /* ALSEP variant: connected to SNAP-27 RTG by cable */
        <group position={[1.4 * s, 0, 0]}>
          <RTG_SNAP27 scale={scale} />
        </group>
      )}
    </group>
  )
}
