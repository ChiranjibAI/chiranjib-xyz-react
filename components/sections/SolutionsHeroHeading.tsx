'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

export function SolutionsHeroHeading() {
  return (
    <>
      <GlitchText
        text="Find Your Solution"
        className="inline-block font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-7"
      />
      <h1
        className="font-bold tracking-tighter leading-[0.9] text-text"
        style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
      >
        <AnimatedLetters
          text="I want to"
          tag="div"
          className="font-bold tracking-tighter text-text"
          startDelay={0}
          letterDelay={0.05}
          style={{ fontSize: 'inherit', lineHeight: '0.9' }}
        />
        <AnimatedLetters
          text="automate..."
          tag="div"
          className="font-bold tracking-tighter text-cyan"
          startDelay={0.4}
          letterDelay={0.05}
          style={{ fontSize: 'inherit', lineHeight: '0.9' }}
        />
      </h1>
    </>
  )
}
