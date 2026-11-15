import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StarFieldProps {
  density?: 'dense' | 'sparse'
}

export function StarField({ density = 'dense' }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = density === 'dense' ? 6000 : 2500

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)

    const colorPalette = [
      new THREE.Color('#e0e7ff'), // crisp blue-white
      new THREE.Color('#fef08a'), // warm yellow
      new THREE.Color('#93c5fd'), // deep stellar blue
      new THREE.Color('#ffffff'), // brilliant white
      new THREE.Color('#fca5a5'), // red giant faint
    ]

    for (let i = 0; i < count; i++) {
      // Distribute on sphere shell between r=300 and r=900
      const r = 300 + Math.random() * 600
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }

    return [pos, cols]
  }, [count])

  useFrame((_, dt) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.003
      pointsRef.current.rotation.x += dt * 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.6}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

