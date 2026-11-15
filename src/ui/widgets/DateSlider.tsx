import React, { useState } from 'react'
import { Radio } from 'lucide-react'

export const DateSlider: React.FC = () => {
  const [year, setYear] = useState<number>(1977)

  const stations = [
    { name: 'Apollo 11 EASEP', start: 1969, end: 1969.6, isMirror: false },
    { name: 'Apollo 12 ALSEP', start: 1969.9, end: 1977.75, isMirror: false },
    { name: 'Apollo 14 ALSEP', start: 1971.1, end: 1977.75, isMirror: false },
    { name: 'Apollo 15 ALSEP', start: 1971.6, end: 1977.75, isMirror: false },
    { name: 'Apollo 16 ALSEP', start: 1972.3, end: 1977.75, isMirror: false },
    { name: 'Apollo 17 ALSEP', start: 1972.9, end: 1977.75, isMirror: false },
    { name: 'Lunar Retroreflectors (LRRR)', start: 1969, end: 9999, isMirror: true },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-md pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Lunar Surface Network Status
          </span>
        </div>
        <span className="text-sm font-mono font-bold text-amber-300">
          {year >= 1978 ? 'Post-1977' : `${year}`}
        </span>
      </div>

      <div className="mb-4">
        <input
          type="range"
          min="1969"
          max="1978"
          step="1"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
          <span>1969 (Eagle)</span>
          <span>1971 (Falcon)</span>
          <span>1977 (Shutdown)</span>
          <span>Today</span>
        </div>
      </div>

      <div className="space-y-1.5 font-mono text-xs">
        {stations.map((s, idx) => {
          const isLive = s.isMirror ? true : year >= Math.floor(s.start) && year <= Math.floor(s.end)
          return (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-800/40 text-[11px]">
              <span className="text-slate-300">{s.name}</span>
              {s.isMirror ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  PASSIVE &bull; ALWAYS OPERATIONAL
                </span>
              ) : (
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isLive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {isLive ? 'ACTIVE TELEMETRY' : 'SILENT (30 Sep 1977)'}
                </span>
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        On 30 September 1977, all powered lunar stations were shut down together from Earth. Only the passive laser retroreflectors remain operational.
      </p>
    </div>
  )
}
