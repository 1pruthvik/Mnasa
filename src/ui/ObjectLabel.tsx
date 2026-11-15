import React from 'react'
import { useStore } from '../store'

export const ObjectLabels: React.FC = () => {
  const labelsOn = useStore((s) => s.labelsOn)
  const pos = useStore((s) => s.labelPositions)
  const readingMode = useStore((s) => s.readingMode)
  const reducedMotion = useStore((s) => s.reducedMotion)
  const progress = useStore((s) => s.progress)

  // Labels hidden during readingMode, reducedMotion, or Ingenuity freeze (t approx 0.60 to 0.65)
  const isFreeze = progress >= 0.60 && progress <= 0.65
  if (!labelsOn || readingMode || reducedMotion || isFreeze) return null

  const activeIds = Object.keys(pos).slice(0, 2) // Hard cap: max 2 labels at once

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden" aria-hidden="true">
      {activeIds.map((id) => {
        const p = pos[id]
        if (!p || !p.visible) return null

        return (
          <div
            key={id}
            className="absolute transition-transform duration-75 flex items-center gap-1.5 font-mono text-[10px]"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            }}
          >
            {/* 45 degree leader dot and line */}
            <div className="w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-cyan-500/50" />
            <div className="bg-slate-900/90 border border-cyan-500/40 px-2 py-0.5 rounded shadow-lg backdrop-blur-sm text-cyan-200">
              <span className="font-bold uppercase tracking-wider">{id}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

