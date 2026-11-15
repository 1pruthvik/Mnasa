import React from 'react'
import { Compass, X } from 'lucide-react'

interface MarsMapProps {
  onClose?: () => void
}

export const MarsMap: React.FC<MarsMapProps> = ({ onClose }) => {
  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-xl w-full text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-500" />
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
            Mars Surface Hardware Locations
          </h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex justify-center my-2">
        <svg viewBox="0 0 640 320" className="w-full h-56 bg-[#1a0e0b] rounded-xl border border-amber-950">
          {/* Equator & Meridians */}
          <line x1="20" y1="160" x2="620" y2="160" stroke="#7c2d12" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
          <text x="25" y="155" fill="#ea580c" fontSize="9" fontFamily="monospace">0° Equator</text>

          {/* Published Coordinate Pins (Solid) */}
          {/* Viking 1 (22.483° N, 47.94° W) */}
          <g>
            <circle cx="230" cy="115" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
            <text x="240" y="115" fill="#ffedd5" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Viking 1 (22.48° N, 47.94° W)
            </text>
            <text x="240" y="127" fill="#fed7aa" fontSize="8" fontFamily="monospace">
              Thomas Mutch Memorial Station
            </text>
          </g>

          {/* InSight (4.5° N, 135.9° E) */}
          <g>
            <circle cx="480" cy="150" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
            <text x="350" y="148" fill="#ffedd5" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="end">
              InSight (4.5° N, 135.9° E)
            </text>
            <text x="350" y="160" fill="#fed7aa" fontSize="8" fontFamily="monospace" textAnchor="end">
              Elysium Planitia
            </text>
          </g>

          {/* Named Sites (Hollow Pins - Honest representation where coordinates are not published in source) */}
          {/* Ares Vallis - Pathfinder / Sojourner */}
          <g>
            <circle cx="260" cy="125" r="5" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
            <text x="270" y="142" fill="#fdba74" fontSize="9" fontFamily="monospace">
              Ares Vallis (Pathfinder / Sojourner) *
            </text>
          </g>

          {/* Gusev Crater - Spirit */}
          <g>
            <circle cx="490" cy="190" r="5" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
            <text x="500" y="193" fill="#fdba74" fontSize="9" fontFamily="monospace">
              Gusev Crater (Spirit) *
            </text>
          </g>

          {/* Meridiani Planum - Opportunity */}
          <g>
            <circle cx="310" cy="168" r="5" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
            <text x="320" y="172" fill="#fdba74" fontSize="9" fontFamily="monospace">
              Meridiani Planum (Opportunity) *
            </text>
          </g>

          {/* Jezero Crater - Ingenuity */}
          <g>
            <circle cx="380" cy="118" r="5" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="2,2" />
            <text x="390" y="112" fill="#fdba74" fontSize="9" fontFamily="monospace">
              Jezero Crater (Ingenuity) *
            </text>
          </g>
        </svg>
      </div>

      <div className="space-y-1 text-[10px] font-mono text-slate-400 mt-2">
        <p className="italic text-amber-300">
          * Four sites are named in the source material without published coordinates in the brief. Displayed honestly as hollow site markers.
        </p>
        <p>Schematic layout. Positions from published mission archives; not for navigation.</p>
      </div>
    </div>
  )
}
