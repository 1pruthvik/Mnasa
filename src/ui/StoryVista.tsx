import { useStore } from '../store'
import { beatAt } from '../contracts/beats'
import { screenIndex, shotBoundaries } from '../data/experience'

const boundaries = shotBoundaries()
export function StoryVista() {
  const progress = useStore(s => s.progress)
  const scene = beatAt(progress).sceneId
  const index = screenIndex(progress)
  const galaxy = scene === '0.1' && index < 2
  const opacity = Math.max(0, ...boundaries.filter(at => at !== .175 && at !== .4).map(at => Math.max(0, 1 - Math.abs(progress - at) / .0018)))
  return <>
    {galaxy && <div className={`vista vista-galaxy ${index === 1 ? 'vista-galaxy-closer' : ''}`} aria-hidden="true" />}
    <div className="transition-veil" style={{ opacity }} aria-hidden="true" />
  </>
}
