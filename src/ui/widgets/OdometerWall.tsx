import React from 'react'
import { Trophy } from 'lucide-react'

export const OdometerWall: React.FC = () => {
  const rovers = [
    { name: 'Sojourner (1997)', km: '0.1 km', miles: '0.06 mi', width: '2%', status: 'Silent' },
    { name: 'Spirit (2004–2010)', km: '7.70 km', miles: '4.80 mi', width: '17%', status: 'Silent' },
    { name: 'Opportunity (2004–2018)', km: '45.16 km', miles: '28.06 mi', width: '99.8%', status: 'Silent · Record held 8+ yrs' },
    { name: 'Perseverance (Active)', km: '45.22 km', miles: '28.10 mi', width: '100%', status: 'Active · Surpassed 11 Oct 2026' },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Trophy className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Off-Earth Distance Records
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {rovers.map((r, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-baseline text-[11px] mb-1">
              <span className="text-slate-200 font-medium">{r.name}</span>
              <span className="text-cyan-300 font-bold">
                {r.km} <span className="text-[10px] text-slate-500">({r.miles})</span>
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  idx === 3
                    ? 'bg-gradient-to-r from-cyan-500 to-amber-400'
                    : idx === 2
                    ? 'bg-amber-400'
                    : 'bg-slate-600'
                }`}
                style={{ width: r.width }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{r.status}</div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] font-mono text-amber-300 border-t border-slate-800/80 pt-2 leading-snug">
        Opportunity held the off-Earth roving distance record for over 8 years until Perseverance surpassed it at 45.22 km on 11 October 2026.
      </p>
    </div>
  )
}
