'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CASE_STUDIES_DATA } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

type CaseStudy = (typeof CASE_STUDIES_DATA)[number]

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[]
}

const INDUSTRY_COLORS: Record<string, string> = {
  'E-commerce': 'text-cyan border-cyan/25 bg-cyan/[0.06]',
  'Real Estate': 'text-purple border-purple/25 bg-purple/[0.06]',
  'Logistics': 'text-orange border-orange-400/25 bg-orange-400/[0.06]',
  'EdTech': 'text-green border-green/25 bg-green/[0.06]',
}

const INDUSTRY_DOT: Record<string, string> = {
  'E-commerce': 'bg-cyan',
  'Real Estate': 'bg-purple',
  'Logistics': 'bg-orange-400',
  'EdTech': 'bg-green',
}

const springTransition = { type: 'spring' as const, stiffness: 100, damping: 20 }

const ALL_INDUSTRIES = ['All', 'E-commerce', 'Real Estate', 'Logistics', 'EdTech'] as const
type Industry = (typeof ALL_INDUSTRIES)[number]

export default function CaseStudiesGrid({ caseStudies }: CaseStudiesGridProps) {
  const [active, setActive] = useState<Industry>('All')

  const filtered =
    active === 'All'
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active)

  return (
    <div>
      {/* Industry filter */}
      <div className="overflow-x-auto pb-1 -mx-1 px-1 mb-12">
        <div className="flex gap-1.5 min-w-max">
          {ALL_INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setActive(ind)}
              aria-pressed={active === ind}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
                active === ind
                  ? 'bg-cyan/[0.08] text-cyan border border-cyan/25'
                  : 'text-muted hover:text-text border border-transparent hover:border-white/[0.08]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Case study cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={springTransition}
          className="space-y-7"
        >
          {filtered.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const dotColor = INDUSTRY_DOT[study.industry] ?? 'bg-muted'
  const tagColor = INDUSTRY_COLORS[study.industry] ?? 'text-muted border-white/10 bg-white/[0.04]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springTransition, delay: index * 0.06 }}
      className="group rounded-2xl border border-white/[0.07] bg-card overflow-hidden hover:border-white/[0.12] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
    >
      <div className="p-7 md:p-8">

        {/* Header: client + industry tag + tech stack */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* Industry colour dot */}
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} aria-hidden="true" />
              <AnimatedLetters
                text={study.client}
                tag="h3"
                className="text-lg font-bold text-text tracking-tight"
                letterDelay={0.03}
                startDelay={index * 0.05}
              />
              <span className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${tagColor}`}>
                <GlitchText text={study.industry} className="font-mono" />
              </span>
            </div>

            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
              {study.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-muted/70 px-2.5 py-1 rounded-md bg-surface border border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Problem / Solution — 2-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-xl bg-surface/50 border border-white/[0.05] p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/50 mb-2">The Problem</p>
            <p className="text-[13px] text-muted leading-[1.75]">{study.problem}</p>
          </div>
          <div className="rounded-xl bg-cyan/[0.03] border border-cyan/[0.08] p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan/50 mb-2">The Solution</p>
            <p className="text-[13px] text-muted leading-[1.75]">{study.solution}</p>
          </div>
        </div>

        {/* Results — 2×2 grid with context */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/40 mb-4">Measured Outcomes</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {study.results.map((result) => (
              <div
                key={result.metric}
                className="rounded-xl bg-surface border border-white/[0.06] px-4 py-4 flex flex-col gap-1 group-hover:border-white/[0.1] transition-colors duration-300"
              >
                <p className="text-[18px] md:text-[20px] font-bold font-mono text-cyan leading-none">
                  {result.value}
                </p>
                <p className="text-[11px] text-text/70 leading-snug mt-1">{result.metric}</p>
                {'context' in result && result.context && (
                  <p className="text-[10px] text-muted/50 leading-snug mt-0.5 font-mono">
                    {result.context}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
