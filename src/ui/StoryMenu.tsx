import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useStore } from '../store'

interface Props {
  onPlay: () => void
  onHome: () => void
  onMap: () => void
  onCredits: () => void
  onOpen: () => void
}
export function StoryMenu({ onPlay, onHome, onMap, onCredits, onOpen }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const toggleReadingMode = useStore(s => s.toggleReadingMode)
  useEffect(() => {
    if (!open) return
    const outside = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])
  const action = (fn: () => void) => { setOpen(false); fn() }
  return <div className="story-menu" ref={ref}>
    <button className="menu-trigger" aria-expanded={open} aria-controls="story-menu-options" onClick={() => { if (!open) onOpen(); setOpen(!open) }}>{open ? <X size={16} /> : <Menu size={16} />} <span>Menu</span></button>
    {open && <div className="menu-options" id="story-menu-options">
      <span>EXPLORE</span>
      <button onClick={() => action(onPlay)}>Play guided story <span>↗</span></button>
      <button onClick={() => action(onMap)}>Moon & Mars maps <span>↗</span></button>
      <button onClick={() => action(toggleReadingMode)}>Reading mode <span>↗</span></button>
      <button onClick={() => action(onCredits)}>Sources & credits <span>↗</span></button>
      <button onClick={() => action(onHome)}>Return to beginning <span>↗</span></button>
    </div>}
  </div>
}
