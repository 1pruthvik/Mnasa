// src/three/systems/perf.ts
import { useStore, type PerfLevel } from '../../store'

let frameTimes: number[] = []
let lastTime = performance.now()
let consecutiveHigh = 0
let consecutiveLow = 0

export function updatePerfGovernor(time: number) {
  const dt = time - lastTime
  lastTime = time

  // Rolling 60-frame buffer
  frameTimes.push(dt)
  if (frameTimes.length > 60) frameTimes.shift()
  if (frameTimes.length < 60) return

  const mean = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
  const currentLevel = useStore.getState().perfLevel
  const progress = useStore.getState().progress

  // Never step down during the Ingenuity freeze (0.585–0.66) or door transition (0.138–0.175)
  const isProtectedWindow = (progress >= 0.135 && progress <= 0.178) || (progress >= 0.58 && progress <= 0.665)
  if (isProtectedWindow) return

  if (mean > 22) { // < ~45 fps
    consecutiveHigh++
    consecutiveLow = 0
    if (consecutiveHigh >= 3 && currentLevel < 6) {
      const next = (currentLevel + 1) as PerfLevel
      useStore.getState().setPerfLevel(next)
      consecutiveHigh = 0
      frameTimes = []
      if (import.meta.env.DEV) {
        console.warn(`[Governor] Performance degraded to level ${next} (mean frame: ${mean.toFixed(1)}ms)`)
      }
    }
  } else if (mean < 13) { // > ~75 fps
    consecutiveLow++
    consecutiveHigh = 0
    if (consecutiveLow >= 10 && currentLevel > 0) {
      const next = (currentLevel - 1) as PerfLevel
      useStore.getState().setPerfLevel(next)
      consecutiveLow = 0
      frameTimes = []
      if (import.meta.env.DEV) {
        console.info(`[Governor] Performance recovered to level ${next} (mean frame: ${mean.toFixed(1)}ms)`)
      }
    }
  } else {
    consecutiveHigh = 0
    consecutiveLow = 0
  }
}
