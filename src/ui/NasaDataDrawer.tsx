// src/ui/NasaDataDrawer.tsx
import { NASA_SOURCES } from '../data/sources'
import { OBJECTS } from '../data/objects'

interface NasaDataDrawerProps {
  isOpen: boolean
  onClose: () => void
  onJumpToScene: (sceneId: string) => void
}

export default function NasaDataDrawer({ isOpen, onClose, onJumpToScene }: NasaDataDrawerProps) {
  if (!isOpen) return null

  const categories: Array<{ id: 'Archive' | 'Moon' | 'Mars' | 'Asteroids' | 'Interstellar'; label: string; count: number }> = [
    { id: 'Archive', label: 'Primary NASA Catalogues', count: 1 },
    { id: 'Moon', label: 'The Moon (Apollo & Surveyor)', count: 4 },
    { id: 'Mars', label: 'Mars (Landers, Rovers & Helicopter)', count: 5 },
    { id: 'Asteroids', label: 'Asteroid Belt (Ceres, Vesta, Eros)', count: 2 },
    { id: 'Interstellar', label: 'Interstellar & Heliocentric (Deep Space)', count: 2 },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(5, 7, 13, 0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 'min(580px, 92vw)',
          height: '100%',
          background: '#090d16',
          borderLeft: '1px solid rgba(223, 233, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
          color: '#dfe9ff',
          fontFamily: 'monospace',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid rgba(223, 233, 255, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: '#090d16',
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#ffcc00', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Official Catalogues & Archives
            </div>
            <h2 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 600, letterSpacing: '0.04em' }}>
              NASA Data & Resources
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#dfe9ff',
              padding: '6px 14px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '12px',
            }}
          >
            ESC ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.6, color: '#99aabb' }}>
            Every machine rendered in this 3D experience is verified against NASA's master registries. Click any official link below to review its NSSDCA master catalog record or mission parameters.
          </p>

          {categories.map((cat) => {
            const sources = NASA_SOURCES.filter((s) => s.category === cat.id)
            return (
              <div key={cat.id}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#ffcc00',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    borderBottom: '1px solid rgba(255, 204, 0, 0.25)',
                    paddingBottom: '4px',
                  }}
                >
                  {cat.label}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sources.map((src) => {
                    const matchedObj = OBJECTS.find((o) => o.id === src.id || o.name.includes(src.title) || o.shortName.includes(src.title))
                    return (
                      <div
                        key={src.id}
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(223, 233, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>{src.title}</span>
                          {src.nssdcaId && (
                            <span
                              style={{
                                fontSize: '10px',
                                background: 'rgba(255, 204, 0, 0.15)',
                                color: '#ffcc00',
                                padding: '2px 6px',
                                borderRadius: '2px',
                                border: '1px solid rgba(255, 204, 0, 0.3)',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              NSSDCA {src.nssdcaId}
                            </span>
                          )}
                        </div>

                        <p style={{ margin: 0, fontSize: '11px', color: '#8899aa', lineHeight: 1.5 }}>
                          {src.description}
                        </p>

                        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '11px',
                              color: '#60a5fa',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            ↗ Open NASA Archive
                          </a>
                          {matchedObj && (
                            <button
                              onClick={() => {
                                onJumpToScene(matchedObj.sceneId)
                                onClose()
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#a78bfa',
                                fontSize: '11px',
                                cursor: 'pointer',
                                padding: 0,
                                fontFamily: 'inherit',
                              }}
                            >
                              ◎ View in 3D
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
