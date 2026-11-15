// src/three/CanvasRoot.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import CameraRig from './CameraRig'
import ChapterSwitch from './chapters/ChapterSwitch'
import Post from './fx/Post'
import LabelBridge from './systems/LabelBridge'

export default function CanvasRoot() {
  const reducedMotion = useStore(s => s.reducedMotion)
  const lowTier       = useStore(s => s.lowTier)
  const webglOk       = useStore(s => s.webglOk)

  // The canvas is never mounted in the fallback path.
  if (reducedMotion || lowTier === 'none' || !webglOk) return null

  const dpr = useMemo<[number, number]>(() =>
    typeof window !== 'undefined' && matchMedia('(pointer: coarse)').matches ? [1, 1.5] : [1, 2], [])

  return (
    <Canvas
      aria-hidden
      dpr={dpr}
      frameloop="always"
      shadows={lowTier === 'high'}
      gl={{
        antialias: lowTier === 'high',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      camera={{ fov: 70, near: 0.05, far: 4000, position: [0, 0, 40] }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        gl.outputColorSpace = THREE.SRGBColorSpace
        scene.background = new THREE.Color('#05070d')
        scene.fog = null
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <LabelBridge />
        <ChapterSwitch />
        {lowTier === 'high' && <Post />}
      </Suspense>
    </Canvas>
  )
}
