import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'

export const TransitDemo: React.FC = () => {
  const [transitPos, setTransitPos] = useState<number>(50) // 0 to 100

  // Calculate brightness dip when planet is in front of star (30 to 70 range)
  const isTransiting = transitPos > 30 && transitPos < 70
  const dipAmount = isTransiting ? Math.sin(((transitPos - 30) / 40) * Math.PI) * 1.8 : 0
  const relativeBrightness = (100 - dipAmount).toFixed(2)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Kepler Transit Photometry
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-300">
          Flux: {relativeBrightness}%
        </span>
      </div>

      {/* Interactive Transit Visualizer */}
      <div className="h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden mb-3">
        {/* Star */}
        <div className="w-14 h-14 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50 flex items-center justify-center" />

        {/* Transiting Planet */}
        <div
          className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700 absolute shadow-sm"
          style={{
            left: `${transitPos}%`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      <div className="mb-2">
        <input
          type="range"
          min="0"
          max="100"
          value={transitPos}
          onChange={(e) => setTransitPos(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
          <span>Approach</span>
          <span>Transit Center (Dip)</span>
          <span>Egress</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] font-mono text-slate-300 leading-snug border-t border-slate-800/80 pt-2">
        This is how Kepler found 2,600 worlds: measuring the subtle periodic dip in starlight as an orbiting exoplanet transits across its host star.
      </p>
    </div>
  )
}

