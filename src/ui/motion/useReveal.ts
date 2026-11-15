import { useEffect } from 'react'
import type { RefObject } from 'react'
import { animate, stagger } from 'animejs'
import { useStore } from '../../store'

export function useReveal(ref: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  const reduced = useStore((s) => s.reducedMotion)

  useEffect(() => {
    if (!ref.current) return
    if (reduced) {
      ref.current.style.opacity = '1'
      return
    }

    const targets = ref.current.querySelectorAll<HTMLElement>('[data-reveal]')
    const elementsToAnimate = targets.length > 0 ? Array.from(targets) : [ref.current]

    animate(elementsToAnimate, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 620,
      delay: targets.length > 0 ? stagger(80) : 0,
      ease: 'outQuad',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
