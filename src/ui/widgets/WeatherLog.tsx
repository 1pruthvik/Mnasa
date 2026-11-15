import React, { useState } from 'react'
import { CloudSun, AlertTriangle } from 'lucide-react'

export const WeatherLog: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1982)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Viking 1 Weather Monitor
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-amber-300">
          {selectedYear >= 1982 ? 'Thomas Mutch Station' : 'Viking 1 Lander'}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
          <span>Mission Year:</span>
          <span className="font-bold text-cyan-400">{selectedYear}</span>
        </div>
        <input
          type="range"
          min="1976"
          max="1982"
          step="1"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
          <span>1976 (Touchdown)</span>
          <span>1979 (Extended)</span>
          <span>11 Nov 1982 (Fault)</span>
        </div>
      </div>

      <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-slate-400">Total Weather Reports:</span>
          <span className="text-white font-bold">
            {selectedYear === 1982 ? '2,245 [INTERRUPTED]' : `${(selectedYear - 1975) * 360}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Recorded Temperatures:</span>
          <span className="text-cyan-300">-86 °C (dawn) to -33 °C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Seismometer:</span>
          <span className="text-slate-500">Inoperable on surface</span>
        </div>
      </div>

      {selectedYear === 1982 && (
        <div className="mt-3 p-2 rounded bg-amber-950/50 border border-amber-800/80 text-amber-200 text-[11px] font-mono flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            11 Nov 1982: A faulty uplink command from Earth interrupted antenna pointing. The machine was silenced by a typo from home.
          </span>
        </div>
      )}
    </div>
  )
}
