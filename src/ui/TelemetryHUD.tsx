import React, { useState } from 'react'
import { useStore } from '../store'
import { beatAt } from '../contracts/beats'
import { OBJECTS } from '../data/objects'
import { Activity, Radio, Database, ExternalLink, X, Compass, Globe, Clock } from 'lucide-react'

// Map scene IDs to active primary objects
const SCENE_TO_OBJECT_ID: Record<string, string> = {
  '1.1': '1969-059C', // Apollo 11 Eagle
  '1.2': 'surveyor-3', // Surveyor 3
  '1.3': 'lrv', // LRV
  '1.4': '1971-063C', // Apollo 15 ALSEP
  '2.1': 'viking-1', // Viking 1
  '2.2': 'pathfinder', // Pathfinder & Sojourner
  '3.1': 'opportunity', // Opportunity
  '3.2': 'insight', // InSight
  '3.3': 'ingenuity', // Ingenuity
  '4.1': 'dawn', // Dawn at Ceres/Vesta
  '4.2': 'near-shoemaker', // NEAR Shoemaker at Eros
  '5.1': 'pioneer-10', // Pioneer 10
  '5.2': 'kepler', // Kepler
}

// Distance and light-delay telemetry calculations
const TELEMETRY_METRICS: Record<
  string,
  { distanceEarth: string; lightDelay: string; orbitVelocity?: string }
> = {
  Moon: { distanceEarth: '384,400 km (1.28 lt-sec)', lightDelay: '1.28 s' },
  Mars: { distanceEarth: '225,000,000 km (1.50 AU)', lightDelay: '12.5 min' },
  Ceres: { distanceEarth: '414,000,000 km (2.77 AU)', lightDelay: '23.0 min', orbitVelocity: '17.9 km/s' },
  Eros: { distanceEarth: '315,000,000 km (2.11 AU)', lightDelay: '17.5 min', orbitVelocity: '24.3 km/s' },
  Interstellar: { distanceEarth: '20,200,000,000 km (135.0 AU)', lightDelay: '18.7 hrs' },
  Heliocentric: { distanceEarth: '150,000,000 km (1.00 AU)', lightDelay: '8.3 min' },
}

export const TelemetryHUD: React.FC = () => {
  const progress = useStore((s) => s.progress)
  const readingMode = useStore((s) => s.readingMode)
  const beat = beatAt(progress)

  const [dossierOpen, setDossierOpen] = useState(false)

  // Don't render HUD during opening space scene 0 or inventory scene 6 or reading mode
  if (readingMode || beat.sceneId.startsWith('0.') || beat.sceneId.startsWith('6.')) {
    return null
  }

  const objectId = SCENE_TO_OBJECT_ID[beat.sceneId] || '1969-059C'
  const activeObj = OBJECTS.find((o) => o.id === objectId) || OBJECTS[0]
  const metrics = TELEMETRY_METRICS[activeObj.body] || TELEMETRY_METRICS.Moon

  return (
    <>
      {/* Floating NASA Telemetry Flight HUD in Top-Right Corner */}
      <aside
        aria-label="NASA Flight Telemetry"
        className="fixed top-16 right-4 z-30 w-72 md:w-80 bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3.5 shadow-2xl text-slate-100 select-none transition-all duration-300 pointer-events-auto"
      >
        {/* Header telemetry indicator */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400">
              NASA PDS ARCHIVE TELEMETRY
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
            {activeObj.id}
          </span>
        </div>

        {/* Spacecraft Identification */}
        <div className="mb-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
            {activeObj.body} · {activeObj.site}
          </div>
          <h3 className="text-sm font-bold font-sans text-white truncate">
            {activeObj.name}
          </h3>
        </div>

        {/* Real NASA Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 mb-2.5">
          <div>
            <span className="text-slate-400 block text-[9px] flex items-center gap-1">
              <Compass className="w-2.5 h-2.5 text-cyan-400" /> COORDINATES
            </span>
            <span className="text-cyan-200 font-semibold truncate block">
              {activeObj.lat !== undefined && activeObj.lon !== undefined
                ? `${activeObj.lat.toFixed(2)}°, ${activeObj.lon.toFixed(2)}°`
                : 'Trapped / Orbital'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[9px] flex items-center gap-1">
              <Globe className="w-2.5 h-2.5 text-amber-400" /> DISTANCE (EARTH)
            </span>
            <span className="text-slate-200 font-semibold truncate block">
              {metrics.distanceEarth.split(' ')[0]}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[9px] flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-400" /> ONE-WAY LIGHT DELAY
            </span>
            <span className="text-emerald-300 font-semibold truncate block">
              {metrics.lightDelay}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[9px] flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-sky-400" /> STATUS
            </span>
            <span className="text-amber-300 font-semibold truncate block uppercase">
              {activeObj.status}
            </span>
          </div>
        </div>

        {/* Action Button: Open Detailed NASA Science Dossier */}
        <button
          onClick={() => setDossierOpen(true)}
          className="w-full py-1.5 px-2.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Database className="w-3 h-3 text-cyan-400" />
          <span>INSPECT NASA SCIENTIFIC DOSSIER</span>
        </button>
      </aside>

      {/* Full NASA Scientific Dossier Modal */}
      {dossierOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  NASA NSSDC SCIENTIFIC RECORD · {activeObj.name}
                </h2>
              </div>
              <button
                onClick={() => setDossierOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans text-slate-200">
              {/* Mission Summary Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Target Body & Site:</span>
                  <span className="text-cyan-300 font-bold">{activeObj.body} · {activeObj.site}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Arrival UTC Timestamp:</span>
                  <span className="text-slate-200">{activeObj.arrived}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Last Telemetry / Quiet Date:</span>
                  <span className="text-slate-200">{activeObj.wentQuiet}</span>
                </div>
                {activeObj.massKg && (
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Mass at Landing:</span>
                    <span className="text-slate-200">{activeObj.massKg.toLocaleString()} kg</span>
                  </div>
                )}
                <div className="pt-1 text-[11px] text-amber-200/90 italic">
                  "{activeObj.quietReason}"
                </div>
              </div>

              {/* Hard Verified Scientific Facts List */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
                  Telemetry & Verified Science Record ({activeObj.hardFacts.length} NASA Citations)
                </h4>
                <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                  {activeObj.hardFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
                      <span className="text-cyan-500 font-bold">[{idx + 1}]</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official NASA NSSDC Source URLs */}
              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Archival NASA Data Sources:
                </h4>
                <div className="flex flex-col gap-1">
                  {activeObj.sourceUrls.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 underline underline-offset-2 break-all"
                    >
                      <ExternalLink className="w-3 h-3 shrink-0" />
                      <span>{url}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
