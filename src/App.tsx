import { useState } from 'react'
import CanvasRoot from './three/CanvasRoot'
import { Overlay } from './ui/Overlay'
import { ProgressRail } from './ui/ProgressRail'
import { ObjectLabels } from './ui/ObjectLabel'
import { TelemetryHUD } from './ui/TelemetryHUD'
import { AtlasNavHeader } from './ui/AtlasNavHeader'
import { GuidedDemoControls } from './ui/GuidedDemoControls'
import { Footer } from './ui/Footer'
import { FallbackStory } from './ui/FallbackStory'
import { Credits } from './ui/Credits'
import { LunarMap } from './ui/LunarMap'
import { MarsMap } from './ui/MarsMap'
import { useStore } from './store'
import { useBootCapability } from './useBootCapability'
import { useLenis } from './scroll/useLenis'
import { useGuidedDemo } from './scroll/useGuidedDemo'
import { BEATS } from './contracts/beats'
import './contracts/tokens.css'

export default function App() {
  const reducedMotion = useStore((s) => s.reducedMotion)
  const tier = useStore((s) => s.tier)
  const readingMode = useStore((s) => s.readingMode)
  const webglOk = useStore((s) => s.webglOk)

  const [creditsOpen, setCreditsOpen] = useState(false)
  const [mapModalOpen, setMapModalOpen] = useState<'lunar' | 'mars' | null>(null)

  useBootCapability()

  const isFallback = readingMode || reducedMotion || tier === 'none' || !webglOk
  useLenis(!isFallback)

  // Autonomous guided playback controller
  useGuidedDemo()

  const handleScrollToBeat = (t: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: t * max, behavior: 'smooth' })
  }

  const handleScrollToScene = (sceneId: string) => {
    const beat = BEATS.find((b) => b.sceneId === sceneId)
    if (beat) {
      handleScrollToBeat(beat.t0)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#05070d] text-slate-100 overflow-x-hidden pt-12">
      {/* Persistent Atlas Navigation & WHERE AM I Header */}
      <AtlasNavHeader
        onScrollToBeat={handleScrollToBeat}
        onOpenCredits={() => setCreditsOpen(true)}
        onOpenMap={() => setMapModalOpen('lunar')}
      />

      {isFallback ? (
        <FallbackStory />
      ) : (
        <>
          <CanvasRoot />
          <Overlay
            onScrollToScene={handleScrollToScene}
            onScrollToExplore={() => handleScrollToBeat(0.045)}
            onScrollToBeat={handleScrollToBeat}
          />
          <ObjectLabels />
          <TelemetryHUD />
          <ProgressRail onScrollTo={handleScrollToBeat} />
          <GuidedDemoControls />
          <Footer
            onOpenCredits={() => setCreditsOpen(true)}
            onOpenMap={() => setMapModalOpen('lunar')}
          />
          {/* Scroll Track: 38 screens tall to power the single progress driver */}
          <div
            className="w-full pointer-events-none"
            style={{ height: '3800vh' }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Credits Modal */}
      <Credits isOpen={creditsOpen} onClose={() => setCreditsOpen(false)} />

      {/* Atlas Maps Modal */}
      {mapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setMapModalOpen('lunar')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                  mapModalOpen === 'lunar'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                Moon (Near Side)
              </button>
              <button
                onClick={() => setMapModalOpen('mars')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                  mapModalOpen === 'mars'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                Mars (Global Basemap)
              </button>
              <button
                onClick={() => setMapModalOpen(null)}
                className="px-3 py-1 rounded text-xs font-mono bg-slate-800 text-slate-400 hover:text-white cursor-pointer ml-4"
              >
                Close
              </button>
            </div>

            {mapModalOpen === 'lunar' ? (
              <LunarMap
                onClose={() => setMapModalOpen(null)}
                onSelectScene={(sceneId) => {
                  setMapModalOpen(null)
                  handleScrollToScene(sceneId)
                }}
              />
            ) : (
              <MarsMap
                onClose={() => setMapModalOpen(null)}
                onSelectScene={(sceneId) => {
                  setMapModalOpen(null)
                  handleScrollToScene(sceneId)
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
