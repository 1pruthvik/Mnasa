import { useCallback, useEffect, useState } from 'react'
import CanvasRoot from './three/CanvasRoot'
import { Overlay } from './ui/Overlay'
import { ProgressRail } from './ui/ProgressRail'
import { ReadingModeToggle } from './ui/ReadingModeToggle'
import { FallbackStory } from './ui/FallbackStory'
import { Credits } from './ui/Credits'
import { LunarMap } from './ui/LunarMap'
import { MarsMap } from './ui/MarsMap'
import { StoryControls, Welcome } from './ui/StoryControls'
import { StoryMenu } from './ui/StoryMenu'
import { StoryVista } from './ui/StoryVista'
import { SceneOrbit } from './ui/SceneOrbit'
import { ModelExplorer, itemForScene, type ExplorerItem } from './ui/ModelExplorer'
import { isWorldOverview, screenIndex } from './data/experience'
import { travelAt } from './three/chapters/Travel'
import { SCENES } from './data/scenes'
import { useStore } from './store'
import { useBootCapability } from './useBootCapability'
import { useLenis } from './scroll/useLenis'
import { useGuidedStory } from './scroll/useGuidedStory'
import { BEATS } from './contracts/beats'
import './contracts/tokens.css'

export default function App() {
  const reducedMotion = useStore((s) => s.reducedMotion)
  const tier = useStore((s) => s.tier)
  const readingMode = useStore((s) => s.readingMode)
  const webglOk = useStore((s) => s.webglOk)
  const [welcome, setWelcome] = useState(true)
  const activeScene = useStore(s => s.activeSceneId)
  const resetSceneOrbit = useStore(s => s.resetSceneOrbit)
  const shotKind = useStore(s => travelAt(s.progress) || (isWorldOverview(s.progress) ? 'overview' : s.activeSceneId === '0.1' && screenIndex(s.progress) < 2 ? 'galaxy' : 'scene'))
  const [explorerItem, setExplorerItem] = useState<ExplorerItem | null>(null)
  const closeExplorer = useCallback(() => setExplorerItem(null), [])
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [mapModalOpen, setMapModalOpen] = useState<'lunar' | 'mars' | null>(null)
  useBootCapability()
  // A new shot gets its original composition rather than inheriting another scene's orbit.
  useEffect(() => { resetSceneOrbit() }, [activeScene, shotKind, resetSceneOrbit])
  useEffect(() => {
    if (!mapModalOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMapModalOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mapModalOpen])
  const isFallback = readingMode || reducedMotion || tier === 'none' || !webglOk
  useEffect(() => { if (welcome || isFallback) resetSceneOrbit() }, [welcome, isFallback, resetSceneOrbit])
  useLenis(!isFallback)
  const player = useGuidedStory(!isFallback && !welcome)
  const handleScrollToBeat = (t: number) => {
    player.exit()
    const max = document.documentElement.scrollHeight - window.innerHeight
    const beat = BEATS.find(b => Math.abs(b.t0 - t) < 0.00001)
    const target = beat ? beat.t0 + (beat.t1 - beat.t0) * .5 / (SCENES[beat.sceneId]?.copy.length || 1) : t
    window.scrollTo({ top: target * max, behavior: 'smooth' })
  }
  const handleScrollToScene = (sceneId: string) => {
    const beat = BEATS.find((b) => b.sceneId === sceneId)
    if (beat) handleScrollToBeat(beat.t0)
  }
  const explore = () => { setWelcome(false); player.exit() }
  const play = () => { resetSceneOrbit(); setWelcome(false); if (!isFallback) player.start() }
  const pauseForDetails = () => { if (player.mode === 'playing') player.pause() }

  return <div className="relative min-h-screen bg-[#05070d] text-slate-100 overflow-x-hidden">
    {isFallback ? <><FallbackStory />{!reducedMotion && tier !== 'none' && webglOk && <ReadingModeToggle />}</> : <>
      <CanvasRoot />
      {!welcome && <>
        <div className="story-top"><button onClick={() => { resetSceneOrbit(); player.exit(); setWelcome(true) }} className="story-brand">✳ <span>THE QUIET EXPLORERS</span></button><StoryMenu onPlay={play} onHome={() => { player.exit(); setWelcome(true) }} onOpen={pauseForDetails} onMap={() => setMapModalOpen('lunar')} onCredits={() => setCreditsOpen(true)} /></div>
        <StoryVista />
        {shotKind !== 'galaxy' && <SceneOrbit />}
        <Overlay onScrollToScene={handleScrollToScene} onOpenDetails={pauseForDetails} onReplay={play} onExploreModel={() => { pauseForDetails(); const p = useStore.getState().progress; setExplorerItem(itemForScene(useStore.getState().activeSceneId, isWorldOverview(p))) }} />
        <StoryControls player={player} />
        <ProgressRail onScrollTo={handleScrollToBeat} />
      </>}
      <div className="w-full pointer-events-none" style={{ height: '3800vh' }} aria-hidden="true" />
    </>}
    {welcome && <Welcome onPlay={play} onExplore={explore} minutes={player.totalMinutes} fallback={isFallback} />}
    {explorerItem && <ModelExplorer initial={explorerItem} onClose={closeExplorer} onRotateScene={() => { setExplorerItem(null); requestAnimationFrame(() => document.querySelector<HTMLElement>('.scene-orbit-surface')?.focus()) }} />}
    <Credits isOpen={creditsOpen} onClose={() => setCreditsOpen(false)} />
    {mapModalOpen && <div role="dialog" aria-modal="true" aria-label="Atlas maps" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"><div className="flex flex-col items-center gap-3"><div className="flex gap-2">
      <button onClick={() => setMapModalOpen('lunar')} className="px-3 py-1 rounded text-xs font-mono bg-slate-800">Moon (Near Side)</button>
      <button onClick={() => setMapModalOpen('mars')} className="px-3 py-1 rounded text-xs font-mono bg-slate-800">Mars Surface Sites</button>
    </div>{mapModalOpen === 'lunar' ? <LunarMap onClose={() => setMapModalOpen(null)} /> : <MarsMap onClose={() => setMapModalOpen(null)} />}</div></div>}
  </div>
}
