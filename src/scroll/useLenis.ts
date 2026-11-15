import Lenis from 'lenis'
import { useEffect } from 'react'
import { useStore } from '../store'

export function useLenis(enabled: boolean) {
  const setProgress = useStore((s) => s.setProgress)

  useEffect(() => {
    const onNativeScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    if (!enabled) {
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()
      return () => window.removeEventListener('scroll', onNativeScroll)
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    const onScroll = (e: any) => {
      const p =
        typeof e?.progress === 'number'
          ? e.progress
          : e?.limit > 0
          ? e.scroll / e.limit
          : 0
      setProgress(Math.max(0, Math.min(1, p)))
    }

    lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    onNativeScroll()

    return () => {
      window.removeEventListener('scroll', onNativeScroll)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [enabled, setProgress])
}
