import React from 'react'
import { HeartPulse, Thermometer, ShieldAlert } from 'lucide-react'

export const VitalSigns: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-cyan-400" />
          Mars Interior Vital Signs
        </span>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
          InSight 2018–2022
        </span>
      </div>

      <div className="space-y-2 font-mono text-xs">
        <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg flex items-start gap-2.5">
          <HeartPulse className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-200 text-[11px] uppercase">Pulse (Seismicity)</div>
            <div className="text-[10px] text-slate-400 leading-snug">
              SEIS detected 1,300+ marsquakes and wind vibrations (5–7 m/s). Measured crust thickness & core radius.
            </div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg flex items-start gap-2.5">
          <Thermometer className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-200 text-[11px] uppercase">Temperature (Heat Flow)</div>
            <div className="text-[10px] text-slate-400 leading-snug">
              HP³ heat probe burrowed into soil to measure planetary interior cooling rate from formation.
            </div>
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-lg flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-slate-200 text-[11px] uppercase">Reflexes (Meteorite Impacts)</div>
            <div className="text-[10px] text-slate-400 leading-snug">
              Correlated seismic acoustic signals with fresh impact craters photographed by Mars Reconnaissance Orbiter.
            </div>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        First thorough interior checkup since Mars formed 4.5 billion years ago. Located in Elysium Planitia, 600 km from Gale Crater.
      </p>
    </div>
  )
}

