// src/three/systems/capability.ts
import { useStore, type Tier } from '../../store'

export function detectCapability(): { webglOk: boolean; tier: Tier; reducedMotion: boolean } {
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  let webglOk = false
  try {
    const canvas = document.createElement('canvas')
    webglOk = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
  } catch {
    webglOk = false
  }

  if (!webglOk) {
    const res = { webglOk: false, tier: 'none' as Tier, reducedMotion }
    useStore.getState().setCapability(res)
    return res
  }

  // Tier heuristic: check deviceMemory, hardwareConcurrency, and mobile
  const nav = typeof navigator !== 'undefined' ? (navigator as any) : {}
  const memory = nav.deviceMemory || 8
  const cores = nav.hardwareConcurrency || 4
  const isCoarse = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false

  let tier: Tier = 'high'
  if (memory < 4 || cores < 4 || (isCoarse && memory <= 4)) {
    tier = 'low'
  }

  const res = { webglOk: true, tier, reducedMotion }
  useStore.getState().setCapability(res)
  return res
}
