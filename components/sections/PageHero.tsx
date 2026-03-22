'use client'

import { motion, type Variants } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
  gradient?: boolean
  /** Word in the title to highlight with an animated gradient underline */
  highlightWord?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export default function PageHero({ title, subtitle, badge, gradient = true, highlightWord }: PageHeroProps) {
  return (
    <section className="relative bg-bg pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(0,229,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {badge && (
            <motion.div variants={itemVariants} className="mb-5">
              <Badge color="cyan"><GlitchText text={badge} /></Badge>
            </motion.div>
          )}

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight"
          >
            {gradient ? (
              highlightWord && title.includes(highlightWord) ? (
                <>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #e2e8f0 0%, #00e5ff 60%, #7c3aed 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {title.split(highlightWord)[0]}
                  </span>
                  <span className="relative inline-block">
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {highlightWord}
                    </span>
                    <span
                      className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, #00e5ff 0%, #7c3aed 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'underline-grow 1.2s ease-out 0.6s forwards, underline-shimmer 3s ease-in-out 1.8s infinite',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                      }}
                    />
                  </span>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #e2e8f0 0%, #00e5ff 60%, #7c3aed 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {title.split(highlightWord)[1]}
                  </span>
                </>
              ) : (
                <span
                  style={{
                    background: 'linear-gradient(135deg, #e2e8f0 0%, #00e5ff 60%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </span>
              )
            ) : (
              <span className="text-text">{title}</span>
            )}
          </motion.h1>

          {subtitle && (
            <motion.div variants={itemVariants} className="mt-6">
              <AnimatedLetters
                text={subtitle}
                tag="p"
                className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
                letterDelay={0.02}
                startDelay={0.6}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Keyframes for underline animation */}
      <style>{`
        @keyframes underline-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes underline-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
