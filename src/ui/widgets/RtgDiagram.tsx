import React from 'react'
import { Zap } from 'lucide-react'

export const RtgDiagram: React.FC = () => {
  const parts = [
    { name: 'Pu-238 Fuel Capsule', spec: '~4 kg rod · half-life 89.6 y' },
    { name: 'Inner Thermal Core', spec: 'Cylinder 46 cm height' },
    { name: '442 Thermocouples', spec: 'Lead-telluride spring-loaded couples' },
    { name: '8 Radiating Fins', spec: '40 cm tip-to-tip diameter' },
    { name: 'Power Output', spec: '~70 W at 16 V (63.5 W after 1 year)' },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          SNAP-27 Nuclear Generator (RTG)
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-xs">
        {parts.map((p, idx) => (
          <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/40 text-[11px]">
            <span className="text-slate-300">{p.name}</span>
            <span className="text-cyan-300 font-semibold">{p.spec}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-snug">
        Heat from plutonium decay crossed the thermocouples into electric current. Ran seven scientific experiments for 6+ years.
      </p>
    </div>
  )
}

