import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import CameraRig from './CameraRig'
import ChapterSwitch from './chapters/ChapterSwitch'

export default function CanvasRoot() {
  const reducedMotion = useStore((s) => s.reducedMotion)
  const tier = useStore((s) => s.tier)
  const webglOk = useStore((s) => s.webglOk)
  const readingMode = useStore((s) => s.readingMode)

  // Canvas is never mounted in the fallback path or reading mode
  if (reducedMotion || tier === 'none' || !webglOk || readingMode) {
    return null
  }

  const dpr = useMemo<[number, number]>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return [1, 1.5]
    }
    return [1, 2]
  }, [])

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
        gl.toneMappingExposure = 1.05
        gl.outputColorSpace = THREE.SRGBColorSpace
        scene.background = new THREE.Color('#05070d')
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
      </Suspense>
    </Canvas>
  )
}
