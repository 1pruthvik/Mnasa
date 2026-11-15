import React from 'react'

export interface ReadoutItem {
  label: string
  value: string | number
  unit?: string
  accent?: 'beam' | 'amber' | 'star'
}

interface ReadoutProps {
  items: ReadoutItem[]
  title?: string
}

export const Readout: React.FC<ReadoutProps> = ({ items, title }) => {
  return (
    <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-xl p-4 text-xs font-mono shadow-xl">
      {title && (
        <div className="text-[10px] tracking-widest uppercase text-slate-400 mb-2 border-b border-slate-800 pb-1.5 font-bold">
          {title}
        </div>
      )}
      <dl className="grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <dt className="text-slate-400 text-[10px] uppercase tracking-wider">{item.label}</dt>
            <dd className="font-semibold text-slate-200 truncate">
              <span className={item.accent === 'amber' ? 'text-amber-400' : item.accent === 'star' ? 'text-white' : 'text-cyan-300'}>
                {item.value}
              </span>
              {item.unit && <span className="text-[10px] text-slate-400 ml-1">{item.unit}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
