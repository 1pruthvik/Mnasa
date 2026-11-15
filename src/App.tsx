// src/App.tsx
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { useStore } from './store'
import { TOTAL_SCREENS, beatAt, stopAt, BEATS } from './contracts/beats'
import { detectCapability } from './three/systems/capability'
import CanvasRoot from './three/CanvasRoot'
import NasaDataDrawer from './ui/NasaDataDrawer'
import FactDrawer from './ui/FactDrawer'
import ScrollScrubber from './ui/ScrollScrubber'

export function App() {
  const progress = useStore(s => s.progress)
  const activeBeatId = useStore(s => s.activeBeatId)
  const activeChapter = useStore(s => s.activeChapter)
  const activeStop = useStore(s => s.activeStop)
  const labelPositions = useStore(s => s.labelPositions)
  const labelsOn = useStore(s => s.labelsOn)
  const filterWorkingOnly = useStore(s => s.filterWorkingOnly)
  const setFilterWorkingOnly = useStore(s => s.setFilterWorkingOnly)
  const [dataDrawerOpen, setDataDrawerOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // 1. Detect device capability once on boot
  useEffect(() => {
    detectCapability()
  }, [])

  // 2. Initialize smooth scroll engine with Lenis (38 screens height = 3800vh)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis

    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        const p = Math.min(1, Math.max(0, scrollY / maxScroll))
        useStore.getState().setProgress(p)
      }
    }

    lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  const handleSeek = (targetProgress: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const targetY = targetProgress * maxScroll
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.5 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  const handleJumpToScene = (sceneId: string) => {
    const beat = BEATS.find(b => b.sceneId === sceneId)
    if (beat) {
      handleSeek(beat.t0 + 0.005)
    }
  }

  const currentBeat = beatAt(progress)
  const currentStop = stopAt(progress)

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: `${TOTAL_SCREENS * 100}vh`, background: '#05070d' }}>
      {/* ── 3D Viewport: Single CanvasRoot (fixed position) ── */}
      <CanvasRoot />

      {/* ── Active Spacecraft Fact Drawer (floating on-screen) ── */}
      <FactDrawer />

      {/* ── Timeline Scroll Scrubber (vertical dots on right) ── */}
      <ScrollScrubber onSeek={handleSeek} />

      {/* ── NASA Data & Resources Slide-out Drawer ── */}
      <NasaDataDrawer
        isOpen={dataDrawerOpen}
        onClose={() => setDataDrawerOpen(false)}
        onJumpToScene={handleJumpToScene}
      />

      {/* ── Floating 2D Screen Anchored Labels Bridge (from LabelBridge / projectToScreen) ── */}
      {labelsOn && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {Object.entries(labelPositions).map(([id, pos]) => {
            if (!pos.visible) return null
            return (
              <div
                key={id}
                style={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  transform: 'translate(-50%, -100%)',
                  padding: '4px 8px',
                  background: 'rgba(5, 7, 13, 0.75)',
                  border: '1px solid rgba(223, 233, 255, 0.25)',
                  borderRadius: '2px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: '#dfe9ff',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(4px)',
                  transition: 'opacity 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffcc00' }} />
                  {id}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Minimalist HUD: Telemetry & Navigation Overlay ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none',
          zIndex: 20,
          fontFamily: 'monospace',
          color: '#dfe9ff',
        }}
      >
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Abandoned but Not Forgotten
          </div>
          <div style={{ fontSize: '11px', color: '#8899aa', marginTop: '4px', letterSpacing: '0.06em' }}>
            NASA SPACE APPS 2026 · {currentStop.label.toUpperCase()} · {currentBeat.label}
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
            <button
              onClick={() => setDataDrawerOpen(true)}
              style={{
                background: 'rgba(255, 204, 0, 0.15)',
                border: '1px solid rgba(255, 204, 0, 0.4)',
                color: '#ffcc00',
                padding: '4px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '11px',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              ★ NASA DATA & ARCHIVE
            </button>
            <span style={{ fontSize: '12px', letterSpacing: '0.08em' }}>{activeChapter}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#8899aa' }}>
            ALTITUDE SCROLL: {(progress * 100).toFixed(1)}% · BEAT {activeBeatId}
          </div>
        </div>
      </header>

      {/* ── Bottom Controls: Working Only Toggle & Coordinates ── */}
      <footer
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
          zIndex: 20,
          fontFamily: 'monospace',
          fontSize: '11px',
          color: '#8899aa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setFilterWorkingOnly(!filterWorkingOnly)}
            style={{
              background: filterWorkingOnly ? 'rgba(255, 204, 0, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              border: `1px solid ${filterWorkingOnly ? '#ffcc00' : 'rgba(255, 255, 255, 0.15)'}`,
              color: filterWorkingOnly ? '#ffcc00' : '#dfe9ff',
              padding: '6px 12px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '11px',
              letterSpacing: '0.05em',
            }}
          >
            {filterWorkingOnly ? '● PASSIVE RETROREFLECTORS ONLY' : '○ SHOW RETIRED HARDWARE'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '16px', letterSpacing: '0.06em' }}>
          <span>STOP: {activeStop.toUpperCase()}</span>
          <span>SCROLL OR USE RIGHT RAIL TO NAVIGATE</span>
        </div>
      </footer>
    </div>
  )
}

export default App
