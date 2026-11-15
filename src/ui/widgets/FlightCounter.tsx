import React, { useState } from 'react'
import { PlaneTakeoff, Award } from 'lucide-react'

export const FlightCounter: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)

  const milestones = [
    { date: '19 Apr 2021', note: 'First powered, controlled flight on another planet (Wright Brothers moment)' },
    { date: '7 May 2021', note: 'Technology demonstration phase complete (Flight 5)' },
    { date: '8 Apr 2022', note: 'Distance record: 2,310 ft (704 m) in one hop' },
    { date: '13 Apr 2023', note: 'Flight 50 milestone reached' },
    { date: '5 Oct 2023', note: 'Altitude record: 78.7 ft (24.0 m) reached' },
    { date: '12 Oct 2023', note: 'Groundspeed record: 22.4 mph (10.0 m/s)' },
    { date: '18 Jan 2024', note: 'Flight 72: rotor tip damage sustained during landing' },
    { date: '25 Jan 2024', note: 'Mission declared complete; stationary monument in Jezero' },
  ]

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <PlaneTakeoff className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Ingenuity Flight Metrics
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-amber-300">14.4× Design Life</span>
      </div>

      {/* Planned vs Flown Bars (with intentional visual overflow on flown) */}
      <div className="space-y-2 mb-4 font-mono text-xs">
        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Planned Demo Flights:</span>
            <span className="text-slate-300 font-bold">5 flights</span>
          </div>
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-slate-500 rounded-full" style={{ width: '7%' }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
            <span>Actual Completed Flights:</span>
            <span className="text-amber-300 font-bold text-sm">72 flights</span>
          </div>
          {/* Track container with overflow visible to emphasize the massive triumph */}
          <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 relative overflow-visible">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-amber-400 to-amber-500 rounded-full shadow-lg shadow-amber-500/40"
              style={{ width: '100%' }}
            />
            <span className="absolute -right-2 -top-1.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full uppercase">
              +1,340%
            </span>
          </div>
        </div>
      </div>

      {/* Numerical Records Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Air Time</div>
          <div className="text-cyan-300 font-bold">128.8 min</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Distance Flown</div>
          <div className="text-cyan-300 font-bold">17.0 km (10.5 mi)</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Peak Altitude</div>
          <div className="text-amber-300 font-bold">24.0 m (78.7 ft)</div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-2 rounded-lg">
          <div className="text-[10px] text-slate-400 uppercase">Craft Mass</div>
          <div className="text-cyan-300 font-bold">1.8 kg (3.97 lb)</div>
        </div>
      </div>

      {/* Key Milestones Scrubber */}
      <div className="border-t border-slate-800 pt-2.5">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
          <Award className="w-3.5 h-3.5 text-cyan-400" /> Key Milestones:
        </div>
        <div className="flex flex-wrap gap-1">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMilestone(selectedMilestone === idx ? null : idx)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                selectedMilestone === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {m.date}
            </button>
          ))}
        </div>
        {selectedMilestone !== null && (
          <p className="mt-2 text-[10px] font-mono text-cyan-200 bg-slate-950/80 border border-slate-800 p-2 rounded leading-snug">
            {milestones[selectedMilestone].note}
          </p>
        )}
      </div>
    </div>
  )
}

