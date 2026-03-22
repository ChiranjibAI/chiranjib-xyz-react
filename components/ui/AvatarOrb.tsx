'use client'

import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// ─────────────────────────────────────────────────────────────
// AvatarOrb — Circular photo with animated spinning rings
// Rings: outer dashed slowly rotates, inner dashes counter-rotate
// Hover: photo zooms 4%, rings speed up 4×, glow intensifies
// ─────────────────────────────────────────────────────────────
const AvatarOrb = memo(function AvatarOrb({
  src,
  alt,
  size = 260,
}: {
  src: string
  alt: string
  size?: number
}) {
  const [hovered, setHovered] = useState(false)

  const photoSize  = Math.round(size * 0.84)   // 84% of container = photo diameter
  const ring1R     = size / 2 - 4              // outer ring radius
  const ring2R     = size / 2 - 13             // inner ring radius
  const center     = size / 2

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="false"
    >

      {/* ── Ambient glow behind everything ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 0.7 : 0.28 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0,229,255,0.22) 0%, transparent 68%)`,
        }}
      />

      {/* ── Outer dashed ring — spins clockwise ── */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{ rotate: 360 }}
        transition={{
          duration: hovered ? 4 : 18,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx={center}
          cy={center}
          r={ring1R}
          stroke="rgba(0,229,255,0.35)"
          strokeWidth={hovered ? 1.8 : 1.2}
          strokeDasharray="14 7"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* ── Inner dashed ring — counter-rotates ── */}
      <motion.svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        animate={{ rotate: -360 }}
        transition={{
          duration: hovered ? 7 : 28,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <circle
          cx={center}
          cy={center}
          r={ring2R}
          stroke="rgba(0,229,255,0.14)"
          strokeWidth={0.8}
          strokeDasharray="4 10"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* ── Cyan glow ring (static, not spinning) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: photoSize + 8,
          height: photoSize + 8,
          boxShadow: '0 0 0 0 rgba(0,229,255,0)',
        }}
        animate={{
          boxShadow: hovered
            ? '0 0 0 2px rgba(0,229,255,0.4), 0 0 28px rgba(0,229,255,0.18)'
            : '0 0 0 1.5px rgba(0,229,255,0.14), 0 0 0px rgba(0,229,255,0)',
        }}
        transition={{ duration: 0.35 }}
      />

      {/* ── Photo circle ── */}
      <motion.div
        className="relative rounded-full overflow-hidden border border-white/[0.09] bg-surface z-10"
        style={{ width: photoSize, height: photoSize }}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          unoptimized
          priority
        />
        {/* Subtle inner vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 100%, rgba(5,5,5,0.35) 0%, transparent 65%)',
          }}
        />
      </motion.div>

    </div>
  )
})

export default AvatarOrb
