import { useMemo } from 'react'
import * as THREE from 'three'

export function MarsTerrain() {
  const { geometry, rockTransforms } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(320, 320, 128, 128)
    geom.rotateX(-Math.PI / 2)

    const pos = geom.attributes.position

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // Dune ripples and undulating basalt plains (Chryse / Meridiani Planum)
      const duneWave = Math.sin(x * 0.08 + z * 0.03) * 0.9
      const rollingPlains =
        Math.sin(x * 0.015) * Math.cos(z * 0.018) * 3.2 +
        Math.cos(x * 0.035 + 2.1) * Math.sin(z * 0.03) * 1.6

      let y = duneWave + rollingPlains

      // Rim edge falloff
      const edgeDist = Math.hypot(x, z)
      if (edgeDist > 100) {
        y -= Math.pow((edgeDist - 100) * 0.04, 2)
      }

      pos.setY(i, y)
    }

    geom.computeVertexNormals()

    // Scatter 80 Martian basalt rocks
    const rockMatrices: THREE.Matrix4[] = []
    for (let j = 0; j < 80; j++) {
      const rx = (Math.random() - 0.5) * 180
      const rz = (Math.random() - 0.5) * 180
      const scale = 0.25 + Math.random() * 0.9
      const mat = new THREE.Matrix4()
      mat.compose(
        new THREE.Vector3(rx, -1.8 + Math.random() * 0.6, rz),
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(Math.random(), 1, Math.random()).normalize(),
          Math.random() * Math.PI
        ),
        new THREE.Vector3(scale * 1.2, scale * 0.6, scale)
      )
      rockMatrices.push(mat)
    }

    return { geometry: geom, rockTransforms: rockMatrices }
  }, [])

  return (
    <group position={[0, -2, 0]}>
      {/* Red Martian Landscape */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#b45309"
          roughness={0.92}
          metalness={0.06}
        />
      </mesh>

      {/* Instanced Basalt Stones */}
      <instancedMesh
        args={[undefined as any, undefined as any, rockTransforms.length]}
        onUpdate={(self) => {
          rockTransforms.forEach((mat, idx) => self.setMatrixAt(idx, mat))
          self.instanceMatrix.needsUpdate = true
        }}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#57291a" roughness={0.9} metalness={0.12} />
      </instancedMesh>

      {/* Martian Atmospheric Sky Dome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[260, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshBasicMaterial
          color="#9a3412"
          side={THREE.BackSide}
          transparent
          opacity={0.32}
        />
      </mesh>
    </group>
  )
}
