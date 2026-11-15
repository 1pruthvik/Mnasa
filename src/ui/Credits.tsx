import React, { useEffect } from 'react'
import { SOURCES } from '../data/sources'
import { UI_COPY } from '../data/ui-copy'
import { X, ShieldCheck } from 'lucide-react'

interface CreditsProps {
  isOpen: boolean
  onClose: () => void
}

export const Credits: React.FC<CreditsProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#f4f7fb] text-[#0d1420] border border-[#dfe3ea] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl font-mono text-xs select-text">
        <div className="flex items-center justify-between border-b border-[#dfe3ea] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider font-display">
              NASA Sources, Credits & Disclaimers
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider mb-2">
              Mission Data Provenance (15 Canonical NASA Records)
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 text-[11px]">
              {SOURCES.map((s, idx) => (
                <li key={idx} className="leading-snug">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 underline font-medium"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#dfe3ea] pt-3 space-y-2">
            <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
              Audio & Imagery Credits
            </h3>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              <strong>Martian Wind Recording:</strong> {UI_COPY.audio.credit}. Captured by InSight SEIS on 1 December 2018.
            </p>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              <strong>Opportunity Pancam Self-Portrait:</strong> Credit: NASA/JPL-Caltech/Cornell/Arizona State Univ.
            </p>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              <strong>Apollo 11 Plaque Inscription:</strong> NSSDCA 1969-059C.
            </p>
          </div>

          <div className="border-t border-[#dfe3ea] pt-3 space-y-2">
            <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
              Technical & Visual Representation Notes
            </h3>
            <p className="text-slate-600 italic text-[11px]">
              {UI_COPY.descent.note}
            </p>
            <p className="text-slate-600 italic text-[11px]">
              {UI_COPY.map.note}
            </p>
          </div>

          {/* Verbatim Non-Endorsement Notice */}
          <div className="border-t border-[#dfe3ea] pt-3 bg-slate-100 p-3 rounded-lg text-[10px] text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900 uppercase block mb-1">Non-Endorsement Notice</span>
            {UI_COPY.footer.disclaimer}
          </div>
        </div>
      </div>
    </div>
  )
}
