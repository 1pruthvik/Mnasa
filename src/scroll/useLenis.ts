import { useEffect } from 'react'
import { useStore } from '../store'

// Native scroll is the single progress writer. Programmatic guided playback moves
// the same document, so the canvas and the narrative always share one timeline.
export function useLenis(enabled: boolean) {
  const setProgress = useStore((s) => s.setProgress)
  useEffect(() => {
    if (!enabled) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [enabled, setProgress])
}
