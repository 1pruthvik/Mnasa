import React from 'react'
import { useStore } from '../../store'
import { Sparkles } from 'lucide-react'

export const StillWorkingToggle: React.FC = () => {
  const filterWorkingOnly = useStore((s) => s.filterWorkingOnly)
  const setFilterWorkingOnly = useStore((s) => s.setFilterWorkingOnly)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md max-w-xs pointer-events-auto">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="still-working-chk" className="flex items-center gap-2 cursor-pointer select-none">
          <Sparkles className={`w-4 h-4 ${filterWorkingOnly ? 'text-amber-400' : 'text-slate-400'}`} />
          <span className="text-xs font-mono font-medium text-slate-200">Show only what still works</span>
        </label>
        <button
          id="still-working-chk"
          role="switch"
          aria-checked={filterWorkingOnly}
          onClick={() => setFilterWorkingOnly(!filterWorkingOnly)}
          className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 cursor-pointer ${
            filterWorkingOnly ? 'bg-amber-600' : 'bg-slate-700'
          }`}
        >
          <div
            className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform duration-300 ${
              filterWorkingOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
      {filterWorkingOnly ? (
        <p className="mt-2 text-[11px] font-mono text-amber-300 border-t border-slate-800 pt-1.5 leading-snug">
          One mirror. No power. Still there.
        </p>
      ) : (
        <p className="mt-1.5 text-[10px] font-mono text-slate-400 leading-snug">
          Toggle to highlight passive retroreflectors still operational today.
        </p>
      )}
    </div>
  )
}
