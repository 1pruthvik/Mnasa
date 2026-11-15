// src/three/env/DustField.tsx
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'

interface DustFieldProps {
  frozen?: boolean
}

export default function DustField({ frozen = false }: DustFieldProps) {
  const dustEnabled = useStore(s => s.dustEnabled)
  const pointsRef = useRef<THREE.Points>(null)

  const count = 4000
  const box = [60, 12, 60] // [x, y, z]

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * box[0]
      pos[i * 3 + 1] = Math.random() * box[1]
      pos[i * 3 + 2] = (Math.random() - 0.5) * box[2]

      vel[i * 3 + 0] = (Math.random() - 0.4) * 0.4 // gentle wind bias
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.08
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.25
    }
    return { positions: pos, velocities: vel }
  }, [count])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color('#d48b6c') },
        uAlpha: { value: 0.08 },
      },
      vertexShader: `
        uniform float uAlpha;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(20.0 / -mvPos.z, 2.0, 4.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float fade = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, fade * uAlpha);
        }
      `,
    })
  }, [])

  useFrame((_, dt) => {
    if (!dustEnabled || frozen || !pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const pos = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3 + 0] += velocities[i3 + 0] * dt
      pos[i3 + 1] += velocities[i3 + 1] * dt
      pos[i3 + 2] += velocities[i3 + 2] * dt

      // Wrap boundaries
      if (pos[i3 + 0] > box[0] / 2) pos[i3 + 0] = -box[0] / 2
      if (pos[i3 + 0] < -box[0] / 2) pos[i3 + 0] = box[0] / 2
      if (pos[i3 + 1] > box[1]) pos[i3 + 1] = 0
      if (pos[i3 + 1] < 0) pos[i3 + 1] = box[1]
      if (pos[i3 + 2] > box[2] / 2) pos[i3 + 2] = -box[2] / 2
      if (pos[i3 + 2] < -box[2] / 2) pos[i3 + 2] = box[2] / 2
    }
    posAttr.needsUpdate = true
  })

  if (!dustEnabled) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  )
}
