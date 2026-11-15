import React from 'react';
import { Compass, Sun, Shield, HelpCircle } from 'lucide-react';

export const KayakExplainer: React.FC = () => {
  return (
    <div className="w-full my-4 p-3.5 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-amber-300">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          The "Kayak" Technique: K2 Photon Balancing
        </span>
        <span className="text-[10px] text-white/50">Two-Wheel Mode</span>
      </div>

      <div className="p-2.5 rounded bg-white/5 border border-white/5 mb-3 font-sans text-[10px] text-white/70 leading-relaxed">
        <div className="flex items-center gap-1.5 font-mono text-white text-[11px] font-medium mb-1">
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          How do you steer a space telescope when reaction wheels fail?
        </div>
        After Reaction Wheel 2 and Wheel 4 seized, Kepler was left with only two working wheels—insufficient for 3-axis stabilization. Engineers turned the spacecraft into the Sun along the ecliptic plane.
      </div>

      {/* Physics diagram cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-1.5 font-medium text-amber-300 mb-1">
            <Sun className="w-3 h-3 text-amber-400" />
            Solar Radiation Pressure
          </div>
          <p className="text-white/70 font-sans leading-relaxed">
            Photons striking the symmetrical solar panels exerted equal and opposite torque, acting as an intangible "virtual third reaction wheel".
          </p>
        </div>

        <div className="p-2 rounded bg-cyan-950/20 border border-cyan-500/20">
          <div className="flex items-center gap-1.5 font-medium text-cyan-300 mb-1">
            <Shield className="w-3 h-3 text-cyan-400" />
            The Kayak in the Rapids
          </div>
          <p className="text-white/70 font-sans leading-relaxed">
            Much like a kayaker pointing their paddle directly into the river current to hold station, Kepler rode sunlight to discover 500+ more exoplanets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KayakExplainer;
