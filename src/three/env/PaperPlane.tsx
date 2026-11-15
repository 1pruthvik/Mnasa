// src/three/env/PaperPlane.tsx
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store'
import { DOOR } from '../../contracts/door'

interface PaperPlaneProps {
  reverse?: boolean
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  uniform float uMix;
  uniform vec3 uVoid;
  uniform vec3 uPaper;
  uniform vec2 uCenter;
  uniform float uAspect;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 p = vUv - uCenter;
    p.x *= uAspect;
    float dist = max(abs(p.x), abs(p.y));
    float box = 1.0 - smoothstep(0.0, 0.62, dist - uMix * 0.75);
    float grain = hash(vUv * 900.0) * 0.04;
    vec3 col = mix(uVoid, uPaper + grain, box * uMix);
    float a = clamp(box * uMix * 1.05, 0.0, 1.0);
    gl_FragColor = vec4(col, a);
  }
`

export default function PaperPlane({ reverse = false }: PaperPlaneProps) {
  const { size } = useThree()
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => {
    return {
      uMix: { value: 0 },
      uVoid: { value: new THREE.Color(DOOR.void) },
      uPaper: { value: new THREE.Color(DOOR.paper) },
      uCenter: { value: new THREE.Vector2(...DOOR.center) },
      uAspect: { value: size.width / (size.height || 1) },
    }
  }, [size.width, size.height])

  useFrame(() => {
    const progress = useStore.getState().progress
    if (!matRef.current) return

    let mixVal = 0
    if (!reverse) {
      // Scene 0.2 door: 0.138 -> 0.158 -> 0.175
      if (progress < DOOR.tIn) {
        mixVal = 0
      } else if (progress <= DOOR.tFull) {
        mixVal = THREE.MathUtils.smoothstep(progress, DOOR.tIn, DOOR.tFull)
      } else if (progress <= 0.175) {
        // Hold paper across Scene 0.2
        mixVal = 1
      } else if (progress <= 0.182) {
        // Exit paper into Moon regolith
        mixVal = 1 - THREE.MathUtils.smoothstep(progress, 0.175, 0.182)
      } else {
        mixVal = 0
      }
    } else {
      // ch06 dissolve: 0.860 -> 0.890 dissolve to paper/void plane
      mixVal = THREE.MathUtils.smoothstep(progress, 0.860, 0.890)
    }

    matRef.current.uniforms.uMix.value = mixVal
    matRef.current.uniforms.uAspect.value = size.width / (size.height || 1)
  })

  return (
    <mesh frustumCulled={false} renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}
