import React from 'react'
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Audio,
  Video,
  staticFile,
  AbsoluteFill,
} from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#03070f',
  primary: '#00e5ff',
  purple: '#8b5cf6',
  gold: '#f59e0b',
  green: '#10b981',
  red: '#ef4444',
  blue: '#3b82f6',
  orange: '#f97316',
  surface: 'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.08)',
  font: "'Inter', system-ui, sans-serif",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function spr(frame: number, fps: number, delay = 0, stiffness = 100, damping = 200) {
  return spring({
    frame: frame - delay,
    fps,
    config: { stiffness, damping },
  })
}

function clamp(v: number, from: number[], to: number[]) {
  return interpolate(v, from, to, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

// ─── Scene 1 – HOOK ───────────────────────────────────────────────────────────
const Scene1Hook: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Letterbox bars
  const barProgress = clamp(frame, [0, 30], [0, 1])
  const topBarY = clamp(barProgress, [0, 1], [-80, 0])
  const botBarY = clamp(barProgress, [0, 1], [80, 0])

  // Pulsing glow
  const glowScale = 1 + 0.1 * Math.sin(frame / 15)
  const glowOpacity = 0.12 + 0.06 * Math.sin(frame / 18)

  // "AUTOMATE YOUR GROWTH" letter-by-letter
  const headline = 'AUTOMATE YOUR GROWTH'
  const letters = headline.split('')

  // Sub-text slide up
  const subProgress = spr(frame, fps, 60)
  const subY = clamp(subProgress, [0, 1], [40, 0])
  const subOpacity = spr(frame, fps, 60)

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: C.font }}>
      {/* Radial gradient background */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,229,255,0.06) 0%, #03070f 70%)',
        }}
      />

      {/* Pulsing glow behind text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0,229,255,${glowOpacity}) 0%, transparent 70%)`,
            transform: `scale(${glowScale})`,
          }}
        />
      </AbsoluteFill>

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Headline letters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {letters.map((letter, i) => {
            const letterProgress = spr(frame, fps, i * 3)
            const letterY = clamp(letterProgress, [0, 1], [60, 0])
            const letterOpacity = clamp(letterProgress, [0, 1], [0, 1])
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  fontSize: 120,
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: letter === ' ' ? 8 : 2,
                  transform: `translateY(${letterY}px)`,
                  opacity: letterOpacity,
                  textShadow: '0 0 40px rgba(0,229,255,0.3)',
                  width: letter === ' ' ? 30 : 'auto',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            )
          })}
        </div>

        {/* Sub-text */}
        <div
          style={{
            transform: `translateY(${subY}px)`,
            opacity: subOpacity,
            fontSize: 40,
            fontWeight: 400,
            color: C.primary,
            letterSpacing: 4,
            textShadow: `0 0 30px ${C.primary}`,
          }}
        >
          with chiranjib.xyz
        </div>
      </AbsoluteFill>

      {/* Top letterbox bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: '#000',
          transform: `translateY(${topBarY}px)`,
        }}
      />
      {/* Bottom letterbox bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: '#000',
          transform: `translateY(${botBarY}px)`,
        }}
      />

      <Audio src={staticFile('voiceover/demo/s1-hook.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 2 – PAIN POINTS ────────────────────────────────────────────────────
const Scene2Pain: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Header slides in
  const headerProgress = spr(frame, fps, 0)
  const headerX = clamp(headerProgress, [0, 1], [-120, 0])

  // Typewriter for headline
  const fullText = "You're losing time every day"
  const typeFrame = Math.max(0, frame - 30)
  const charsVisible = Math.floor(clamp(typeFrame, [0, 40], [0, fullText.length]))
  const visibleText = fullText.slice(0, charsVisible)

  // Cursor blink
  const cursorVisible = charsVisible < fullText.length || Math.floor(frame / 15) % 2 === 0

  const painCards = [
    {
      frame: 60,
      number: '8+ Hours',
      label: 'wasted daily on manual work',
      color: C.red,
    },
    {
      frame: 150,
      number: '₹50,000+',
      label: 'lost monthly to inefficiency',
      color: C.red,
    },
    {
      frame: 240,
      number: '10x Slower',
      label: 'than AI-automated competitors',
      color: C.red,
    },
  ]

  return (
    <AbsoluteFill style={{ background: '#1a0505', fontFamily: C.font }}>
      {/* Subtle noise overlay */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(239,68,68,0.08) 0%, transparent 60%)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 120px',
          gap: 40,
        }}
      >
        {/* THE PROBLEM label */}
        <div
          style={{
            transform: `translateX(${headerX}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: C.red,
            letterSpacing: 8,
            textTransform: 'uppercase',
            opacity: spr(frame, fps, 0),
          }}
        >
          THE PROBLEM
        </div>

        {/* Typewriter headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            minHeight: 80,
          }}
        >
          {visibleText}
          {cursorVisible && (
            <span style={{ color: C.red, marginLeft: 4 }}>|</span>
          )}
        </div>

        {/* Pain stat cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginTop: 20,
          }}
        >
          {painCards.map((card, i) => {
            const cardProgress = spr(frame, fps, card.frame)
            const cardX = clamp(cardProgress, [0, 1], [400, 0])
            const cardOpacity = spr(frame, fps, card.frame)

            return (
              <div
                key={i}
                style={{
                  transform: `translateX(${cardX}px)`,
                  opacity: cardOpacity,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: 12,
                  overflow: 'hidden',
                  width: 620,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
                }}
              >
                {/* Red left border accent */}
                <div
                  style={{
                    width: 8,
                    alignSelf: 'stretch',
                    background: card.color,
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    padding: '28px 36px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 28,
                  }}
                >
                  <span
                    style={{
                      fontSize: 52,
                      fontWeight: 900,
                      color: card.color,
                      lineHeight: 1,
                      minWidth: 220,
                    }}
                  >
                    {card.number}
                  </span>
                  <span
                    style={{
                      fontSize: 22,
                      color: '#1a1a2e',
                      fontWeight: 500,
                    }}
                  >
                    {card.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s2-pain.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 3 – SOLUTION ───────────────────────────────────────────────────────
const Scene3Solution: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Animated underline width
  const underlineProgress = spr(frame, fps, 80)
  const underlineW = clamp(underlineProgress, [0, 1], [0, 560])

  // Monogram glow pulse
  const monoGlow = 20 + 8 * Math.sin(frame / 12)

  const labelOpacity = spr(frame, fps, 0)
  const monoProgress = spr(frame, fps, 10)
  const monoScale = clamp(monoProgress, [0, 1], [0.4, 1])

  const nameProgress = spr(frame, fps, 30)
  const nameY = clamp(nameProgress, [0, 1], [40, 0])
  const nameOpacity = spr(frame, fps, 30)

  const subProgress = spr(frame, fps, 60)
  const subY = clamp(subProgress, [0, 1], [30, 0])

  const statsProgress = spr(frame, fps, 90)
  const statsY = clamp(statsProgress, [0, 1], [20, 0])
  const statsOpacity = spr(frame, fps, 90)

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: C.font }}>
      {/* Cyan glow at top-center */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 600,
          background: `radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* THE SOLUTION label */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: C.primary,
            letterSpacing: 10,
            textTransform: 'uppercase',
            opacity: labelOpacity,
          }}
        >
          THE SOLUTION
        </div>

        {/* Monogram circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `3px solid ${C.primary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 52,
            fontWeight: 900,
            color: C.primary,
            transform: `scale(${monoScale})`,
            boxShadow: `0 0 ${monoGlow}px rgba(0,229,255,0.5), 0 0 ${monoGlow * 2}px rgba(0,229,255,0.2)`,
            background: 'rgba(0,229,255,0.05)',
          }}
        >
          C
        </div>

        {/* CHIRANJIB name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: 6,
            transform: `translateY(${nameY}px)`,
            opacity: nameOpacity,
            position: 'relative',
          }}
        >
          CHIRANJIB
          {/* Animated underline */}
          <div
            style={{
              position: 'absolute',
              bottom: -8,
              left: 0,
              height: 4,
              width: underlineW,
              background: `linear-gradient(90deg, ${C.primary}, ${C.purple})`,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: C.primary,
            letterSpacing: 1,
            transform: `translateY(${subY}px)`,
            opacity: spr(frame, fps, 60),
            marginTop: 8,
          }}
        >
          India&apos;s Leading AI Automation Specialist
        </div>

        {/* Stats line */}
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 2,
            transform: `translateY(${statsY}px)`,
            opacity: statsOpacity,
            marginTop: 8,
          }}
        >
          3 Years &nbsp;|&nbsp; 50+ Clients &nbsp;|&nbsp; 20+ Services &nbsp;|&nbsp; India → Global
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s3-solution.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 4 – SERVICES ───────────────────────────────────────────────────────
const Scene4Services: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headerOpacity = spr(frame, fps, 0)
  const headerY = clamp(spr(frame, fps, 0), [0, 1], [-30, 0])

  const categories = [
    {
      color: C.purple,
      icon: '🤖',
      name: 'AGENTIC AI',
      services: ['AI Sales Agent', 'Customer Support Bot', 'AI Research Agent', 'Document AI Agent'],
      count: 4,
      delay: 0,
    },
    {
      color: C.blue,
      icon: '🧠',
      name: 'AI & LLM',
      services: ['Custom Chatbot', 'RAG System', 'AI Content Pipeline', 'Fine-tuned Models'],
      count: 4,
      delay: 120,
    },
    {
      color: C.primary,
      icon: '⚡',
      name: 'AUTOMATION',
      services: ['n8n Workflows', 'WhatsApp Bot', 'Email Automation', 'Lead Pipeline'],
      count: 4,
      delay: 240,
    },
    {
      color: C.gold,
      icon: '📊',
      name: 'DATA & RESEARCH',
      services: ['Web Scraper', 'Competitive Intel', 'Data Dashboard', 'LinkedIn Scraper'],
      count: 4,
      delay: 360,
    },
    {
      color: C.red,
      icon: '🔒',
      name: 'SECURITY',
      services: ['Penetration Testing', 'VAPT Report', 'Security Audit', 'Bug Bounty'],
      count: 4,
      delay: 480,
    },
  ]

  const badgeProgress = spr(frame, fps, 700)
  const badgeOpacity = spr(frame, fps, 700)
  const badgeY = clamp(badgeProgress, [0, 1], [20, 0])

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: C.font }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          gap: 32,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: 8,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Complete Service Catalog
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: '#fff',
            }}
          >
            20+ AUTOMATION SERVICES
          </div>
        </div>

        {/* Cards grid: 2 + 2 + 1 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Row 1: cards 0 and 1 */}
          <div style={{ display: 'flex', gap: 20 }}>
            {categories.slice(0, 2).map((cat, i) => (
              <ServiceCard key={i} cat={cat} frame={frame} fps={fps} />
            ))}
          </div>
          {/* Row 2: cards 2 and 3 */}
          <div style={{ display: 'flex', gap: 20 }}>
            {categories.slice(2, 4).map((cat, i) => (
              <ServiceCard key={i} cat={cat} frame={frame} fps={fps} />
            ))}
          </div>
          {/* Row 3: card 4 centered */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 'calc(50% - 10px)' }}>
              <ServiceCard cat={categories[4]} frame={frame} fps={fps} />
            </div>
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            textAlign: 'center',
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: 'rgba(0,229,255,0.1)',
              border: `1px solid ${C.primary}`,
              borderRadius: 40,
              fontSize: 18,
              fontWeight: 600,
              color: C.primary,
              letterSpacing: 1,
            }}
          >
            Starting at ₹25,000 &nbsp;•&nbsp; Projects in 7 Days
          </div>
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s4-services.mp3')} />
    </AbsoluteFill>
  )
}

