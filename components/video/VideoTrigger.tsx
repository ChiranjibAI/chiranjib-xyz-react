'use client'
import { memo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const ServiceDemoPlayer = dynamic(
  () => import('@/components/remotion/players/ServiceDemoPlayer').then(m => m.ServiceDemoPlayer),
  { ssr: false }
)

export const VideoTrigger = memo(function VideoTrigger({ serviceId }: { serviceId: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-3">
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsOpen(true)}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-cyan/25 bg-cyan/[0.04] text-cyan text-[12px] font-medium hover:bg-cyan/[0.08] hover:border-cyan/40 transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5.5 4.5l4 2.5-4 2.5V4.5z" fill="currentColor"/>
          </svg>
          Watch 13-sec Demo
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative mt-2 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#050505]"
            style={{ aspectRatio: '16/9' }}
          >
            <div style={{ height: '100%', aspectRatio: '16/9' }}>
              <ServiceDemoPlayer serviceId={serviceId} />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-muted hover:text-text hover:bg-black/80 transition-all"
              aria-label="Close video"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
