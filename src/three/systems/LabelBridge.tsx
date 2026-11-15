// src/three/systems/LabelBridge.tsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useStore } from '../../store'
import { projectToScreen, LABEL_IDS } from './project'

export default function LabelBridge() {
  const { camera, size } = useThree()
  const set = useStore(s => s.setLabelPositions)
  const accRef = useRef(0)

  useFrame((_, dt) => {
    accRef.current += dt
    if (accRef.current < 1 / 20) return // 20 Hz
    accRef.current = 0

    const next: Record<string, { x: number; y: number; visible: boolean }> = {}
    for (const id of LABEL_IDS) {
      const p = projectToScreen(id, camera, size)
      if (p) next[id] = p
    }
    set(next)
  })

  return null
}
