import Lenis from 'lenis'
import { useEffect } from 'react'
import { useStore } from '../store'

export function useLenis(enabled: boolean) {
  const setProgress = useStore((s) => s.setProgress)

  useEffect(() => {
    if (!enabled) {
      // Passive native scroll fallback
      const onNativeScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? window.scrollY / max : 0)
      }
      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()
      return () => window.removeEventListener('scroll', onNativeScroll)
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false, // native touch scroll feels better on iOS
      autoRaf: false,  // driven with our own rAF loop
    })

    let raf = 0
    let running = true

    const loop = (time: number) => {
      if (!running) return
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Single source of progress
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? lenis.scroll / max : 0)
    }
    lenis.on('scroll', onScroll)
    onScroll()

    const onVis = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        raf = requestAnimationFrame(loop)
      } else {
        cancelAnimationFrame(raf)
        lenis.stop()
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [enabled, setProgress])
}
