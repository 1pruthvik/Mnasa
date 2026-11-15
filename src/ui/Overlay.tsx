import React, { useEffect, useState } from 'react'
import { BEATS, beatAt, localU } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { SCENE_CONTEXT } from '../data/sceneContext'
import { useStore } from '../store'
import { SceneText } from './SceneText'
import { InventoryTable } from './InventoryTable'

interface OverlayProps {
  onScrollToScene?: (sceneId: string) => void
  onOpenDetails?: () => void
}

export const Overlay: React.FC<OverlayProps> = ({ onScrollToScene, onOpenDetails }) => {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const scene = SCENES[beat.sceneId]
  const context = SCENE_CONTEXT[beat.sceneId]
  const screens = scene?.copy || ['']
  const idx = Math.min(screens.length - 1, Math.floor(localU(progress, beat.t0, beat.t1) * screens.length))
  const [inventoryOpen, setInventoryOpen] = useState(false)

  useEffect(() => {
    if (!inventoryOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setInventoryOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [inventoryOpen])

  return <>
    <section className="story-overlay fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-label="Narrative">
      <div className="story-scrim" />
      <div className="story-card pointer-events-auto">
        <div className="scene-location">{context?.location}<span className="scene-number">{String(BEATS.findIndex(b => b.sceneId === beat.sceneId) + 1).padStart(2, '0')} / 17</span></div>
        {beat.sceneId === '6.1' ? <article className="inventory-intro">
          <h2>The full inventory</h2>
          <p>{screens[idx]}</p>
          <button className="inventory-open" onClick={() => { onOpenDetails?.(); setInventoryOpen(true) }}>Explore the archive <span>↗</span></button>
        </article> : <SceneText key={beat.id} beat={beat} text={screens[idx] || ''} onOpenDetails={onOpenDetails} />}
        {context && <div className="scene-fact"><p>{context.fact}</p><div className="scene-source"><span>{beat.sceneId === '1.1' ? 'LANDING CONFIGURATION · ILLUSTRATION' : 'ILLUSTRATION · NOT TO SCALE'}</span><a href={context.source} target="_blank" rel="noreferrer">NASA source ↗</a></div></div>}
      </div>
      <div className="sr-only" aria-live="polite"><h2>{scene?.title}</h2><p>{screens[idx]}</p></div>
    </section>
    {inventoryOpen && <div className="inventory-modal" role="dialog" aria-modal="true" aria-label="The full inventory">
      <div className="inventory-window"><button className="inventory-close" autoFocus onClick={() => setInventoryOpen(false)} aria-label="Close inventory">✕</button>
        <InventoryTable onSelectScene={(id) => { setInventoryOpen(false); onScrollToScene?.(id) }} />
      </div>
    </div>}
  </>
}
