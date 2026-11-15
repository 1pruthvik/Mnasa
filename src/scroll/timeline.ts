export interface GuidedStep { progress: number; duration: number; sceneId: string }
export const TRANSITION_MS = 1200
export const GUIDED_DEMO_MS = 120_000

/** Preserve the relative pacing of every paragraph and transition in a two-minute demo. */
export function guidedTimeScale(steps: readonly GuidedStep[]) {
  return steps.reduce((total, step) => total + step.duration + TRANSITION_MS, 0) / GUIDED_DEMO_MS
}

/** Advance a guided sequence using elapsed milliseconds, preserving time across boundaries. */
export function advanceGuidedFrame(steps: readonly GuidedStep[], index: number, elapsed: number, delta: number) {
  if (!steps.length) throw new Error('A guided story must have at least one step')
  let current = Math.min(Math.max(0, index), steps.length - 1)
  let time = Math.max(0, elapsed) + Math.max(0, delta)
  while (time >= steps[current].duration + TRANSITION_MS) {
    if (current === steps.length - 1) return { index: current, elapsed: time, progress: steps[current].progress, finished: true }
    time -= steps[current].duration + TRANSITION_MS
    current++
  }
  const step = steps[current]
  const next = steps[current + 1]
  let progress = step.progress
  if (next && time > step.duration) {
    const x = Math.min(1, (time - step.duration) / TRANSITION_MS)
    progress += (next.progress - step.progress) * (x * x * (3 - 2 * x))
  }
  return { index: current, elapsed: time, progress, finished: false }
}
