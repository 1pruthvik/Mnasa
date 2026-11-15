// ⚠️  BEATS_VERSION must be bumped on any t0/t1 change, and the change announced.
import type { ZoomStop, ChapterId, Owner } from './types'

export const BEATS_VERSION = 1

export const TOTAL_SCREENS = 38     // desktop document height = 38 × 100vh

export const STOPS: { id: ZoomStop; label: string; t0: number; t1: number }[] = [
  { id: 'milky-way',     label: 'Milky Way',      t0: 0.000, t1: 0.045 },
  { id: 'sun',           label: 'Sun',            t0: 0.045, t1: 0.075 },
  { id: 'solar-system',  label: 'Solar system',   t0: 0.075, t1: 0.115 },
  { id: 'inner-planets', label: 'Inner planets',  t0: 0.115, t1: 0.145 },
  { id: 'earth',         label: 'Earth',          t0: 0.145, t1: 0.175 },
  { id: 'moon',          label: 'Moon',           t0: 0.175, t1: 0.400 },
  { id: 'mars',          label: 'Mars',           t0: 0.400, t1: 0.660 },
  { id: 'anywhere',      label: 'Anywhere',       t0: 0.660, t1: 1.000 },
]

export interface BeatDefinition {
  id: string
  sceneId: string
  t0: number
  t1: number
  chapter: ChapterId
  stop: ZoomStop
  owner: Owner
}

export const BEATS: readonly BeatDefinition[] = [
  { id: 'open.0.1', sceneId: '0.1', t0: 0.000, t1: 0.145, chapter: 'ch00-descent',    stop: 'milky-way',     owner: 'both' },
  { id: 'open.0.2', sceneId: '0.2', t0: 0.145, t1: 0.175, chapter: 'ch00-descent',    stop: 'inner-planets', owner: 'both' },
  { id: 'moon.1.1', sceneId: '1.1', t0: 0.175, t1: 0.225, chapter: 'ch01-moon',       stop: 'moon',          owner: 'both' },
  { id: 'moon.1.2', sceneId: '1.2', t0: 0.225, t1: 0.275, chapter: 'ch01-moon',       stop: 'moon',          owner: 'both' },
  { id: 'moon.1.3', sceneId: '1.3', t0: 0.275, t1: 0.335, chapter: 'ch01-moon',       stop: 'moon',          owner: 'both' },
  { id: 'moon.1.4', sceneId: '1.4', t0: 0.335, t1: 0.400, chapter: 'ch01-moon',       stop: 'moon',          owner: 'both' },
  { id: 'mars.2.1', sceneId: '2.1', t0: 0.400, t1: 0.445, chapter: 'ch02-mars-early', stop: 'mars',          owner: 'both' },
  { id: 'mars.2.2', sceneId: '2.2', t0: 0.445, t1: 0.490, chapter: 'ch02-mars-early', stop: 'mars',          owner: 'both' },
  { id: 'mars.3.1', sceneId: '3.1', t0: 0.490, t1: 0.535, chapter: 'ch03-mars-long',  stop: 'mars',          owner: 'both' },
  { id: 'mars.3.2', sceneId: '3.2', t0: 0.535, t1: 0.585, chapter: 'ch03-mars-long',  stop: 'mars',          owner: 'both' },
  { id: 'mars.3.3', sceneId: '3.3', t0: 0.585, t1: 0.660, chapter: 'ch03-mars-long',  stop: 'mars',          owner: 'both' },
  { id: 'any.4.1',  sceneId: '4.1', t0: 0.660, t1: 0.710, chapter: 'ch04-belt',       stop: 'anywhere',      owner: 'both' },
  { id: 'any.4.2',  sceneId: '4.2', t0: 0.710, t1: 0.760, chapter: 'ch04-belt',       stop: 'anywhere',      owner: 'both' },
  { id: 'any.5.1',  sceneId: '5.1', t0: 0.760, t1: 0.810, chapter: 'ch05-anywhere',   stop: 'anywhere',      owner: 'both' },
  { id: 'any.5.2',  sceneId: '5.2', t0: 0.810, t1: 0.860, chapter: 'ch05-anywhere',   stop: 'anywhere',      owner: 'both' },
  { id: 'inv.6.1',  sceneId: '6.1', t0: 0.860, t1: 0.940, chapter: 'ch06-inventory',  stop: 'anywhere',      owner: 'both' },
  { id: 'inv.6.2',  sceneId: '6.2', t0: 0.940, t1: 1.000, chapter: 'ch06-inventory',  stop: 'anywhere',      owner: 'both' },
] as const

/** The only place in the app that maps progress → beat. Pure, no side effects. */
export function beatAt(progress: number): BeatDefinition {
  const p = Math.min(1, Math.max(0, progress))
  for (const b of BEATS) {
    if (p >= b.t0 && p < b.t1) return b
  }
  return BEATS[BEATS.length - 1]!
}

export function stopAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  for (const s of STOPS) {
    if (p >= s.t0 && p < s.t1) return s
  }
  return STOPS[STOPS.length - 1]!
}

/** Local 0..1 inside a beat — the value every scene animation scrubs on. */
export function localU(progress: number, t0: number, t1: number) {
  if (t1 <= t0) return 0
  return Math.min(1, Math.max(0, (progress - t0) / (t1 - t0)))
}

