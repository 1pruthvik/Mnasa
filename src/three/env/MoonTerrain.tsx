import { useMemo } from 'react'
import * as THREE from 'three'

export function MoonTerrain() {
  const { geometry, rockTransforms } = useMemo(() => {
    // 300x300 plane with 128x128 subdivisions for craters and rolling regolith hills
    const geom = new THREE.PlaneGeometry(300, 300, 128, 128)
    geom.rotateX(-Math.PI / 2)

    const pos = geom.attributes.position
    // Seeded crater locations: [x, z, radius, depth]
    const craters: [number, number, number, number][] = [
      [0, 0, 18, 2.2], // Center subtle depression
      [-24, -18, 14, 2.8],
      [32, 20, 22, 3.5],
      [-45, 30, 26, 4.0],
      [15, -40, 16, 2.4],
      [-16, 5, 8, 1.6], // Surveyor 3 crater
      [50, -50, 35, 5.0],
    ]

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // Multi-octave undulating lunar topography
      let y =
        Math.sin(x * 0.02) * Math.cos(z * 0.02) * 3.5 +
        Math.sin(x * 0.05 + 1.2) * Math.cos(z * 0.06) * 1.4 +
        Math.sin(x * 0.12) * Math.cos(z * 0.14) * 0.4

      // Carve crater bowls and raise elevated rim mounds
      for (const [cx, cz, r, depth] of craters) {
        const d = Math.hypot(x - cx, z - cz)
        if (d < r * 2.2) {
          const rimDist = Math.abs(d - r)
          const rimElev = Math.exp(-Math.pow(rimDist / (r * 0.25), 2)) * (depth * 0.35)
          const bowlDepth = (1 - Math.sin(Math.min(1, d / r) * (Math.PI / 2))) * depth
          y += rimElev - bowlDepth
        }
      }

      // Slightly curve downwards at far edges to avoid sharp flat box edges
      const edgeDist = Math.hypot(x, z)
      if (edgeDist > 90) {
        y -= Math.pow((edgeDist - 90) * 0.05, 2)
      }

      pos.setY(i, y)
    }

    geom.computeVertexNormals()

    // Generate rocks transforms
    const rockMatrices: THREE.Matrix4[] = []
    for (let j = 0; j < 90; j++) {
      const rx = (Math.random() - 0.5) * 160
      const rz = (Math.random() - 0.5) * 160
      const scale = 0.2 + Math.random() * 0.8
      const mat = new THREE.Matrix4()
      mat.compose(
        new THREE.Vector3(rx, -1.8 + Math.random() * 0.5, rz),
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(Math.random(), 1, Math.random()).normalize(),
          Math.random() * Math.PI
        ),
        new THREE.Vector3(scale, scale * 0.7, scale)
      )
      rockMatrices.push(mat)
    }

    return { geometry: geom, rockTransforms: rockMatrices }
  }, [])

  return (
    <group position={[0, -2, 0]}>
      {/* Lunar Landscape Mesh */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.94}
          metalness={0.05}
          flatShading={false}
        />
      </mesh>

      {/* Instanced Lunar Rocks / Boulders */}
      <instancedMesh
        args={[undefined as any, undefined as any, rockTransforms.length]}
        onUpdate={(self) => {
          rockTransforms.forEach((mat, idx) => self.setMatrixAt(idx, mat))
          self.instanceMatrix.needsUpdate = true
        }}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#64748b" roughness={0.96} metalness={0.08} />
      </instancedMesh>

      {/* Distant Earth hanging above the Lunar Horizon (Earthrise) */}
      <group position={[-120, 80, -180]}>
        {/* Earth sphere */}
        <mesh>
          <sphereGeometry args={[16, 32, 32]} />
          <meshStandardMaterial color="#2563eb" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Cloud swirl overlay */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[16, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.38}
            roughness={0.9}
          />
        </mesh>
        {/* Rayleigh blue atmospheric rim glow */}
        <mesh scale={[1.08, 1.08, 1.08]}>
          <sphereGeometry args={[16, 32, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.18}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  )
}

