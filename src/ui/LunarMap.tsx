import React, { useState } from 'react'
import { Compass, X, MapPin, ExternalLink } from 'lucide-react'

interface LunarMapProps {
  onClose?: () => void
  onSelectScene?: (sceneId: string) => void
}

interface LunarSiteInfo {
  id: string
  name: string
  hardware: string
  sceneId: string
  lat: number
  lon: number
  maria: string
  source: string
  sourceUrl: string
  description: string
}

const LUNAR_SITES: LunarSiteInfo[] = [
  {
    id: '1969-059C',
    name: 'Apollo 11 (Tranquility Base)',
    hardware: 'Eagle Lunar Module (Descent Stage) & EASEP',
    sceneId: '1.1',
    lat: 0.67416,
    lon: 23.47314,
    maria: 'Mare Tranquillitatis',
    source: 'NASA NSSDCA Record 1969-059C',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    description: 'Descent stage remains on surface; EASEP seismometer operated until August 1969; passive laser reflector requires no power.',
  },
  {
    id: '1969-099C',
    name: 'Apollo 12 & Surveyor 3',
    hardware: 'Intrepid Descent Stage & Surveyor 3 Probe',
    sceneId: '1.2',
    lat: -3.0128,
    lon: -23.4219,
    maria: 'Oceanus Procellarum',
    source: 'NASA NSSDCA Record 1969-099C',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    description: 'Pinpoint landing ~180 m from Surveyor 3. Astronauts collected ~10 kg of Surveyor parts for examination on Earth.',
  },
  {
    id: '1971-063C',
    name: 'Apollo 15 (Hadley Rille)',
    hardware: 'Falcon Descent Stage & Lunar Roving Vehicle (LRV-1)',
    sceneId: '1.3',
    lat: 26.13239,
    lon: 3.6333,
    maria: 'Mare Imbrium (Hadley-Apennine)',
    source: 'NASA NSSDCA Record 1971-063C',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    description: 'First electric rover on the Moon. Traversed 27.8 km; ALSEP station operated with SNAP-27 RTG until 1977.',
  },
]

export const LunarMap: React.FC<LunarMapProps> = ({ onClose, onSelectScene }) => {
  const [selectedSite, setSelectedSite] = useState<LunarSiteInfo>(LUNAR_SITES[0])

  const cx = 160
  const cy = 160
  const k = 1.25

  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-md w-full text-slate-200 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              Lunar Near-Side Landing Sites
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              Orthographic Near-Side Projection · Published NASA LRO DE 421 Coordinates
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            aria-label="Close lunar map"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* SVG Lunar Disc */}
      <div className="flex justify-center my-2">
        <svg viewBox="0 0 320 320" className="w-64 h-64">
          {/* Lunar disk */}
          <circle cx="160" cy="160" r="140" fill="#1e293b" stroke="#334155" strokeWidth="2" />

          {/* Maria features */}
          <path d="M 180 140 Q 210 150 200 175 Q 170 170 180 140 Z" fill="#0f172a" opacity="0.75" />
          <path d="M 100 130 Q 80 180 110 210 Q 140 170 100 130 Z" fill="#0f172a" opacity="0.75" />
          <path d="M 130 90 Q 170 80 175 120 Q 120 120 130 90 Z" fill="#0f172a" opacity="0.75" />

          {/* Grid lines (Equator & Prime Meridian) */}
          <line x1="20" y1="160" x2="300" y2="160" stroke="#334155" strokeDasharray="3,3" opacity="0.5" />
          <line x1="160" y1="20" x2="160" y2="300" stroke="#334155" strokeDasharray="3,3" opacity="0.5" />
          <text x="24" y="155" fill="#64748b" fontSize="7" fontFamily="monospace">0° Equator</text>
          <text x="164" y="32" fill="#64748b" fontSize="7" fontFamily="monospace">0° Prime Meridian</text>

          {/* Interactive Lunar Site Pins */}
          {LUNAR_SITES.map((site) => {
            const x = cx + site.lon * k * Math.cos((site.lat * Math.PI) / 180)
            const y = cy - site.lat * k
            const isSelected = selectedSite.id === site.id

            return (
              <g
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className="cursor-pointer group"
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 6 : 4}
                  fill="#38bdf8"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
                <line x1={x} y1={y} x2={x + 10} y2={y - 8} stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                <text
                  x={x + 12}
                  y={y - 8}
                  fill={isSelected ? '#ffffff' : '#e2e8f0'}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                >
                  {site.name.split(' ')[1] || site.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected Site Information Card */}
      <div className="mt-2 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-mono">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-white uppercase">{selectedSite.name}</span>
          </div>
          <span className="text-[10px] text-cyan-300">
            {selectedSite.lat.toFixed(2)}° N, {selectedSite.lon.toFixed(2)}° E
          </span>
        </div>

        <p className="text-slate-300 text-[11px] leading-relaxed">
          {selectedSite.description}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] font-mono">
          <a
            href={selectedSite.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline underline-offset-2"
          >
            <ExternalLink className="w-3 h-3" />
            <span>{selectedSite.source}</span>
          </a>

          {onSelectScene && (
            <button
              onClick={() => onSelectScene(selectedSite.sceneId)}
              className="px-2 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold cursor-pointer"
            >
              Jump to Scene
            </button>
          )}
        </div>
      </div>

      {/* Accessible List Equivalent */}
      <div className="mt-3 pt-2 border-t border-slate-800">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
          Accessible Site Selection:
        </span>
        <div className="flex gap-1.5 text-[10px] font-mono">
          {LUNAR_SITES.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`flex-1 p-1.5 rounded text-center truncate border transition-colors cursor-pointer ${
                selectedSite.id === site.id
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-white font-bold'
                  : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {site.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
