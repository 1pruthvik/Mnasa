import React from 'react'
import { beatAt, localU } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { useStore } from '../store'
import { SceneCardPanel } from './SceneCardPanel'
import { HeroIntro } from './HeroIntro'
import { InventoryTable } from './InventoryTable'

interface OverlayProps {
  onScrollToScene?: (sceneId: string) => void
  onScrollToExplore?: () => void
}

export const Overlay: React.FC<OverlayProps> = ({
  onScrollToScene,
  onScrollToExplore,
}) => {
  const progress = useStore((s) => s.progress)
  const demoState = useStore((s) => s.demoState)
  const beat = beatAt(progress)
  const sceneDef = SCENES[beat.sceneId]

  const screens = sceneDef?.copy || ['']
  const u = localU(progress, beat.t0, beat.t1)
  const per = 1 / screens.length
  const idx = Math.min(screens.length - 1, Math.floor(u / per))

  const isOpeningHero = progress < 0.035 && demoState === 'manual'
  const isInventoryScene = beat.sceneId === '6.1'

  const handleScrollExplore = () => {
    if (onScrollToExplore) {
      onScrollToExplore()
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: 0.05 * max, behavior: 'smooth' })
    }
  }

  return (
    <section
      className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12 select-none overflow-hidden"
      role="region"
      aria-label="Narrative & Science Atlas"
    >
      {/* Background scrim for text legibility (left 45% on desktop, bottom gradient on mobile) */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[48%] lg:w-[42%] bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent pointer-events-none" />

      {/* Main Left-Column Content Container (30-38% safe area) */}
      <div className="relative z-10 my-auto w-full md:w-[44%] lg:w-[38%] max-h-[82vh] overflow-y-auto pr-2 pb-24">
        {isOpeningHero ? (
          <HeroIntro onScrollToExplore={handleScrollExplore} />
        ) : isInventoryScene ? (
          <div className="pointer-events-auto">
            <InventoryTable onSelectScene={onScrollToScene} />
          </div>
        ) : (
          <SceneCardPanel
            beat={beat}
            paragraphText={screens[idx]}
            paragraphIndex={idx}
            totalParagraphs={screens.length}
          />
        )}
      </div>

      {/* Accessible Screen Reader Narrative (Always present in DOM) */}
      <div className="sr-only" aria-live="polite">
        <h2>{sceneDef?.title}</h2>
        {sceneDef?.copy.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
