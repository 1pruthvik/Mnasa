import React, { useState } from 'react'
import type { BeatDefinition } from '../contracts/beats'
import { getShotBySceneId, STORYBOARD } from '../data/storyboard'
import { SCENES, QUOTES } from '../data/scenes'
import { QuoteBlock } from './QuoteBlock'
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Sparkles,
  Info,
  Thermometer,
} from 'lucide-react'

// Widget components for secondary interactive exploration
import { StillWorkingToggle } from './widgets/StillWorkingToggle'
import { MoonquakeWaveform } from './widgets/MoonquakeWaveform'
import { Odometer } from './widgets/Odometer'
import { RtgDiagram } from './widgets/RtgDiagram'
import { DateSlider } from './widgets/DateSlider'
import { WeatherLog } from './widgets/WeatherLog'
import { BounceCounter } from './widgets/BounceCounter'
import { RangeComparison } from './widgets/RangeComparison'
import { OdometerWall } from './widgets/OdometerWall'
import { VitalSigns } from './widgets/VitalSigns'
import { AudioPlayer } from './widgets/AudioPlayer'
import { FlightCounter } from './widgets/FlightCounter'
import { DescentLadder } from './widgets/DescentLadder'
import { SignalDelay } from './widgets/SignalDelay'
import { PlaqueViewer } from './widgets/PlaqueViewer'
import { TransitDemo } from './widgets/TransitDemo'
import { FootpadScale } from './widgets/FootpadScale'
import { SurveyorRuler } from './widgets/SurveyorRuler'
import { BatteryBadge } from './widgets/BatteryBadge'
import { VikingInstruments } from './widgets/VikingInstruments'
import { DustSlider } from './widgets/DustSlider'
import { TwoWorldsPanel } from './widgets/TwoWorldsPanel'
import { SpeedComparison } from './widgets/SpeedComparison'
import { KayakExplainer } from './widgets/KayakExplainer'
import { FactDrawer } from './FactDrawer'

interface SceneCardPanelProps {
  beat: BeatDefinition
  paragraphText?: string
  paragraphIndex: number
  totalParagraphs: number
}

export const SceneCardPanel: React.FC<SceneCardPanelProps> = ({
  beat,
  paragraphText,
  paragraphIndex,
  totalParagraphs,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false)

  const shot = getShotBySceneId(beat.sceneId) || STORYBOARD[0]
  const sceneDef = SCENES[beat.sceneId]
  const quote = sceneDef?.quoteId ? QUOTES[sceneDef.quoteId] : undefined

  return (
    <article
      role="article"
      aria-label={`${shot.subject} Story Dossier`}
      className="pointer-events-auto flex flex-col gap-3.5 text-slate-100 max-w-xl font-sans select-none animate-in fade-in duration-300"
    >
      {/* 1. Location Breadcrumb & Status Pill */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono shadow-sm">
          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="text-slate-400 font-semibold">{shot.world}</span>
          <span className="text-slate-600">/</span>
          <span className="text-amber-300 font-bold tracking-wide">{shot.place}</span>
        </div>

        {/* Evidence / Verification Tag */}
        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-slate-800/80 text-cyan-300 border border-slate-700/60">
          {shot.evidenceTag}
        </span>
      </div>

      {/* 2. World Condition Line */}
      {shot.worldCondition && (
        <div className="flex items-start gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 leading-tight">
          <Thermometer className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>{shot.worldCondition}</span>
        </div>
      )}

      {/* 3. Persistent Main Heading & Machine Subject */}
      <header className="space-y-0.5">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 block">
          {sceneDef?.kicker || `Scene ${beat.sceneId}`}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display leading-tight">
          {shot.subject}
        </h2>
      </header>

      {/* 4. Narrative Paragraph (Dynamic per scroll screen) */}
      <div className="text-sm sm:text-base font-serif text-slate-200/95 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/50 shadow-inner">
        <p>{paragraphText || sceneDef?.copy[0]}</p>

        {totalParagraphs > 1 && (
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 mt-2 border-t border-slate-800/60">
            <span>Scroll to read narrative</span>
            <span>
              Passage {paragraphIndex + 1} of {totalParagraphs}
            </span>
          </div>
        )}
      </div>

      {/* 5. Causal Science Connection: HOW IT WORKED → WHAT IT TAUGHT US */}
      <div className="grid grid-cols-1 gap-2 p-3 rounded-xl bg-slate-900/85 border border-slate-800 text-xs font-sans shadow-md">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
            How It Worked
          </span>
          <p className="text-slate-300 leading-snug">{shot.howItWorked}</p>
        </div>

        <div className="border-t border-slate-800 pt-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 block mb-0.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>What It Taught Us</span>
          </span>
          <p className="text-slate-200 font-medium leading-snug">{shot.whatItTaughtUs}</p>
        </div>

        <div className="border-t border-slate-800 pt-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Present Status & Afterward
          </span>
          <p className="text-slate-300 text-[11px] leading-snug">{shot.afterward}</p>
        </div>
      </div>

      {/* 6. Primary Source Link & Attribution */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <a
          href={shot.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
        >
          <span>{shot.sourceLabel}</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Secondary Details Toggle */}
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer text-[10px]"
        >
          <Info className="w-3 h-3 text-amber-400" />
          <span>{detailsOpen ? 'Less' : 'More details'}</span>
          {detailsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* 7. Collapsible Secondary Information & Interactive Tools */}
      {detailsOpen && (
        <div className="flex flex-col gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800 animate-in fade-in duration-200">
          {quote && <QuoteBlock quote={quote} />}

          {/* Contextual Interactive Widgets */}
          <div className="flex flex-col gap-2.5">
            {beat.sceneId === '0.2' && <FactDrawer />}
            {beat.sceneId === '1.1' && (
              <>
                <StillWorkingToggle />
                <FootpadScale />
              </>
            )}
            {beat.sceneId === '1.2' && (
              <>
                <MoonquakeWaveform />
                <SurveyorRuler />
              </>
            )}
            {beat.sceneId === '1.3' && (
              <>
                <Odometer />
                <BatteryBadge />
              </>
            )}
            {beat.sceneId === '1.4' && <RtgDiagram />}
            {beat.sceneId === '2.1' && (
              <>
                <DateSlider />
                <VikingInstruments />
              </>
            )}
            {beat.sceneId === '2.2' && (
              <>
                <BounceCounter />
                <WeatherLog />
              </>
            )}
            {beat.sceneId === '3.1' && (
              <>
                <RangeComparison />
                <DustSlider />
              </>
            )}
            {beat.sceneId === '3.2' && (
              <>
                <VitalSigns />
                <AudioPlayer />
              </>
            )}
            {beat.sceneId === '3.3' && (
              <>
                <FlightCounter />
                <DescentLadder />
              </>
            )}
            {beat.sceneId === '4.1' && (
              <>
                <TwoWorldsPanel />
                <SpeedComparison />
              </>
            )}
            {beat.sceneId === '4.2' && <KayakExplainer />}
            {beat.sceneId === '5.1' && (
              <>
                <SignalDelay />
                <PlaqueViewer />
              </>
            )}
            {beat.sceneId === '5.2' && (
              <>
                <OdometerWall />
                <TransitDemo />
              </>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
