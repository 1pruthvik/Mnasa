import { Suspense, useMemo, Component, type ErrorInfo, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface NASA3DModelProps {
  url: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  fallback?: ReactNode
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('GLTF load failed, switching to 3D illustration fallback:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

function ModelInner({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Omit<NASA3DModelProps, 'fallback'>) {
  const { scene } = useGLTF(url)

  // Clone scene so multiple instances don't conflict
  const copiedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  return (
    <primitive
      object={copiedScene}
      position={position}
      rotation={rotation}
      scale={typeof scale === 'number' ? [scale, scale, scale] : scale}
    />
  )
}

export function NASA3DModel({
  url,
  scale,
  position,
  rotation,
  fallback = null,
}: NASA3DModelProps) {
  return (
    <ModelErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <ModelInner
          url={url}
          scale={scale}
          position={position}
          rotation={rotation}
        />
      </Suspense>
    </ModelErrorBoundary>
  )
}
