import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import type { useGuidedStory } from '../scroll/useGuidedStory'

type Player = ReturnType<typeof useGuidedStory>
export function StoryControls({ player }: { player: Player }) {
  if (player.mode === 'scroll') return <div className="scroll-hint"><span>↓</span> SCROLL TO EXPLORE</div>
  return <div className="player" aria-label="Guided story controls">
    <div className="player-status"><span className="player-dot" /> {player.mode === 'playing' ? 'GUIDED STORY · PLAYING' : player.mode === 'finished' ? 'STORY COMPLETE' : 'GUIDED STORY · PAUSED'}</div>
    <div className="player-actions">
      <button onClick={() => player.navigate(-1)} aria-label="Previous scene"><SkipBack size={16}/></button>
      {player.mode === 'playing' ? <button onClick={player.pause} aria-label="Pause"><Pause size={16}/></button> : <button onClick={player.mode === 'finished' ? player.start : player.resume} aria-label={player.mode === 'finished' ? 'Replay' : 'Resume'}><Play size={16}/></button>}
      <button onClick={() => player.navigate(1)} aria-label="Next scene"><SkipForward size={16}/></button>
      <label>Speed <select aria-label="Playback speed" value={player.speed} onChange={e => player.setSpeed(Number(e.target.value))}><option value={0.75}>0.75×</option><option value={1}>1×</option><option value={1.5}>1.5×</option><option value={2}>2×</option></select></label>
      <button onClick={player.exit} aria-label="Exit guided story"><X size={16}/></button>
    </div>
  </div>
}

export function Welcome({ onPlay, onExplore, minutes, fallback }: { onPlay: () => void; onExplore: () => void; minutes: number; fallback: boolean }) {
  return <div className="welcome">
    <div className="welcome-stars" />
    <div className="welcome-top"><span>✳ &nbsp; THE QUIET EXPLORERS</span><span>AN INTERACTIVE SPACE ARCHIVE</span></div>
    <main className="welcome-content">
      <div className="welcome-eyebrow"><span /> A STORY ACROSS WORLDS</div>
      <h1>Abandoned,<br/><em>but not forgotten.</em></h1>
      <p>Across the Moon, Mars and beyond, the machines we left behind still have stories to tell.</p>
      <div className="welcome-actions">{!fallback && <button className="primary-action" onClick={onPlay}><Play size={15} fill="currentColor" /> Play guided demo <span>↗</span></button>}<button className={fallback ? "primary-action" : "secondary-action"} onClick={onExplore}>{fallback ? "Read the story" : "Scroll to explore"} <span>↓</span></button></div>{fallback && <p className="fallback-note">Reading mode is active because reduced motion is preferred or 3D is unavailable. The guided animation is not available in this mode.</p>}
      <div className="welcome-meta">17 SCENES &nbsp; / &nbsp; APPROX. {minutes} MIN GUIDED &nbsp; / &nbsp; NASA SOURCES</div>
    </main>
    <div className="welcome-bottom"><span>NASA SPACE APPS CHALLENGE</span><span>AN EXPERIMENT IN EXPLORATION &nbsp; ↗</span></div>
  </div>
}
