import React, { useState } from 'react';
import { Microscope, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

interface Instrument {
  name: string;
  code: string;
  status: 'operational' | 'inoperable';
  note: string;
}

const VIKING_PAYLOAD: Instrument[] = [
  { name: 'Facsimile Cameras (Stereo)', code: 'CAM-1/2', status: 'operational', note: 'Sent first clear color panoramas from the Martian surface.' },
  { name: 'GCMS (Gas Chromatograph / Mass Spec)', code: 'GCMS', status: 'operational', note: 'Detected water and CO2; found no organic compounds at landing site.' },
  { name: 'Biology Suite (3 metabolic tests)', code: 'BIO', status: 'operational', note: 'Conducted Pyrolytic, Labeled Release, & Gas Exchange tests.' },
  { name: 'X-Ray Fluorescence Spectrometer', code: 'XRFS', status: 'operational', note: 'Detailed elemental mineralogy of Martian soil fines.' },
  { name: 'Meteorology Boom Sensor', code: 'MET', status: 'operational', note: 'Recorded daily atmospheric cycles: pressure, wind vector, temperature.' },
  { name: 'Surface Seismometer', code: 'SEIS', status: 'inoperable', note: 'Protective locking pin failed to release on Viking 1; remained locked.' },
  { name: 'Surface Sampler & Magnet Array', code: 'MECH', status: 'operational', note: 'Articulated arm scooped regolith and gathered magnetic grains.' },
];

export const VikingInstruments: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(5); // Default to Seismometer to highlight the script note

  return (
    <div className="w-full my-4 p-3.5 rounded border border-white/10 bg-black/40 backdrop-blur font-mono text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-semibold text-white/90">
          <Microscope className="w-3.5 h-3.5 text-cyan-400" />
          Viking Lander 1 Science Suite (7 Instruments)
        </span>
        <span className="text-[10px] text-white/40">Chryse Planitia</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="space-y-1">
          {VIKING_PAYLOAD.map((inst, idx) => (
            <button
              key={inst.code}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`w-full text-left p-1.5 px-2 rounded flex items-center justify-between text-[11px] transition-colors ${
                selectedIdx === idx
                  ? 'bg-white/15 text-white font-medium border border-white/20'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                {inst.status === 'operational' ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                )}
                <span className="truncate">{inst.name}</span>
              </div>
              <ChevronRight className={`w-3 h-3 transition-transform ${selectedIdx === idx ? 'rotate-90 text-white' : 'text-white/30'}`} />
            </button>
          ))}
        </div>

        {/* Selected Instrument Detail */}
        <div className="p-2.5 rounded bg-white/5 border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-white/40">{VIKING_PAYLOAD[selectedIdx].code}</span>
              <span
                className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                  VIKING_PAYLOAD[selectedIdx].status === 'operational'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {VIKING_PAYLOAD[selectedIdx].status === 'operational' ? 'Active on Mars' : 'Failed to Uncage'}
              </span>
            </div>
            <h4 className="text-white font-medium text-xs mb-2 font-sans">{VIKING_PAYLOAD[selectedIdx].name}</h4>
            <p className="text-[10px] text-white/70 font-sans leading-relaxed">
              {VIKING_PAYLOAD[selectedIdx].note}
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-white/10 text-[9px] text-white/40">
            Source: NASA NSSDCA Viking Lander 1 Experiment Catalog
          </div>
        </div>
      </div>
    </div>
  );
};

export default VikingInstruments;

