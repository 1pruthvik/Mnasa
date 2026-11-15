import React from 'react'
import { Ruler, User } from 'lucide-react'

export const FootpadScale: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Ruler className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Lunar Module Footpad Scale
        </span>
      </div>

      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex items-center justify-between mb-3 relative overflow-hidden">
        {/* Human Silhouette comparison */}
        <div className="flex flex-col items-center z-10">
          <User className="w-6 h-6 text-slate-400" />
          <span className="text-[10px] font-mono text-slate-400 mt-1">Astronaut (~1.8 m)</span>
        </div>

        {/* 9.4m dimension span graphic */}
        <div className="flex-1 flex flex-col items-center px-4">
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-amber-300 font-bold mb-1">
            <span>&larr;</span>
            <span>9.4 m opposite span</span>
            <span>&rarr;</span>
          </div>
          <div className="w-full h-1 bg-amber-400/50 rounded-full" />
          <span className="text-[9px] font-mono text-slate-500 mt-1">4 round footpads (0.9 m diameter)</span>
        </div>
      </div>

      <p className="text-[10px] font-mono text-slate-400 leading-snug">
        Descent stage body: 4.2 m octagonal prism. Holds the engine 1.5 m above the regolith. Balanced deliberately in one-sixth gravity.
      </p>
    </div>
  )
}

