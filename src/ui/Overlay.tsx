import React, { useEffect, useState } from 'react'
import { BEATS, beatAt, localU } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { SCENE_CONTEXT } from '../data/sceneContext'
import { isWorldOverview } from '../data/experience'
import { travelAt } from '../three/chapters/Travel'
import { useStore } from '../store'
import { SceneText } from './SceneText'
import { InventoryTable } from './InventoryTable'

interface OverlayProps {
  onScrollToScene?: (sceneId: string) => void
  onOpenDetails?: () => void
  onExploreModel?: () => void
  onReplay?: () => void
}

export const Overlay: React.FC<OverlayProps> = ({ onScrollToScene, onOpenDetails, onExploreModel, onReplay }) => {
  const progress = useStore((s) => s.progress)
  const beat = beatAt(progress)
  const scene = SCENES[beat.sceneId]
  const intro = beat.sceneId === '0.1'
  const worldOverview = isWorldOverview(progress)
  const route = travelAt(progress)
  let context = SCENE_CONTEXT[beat.sceneId]
  const screens = scene?.copy || ['']
  const idx = Math.min(screens.length - 1, Math.floor(localU(progress, beat.t0, beat.t1) * screens.length))
  let title = scene?.title
  let visualCredit = 'ILLUSTRATION · NOT TO SCALE'
  if (intro) {
    title = idx === 0 ? 'A universe of galaxies' : idx < 3 ? 'Our galaxy, the Milky Way' : 'Our solar system'
    context = idx < 3
      ? { location: idx === 0 ? 'THE UNIVERSE / GALAXIES' : 'THE UNIVERSE / THE MILKY WAY', fact: 'The Milky Way is our home galaxy. The Sun is one of its many stars.', source: 'https://science.nasa.gov/universe/galaxies/' }
      : { location: 'THE MILKY WAY / SOLAR SYSTEM', fact: 'Eight planets orbit the Sun. This solar system view is schematic, not to scale.', source: 'https://science.nasa.gov/solar-system/' }
    visualCredit = idx < 2 ? 'AI-GENERATED GALAXY ILLUSTRATION' : 'SCHEMATIC · NOT TO SCALE'
  } else if (worldOverview) {
    const moon = beat.sceneId === '1.1'
    title = moon ? 'Our Moon' : 'Mars, the red planet'
    context = moon
      ? { location: 'SOLAR SYSTEM / THE MOON', fact: 'The Moon has an extremely thin exosphere and strong day-to-night temperature changes.', source: 'https://science.nasa.gov/moon/facts/' }
      : { location: 'SOLAR SYSTEM / MARS', fact: 'Mars has a thin atmosphere made mostly of carbon dioxide.', source: 'https://science.nasa.gov/mars/facts/' }
    visualCredit = moon ? 'NASA LRO/LOLA · GLOBAL MAP' : 'NASA MARS TEXTURE · GLOBE ILLUSTRATION'
  } else if (beat.sceneId === '0.2') visualCredit = 'NASA EARTH RELIEF · ELEVATION COLORS'
  else if (beat.sceneId === '1.1') visualCredit = 'LANDING CONFIGURATION · ILLUSTRATION'
  else if (beat.sceneId.startsWith('6.')) visualCredit = 'GLOBAL MAPS · EARTH RELIEF COLORS · NOT TO SCALE'
  if (route) visualCredit = 'GLOBAL MAPS · TRANSIT ILLUSTRATION, NOT TO SCALE'
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
        </article> : <SceneText key={beat.id} beat={beat} title={title} text={screens[idx] || ''} hideDetails={worldOverview || (intro && idx < 3)} onOpenDetails={onOpenDetails} />}
        {beat.sceneId === '6.2' && <div className="ending-actions"><button onClick={onReplay}>↺ Replay the journey</button><button onClick={() => { onOpenDetails?.(); setInventoryOpen(true) }}>Explore the archive ↗</button></div>}
        {!beat.sceneId.startsWith('6.') && (!intro || idx >= 3) && <button className="model-open" onClick={onExploreModel}>◌ &nbsp; Explore in 3D <span>↗</span></button>}
        {context && <div className="scene-fact"><p>{context.fact}</p><div className="scene-source"><span>{visualCredit}</span><a href={context.source} target="_blank" rel="noreferrer">NASA source ↗</a></div></div>}
      </div>
      {route && <div className="travel-label">IN TRANSIT &nbsp; / &nbsp; {route === 'earth-moon' ? 'EARTH → MOON' : 'MOON → MARS'} <span>NOT TO SCALE</span></div>}
      <div className="sr-only" aria-live="polite"><h2>{title}</h2><p>{screens[idx]}</p></div>
    </section>
    {inventoryOpen && <div className="inventory-modal" role="dialog" aria-modal="true" aria-label="The full inventory">
      <div className="inventory-window"><button className="inventory-close" autoFocus onClick={() => setInventoryOpen(false)} aria-label="Close inventory">✕</button>
        <InventoryTable onSelectScene={(id) => { setInventoryOpen(false); onScrollToScene?.(id) }} />
      </div>
    </div>}
  </>
}
