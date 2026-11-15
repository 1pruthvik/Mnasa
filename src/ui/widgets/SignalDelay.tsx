import React from 'react'
import { RadioTower } from 'lucide-react'

export const SignalDelay: React.FC = () => {
  // NASA documented last measurement: 23 Jan 2003 at 12.23 billion km (11 h 20 min travel time)
  // Distance estimate computed at escape velocity 51,682 km/h
  const nasaLastSignalDate = '23 January 2003'
  const nasaLastTime = '11 h 20 min'
  const nasaLastDist = '12.23 Billion km (~81.7 AU)'

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <RadioTower className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Pioneer 10 Signal Delay
        </span>
      </div>

      <div className="space-y-2.5 font-mono text-xs">
        {/* Documented NASA measurement */}
        <div className="bg-slate-950/80 border border-cyan-500/40 p-3 rounded-lg">
          <div className="text-[10px] text-cyan-400 uppercase font-semibold">
            NASA Last Signal ({nasaLastSignalDate})
          </div>
          <div className="text-xl font-bold text-white mt-0.5">{nasaLastTime}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Recorded Distance: {nasaLastDist}</div>
        </div>

        {/* Labelled extrapolation */}
        <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Estimated Today (Extrapolation)</div>
          <div className="text-sm font-bold text-amber-300 mt-0.5">≈ 18 h 45 min light travel</div>
          <div className="text-[9px] text-slate-500 mt-1 leading-tight">
            our estimate at today’s distance — NASA’s last measurement was 11 h 20 min.
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        Travelling outward at 51,682 km/h into interstellar space toward the star Aldebaran, which it will pass in about two million years.
      </p>
    </div>
  )
}
