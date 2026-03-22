'use client'

import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

interface ChatHeroHeadingProps {
  mobile?: boolean
}

export default function ChatHeroHeading({ mobile = false }: ChatHeroHeadingProps) {
  if (mobile) {
    return (
      <AnimatedLetters
        text="Chat with ChiranjibAI"
        tag="h1"
        className="text-xl font-bold text-text"
        startDelay={0}
        letterDelay={0.03}
      />
    )
  }

  return (
    <AnimatedLetters
      text="Ask Me Anything"
      tag="h1"
      className="mt-3 text-xl font-bold text-text"
      startDelay={0}
      letterDelay={0.04}
    />
  )
}
