'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), { ssr: false })

// Neural brain animation — SSR disabled (WebGL + Remotion Player)
const NeuralBrainPlayer = dynamic(
  () =>
    import('@/components/remotion/players/NeuralBrainPlayer').then(
      (m) => m.NeuralBrainPlayer
    ),
  { ssr: false }
)

// Isolated perpetual animation — prevent parent re-renders
const AvailabilityDot = memo(function AvailabilityDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-60 animate-availability" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
    </span>
  )
})

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bg">
      {/* Neural brain 3D animation — full-bleed background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.35 }}
      >
        <NeuralBrainPlayer />
      </div>

      {/* Ambient orbs — GPU layers, pointer-events-none */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 65%)',
          transform: 'translate(-25%, -30%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-[30%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.025) 0%, transparent 70%)',
          transform: 'translateY(30%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 lg:gap-8 items-center">

          {/* LEFT: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability pill */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <AvailabilityDot />
                <span className="text-xs font-medium text-muted">Available for Projects</span>
              </div>
            </motion.div>

            {/* Headline — ANTI-CENTER, left-aligned, asymmetric weight */}
            <motion.div
              variants={itemVariants}
              className="mt-7"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              <AnimatedLetters
                text="I Build"
                className="font-bold tracking-tighter leading-[0.87] text-text"
                startDelay={0}
                letterDelay={0.05}
              />
              <AnimatedLetters
                text="Automation"
                className="font-normal italic tracking-tighter leading-[0.87] text-muted"
                startDelay={0.3}
                letterDelay={0.04}
              />
              <AnimatedLetters
                text="That Ships."
                className="font-bold tracking-tighter leading-[0.87] text-cyan"
                startDelay={0.6}
                letterDelay={0.05}
              />
            </motion.div>

            {/* Subtext */}
            <motion.div variants={itemVariants} className="mt-7" style={{ maxWidth: '52ch' }}>
              <AnimatedLetters
                text="WhatsApp bots, AI agents, n8n pipelines, RAG systems — for Indian founders who want results, not demos. Production-delivered, fixed price."
                tag="p"
                className="text-base md:text-lg text-muted leading-relaxed"
                startDelay={0.9}
                letterDelay={0.012}
              />
            </motion.div>

            {/* CTA row */}
            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/hire"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_24px_-4px_rgba(0,229,255,0.3)] hover:shadow-[0_0_36px_-4px_rgba(0,229,255,0.5)]"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium border border-white/10 text-text hover:border-white/20 hover:bg-white/[0.03] active:scale-[0.97] transition-all duration-200"
              >
                See Services
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                <span>
                  <span className="text-text font-mono font-bold">50+</span> Clients
                </span>
                <span className="w-px h-4 bg-white/10" aria-hidden="true" />
                <span title="Across 50+ client projects since 2022" className="cursor-help">
                  <span className="text-text font-mono font-bold">&#8377;2Cr+</span> Automated
                  <span className="text-muted/40 text-xs ml-1">*</span>
                </span>
                <span className="w-px h-4 bg-white/10" aria-hidden="true" />
                <span>
                  <span className="text-text font-mono font-bold">100%</span> Shipped
                </span>
                <span className="w-px h-4 bg-white/10" aria-hidden="true" />
                <a
                  href="https://t.me/chiranjibai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-cyan transition-colors duration-200 font-mono"
                >
                  @chiranjibAI
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Neural network canvas — PROMINENTLY featured, not just background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.35 }}
            className="relative hidden lg:block"
          >
            {/* Soft glow behind canvas */}
            <div
              aria-hidden="true"
              className="absolute inset-[-10%] rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.09) 0%, transparent 65%)',
                filter: 'blur(24px)',
              }}
            />

            {/* Canvas panel */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-surface/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(0,229,255,0.04)]"
              style={{ height: '480px' }}
            >
              <HeroCanvas />

              {/* Corner overlay labels */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-mono text-muted/50 uppercase tracking-widest">Neural Network</span>
              </div>
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="text-[10px] font-mono text-muted/30">180 nodes · live</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  )
}
