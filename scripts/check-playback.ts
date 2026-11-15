import assert from 'node:assert/strict'
import { BEATS } from '../src/contracts/beats.ts'
import { SCENES } from '../src/data/scenes.ts'
import { advanceGuidedFrame, GUIDED_DEMO_MS, guidedTimeScale, TRANSITION_MS } from '../src/scroll/timeline.ts'

const steps = BEATS.flatMap(beat => SCENES[beat.sceneId].copy.map((text, i, copy) => ({
  sceneId: beat.sceneId,
  progress: beat.t0 + (beat.t1 - beat.t0) * ((i + .5) / copy.length),
  duration: Math.max(7000, Math.min(24000, text.split(/\s+/).length / 170 * 60000 + 2500)),
})))
const scale = guidedTimeScale(steps)
let state = { index: 0, elapsed: 0, progress: steps[0].progress, finished: false }
const visited = new Set<string>()
const visitedParagraphs = new Set<number>()
let ticks = 0
while (!state.finished && ticks < 200000) {
  const previous = state.progress
  state = advanceGuidedFrame(steps, state.index, state.elapsed, 20 * scale)
  assert.ok(state.progress >= previous, 'Playback must not move backward')
  visited.add(steps[state.index].sceneId)
  visitedParagraphs.add(state.index)
  ticks++
}
assert.ok(state.finished, 'Playback did not reach the end')
assert.ok(Math.abs(ticks * 20 - GUIDED_DEMO_MS) <= 20, 'Default playback should take about seven minutes')
assert.deepEqual([...visited], BEATS.map(b => b.sceneId), 'Playback skipped or reordered a scene')
assert.equal(state.index, steps.length - 1)
assert.equal(visitedParagraphs.size, steps.length, 'Playback should show each paragraph')
for (const speed of [.75, 1, 1.25, 1.5, 2]) {
  const total = steps.reduce((sum, step) => sum + step.duration + TRANSITION_MS, 0)
  const wallTime = total / scale / speed
  assert.ok(Math.abs(wallTime - GUIDED_DEMO_MS / speed) < .001, `Speed ${speed}× should scale duration`)
}
const jump = advanceGuidedFrame(steps, 0, 0, steps.reduce((sum, s) => sum + s.duration + TRANSITION_MS, 0))
assert.equal(jump.finished, true, 'Large elapsed intervals must also finish correctly')
console.log(`✓ Simulated the complete guided sequence: ${steps.length} paragraphs across ${visited.size} scenes, in order, in seven minutes at 1×.`)
