import React from 'react'
import { Navigation } from 'lucide-react'

export const RangeComparison: React.FC = () => {
  const rovers = [
    { name: 'Sojourner (1997)', dist: '~100 m (0.1 km)', pct: 2 },
    { name: 'Spirit (2004–2010)', dist: '7.7 km (4.8 mi)', pct: 17 },
    { name: 'Opportunity (2004–2018)', dist: '45.16 km (28.06 mi)', pct: 100 },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Navigation className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Martian Roving Distance Scale
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {rovers.map((r, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-slate-300">{r.name}</span>
              <span className="text-cyan-300 font-bold">{r.dist}</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full ${
                  idx === 2 ? 'bg-amber-400' : idx === 1 ? 'bg-cyan-400' : 'bg-slate-500'
                }`}
                style={{ width: `${Math.max(r.pct, 3)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        Scale comparison showing how exploration range evolved from Sojourner’s 100 m perimeter to Opportunity’s 45 km marathon.
      </p>
    </div>
  )
}

