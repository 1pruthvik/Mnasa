import React, { useState } from 'react'
import { OBJECTS } from '../data/objects'
import { ArrowUpDown, Sparkles, MapPin, Calendar } from 'lucide-react'

interface InventoryTableProps {
  onSelectScene?: (sceneId: string) => void
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ onSelectScene }) => {
  const [sortKey, setSortKey] = useState<'chronological' | 'distance'>('chronological')
  const [filterWorking, setFilterWorking] = useState(false)

  let displayed = [...OBJECTS]

  if (filterWorking) {
    displayed = displayed.filter((o) =>
      o.subElements?.some((s) => s.state.includes('operational'))
    )
  }

  if (sortKey === 'chronological') {
    displayed.sort((a, b) => a.wentQuiet.localeCompare(b.wentQuiet))
  } else {
    displayed.sort((a, b) => (a.distanceFromEarthRank || 9) - (b.distanceFromEarthRank || 9))
  }

  return (
    <div className="w-full bg-[#f4f7fb] text-[#0d1420] rounded-2xl p-6 md:p-8 shadow-2xl border border-[#dfe3ea] my-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dfe3ea] pb-4 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">
            Complete Filed Archive
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
            The Full Inventory
          </h2>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterWorking(!filterWorking)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterWorking
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Still working
          </button>

          <button
            onClick={() => setSortKey(sortKey === 'chronological' ? 'distance' : 'chronological')}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortKey === 'chronological' ? 'Sorted by date went quiet' : 'Sorted by distance from Earth'}
          </button>
        </div>
      </div>

      {filterWorking && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs font-mono text-amber-900 mb-4">
          Nothing on this list that needed power is still running. Only passive laser retroreflectors continue to reflect light today.
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 text-slate-500 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 pr-4 font-bold">Object</th>
              <th className="py-2.5 px-3 font-bold">Where</th>
              <th className="py-2.5 px-3 font-bold">Coordinates</th>
              <th className="py-2.5 px-3 font-bold">Went Quiet</th>
              <th className="py-2.5 pl-3 font-bold">How</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {displayed.map((obj) => {
              const isConservative = obj.wentQuiet === '2010' || obj.wentQuiet === 'UNKNOWN'
              return (
                <tr
                  key={obj.id}
                  className="hover:bg-[#e8eef7] transition-colors group"
                >
                  <td className="py-3 pr-4 font-bold text-slate-900 group-hover:text-blue-700">
                    {onSelectScene ? <button className="text-left underline underline-offset-2 cursor-pointer" onClick={() => onSelectScene(obj.sceneId)}>{obj.name}</button> : obj.name}
                  </td>
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                    {obj.body}, {obj.site}
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono whitespace-nowrap">
                    {obj.lat !== undefined && obj.lon !== undefined
                      ? `${obj.lat >= 0 ? `${obj.lat}° N` : `${Math.abs(obj.lat)}° S`}, ${
                          obj.lon >= 0 ? `${obj.lon}° E` : `${Math.abs(obj.lon)}° W`
                        }`
                      : '—'}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-800">
                    <span className={isConservative ? 'border-b border-dotted border-slate-500' : ''}>
                      {obj.wentQuiet}
                    </span>
                  </td>
                  <td className="py-3 pl-3 text-slate-600 text-[11px] leading-relaxed">
                    {obj.quietReason}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout (Strict 320px responsive, no horizontal scroll) */}
      <div className="md:hidden space-y-3 font-mono text-xs">
        {displayed.map((obj) => (
          <div
            key={obj.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
          >
            <h3 className="font-bold text-slate-900 text-sm mb-1">{onSelectScene ? <button className="text-left underline underline-offset-2" onClick={() => onSelectScene(obj.sceneId)}>{obj.name}</button> : obj.name}</h3>
            <div className="space-y-1 text-[11px] text-slate-600 mb-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{obj.body} &bull; {obj.site}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-slate-800">Went quiet: {obj.wentQuiet}</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug border-t border-slate-100 pt-2">
              {obj.quietReason}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-[#dfe3ea] text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
        <span>Mission records and sources are available in the archive.</span>
        <span>The machines were abandoned. The addresses were not.</span>
      </div>
    </div>
  )
}
