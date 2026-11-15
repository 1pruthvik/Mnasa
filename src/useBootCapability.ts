import { useEffect } from 'react'
import { useStore, type Tier } from './store'

export function useBootCapability() {
  const setCapability = useStore((s) => s.setCapability)

  useEffect(() => {
    let webglOk = false
    try {
      const canvas = document.createElement('canvas')
      webglOk = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
    } catch {
      webglOk = false
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let tier: Tier = 'high'
    if (!webglOk) {
      tier = 'none'
    } else {
      const concurrency = navigator.hardwareConcurrency || 4
      const memory = (navigator as any).deviceMemory || 8
      if (concurrency < 4 || memory < 4) {
        tier = 'low'
      }
    }

    setCapability({ webglOk, tier, reducedMotion })
  }, [setCapability])
}

