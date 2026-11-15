import React, { useState } from 'react'
import { ArrowDownCircle } from 'lucide-react'

export const DescentLadder: React.FC = () => {
  const [activeRung, setActiveRung] = useState<number>(4)

  const rungs = [
    { alt: '50 km', date: '30 Apr 2000', note: 'Initial operational circular orbit' },
    { alt: '19 km', date: '13 Jul 2000', note: 'Close mapping orbit of asteroid surface' },
    { alt: '5.3 km', date: '26 Oct 2000', note: 'Close flyby pass' },
    { alt: '5–6 km', date: 'Late 2000', note: 'Low circular survey passes' },
    { alt: 'Touchdown', date: '12 Feb 2001 · 19:44 UT', note: 'Gentle touchdown at 6.4 km/h (4 mph); 69 photos on way down' },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <ArrowDownCircle className="w-4 h-4 text-cyan-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          NEAR Shoemaker Descent Ladder
        </span>
      </div>

      <div className="space-y-1.5 font-mono text-xs">
        {rungs.map((r, idx) => (
          <button
            key={idx}
            onClick={() => setActiveRung(idx)}
            className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer flex justify-between items-center ${
              activeRung === idx
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                : 'bg-slate-950/50 border-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div>
              <span className="font-bold text-white text-[11px] block">{r.alt}</span>
              <span className="text-[10px] text-slate-400">{r.date}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-amber-400">
              {idx === 4 ? 'SURFACE' : 'ORBIT'}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300">
        {rungs[activeRung].note}
      </div>

      <p className="mt-2 text-[10px] font-mono text-slate-400 leading-snug">
        First human-made object to touch down on an asteroid. Survived landing and returned science data for two bonus weeks until freezing at −173 °C.
      </p>
    </div>
  )
}
