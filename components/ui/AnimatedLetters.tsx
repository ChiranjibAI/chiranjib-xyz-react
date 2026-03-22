'use client'

import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Animation variants — each letter style
const LETTER_VARIANTS = [
  // 0: bounce from top
  {
    hidden: { opacity: 0, y: -60, rotate: -15 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
  // 1: flip X
  {
    hidden: { opacity: 0, rotateX: 90, y: 20 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  // 2: slide from left
  {
    hidden: { opacity: 0, x: -40, skewX: 20 },
    visible: { opacity: 1, x: 0, skewX: 0 },
  },
  // 3: scale + spin
  {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  },
  // 4: slide from right
  {
    hidden: { opacity: 0, x: 40, skewX: -20 },
    visible: { opacity: 1, x: 0, skewX: 0 },
  },
  // 5: drop from above
  {
    hidden: { opacity: 0, y: -80, scale: 1.4 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  // 6: wave (bounce from bottom with rotation)
  {
    hidden: { opacity: 0, y: 50, rotate: 15 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
]

// Spring configs per letter — alternating to feel organic
const SPRING_CONFIGS = [
  { type: 'spring' as const, stiffness: 300, damping: 8 },   // very bouncy
  { type: 'spring' as const, stiffness: 200, damping: 20 },  // smooth
  { type: 'spring' as const, stiffness: 400, damping: 6 },   // super bouncy
  { type: 'spring' as const, stiffness: 150, damping: 15 },  // medium
  { type: 'spring' as const, stiffness: 250, damping: 12 },  // snappy
]

interface AnimatedLettersProps {
  text: string
  className?: string
  letterDelay?: number   // seconds between each letter
  startDelay?: number    // initial delay before first letter
  once?: boolean         // animate once or every time in view
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  style?: React.CSSProperties
}

export const AnimatedLetters = memo(function AnimatedLetters({
  text,
  className = '',
  letterDelay = 0.04,
  startDelay = 0,
  once = true,
  tag: Tag = 'div',
  style,
}: AnimatedLettersProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-20px' })

  const words = text.split(' ')
  let letterIndex = 0

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 0, ...style }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-flex', overflow: 'visible' }}>
          {word.split('').map((char) => {
            const li = letterIndex++
            const variant = LETTER_VARIANTS[li % LETTER_VARIANTS.length]
            const springConfig = SPRING_CONFIGS[li % SPRING_CONFIGS.length]
            return (
              <motion.span
                key={li}
                aria-hidden="true"
                style={{ display: 'inline-block', perspective: 400 }}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={variant}
                transition={{
                  ...springConfig,
                  delay: startDelay + li * letterDelay,
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {/* Word space */}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.28em' }} aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  )
})
