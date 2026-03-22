'use client'

import { useEffect, useRef, useState, memo } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlitchText } from '@/components/ui/GlitchText'

interface StatItem {
  value: number
  prefix?: string
  suffix: string
  label: string
}

const STATS: StatItem[] = [
  { value: 50, suffix: '+', label: 'Clients Served' },
  { value: 2, prefix: '\u20B9', suffix: 'Cr+', label: 'Revenue Automated' },
  { value: 4.9, suffix: '\u2605', label: 'Client Rating' },
  { value: 100, suffix: '%', label: 'Production Delivered' },
]

function AnimatedNumber({ value, prefix, suffix, inView }: { value: number; prefix?: string; suffix: string; inView: boolean }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [displayed, setDisplayed] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!inView) return

    if (reducedMotion) {
      setDisplayed(value)
      return
    }

    const isDecimal = value % 1 !== 0
    const duration = 1500
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value

      setDisplayed(isDecimal ? Math.round(current * 10) / 10 : Math.round(current))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, value, reducedMotion])

  return (
    <span className="text-3xl md:text-4xl font-bold text-cyan font-mono tabular-nums">
      {prefix}{displayed}{suffix}
    </span>
  )
}

const BreathingGlow = memo(function BreathingGlow() {
  return (
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
        animation: 'breathe 3s ease-in-out infinite',
      }}
    />
  )
})

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-surface border-y border-border py-12 px-4"
    >
      {/* Gradient top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/10 to-transparent" />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
        {STATS.map((stat) => (
          <div key={stat.label} className="relative text-center px-4">
            <div className="relative inline-block">
              <BreathingGlow />
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
            </div>
            <p className="text-xs text-muted mt-2 font-mono">
              <GlitchText text={stat.label} />
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
