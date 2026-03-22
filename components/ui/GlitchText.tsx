'use client'

import { memo, useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

interface GlitchTextProps {
  text: string
  className?: string
  duration?: number  // ms to scramble before settling
  interval?: number  // ms between each character scramble
}

export const GlitchText = memo(function GlitchText({
  text,
  className = '',
  duration = 1200,
  interval = 40,
}: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true })
  const [displayed, setDisplayed] = useState(text.replace(/[^ ]/g, CHARS[0]))
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
      const start = Date.now()
      const tick = setInterval(() => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const revealedCount = Math.floor(progress * text.length)

        setDisplayed(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < revealedCount) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )

        if (progress >= 1) {
          clearInterval(tick)
          setDisplayed(text)
        }
      }, interval)
      return () => clearInterval(tick)
    }
  }, [isInView, started, text, duration, interval])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed}
    </span>
  )
})
