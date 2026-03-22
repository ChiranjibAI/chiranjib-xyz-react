'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

export function SekkhoAIHeroHeading() {
  return (
    <>
      <GlitchText
        text="Built for India"
        className="inline-block font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-7"
      />
      <h1
        className="font-bold tracking-tighter leading-[0.9] text-text"
        style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
      >
        <AnimatedLetters
          text="SekkhoAI"
          tag="div"
          className="font-bold tracking-tighter text-text"
          startDelay={0}
          letterDelay={0.06}
          style={{ fontSize: 'inherit', lineHeight: '0.9' }}
        />
        <AnimatedLetters
          text="AI tutoring in your language."
          tag="div"
          className="font-normal italic text-muted"
          startDelay={0.5}
          letterDelay={0.04}
          style={{ fontSize: '0.7em', lineHeight: '0.9' }}
        />
      </h1>
    </>
  )
}
