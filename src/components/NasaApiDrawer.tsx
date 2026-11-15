import React, { useState, useEffect } from 'react'
import { X, Sparkles, AlertCircle, RefreshCw, Radio } from 'lucide-react'

interface NasaApiDrawerProps {
  isOpen: boolean
  onClose: () => void
}

interface ApodData {
  title: string
  date: string
  explanation: string
  url: string
  media_type: string
}

export const NasaApiDrawer: React.FC<NasaApiDrawerProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('DEMO_KEY')
  const [apod, setApod] = useState<ApodData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchApod = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      if (!res.ok) {
        throw new Error(`NASA API returned status ${res.status}`)
      }
      const data = await res.json()
      setApod(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch NASA APOD data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !apod && !loading) {
      void fetchApod()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border-l border-cyan-500/30 h-full p-6 flex flex-col justify-between overflow-y-auto text-slate-200 shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white tracking-wide">
                NASA Open APIs Hub
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* API Key Config */}
          <div className="my-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <label className="text-xs font-mono text-cyan-300">NASA API Key:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter NASA API Key or DEMO_KEY"
                className="flex-1 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={fetchApod}
                disabled={loading}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-xs font-mono font-bold text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Fetch
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              Default uses NASA's <code>DEMO_KEY</code>. Free API keys available at api.nasa.gov.
            </span>
          </div>

          {/* APOD Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              Astronomy Picture of the Day (APOD)
            </h3>

            {loading && (
              <div className="p-8 text-center text-cyan-400 font-mono text-sm animate-pulse">
                Establishing NASA Telemetry Link...
              </div>
            )}

            {error && (
              <div className="p-4 rounded-lg bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {apod && !loading && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden p-4 space-y-3">
                {apod.media_type === 'image' && (
                  <img
                    src={apod.url}
                    alt={apod.title}
                    className="w-full h-56 object-cover rounded-lg border border-slate-800"
                  />
                )}
                <div>
                  <h4 className="font-bold text-white text-base">{apod.title}</h4>
                  <p className="text-[11px] font-mono text-cyan-400">{apod.date}</p>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto pr-1">
                  {apod.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
          Ready for NASA Space Apps &bull; Built with React Three Fiber & NASA APIs
        </div>
      </div>
    </div>
  )
}

