'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useVoiceAgent } from './useVoiceAgent'

// Map pathname to voice script pageId
function pathnameToPageId(pathname: string): string {
  if (pathname === '/') return 'home'
  const segment = pathname.split('/')[1]
  const map: Record<string, string> = {
    services: 'services',
    pricing: 'pricing',
    about: 'about',
    hire: 'hire',
  }
  return map[segment] ?? 'home'
}

// --- Icon components (inline SVG to avoid external deps) ---

function MicIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// Waveform: 3 bouncing bars
function WaveformIcon() {
  return (
    <span className="flex items-center justify-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-[3px] rounded-full bg-cyan-400"
          style={{ height: 8 }}
          animate={{ scaleY: [1, 2.5, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  )
}

// --- Main component ---

export default function VoiceAgent() {
  const pathname = usePathname()
  const pageId = pathnameToPageId(pathname)
  const { status, speak, stop } = useVoiceAgent()
  const [showStop, setShowStop] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Auto-reset from error after 3 seconds
  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => {
        // status resets inside hook but we nudge stop() to ensure
        stop()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status, stop])

  function handleClick() {
    if (status === 'idle' || status === 'error') {
      speak(pageId)
    } else if (status === 'playing') {
      stop()
    }
    // loading: do nothing
  }

  const isError = status === 'error'
  const isLoading = status === 'loading'
  const isPlaying = status === 'playing'
  const isIdle = status === 'idle'

  // Border color
  const borderColor = isError
    ? 'border-red-500/60'
    : isPlaying
    ? 'border-cyan-400/70'
    : 'border-cyan-400/40'

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !isPlaying && !isLoading && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="mb-1 mr-1 whitespace-nowrap rounded-md bg-surface border border-border px-3 py-1.5 text-xs text-muted pointer-events-none select-none shadow-lg"
            style={{
              backgroundColor: 'rgba(14,14,14,0.95)',
              borderColor: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Hear about this page
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        onMouseEnter={() => isPlaying && setShowStop(true)}
        onMouseLeave={() => setShowStop(false)}
        aria-label={
          isPlaying
            ? 'Stop voice playback'
            : isLoading
            ? 'Loading voice...'
            : isError
            ? 'Voice error — click to retry'
            : 'Play voice introduction'
        }
        className={[
          'relative flex items-center justify-center',
          'w-14 h-14 rounded-full',
          'border-2',
          borderColor,
          'transition-colors duration-300',
          isLoading ? 'cursor-wait' : 'cursor-pointer',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
        ].join(' ')}
        style={{
          backgroundColor: 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: isPlaying
            ? '0 0 20px rgba(0,229,255,0.2)'
            : isError
            ? '0 0 16px rgba(239,68,68,0.2)'
            : '0 4px 24px rgba(0,0,0,0.5)',
        }}
        whileHover={!isLoading ? { scale: 1.08 } : {}}
        whileTap={!isLoading ? { scale: 0.94 } : {}}
      >
        {/* Idle ping dot */}
        {isIdle && (
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
        )}

        {/* Icon */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.span
              key="spinner"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-cyan-400"
            >
              <SpinnerIcon />
            </motion.span>
          )}

          {isPlaying && !showStop && (
            <motion.span
              key="wave"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <WaveformIcon />
            </motion.span>
          )}

          {isPlaying && showStop && (
            <motion.span
              key="stop"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-cyan-300"
            >
              <StopIcon />
            </motion.span>
          )}

          {isError && (
            <motion.span
              key="error"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-red-400"
            >
              <XIcon />
            </motion.span>
          )}

          {isIdle && (
            <motion.span
              key="mic"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="text-cyan-400"
            >
              <MicIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
