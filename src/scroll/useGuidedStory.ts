import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { advanceGuidedFrame, GUIDED_DEMO_MS, guidedTimeScale, type GuidedStep } from './timeline'

export function useGuidedStory(enabled: boolean) {
  const steps = useMemo<GuidedStep[]>(() => BEATS.flatMap((beat) => {
    const copy = SCENES[beat.sceneId]?.copy ?? ['']
    const screens = copy
    return screens.map((text, i) => ({
      progress: beat.t0 + (beat.t1 - beat.t0) * ((i + 0.5) / screens.length),
      duration: Math.max(7000, Math.min(24000, text.split(/\s+/).length / 170 * 60000 + 2500)),
      sceneId: beat.sceneId,
    }))
  }), [])
  const timeScale = useMemo(() => guidedTimeScale(steps), [steps])
  const lastPosition = useRef<number | null>(null)
  const [mode, setMode] = useState<'scroll' | 'playing' | 'paused' | 'finished'>('scroll')
  const [speed, setSpeed] = useState(1)
  const cursor = useRef(0)
  const elapsed = useRef(0)
  const last = useRef<number | null>(null)
  const setPosition = useCallback((p: number) => {
    lastPosition.current = p
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: Math.max(0, max) * p, behavior: 'instant' })
    setStorePosition(p)
  }, [])
  const start = useCallback(() => {
    cursor.current = 0
    elapsed.current = 0
    last.current = null
    setPosition(steps[0].progress)
    setMode('playing')
  }, [setPosition, steps])
  const navigate = useCallback((direction: number) => {
    const p = getCurrentProgress()
    const currentScene = BEATS.findIndex(b => p >= b.t0 && (p < b.t1 || b.t1 === 1))
    const target = BEATS[Math.max(0, Math.min(BEATS.length - 1, currentScene + direction))]
    const index = steps.findIndex(step => step.sceneId === target.sceneId)
    cursor.current = Math.max(0, index)
    setMode(current => current === 'finished' ? 'paused' : current)
    elapsed.current = 0
    last.current = null
    setPosition(steps[cursor.current].progress)
  }, [setPosition, steps])
  useEffect(() => {
    if (!enabled) setMode('scroll')
  }, [enabled])
  useEffect(() => {
    if (mode !== 'playing' || !enabled) return
    let raf = 0
    const tick = (now: number) => {
      const delta = last.current === null ? 0 : Math.max(now - last.current, 0) * speed * timeScale
      last.current = now
      const frame = advanceGuidedFrame(steps, cursor.current, elapsed.current, delta)
      cursor.current = frame.index
      elapsed.current = frame.elapsed
      setPosition(frame.progress)
      if (frame.finished) {
        setMode('finished')
        last.current = null
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); last.current = null }
  }, [enabled, mode, setPosition, speed, steps, timeScale])
  useEffect(() => {
    if (mode !== 'playing') return
    const takeOver = (event?: Event) => {
      // Player controls (especially the speed selector on touch devices) must not
      // be mistaken for a user's attempt to take over scrolling.
      if (event?.type === 'touchstart' && event.target instanceof Element && event.target.closest('.player, .scene-orbit-surface, .scene-orbit-controls')) return
      setMode('paused')
    }
    const key = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key) && !(event.target instanceof Element && event.target.closest('button, select, input, textarea, a, summary'))) takeOver()
    }
    const hidden = () => { if (document.hidden) takeOver() }
    window.addEventListener('wheel', takeOver, { passive: true })
    window.addEventListener('touchstart', takeOver, { passive: true })
    window.addEventListener('keydown', key)
    document.addEventListener('visibilitychange', hidden)
    return () => {
      window.removeEventListener('wheel', takeOver)
      window.removeEventListener('touchstart', takeOver)
      window.removeEventListener('keydown', key)
      document.removeEventListener('visibilitychange', hidden)
    }
  }, [mode])
  const resume = () => {
    // Resume from the paragraph closest to the user's current position.
    const p = getCurrentProgress()
    let index = 0
    for (let i = 1; i < steps.length; i++) if (Math.abs(steps[i].progress - p) < Math.abs(steps[index].progress - p)) index = i
    // If paused mid-transition, continue from the exact moment unless the user scrolled elsewhere.
    const scrollRange = document.documentElement.scrollHeight - window.innerHeight
    const scrollTolerance = scrollRange > 0 ? 2 / scrollRange : 0.00001
    if (lastPosition.current === null || Math.abs(p - lastPosition.current) > scrollTolerance) { cursor.current = index; elapsed.current = 0 }
    setMode('playing')
  }
  return { mode, speed, setSpeed, start, resume, pause: () => setMode('paused'), exit: () => setMode('scroll'), navigate, totalMinutes: GUIDED_DEMO_MS / 60000 }
}

// Store access outside React renders, also keeps the very first programmatic frame in sync.
import { useStore } from '../store'
function setStorePosition(p: number) { useStore.getState().setProgress(p) }
function getCurrentProgress() { return useStore.getState().progress }
