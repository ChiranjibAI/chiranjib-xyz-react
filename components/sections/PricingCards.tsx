'use client'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { PRICING_TIERS } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type Tier = (typeof PRICING_TIERS)[number]

interface PricingCardsProps {
  tiers: Tier[]
}

// Isolated memoized animated background element for Growth card
const GrowthDecor = memo(function GrowthDecor() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 rounded-3xl border border-cyan/10 rotate-12"
      animate={{ rotate: [12, 18, 12], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        background: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, transparent 70%)',
      }}
    />
  )
})

function StarterCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.05 }}
      className="bg-card border border-white/[0.06] rounded-2xl p-6 flex flex-col"
    >
      <AnimatedLetters text={tier.name} tag="p" className="text-sm text-muted mb-3" letterDelay={0.04} startDelay={0.1} />
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-bold font-mono text-text">&#8377;{tier.price}</span>
      </div>
      <p className="text-xs text-muted mb-5">
        Single automation &middot; 2 weeks &middot; 30-day support
      </p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
            <Check className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button href="/hire" variant="secondary" size="md" className="w-full justify-center">
        Get Started
      </Button>
    </motion.div>
  )
}

function EnterpriseCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.15 }}
      className="bg-card border border-white/[0.06] rounded-2xl p-6 flex flex-col"
    >
      <AnimatedLetters text={tier.name} tag="p" className="text-sm text-muted mb-3" letterDelay={0.04} startDelay={0.1} />
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-bold font-mono text-text">&#8377;{tier.price}+</span>
      </div>
      <p className="text-xs text-muted mb-5">
        Custom scope &middot; Custom timeline &middot; 90-day support
      </p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-muted">
            <Check className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button href="/hire" variant="ghost" size="md" className="w-full justify-center border border-white/[0.08] hover:border-white/20">
        Get a Quote
      </Button>
    </motion.div>
  )
}

function GrowthCard({ tier }: { tier: Tier }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      className="relative bg-card border border-cyan/20 rounded-2xl p-8 md:p-10 flex flex-col h-full overflow-hidden"
      style={{
        boxShadow:
          '0 0 60px -20px rgba(0,229,255,0.12), inset 0 1px 0 rgba(0,229,255,0.1)',
      }}
    >
      {/* Most Popular badge */}
      <div className="absolute top-6 right-6">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan/10 border border-cyan/20 text-cyan">
          Most Popular
        </span>
      </div>

      <GrowthDecor />

      <AnimatedLetters text={tier.name} tag="p" className="text-lg font-semibold text-text mb-3" letterDelay={0.04} startDelay={0.1} />
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-5xl font-bold font-mono text-text">&#8377;{tier.price}</span>
      </div>
      <p className="text-sm text-muted mb-6">
        Up to 3 automations &middot; 4 weeks &middot; 60-day support
      </p>

      <div className="w-full h-px bg-white/[0.06] mb-6" />

      <ul className="space-y-3 flex-1 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="w-3.5 h-3.5 text-cyan flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button href="/hire" variant="primary" size="lg" className="w-full justify-center">
        Start Growth Project
      </Button>
    </motion.div>
  )
}

export default function PricingCards({ tiers }: PricingCardsProps) {
  const starter = tiers.find((t) => t.id === 'starter')
  const growth = tiers.find((t) => t.id === 'growth')
  const enterprise = tiers.find((t) => t.id === 'enterprise')

  if (!starter || !growth || !enterprise) return null

  return (
    <>
      {/* Mobile: stacked, Growth first */}
      <div className="flex flex-col gap-6 lg:hidden">
        <GrowthCard tier={growth} />
        <StarterCard tier={starter} />
        <EnterpriseCard tier={enterprise} />
      </div>

      {/* Desktop: asymmetric layout */}
      <div className="hidden lg:grid grid-cols-[1fr_1.4fr] gap-6">
        {/* Left: Starter + Enterprise stacked */}
        <div className="grid grid-rows-2 gap-6">
          <StarterCard tier={starter} />
          <EnterpriseCard tier={enterprise} />
        </div>
        {/* Right: Growth spanning full height */}
        <GrowthCard tier={growth} />
      </div>
    </>
  )
}
