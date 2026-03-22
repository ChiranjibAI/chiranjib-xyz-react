'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

export function PricingHeroHeading() {
  return (
    <>
      <GlitchText
        text="Transparent Pricing"
        className="inline-block font-mono text-[11px] text-cyan uppercase tracking-[0.22em]"
      />
      <h1
        className="mt-5 font-bold tracking-tighter text-text leading-[1.05]"
        style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
      >
        <AnimatedLetters
          text="Fixed scope."
          tag="div"
          className="font-bold tracking-tighter text-text leading-[1.05]"
          startDelay={0}
          letterDelay={0.05}
          style={{ fontSize: 'inherit' }}
        />
        <AnimatedLetters
          text="Fixed price."
          tag="div"
          className="font-bold tracking-tighter text-text leading-[1.05]"
          startDelay={0.4}
          letterDelay={0.05}
          style={{ fontSize: 'inherit' }}
        />
        <AnimatedLetters
          text="No surprises."
          tag="div"
          className="font-bold tracking-tighter text-text leading-[1.05]"
          startDelay={0.7}
          letterDelay={0.05}
          style={{ fontSize: 'inherit' }}
        />
      </h1>
    </>
  )
}
