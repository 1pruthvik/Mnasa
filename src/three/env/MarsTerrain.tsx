// src/three/env/MarsTerrain.tsx
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'

interface MarsTerrainProps {
  pulseTime?: number // 0..1 for InSight seismic pulse
}

export default function MarsTerrain({ pulseTime = 0 }: MarsTerrainProps) {
  const segments = useStore(s => s.terrainSegments)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for Mars terrain: noise displacement, dune ridges, color blending, and seismic ring pulse
  const terrainMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uBaseColor:   { value: new THREE.Color('#a8563a') },
        uDarkBasalt:  { value: new THREE.Color('#5a3527') },
        uLightDust:   { value: new THREE.Color('#c98b63') },
        uLightDir:    { value: new THREE.Vector3(0.5, 0.44, 0.7).normalize() }, // ~26 deg elevation
        uLightColor:  { value: new THREE.Color('#ffd9b0') },
        uAmbientColor:{ value: new THREE.Color('#b4685a') },
        uPulseCenter: { value: new THREE.Vector2(0, 0) }, // InSight site
        uPulse:       { value: 0.0 }, // 0..1
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Multi-frequency noise
          float n = snoise(pos.xy * 0.015) * 0.35 +
                    snoise(pos.xy * 0.04) * 0.15 +
                    snoise(pos.xy * 0.1) * 0.05;

          // Dune ridges with directional noise
          float dunes = sin(snoise(vec2(pos.x * 0.02, pos.y * 0.05)) * 12.0) * 0.12;

          // InSight flat area dampener around (0,0) within 15 units
          float distToCenter = length(pos.xy);
          float flatMask = smoothstep(2.0, 18.0, distToCenter);

          pos.z += (n + dunes) * 0.55 * flatMask;

          vec4 wp = modelMatrix * vec4(pos, 1.0);
          vWorldPos = wp.xyz;

          // Approximate normal from noise gradient
          float eps = 0.5;
          float nX = snoise((pos.xy + vec2(eps, 0.0)) * 0.015) * 0.35;
          float nY = snoise((pos.xy + vec2(0.0, eps)) * 0.015) * 0.35;
          vec3 approxNormal = normalize(vec3(-(nX - n)/eps, -(nY - n)/eps, 1.0));
          vNormal = normalMatrix * approxNormal;

          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uBaseColor;
        uniform vec3 uDarkBasalt;
        uniform vec3 uLightDust;
        uniform vec3 uLightDir;
        uniform vec3 uLightColor;
        uniform vec3 uAmbientColor;
        uniform vec2 uPulseCenter;
        uniform float uPulse;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        void main() {
          vec3 norm = normalize(vNormal);
          float diff = max(dot(norm, uLightDir), 0.0);

          // Dust mask variations
          float dustMask = sin(vWorldPos.x * 0.08) * cos(vWorldPos.z * 0.08) * 0.5 + 0.5;
          vec3 surfaceColor = mix(uDarkBasalt, uBaseColor, dustMask);
          surfaceColor = mix(surfaceColor, uLightDust, smoothstep(0.4, 0.8, dustMask));

          // Lighting
          vec3 col = surfaceColor * (uAmbientColor * 0.25 + uLightColor * diff * 2.4);

          // Seismic pulse rings: concentric wave moving outward from uPulseCenter
          if (uPulse > 0.001) {
            float dist = length(vWorldPos.xz - uPulseCenter);
            float radius = uPulse * 28.0;
            float wave = sin((dist - radius) * 4.0) * exp(-abs(dist - radius) * 0.8);
            if (wave > 0.0) {
              col += vec3(0.9, 0.7, 0.5) * wave * (1.0 - uPulse) * 0.6;
            }
          }

          // Simple exponential distance fog matching THREE.FogExp2('#b4685a', 0.0075)
          float distToCam = length(vWorldPos - cameraPosition);
          float fogFactor = 1.0 - exp(-distToCam * 0.0075);
          vec3 fogColor = vec3(0.706, 0.408, 0.353); // #b4685a
          col = mix(col, fogColor, clamp(fogFactor, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  }, [])

  useFrame(() => {
    if (matRef.current) {
      matRef.current.uniforms.uPulse.value = pulseTime
    }
  })

  // Gradient sky dome
  const skyMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTop: { value: new THREE.Color('#7d4636') },
        uBottom: { value: new THREE.Color('#c98b63') },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTop;
        uniform vec3 uBottom;
        varying vec3 vPos;
        void main() {
          float h = normalize(vPos).y;
          vec3 col = mix(uBottom, uTop, clamp(h * 1.5 + 0.2, 0.0, 1.0));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  }, [])

  return (
    <group>
      {/* Sky dome */}
      <mesh material={skyMat}>
        <sphereGeometry args={[320, 24, 16]} />
      </mesh>

      {/* Raking key light + ambient fill */}
      <directionalLight
        position={[40, 28, 50]}
        intensity={2.4}
        color="#ffd9b0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={180}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <ambientLight intensity={0.25} color="#b4685a" />

      {/* Terrain mesh */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.4, 0]}
        receiveShadow
      >
        <planeGeometry args={[400, 400, segments, segments]} />
        <primitive object={terrainMaterial} ref={matRef} attach="material" />
      </mesh>
    </group>
  )
}
