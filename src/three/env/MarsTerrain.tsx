import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { DistantRidges, SurfaceRocks, useGroundTexture } from './SurfaceDetails'

// The shape is procedural; the repeated image is Spirit's Gusev Crater soil.
function martianHeight(x: number, z: number) {
  let y = Math.sin(x * .08 + z * .03) * .9 + Math.sin(x * .015) * Math.cos(z * .018) * 3.2 + Math.cos(x * .035 + 2.1) * Math.sin(z * .03) * 1.6
  const edge = Math.hypot(x, z)
  if (edge > 100) y -= Math.pow((edge - 100) * .04, 2)
  return 1.8 + y * THREE.MathUtils.smoothstep(edge, 35, 90) * .45 + .035 * Math.sin(x * .9) * Math.cos(z * 1.2)
}
export function MarsTerrain() {
  const texture = useGroundTexture('/images/mars-regolith-spirit.jpg', 40)
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(320, 320, 128, 128)
    geom.rotateX(-Math.PI / 2)
    const p = geom.attributes.position
    for (let i = 0; i < p.count; i++) p.setY(i, martianHeight(p.getX(i), p.getZ(i)))
    geom.computeVertexNormals()
    return geom
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <group position={[0, -2, 0]}>
    <mesh geometry={geometry} receiveShadow><meshStandardMaterial map={texture} bumpMap={texture} bumpScale={.035} color="#e6c0a6" roughness={1} /></mesh>
    <DistantRidges world="mars" />
    <SurfaceRocks world="mars" heightAt={martianHeight} />
    <mesh><sphereGeometry args={[260, 32, 24]} /><meshBasicMaterial color="#835f55" side={THREE.BackSide} depthWrite={false} /></mesh>
  </group>
}
