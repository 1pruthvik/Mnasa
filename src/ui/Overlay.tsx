import React from 'react'
import { beatAt, localU } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { useStore } from '../store'
import { SceneText } from './SceneText'
import { InventoryTable } from './InventoryTable'

interface OverlayProps {
  onScrollToScene?: (sceneId: string) => void
}

export const Overlay: React.FC<OverlayProps> = ({ onScrollToScene }) => {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const sceneDef = SCENES[beat.sceneId]

  const screens = sceneDef?.copy || ['']
  const u = localU(progress, beat.t0, beat.t1)
  const per = 1 / screens.length
  const idx = Math.min(screens.length - 1, Math.floor(u / per))
  const localUInScreen = (u - idx * per) / per

  const isInventoryScene = beat.sceneId === '6.1'

  return (
    <section
      className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16 select-none overflow-hidden"
      role="region"
      aria-label="Narrative"
    >
      {/* Background scrim for text legibility (left scrim on desktop, bottom scrim on mobile) */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-1/2 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none" />

      {/* Main Narrative Content Box */}
      <div className="relative z-10 my-auto max-w-xl max-h-[82vh] overflow-y-auto pr-2 pb-16">
        {isInventoryScene ? (
          <div className="pointer-events-auto">
            <InventoryTable onSelectScene={onScrollToScene} />
          </div>
        ) : (
          <SceneText
            key={`${beat.id}:${idx}`}
            beat={beat}
            text={screens[idx] || ''}
            u={localUInScreen}
            first={idx === 0}
            last={idx === screens.length - 1}
          />
        )}
      </div>

      {/* Visually hidden summary for screen readers — guarantees complete accessible story regardless of scroll */}
      <div className="sr-only" aria-live="polite">
        <h2>{sceneDef?.title}</h2>
        {sceneDef?.copy.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

