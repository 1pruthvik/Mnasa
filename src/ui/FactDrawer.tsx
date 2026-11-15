// src/ui/FactDrawer.tsx
import { useMemo } from 'react'
import { OBJECTS } from '../data/objects'
import { useStore } from '../store'

export default function FactDrawer() {
  const activeSceneId = useStore(s => s.activeSceneId)
  const progress = useStore(s => s.progress)

  // Find the mission object that matches the current active scene
  const obj = useMemo(() => {
    return OBJECTS.find(o => o.sceneId === activeSceneId) || null
  }, [activeSceneId])

  // Only show FactDrawer once past Milky Way / Sun entry (progress > 0.14) and before inventory close
  if (!obj || progress < 0.14 || progress > 0.94) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: '24px',
        top: '80px',
        maxWidth: '360px',
        background: 'rgba(9, 13, 22, 0.88)',
        border: '1px solid rgba(223, 233, 255, 0.18)',
        borderRadius: '6px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        padding: '18px 20px',
        zIndex: 25,
        fontFamily: 'monospace',
        color: '#dfe9ff',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '10px', color: '#ffcc00', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          NASA CATALOGUE RECORD
        </span>
        <span
          style={{
            fontSize: '9px',
            background: 'rgba(255, 204, 0, 0.15)',
            color: '#ffcc00',
            padding: '2px 6px',
            borderRadius: '2px',
            border: '1px solid rgba(255, 204, 0, 0.3)',
          }}
        >
          {obj.status.toUpperCase()}
        </span>
      </div>

      <div style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '0.02em', color: '#ffffff', marginBottom: '4px' }}>
        {obj.name}
      </div>

      <div style={{ fontSize: '11px', color: '#8899aa', marginBottom: '12px' }}>
        {obj.site} · {obj.body}
        {obj.lat !== undefined && obj.lon !== undefined && (
          <span style={{ display: 'block', color: '#60a5fa', marginTop: '2px' }}>
            {obj.lat > 0 ? `${obj.lat.toFixed(4)}° N` : `${Math.abs(obj.lat).toFixed(4)}° S`},{' '}
            {obj.lon > 0 ? `${obj.lon.toFixed(4)}° E` : `${Math.abs(obj.lon).toFixed(4)}° W`}
          </span>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(223, 233, 255, 0.1)', paddingTop: '10px', marginBottom: '10px' }}>
        <div style={{ fontSize: '10px', color: '#ff9966', textTransform: 'uppercase', marginBottom: '4px' }}>
          Final Condition
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: '#c5d0de', lineHeight: 1.5 }}>
          {obj.quietReason}
        </p>
      </div>

      <div style={{ borderTop: '1px solid rgba(223, 233, 255, 0.1)', paddingTop: '10px' }}>
        <div style={{ fontSize: '10px', color: '#8899aa', textTransform: 'uppercase', marginBottom: '6px' }}>
          Documented Facts
        </div>
        <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '11px', color: '#a0b4c8', lineHeight: 1.5 }}>
          {obj.hardFacts.slice(0, 3).map((f, idx) => (
            <li key={idx} style={{ marginBottom: '4px' }}>{f}</li>
          ))}
        </ul>
      </div>

      {obj.sourceUrls.length > 0 && (
        <div style={{ marginTop: '12px', textAlign: 'right' }}>
          <a
            href={obj.sourceUrls[0]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '10px', color: '#60a5fa', textDecoration: 'none' }}
          >
            ↗ Verify on NASA.gov
          </a>
        </div>
      )}
    </div>
  )
}
