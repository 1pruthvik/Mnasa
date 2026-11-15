export interface WP {
  t: number
  pos: [number, number, number]
  look: [number, number, number]
  fov: number
  roll?: number
  note: string
}

export const DESCENT: WP[] = [
  { t: 0.000, pos: [0, 0, 900], look: [0, 0, 0], fov: 70, note: 'Milky Way, deep field' },
  { t: 0.045, pos: [0, 0, 520], look: [0, 0, 0], fov: 66, note: 'Sun resolves' },
  { t: 0.075, pos: [-12, 6, 300], look: [0, 0, 0], fov: 62, note: 'Solar system, orbits implied' },
  { t: 0.115, pos: [-6, 2, 140], look: [0, 0, -40], fov: 56, note: 'Inner planets' },
  { t: 0.145, pos: [0, 0, 62], look: [0, 0, -60], fov: 50, note: 'Earth; THE DOOR begins' },
  { t: 0.175, pos: [0, 6, 26], look: [0, 0, -40], fov: 44, note: 'Moon surface, arrival' },
  { t: 0.225, pos: [14, 3.2, 10], look: [0, 2, -4], fov: 42, roll: 6, note: 'Eagle, low orbit around LM' },
  { t: 0.275, pos: [-18, 2.4, 9], look: [-16, 1.2, -6], fov: 40, note: 'Intrepid + Surveyor, 180 m apart' },
  { t: 0.335, pos: [30, 1.6, 22], look: [24, 1.0, 10], fov: 38, note: 'LRV wheel height, Mare Imbrium' },
  { t: 0.400, pos: [34, 12, 46], look: [24, 0, 14], fov: 40, note: 'Six stations; pull up and away' },
  { t: 0.445, pos: [0, 3.0, 16], look: [0, 2, -6], fov: 40, note: 'Mars: Viking horizon' },
  { t: 0.490, pos: [12, 4.5, 14], look: [8, 1, -8], fov: 40, note: 'Pathfinder bounce + Sojourner' },
  { t: 0.535, pos: [-10, 3.2, 18], look: [-8, 1, -10], fov: 40, note: 'Spirit + Opportunity' },
  { t: 0.585, pos: [6, 2.8, 12], look: [4, 1, -8], fov: 40, note: 'InSight, arm to ground' },
  { t: 0.620, pos: [8, 9.0, 10], look: [8, 9, -2], fov: 42, note: 'Ingenuity flight altitude' },
  { t: 0.660, pos: [8, 9.0, 10], look: [8, 9, -2], fov: 42, note: 'FREEZE — nothing moves' },
  { t: 0.710, pos: [-40, 18, 60], look: [-20, 0, -30], fov: 44, note: 'Asteroid belt, Dawn loop' },
  { t: 0.760, pos: [-70, 10, 40], look: [-40, -6, -10], fov: 48, note: 'Eros, NEAR on the surface' },
  { t: 0.810, pos: [0, 0, 260], look: [0, 0, -200], fov: 62, note: 'Anywhere: sparse stars, Pioneer 10' },
  { t: 0.860, pos: [0, 0, 120], look: [0, 0, -120], fov: 58, note: 'Kepler, barrel silhouette' },
  { t: 0.940, pos: [0, 0, 60], look: [0, 0, -60], fov: 54, note: 'Inventory: dissolve to plane' },
  { t: 1.000, pos: [0, 0, 44], look: [0, 0, -44], fov: 52, note: 'The close: stars, count, nothing else' },
]

