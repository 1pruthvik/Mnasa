import React, { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import { useStore } from '../../store'

export const MoonquakeWaveform: React.FC = () => {
  const reduced = useStore((s) => s.reducedMotion)
  const [offset, setOffset] = useState(reduced ? 100 : 0)

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setOffset(100), 200)
    return () => clearTimeout(timer)
  }, [reduced])

  // Synthetic seismograph waveform points representing the Apollo 12 ascent stage impact
  const points =
    '0,30 20,30 40,28 60,32 75,30 85,10 95,52 105,8 115,48 125,16 135,42 145,22 155,36 170,26 190,33 210,29 240,30 280,30'

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
          Seismic Record · Oceanus Procellarum
        </span>
      </div>
      <div className="w-full h-20 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-center p-2 relative overflow-hidden">
        <svg viewBox="0 0 280 60" className="w-full h-full stroke-cyan-400 fill-none stroke-[1.5]">
          {/* Baseline */}
          <line x1="0" y1="30" x2="280" y2="30" stroke="rgba(100, 116, 139, 0.3)" strokeDasharray="2,2" />
          <polyline
            points={points}
            strokeDasharray="400"
            strokeDashoffset={400 - (offset / 100) * 400}
            style={{ transition: 'stroke-dashoffset 1.4s ease-out' }}
          />
        </svg>
      </div>
      <p className="mt-2 text-[10px] font-mono text-slate-400 leading-relaxed">
        A record of an artificial impact, not an audio recording.
        <span className="block text-slate-500 mt-0.5">
          Apollo 12 ascent stage intentionally impacted at 3.94° S, 338.80° E (~60 km away).
        </span>
      </p>
    </div>
  )
}
