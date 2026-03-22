'use client'

import { ShowreelPlayer } from '@/components/remotion/players/ShowreelPlayer'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

export default function ShowreelPage() {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-4">
            Portfolio · 2024
          </div>

          <AnimatedLetters
            text="30-Second Showreel"
            tag="h1"
            className="text-4xl md:text-5xl font-bold text-text justify-center"
            letterDelay={0.035}
          />

          <p className="mt-4 text-muted text-base max-w-lg mx-auto leading-relaxed">
            AI automation, stats, and real results — compressed into 30 seconds.
            Built entirely with Remotion.
          </p>
        </div>

        {/* Player */}
        <ShowreelPlayer />

        {/* Info strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted font-mono">
          <div className="flex gap-6">
            <span><span className="text-cyan">30s</span> · 30fps</span>
            <span><span className="text-cyan">5</span> scenes</span>
            <span><span className="text-cyan">900</span> frames</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
            <span>Procedural waveform visualizer</span>
          </div>
        </div>

        {/* Share button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleShare}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 text-muted text-sm font-medium
              hover:border-cyan/30 hover:text-cyan transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:scale-110"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share this showreel
          </button>
        </div>

      </div>
    </main>
  )
}
