import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function BeltRocks() {
  const groupRef = useRef<THREE.Group>(null!)
  const count = 180

  const rockTransforms = useMemo(() => {
    const matrices: THREE.Matrix4[] = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const dist = 70 + Math.random() * 90
      const x = Math.cos(angle) * dist
      const z = Math.sin(angle) * dist
      const y = (Math.random() - 0.5) * 35
      const scale = 0.8 + Math.random() * 3.5

      const mat = new THREE.Matrix4()
      mat.compose(
        new THREE.Vector3(x, y, z),
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
          Math.random() * Math.PI * 2
        ),
        new THREE.Vector3(scale, scale * (0.6 + Math.random() * 0.6), scale)
      )
      matrices.push(mat)
    }
    return matrices
  }, [count])

  useFrame((_, dt) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.015
    }
  })

  return (
    <group ref={groupRef}>
      <instancedMesh
        args={[undefined as any, undefined as any, count]}
        onUpdate={(self) => {
          rockTransforms.forEach((mat, idx) => self.setMatrixAt(idx, mat))
          self.instanceMatrix.needsUpdate = true
        }}
      >
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#64748b"
          roughness={0.92}
          metalness={0.2}
          flatShading
        />
      </instancedMesh>
    </group>
  )
}

