'use client'
import { motion } from 'framer-motion'
import { WHY_US_POINTS } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type Point = (typeof WHY_US_POINTS)[number]

interface WhyUsCardsProps {
  points: Point[]
}

export default function WhyUsCards({ points }: WhyUsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {points.map((point, index) => (
        <motion.div
          key={point.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <AnimatedLetters text={point.title} tag="h3" className="text-base font-semibold text-text mb-3" letterDelay={0.02} startDelay={index * 0.1} />
          <p className="text-sm text-muted leading-relaxed mb-4">{point.description}</p>
          {point.stat && (
            <div className="mt-auto pt-3 border-t border-border">
              <span className="text-xs font-bold text-cyan">{point.stat}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
