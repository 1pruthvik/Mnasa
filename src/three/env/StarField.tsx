// src/three/env/StarField.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store'

interface StarFieldProps {
  density?: 'dense' | 'sparse'
}

const vertexShader = `
  uniform float uSize;
  uniform float uAttenuation;
  attribute float aSeed;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * aSeed * (uAttenuation / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform float uTime;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    float twinkle = 0.85 + 0.15 * sin(uTime * 0.7 + vSeed * 40.0);

    // Color palette: 91% soft blue-white (#dfe9ff), 6% warm (#ffe7cc), 3% bright cyan (#bcd6ff)
    vec3 col = vec3(0.875, 0.914, 1.0);
    if (vSeed > 0.94) {
      col = vec3(1.0, 0.905, 0.8);
    } else if (vSeed < 0.03) {
      col = vec3(0.737, 0.839, 1.0);
    }

    gl_FragColor = vec4(col, alpha * twinkle * 0.9);
  }
`

export default function StarField({ density = 'dense' }: StarFieldProps) {
  const starScale = useStore(s => s.starScale)
  const isDense = density === 'dense'

  const layersData = useMemo(() => {
    const mult = (isDense ? 1.0 : 0.25) * starScale
    return [
      { count: Math.floor(120000 * mult), radius: [500, 950] as [number, number], size: 1.0, drift: 0.02 },
      { count: Math.floor(40000 * mult), radius: [300, 600] as [number, number], size: 1.5, drift: 0.06 },
      { count: Math.floor(15000 * mult), radius: [100, 350] as [number, number], size: 2.2, drift: 0.14 },
    ]
  }, [isDense, starScale])

  const geometries = useMemo(() => {
    return layersData.map(l => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(l.count * 3)
      const seed = new Float32Array(l.count)
      for (let i = 0; i < l.count; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = u * 2.0 * Math.PI
        const phi = Math.acos(2.0 * v - 1.0)
        const r = l.radius[0] + Math.random() * (l.radius[1] - l.radius[0])

        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi)
        seed[i] = Math.random()
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
      return geo
    })
  }, [layersData])

  const materials = useMemo(() => {
    return layersData.map(l => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uSize: { value: l.size },
          uAttenuation: { value: 250.0 },
          uTime: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    })
  }, [layersData])

  const glowTex = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.2, 'rgba(190, 220, 255, 0.8)')
      grad.addColorStop(0.6, 'rgba(100, 160, 255, 0.2)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 128, 128)
    }
    return new THREE.CanvasTexture(canvas)
  }, [])

  const spriteRef = useRef<THREE.Sprite>(null)

  useFrame((_, dt) => {
    materials.forEach(m => {
      m.uniforms.uTime.value += dt
    })
    const progress = useStore.getState().progress
    if (spriteRef.current && isDense) {
      // Single bright point grows as progress rises: "one of them is ours"
      const scale = 0.6 + 4.5 * THREE.MathUtils.smoothstep(progress, 0, 0.08)
      spriteRef.current.scale.set(scale, scale, 1)
    }
  })

  return (
    <group>
      {geometries.map((geo, idx) => (
        <points key={idx} geometry={geo} material={materials[idx]} frustumCulled={false} />
      ))}
      {isDense && (
        <sprite ref={spriteRef} position={[0, 0, 150]}>
          <spriteMaterial map={glowTex} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      )}
    </group>
  )
}

