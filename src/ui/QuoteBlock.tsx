import React from 'react'
import type { SceneQuote } from '../contracts/types'

interface QuoteBlockProps {
  quote: SceneQuote
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote }) => {
  return (
    <figure className="my-4 p-4 rounded-xl bg-amber-950/20 border-l-2 border-amber-500 text-amber-200/95 backdrop-blur-sm shadow-xl font-serif">
      <blockquote className="text-sm md:text-base italic leading-relaxed">
        “{quote.text}”
      </blockquote>
      <figcaption className="mt-2 text-[11px] font-sans font-mono tracking-wide text-amber-400/80">
        — {quote.attribution}
      </figcaption>
    </figure>
  )
}
