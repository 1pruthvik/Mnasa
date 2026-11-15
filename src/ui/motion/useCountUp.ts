import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { animate } from 'animejs'
import { useStore } from '../../store'

export function useCountUp(
  el: RefObject<HTMLElement | null>,
  to: number,
  opts: { from?: number; ms?: number; decimals?: number; start?: number } = {}
) {
  const { from = 0, ms = 1400, decimals = 0 } = opts
  const reduced = useStore((s) => s.reducedMotion)
  const played = useRef(false)

  useEffect(() => {
    if (!el.current || played.current) return
    played.current = true
    const node = el.current
    if (reduced) {
      node.textContent = to.toFixed(decimals)
      return
    }

    const proxy = { v: from }
    animate(proxy, {
      v: to,
      duration: ms,
      ease: 'outQuad',
      onUpdate: () => {
        if (node) {
          node.textContent = proxy.v.toFixed(decimals)
        }
      },
    })
  }, [el, to, from, ms, decimals, reduced])
}
