import { useRef } from 'react'
import { useStore } from '../store'

/** The story's 3D view is directly draggable; vertical touch swipes still scroll. */
export function SceneOrbit() {
  const drag = useRef<{ x: number; y: number } | null>(null)
  const turn = useStore(s => s.turnScene)
  const zoom = useStore(s => s.zoomScene)
  const reset = useStore(s => s.resetSceneOrbit)
  return <>
    <div className="scene-orbit-surface" aria-hidden="true"
      onPointerDown={event => {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerMove={event => {
        if (!drag.current) return
        turn((event.clientX - drag.current.x) * .008, (event.clientY - drag.current.y) * .006)
        drag.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onLostPointerCapture={() => { drag.current = null }} />
    <div className="scene-orbit-controls" role="group" aria-label="3D scene controls">
      <span className="orbit-desktop-hint">Drag scene to rotate</span><span className="orbit-touch-hint">Swipe sideways to rotate</span>
      <button onClick={() => turn(-.3, 0)} aria-label="Orbit left">←</button>
      <button onClick={() => turn(0, -.2)} aria-label="Orbit up">↑</button>
      <button onClick={() => turn(0, .2)} aria-label="Orbit down">↓</button>
      <button onClick={() => turn(.3, 0)} aria-label="Orbit right">→</button>
      <button onClick={() => zoom(.8)} aria-label="Zoom in">+</button>
      <button onClick={() => zoom(1.25)} aria-label="Zoom out">−</button>
      <button onClick={reset}>Reset</button>
    </div>
  </>
}
