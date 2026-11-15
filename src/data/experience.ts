import { BEATS, beatAt, localU } from '../contracts/beats'
import { SCENES } from './scenes'

export function screenIndex(progress: number) {
  const beat = beatAt(progress)
  const count = SCENES[beat.sceneId]?.copy.length || 1
  return Math.min(count - 1, Math.floor(localU(progress, beat.t0, beat.t1) * count))
}
export function isWorldOverview(progress: number) {
  const beat = beatAt(progress)
  return (beat.sceneId === '1.1' || beat.sceneId === '2.1') && screenIndex(progress) === 0
}
export function shotBoundaries() {
  const boundaries = BEATS.slice(1).map(b => b.t0)
  const intro = BEATS.find(b => b.sceneId === '0.1')!
  for (let i = 1; i < SCENES['0.1'].copy.length; i++) boundaries.push(intro.t0 + (intro.t1 - intro.t0) * i / SCENES['0.1'].copy.length)
  for (const id of ['1.1', '2.1']) {
    const beat = BEATS.find(b => b.sceneId === id)!
    boundaries.push(beat.t0 + (beat.t1 - beat.t0) / SCENES[id].copy.length)
  }
  return boundaries
}
