import React, { useRef } from 'react'
import type { BeatDefinition } from '../contracts/beats'
import { SCENES, QUOTES } from '../data/scenes'
import { QuoteBlock } from './QuoteBlock'
import { FactDrawer } from './FactDrawer'
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
import { useReveal } from './motion/useReveal'

interface SceneTextProps {
  beat: BeatDefinition
  text: string
  onOpenDetails?: () => void
}

export const SceneText: React.FC<SceneTextProps> = ({ beat, text, onOpenDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useReveal(containerRef, [beat.id, text])

  const sceneDef = SCENES[beat.sceneId]
  const quote = sceneDef?.quoteId ? QUOTES[sceneDef.quoteId] : undefined

  return (
    <article
      ref={containerRef}
      className="pointer-events-auto max-w-xl text-slate-100 flex flex-col gap-3 font-sans select-none"
    >
      <header data-reveal>
        <h2 className="text-white leading-tight">{sceneDef?.title}</h2>
      </header>

      {/* Narrative Paragraph */}
      <p
        data-reveal
        className="text-base md:text-lg lg:text-xl font-serif text-slate-200/95 leading-relaxed drop-shadow-md"
      >
        {text}
      </p>

      {/* Verbatim NASA quote on last screen of scene if present */}
      {/* Optional context stays available throughout the scene, without crowding the story. */}
      {(quote || (beat.sceneId !== '0.1' && !beat.sceneId.startsWith('6.'))) && (
        <details className="scene-details" onToggle={(event) => { if (event.currentTarget.open) onOpenDetails?.() }}>
          <summary>Explore details <span>+</span></summary>
          <div className="scene-details-content">
          {quote && <QuoteBlock quote={quote} />}
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
              <RtgDiagram />
              <BatteryBadge />
            </>
          )}
          {beat.sceneId === '1.4' && <DateSlider />}
          {beat.sceneId === '2.1' && (
            <>
              <WeatherLog />
              <VikingInstruments />
            </>
          )}
          {beat.sceneId === '2.2' && (
            <>
              <BounceCounter />
              <RangeComparison />
            </>
          )}
          {beat.sceneId === '3.1' && (
            <>
              <OdometerWall />
              <DustSlider />
            </>
          )}
          {beat.sceneId === '3.2' && (
            <>
              <VitalSigns />
              <AudioPlayer />
            </>
          )}
          {beat.sceneId === '3.3' && <FlightCounter />}
          {beat.sceneId === '4.1' && <TwoWorldsPanel />}
          {beat.sceneId === '4.2' && (
            <>
              <DescentLadder />
              <SpeedComparison />
            </>
          )}
          {beat.sceneId === '5.1' && (
            <>
              <SignalDelay />
              <PlaqueViewer />
            </>
          )}
          {beat.sceneId === '5.2' && (
            <>
              <TransitDemo />
              <KayakExplainer />
            </>
          )}
          </div>
        </details>
      )}
    </article>
  )
}

