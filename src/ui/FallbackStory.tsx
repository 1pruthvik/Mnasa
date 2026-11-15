import React from 'react'
import { SCENES, QUOTES } from '../data/scenes'
import { BEATS } from '../contracts/beats'
import { QuoteBlock } from './QuoteBlock'
import { FactDrawer } from './FactDrawer'
import { InventoryTable } from './InventoryTable'
import { Odometer } from './widgets/Odometer'
import { RtgDiagram } from './widgets/RtgDiagram'
import { DateSlider } from './widgets/DateSlider'
import { WeatherLog } from './widgets/WeatherLog'
import { BounceCounter } from './widgets/BounceCounter'
import { RangeComparison } from './widgets/RangeComparison'
import { OdometerWall } from './widgets/OdometerWall'
import { VitalSigns } from './widgets/VitalSigns'
import { FlightCounter } from './widgets/FlightCounter'
import { DescentLadder } from './widgets/DescentLadder'
import { SignalDelay } from './widgets/SignalDelay'
import { PlaqueViewer } from './widgets/PlaqueViewer'
import { TransitDemo } from './widgets/TransitDemo'
import { LunarMap } from './LunarMap'
import { MarsMap } from './MarsMap'

export const FallbackStory: React.FC = () => {
  return (
    <main className="w-full min-h-screen bg-[#05070d] text-slate-100 px-6 py-16 md:px-16 lg:px-24 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-24">
        {/* Document Header */}
        <header className="border-b border-slate-800 pb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block mb-2">
            NASA Space Apps Challenge 2026
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white font-display mb-4">
            Abandoned, but not forgotten
          </h1>
          <p className="text-lg md:text-xl font-serif text-slate-300 leading-relaxed italic">
            A permanent archive of fifteen pieces of NASA hardware left on the Moon, Mars, and in the deep dark between stars.
          </p>
        </header>

        {/* 17 Scenes */}
        {BEATS.map((beat) => {
          const scene = SCENES[beat.sceneId]
          const quote = scene?.quoteId ? QUOTES[scene.quoteId] : undefined

          return (
            <section key={beat.id} id={`s${beat.sceneId}`} className="border-b border-slate-900 pb-20 space-y-6">
              <div>
                {scene?.kicker && (
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                    {scene.kicker}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
                  {scene?.title}
                </h2>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-4">
                {scene?.copy.map((p, pIdx) => (
                  <p key={pIdx} className="text-base md:text-lg font-serif text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Quote if present */}
              {quote && <QuoteBlock quote={quote} />}

              {/* Static Widgets */}
              <div className="pt-4 flex flex-col gap-4">
                {beat.sceneId === '0.2' && <FactDrawer />}
                {beat.sceneId === '1.2' && <LunarMap />}
                {beat.sceneId === '1.3' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Odometer />
                    <RtgDiagram />
                  </div>
                )}
                {beat.sceneId === '1.4' && <DateSlider />}
                {beat.sceneId === '2.1' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WeatherLog />
                    <MarsMap />
                  </div>
                )}
                {beat.sceneId === '2.2' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BounceCounter />
                    <RangeComparison />
                  </div>
                )}
                {beat.sceneId === '3.1' && <OdometerWall />}
                {beat.sceneId === '3.2' && <VitalSigns />}
                {beat.sceneId === '3.3' && <FlightCounter />}
                {beat.sceneId === '4.2' && <DescentLadder />}
                {beat.sceneId === '5.1' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SignalDelay />
                    <PlaqueViewer />
                  </div>
                )}
                {beat.sceneId === '5.2' && <TransitDemo />}
                {beat.sceneId === '6.1' && <InventoryTable />}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
