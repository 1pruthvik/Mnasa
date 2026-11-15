import { useMemo, useCallback } from 'react'
import { createTimeline } from 'animejs'

export function useScrub(durationMs = 1000) {
  const tl = useMemo(() => createTimeline({ autoplay: false, defaults: { ease: 'linear' } }), [])
  const seek = useCallback(
    (u: number) => {
      tl.seek(Math.min(1, Math.max(0, u)) * durationMs)
    },
    [tl, durationMs]
  )
  return { tl, seek }
}
