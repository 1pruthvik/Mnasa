import React, { useState } from 'react';
import { Sun, Wind, Sliders } from 'lucide-react';

export const DustSlider: React.FC = () => {
  const [sliderVal, setSliderVal] = useState<number>(50); // 0 = Heavily Dusted, 100 = Wind Cleaned

  // Interpolated metrics
  const powerWatts = Math.round(375 + (sliderVal / 100) * (615 - 375));
  const dustFactor = ((1 - (sliderVal / 100) * 0.45) * 100).toFixed(0);

  return (
    <div className="w-full my-4 p-3.5 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-white/90">
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          Pancam Solar Array Cleaning (Sol 3613)
        </span>
        <span className="text-[10px] text-amber-300">March 2014 Event</span>
      </div>

      {/* Before / After Panel Simulation */}
      <div className="relative h-24 rounded bg-stone-900 overflow-hidden border border-white/10 my-2">
        {/* Under layer (Cleaned Solar Cells) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 flex flex-col justify-center px-4">
          <div className="text-[11px] font-semibold text-cyan-300">Post-Wind Cleaning (March 2014)</div>
          <div className="text-[10px] text-cyan-200/70 font-sans mt-0.5">
            Atmospheric vortices swept solar cells clear, elevating power to ~615 Wh/sol.
          </div>
        </div>

        {/* Top layer (Dusted Solar Cells, clipped by sliderVal) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-950/95 via-stone-900/90 to-yellow-950/90 flex flex-col justify-center px-4 border-r-2 border-white"
          style={{ width: `${100 - sliderVal}%` }}
        >
          <div className="text-[11px] font-semibold text-amber-400">Pre-Clean Dusted (Sol 3600)</div>
          <div className="text-[10px] text-amber-200/70 font-sans mt-0.5">
            Atmospheric regolith fines obscuring silicon arrays, degrading power to ~375 Wh/sol.
          </div>
        </div>
      </div>

      {/* Scrub bar */}
      <div className="space-y-1 my-3">
        <div className="flex justify-between items-center text-[10px] text-white/50">
          <span className="flex items-center gap-1">
            <Sliders className="w-3 h-3" /> Drag to inspect wind cleaning effect:
          </span>
          <span className="text-white font-medium">{sliderVal}% Cleaned</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[9px] text-white/40">
          <span>Heavily Dusted</span>
          <span>Passing Dust Devil</span>
          <span>Vortex Swept</span>
        </div>
      </div>

      {/* Real-time telemetry readouts */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px]">
        <div className="p-2 rounded bg-white/5 flex items-center justify-between">
          <span className="text-white/50 flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" /> Daily Power Output:
          </span>
          <span className="text-white font-medium">{powerWatts} Wh/sol</span>
        </div>
        <div className="p-2 rounded bg-white/5 flex items-center justify-between">
          <span className="text-white/50">Dust Factor:</span>
          <span className="text-white font-medium">{dustFactor}% opacity</span>
        </div>
      </div>
    </div>
  );
};

export default DustSlider;
