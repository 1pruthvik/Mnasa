import React from 'react'
import { OBJECTS } from '../data/objects'
import { useStore } from '../store'
import { Compass, X } from 'lucide-react'

interface LunarMapProps {
  onClose?: () => void
}

export const LunarMap: React.FC<LunarMapProps> = ({ onClose }) => {
  const progress = useStore((s) => s.progress)
  const readingMode = useStore((s) => s.readingMode)

  const lunarObjects = OBJECTS.filter((o) => {
    if (o.body !== 'Moon' || o.lat === undefined || o.lon === undefined) return false
    if (readingMode || progress >= 0.35) return true
    if (o.id === '1969-059C') return progress >= 0.17
    if (o.id === '1969-099C' || o.id === 'surveyor-3') return progress >= 0.22
    if (o.id === '1971-063C') return progress >= 0.27
    return true
  })

  // Map lat/lon to SVG 320x320 viewBox: cx=cy=160, k=1.25 px/degree
  const cx = 160
  const cy = 160
  const k = 1.25

  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-md w-full text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
            Lunar Near-Side Landing Sites
          </h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex justify-center my-2">
        <svg viewBox="0 0 320 320" className="w-72 h-72">
          {/* Lunar disk */}
          <circle cx="160" cy="160" r="140" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          {/* Maria sketches */}
          {/* Mare Tranquillitatis */}
          <path d="M 180 140 Q 210 150 200 175 Q 170 170 180 140 Z" fill="#0f172a" opacity="0.6" />
          {/* Oceanus Procellarum */}
          <path d="M 100 130 Q 80 180 110 210 Q 140 170 100 130 Z" fill="#0f172a" opacity="0.6" />
          {/* Mare Imbrium */}
          <path d="M 130 90 Q 170 80 175 120 Q 120 120 130 90 Z" fill="#0f172a" opacity="0.6" />

          {/* Grid lines */}
          <line x1="20" y1="160" x2="300" y2="160" stroke="#334155" strokeDasharray="3,3" opacity="0.5" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="#334155" strokeDasharray="3,3" opacity="0.5" />

          {/* Lunar pins */}
          {lunarObjects.map((obj) => {
            const x = cx + obj.lon! * k * Math.cos((obj.lat! * Math.PI) / 180)
            const y = cy - obj.lat! * k

            return (
              <g key={obj.id} className="group">
                <circle cx={x} cy={y} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                <line x1={x} y1={y} x2={x + 12} y2={y - 10} stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
                <text x={x + 14} y={y - 10} fill="#f1f5f9" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {obj.shortName}
                </text>
                <text x={x + 14} y={y - 1} fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                  {Math.abs(obj.lat!)}° {obj.lat! >= 0 ? 'N' : 'S'}, {Math.abs(obj.lon!)}° {obj.lon! >= 0 ? 'E' : 'W'}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <p className="text-[10px] font-mono text-slate-400 mt-2 text-center">
        Schematic. Positions from published coordinates; not a navigation aid.
      </p>
    </div>
  )
}
