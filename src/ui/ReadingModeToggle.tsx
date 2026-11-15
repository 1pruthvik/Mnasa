import React from 'react'
import { useStore } from '../store'
import { BookOpen, Eye } from 'lucide-react'

export const ReadingModeToggle: React.FC = () => {
  const readingMode = useStore((s) => s.readingMode)
  const toggleReadingMode = useStore((s) => s.toggleReadingMode)

  return (
    <button
      onClick={toggleReadingMode}
      title={readingMode ? 'Switch to 3D Immersive Descent' : 'Switch to Static Reading Mode'}
      className="fixed top-4 right-4 z-40 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-md text-xs font-mono font-medium flex items-center gap-1.5 shadow-xl transition-all cursor-pointer"
    >
      {readingMode ? (
        <>
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>3D View</span>
        </>
      ) : (
        <>
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Reading Mode</span>
        </>
      )}
    </button>
  )
}

