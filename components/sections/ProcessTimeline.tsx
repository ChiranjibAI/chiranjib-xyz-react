'use client'
import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type Step = (typeof PROCESS_STEPS)[number]

interface ProcessTimelineProps {
  steps: Step[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.step}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-6"
        >
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-cyan/10 border-2 border-cyan flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-cyan">{step.step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-px flex-1 bg-border mt-3 min-h-[40px]" />
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <AnimatedLetters text={step.title} tag="h3" className="text-base font-bold text-text" letterDelay={0.03} startDelay={index * 0.1} />
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan/8 border border-cyan/15 text-cyan">
                {step.duration}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">{step.description}</p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                  You do
                </p>
                <p className="text-xs text-muted leading-relaxed">{step.clientDoes}</p>
              </div>
              <div className="bg-card border border-cyan/10 rounded-xl p-4">
                <p className="text-xs font-semibold text-cyan uppercase tracking-widest mb-2">
                  I do
                </p>
                <p className="text-xs text-muted leading-relaxed">{step.iDo}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
