import { useRef } from 'react'
import { useStore } from '../store'

/** The story's 3D view is directly draggable; vertical touch swipes still scroll. */
export function SceneOrbit() {
  const drag = useRef<{ x: number; y: number } | null>(null)
  const turn = useStore(s => s.turnScene)
  const zoom = useStore(s => s.zoomScene)
  const reset = useStore(s => s.resetSceneOrbit)
  return <div className="scene-orbit-surface" role="group" tabIndex={0}
    aria-label="3D story scene. Use arrow keys to rotate, plus and minus to zoom, and Home to reset."
    onKeyDown={event => {
      switch (event.key) {
        case 'ArrowLeft': turn(-.3, 0); break
        case 'ArrowRight': turn(.3, 0); break
        case 'ArrowUp': turn(0, -.2); break
        case 'ArrowDown': turn(0, .2); break
        case '+': case '=': zoom(.8); break
        case '-': case '_': zoom(1.25); break
        case 'Home': reset(); break
        default: return
      }
      event.preventDefault()
      event.stopPropagation()
    }}
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
}
