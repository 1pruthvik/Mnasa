import { Component, Suspense, useMemo, type ReactNode } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface ModelProps {
  url: string
  position: [number, number, number]
  size: number
  ground?: boolean
}
function Model({ url, position, size, ground = true }: ModelProps) {
  const gltf = useGLTF(url, '/draco/')
  const { model, scale, origin } = useMemo(() => {
    const model = gltf.scene.clone(true)
    model.traverse((object) => { if (object instanceof THREE.Mesh) { object.castShadow = true; object.receiveShadow = false } })
    model.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(model)
    const extent = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    return {
      model,
      scale: size / Math.max(extent.x, extent.y, extent.z, 0.001),
      origin: [-center.x, ground ? -box.min.y : -center.y, -center.z] as [number, number, number],
    }
  }, [gltf.scene, size, ground])
  return <group position={position} scale={scale}><primitive object={model} position={origin} /></group>
}

// Retain a local procedural illustration if an asset cannot be decoded or loaded.
class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}
export function IllustrationModel(props: ModelProps & { fallback: ReactNode }) {
  return <ModelBoundary fallback={props.fallback}><Suspense fallback={props.fallback}><Model {...props} /></Suspense></ModelBoundary>
}

// Existing NASA assets use the same loader and fallback behavior.
export const NasaModel = IllustrationModel
