import { useTexture } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** Cropped historic images are repeated for visual texture; neither is site-mapped. */
export function useGroundTexture(url: string, repeat: number) {
  const source = useTexture(url)
  const texture = useMemo(() => {
    const copy = source.clone()
    copy.wrapS = copy.wrapT = THREE.MirroredRepeatWrapping
    copy.repeat.set(repeat, repeat)
    copy.colorSpace = THREE.SRGBColorSpace
    copy.anisotropy = 8
    copy.needsUpdate = true
    return copy
  }, [source, repeat])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/** Stable, partly buried rocks follow the terrain rather than floating above it. */
export function SurfaceRocks({ world, heightAt }: { world: 'moon' | 'mars'; heightAt: (x: number, z: number) => number }) {
  const { geometry, matrices, colors } = useMemo(() => {
    let seed = world === 'moon' ? 337 : 1911
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const position = geometry.attributes.position
    // Identical shared vertices get the same deformation; silhouettes remain coherent.
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i), y = position.getY(i), z = position.getZ(i)
      const variation = 1 + .16 * Math.sin(x * 11 + y * 7 + z * 13) + .08 * Math.cos(x * 19 - z * 9)
      position.setXYZ(i, x * variation, y * variation, z * variation)
    }
    geometry.computeVertexNormals()
    const matrices: THREE.Matrix4[] = []
    const colors: THREE.Color[] = []
    const keepClear = world === 'moon' ? [[0, 0], [-16, -6], [22, 8], [25, 11]] : [[0, 0], [8, -6], [-8, -8], [4, -6], [8, -2]]
    for (let i = 0; i < 300; i++) {
      const x = (random() - .5) * 100, z = (random() - .5) * 100
      if (keepClear.some(([cx, cz]) => Math.hypot(x - cx, z - cz) < 3.2)) continue
      const size = .07 + Math.pow(random(), 3) * .65
      const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * .5, random() * Math.PI * 2, random() * .5))
      const scale = new THREE.Vector3(size * (.8 + random() * .6), size * (.3 + random() * .4), size * (.7 + random() * .7))
      const matrix = new THREE.Matrix4().compose(new THREE.Vector3(x, heightAt(x, z) + scale.y * .22, z), rotation, scale)
      matrices.push(matrix)
      const shade = .72 + random() * .5
      colors.push(new THREE.Color(world === 'moon' ? '#77736c' : '#765746').multiplyScalar(shade))
    }
    return { geometry, matrices, colors }
  }, [world, heightAt])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <instancedMesh args={[geometry, undefined, matrices.length]} receiveShadow onUpdate={mesh => {
    matrices.forEach((matrix, i) => { mesh.setMatrixAt(i, matrix); mesh.setColorAt(i, colors[i]) })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }}><meshStandardMaterial roughness={1} /></instancedMesh>
}

/** Low, illustrative ridges soften the artificial edge of the terrain plane. */
export function DistantRidges({ world }: { world: 'moon' | 'mars' }) {
  const geometry = useMemo(() => {
    const segments = 192
    const vertices: number[] = [], indices: number[] = []
    for (let i = 0; i <= segments; i++) {
      const a = i / segments * Math.PI * 2
      const radius = 136 + 4 * Math.sin(a * 5)
      const ridge = (world === 'moon' ? 4 : 6) + 2 * Math.sin(a * 3 + .6) + 1.2 * Math.sin(a * 7 + 1.1) + .6 * Math.sin(a * 13)
      vertices.push(Math.cos(a) * radius, -6, Math.sin(a) * radius, Math.cos(a) * radius, ridge, Math.sin(a) * radius)
      if (i < segments) { const n = i * 2; indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3) }
    }
    const mesh = new THREE.BufferGeometry()
    mesh.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    mesh.setIndex(indices)
    mesh.computeVertexNormals()
    return mesh
  }, [world])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <mesh geometry={geometry}><meshStandardMaterial color={world === 'moon' ? '#625e58' : '#9b6a50'} roughness={1} side={THREE.DoubleSide} /></mesh>
}
