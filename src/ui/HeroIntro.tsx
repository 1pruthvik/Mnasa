import React from 'react'
import { useStore } from '../store'
import { getTotalDemoDuration } from '../data/storyboard'
import { Play, ChevronDown, BookOpen, Sparkles } from 'lucide-react'

interface HeroIntroProps {
  onScrollToExplore: () => void
}

export const HeroIntro: React.FC<HeroIntroProps> = ({ onScrollToExplore }) => {
  const startDemo = useStore((s) => s.startDemo)
  const demoSpeed = useStore((s) => s.demoSpeed)
  const toggleReadingMode = useStore((s) => s.toggleReadingMode)
  const readingMode = useStore((s) => s.readingMode)

  const totalDurationSeconds = getTotalDemoDuration(demoSpeed)
  const minutes = Math.floor(totalDurationSeconds / 60)
  const seconds = totalDurationSeconds % 60

  return (
    <div className="pointer-events-auto flex flex-col gap-5 text-slate-100 max-w-xl animate-in fade-in duration-500">
      {/* Editorial Badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 shadow-sm">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>NASA Space Apps 2026</span>
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          Independent Educational Atlas
        </span>
      </div>

      {/* Main Exhibition Title */}
      <header className="space-y-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display leading-[1.1] uppercase">
          Abandoned <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-amber-200">
            But Not Forgotten
          </span>
        </h1>
        <p className="text-sm sm:text-base font-mono text-cyan-300 font-semibold tracking-wide">
          The Atlas of Quiet Explorers
        </p>
      </header>

      {/* Required One-Sentence Orientation */}
      <p className="text-base sm:text-lg font-serif text-slate-200/95 leading-relaxed drop-shadow-md">
        Explore the machines left across space, and the discoveries they made possible.
      </p>

      {/* Secondary Context Paragraph */}
      <p className="text-xs sm:text-sm font-sans text-slate-400 leading-relaxed">
        Around eight planets and dozens of moons, human machines sit in the silence of deep space.
        They are not garbage—they are the most patient scientific archive ever built, remaining exactly
        where the paperwork says they are.
      </p>

      {/* Two Prominent Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        {/* Play Guided Demo Button */}
        <button
          onClick={() => startDemo(true)}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-950/50 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Play guided demo</span>
          <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-slate-950/20 text-slate-950">
            {minutes}m {seconds}s
          </span>
        </button>

        {/* Scroll to Explore Button */}
        <button
          onClick={onScrollToExplore}
          className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer border border-slate-700/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
          <span>Scroll to explore</span>
        </button>
      </div>

      {/* Tertiary Accessibility Option */}
      <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
        <button
          onClick={toggleReadingMode}
          className="hover:text-amber-300 underline cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{readingMode ? 'Switch to 3D View' : 'Read without 3D (Accessible Reading Mode)'}</span>
        </button>
      </div>
    </div>
  )
}
