import { useStore } from '../store'

const CHAPTERS = [
  { title: 'Space', t: 0 }, { title: 'Moon', t: .175 }, { title: 'Mars', t: .4 },
  { title: 'Asteroids', t: .66 }, { title: 'Beyond', t: .76 }, { title: 'Archive', t: .86 },
]
export function ProgressRail({ onScrollTo }: { onScrollTo?: (t: number) => void }) {
  const progress = useStore(s => s.progress)
  let active = 0
  CHAPTERS.forEach((chapter, index) => { if (progress >= chapter.t) active = index })
  return <nav aria-label="Story chapters" className="chapter-rail">
    <div className="chapter-line"><div style={{ width: `${progress * 100}%` }}/></div>
    {CHAPTERS.map((chapter, i) => <button key={chapter.title} onClick={() => onScrollTo?.(chapter.t)} aria-current={i === active ? 'step' : undefined} className={i === active ? 'active' : ''}><span className="chapter-index">0{i + 1}</span><span>{chapter.title}</span><span className="chapter-marker"/></button>)}
  </nav>
}
