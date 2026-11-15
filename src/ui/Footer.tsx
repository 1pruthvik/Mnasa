import React from 'react'
import { useStore } from '../store'
import { Map, ShieldCheck, Tag } from 'lucide-react'

interface FooterProps {
  onOpenCredits: () => void
  onOpenMap: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenCredits, onOpenMap }) => {
  const labelsOn = useStore((s) => s.labelsOn)
  const setLabelsOn = useStore((s) => s.setLabelsOn)

  return (
    <footer className="fixed bottom-14 left-0 right-0 z-20 pointer-events-none px-4 py-1.5 flex justify-between items-center text-[10px] font-mono text-slate-400 select-none">
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => setLabelsOn(!labelsOn)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer ${
            labelsOn ? 'text-cyan-300 border-cyan-800/80' : 'text-slate-500'
          }`}
        >
          <Tag className="w-3 h-3" />
          <span>{labelsOn ? 'Labels On' : 'Labels Off'}</span>
        </button>

        <button
          onClick={onOpenMap}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Map className="w-3 h-3 text-cyan-400" />
          <span>Atlas Maps</span>
        </button>
      </div>

      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={onOpenCredits}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>NASA Sources & Credits</span>
        </button>
      </div>
    </footer>
  )
}
