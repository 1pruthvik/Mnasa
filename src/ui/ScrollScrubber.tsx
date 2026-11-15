// src/ui/ScrollScrubber.tsx
import { BEATS } from '../contracts/beats'
import { useStore } from '../store'

interface ScrollScrubberProps {
  onSeek: (progress: number) => void
}

export default function ScrollScrubber({ onSeek }: ScrollScrubberProps) {
  const activeBeatId = useStore(s => s.activeBeatId)

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      {BEATS.map((beat) => {
        const isActive = activeBeatId === beat.id
        return (
          <button
            key={beat.id}
            onClick={() => onSeek(beat.t0 + 0.005)}
            title={`${beat.fullLabel} (${(beat.t0 * 100).toFixed(0)}%)`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0',
              fontFamily: 'monospace',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: isActive ? '#ffcc00' : 'rgba(223, 233, 255, 0.4)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.2s ease',
                pointerEvents: 'none',
              }}
            >
              {beat.label}
            </span>
            <span
              style={{
                width: isActive ? '12px' : '6px',
                height: isActive ? '12px' : '6px',
                borderRadius: '50%',
                background: isActive ? '#ffcc00' : 'rgba(223, 233, 255, 0.3)',
                boxShadow: isActive ? '0 0 8px #ffcc00' : 'none',
                transition: 'all 0.2s ease',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
