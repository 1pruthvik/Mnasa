import React from 'react'
import { useStore } from '../store'
import { beatAt } from '../contracts/beats'
import { MapPin, Compass, BookOpen, Eye, Play, Pause, RotateCcw } from 'lucide-react'

interface AtlasNavHeaderProps {
  onScrollToBeat?: (t: number) => void
  onOpenCredits?: () => void
  onOpenMap?: () => void
}

// Hierarchical "WHERE AM I?" locations mapped to scene IDs
const LOCATION_BREADCRUMBS: Record<
  string,
  { system: string; world: string; place: string; scaleNote: string }
> = {
  '0.1': {
    system: 'MILKY WAY',
    world: 'SOLAR SYSTEM',
    place: 'OUTER ORBITS',
    scaleNote: 'Schematic Overview — Not to Scale',
  },
  '0.2': {
    system: 'SOLAR SYSTEM',
    world: 'INNER PLANETS',
    place: 'EARTH APPROACH',
    scaleNote: 'The Archival Gateway',
  },
  '1.1': {
    system: 'SOLAR SYSTEM',
    world: 'MOON',
    place: 'MARE TRANQUILLITATIS (APOLLO 11)',
    scaleNote: '0.67° N, 23.47° E · 3D Model Illustration',
  },
  '1.2': {
    system: 'SOLAR SYSTEM',
    world: 'MOON',
    place: 'OCEANUS PROCELLARUM (APOLLO 12 & SURVEYOR 3)',
    scaleNote: '3.01° S, 23.42° W · 180 m Proximity Site',
  },
  '1.3': {
    system: 'SOLAR SYSTEM',
    world: 'MOON',
    place: 'HADLEY-APENNINE (APOLLO 15 LRV)',
    scaleNote: '26.13° N, 3.63° E · 27.8 km Traversed',
  },
  '1.4': {
    system: 'SOLAR SYSTEM',
    world: 'MOON',
    place: 'LUNAR SCIENCE STATIONS (ALSEP & RTG)',
    scaleNote: 'Passive Science Arrays',
  },
  '2.1': {
    system: 'SOLAR SYSTEM',
    world: 'MARS',
    place: 'CHRYSE PLANITIA (VIKING 1)',
    scaleNote: '22.48° N, 47.94° W · First Long-Term Mars Station',
  },
  '2.2': {
    system: 'SOLAR SYSTEM',
    world: 'MARS',
    place: 'ARES VALLIS (PATHFINDER & SOJOURNER)',
    scaleNote: '19.33° N, 33.55° W · Ancient Floodplain Site',
  },
  '3.1': {
    system: 'SOLAR SYSTEM',
    world: 'MARS',
    place: 'MERIDIANI PLANUM (OPPORTUNITY ROVER)',
    scaleNote: '45.16 km Driven · Sedimentary Rock Record',
  },
  '3.2': {
    system: 'SOLAR SYSTEM',
    world: 'MARS',
    place: 'ELYSIUM PLANITIA (INSIGHT LANDER)',
    scaleNote: '4.5° N, 135.9° E · Internal Seismology Station',
  },
  '3.3': {
    system: 'SOLAR SYSTEM',
    world: 'MARS',
    place: 'JEZERO CRATER (INGENUITY HELICOPTER)',
    scaleNote: '72 Flights · First Atmospheric Aircraft',
  },
  '4.1': {
    system: 'SOLAR SYSTEM',
    world: 'ASTEROID BELT',
    place: 'DWARF PLANET CERES & VESTA (DAWN)',
    scaleNote: 'Orbit Retention Protocol · Not Landing',
  },
  '4.2': {
    system: 'SOLAR SYSTEM',
    world: 'ASTEROID 433 EROS',
    place: 'HIMEROS BASIN SOUTH (NEAR SHOEMAKER)',
    scaleNote: 'Touchdown on Asteroid Surface',
  },
  '5.1': {
    system: 'SOLAR SYSTEM',
    world: 'OUTBOUND TRAJECTORY',
    place: 'INTERSTELLAR CRUISE (PIONEER 10)',
    scaleNote: 'Last Signal 2003 · 12.23B km from Earth',
  },
  '5.2': {
    system: 'SOLAR SYSTEM',
    world: 'HELIOCENTRIC ORBIT',
    place: 'EARTH-TRAILING PATH (KEPLER)',
    scaleNote: 'Transit Photometry · 2,600+ Exoplanets',
  },
  '6.1': {
    system: 'ARCHIVE',
    world: 'INVENTORY DOSSIER',
    place: '15 NASA QUIET EXPLORERS',
    scaleNote: 'Historical Summary & Status Ledger',
  },
  '6.2': {
    system: 'ARCHIVE',
    world: 'THE CLOSE',
    place: 'CELESTIAL SILENCE',
    scaleNote: 'Evidence Remains for Future Science',
  },
}

