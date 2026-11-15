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
  { t: 0.045, pos: [0, 0, 480], look: [0, 0, 0], fov: 66, note: 'Sun resolves' },
  { t: 0.075, pos: [-15, 8, 260], look: [0, 0, 0], fov: 60, note: 'Solar system, orbits implied' },
  { t: 0.115, pos: [-8, 4, 120], look: [0, 0, 62], fov: 54, note: 'Inner planets' },
  { t: 0.145, pos: [0, 2, 74], look: [0, 0, 62], fov: 48, note: 'Earth; THE DOOR begins' },
  { t: 0.175, pos: [0, 5, 14], look: [0, 1.8, 0], fov: 46, note: 'Moon surface, arrival over Eagle' },
  { t: 0.225, pos: [6, 2.8, 5], look: [0, 1.8, 0], fov: 42, roll: 4, note: 'Eagle close orbit around LM' },
  { t: 0.275, pos: [-12, 2.2, -3], look: [-16, 1.2, -6], fov: 40, note: 'Intrepid + Surveyor 3 close view' },
  { t: 0.335, pos: [26, 1.8, 12], look: [22, 0.8, 8], fov: 38, note: 'LRV wheel height, Mare Imbrium' },
  { t: 0.400, pos: [28, 6, 20], look: [25, 0.5, 11], fov: 40, note: 'ALSEP stations; pull up and away' },
  { t: 0.445, pos: [4, 2.4, 6], look: [0, 1.2, 0], fov: 40, note: 'Mars: Viking 1 close inspection' },
  { t: 0.490, pos: [11, 2.6, -3], look: [8, 0.8, -6], fov: 40, note: 'Pathfinder & Sojourner' },
  { t: 0.535, pos: [-5, 2.2, -5], look: [-8, 0.8, -8], fov: 40, note: 'Opportunity Rover close view' },
  { t: 0.585, pos: [7, 2.2, -3], look: [4, 0.8, -6], fov: 40, note: 'InSight, SEIS dome and arm' },
  { t: 0.620, pos: [8, 10.2, 3], look: [8, 9.0, -2], fov: 42, note: 'Ingenuity flight altitude' },
  { t: 0.660, pos: [8, 10.2, 3], look: [8, 9.0, -2], fov: 42, note: 'FREEZE — nothing moves' },
  { t: 0.710, pos: [-32, 12, 8], look: [-25, 8, -15], fov: 44, note: 'Asteroid belt, Dawn loop' },
  { t: 0.760, pos: [-44, -3.2, -6], look: [-40, -4.8, -10], fov: 46, note: 'Eros, NEAR on the surface' },
  { t: 0.810, pos: [0, 0, -150], look: [0, 0, -180], fov: 55, note: 'Anywhere: Pioneer 10 golden plaque' },
  { t: 0.860, pos: [0, 2, -95], look: [0, 0, -110], fov: 52, note: 'Kepler barrel silhouette' },
  { t: 0.940, pos: [0, 0, 60], look: [0, 0, -60], fov: 54, note: 'Inventory: dissolve to plane' },
  { t: 1.000, pos: [0, 0, 44], look: [0, 0, -44], fov: 52, note: 'The close: stars, count, nothing else' },
]
