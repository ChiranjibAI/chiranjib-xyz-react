'use client'

import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { GlitchText } from '@/components/ui/GlitchText'
import type { ServiceDemoProps } from '@/components/remotion/ServiceDemoComposition'

const ServiceDemoPlayer = dynamic(
  () => import('@/components/remotion/players/ServiceDemoPlayer').then(m => m.ServiceDemoPlayer),
  { ssr: false }
)

interface ServiceDemoGalleryProps {
  grouped: Record<string, ServiceDemoProps[]>
  categories: string[]
}

const ServiceCard = memo(function ServiceCard({ service }: { service: ServiceDemoProps }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Card header */}
      <div className="p-4">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted mb-1">
          {service.category}
        </p>
        <h3 className="text-sm font-semibold text-text leading-snug mb-1">
          {service.title}
        </h3>
        <p className="text-xs text-muted line-clamp-2 mb-3">
          {service.tagline}
        </p>

        {/* Metric pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan/[0.06] border border-cyan/[0.12] mb-3">
          <span className="text-cyan text-sm font-bold">{service.metric}</span>
          <span className="text-[10px] text-muted">{service.metricLabel}</span>
        </div>

        {/* Play / close toggle */}
        {!isPlaying ? (
          <motion.button
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsPlaying(true)}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan/25 bg-cyan/[0.04] text-cyan text-[11px] font-medium hover:bg-cyan/[0.08] hover:border-cyan/40 transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5.5 4.5l4 2.5-4 2.5V4.5z" fill="currentColor"/>
            </svg>
            Play Demo
          </motion.button>
        ) : (
          <button
            onClick={() => setIsPlaying(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-muted text-[11px] font-medium hover:bg-white/[0.06] transition-all duration-200"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Close
          </button>
        )}
      </div>

      {/* Inline player — expands below card header */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="demo-player"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="relative border-t border-white/[0.06] bg-[#050505]"
              style={{ aspectRatio: '16/9' }}
            >
              <ServiceDemoPlayer serviceId={service.serviceId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export const ServiceDemoGallery = memo(function ServiceDemoGallery({
  grouped,
  categories,
}: ServiceDemoGalleryProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 space-y-16">
      {categories.map((category) => (
        <section key={category}>
          {/* Category header */}
          <div className="mb-8 border-b border-white/[0.05] pb-4">
            <GlitchText
              text={category.toUpperCase()}
              className="text-xl font-bold tracking-widest text-text font-mono"
              duration={800}
            />
            <p className="text-xs text-muted mt-1 font-mono">
              {grouped[category].length} service{grouped[category].length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {grouped[category].map((service) => (
              <ServiceCard key={service.serviceId} service={service} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
})
