// src/three/chapters/Chapter04Belt.tsx
import { useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../../store'
import { localU } from '../../contracts/beats'
import { WORLD_SCALE } from '../systems/project'
import { useDisposeRegistry } from '../systems/dispose'
import BeltRocks from '../env/BeltRocks'
import Dawn from '../objects/Dawn'
import NEARShoemaker from '../objects/NEARShoemaker'

export default function Chapter04Belt() {
  useDisposeRegistry()
  const progress = useStore(s => s.progress)

  // Local progress for Scene 4.1 (Dawn): t in [0.660, 0.710]
  const uDawn = localU(progress, 0.660, 0.710)
  // Local progress for Scene 4.2 (NEAR Shoemaker): t in [0.710, 0.760]
  const uNEAR = localU(progress, 0.710, 0.760)

  // 1. Dawn's perpetual incomplete orbit around Ceres
  // Elliptical CatmullRomCurve3: radius ~10..14 world units
  const dawnOrbitCurve = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const a = 12
    const b = 8
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * a, Math.sin(angle * 2) * 1.5, Math.sin(angle) * b))
    }
    return new THREE.CatmullRomCurve3(pts, true)
  }, [])

  // Never completes a lap within the scene (e.g. 0.05 to 0.42)
  const dawnOrbitFrac = 0.05 + uDawn * 0.35
  const dawnPos = dawnOrbitCurve.getPointAt(dawnOrbitFrac)
  const dawnWobble = Math.sin(uDawn * Math.PI * 6) * 0.009 // ~0.5 deg attitude wobble

  // 2. NEAR Shoemaker 69-photo flash beat across u = 0.1 .. 0.8
  const isNearFlashing = uNEAR >= 0.1 && uNEAR <= 0.8 && Math.sin(uNEAR * 69 * Math.PI * 2) > 0.7

  // Ceres procedural asteroid material
  const ceresMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4c4e52'),
      roughness: 0.9,
      metalness: 0.05,
    })
  }, [])

  // Vesta procedural asteroid material
  const vestaMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#646059'),
      roughness: 0.95,
      metalness: 0.05,
    })
  }, [])

  // Eros elongated asteroid geometry & material
  const erosGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 3)
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      // Saddle dent around y ~ 0.2, z ~ 0.3
      const saddle = 1.0 - 0.25 * Math.exp(-((y - 0.2) ** 2 + (z - 0.3) ** 2) * 4)
      pos.setXYZ(i, x * saddle, y * saddle, z * saddle)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  const erosMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7a6a58'),
      roughness: 0.95,
      metalness: 0.05,
    })
  }, [])

  return (
    <group>
      {/* Harsh lonely single-source key light — NO AMBIENT FILL */}
      <directionalLight
        position={[60, 45, 80]}
        intensity={3.6}
        color="#ffffff"
      />

      {/* 900 Instanced Asteroid Belt Polyhedra */}
      <BeltRocks />

      {/* Scene 4.1: Dwarf planet Ceres (r=6) at [0, 0, -2] */}
      <group position={[0, 0, -2]}>
        <mesh material={ceresMat}>
          <sphereGeometry args={[6, 48, 48]} />
        </mesh>
      </group>

      {/* Dawn Spacecraft in perpetual incomplete orbit around Ceres */}
      <group position={[dawnPos.x, dawnPos.y, dawnPos.z - 2]} scale={WORLD_SCALE}>
        <Dawn wobble={dawnWobble} />
      </group>

      {/* Asteroid Vesta visible in the distance at [35, 12, -45] */}
      <group position={[35, 12, -45]} scale={[1, 0.86, 0.92]}>
        <mesh material={vestaMat}>
          <sphereGeometry args={[4.5, 36, 36]} />
        </mesh>
      </group>

      {/* Scene 4.2: Asteroid 433 Eros at [-24, -4, -30] */}
      <group position={[-24, -4, -30]}>
        {/* Elongated Eros body: 21 miles scaled to [1.0, 0.62, 2.4] * 7 */}
        <mesh
          geometry={erosGeo}
          material={erosMat}
          scale={[7.0, 4.34, 16.8]}
          rotation={[0.3, 0.8, -0.2]}
        />

        {/* NEAR Shoemaker landed directly on surface south of saddle dent */}
        <group position={[0.5, 4.2, -1.8]} rotation={[-0.2, 0.4, 0.1]} scale={WORLD_SCALE}>
          <NEARShoemaker flash={isNearFlashing} />
        </group>
      </group>
    </group>
  )
}
