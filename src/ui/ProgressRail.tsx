import React from 'react'
import { STOPS, stopAt } from '../contracts/beats'
import { useStore } from '../store'

interface ProgressRailProps {
  onScrollTo?: (t: number) => void
}

export const ProgressRail: React.FC<ProgressRailProps> = ({ onScrollTo }) => {
  const progress = useStore((s) => s.progress)
  const activeStop = stopAt(progress)
  const isFinalScene = progress >= 0.94

  const finalLabels: Record<string, string> = {
    'milky-way': 'Milky Way · 1 telescope',
    sun: 'Sun · —',
    'solar-system': 'Solar system · 2 probes leaving',
    'inner-planets': 'Inner planets · —',
    earth: 'Earth · the archive',
    moon: 'Moon · 6 objects',
    mars: 'Mars · 9 objects',
    anywhere: 'Anywhere · 4 objects',
  }

  const handleStopClick = (t0: number) => {
    if (onScrollTo) {
      onScrollTo(t0)
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: t0 * max, behavior: 'smooth' })
    }
  }

  return (
    <nav
      aria-label="Descent stops rail"
      className="fixed bottom-0 left-0 right-0 h-14 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 z-30 px-4 flex items-center justify-between select-none"
    >
      {/* Progress fill bar along the top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-800">
        <div
          className="h-full bg-cyan-400 transition-all duration-75 origin-left"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>

      <div className="w-full flex items-center justify-between max-w-7xl mx-auto gap-1">
        {STOPS.map((stop) => {
          const isActive = activeStop.id === stop.id
          const label = isFinalScene ? finalLabels[stop.id] || stop.label : stop.label

          return (
            <button
              key={stop.id}
              onClick={() => handleStopClick(stop.t0)}
              aria-current={isActive ? 'step' : undefined}
              className={`flex-1 flex flex-col items-center py-1 transition-all group cursor-pointer ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mb-1 transition-transform ${
                  isActive ? 'bg-cyan-400 ring-4 ring-cyan-500/30 scale-125' : 'bg-slate-400 group-hover:bg-slate-200'
                }`}
              />
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-200 truncate max-w-[90px] md:max-w-none">
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
