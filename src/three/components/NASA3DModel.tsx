import { Suspense, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface NASA3DModelProps {
  url: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  fallback?: React.ReactNode
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
    <Suspense fallback={fallback}>
      <ModelInner
        url={url}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </Suspense>
  )
}