function ServiceCard({
  cat,
  frame,
  fps,
}: {
  cat: {
    color: string
    icon: string
    name: string
    services: string[]
    count: number
    delay: number
  }
  frame: number
  fps: number
}) {
  const progress = spr(frame, fps, cat.delay)
  const y = clamp(progress, [0, 1], [60, 0])
  const opacity = spr(frame, fps, cat.delay)

  return (
    <div
      style={{
        flex: 1,
        transform: `translateY(${y}px)`,
        opacity,
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 16,
        borderTop: `3px solid ${cat.color}`,
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTopColor: cat.color,
        borderTopWidth: 3,
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 28 }}>{cat.icon}</span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: 2,
            }}
          >
            {cat.name}
          </span>
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: cat.color,
            background: `rgba(${hexToRgb(cat.color)},0.15)`,
            padding: '4px 10px',
            borderRadius: 20,
            border: `1px solid ${cat.color}`,
          }}
        >
          {cat.count} services
        </div>
      </div>

      {/* Service list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cat.services.map((svc, j) => (
          <div
            key={j}
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.65)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: cat.color,
                flexShrink: 0,
              }}
            />
            {svc}
          </div>
        ))}
      </div>
    </div>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

// ─── Scene 5 – WEBSITE DEMO ───────────────────────────────────────────────────
const Scene5Demo: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const annotations = [
    { delay: 60, text: 'AI Voice Agent 🎙️', side: 'right' as const },
    { delay: 300, text: '20+ Service Demos 🎬', side: 'left' as const },
    { delay: 600, text: 'Live AI Chat 🤖', side: 'right' as const },
    { delay: 900, text: 'Cinematic Animations ✨', side: 'left' as const },
    { delay: 1200, text: 'Terminal Portfolio 💻', side: 'right' as const },
  ]

  const browserProgress = spr(frame, fps, 0)
  const browserOpacity = spr(frame, fps, 0)
  const browserY = clamp(browserProgress, [0, 1], [30, 0])

  // Bottom bar pulse
  const barGlow = 0.4 + 0.2 * Math.sin(frame / 20)

  return (
    <AbsoluteFill style={{ background: '#080c14', fontFamily: C.font }}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 80px 60px',
          gap: 0,
        }}
      >
        {/* Small label above browser */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: C.primary,
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginBottom: 16,
            opacity: spr(frame, fps, 0),
          }}
        >
          LIVE DEMONSTRATION
        </div>

        {/* Browser chrome frame */}
        <div
          style={{
            flex: 1,
            transform: `translateY(${browserY}px)`,
            opacity: browserOpacity,
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Browser chrome bar */}
          <div
            style={{
              height: 42,
              background: '#1c1f26',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: 12,
              flexShrink: 0,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: 7 }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
                <div
                  key={i}
                  style={{ width: 13, height: 13, borderRadius: '50%', background: c }}
                />
              ))}
            </div>
            {/* URL bar */}
            <div
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 6,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                gap: 8,
              }}
            >
              <span style={{ color: C.green, fontSize: 11 }}>●</span>
              chiranjib.xyz
            </div>
          </div>

          {/* Video area */}
          <div style={{ flex: 1, background: '#000', position: 'relative' }}>
            <Video
              src={staticFile('screen-recording.mp4')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loop
              muted
            />

            {/* Floating annotations */}
            {annotations.map((ann, i) => {
              const annProgress = spr(frame, fps, ann.delay)
              const annX = clamp(
                annProgress,
                [0, 1],
                [ann.side === 'right' ? 80 : -80, 0]
              )
              const annOpacity = spr(frame, fps, ann.delay)

              // Hide after next annotation appears
              const nextDelay = annotations[i + 1]?.delay ?? Infinity
              const hideStart = nextDelay + 30
              const hideProgress = clamp(frame, [hideStart, hideStart + 20], [1, 0])

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    [ann.side]: 24,
                    top: 80 + i * 90,
                    transform: `translateX(${annX}px)`,
                    opacity: annOpacity * hideProgress,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {ann.side === 'right' && (
                    <div
                      style={{
                        fontSize: 20,
                        color: C.primary,
                        transform: 'scaleX(-1)',
                      }}
                    >
                      →
                    </div>
                  )}
                  <div
                    style={{
                      background: '#fff',
                      color: '#0a0a14',
                      fontSize: 15,
                      fontWeight: 700,
                      padding: '8px 18px',
                      borderRadius: 30,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ann.text}
                  </div>
                  {ann.side === 'left' && (
                    <div style={{ fontSize: 20, color: C.primary }}>→</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.primary,
              letterSpacing: 4,
              textShadow: `0 0 ${barGlow * 30}px rgba(0,229,255,${barGlow})`,
            }}
          >
            chiranjib.xyz
          </div>
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s5-demo.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 6 – SOCIAL PROOF ───────────────────────────────────────────────────
const Scene6Proof: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headerOpacity = spr(frame, fps, 0)

  // Counter animations (spring-based approach)
  const counters = [
    { target: 50, label: 'Businesses Automated', suffix: '+', delay: 30, color: C.primary },
    { target: 200, label: 'Hours Saved Per Client / Month', suffix: '+', delay: 60, color: C.purple },
    { target: 7, label: 'Day Avg. Delivery Time', suffix: '', delay: 90, color: C.gold },
  ]

  const testimonials = [
    {
      quote: '"Chiranjib automated my entire lead pipeline. We went from 5 leads/day to 40+ leads/day."',
      name: 'Rahul S.',
      role: 'Mumbai Startup',
      delay: 150,
      side: 'left' as const,
    },
    {
      quote: '"Our customer support bot handles 300+ queries daily without any human intervention."',
      name: 'Priya M.',
      role: 'E-commerce Owner',
      delay: 300,
      side: 'up' as const,
    },
    {
      quote: '"Best investment I made for my business. ROI in the first week."',
      name: 'Ahmed K.',
      role: 'Dubai Agency',
      delay: 450,
      side: 'right' as const,
    },
  ]

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: C.font }}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)',
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 100px',
          gap: 48,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', opacity: headerOpacity }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: 8,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Client Success
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#fff' }}>
            REAL RESULTS
          </div>
        </div>

        {/* Big counters */}
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
          {counters.map((c, i) => {
            const p = spr(frame, fps, c.delay)
            const count = Math.round(clamp(p, [0, 1], [0, c.target]))
            const opacity = spr(frame, fps, c.delay)
            const scale = clamp(spr(frame, fps, c.delay), [0, 1], [0.6, 1])

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  opacity,
                  transform: `scale(${scale})`,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderRadius: 20,
                  padding: '32px 24px',
                }}
              >
                <div
                  style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: c.color,
                    lineHeight: 1,
                    textShadow: `0 0 30px ${c.color}`,
                  }}
                >
                  {count}{c.suffix}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  {c.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div style={{ display: 'flex', gap: 24 }}>
          {testimonials.map((t, i) => {
            const p = spr(frame, fps, t.delay)
            let startX = 0
            let startY = 0
            if (t.side === 'left') startX = -80
            if (t.side === 'right') startX = 80
            if (t.side === 'up') startY = 60

            const x = clamp(p, [0, 1], [startX, 0])
            const y = clamp(p, [0, 1], [startY, 0])
            const opacity = spr(frame, fps, t.delay)

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  transform: `translate(${x}px, ${y}px)`,
                  opacity,
                  background: 'rgba(255,255,255,0.04)',
                  borderLeft: `4px solid ${C.primary}`,
                  borderRadius: '0 16px 16px 0',
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.7,
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${C.primary}, ${C.purple})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#fff',
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s6-proof.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 7 – PRICING ────────────────────────────────────────────────────────
const Scene7Pricing: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headerOpacity = spr(frame, fps, 0)

  const tiers = [
    {
      name: 'STARTER',
      price: '₹25,000',
      desc: 'Single automation',
      detail: 'Perfect for one workflow',
      borderColor: 'rgba(255,255,255,0.4)',
      highlight: false,
      badge: null,
      delay: 60,
    },
    {
      name: 'GROWTH',
      price: '₹75,000',
      desc: 'Multi-system',
      detail: 'Scale across departments',
      borderColor: C.primary,
      highlight: true,
      badge: 'Most Popular',
      delay: 30,
    },
    {
      name: 'ENTERPRISE',
      price: '₹2,00,000+',
      desc: 'Complete automation',
      detail: 'Custom scope & support',
      borderColor: C.purple,
      highlight: false,
      badge: null,
      delay: 90,
    },
  ]

  const footerOpacity = spr(frame, fps, 300)
  const footerY = clamp(spr(frame, fps, 300), [0, 1], [20, 0])

  // Purple glow pulse
  const purpleGlow = 0.08 + 0.03 * Math.sin(frame / 20)

  return (
    <AbsoluteFill style={{ background: '#05020e', fontFamily: C.font }}>
      {/* Background glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,${purpleGlow}) 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 100px',
          gap: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', opacity: headerOpacity }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.primary,
              letterSpacing: 8,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Investment
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#fff' }}>
            TRANSPARENT PRICING
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', width: '100%' }}>
          {tiers.map((tier, i) => {
            const p = spr(frame, fps, tier.delay)
            const y = clamp(p, [0, 1], [80, 0])
            const opacity = spr(frame, fps, tier.delay)
            const scaleFactor = tier.highlight ? 1.04 : 1

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  transform: `translateY(${y}px) scale(${scaleFactor})`,
                  opacity,
                  background: tier.highlight
                    ? 'rgba(0,229,255,0.06)'
                    : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${tier.borderColor}`,
                  borderRadius: 20,
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  position: 'relative',
                  boxShadow: tier.highlight
                    ? `0 0 40px rgba(0,229,255,0.1), 0 20px 60px rgba(0,0,0,0.4)`
                    : '0 8px 40px rgba(0,0,0,0.3)',
                }}
              >
                {/* Popular badge */}
                {tier.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: C.primary,
                      color: '#000',
                      fontSize: 12,
                      fontWeight: 800,
                      padding: '4px 20px',
                      borderRadius: 20,
                      letterSpacing: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tier.badge.toUpperCase()}
                  </div>
                )}

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: tier.borderColor,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  {tier.name}
                </div>

                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                    {tier.desc}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                    {tier.detail}
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 0',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ color: C.green }}>✓</span> Post-launch support included
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div
          style={{
            textAlign: 'center',
            opacity: footerOpacity,
            transform: `translateY(${footerY}px)`,
            fontSize: 16,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: 1,
          }}
        >
          No hidden fees. &nbsp;•&nbsp; Delivery in 7–30 days. &nbsp;•&nbsp; Post-launch support included.
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s7-pricing.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Scene 8 – CTA ────────────────────────────────────────────────────────────
const Scene8CTA: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const words = ['YOUR', 'BUSINESS.', 'AUTOMATED.']

  // Glow intensifies over time
  const glowIntensity = clamp(frame, [0, 200], [0.15, 0.4])
  const cyanglow = 0.3 + 0.15 * Math.sin(frame / 15)
  const purpleglow = 0.2 + 0.1 * Math.sin(frame / 18 + 1)

  const domainProgress = spr(frame, fps, 80)
  const domainOpacity = spr(frame, fps, 80)
  const domainScale = clamp(domainProgress, [0, 1], [0.7, 1])

  const btn1Progress = spr(frame, fps, 130)
  const btn2Progress = spr(frame, fps, 160)

  const taglineOpacity = spr(frame, fps, 200)
  const taglineY = clamp(spr(frame, fps, 200), [0, 1], [20, 0])

  return (
    <AbsoluteFill style={{ background: '#02040a', fontFamily: C.font }}>
      {/* Multi-layer glow background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0,229,255,${cyanglow * glowIntensity}) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(139,92,246,${purpleglow * glowIntensity}) 0%, transparent 50%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
        }}
      >
        {/* Main headline word by word */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
          {words.map((word, i) => {
            const delay = i * 20
            const p = spr(frame, fps, delay, 120, 200)
            const y = clamp(p, [0, 1], [50, 0])
            const opacity = spr(frame, fps, delay, 80, 200)
            const isHighlight = i === 2

            return (
              <span
                key={i}
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  color: isHighlight ? C.primary : '#fff',
                  transform: `translateY(${y}px)`,
                  opacity,
                  letterSpacing: 2,
                  textShadow: isHighlight
                    ? `0 0 40px rgba(0,229,255,0.6)`
                    : '0 0 20px rgba(255,255,255,0.1)',
                }}
              >
                {word}
              </span>
            )
          })}
        </div>

        {/* chiranjib.xyz domain */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: C.primary,
            letterSpacing: 6,
            opacity: domainOpacity,
            transform: `scale(${domainScale})`,
            textShadow: `0 0 40px rgba(0,229,255,${cyanglow}), 0 0 80px rgba(0,229,255,${cyanglow * 0.4})`,
          }}
        >
          chiranjib.xyz
        </div>

        {/* Buttons row */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 8,
          }}
        >
          {/* Telegram button */}
          <div
            style={{
              opacity: spr(frame, fps, 130),
              transform: `translateX(${clamp(btn1Progress, [0, 1], [-40, 0])}px)`,
              background: C.primary,
              color: '#000',
              fontSize: 18,
              fontWeight: 800,
              padding: '18px 36px',
              borderRadius: 50,
              letterSpacing: 0.5,
            }}
          >
            💬 @ChiranjibAI on Telegram
          </div>

          {/* Website button */}
          <div
            style={{
              opacity: spr(frame, fps, 160),
              transform: `translateX(${clamp(btn2Progress, [0, 1], [40, 0])}px)`,
              border: `2px solid ${C.primary}`,
              color: C.primary,
              fontSize: 18,
              fontWeight: 700,
              padding: '18px 36px',
              borderRadius: 50,
            }}
          >
            🌐 chiranjib.xyz
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 3,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Free Consultation &nbsp;•&nbsp; Custom Solutions &nbsp;•&nbsp; 3 Year Track Record
        </div>
      </AbsoluteFill>

      <Audio src={staticFile('voiceover/demo/s8-cta.mp3')} />
    </AbsoluteFill>
  )
}

// ─── Master composition ───────────────────────────────────────────────────────
// Durations: 660+840+900+1950+2550+1200+660+380 = 9140 scenes - 7×20 transitions = 9000f exactly
export const MasterDemoComposition: React.FC = () => {
  const timing = springTiming({
    durationInFrames: 20,
    config: { damping: 200, stiffness: 80 },
  })
  const tr = slide({ direction: 'from-right' })

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={660}>
          <Scene1Hook durationInFrames={660} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={840}>
          <Scene2Pain durationInFrames={840} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={900}>
          <Scene3Solution durationInFrames={900} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={1950}>
          <Scene4Services durationInFrames={1950} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={2550}>
          <Scene5Demo durationInFrames={2550} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={1200}>
          <Scene6Proof durationInFrames={1200} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={660}>
          <Scene7Pricing durationInFrames={660} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={tr} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={380}>
          <Scene8CTA durationInFrames={380} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  )
}
