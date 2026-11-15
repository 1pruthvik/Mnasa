import React from 'react'
import { MISSION_DOSSIERS } from '../data/missionDossiers'
import { Globe, Wrench, Lightbulb, History, ExternalLink, ShieldAlert } from 'lucide-react'

interface MissionCardProps {
  sceneId: string
}

export const MissionCard: React.FC<MissionCardProps> = ({ sceneId }) => {
  const dossier = MISSION_DOSSIERS[sceneId]
  if (!dossier) return null

  return (
    <article
      data-reveal
      aria-label={`Mission Brief: ${dossier.name}`}
      className="mt-3 bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4 shadow-xl text-slate-100 font-sans select-none"
    >
      {/* Header: Title & Evidence Tag */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-800 pb-2 mb-3">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
            {dossier.world} · {dossier.site}
          </span>
          <h3 className="text-base md:text-lg font-bold font-sans text-white">
            {dossier.name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
            {dossier.evidenceTag}
          </span>
        </div>
      </div>

      {/* 4 Storytelling Pillars */}
      <div className="space-y-2.5 text-xs">
        {/* 1. Why it went */}
        <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
          <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
              1. WHY IT WENT
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">{dossier.whyItWent}</p>
          </div>
        </div>

        {/* 2. How it worked */}
        <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
          <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-cyan-400 block mb-0.5">
              2. HOW THE HARDWARE WORKED
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">{dossier.howItWorked}</p>
          </div>
        </div>

        {/* 3. What it taught us */}
        <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-emerald-400 block mb-0.5">
              3. WHAT IT TAUGHT US
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">{dossier.whatItTaughtUs}</p>
          </div>
        </div>

        {/* 4. Afterward & status */}
        <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
          <History className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-sky-400 block mb-0.5">
              4. AFTERWARD & WHAT REMAINS
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">{dossier.afterward}</p>
          </div>
        </div>
      </div>

      {/* Footer: Official NASA Citation Link & Disclaimer */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
        <a
          href={dossier.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline underline-offset-2"
        >
          <ExternalLink className="w-3 h-3" />
          <span>Source: {dossier.sourceCitation}</span>
        </a>

        <div className="flex items-center gap-1 text-slate-500 text-[9px]">
          <ShieldAlert className="w-3 h-3" />
          <span>Independent Educational Project · Not Official NASA Software</span>
        </div>
      </div>
    </article>
  )
}
