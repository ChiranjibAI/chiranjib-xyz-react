'use client'
import { motion } from 'framer-motion'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

interface Feature {
  title: string
  description: string
  icon: string
}

interface SekkhoAIFeaturesProps {
  features: Feature[]
}

export default function SekkhoAIFeatures({ features }: SekkhoAIFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl p-6 hover:border-purple/30 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-purple/8 border border-purple/15 flex items-center justify-center mb-4">
            <svg
              className="w-5 h-5 text-[#7c3aed]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
            </svg>
          </div>
          <AnimatedLetters text={feature.title} tag="h3" className="text-sm font-semibold text-text mb-2" letterDelay={0.03} startDelay={index * 0.1} />
          <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  )
}
