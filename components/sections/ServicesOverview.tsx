'use client'

import Link from 'next/link'
import { useRef, type MouseEvent } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Bot, MessageSquare, Workflow, Brain, ArrowRight } from 'lucide-react'
import { GlitchText } from '@/components/ui/GlitchText'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

// Spotlight bento tile — tracks mouse for radial glow
function BentoTile({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height * 100).toFixed(1)}%`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative bg-card border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan/20 hover:-translate-y-0.5 ${className}`}
    >
      {/* Spotlight radial gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.045), transparent 40%)',
        }}
      />
      {children}
    </div>
  )
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export default function ServicesOverview() {
  return (
    <section className="bg-bg py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-cyan mb-4"><GlitchText text="What I Build" duration={900} /></p>
          <AnimatedLetters text="8 Production Services" tag="h2" className="text-3xl md:text-4xl font-bold tracking-tighter text-text" startDelay={0.1} letterDelay={0.04} />
          <p className="mt-3 text-base text-muted leading-relaxed max-w-xl">
            Every service has shipped to a real client. Scoped, priced, and delivered without scope creep.
          </p>
        </motion.div>

        {/* Asymmetric bento grid — NO 3-equal-column (banned by design-taste) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ gridTemplateRows: 'auto' }}
        >

          {/* LARGE TILE 1 — AI Agents (spans 2 cols on lg) */}
          <motion.div variants={tileVariants} className="md:col-span-2 lg:col-span-1">
            <BentoTile className="p-7 md:p-8 min-h-[280px] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan/[0.08] border border-cyan/15 flex items-center justify-center mb-6">
                  <Bot className="w-5 h-5 text-cyan" strokeWidth={1.5} />
                </div>
                <AnimatedLetters text="AI Agents & Automation" tag="h3" className="text-lg font-semibold text-text tracking-tight mb-2" letterDelay={0.02} startDelay={0.1} />
                <p className="text-sm text-muted leading-relaxed max-w-[40ch]">
                  Autonomous agents that handle multi-step tasks — research, decision-making, CRM updates — without human input. From simple bots to complex AGI pipelines.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['GPT-4o', 'Claude API', 'LangChain', 'Tool Use'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-surface border border-white/[0.06] text-muted font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </BentoTile>
          </motion.div>

          {/* SMALL TILE 1 — WhatsApp */}
          <motion.div variants={tileVariants}>
            <BentoTile className="p-6 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-green/[0.07] border border-green/15 flex items-center justify-center mb-5">
                  <MessageSquare className="w-4.5 h-4.5 text-green" strokeWidth={1.5} style={{ width: '18px', height: '18px' }} />
                </div>
                <AnimatedLetters text="WhatsApp Bots" tag="h3" className="text-base font-semibold text-text tracking-tight mb-1.5" letterDelay={0.02} startDelay={0.1} />
                <p className="text-sm text-muted leading-relaxed">
                  Official Meta API integration. Lead qualification, order tracking, and broadcast campaigns at scale.
                </p>
              </div>
              <div className="mt-5">
                <span className="text-xs font-mono text-muted/60">7–14 day delivery</span>
              </div>
            </BentoTile>
          </motion.div>

          {/* SMALL TILE 2 — n8n */}
          <motion.div variants={tileVariants}>
            <BentoTile className="p-6 min-h-[200px] flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-cyan/[0.07] border border-cyan/15 flex items-center justify-center mb-5">
                  <Workflow className="w-4.5 h-4.5 text-cyan" strokeWidth={1.5} style={{ width: '18px', height: '18px' }} />
                </div>
                <AnimatedLetters text="n8n Workflows" tag="h3" className="text-base font-semibold text-text tracking-tight mb-1.5" letterDelay={0.02} startDelay={0.1} />
                <p className="text-sm text-muted leading-relaxed">
                  Visual automation pipelines connecting your entire tool stack. 400+ integrations, zero code required.
                </p>
              </div>
              <div className="mt-5">
                <span className="text-xs font-mono text-muted/60">5–10 day delivery</span>
              </div>
            </BentoTile>
          </motion.div>

          {/* LARGE TILE 2 — RAG/LLM (spans 2 cols) */}
          <motion.div variants={tileVariants} className="md:col-span-2">
            <BentoTile className="p-7 md:p-8 min-h-[220px]">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-cyan/[0.08] border border-cyan/15 flex items-center justify-center mb-6">
                    <Brain className="w-5 h-5 text-cyan" strokeWidth={1.5} />
                  </div>
                  <AnimatedLetters text="RAG & LLM Integration" tag="h3" className="text-lg font-semibold text-text tracking-tight mb-2" letterDelay={0.02} startDelay={0.1} />
                  <p className="text-sm text-muted leading-relaxed max-w-[52ch]">
                    Retrieval-augmented generation systems trained on your internal docs, product data, and knowledge base. Accurate, grounded, and contextually aware AI responses — not hallucinations.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-2 min-w-[200px]">
                    {['Vector DBs', 'Embeddings', 'Pinecone', 'Supabase pgvector', 'OpenAI', 'Claude'].map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1.5 rounded-lg bg-surface border border-white/[0.06] text-muted font-mono text-center">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BentoTile>
          </motion.div>

        </motion.div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-end"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan transition-colors duration-200 group"
          >
            View all 20 services
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
