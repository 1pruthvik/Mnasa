// ─────────────────────────────────────────────────────────────────────────────
// The single source of shape for the entire project. Frozen after Milestone 0.
// ─────────────────────────────────────────────────────────────────────────────

export type Body = 'Moon' | 'Mars' | 'Ceres' | 'Vesta' | 'Eros' | 'Interstellar' | 'Heliocentric'

export type ZoomStop =
  | 'milky-way' | 'sun' | 'solar-system' | 'inner-planets'
  | 'earth' | 'moon' | 'mars' | 'anywhere'

export type ChapterId =
  | 'ch00-descent' | 'ch01-moon' | 'ch02-mars-early'
  | 'ch03-mars-long' | 'ch04-belt' | 'ch05-anywhere' | 'ch06-inventory'

export type ObjectStatus =
  | 'on-surface' | 'in-orbit' | 'in-space' | 'impacted' | 'unknown'

export type Owner = 'niv' | 'pru' | 'both'

/** One catalogue record. Every number rendered on the site comes from here. */
export interface MissionObject {
  id: string                      // '1969-059C' | 'viking-1'
  name: string                    // full catalogue name
  shortName: string               // 'Eagle'
  alternateNames?: string[]
  body: Body
  site: string                    // 'Mare Tranquilitatis'
  lat?: number                    // decimal degrees, negative = S/W
  lon?: number
  arrived?: string                // ISO 8601, or 'UNKNOWN'
  wentQuiet: string               // ISO date, '2010' (year only), or 'UNKNOWN'
  quietReason: string             // one sentence, from the NASA source
  status: ObjectStatus
  subElements?: { name: string; state: string }[]
  massKg?: number
  distanceKm?: number             // driven distance if rover, e.g. 7.7 or 45.16
  distanceFromEarthRank?: number  // sorting rank for distance
  sceneId: string                 // '1.1'
  hardFacts: string[]             // verbatim numbers, one per line
  quote?: { text: string; attribution: string }
  audioCredit?: string
  imageCredit?: string
  sourceUrls: string[]
}

/** One scroll beat. Owned by this file; never changed without a version bump. */
export interface Beat {
  id: string                      // 'moon.1.1'
  sceneId: string                 // '1.1'
  label: string                   // rail label, short
  fullLabel: string               // 'Eagle — Apollo 11 Lunar Module'
  stop: ZoomStop
  t0: number                      // 0..1 inclusive
  t1: number                      // 0..1 exclusive
  chapter: ChapterId
  owner: Owner
  copy: string[]                  // paragraphs, in scroll order
  quoteId?: string                // key into scenes.ts
  widgets: WidgetId[]
}

export type WidgetId =
  | 'fact-drawer' | 'odometer' | 'odometer-wall' | 'flight-counter'
  | 'rtg-diagram' | 'signal-delay' | 'transit-demo' | 'weather-log'
  | 'audio-player' | 'plaque-viewer' | 'moonquake' | 'bounce-counter'
  | 'descent-ladder' | 'vital-signs' | 'date-slider' | 'range-compare'
  | 'still-working-toggle' | 'object-label' | 'lunar-map' | 'mars-map'

export interface WidgetSpec {
  id: WidgetId
  sceneId: string
  placement: 'left' | 'right' | 'bottom' | 'inline'
  title: string                   // accessible name
  caption?: string
}

export interface SceneQuote {
  id: string
  text: string                    // verbatim
  attribution: string             // speaker — role / source, one line
  sourceUrl?: string
}

export interface SourceEntry {
  url: string
  label: string
  usedFor: string[]               // scene ids
  fetched: string                 // '2026-11-15'
}
