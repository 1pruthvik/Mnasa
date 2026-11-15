import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useStore } from '../store'
import CameraRig from './CameraRig'
import ChapterSwitch from './chapters/ChapterSwitch'

export default function CanvasRoot() {
  const reducedMotion = useStore((s) => s.reducedMotion)
  const tier = useStore((s) => s.tier)
  const webglOk = useStore((s) => s.webglOk)
  const readingMode = useStore((s) => s.readingMode)

  const dpr = useMemo<[number, number]>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return [1, 1.5]
    }
    return [1, 2]
  }, [])

  // Canvas is never mounted in the fallback path or reading mode
  if (reducedMotion || tier === 'none' || !webglOk || readingMode) {
    return null
  }

  return (
    <Canvas
      aria-hidden="true"
      dpr={dpr}
      frameloop="always"
      gl={{
        antialias: tier === 'high',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      camera={{ fov: 70, near: 0.05, far: 4000, position: [0, 0, 900] }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.15
        gl.outputColorSpace = THREE.SRGBColorSpace
        scene.background = new THREE.Color('#030712')
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <ChapterSwitch />
        {tier !== 'low' && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.75}
              luminanceSmoothing={0.3}
              intensity={0.45}
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
