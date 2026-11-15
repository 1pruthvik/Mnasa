import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { AtlasGlobe, type World } from '../three/env/AtlasGlobe'
import { IllustrationModel } from '../three/objects/NasaModel'

const items = {
  earth: { name: 'Earth', note: 'NASA global relief map, shown in elevation colors. Not a live view or natural-color image.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures/Earth%20(A)' },
  moon: { name: 'Moon', note: 'NASA LRO imagery and LOLA data, processed for visualization; not a landing-site terrain model.', source: 'https://svs.gsfc.nasa.gov/4720/' },
  mars: { name: 'Mars', note: 'NASA global map on an illustrative sphere; not live weather or site-level terrain.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures/Mars' },
  venus: { name: 'Venus surface', note: 'NASA radar-based surface visualization with color added. Venus is normally hidden beneath thick clouds.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures/Venus' },
  jupiter: { name: 'Jupiter', note: 'NASA global cloud map on an illustrative sphere. Jupiter has no solid surface like Earth; this is not live weather.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/Images%20and%20Textures/Jupiter' },
  sun: { name: 'Sun', note: 'A schematic glowing sphere, not an observational solar surface map or live view.', source: 'https://science.nasa.gov/sun/' },
  apollo: { name: 'Apollo lunar module', model: 'apollo-lunar-module', note: 'NASA model of the lunar module. A representation, not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Apollo%20Lunar%20Module' },
  viking: { name: 'Viking lander', model: 'viking-lander', note: 'NASA spacecraft model. A representation, not a survey of its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Viking%20Lander' },
  pathfinder: { name: 'Pathfinder and Sojourner', model: 'pathfinder-sojourner', note: 'Illustrative model by Space Radar, built from published dimensions and reference photographs. Details are simplified; not a live view or a reconstruction of current condition.', source: 'https://github.com/Sara-Managed-Projects/space-radar/blob/main/CREDITS.md#3b-r14-m8-four-landers-built-from-dimensions--luna-16-mars-pathfinder-and-sojourner-phoenix-mars-3-2026-10-27' },
  opportunity: { name: 'Opportunity rover', model: 'opportunity', note: 'NASA low-poly rover model. Not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  insight: { name: 'InSight lander', model: 'insight', note: 'NASA spacecraft model. Not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  ingenuity: { name: 'Ingenuity helicopter', model: 'ingenuity', note: 'NASA spacecraft model. Not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  dawn: { name: 'Dawn spacecraft', model: 'dawn', note: 'NASA spacecraft model. Not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  near: { name: 'NEAR Shoemaker', model: 'near-shoemaker', note: 'NASA spacecraft model. Not its present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  pioneer: { name: 'Pioneer 10', model: 'pioneer-10', note: 'NASA spacecraft model. Not a live position or present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
  kepler: { name: 'Kepler', model: 'kepler', note: 'NASA spacecraft model. Not a live position or present condition.', source: 'https://github.com/nasa/NASA-3D-Resources' },
} as const
export type ExplorerItem = keyof typeof items
export function itemForScene(scene: string, overview: boolean): ExplorerItem {
  if (scene === '0.2') return 'earth'
  if (scene.startsWith('1.')) return scene === '1.1' && !overview ? 'apollo' : 'moon'
  if (scene === '2.1') return overview ? 'mars' : 'viking'
  return ({ '0.1': 'sun', '2.2': 'pathfinder', '3.1': 'opportunity', '3.2': 'insight', '3.3': 'ingenuity', '4.1': 'dawn', '4.2': 'near', '5.1': 'pioneer', '5.2': 'kepler' } as Record<string, ExplorerItem>)[scene] || 'moon'
}

const initialRotation = (item: ExplorerItem) => item === 'pathfinder' ? { x: .38, y: -.55 } : { x: 0, y: 0 }

export function ModelExplorer({ initial, onClose }: { initial: ExplorerItem; onClose: () => void }) {
  const [item, setItem] = useState<ExplorerItem>(initial)
  const [rotation, setRotation] = useState(() => initialRotation(initial))
  const drag = useRef<{ x: number; y: number } | null>(null)
  const close = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const entry = items[item]
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    close.current?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const controls = dialog.current?.querySelectorAll<HTMLElement>('button, select, a[href]')
      if (!controls?.length) return
      const first = controls[0], last = controls[controls.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); previous?.focus() }
  }, [onClose])
  const turn = (x: number, y: number) => setRotation(r => ({ x: THREE.MathUtils.clamp(r.x + x, -1.4, 1.4), y: r.y + y }))
  return <div className="explorer-backdrop" onWheel={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="explorer-title">
    <div className="explorer-window" ref={dialog}>
      <header className="explorer-header"><div><span>THE QUIET EXPLORERS / INTERACTIVE ATLAS</span><h2 id="explorer-title">Explore in 3D</h2></div><button ref={close} onClick={onClose} aria-label="Close 3D explorer">✕</button></header>
      <div className="explorer-content">
        <div className="explorer-stage" aria-label={`3D view of ${entry.name}. Drag to rotate or use rotation buttons.`}
          onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY } }}
          onPointerMove={e => { if (!drag.current) return; turn((e.clientY - drag.current.y) * .01, (e.clientX - drag.current.x) * .01); drag.current = { x: e.clientX, y: e.clientY } }}
          onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
          <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
            <ambientLight intensity={1.1} /><directionalLight position={[5, 6, 8]} intensity={2.5} />
            <Suspense fallback={null}><group rotation={[rotation.x, rotation.y, 0]}>
              {'model' in entry ? <IllustrationModel key={item} url={`/models/${entry.model}.glb`} size={item === 'pathfinder' ? 5.6 : 4} position={[0, 0, 0]} ground={false} fallback={null} /> : item === 'sun' ? <mesh><sphereGeometry args={[2.5, 64, 48]} /><meshBasicMaterial color="#ffb34c" /></mesh> : <AtlasGlobe world={item as World} radius={2.5} />}
            </group></Suspense>
          </Canvas>
          <div className="explorer-drag">DRAG TO ROTATE</div>
        </div>
        <div className="explorer-info"><label htmlFor="explorer-select">CHOOSE A SUBJECT</label><select id="explorer-select" value={item} onChange={e => { const next = e.target.value as ExplorerItem; setItem(next); setRotation(initialRotation(next)) }}>{Object.entries(items).map(([id, data]) => <option key={id} value={id}>{data.name}</option>)}</select>
          <h3>{entry.name}</h3><p>{entry.note}</p><a href={entry.source} target="_blank" rel="noreferrer">About the source ↗</a>
          <div className="explorer-rotate" aria-label="Rotate model"><button onClick={() => turn(0, -.35)} aria-label="Rotate left">←</button><button onClick={() => turn(-.35, 0)} aria-label="Rotate up">↑</button><button onClick={() => turn(.35, 0)} aria-label="Rotate down">↓</button><button onClick={() => turn(0, .35)} aria-label="Rotate right">→</button><button onClick={() => setRotation(initialRotation(item))}>Reset</button></div>
          <p className="explorer-caption">Drag with a mouse or finger, or use the rotation buttons. The story pauses while you explore.</p>
        </div>
      </div>
    </div>
  </div>
}
