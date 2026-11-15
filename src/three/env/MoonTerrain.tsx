// src/three/env/MoonTerrain.tsx
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../../store'

const moonVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  // Simple pseudo-random hash
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // 2D Value Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // 5 Octaves Fractal Noise
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Displace height
    float h = fbm(uv * 40.0) * 0.9;
    pos.z += h;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const moonFragmentShader = `
  uniform vec3 uBaseColor;
  uniform vec3 uLightDir;
  uniform float uMoonquake;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    // Sharp raking light calculation (near-vacuum shadow contrast)
    float diff = max(0.0, dot(vNormal, uLightDir));
    float ambient = 0.06; // Near-vacuum: almost no fill light
    vec3 col = uBaseColor * (diff * 1.8 + ambient);

    if (uMoonquake > 0.0) {
      col += vec3(0.05, 0.08, 0.12) * uMoonquake;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function MoonTerrain() {
  const terrainSegments = useStore(s => s.terrainSegments)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => {
    // Key light elevation ~10 deg: directional vector
    const lightDir = new THREE.Vector3(0.9, 0.18, 0.4).normalize()
    return {
      uBaseColor: { value: new THREE.Color('#9a9a96') },
      uLightDir: { value: lightDir },
      uMoonquake: { value: 0 },
    }
  }, [])

  return (
    <group>
      {/* Directional Key Light for Lunar Surface: elevation 8–12°, intensity 3.2, #fff6e8 */}
      <directionalLight
        position={[40, 8, 20]}
        intensity={3.2}
        color="#fff6e8"
      />
      {/* Subtle Ambient: 0.06 */}
      <ambientLight intensity={0.06} color="#ffffff" />

      {/* Moon terrain plane: 400x400 rotated -Math.PI/2 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[400, 400, terrainSegments, terrainSegments]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={moonVertexShader}
          fragmentShader={moonFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  )
}
