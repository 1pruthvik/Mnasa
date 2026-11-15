import React, { useState, useEffect } from 'react'
import {
  Compass,
  Radio,
  Pause,
  FastForward,
  Database,
} from 'lucide-react'
import type { CelestialBodyData } from '../types'
import { CELESTIAL_BODIES } from '../data/spaceData'

interface HUDProps {
  selectedBody: CelestialBodyData
  onSelectBody: (body: CelestialBodyData) => void
  speedMultiplier: number
  setSpeedMultiplier: (speed: number) => void
  onToggleApiDrawer: () => void
}

export const HUD: React.FC<HUDProps> = ({
  selectedBody,
  onSelectBody,
  speedMultiplier,
  setSpeedMultiplier,
  onToggleApiDrawer,
}) => {
  const [utcTime, setUtcTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'))
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 z-10 select-none">
      {/* Top Header Bar */}
      <header className="pointer-events-auto flex items-center justify-between bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-xl px-5 py-3 shadow-2xl shadow-cyan-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold tracking-widest text-white border-2 border-red-500 shadow-lg shadow-blue-500/50">
            NASA
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider text-cyan-400 uppercase flex items-center gap-2">
              Deep Space Mission Explorer
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono">
                v1.0.0
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ORBITAL TELEMETRY ENGINE &bull; {utcTime}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleApiDrawer}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
          >
            <Database className="w-4 h-4" />
            NASA Open Data / APOD
          </button>
        </div>
      </header>

      {/* Main middle area: Telemetry Card on Right */}
      <div className="flex justify-end items-center flex-1 my-4">
        <aside className="pointer-events-auto w-84 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl p-5 shadow-2xl text-slate-200 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3 flex justify-between items-start">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-400">
                Target Telemetry
              </span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {selectedBody.name}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-slate-800 border border-slate-700 text-cyan-300">
              {selectedBody.type}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedBody.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-slate-400 text-[10px] uppercase">Dist. from Sun</div>
              <div className="text-cyan-300 font-semibold truncate">{selectedBody.distanceFromSun}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-slate-400 text-[10px] uppercase">Orbital Period</div>
              <div className="text-cyan-300 font-semibold">{selectedBody.orbitalPeriod}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-slate-400 text-[10px] uppercase">Avg. Temp</div>
              <div className="text-amber-300 font-semibold">{selectedBody.temperature}</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg">
              <div className="text-slate-400 text-[10px] uppercase">Scale Radius</div>
              <div className="text-amber-300 font-semibold">{selectedBody.radius} units</div>
            </div>
          </div>

          {/* NASA Active Missions */}
          <div>
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              NASA Key Missions
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {selectedBody.nasaMissions.map((m) => (
                <span
                  key={m}
                  className="px-2 py-1 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-200 text-[11px]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Bar: Orbit Controls & Target Quick-Select */}
      <footer className="pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl px-5 py-3 shadow-2xl">
        {/* Celestial body selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Target:
          </span>
          {CELESTIAL_BODIES.map((body) => {
            const active = selectedBody.id === body.id
            return (
              <button
                key={body.id}
                onClick={() => onSelectBody(body)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: body.color }}
                ></span>
                {body.name}
              </button>
            )
          })}
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1">Time Warp:</span>
          <button
            onClick={() => setSpeedMultiplier(0)}
            title="Pause"
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              speedMultiplier === 0
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setSpeedMultiplier(1)}
            title="Realtime (1x)"
            className={`px-2 py-1 rounded text-xs font-mono border transition-colors cursor-pointer ${
              speedMultiplier === 1
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1x
          </button>
          <button
            onClick={() => setSpeedMultiplier(3)}
            title="Fast (3x)"
            className={`px-2 py-1 rounded text-xs font-mono border transition-colors cursor-pointer ${
              speedMultiplier === 3
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3x
          </button>
          <button
            onClick={() => setSpeedMultiplier(10)}
            title="Warp (10x)"
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              speedMultiplier === 10
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  )
}
