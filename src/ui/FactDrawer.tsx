import React from 'react'
import { FileText, ExternalLink } from 'lucide-react'

export const FactDrawer: React.FC = () => {
  return (
    <div
      className="bg-[#f4f7fb] text-[#0d1420] border border-[#dfe3ea] rounded-xl p-5 shadow-2xl max-w-md pointer-events-auto select-text font-mono"
      style={{ userSelect: 'text' }}
    >
      <div className="flex items-center justify-between border-b border-[#dfe3ea] pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-700" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-800">
            NSSDCA Master Catalog Record
          </span>
        </div>
        <a
          href="https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-blue-700 hover:text-blue-900 flex items-center gap-1 font-semibold"
        >
          NASA Source <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <dl className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs mb-4">
        <div>
          <dt className="text-[10px] text-slate-500 uppercase tracking-wider">NSSDCA/COSPAR ID</dt>
          <dd className="font-bold text-slate-900">1969-059C</dd>
        </div>
        <div>
          <dt className="text-[10px] text-slate-500 uppercase tracking-wider">Launch Date</dt>
          <dd className="font-semibold text-slate-900">1969-07-16</dd>
        </div>
        <div>
          <dt className="text-[10px] text-slate-500 uppercase tracking-wider">Launch Vehicle</dt>
          <dd className="font-semibold text-slate-900">Saturn 5</dd>
        </div>
        <div>
          <dt className="text-[10px] text-slate-500 uppercase tracking-wider">Total Mass</dt>
          <dd className="font-semibold text-slate-900">15,103 kg</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[10px] text-slate-500 uppercase tracking-wider">Alternate Names</dt>
          <dd className="text-[11px] text-slate-800">LM-5 &bull; Eagle &bull; Apollo11EASEP &bull; 04041</dd>
        </div>
      </dl>

      {/* Verbatim quote from archive in amber box */}
      <div className="p-3 bg-amber-50/90 border border-amber-300/80 rounded-lg text-xs leading-relaxed text-amber-950 mb-3">
        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-800 block mb-1">
          Catalog Record · Mission Status
        </span>
        “The fate of the LM is not known, but it is assumed that it crashed into the lunar surface sometime within the following 1 to 4 months.”
      </div>

      <div className="text-[10px] text-slate-600 border-t border-[#dfe3ea] pt-2 italic">
        Where NASA says “not known”, our website says “not known”.
      </div>
    </div>
  )
}
