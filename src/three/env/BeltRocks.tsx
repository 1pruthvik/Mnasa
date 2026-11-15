// src/three/env/BeltRocks.tsx
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

interface BeltRocksProps {
  count?: number
}

// Deterministic PRNG
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function BeltRocks({ count = 900 }: BeltRocksProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  // 1. Jittered asteroid polyhedron base geometry
  const rockGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1)
    const pos = geo.attributes.position as THREE.BufferAttribute
    const rand = mulberry32(1337)

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i)
      const vy = pos.getY(i)
      const vz = pos.getZ(i)
      const displacement = 0.75 + rand() * 0.5
      pos.setXYZ(i, vx * displacement, vy * displacement, vz * displacement)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  // 2. High contrast, harsh single-source asteroid material
  const rockMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#787878'),
      roughness: 0.95,
      metalness: 0.1,
    })
  }, [])

  // 3. Set instance matrices around the belt torus/cylinder
  useEffect(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    const rand = mulberry32(4242)

    for (let i = 0; i < count; i++) {
      // Donut distribution between radius 40 and 110
      const angle = rand() * Math.PI * 2
      const radius = 40 + rand() * 70
      const height = (rand() - 0.5) * 16

      dummy.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      )

      // Random rotation
      dummy.rotation.set(
        rand() * Math.PI * 2,
        rand() * Math.PI * 2,
        rand() * Math.PI * 2
      )

      // Scale variation 0.2 .. 3.2
      const scale = 0.2 + rand() * 3.0
      dummy.scale.set(
        scale * (0.8 + rand() * 0.4),
        scale * (0.8 + rand() * 0.4),
        scale * (0.8 + rand() * 0.4)
      )

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh
      ref={meshRef}
      args={[rockGeo, rockMat, count]}
      frustumCulled={false}
    />
  )
}
