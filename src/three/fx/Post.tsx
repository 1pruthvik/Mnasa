// src/three/fx/Post.tsx
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useStore } from '../../store'
import Grain from './Grain'

export default function Post() {
  const lowTier = useStore(s => s.lowTier)
  const postEnabled = useStore(s => s.postEnabled)
  const activeChapter = useStore(s => s.activeChapter)

  if (lowTier !== 'high' || !postEnabled) return null

  const isInventory = activeChapter === 'ch06-inventory'

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.62}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      {!isInventory && <Grain opacity={0.035} />}
      <Vignette
        eskil={false}
        offset={0.32}
        darkness={isInventory ? 0.36 : 0.72}
      />
    </EffectComposer>
  )
}
