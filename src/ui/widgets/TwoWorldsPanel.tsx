import React from 'react';
import { Globe, ShieldAlert, Sparkles, Orbit } from 'lucide-react';

export const TwoWorldsPanel: React.FC = () => {
  return (
    <div className="w-full my-4 p-3.5 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-white/90">
          <Orbit className="w-3.5 h-3.5 text-cyan-400" />
          Dawn Mission: Two Protoplanetary Worlds
        </span>
        <span className="text-[10px] text-white/40">Asteroid Belt</span>
      </div>

      {/* Vesta vs Ceres split card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {/* Vesta */}
        <div className="p-2.5 rounded bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-medium flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-stone-400" /> Vesta (2011–2012)
            </span>
            <span className="text-[9px] text-stone-300 bg-stone-800/80 px-1.5 py-0.5 rounded">Dry & Differentiated</span>
          </div>
          <p className="text-[10px] text-white/70 font-sans leading-relaxed">
            Rocky, differentiated protoplanet with basaltic lava crust, iron-nickel metallic core, and giant south polar impact basin Rheasilvia.
          </p>
        </div>

        {/* Ceres */}
        <div className="p-2.5 rounded bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Ceres (2015–2018)
            </span>
            <span className="text-[9px] text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded">Wet & Organic-Rich</span>
          </div>
          <p className="text-[10px] text-white/70 font-sans leading-relaxed">
            Dwarf planet with water-ice-rich mantle, sodium carbonate salt deposits inside Occator Crater, and active cryovolcanism history.
          </p>
        </div>
      </div>

      {/* Planetary Protection & Orbit Drag Refusal Note */}
      <div className="p-2.5 rounded bg-indigo-950/20 border border-indigo-500/20 text-[10px] font-sans">
        <div className="flex items-center gap-1.5 text-indigo-300 font-medium mb-1 font-mono uppercase tracking-wide text-[10px]">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
          Planetary Protection & Orbit Retention
        </div>
        <p className="text-white/70 leading-relaxed">
          NASA specifically steered Dawn into a stable resonance orbit around Ceres before propellant depletion. Dawn ran out of hydrazine on Oct 31, 2018. Under strict Planetary Protection protocols, Dawn will not crash into Ceres for at least 20 to 50 years to preserve potential subsurface organic reservoirs.
        </p>
      </div>
    </div>
  );
};

export default TwoWorldsPanel;

