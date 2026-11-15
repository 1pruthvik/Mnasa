import React, { useState } from 'react'
import { Info } from 'lucide-react'

export const PlaqueViewer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>('pulsars')

  const hotspots = {
    pulsars: {
      title: '14 Pulsar Rays',
      desc: 'Vectors radiating from our Sun to 14 pulsars, with binary codes specifying their rotation periods to pinpoint Earth in galactic space and time.',
    },
    humans: {
      title: 'Human Figures',
      desc: 'Drawing of a man and a woman in front of the spacecraft silhouette to communicate human scale and peaceful greeting.',
    },
    planets: {
      title: 'Solar System Trajectory',
      desc: 'Depicts the nine planets (with Saturn’s rings) and Pioneer 10 launching from the 3rd planet, swinging past Jupiter, and exiting outward.',
    },
    hydrogen: {
      title: 'Neutral Hydrogen Spin-Flip',
      desc: 'The fundamental atomic transition of hydrogen provides a universal unit of length (21 cm) and time (0.7 ns) for extraterrestrial decoders.',
    },
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <Info className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
          Pioneer 10 Gold Plaque
        </span>
      </div>

      {/* Schematic visual box */}
      <div className="bg-amber-950/20 border border-amber-500/40 rounded-lg p-3 text-center mb-3">
        <div className="text-xs font-mono font-bold text-amber-300">
          6 × 9 inch Gold-Anodized Aluminum Plaque
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
          Designed by Carl Sagan, Frank Drake, & Linda Salzman Sagan
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 font-mono text-xs mb-3">
        {Object.entries(hotspots).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setActiveHotspot(key)}
            className={`p-2 rounded text-left border transition-all cursor-pointer ${
              activeHotspot === key
                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-bold truncate">{item.title}</div>
          </button>
        ))}
      </div>

      <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg font-mono text-[11px] text-slate-300 leading-snug">
        <span className="text-amber-400 font-bold block mb-1">
          {hotspots[activeHotspot as keyof typeof hotspots].title}
        </span>
        {hotspots[activeHotspot as keyof typeof hotspots].desc}
      </div>
    </div>
  )
}