export const AtlasNavHeader: React.FC<AtlasNavHeaderProps> = ({
  onScrollToBeat,
  onOpenCredits,
  onOpenMap,
}) => {
  const progress = useStore((s) => s.progress)
  const readingMode = useStore((s) => s.readingMode)
  const toggleReadingMode = useStore((s) => s.toggleReadingMode)
  const demoState = useStore((s) => s.demoState)
  const startDemo = useStore((s) => s.startDemo)
  const pauseDemo = useStore((s) => s.pauseDemo)
  const resumeDemo = useStore((s) => s.resumeDemo)
  const beat = beatAt(progress)

  const breadcrumb = LOCATION_BREADCRUMBS[beat.sceneId] || LOCATION_BREADCRUMBS['0.1']

  const handleNav = (t0: number) => {
    if (onScrollToBeat) {
      onScrollToBeat(t0)
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: t0 * max, behavior: 'smooth' })
    }
  }

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 py-2 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* Left: Project Title & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
          <div>
            <h1 className="text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Abandoned but Not Forgotten</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-sans hidden sm:inline">
              An atlas of the machines that helped us understand other worlds
            </span>
          </div>

          <div className="h-3 w-px bg-slate-700 hidden sm:block" />

          {/* WHERE AM I? Breadcrumb Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-slate-400">WHERE AM I?</span>
            <span className="text-slate-500">›</span>
            <span className="text-cyan-400 font-semibold">{breadcrumb.world}</span>
            <span className="text-slate-500">›</span>
            <span className="text-white font-bold truncate max-w-[140px] md:max-w-xs">
              {breadcrumb.place}
            </span>
            <span className="text-slate-400 text-[9px] hidden lg:inline italic">
              ({breadcrumb.scaleNote})
            </span>
          </div>
        </div>

        {/* Right: Guided Demo Button, Quick Destination Jumps & Accessibility Controls */}
        <nav aria-label="Destination Quick Jump" className="flex items-center gap-1.5 text-[10px] font-mono overflow-x-auto pb-0.5">
          {/* Unmissable Primary Guided Demo Play Button */}
          {demoState === 'manual' && (
            <button
              onClick={() => startDemo(true)}
              className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-bold font-mono text-[11px] flex items-center gap-1 shadow-md shadow-cyan-950/40 cursor-pointer transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              title="Play autonomous guided demo through all 17 scenes (~4 mins)"
            >
              <Play className="w-3 h-3 fill-current text-slate-950" />
              <span>Play Guided Demo</span>
            </button>
          )}
          {demoState === 'playing' && (
            <button
              onClick={pauseDemo}
              className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-[11px] flex items-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
              title="Pause guided demo"
            >
              <Pause className="w-3 h-3 fill-current text-slate-950" />
              <span>Pause Demo</span>
            </button>
          )}
          {demoState === 'paused' && (
            <button
              onClick={resumeDemo}
              className="px-2.5 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-[11px] flex items-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
              title="Resume guided demo"
            >
              <Play className="w-3 h-3 fill-current text-slate-950" />
              <span>Resume Demo</span>
            </button>
          )}
          {demoState === 'finished' && (
            <button
              onClick={() => startDemo(true)}
              className="px-2.5 py-1 rounded bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold font-mono text-[11px] flex items-center gap-1 shadow-md cursor-pointer whitespace-nowrap"
              title="Replay guided demo"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Demo</span>
            </button>
          )}

          <div className="h-3 w-px bg-slate-700 mx-0.5 hidden sm:block" />

          <button
            onClick={() => handleNav(0.0)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer whitespace-nowrap"
          >
            Space
          </button>
          <button
            onClick={() => handleNav(0.175)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-900/60 cursor-pointer whitespace-nowrap"
          >
            Moon
          </button>
          <button
            onClick={() => handleNav(0.4)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-900/60 cursor-pointer whitespace-nowrap"
          >
            Mars
          </button>
          <button
            onClick={() => handleNav(0.66)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-purple-200 border border-purple-900/60 cursor-pointer whitespace-nowrap"
          >
            Asteroids
          </button>
          <button
            onClick={() => handleNav(0.76)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-indigo-200 border border-indigo-900/60 cursor-pointer whitespace-nowrap"
          >
            Deep Space
          </button>
          <button
            onClick={() => handleNav(0.86)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 cursor-pointer whitespace-nowrap"
          >
            Inventory
          </button>

          {/* Reading Mode Button */}
          <button
            onClick={toggleReadingMode}
            title={readingMode ? 'Switch to 3D Immersive View' : 'Read without 3D (Accessible Static Mode)'}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer flex items-center gap-1 whitespace-nowrap"
          >
            {readingMode ? <Eye className="w-3 h-3 text-cyan-400" /> : <BookOpen className="w-3 h-3 text-amber-400" />}
            <span>{readingMode ? '3D View' : 'Read without 3D'}</span>
          </button>

          {/* Atlas Map Modals */}
          {onOpenMap && (
            <button
              onClick={onOpenMap}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer whitespace-nowrap hidden sm:inline"
            >
              Surface Maps
            </button>
          )}

          {/* Sources & Evidence */}
          {onOpenCredits && (
            <button
              onClick={onOpenCredits}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer whitespace-nowrap"
            >
              Sources
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
