import { create } from 'zustand'
import type { ChapterId, ZoomStop } from './contracts/types'
import { beatAt, stopAt } from './contracts/beats'

export type Tier = 'none' | 'low' | 'high'
export type PerfLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface LabelPos {
  x: number
  y: number
  visible: boolean
}

export interface AppState {
  // ── written by the scroll system (the only writer of progress)
  progress: number
  activeBeatId: string
  activeSceneId: string
  activeStop: ZoomStop
  activeChapter: ChapterId

  // ── capability, written once at boot
  webglOk: boolean
  tier: Tier
  reducedMotion: boolean
  readingMode: boolean

  // ── perf governor, written by systems/perf.ts
  perfLevel: PerfLevel
  postEnabled: boolean
  dustEnabled: boolean
  starScale: number
  terrainSegments: number

  // ── UI state, written by the DOM
  mapOpen: boolean
  creditsOpen: boolean
  filterWorkingOnly: boolean
  labelsOn: boolean
  audioUnlocked: boolean
  labelPositions: Record<string, LabelPos>

  setProgress: (p: number) => void
  setPerfLevel: (l: PerfLevel) => void
  setCapability: (c: { webglOk: boolean; tier: Tier; reducedMotion: boolean }) => void
  toggleReadingMode: () => void
  openMap: () => void
  closeMap: () => void
  openCredits: () => void
  closeCredits: () => void
  setFilterWorkingOnly: (v: boolean) => void
  setLabelsOn: (v: boolean) => void
  unlockAudio: () => void
  setLabelPositions: (p: Record<string, LabelPos>) => void
}

const initialBeat = beatAt(0)
const initialStop = stopAt(0)

export const useStore = create<AppState>((set, get) => ({
  progress: 0,
  activeBeatId: initialBeat.id,
  activeSceneId: initialBeat.sceneId,
  activeStop: initialStop.id,
  activeChapter: initialBeat.chapter,

  webglOk: true,
  tier: 'high',
  reducedMotion: false,
  readingMode: false,
  perfLevel: 0,
  postEnabled: true,
  dustEnabled: true,
  starScale: 1,
  terrainSegments: 256,
  mapOpen: false,
  creditsOpen: false,
  filterWorkingOnly: false,
  labelsOn: true,
  audioUnlocked: false,
  labelPositions: {},

  setProgress: (p) => {
    const q = Math.min(1, Math.max(0, p))
    const prev = get()
    const b = beatAt(q)
    const s = stopAt(q)

    // Only allocate new state when derived values actually change
    if (prev.activeBeatId !== b.id || prev.activeChapter !== b.chapter || prev.activeStop !== s.id) {
      set({
        progress: q,
        activeBeatId: b.id,
        activeSceneId: b.sceneId,
        activeStop: s.id,
        activeChapter: b.chapter,
      })
    } else {
      set({ progress: q })
    }
  },

  setPerfLevel: (l) =>
    set({
      perfLevel: l,
      postEnabled: l < 1,
      starScale: l < 2 ? 1 : 0.5,
      terrainSegments: l < 3 ? 256 : 128,
      dustEnabled: l < 4,
    }),

  setCapability: (c) => set({ ...c }),
  toggleReadingMode: () => set((s) => ({ readingMode: !s.readingMode })),
  openMap: () => set({ mapOpen: true }),
  closeMap: () => set({ mapOpen: false }),
  openCredits: () => set({ creditsOpen: true }),
  closeCredits: () => set({ creditsOpen: false }),
  setFilterWorkingOnly: (v) => set({ filterWorkingOnly: v }),
  setLabelsOn: (v) => set({ labelsOn: v }),
  unlockAudio: () => set({ audioUnlocked: true }),
  setLabelPositions: (p) => set({ labelPositions: p }),
}))

