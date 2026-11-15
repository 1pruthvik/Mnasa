import { useEffect, useRef } from 'react'
import { useStore } from '../store'

/** An explicit interaction layer leaves normal scrolling and story controls alone. */
export function SceneOrbit({ onClose }: { onClose: () => void }) {
  const drag = useRef<{ x: number; y: number } | null>(null)
  const firstButton = useRef<HTMLButtonElement>(null)
  useEffect(() => { firstButton.current?.focus() }, [])
  const turn = useStore(s => s.turnScene)
  const reset = useStore(s => s.resetSceneOrbit)
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [onClose])
  return <>
    <div className="scene-orbit-surface" aria-hidden="true"
      onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY } }}
      onPointerMove={event => {
        if (!drag.current) return
        turn((event.clientX - drag.current.x) * .008, (event.clientY - drag.current.y) * .006)
        drag.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} />
    <div className="scene-orbit-controls" role="group" aria-label="Rotate the story scene">
      <span>Drag to orbit</span>
      <button ref={firstButton} onClick={() => turn(-.3, 0)} aria-label="Orbit left">←</button>
      <button onClick={() => turn(0, -.2)} aria-label="Orbit up">↑</button>
      <button onClick={() => turn(0, .2)} aria-label="Orbit down">↓</button>
      <button onClick={() => turn(.3, 0)} aria-label="Orbit right">→</button>
      <button onClick={reset}>Reset</button>
      <button onClick={onClose}>Done</button>
    </div>
  </>
}
