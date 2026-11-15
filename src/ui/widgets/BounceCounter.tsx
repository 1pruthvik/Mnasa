import React from 'react'
import { Disc3 } from 'lucide-react'

export const BounceCounter: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Disc3 className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Pathfinder Airbag Descent Metrics
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Impact Speed</div>
          <div className="text-cyan-300 font-bold text-sm">14 m/s</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Total Bounces</div>
          <div className="text-amber-300 font-bold text-sm">~15 bounces</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Peak Bounce</div>
          <div className="text-cyan-300 font-bold text-sm">15 metres</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Bounce Duration</div>
          <div className="text-cyan-300 font-bold text-sm">2.5 minutes</div>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        4 large bags with 6 inner spheres each (5 m across) inflated 100 m above ground. Came to rest ~1 km from first impact point in Ares Vallis.
      </p>
    </div>
  )
}
