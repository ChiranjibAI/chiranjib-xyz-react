'use client'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { PORTFOLIO_ITEMS } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type PortfolioItem = (typeof PORTFOLIO_ITEMS)[number]

interface PortfolioGridProps {
  items: PortfolioItem[]
}

const STATUS_COLORS: Record<string, 'green' | 'orange' | 'default'> = {
  Live: 'green',
  Beta: 'orange',
  Private: 'default',
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="group bg-card border border-border rounded-2xl p-6 hover:border-cyan/25 transition-all duration-300 flex flex-col"
        >
          <div className="flex items-start justify-between mb-4">
            <AnimatedLetters text={item.title} tag="h3" className="text-base font-bold text-text leading-tight pr-2" letterDelay={0.025} startDelay={index * 0.1} />
            <Badge color={STATUS_COLORS[item.status] || 'default'}>{item.status}</Badge>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{item.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {item.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-md bg-surface border border-border text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {item.link ? (
            <Button href={item.link} variant="secondary" size="sm" external className="w-full justify-center">
              View Project
            </Button>
          ) : (
            <div className="text-center py-2 text-xs text-muted border border-border/50 rounded-xl">
              {item.status === 'Private' ? 'Private — Available on Request' : 'Coming Soon'}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
