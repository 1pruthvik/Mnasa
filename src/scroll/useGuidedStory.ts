import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BEATS } from '../contracts/beats'
import { SCENES } from '../data/scenes'
import { advanceGuidedFrame, TRANSITION_MS, type GuidedStep } from './timeline'

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
  const [mode, setMode] = useState<'scroll' | 'playing' | 'paused' | 'finished'>('scroll')
  const [speed, setSpeed] = useState(1)
  const cursor = useRef(0)
  const elapsed = useRef(0)
  const last = useRef<number | null>(null)
  const setPosition = useCallback((p: number) => {
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
      const delta = last.current === null ? 0 : Math.min(now - last.current, 100) * speed
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
  }, [enabled, mode, setPosition, speed, steps])
  useEffect(() => {
    if (mode !== 'playing') return
    const takeOver = () => setMode('paused')
    const key = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key) && !(event.target instanceof HTMLButtonElement)) takeOver()
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
    if (index !== cursor.current) { cursor.current = index; elapsed.current = 0 }
    setMode('playing')
  }
  return { mode, speed, setSpeed, start, resume, pause: () => setMode('paused'), exit: () => setMode('scroll'), navigate, totalMinutes: Math.ceil(steps.reduce((n, s) => n + s.duration + TRANSITION_MS, 0) / 60000) }
}

// Store access outside React renders, also keeps the very first programmatic frame in sync.
import { useStore } from '../store'
function setStorePosition(p: number) { useStore.getState().setProgress(p) }
function getCurrentProgress() { return useStore.getState().progress }
