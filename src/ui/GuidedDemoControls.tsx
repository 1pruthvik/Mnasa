import React from 'react'
import { useStore } from '../store'
import { STORYBOARD } from '../data/storyboard'
import { Play, Pause, SkipForward, SkipBack, X, RotateCcw, Clock, Compass } from 'lucide-react'

export const GuidedDemoControls: React.FC = () => {
  const demoState = useStore((s) => s.demoState)
  const demoSpeed = useStore((s) => s.demoSpeed)
  const demoShotIndex = useStore((s) => s.demoShotIndex)
  const demoRemainingHold = useStore((s) => s.demoRemainingHold)
  const pauseDemo = useStore((s) => s.pauseDemo)
  const resumeDemo = useStore((s) => s.resumeDemo)
  const nextDemoShot = useStore((s) => s.nextDemoShot)
  const prevDemoShot = useStore((s) => s.prevDemoShot)
  const exitDemo = useStore((s) => s.exitDemo)
  const setDemoSpeed = useStore((s) => s.setDemoSpeed)
  const startDemo = useStore((s) => s.startDemo)

  if (demoState === 'manual') {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-in fade-in duration-300">
        <button
          onClick={() => startDemo(true)}
          className="group px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 text-cyan-300 hover:text-cyan-200 border border-cyan-500/40 hover:border-cyan-400 font-mono text-xs font-bold flex items-center gap-2.5 shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
          <span>Play Guided Demo (4m)</span>
        </button>
      </div>
    )
  }

  const currentShot = STORYBOARD[demoShotIndex] || STORYBOARD[0]
  const isPlaying = demoState === 'playing'
  const isFinished = demoState === 'finished'

  return (
    <div
      role="region"
      aria-label="Guided Story Playback Controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl bg-slate-950/92 backdrop-blur-xl border border-slate-800 text-slate-100 rounded-2xl shadow-2xl p-3 md:p-4 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {isFinished ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2 justify-center sm:justify-start">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>The Story Is Complete</span>
            </h3>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              15 quiet explorers reviewed. You can replay the guided story or continue exploring manually.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => startDemo(true)}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
            <button
              onClick={exitDemo}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs cursor-pointer border border-slate-700"
            >
              Explore by scrolling
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {/* Top Bar: Scene Indicator, World, and Hold Countdown */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isPlaying ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-bold uppercase tracking-wider text-slate-300">
                {isPlaying ? 'Guided demo · Playing' : 'Guided demo · Paused'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-semibold truncate max-w-[140px] sm:max-w-xs">
                {demoShotIndex + 1}/17: {currentShot.subject}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>
                Hold: <strong className="text-white font-mono">{demoRemainingHold}s</strong>
              </span>
            </div>
          </div>

          {/* Progress track across all 17 shots */}
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden flex">
            {STORYBOARD.map((shot, idx) => (
              <div
                key={shot.sceneId}
                style={{ width: `${100 / STORYBOARD.length}%` }}
                className={`h-full border-r border-slate-950/60 transition-colors duration-300 ${
                  idx < demoShotIndex
                    ? 'bg-cyan-500'
                    : idx === demoShotIndex
                    ? 'bg-amber-400'
                    : 'bg-slate-700/50'
                }`}
              />
            ))}
          </div>

          {/* Bottom Bar: Action Buttons & Speed Switch */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {/* Previous Scene Button */}
              <button
                onClick={prevDemoShot}
                disabled={demoShotIndex === 0}
                title="Previous Scene (Left Arrow)"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-slate-800"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause Toggle */}
              <button
                onClick={isPlaying ? pauseDemo : resumeDemo}
                title={isPlaying ? 'Pause Demo (Spacebar)' : 'Resume Demo (Spacebar)'}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>

              {/* Next Scene Button */}
              <button
                onClick={nextDemoShot}
                disabled={demoShotIndex === STORYBOARD.length - 1}
                title="Next Scene (Right Arrow)"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-slate-800"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Speed Mode Toggle */}
              <button
                onClick={() => setDemoSpeed(demoSpeed === 'normal' ? 'slow' : 'normal')}
                title="Toggle Reading Speed (Normal: ~12s per scene / Slow: ~18s per scene)"
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-mono cursor-pointer"
              >
                Speed: <span className="text-cyan-400 capitalize">{demoSpeed}</span>
              </button>

              {/* Exit Demo Button */}
              <button
                onClick={exitDemo}
                title="Exit Guided Demo (Escape)"
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

