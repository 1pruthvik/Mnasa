import React from 'react';
import { Ruler, Radio, Clock } from 'lucide-react';

interface SurveyorRulerProps {
  progress?: number;
}

export const SurveyorRuler: React.FC<SurveyorRulerProps> = () => {
  return (
    <div className="w-full my-4 p-4 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs text-white/80">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-white/90">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-amber-300">
          <Ruler className="w-3.5 h-3.5 text-amber-400" />
          Proximity Separation: 180 Meters
        </span>
        <span className="text-[10px] text-white/50">Ocean of Storms (1969)</span>
      </div>

      {/* Visual scale ruler */}
      <div className="relative py-2 mb-4">
        <div className="flex justify-between items-center text-[10px] text-white/40 mb-1">
          <span>Intrepid (Apollo 12 LM)</span>
          <span>180 m</span>
          <span>Surveyor 3 Crater</span>
        </div>
        <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-amber-400/80 via-white/40 to-cyan-400/80 rounded-full" />
        </div>
        <div className="flex justify-between items-center text-[9px] text-white/40 mt-1">
          <span className="text-amber-300">0 m (Targeted Touchdown)</span>
          <span className="text-white/60">Walkable Traverse</span>
          <span className="text-cyan-300">180 m (April 1967 Site)</span>
        </div>
      </div>

      {/* 1967 vs 1977 split card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5">
        <div className="p-2.5 rounded bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-white font-medium mb-1">
            <Radio className="w-3 h-3 text-cyan-400" />
            <span>Surveyor 3 (April 1967)</span>
          </div>
          <p className="text-[10px] text-white/60 leading-relaxed font-sans">
            Robotic probe resting in crater shadow. Conrad & Bean retrieved its television camera and scoop in Nov 1969 to inspect 2.5 years of lunar weathering.
          </p>
        </div>

        <div className="p-2.5 rounded bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-white font-medium mb-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>ALSEP Package (1969–1977)</span>
          </div>
          <p className="text-[10px] text-white/60 leading-relaxed font-sans">
            Nuclear-powered SNAP-27 science station deployed beside LM. Ran for nearly 8 years until NASA officially powered down the network on Sept 30, 1977.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyorRuler;

