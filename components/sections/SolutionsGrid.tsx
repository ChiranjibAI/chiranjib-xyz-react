'use client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

interface Solution {
  id: string
  problem: string
  solution: string
  description: string
  outcomes: string[]
}

interface SolutionsGridProps {
  solutions: Solution[]
}

export default function SolutionsGrid({ solutions }: SolutionsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {solutions.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="group bg-card border border-border rounded-2xl p-6 hover:border-cyan/25 transition-all duration-300 flex flex-col"
        >
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
            Problem
          </p>
          <AnimatedLetters text={item.problem} tag="h3" className="text-lg font-bold text-text mb-1" letterDelay={0.025} startDelay={index * 0.1} />

          <div className="h-px bg-border my-4" />

          <p className="text-xs font-semibold text-cyan uppercase tracking-widest mb-1">
            Solution
          </p>
          <p className="text-base font-semibold text-text mb-3">{item.solution}</p>
          <p className="text-sm text-muted leading-relaxed mb-5">{item.description}</p>

          <ul className="space-y-2 mb-6 flex-1">
            {item.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2 text-sm text-muted">
                <svg
                  className="w-4 h-4 text-cyan flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <Button href="/hire" variant="primary" size="sm" className="w-full justify-center">
            Get This
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
