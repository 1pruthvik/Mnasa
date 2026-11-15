// src/three/systems/dispose.ts
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useDisposeRegistry() {
  const reg = useRef({
    geos: new Set<THREE.BufferGeometry>(),
    mats: new Set<THREE.Material>(),
    texs: new Set<THREE.Texture>(),
  })

  useEffect(() => () => {
    reg.current.geos.forEach(g => g.dispose())
    reg.current.mats.forEach(m => m.dispose())
    reg.current.texs.forEach(t => t.dispose())
    reg.current.geos.clear()
    reg.current.mats.clear()
    reg.current.texs.clear()
  }, [])

  return {
    geo<T extends THREE.BufferGeometry>(g: T): T {
      reg.current.geos.add(g)
      return g
    },
    mat<T extends THREE.Material>(m: T): T {
      reg.current.mats.add(m)
      return m
    },
    tex<T extends THREE.Texture>(t: T): T {
      reg.current.texs.add(t)
      return t
    },
    disposeAll() {
      reg.current.geos.forEach(g => g.dispose())
      reg.current.mats.forEach(m => m.dispose())
      reg.current.texs.forEach(t => t.dispose())
      reg.current.geos.clear()
      reg.current.mats.clear()
      reg.current.texs.clear()
    },
  }
}
