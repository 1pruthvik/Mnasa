// src/three/chapters/Chapter00Descent.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import StarField from '../env/StarField'
import PaperPlane from '../env/PaperPlane'
import { useDisposeRegistry } from '../systems/dispose'

const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const atmosphereFragmentShader = `
  uniform vec3 uColor;
  uniform float uPower;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float f = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), uPower);
    gl_FragColor = vec4(uColor, f * 0.85);
  }
`

export default function Chapter00Descent() {
  const reg = useDisposeRegistry()
  const earthRef = useRef<THREE.Group>(null)
  const marsRef = useRef<THREE.Group>(null)
  const planetsRef = useRef<THREE.Group>(null)

  // Sun texture / glow
  const sunGlowTex = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
      grad.addColorStop(0, 'rgba(255, 240, 200, 1)')
      grad.addColorStop(0.3, 'rgba(255, 170, 60, 0.6)')
      grad.addColorStop(0.7, 'rgba(255, 80, 20, 0.15)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 256, 256)
    }
    return reg.tex(new THREE.CanvasTexture(canvas))
  }, [reg])

  useFrame((_, dt) => {
    if (earthRef.current) earthRef.current.rotation.y += dt * 0.05
    if (marsRef.current) marsRef.current.rotation.y += dt * 0.04
    if (planetsRef.current) planetsRef.current.rotation.y += dt * 0.01
  })

  return (
    <group>
      <StarField density="dense" />

      {/* The Sun at t ~ 0.045, pos [0, 0, 420] */}
      <group position={[0, 0, 420]}>
        <pointLight intensity={900} distance={0} decay={0} color="#fff2db" />
        <mesh>
          <sphereGeometry args={[18, 32, 32]} />
          <meshBasicMaterial color="#ffe8b3" />
        </mesh>
        <sprite scale={[110, 110, 1]}>
          <spriteMaterial map={sunGlowTex} blending={THREE.AdditiveBlending} depthWrite={false} />
        </sprite>
      </group>

      {/* Solar System & Inner Planets as camera moves through */}
      <group ref={planetsRef}>
        {/* Jupiter at [ -60, 20, 260 ] */}
        <mesh position={[-60, 20, 260]}>
          <sphereGeometry args={[12, 32, 32]} />
          <meshStandardMaterial color="#cfa87c" roughness={0.9} metalness={0.0} />
        </mesh>

        {/* Mars at [ 16, 5, 130 ] */}
        <group ref={marsRef} position={[16, 5, 130]}>
          <mesh>
            <sphereGeometry args={[5, 48, 48]} />
            <meshStandardMaterial color="#a8563a" roughness={0.95} metalness={0.0} />
          </mesh>
          {/* Mars subtle atmosphere rim */}
          <mesh scale={[1.03, 1.03, 1.03]}>
            <sphereGeometry args={[5, 32, 32]} />
            <shaderMaterial
              vertexShader={atmosphereVertexShader}
              fragmentShader={atmosphereFragmentShader}
              uniforms={{
                uColor: { value: new THREE.Color('#c98b63') },
                uPower: { value: 2.8 },
              }}
              transparent
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Earth at [ -6, 2, 70 ] */}
        <group ref={earthRef} position={[-6, 2, 70]}>
          <mesh>
            <sphereGeometry args={[6, 48, 48]} />
            <meshStandardMaterial color="#2d5e94" roughness={0.8} metalness={0.1} />
          </mesh>
          {/* Earth Atmosphere Rim */}
          <mesh scale={[1.03, 1.03, 1.03]}>
            <sphereGeometry args={[6, 32, 32]} />
            <shaderMaterial
              vertexShader={atmosphereVertexShader}
              fragmentShader={atmosphereFragmentShader}
              uniforms={{
                uColor: { value: new THREE.Color('#7fb3ff') },
                uPower: { value: 2.4 },
              }}
              transparent
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Venus at [ 18, -4, 95 ] */}
        <mesh position={[18, -4, 95]}>
          <sphereGeometry args={[5.5, 32, 32]} />
          <meshStandardMaterial color="#e5d0a8" roughness={0.9} />
        </mesh>

        {/* Mercury at [ -10, -2, 170 ] */}
        <mesh position={[-10, -2, 170]}>
          <sphereGeometry args={[2.5, 24, 24]} />
          <meshStandardMaterial color="#8a8a86" roughness={0.95} />
        </mesh>
      </group>

      {/* THE DOOR: Transitions space into paper file at t ≈ 0.145 */}
      <PaperPlane />
    </group>
  )
}
