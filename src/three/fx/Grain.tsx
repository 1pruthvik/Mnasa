// src/three/fx/Grain.tsx
import { Noise } from '@react-three/postprocessing'

interface GrainProps {
  opacity?: number
}

export default function Grain({ opacity = 0.035 }: GrainProps) {
  return <Noise premultiply opacity={opacity} />
}
