'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 }

const AnimatedOrbs = memo(function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: '-20%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 60%)',
          animation: 'spin-slow 30s linear infinite',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          bottom: '-15%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 60%)',
          animation: 'spin-slow 25s linear infinite reverse',
        }}
      />
    </div>
  )
})

export default function ServicesCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springTransition}
      className="mt-24 relative"
    >
      {/* Glass card with depth */}
      <div
        className="relative bg-surface/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-10 md:p-16 text-center"
        style={{
          boxShadow: '0 0 80px -20px rgba(0,229,255,0.1)',
        }}
      >
        <AnimatedOrbs />

        <div className="relative z-10">
          <AnimatedLetters text="Still Figuring Out What You Need?" tag="h3" className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight" startDelay={0.1} letterDelay={0.04} />
          <p className="text-muted text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
            Tell me your problem in plain language — I&apos;ll suggest the right
            solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/solutions" variant="primary" size="lg">
              Browse by Outcome
            </Button>
            <Button href="/hire" variant="secondary" size="lg">
              Describe Your Problem
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
