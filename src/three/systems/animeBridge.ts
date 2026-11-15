// src/three/systems/animeBridge.ts
import { createTimeline, utils } from 'animejs'

/** Build a timeline whose total duration is 1 (normalised) and seek it 0..1. */
export function makeScrub(durationMs = 1000) {
  const tl = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
  return {
    tl,
    /** seek a normalised 0..1 value into the timeline */
    seek(u: number) {
      tl.seek(utils.clamp(u, 0, 1) * durationMs)
    },
    durationMs,
  }
}
