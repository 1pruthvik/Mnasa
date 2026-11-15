import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { StarField } from '../env/StarField'
import { AtlasGlobe, type World } from '../env/AtlasGlobe'

export function travelAt(p: number): 'earth-moon' | 'moon-mars' | null {
  if (p >= .145 && p < .18125) return 'earth-moon'
  if (p >= .391 && p < .405625) return 'moon-mars'
  return null
}
export function travelFraction(p: number, route: 'earth-moon' | 'moon-mars') {
  const [a, b] = route === 'earth-moon' ? [.145, .18125] : [.391, .405625]
  return THREE.MathUtils.smoothstep(p, a, b)
}
function Body({ world, x, radius }: { world: World; x: number; radius: number }) {
  const ref = useRef<THREE.Group>(null!)
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * .018 })
  return <group position={[x, 0, 0]} ref={ref}><AtlasGlobe world={world} radius={radius} /></group>
}
export function Travel({ route }: { route: 'earth-moon' | 'moon-mars' }) {
  return <group><StarField density="sparse" /><ambientLight intensity={.75} /><directionalLight position={[5, 8, 15]} intensity={2.3} />
    <Body world={route === 'earth-moon' ? 'earth' : 'moon'} x={-11} radius={4} />
    <Body world={route === 'earth-moon' ? 'moon' : 'mars'} x={11} radius={4} />
  </group>
}
