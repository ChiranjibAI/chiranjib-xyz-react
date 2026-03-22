'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

export default function AboutHeroHeading() {
  return (
    <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
      <AnimatedLetters
        text="I'm Chiranjib."
        className="font-bold tracking-tighter leading-[0.88] text-text"
        startDelay={0}
        letterDelay={0.05}
      />
      <AnimatedLetters
        text="Not a company."
        className="font-normal italic tracking-tighter leading-[0.88] text-muted"
        startDelay={0.4}
        letterDelay={0.04}
      />
      <AnimatedLetters
        text="Just me."
        className="font-bold tracking-tighter leading-[0.88] text-cyan"
        startDelay={0.7}
        letterDelay={0.07}
      />
    </div>
  )
}
