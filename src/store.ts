import { create } from 'zustand'
import type { ChapterId, ZoomStop } from './contracts/types'
import { beatAt, stopAt } from './contracts/beats'
import { STORYBOARD, getTotalDemoDuration } from './data/storyboard'

export type Tier = 'none' | 'low' | 'high'
export type PerfLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface LabelPos {
  x: number
  y: number
  visible: boolean
}

export type DemoState = 'manual' | 'playing' | 'paused' | 'finished'
export type DemoSpeed = 'normal' | 'slow'

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

  // ── Guided Demo State Machine
  demoState: DemoState
  demoSpeed: DemoSpeed
  demoShotIndex: number
  demoRemainingHold: number
  demoTotalDuration: number

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

  // ── Guided Demo Actions
  startDemo: (fromBeginning?: boolean) => void
  pauseDemo: () => void
  resumeDemo: () => void
  nextDemoShot: () => void
  prevDemoShot: () => void
  exitDemo: () => void
  setDemoSpeed: (s: DemoSpeed) => void
  setDemoShotIndex: (i: number) => void
  setDemoRemainingHold: (sec: number) => void
  finishDemo: () => void
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

  demoState: 'manual',
  demoSpeed: 'normal',
  demoShotIndex: 0,
  demoRemainingHold: 0,
  demoTotalDuration: getTotalDemoDuration('normal'),

  setProgress: (p) => {
    const q = Math.min(1, Math.max(0, p))
    const prev = get()
    const b = beatAt(q)
    const s = stopAt(q)

    // Only allocate new state when derived values actually change
    if (prev.activeBeatId !== b.id || prev.activeChapter !== b.chapter) {
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

  startDemo: (fromBeginning = true) => {
    const currentProgress = get().progress
    let startIndex = 0
    if (!fromBeginning) {
      const idx = STORYBOARD.findIndex(
        (s) => currentProgress >= s.startT && currentProgress < s.endT
      )
      startIndex = idx >= 0 ? idx : 0
    }
    const shot = STORYBOARD[startIndex]
    set({
      demoState: 'playing',
      demoShotIndex: startIndex,
      demoRemainingHold: shot.holdDuration,
    })
  },

  pauseDemo: () => {
    if (get().demoState === 'playing') {
      set({ demoState: 'paused' })
    }
  },

  resumeDemo: () => {
    if (get().demoState === 'paused') {
      set({ demoState: 'playing' })
    }
  },

  nextDemoShot: () => {
    const cur = get().demoShotIndex
    if (cur < STORYBOARD.length - 1) {
      const nextIdx = cur + 1
      const shot = STORYBOARD[nextIdx]
      set({
        demoShotIndex: nextIdx,
        demoRemainingHold: shot.holdDuration,
        demoState: 'playing',
      })
    } else {
      set({ demoState: 'finished' })
    }
  },

  prevDemoShot: () => {
    const cur = get().demoShotIndex
    if (cur > 0) {
      const prevIdx = cur - 1
      const shot = STORYBOARD[prevIdx]
      set({
        demoShotIndex: prevIdx,
        demoRemainingHold: shot.holdDuration,
        demoState: 'playing',
      })
    }
  },

  exitDemo: () => {
    set({ demoState: 'manual' })
  },

  setDemoSpeed: (speed) => {
    set({
      demoSpeed: speed,
      demoTotalDuration: getTotalDemoDuration(speed),
    })
  },

  setDemoShotIndex: (index) => {
    set({ demoShotIndex: index })
  },

  setDemoRemainingHold: (sec) => {
    set({ demoRemainingHold: sec })
  },

  finishDemo: () => {
    set({ demoState: 'finished' })
  },
}))
