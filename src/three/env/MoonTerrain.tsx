import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { DistantRidges, SurfaceRocks, useGroundTexture } from './SurfaceDetails'

// Illustration only: these procedural craters are not a survey of Apollo sites.
function lunarHeight(x: number, z: number) {
  let y = Math.sin(x * .02) * Math.cos(z * .02) * 3.5 + Math.sin(x * .05 + 1.2) * Math.cos(z * .06) * 1.4 + Math.sin(x * .12) * Math.cos(z * .14) * .4
  const craters = [[0, 0, 18, 2.2], [-24, -18, 14, 2.8], [32, 20, 22, 3.5], [-45, 30, 26, 4], [15, -40, 16, 2.4], [-16, 5, 8, 1.6], [50, -50, 35, 5]]
  for (const [cx, cz, r, depth] of craters) {
    const d = Math.hypot(x - cx, z - cz)
    if (d < r * 2.2) y += Math.exp(-Math.pow((d - r) / (r * .25), 2)) * depth * .35 - (1 - Math.sin(Math.min(1, d / r) * Math.PI / 2)) * depth
  }
  const edge = Math.hypot(x, z)
  if (edge > 90) y -= Math.pow((edge - 90) * .05, 2)
  return 1.8 + y * THREE.MathUtils.smoothstep(edge, 35, 90) * .45 + .035 * Math.sin(x * 1.1) * Math.cos(z * .9)
}
export function MoonTerrain() {
  const texture = useGroundTexture('/images/moon-regolith-apollo11.jpg', 70)
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(300, 300, 128, 128)
    geom.rotateX(-Math.PI / 2)
    const p = geom.attributes.position
    for (let i = 0; i < p.count; i++) p.setY(i, lunarHeight(p.getX(i), p.getZ(i)))
    geom.computeVertexNormals()
    return geom
  }, [])
  useEffect(() => () => geometry.dispose(), [geometry])
  return <group position={[0, -2, 0]}>
    <mesh geometry={geometry} receiveShadow><meshStandardMaterial map={texture} bumpMap={texture} bumpScale={.025} color="#b9b6b0" roughness={1} /></mesh>
    <DistantRidges world="moon" />
    <SurfaceRocks world="moon" heightAt={lunarHeight} />
    <group position={[-120, 80, -180]}><mesh><sphereGeometry args={[16, 32, 32]} /><meshStandardMaterial color="#2563eb" roughness={.4} metalness={.1} /></mesh><mesh scale={[1.025, 1.025, 1.025]}><sphereGeometry args={[16, 32, 32]} /><meshStandardMaterial color="#ffffff" transparent opacity={.38} roughness={.9} /></mesh><mesh scale={[1.08, 1.08, 1.08]}><sphereGeometry args={[16, 32, 32]} /><meshBasicMaterial color="#60a5fa" transparent opacity={.18} side={THREE.BackSide} /></mesh></group>
  </group>
}
