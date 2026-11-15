import React, { useState } from 'react'
import { Compass, X, MapPin, ExternalLink } from 'lucide-react'
import { latLonToUV } from '../utils/coordinates'

interface MarsMapProps {
  onClose?: () => void
  onSelectScene?: (sceneId: string) => void
}

interface MarsSite {
  id: string
  name: string
  hardware: string
  sceneId: string
  kind: 'verified-point' | 'named-region'
  lat?: number
  lon?: number
  regionName: string
  source: string
  sourceUrl: string
  notes: string
}

const MARS_SITES: MarsSite[] = [
  {
    id: 'viking-1',
    name: 'Chryse Planitia',
    hardware: 'Viking 1 Lander (Thomas Mutch Memorial Station)',
    sceneId: '2.1',
    kind: 'verified-point',
    lat: 22.483,
    lon: -47.94,
    regionName: 'Chryse Planitia ("Plains of Gold")',
    source: 'NASA Science Viking 1',
    sourceUrl: 'https://science.nasa.gov/mission/viking-1/',
    notes: 'First long-duration surface station. Biology experiments inconclusive; GCMS organic test negative.',
  },
  {
    id: 'insight',
    name: 'Elysium Planitia',
    hardware: 'InSight Lander & SEIS Seismometer',
    sceneId: '3.2',
    kind: 'verified-point',
    lat: 4.5,
    lon: 135.9,
    regionName: 'Elysium Planitia',
    source: 'NASA Science InSight',
    sourceUrl: 'https://science.nasa.gov/mission/insight/',
    notes: 'Detected >1,300 marsquakes. Measured core size and crustal layering.',
  },
  {
    id: 'pathfinder',
    name: 'Ares Vallis',
    hardware: 'Mars Pathfinder & Sojourner Rover',
    sceneId: '2.2',
    kind: 'named-region',
    lat: 19.33,
    lon: -33.55,
    regionName: 'Ares Vallis Ancient Floodplain',
    source: 'NASA Science Mars Pathfinder',
    sourceUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
    notes: 'Airbag bounce landing. Analyzed water-rounded pebbles and high-silica rocks.',
  },
  {
    id: 'spirit',
    name: 'Gusev Crater',
    hardware: 'Spirit Rover (MER-A)',
    sceneId: '3.1',
    kind: 'named-region',
    lat: -14.57,
    lon: 175.47,
    regionName: 'Gusev Crater (Columbia Memorial Station)',
    source: 'NASA Science MER Spirit & Opportunity',
    sourceUrl: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    notes: 'Explored Columbia Hills and ancient hydrothermal silica deposits.',
  },
  {
    id: 'opportunity',
    name: 'Meridiani Planum',
    hardware: 'Opportunity Rover (MER-B)',
    sceneId: '3.1',
    kind: 'named-region',
    lat: -1.95,
    lon: 354.47,
    regionName: 'Meridiani Planum (Perseverance Valley)',
    source: 'NASA Science MER Spirit & Opportunity',
    sourceUrl: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    notes: 'Drove 45.16 km; confirmed ancient persistent groundwater and hematite spherules.',
  },
  {
    id: 'ingenuity',
    name: 'Jezero Crater',
    hardware: 'Ingenuity Mars Helicopter',
    sceneId: '3.3',
    kind: 'named-region',
    lat: 18.44,
    lon: 77.45,
    regionName: 'Jezero Crater Delta Margin',
    source: 'NASA Mars 2020 Ingenuity Flight Log',
    sourceUrl: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    notes: 'First powered controlled flight on another planet. 72 flights completed.',
  },
]

export const MarsMap: React.FC<MarsMapProps> = ({ onClose, onSelectScene }) => {
  const [selectedSite, setSelectedSite] = useState<MarsSite>(MARS_SITES[0])

  return (
    <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md max-w-2xl w-full text-slate-200 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              Mars Surface Hardware Atlas
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">
              2:1 Equirectangular Projection · Verified Points & Named Regional Sites
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            aria-label="Close Mars map"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2:1 Equirectangular SVG Surface Map (640x320) */}
      <div className="relative my-2">
        <svg viewBox="0 0 640 320" className="w-full h-52 bg-[#180d0a] rounded-xl border border-amber-950/80">
          {/* Latitude & Longitude Grid */}
          <line x1="0" y1="160" x2="640" y2="160" stroke="#7c2d12" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
          <line x1="320" y1="0" x2="320" y2="320" stroke="#7c2d12" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
          <text x="8" y="155" fill="#ea580c" fontSize="8" fontFamily="monospace">0° Equator</text>
          <text x="325" y="15" fill="#ea580c" fontSize="8" fontFamily="monospace">0° Prime Meridian</text>

          {/* Plot Sites using shared typed latLonToUV conversion */}
          {MARS_SITES.map((site) => {
            if (site.lat === undefined || site.lon === undefined) return null
            const { u, v } = latLonToUV(site.lat, site.lon)
            const x = u * 640
            const y = v * 320
            const isSelected = selectedSite.id === site.id

            return (
              <g
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className="cursor-pointer group"
              >
                {/* Marker ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 6 : 4}
                  fill={site.kind === 'verified-point' ? '#f97316' : 'none'}
                  stroke="#ffffff"
                  strokeWidth={site.kind === 'verified-point' ? 1.5 : 2}
                  strokeDasharray={site.kind === 'verified-point' ? undefined : '2,2'}
                  className="transition-all duration-150"
                />

                {/* Marker label */}
                <text
                  x={x + 8}
                  y={y + 3}
                  fill={isSelected ? '#ffffff' : '#fdba74'}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                >
                  {site.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected Site Details Card */}
      <div className="mt-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5 font-sans">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-mono">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white uppercase">{selectedSite.hardware}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 uppercase">
            {selectedSite.kind === 'verified-point' ? 'Measured Coordinate' : 'Named Region'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
          <div>
            <span className="text-slate-400 block text-[9px]">REGION / SITE:</span>
            <span>{selectedSite.regionName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[9px]">COORDINATES:</span>
            <span>
              {selectedSite.lat !== undefined && selectedSite.lon !== undefined
                ? `${selectedSite.lat > 0 ? `${selectedSite.lat}° N` : `${Math.abs(selectedSite.lat)}° S`}, ${
                    selectedSite.lon >= 0 ? `${selectedSite.lon}° E` : `${Math.abs(selectedSite.lon)}° W`
                  }`
                : 'Regional Landing Area (Unsurveyed Exact Point)'}
            </span>
          </div>
        </div>

        <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
          {selectedSite.notes}
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
              className="px-2 py-1 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold cursor-pointer"
            >
              Jump to Story Scene
            </button>
          )}
        </div>
      </div>

      {/* Accessible List Equivalent of all 6 sites */}
      <div className="mt-3 pt-2 border-t border-slate-800">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
          All Mars Surface Sites (Keyboard & Screen-Reader Accessible):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-[10px] font-mono">
          {MARS_SITES.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`p-1.5 rounded text-left truncate border transition-colors cursor-pointer ${
                selectedSite.id === site.id
                  ? 'bg-amber-950/70 border-amber-500/60 text-white font-bold'
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
