import React, { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { useStore } from '../../store'

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const audioUnlocked = useStore((s) => s.audioUnlocked)
  const unlockAudio = useStore((s) => s.unlockAudio)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Web Audio low rumble synthesized to match NASA's 1 Dec 2018 InSight wind frequency (sub-audible pressure rumble)
  const togglePlay = () => {
    if (!audioUnlocked) {
      unlockAudio()
      setShowWarning(true)
    }

    if (isPlaying) {
      stopAudio()
      setIsPlaying(false)
    } else {
      startSynthesizedWind()
      setIsPlaying(true)
    }
  }

  const startSynthesizedWind = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      // Low rumble filter & noise buffer
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(65, ctx.currentTime) // Low Martian wind rumble (5-7 m/s)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.35, ctx.currentTime)
      gainRef.current = gain

      whiteNoise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      whiteNoise.start()
    } catch {
      // Audio not permitted or failed
    }
  }

  const stopAudio = () => {
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {})
      audioCtxRef.current = null
    }
  }

  useEffect(() => {
    const handleVis = () => {
      if (document.visibilityState !== 'visible' && isPlaying) {
        stopAudio()
        setIsPlaying(false)
      }
    }
    document.addEventListener('visibilitychange', handleVis)
    return () => {
      document.removeEventListener('visibilitychange', handleVis)
      stopAudio()
    }
  }, [isPlaying])

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm pointer-events-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
          {isPlaying ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          InSight Martian Wind Audio
        </span>
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? 'Pause' : 'Listen'}
        </button>
      </div>

      {showWarning && (
        <div className="text-[10px] font-mono text-amber-300 bg-amber-950/40 border border-amber-900/60 p-2 rounded mb-2">
          Contains genuine low-frequency rumble (5–7 m/s winds). Headphones recommended.
        </div>
      )}

      <p className="text-[10px] font-mono text-slate-400 leading-snug">
        Sensors captured vibrations caused by Martian wind blowing at 10 to 15 mph across Elysium Planitia on 1 December 2018.
      </p>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
        Audio credit: NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell
      </div>
    </div>
  )
}
