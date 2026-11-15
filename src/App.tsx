import { useEffect, useState } from 'react'
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
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [mapModalOpen, setMapModalOpen] = useState<'lunar' | 'mars' | null>(null)
  useBootCapability()
  useEffect(() => {
    if (!mapModalOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMapModalOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mapModalOpen])
  const isFallback = readingMode || reducedMotion || tier === 'none' || !webglOk
  useLenis(!isFallback)
  const player = useGuidedStory(!isFallback && !welcome)
  const handleScrollToBeat = (t: number) => {
    player.exit()
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: t * max + 2, behavior: 'smooth' })
  }
  const handleScrollToScene = (sceneId: string) => {
    const beat = BEATS.find((b) => b.sceneId === sceneId)
    if (beat) handleScrollToBeat(beat.t0)
  }
  const explore = () => { setWelcome(false); player.exit() }
  const play = () => { setWelcome(false); if (!isFallback) player.start() }
  const pauseForDetails = () => { if (player.mode === 'playing') player.pause() }

  return <div className="relative min-h-screen bg-[#05070d] text-slate-100 overflow-x-hidden">
    {isFallback ? <><FallbackStory />{!reducedMotion && tier !== 'none' && webglOk && <ReadingModeToggle />}</> : <>
      <CanvasRoot />
      {!welcome && <>
        <div className="story-top"><button onClick={() => { player.exit(); setWelcome(true) }} className="story-brand">✳ <span>THE QUIET EXPLORERS</span></button><StoryMenu onPlay={play} onHome={() => { player.exit(); setWelcome(true) }} onOpen={pauseForDetails} onMap={() => setMapModalOpen('lunar')} onCredits={() => setCreditsOpen(true)} /></div>
        <Overlay onScrollToScene={handleScrollToScene} onOpenDetails={pauseForDetails} />
        <StoryControls player={player} />
        <ProgressRail onScrollTo={handleScrollToBeat} />
      </>}
      <div className="w-full pointer-events-none" style={{ height: '3800vh' }} aria-hidden="true" />
    </>}
    {welcome && <Welcome onPlay={play} onExplore={explore} minutes={player.totalMinutes} fallback={isFallback} />}
    <Credits isOpen={creditsOpen} onClose={() => setCreditsOpen(false)} />
    {mapModalOpen && <div role="dialog" aria-modal="true" aria-label="Atlas maps" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"><div className="flex flex-col items-center gap-3"><div className="flex gap-2">
      <button onClick={() => setMapModalOpen('lunar')} className="px-3 py-1 rounded text-xs font-mono bg-slate-800">Moon (Near Side)</button>
      <button onClick={() => setMapModalOpen('mars')} className="px-3 py-1 rounded text-xs font-mono bg-slate-800">Mars Surface Sites</button>
    </div>{mapModalOpen === 'lunar' ? <LunarMap onClose={() => setMapModalOpen(null)} /> : <MarsMap onClose={() => setMapModalOpen(null)} />}</div></div>}
  </div>
}
