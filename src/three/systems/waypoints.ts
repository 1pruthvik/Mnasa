export interface WP {
  t: number
  pos: [number, number, number]
  look: [number, number, number]
  fov: number
  roll?: number
  note: string
}

export const DESCENT: WP[] = [
  { t: 0.000, pos: [25, 45, 170], look: [0, 0, 30], fov: 60, note: 'Milky Way & Solar System overview' },
  { t: 0.045, pos: [22, 32, 125], look: [5, 0, 45], fov: 56, note: 'Tracking toward inner planetary orbits' },
  { t: 0.075, pos: [15, 20, 95], look: [0, 0, 62], fov: 52, note: 'Earth orbital path approach' },
  { t: 0.115, pos: [8, 10, 78], look: [0, 0, 62], fov: 48, note: 'Earth and Moon system in view' },
  { t: 0.145, pos: [3, 5, 68], look: [0, 0, 62], fov: 45, note: 'Moon gate: transition into lunar orbit' },
  { t: 0.175, pos: [0, 4.5, 10], look: [0, 1.5, 0], fov: 45, note: 'Moon surface, arrival over Eagle' },
  { t: 0.225, pos: [5.2, 2.4, 4.8], look: [0, 1.5, 0], fov: 42, roll: 3, note: 'Eagle close orbit around LM' },
  { t: 0.275, pos: [-12.5, 1.8, -3.2], look: [-16, 1.0, -6], fov: 40, note: 'Intrepid + Surveyor 3 close view' },
  { t: 0.335, pos: [26, 1.6, 11], look: [22, 0.8, 8], fov: 38, note: 'LRV wheel height, Mare Imbrium' },
  { t: 0.400, pos: [28, 4.2, 16], look: [25, 0.5, 11], fov: 40, note: 'ALSEP stations; pull up and away' },
  { t: 0.445, pos: [3.8, 2.0, 5.5], look: [0, 1.1, 0], fov: 40, note: 'Mars: Viking 1 close inspection' },
  { t: 0.490, pos: [10.5, 2.2, -3.5], look: [8, 0.8, -6], fov: 40, note: 'Pathfinder & Sojourner' },
  { t: 0.535, pos: [-5.2, 1.9, -5.2], look: [-8, 0.8, -8], fov: 40, note: 'Opportunity Rover close view' },
  { t: 0.585, pos: [9.2, 3.2, -1.8], look: [4, 0.6, -6], fov: 44, note: 'InSight, SEIS dome and arm fully uncropped' },
  { t: 0.620, pos: [7.5, 9.8, 2.8], look: [8, 9.0, -2], fov: 42, note: 'Ingenuity flight altitude' },
  { t: 0.660, pos: [7.5, 9.8, 2.8], look: [8, 9.0, -2], fov: 42, note: 'FREEZE — nothing moves' },
  { t: 0.710, pos: [-18, 7, 5], look: [-22, 2, -22], fov: 44, note: 'Asteroid belt, Dawn at Ceres' },
  { t: 0.760, pos: [-35, -2.0, -4], look: [-40, -4.5, -10], fov: 44, note: 'Eros, NEAR on the surface' },
  { t: 0.810, pos: [0, 1.2, -26], look: [0, 0, -36], fov: 48, note: 'Anywhere: Pioneer 10 golden plaque' },
  { t: 0.860, pos: [0, 2.2, -20], look: [0, 0, -30], fov: 46, note: 'Kepler barrel silhouette' },
  { t: 0.940, pos: [0, 0, 40], look: [0, 0, -20], fov: 52, note: 'Inventory: dissolve to plane' },
  { t: 1.000, pos: [0, 0, 30], look: [0, 0, -20], fov: 50, note: 'The close: stars, count, nothing else' },
]
