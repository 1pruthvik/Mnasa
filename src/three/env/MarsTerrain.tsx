import { useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

export function MarsTerrain() {
  const { scene } = useThree()
  const marsTexture = useTexture('/textures/mars.jpg')

  useEffect(() => {
    marsTexture.wrapS = THREE.RepeatWrapping
    marsTexture.wrapT = THREE.RepeatWrapping
    marsTexture.repeat.set(12, 12)
    marsTexture.needsUpdate = true
  }, [marsTexture])

  useEffect(() => {
    // Seamless Martian atmosphere fog
    const prevFog = scene.fog
    scene.fog = new THREE.FogExp2('#7c2d12', 0.007)
    return () => {
      scene.fog = prevFog
    }
  }, [scene])

  const { geometry, rockTransforms } = useMemo(() => {
    const geom = new THREE.PlaneGeometry(450, 450, 160, 160)
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

      // Rim edge curvature falloff matching the spherical horizon
      const edgeDist = Math.hypot(x, z)
      if (edgeDist > 90) {
        y -= Math.pow((edgeDist - 90) * 0.04, 2)
      }

      pos.setY(i, y)
    }

    geom.computeVertexNormals()

    // Scatter 100 Martian basalt rocks
    const rockMatrices: THREE.Matrix4[] = []
    for (let j = 0; j < 100; j++) {
      const rx = (Math.random() - 0.5) * 240
      const rz = (Math.random() - 0.5) * 240
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
      {/* Red Martian Landscape with NASA Mars Surface Texture */}
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          map={marsTexture}
          roughness={0.92}
          metalness={0.06}
          bumpMap={marsTexture}
          bumpScale={0.14}
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
        <meshStandardMaterial color="#431407" roughness={0.92} metalness={0.14} />
      </instancedMesh>

      {/* Martian Atmospheric Sky Dome covering whole horizon */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[320, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshBasicMaterial
          color="#7c2d12"
          side={THREE.BackSide}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  )
}
