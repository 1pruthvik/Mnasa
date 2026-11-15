// src/three/chapters/Chapter06Inventory.tsx
import { useMemo } from 'react'
import { useStore } from '../../store'
import { useDisposeRegistry } from '../systems/dispose'
import PaperPlane from '../env/PaperPlane'
import StarField from '../env/StarField'

// 15 dots for the 15 NASA abandoned objects, arranged in a quiet constellation
const FIFTEEN_DOTS: [number, number][] = [
  // Moon objects
  [-4.2, 2.5],
  [-3.0, 1.8],
  [-2.2, 3.2],
  [-1.5, 1.0],
  [-0.6, 2.2],
  [-3.8, -0.5],
  // Mars objects
  [0.8, 1.5],
  [1.6, 2.8],
  [2.4, 1.0],
  [3.2, 2.2],
  [1.2, -1.2],
  [2.8, -0.8],
  // Belt & Deep Space objects
  [4.0, 0.5],
  [4.8, 1.8],
  [5.5, -0.2],
]

export default function Chapter06Inventory() {
  useDisposeRegistry()
  const progress = useStore(s => s.progress)

  // Scene 6.1: 0.860 .. 0.940 (Inventory table in DOM)
  // Scene 6.2: 0.940 .. 1.000 (Closing litany, stars dissolve back in)
  const isClosingStars = progress >= 0.940

  const dotPositions = useMemo(() => {
    const arr = new Float32Array(FIFTEEN_DOTS.length * 3)
    FIFTEEN_DOTS.forEach(([x, y], idx) => {
      arr[idx * 3 + 0] = x
      arr[idx * 3 + 1] = y
      arr[idx * 3 + 2] = -5 // placed in front of camera
    })
    return arr
  }, [])

  return (
    <group>
      {/* Flat ambient light only for graphic presentation */}
      <ambientLight intensity={0.4} color="#f4f7fb" />

      {/* Dark plane (#05070d) backdrop */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#05070d" />
      </mesh>

      {/* Reverse paper plane dissolve */}
      <PaperPlane reverse />

      {/* 15 faint constellation dots representing the 15 catalogued machines */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={FIFTEEN_DOTS.length}
            array={dotPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={4}
          sizeAttenuation={false}
          color="#dfe9ff"
          transparent
          opacity={0.35}
        />
      </points>

      {/* Scene 6.2: Final fade back to deep space stars behind the text */}
      {isClosingStars && (
        <group>
          <StarField density="sparse" />
        </group>
      )}
    </group>
  )
}
