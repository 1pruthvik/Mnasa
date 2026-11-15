import assert from 'node:assert/strict'
import { BEATS, beatAt } from '../src/contracts/beats.ts'
import { SCENES } from '../src/data/scenes.ts'
import { SCENE_CONTEXT } from '../src/data/sceneContext.ts'

assert.equal(BEATS.length, 17, 'The story should retain all 17 scenes')
assert.equal(BEATS[0].t0, 0)
assert.equal(BEATS[BEATS.length - 1].t1, 1)
for (let i = 0; i < BEATS.length; i++) {
  const beat = BEATS[i]
  assert.ok(beat.t0 < beat.t1, `Invalid interval for ${beat.sceneId}`)
  if (i) assert.equal(beat.t0, BEATS[i - 1].t1, `Gap or overlap before ${beat.sceneId}`)
  const scene = SCENES[beat.sceneId]
  const context = SCENE_CONTEXT[beat.sceneId]
  assert.ok(scene?.title && scene.copy.length, `Missing story copy for ${beat.sceneId}`)
  assert.ok(context?.location && context.fact && context.source.startsWith('https://'), `Missing context or source for ${beat.sceneId}`)
  for (let paragraph = 0; paragraph < scene.copy.length; paragraph++) {
    const progress = beat.t0 + (beat.t1 - beat.t0) * ((paragraph + .5) / scene.copy.length)
    assert.equal(beatAt(progress).sceneId, beat.sceneId, `Playback point for ${beat.sceneId} is out of bounds`)
  }
}
assert.equal(beatAt(1).sceneId, BEATS[BEATS.length - 1].sceneId)
console.log(`✓ All ${BEATS.length} scene intervals, guided paragraph positions and context links are present.`)
