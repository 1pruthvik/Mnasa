import { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export function MoonTerrain() {
  const moonTexture = useTexture('/textures/moon.jpg')
  const earthTexture = useTexture('/textures/earth.jpg')

  useEffect(() => {
    moonTexture.wrapS = THREE.RepeatWrapping
    moonTexture.wrapT = THREE.RepeatWrapping
    moonTexture.repeat.set(16, 16)
    moonTexture.needsUpdate = true
  }, [moonTexture])

  const { geometry, rockTransforms } = useMemo(() => {
    // Expansive 450x450 circle/plane with 160x160 subdivisions
    const geom = new THREE.PlaneGeometry(450, 450, 160, 160)
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
      [-70, -60, 40, 6.0],
      [90, 40, 50, 7.0],
      [-110, 80, 60, 8.0],
    ]

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)

      // Multi-octave rolling lunar regolith hills
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

      // Smooth spherical curvature falloff at far horizons so terrain curves away naturally like a planet
      const distFromCenter = Math.hypot(x, z)
      if (distFromCenter > 80) {
        y -= Math.pow((distFromCenter - 80) * 0.04, 2)
      }

      pos.setY(i, y)
    }

    geom.computeVertexNormals()

    // Generate rocks transforms
    const rockMatrices: THREE.Matrix4[] = []
    for (let j = 0; j < 120; j++) {
      const rx = (Math.random() - 0.5) * 220
      const rz = (Math.random() - 0.5) * 220
      const scale = 0.2 + Math.random() * 0.9
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
      {/* Lunar Landscape Mesh with High-Definition NASA Regolith Texture */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          map={moonTexture}
          roughness={0.94}
          metalness={0.06}
          bumpMap={moonTexture}
          bumpScale={0.12}
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
      <group position={[-140, 95, -190]}>
        {/* Real NASA Earth Globe */}
        <mesh rotation={[0.4, -0.6, 0.2]}>
          <sphereGeometry args={[20, 48, 48]} />
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.5}
            metalness={0.08}
          />
        </mesh>
        {/* Rayleigh blue atmospheric rim glow */}
        <mesh scale={[1.06, 1.06, 1.06]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.28}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  )
}
