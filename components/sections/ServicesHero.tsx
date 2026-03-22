'use client'

import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 }

// ── Animated counter — counts up from 0 to target ──
const AnimatedCounter = memo(function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return (
    <span className="font-mono font-bold text-cyan tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
})

// Animated workflow diagram — shows what automation actually looks like in production
const WorkflowDiagram = memo(function WorkflowDiagram() {
  const steps = [
    {
      id: 'trigger',
      label: 'Lead Submits Form',
      meta: 'WhatsApp / Website',
      status: 'done',
      delay: 0,
    },
    {
      id: 'qualify',
      label: 'AI Bot Qualifies',
      meta: 'GPT-4o · ~8 seconds',
      status: 'active',
      delay: 0.15,
    },
    {
      id: 'route',
      label: 'Routes by Intent',
      meta: 'Hot → Sales · Cold → Nurture',
      status: 'running',
      delay: 0.28,
    },
    {
      id: 'crm',
      label: 'CRM Updated',
      meta: 'Zoho / HubSpot auto-sync',
      status: 'done',
      delay: 0.4,
    },
    {
      id: 'owner',
      label: 'Owner Notified',
      meta: 'Telegram alert in <1 min',
      status: 'done',
      delay: 0.52,
    },
  ]

  return (
    <div className="w-full select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green/70 animate-availability" aria-hidden="true" />
          <span className="text-[10px] font-mono text-muted/50 uppercase tracking-[0.18em]"><GlitchText text="Live Pipeline" duration={800} /></span>
        </div>
        <span className="text-[10px] font-mono text-muted/30">Processed: 2,847 leads</span>
      </div>

      {/* Flow nodes */}
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={step.id}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: step.delay }}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border transition-colors duration-300 ${
                step.status === 'active'
                  ? 'border-cyan/35 bg-cyan/[0.05] shadow-[inset_0_1px_0_rgba(0,229,255,0.08)]'
                  : step.status === 'running'
                  ? 'border-white/[0.10] bg-surface/60'
                  : 'border-white/[0.06] bg-surface/30'
              }`}
            >
              {/* Status dot */}
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  step.status === 'active'
                    ? 'bg-cyan animate-availability'
                    : step.status === 'running'
                    ? 'bg-white/30 animate-pulse'
                    : 'bg-green/50'
                }`}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13px] font-medium leading-none ${
                    step.status === 'active' ? 'text-cyan' : 'text-text/80'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-muted/50 mt-1 font-mono truncate">{step.meta}</p>
              </div>
              {/* Status badge */}
              <span
                className={`text-[9px] font-mono uppercase tracking-[0.15em] flex-shrink-0 ${
                  step.status === 'active'
                    ? 'text-cyan'
                    : step.status === 'running'
                    ? 'text-white/40'
                    : 'text-green/60'
                }`}
              >
                {step.status === 'active' ? 'running' : step.status === 'running' ? 'queued' : 'done'}
              </span>
            </motion.div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="flex justify-start ml-[26px] my-1" aria-hidden="true">
                <div className="w-px h-3 bg-gradient-to-b from-white/10 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outcome strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 grid grid-cols-3 gap-2"
      >
        {[
          { value: '8s', label: 'Qualify time' },
          { value: '3×', label: 'Lead volume' },
          { value: '0', label: 'Manual steps' },
        ].map((stat) => (
          <div key={stat.label} className="text-center px-2 py-3 rounded-lg bg-surface/40 border border-white/[0.05]">
            <p className="text-base font-bold font-mono text-cyan leading-none">{stat.value}</p>
            <p className="text-[10px] text-muted/50 mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
})

export default function ServicesHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 60%)',
          transform: 'translate(20%, 20%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-14 lg:gap-10 items-center">

          {/* Left 58% — text content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition }}
              className="font-mono text-[11px] text-cyan uppercase tracking-[0.22em] mb-7"
            >
              <GlitchText text="20 Production Services" duration={1000} />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.08 }}
            >
              <AnimatedLetters
                text="I Build Automation"
                tag="h1"
                className="font-bold tracking-tighter text-text"
                startDelay={0.1}
                letterDelay={0.04}
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)' }}
              />
              <AnimatedLetters
                text="That Actually Ships"
                className="font-bold tracking-tighter text-cyan"
                startDelay={0.5}
                letterDelay={0.04}
                style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', display: 'flex' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.16 }}
              className="mt-7 text-[15px] text-muted leading-[1.75] max-w-[50ch]"
            >
              Every service listed here has been delivered to a real client. No theoretical
              offerings — production-grade automation systems with measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/hire" variant="primary" size="lg">
                Hire Me
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                View Pricing
              </Button>
            </motion.div>

            {/* ── Live animated counters ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.32 }}
              className="mt-8 grid grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.03]"
            >
              {[
                { target: 50,  suffix: '+', label: 'Clients'    },
                { target: 20,  suffix: '',  label: 'Services'   },
                { target: 4.9, suffix: '★', label: 'Rating'     },
                { target: 100, suffix: '%', label: 'Shipped'    },
              ].map(({ target, suffix, label }) => (
                <div key={label} className="flex flex-col items-center py-3.5 px-2 bg-surface/40">
                  <p className="text-[17px] leading-none mb-1">
                    <AnimatedCounter target={target} suffix={suffix} duration={1600} />
                  </p>
                  <p className="text-[10px] text-muted/50 font-mono uppercase tracking-[0.12em]">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Browse by outcome — highlight the /solutions page */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 pt-7 border-t border-white/[0.06]"
            >
              <p className="text-[12px] text-muted/60 mb-3">Know your business goal but not the tech?</p>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-cyan hover:text-cyan/70 transition-colors duration-200 group"
              >
                Browse by outcome — &quot;I want to automate X&quot;
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 14 14"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right 42% — Animated workflow diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springTransition, delay: 0.28 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-surface/50 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_60px_-20px_rgba(0,229,255,0.07)]">
              {/* Soft ambient glow behind panel */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 60% 30%, rgba(0,229,255,0.05) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <WorkflowDiagram />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
