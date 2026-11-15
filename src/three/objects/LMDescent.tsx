// src/three/objects/LMDescent.tsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MATERIALS } from '../systems/materials'
import { registerAnchor, WORLD_SCALE } from '../systems/project'

interface LMDescentProps {
  id?: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export default function LMDescent({
  id = 'eagle',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: LMDescentProps) {
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      // label anchor at top of ascent stage stub: 3.2m in local metres
      return registerAnchor(id, groupRef.current, [0, 3.2 * WORLD_SCALE * scale, 0])
    }
  }, [id, scale])

  // Geometry dimensions in real metres, then scaled by WORLD_SCALE (0.01)
  const s = WORLD_SCALE * scale

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Octagonal Descent Stage: 4.2m across, 1.7m thick, 1.5m above ground */}
      <mesh position={[0, (1.5 + 1.7 / 2) * s, 0]}>
        <cylinderGeometry args={[2.1 * s, 2.1 * s, 1.7 * s, 8]} />
        <primitive object={MATERIALS.goldFoil} attach="material" />
      </mesh>

      {/* Engine skirt: 1m conical skirt below body center */}
      <mesh position={[0, (1.5 - 0.5) * s, 0]}>
        <cylinderGeometry args={[0.5 * s, 0.72 * s, 1.0 * s, 24]} />
        <primitive object={MATERIALS.blackStrut} attach="material" />
      </mesh>

      {/* Ascent Stage stub (indicates base) */}
      <mesh position={[0, (1.5 + 1.7 + 0.4) * s, 0]}>
        <cylinderGeometry args={[1.6 * s, 1.8 * s, 0.8 * s, 8]} />
        <primitive object={MATERIALS.whitePaint} attach="material" />
      </mesh>

      {/* Four Landing Legs: opposite footpads 9.4m apart, footpad dish 0.46m */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4
        const legRadius = (9.4 / 2) * s
        const footX = Math.cos(angle) * legRadius
        const footZ = Math.sin(angle) * legRadius
        const hipX = Math.cos(angle) * 2.1 * s
        const hipZ = Math.sin(angle) * 2.1 * s

        return (
          <group key={i}>
            {/* Main Strut */}
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={self => {
                  const pts = new Float32Array([hipX, 2.3 * s, hipZ, footX, 0.05 * s, footZ])
                  self.setAttribute('position', new THREE.BufferAttribute(pts, 3))
                }}
              />
              <lineBasicMaterial attach="material" color="#14171c" linewidth={2} />
            </line>

            {/* Outrigger Struts */}
            <mesh position={[(hipX + footX) / 2, 1.15 * s, (hipZ + footZ) / 2]}>
              <cylinderGeometry args={[0.04 * s, 0.04 * s, 3.8 * s, 8]} />
              <primitive object={MATERIALS.blackStrut} attach="material" />
            </mesh>

            {/* Footpad: 0.46m radius dish */}
            <mesh position={[footX, 0.05 * s, footZ]}>
              <cylinderGeometry args={[0.46 * s, 0.46 * s, 0.09 * s, 20]} />
              <primitive object={MATERIALS.goldFoil} attach="material" />
            </mesh>

            {/* Ladder on leg 0 */}
            {i === 0 && (
              <group position={[footX * 0.8, 1.2 * s, footZ * 0.8]}>
                <mesh rotation={[0, angle, 0.35]}>
                  <boxGeometry args={[0.35 * s, 2.5 * s, 0.05 * s]} />
                  <primitive object={MATERIALS.aluminium} attach="material" />
                </mesh>
              </group>
            )}
          </group>
        )
      })}
    </group>
  )
}
