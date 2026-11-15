// src/three/objects/LRV.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'

interface LRVProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  unfoldProgress?: number // 0 (stowed) to 1 (unfolded)
}

export default function LRV({
  id = 'lrv',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  unfoldProgress = 1,
}: LRVProps) {
  const groupRef = useRef<THREE.Group>(null)
  const s = WORLD_SCALE * scale

  useEffect(() => {
    if (groupRef.current) {
      return registerAnchor(id, groupRef.current, [0, 1.14 * s, 0])
    }
  }, [id, s])

  // Wheel dimension: 81.8cm diameter (0.409m radius), 23cm wide (0.23m)
  const wheelRadius = 0.409 * s
  const wheelWidth = 0.23 * s
  const halfWheelbase = (2.3 / 2) * s
  const halfTrack = (1.8 / 2) * s

  // Unfolding proxy interpolation (clamp 0..1)
  const u = Math.min(1, Math.max(0, unfoldProgress))
  const chassisAngle = (1 - u) * 0.4
  const seatAngle = (1 - u) * (Math.PI / 2)

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Chassis: Welded aluminum alloy tubing, 3.1m long, 2.3m wheelbase */}
      <group rotation={[0, 0, chassisAngle]}>
        {/* Main Frame bed */}
        <mesh position={[0, 0.45 * s, 0]}>
          <boxGeometry args={[3.1 * s, 0.08 * s, 1.4 * s]} />
          <primitive object={MATERIALS.aluminium} attach="material" />
        </mesh>

        {/* 2 Folding Seats & Armrest */}
        <group position={[0.1 * s, 0.49 * s, 0]} rotation={[seatAngle, 0, 0]}>
          {/* Left seat */}
          <mesh position={[0, 0.35 * s, -0.28 * s]}>
            <boxGeometry args={[0.45 * s, 0.6 * s, 0.4 * s]} />
            <primitive object={MATERIALS.whitePaint} attach="material" />
          </mesh>
          {/* Right seat */}
          <mesh position={[0, 0.35 * s, 0.28 * s]}>
            <boxGeometry args={[0.45 * s, 0.6 * s, 0.4 * s]} />
            <primitive object={MATERIALS.whitePaint} attach="material" />
          </mesh>
          {/* Center T-handle controller */}
          <mesh position={[0.35 * s, 0.4 * s, 0]}>
            <cylinderGeometry args={[0.02 * s, 0.02 * s, 0.45 * s, 8]} />
            <primitive object={MATERIALS.aluminium} attach="material" />
          </mesh>
        </group>

        {/* Mast & High-Gain Mesh Dish Antenna */}
        <group position={[1.1 * s, 0.49 * s, 0]}>
          {/* Mast */}
          <mesh position={[0, 0.5 * s, 0]}>
            <cylinderGeometry args={[0.025 * s, 0.025 * s, 1.0 * s, 8]} />
            <primitive object={MATERIALS.aluminium} attach="material" />
          </mesh>
          {/* Mesh Dish: 0.28m radius */}
          <mesh position={[0, 1.05 * s, 0]} rotation={[0.4, 0, 0]}>
            <sphereGeometry args={[0.28 * s, 24, 12, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <primitive object={MATERIALS.wireMesh} attach="material" />
          </mesh>
        </group>

        {/* 36V Silver-Zinc Battery Box forward */}
        <mesh position={[1.25 * s, 0.35 * s, 0]}>
          <boxGeometry args={[0.45 * s, 0.25 * s, 0.6 * s]} />
          <primitive object={MATERIALS.blackStrut} attach="material" />
        </mesh>
      </group>

      {/* 4 Wheels: 81.8 cm diameter, 23 cm wide, woven zinc-coated steel mesh */}
      {[
        [-halfWheelbase, -halfTrack],
        [-halfWheelbase, halfTrack],
        [halfWheelbase, -halfTrack],
        [halfWheelbase, halfTrack],
      ].map(([wx, wz], idx) => (
        <group key={idx} position={[wx, wheelRadius, wz]}>
          {/* Wheel Cylinder */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
            <primitive object={MATERIALS.wireMesh} attach="material" />
          </mesh>
          {/* Spun Aluminum Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wheelRadius * 0.4, wheelRadius * 0.4, wheelWidth * 1.02, 16]} />
            <primitive object={MATERIALS.aluminium} attach="material" />
          </mesh>
          {/* Chevron outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[wheelRadius, 0.015 * s, 8, 24]} />
            <primitive object={MATERIALS.aluminium} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
