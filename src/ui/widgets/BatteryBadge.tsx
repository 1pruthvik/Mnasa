import React from 'react';
import { BatteryCharging, AlertCircle } from 'lucide-react';

export const BatteryBadge: React.FC = () => {
  return (
    <div className="w-full my-4 p-3.5 rounded border border-amber-500/20 bg-amber-950/10 backdrop-blur font-mono text-xs">
      <div className="flex items-center gap-2 mb-2 text-amber-300 font-semibold tracking-wider text-[11px] uppercase">
        <BatteryCharging className="w-4 h-4 text-amber-400" />
        Power Architecture: Non-Rechargeable System
      </div>

      <div className="grid grid-cols-2 gap-2 my-2 text-[10px]">
        <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-white/50">Chemistry & Cells</span>
          <span className="text-white font-medium text-xs mt-1">2 × 36 V Silver-Zinc</span>
          <span className="text-white/40 text-[9px]">121 Ah per battery pack</span>
        </div>
        <div className="p-2 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
          <span className="text-white/50">Operational Budget</span>
          <span className="text-amber-300 font-medium text-xs mt-1">Primary Cells Only</span>
          <span className="text-white/40 text-[9px]">Zero solar panels / recharge capability</span>
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2 border-t border-amber-500/20 text-[10px] text-white/70 font-sans leading-relaxed">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <span>
          Designed intentionally for three lunar sorties only. Once depleted, the Lunar Roving Vehicle was parked 100 meters east of the Challenger descent stage so its RCA color TV camera could film the crew's lift-off.
        </span>
      </div>
    </div>
  );
};

export default BatteryBadge;
