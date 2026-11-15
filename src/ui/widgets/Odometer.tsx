import React from 'react'
import { Gauge } from 'lucide-react'

export const Odometer: React.FC = () => {
  const traverses = [
    { mission: 'Apollo 15 (Scott & Irwin)', km: '27.8', time: '3 h 02 min', maxFromLm: '5.0 km' },
    { mission: 'Apollo 16 (Young & Duke)', km: '26.7', time: '3 h 26 min', maxFromLm: '4.5 km' },
    { mission: 'Apollo 17 (Cernan & Schmitt)', km: '35.9', time: '4 h 26 min', maxFromLm: '7.6 km' },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Lunar Roving Vehicle Odometer
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-300">Total: 90.4 km</span>
      </div>
      <div className="space-y-2">
        {traverses.map((t, idx) => (
          <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono font-medium text-slate-200">{t.mission}</div>
              <div className="text-[10px] font-mono text-slate-400">
                Drive: {t.time} &bull; Max radius: {t.maxFromLm}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono font-bold text-amber-300">{t.km}</span>
              <span className="text-[10px] font-mono text-slate-400 ml-1">km</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[10px] font-mono text-slate-400 leading-snug border-t border-slate-800/80 pt-2">
        Powered by two non-rechargeable 36 V silver-zinc batteries (121 Ah). The cars could never drive home.
      </p>
    </div>
  )
}

