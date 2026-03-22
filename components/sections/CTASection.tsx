'use client'

import Link from 'next/link'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { GlitchText } from '@/components/ui/GlitchText'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

// Memoized ambient orbs — isolated perpetual animation
const AmbientOrbs = memo(function AmbientOrbs() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #00e5ff 0%, transparent 65%)',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(50%, 50%)',
        }}
      />
    </div>
  )
})

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export default function CTASection() {
  return (
    <section className="relative bg-surface py-32 px-6 overflow-hidden border-t border-white/[0.06]">
      <AmbientOrbs />

      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Glass panel */}
        <div className="bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-3xl px-8 py-14 md:px-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_80px_-20px_rgba(0,229,255,0.08)]">

          <motion.p
            variants={itemVariants}
            className="text-xs font-mono uppercase tracking-[0.2em] text-cyan mb-5"
          >
            <GlitchText text="Ready to automate?" duration={1000} />
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-text leading-[0.9] flex flex-col items-center gap-1"
          >
            <AnimatedLetters text="Stop doing it manually." tag="span" className="block" startDelay={0.1} letterDelay={0.04} />
            <span className="flex flex-wrap justify-center gap-0">
              <AnimatedLetters text="Let's ship" tag="span" className="text-muted font-normal italic" startDelay={0.7} letterDelay={0.04} />
              <span style={{ display: 'inline-block', width: '0.28em' }}>&nbsp;</span>
              <AnimatedLetters text="your automation." tag="span" className="" startDelay={1.0} letterDelay={0.04} />
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base text-muted max-w-[48ch] mx-auto leading-relaxed"
          >
            Tell me what is slowing your team down. I will map an automation strategy and quote you honestly — fixed price, real scope, no agency retainers.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_28px_-4px_rgba(0,229,255,0.35)] hover:shadow-[0_0_40px_-4px_rgba(0,229,255,0.55)]"
            >
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-medium border border-white/10 text-text hover:border-white/20 hover:bg-white/[0.03] active:scale-[0.97] transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              Chat with ChiranjibAI
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-7 text-xs text-muted/60"
          >
            No commitment &middot; Free discovery call &middot; Fixed pricing before any code is written
          </motion.p>

        </div>
      </motion.div>
    </section>
  )
}
