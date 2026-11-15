import { useEffect, useRef } from 'react'
import { useStore } from '../store'
import { STORYBOARD } from '../data/storyboard'

export function useGuidedDemo() {
  const demoState = useStore((s) => s.demoState)
  const demoSpeed = useStore((s) => s.demoSpeed)
  const demoShotIndex = useStore((s) => s.demoShotIndex)
  const pauseDemo = useStore((s) => s.pauseDemo)
  const nextDemoShot = useStore((s) => s.nextDemoShot)
  const setDemoRemainingHold = useStore((s) => s.setDemoRemainingHold)
  const finishDemo = useStore((s) => s.finishDemo)

  const isProgrammaticScrollRef = useRef(false)
  const programmaticTimeoutRef = useRef<number | null>(null)

  // Synchronize document scroll when demoShotIndex changes during playback
  useEffect(() => {
    if (demoState !== 'playing' && demoState !== 'paused') return

    const shot = STORYBOARD[demoShotIndex]
    if (!shot) return

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) return

    const targetY = shot.targetT * maxScroll

    // Flag programmatic scroll so user-intent listener doesn't falsely pause
    isProgrammaticScrollRef.current = true
    if (programmaticTimeoutRef.current) {
      window.clearTimeout(programmaticTimeoutRef.current)
    }

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })

    // Release programmatic flag after smooth scroll completes (~1.2s)
    programmaticTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false
    }, 1400)
  }, [demoShotIndex, demoState])

  // Guided demo countdown clock (1 second tick)
  useEffect(() => {
    if (demoState !== 'playing') return

    const mult = demoSpeed === 'slow' ? 1.4 : 1.0
    const interval = window.setInterval(() => {
      const current = useStore.getState().demoRemainingHold
      if (current > 1) {
        setDemoRemainingHold(current - 1)
      } else {
        // Hold duration finished — advance to next shot
        const curIdx = useStore.getState().demoShotIndex
        if (curIdx < STORYBOARD.length - 1) {
          nextDemoShot()
          const nextShot = STORYBOARD[curIdx + 1]
          setDemoRemainingHold(Math.round(nextShot.holdDuration * mult))
        } else {
          finishDemo()
        }
      }
    }, 1000)

    return () => window.clearInterval(interval)
  }, [demoState, demoSpeed, nextDemoShot, setDemoRemainingHold, finishDemo])

  // Detect genuine user input (wheel, touchmove, keydown arrow) and pause demo
  useEffect(() => {
    if (demoState !== 'playing') return

    const handleUserInteraction = (e: Event) => {
      if (isProgrammaticScrollRef.current) return

      // Don't intercept typing in inputs or dialogs
      const target = e.target as HTMLElement
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      pauseDemo()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isProgrammaticScrollRef.current) return
      // User manual arrow/page navigation pauses guided demo
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Space',
          'Home',
          'End',
        ].includes(e.code)
      ) {
        // Let spacebar toggle pause/resume separately
        if (e.code === 'Space') {
          e.preventDefault()
          if (useStore.getState().demoState === 'playing') {
            useStore.getState().pauseDemo()
          } else if (useStore.getState().demoState === 'paused') {
            useStore.getState().resumeDemo()
          }
          return
        }
        pauseDemo()
      }
    }

    // Tab visibility handling: pause when tab loses visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseDemo()
      }
    }

    window.addEventListener('wheel', handleUserInteraction, { passive: true })
    window.addEventListener('touchmove', handleUserInteraction, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('wheel', handleUserInteraction)
      window.removeEventListener('touchmove', handleUserInteraction)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [demoState, pauseDemo])
}
