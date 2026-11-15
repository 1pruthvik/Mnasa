import type { ChapterId, ZoomStop } from './types'

// ⚠️  BEATS_VERSION must be bumped on any t0/t1 change, and the change announced.
export const BEATS_VERSION = 1

export const TOTAL_SCREENS = 38     // desktop document height = 38 × 100vh

export const STOPS: { id: ZoomStop; label: string; t0: number; t1: number }[] = [
  { id: 'milky-way', label: 'Milky Way', t0: 0.000, t1: 0.045 },
  { id: 'sun', label: 'Sun', t0: 0.045, t1: 0.075 },
  { id: 'solar-system', label: 'Solar system', t0: 0.075, t1: 0.115 },
  { id: 'inner-planets', label: 'Inner planets', t0: 0.115, t1: 0.145 },
  { id: 'earth', label: 'Earth', t0: 0.145, t1: 0.175 },
  { id: 'moon', label: 'Moon', t0: 0.175, t1: 0.400 },
  { id: 'mars', label: 'Mars', t0: 0.400, t1: 0.660 },
  { id: 'anywhere', label: 'Anywhere', t0: 0.660, t1: 1.000 },
]

export const BEATS = [
  { id: 'open.0.1', sceneId: '0.1', t0: 0.000, t1: 0.145, chapter: 'ch00-descent' as ChapterId, stop: 'milky-way' as ZoomStop, owner: 'both' as const, label: 'Milky Way', fullLabel: 'Somewhere in the Milky Way', copy: [], widgets: [] },
  { id: 'open.0.2', sceneId: '0.2', t0: 0.145, t1: 0.175, chapter: 'ch00-descent' as ChapterId, stop: 'inner-planets' as ZoomStop, owner: 'both' as const, label: 'Catalogue', fullLabel: 'The catalogue that remembers', copy: [], widgets: ['fact-drawer'] },
  { id: 'moon.1.1', sceneId: '1.1', t0: 0.175, t1: 0.225, chapter: 'ch01-moon' as ChapterId, stop: 'moon' as ZoomStop, owner: 'both' as const, label: 'Eagle', fullLabel: 'Eagle — Apollo 11 Lunar Module', copy: [], widgets: ['still-working-toggle'] },
  { id: 'moon.1.2', sceneId: '1.2', t0: 0.225, t1: 0.275, chapter: 'ch01-moon' as ChapterId, stop: 'moon' as ZoomStop, owner: 'both' as const, label: 'Intrepid', fullLabel: 'Intrepid, and the machine it came to visit', copy: [], widgets: ['moonquake'] },
  { id: 'moon.1.3', sceneId: '1.3', t0: 0.275, t1: 0.335, chapter: 'ch01-moon' as ChapterId, stop: 'moon' as ZoomStop, owner: 'both' as const, label: 'Falcon', fullLabel: 'Falcon, and the car we parked', copy: [], widgets: ['odometer', 'rtg-diagram'] },
  { id: 'moon.1.4', sceneId: '1.4', t0: 0.335, t1: 0.400, chapter: 'ch01-moon' as ChapterId, stop: 'moon' as ZoomStop, owner: 'both' as const, label: 'Six stations', fullLabel: 'The six stations, and the year the listening stopped', copy: [], widgets: ['date-slider'] },
  { id: 'mars.2.1', sceneId: '2.1', t0: 0.400, t1: 0.445, chapter: 'ch02-mars-early' as ChapterId, stop: 'mars' as ZoomStop, owner: 'both' as const, label: 'Viking 1', fullLabel: 'The lander that was renamed for a man who died', copy: [], widgets: ['weather-log'] },
  { id: 'mars.2.2', sceneId: '2.2', t0: 0.445, t1: 0.490, chapter: 'ch02-mars-early' as ChapterId, stop: 'mars' as ZoomStop, owner: 'both' as const, label: 'Pathfinder', fullLabel: 'Sojourner: the first wheels, and the beach ball', copy: [], widgets: ['bounce-counter', 'range-compare'] },
  { id: 'mars.3.1', sceneId: '3.1', t0: 0.490, t1: 0.535, chapter: 'ch03-mars-long' as ChapterId, stop: 'mars' as ZoomStop, owner: 'both' as const, label: 'MER', fullLabel: 'Spirit and Opportunity: two sides of one planet', copy: [], widgets: ['odometer-wall'] },
  { id: 'mars.3.2', sceneId: '3.2', t0: 0.535, t1: 0.585, chapter: 'ch03-mars-long' as ChapterId, stop: 'mars' as ZoomStop, owner: 'both' as const, label: 'InSight', fullLabel: 'InSight: the machine that listened', copy: [], widgets: ['vital-signs', 'audio-player'] },
  { id: 'mars.3.3', sceneId: '3.3', t0: 0.585, t1: 0.660, chapter: 'ch03-mars-long' as ChapterId, stop: 'mars' as ZoomStop, owner: 'both' as const, label: 'Ingenuity', fullLabel: 'Ingenuity: seventy-two flights', copy: [], widgets: ['flight-counter'] },
  { id: 'any.4.1', sceneId: '4.1', t0: 0.660, t1: 0.710, chapter: 'ch04-belt' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'Dawn', fullLabel: 'Dawn: out of fuel, in orbit, forever', copy: [], widgets: [] },
  { id: 'any.4.2', sceneId: '4.2', t0: 0.710, t1: 0.760, chapter: 'ch04-belt' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'NEAR', fullLabel: 'NEAR Shoemaker: the landing nobody planned', copy: [], widgets: ['descent-ladder'] },
  { id: 'any.5.1', sceneId: '5.1', t0: 0.760, t1: 0.810, chapter: 'ch05-anywhere' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'Pioneer 10', fullLabel: 'Pioneer 10: still going, no longer speaking', copy: [], widgets: ['signal-delay', 'plaque-viewer'] },
  { id: 'any.5.2', sceneId: '5.2', t0: 0.810, t1: 0.860, chapter: 'ch05-anywhere' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'Kepler', fullLabel: 'Kepler: 2,600 worlds', copy: [], widgets: ['transit-demo'] },
  { id: 'inv.6.1', sceneId: '6.1', t0: 0.860, t1: 0.940, chapter: 'ch06-inventory' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'Inventory', fullLabel: 'The full inventory', copy: [], widgets: [] },
  { id: 'inv.6.2', sceneId: '6.2', t0: 0.940, t1: 1.000, chapter: 'ch06-inventory' as ChapterId, stop: 'anywhere' as ZoomStop, owner: 'both' as const, label: 'Close', fullLabel: 'Abandoned, but not forgotten', copy: [], widgets: [] },
]

/** The only place in the app that maps progress → beat. Pure, no side effects. */
export function beatAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  for (const b of BEATS) if (p >= b.t0 && p < b.t1) return b
  return BEATS[BEATS.length - 1]!
}

export function stopAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  for (const s of STOPS) if (p >= s.t0 && p < s.t1) return s
  return STOPS[STOPS.length - 1]!
}

/** Local 0..1 inside a beat — the value every scene animation scrubs on. */
export function localU(progress: number, t0: number, t1: number) {
  return Math.min(1, Math.max(0, (progress - t0) / (t1 - t0)))
}

