import React from 'react';
import { Gauge, Footprints, Car, Radio } from 'lucide-react';

export const SpeedComparison: React.FC = () => {
  return (
    <div className="w-full my-4 p-3.5 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-white/90">
          <Gauge className="w-3.5 h-3.5 text-amber-400" />
          Touchdown Velocity: NEAR Shoemaker on Eros
        </span>
        <span className="text-[10px] text-amber-300">Feb 12, 2001</span>
      </div>

      <p className="text-[10px] text-white/70 font-sans leading-relaxed mb-3">
        NEAR was designed exclusively as an orbiter without landing gear. At mission end, operators performed a 5-burn descent to attempt the softest possible contact with asteroid 433 Eros.
      </p>

      {/* Velocity comparison bars */}
      <div className="space-y-2.5">
        {/* Human walking */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-white/60 mb-0.5">
            <span className="flex items-center gap-1.5"><Footprints className="w-3 h-3 text-cyan-400" /> Human Brisk Walk</span>
            <span>5.0 km/h (1.4 m/s)</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400/80 rounded-full" style={{ width: '5%' }} />
          </div>
        </div>

        {/* NEAR Shoemaker */}
        <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
          <div className="flex justify-between items-center text-[11px] font-semibold text-amber-300 mb-0.5">
            <span className="flex items-center gap-1.5"><Radio className="w-3 h-3 text-amber-400" /> NEAR Touchdown on Eros</span>
            <span>6.4 km/h (1.8 m/s)</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: '6.4%' }} />
          </div>
          <div className="text-[9px] text-amber-200/70 font-sans mt-1">
            Gentle enough that the spacecraft survived impact and returned science data for 16 days from the surface.
          </div>
        </div>

        {/* Automobile */}
        <div>
          <div className="flex justify-between items-center text-[10px] text-white/60 mb-0.5">
            <span className="flex items-center gap-1.5"><Car className="w-3 h-3 text-stone-400" /> Highway Automobile</span>
            <span>100 km/h (27.8 m/s)</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white/30 rounded-full" style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedComparison;
