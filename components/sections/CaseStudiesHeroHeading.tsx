'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

export default function CaseStudiesHeroHeading() {
  return (
    <>
      <p className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-7">
        <GlitchText text="Proven Outcomes" duration={1000} />
      </p>
      <div>
        <AnimatedLetters
          text="Real automation."
          tag="h1"
          className="font-bold tracking-tighter text-text"
          startDelay={0}
          letterDelay={0.04}
          style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
        />
        <AnimatedLetters
          text="Real results."
          className="font-bold tracking-tighter text-cyan italic"
          startDelay={0.4}
          letterDelay={0.05}
          style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}
        />
      </div>
    </>
  )
}
