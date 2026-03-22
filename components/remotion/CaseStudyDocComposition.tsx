'use client'
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { slide } from '@remotion/transitions/slide'

// ── Schema (plain TS — zod not installed) ─────────────────────────────────────
export interface CaseStudySchemaType {
  clientName: string
  industry: string
  problem: string
  solution: string
  result: string
  metric: number
}

export const caseStudySchema: CaseStudySchemaType = {
  clientName: 'E-Commerce Brand',
  industry: 'Real Estate',
  problem: 'Manually qualifying 200+ leads/day',
  solution: 'WhatsApp Bot + CRM automation via n8n',
  result: '847 leads/month automated, 12hrs saved daily',
  metric: 847,
}

// ── GlitchText: random chars → settle into real text ─────────────────────────
const GLITCH_CHARS = '!@#$%^&*<>?/|{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function GlitchText({
  text,
  startFrame = 0,
  settleDuration = 40,
  color = '#00e5ff',
  fontSize = 48,
  fontWeight = 700,
  fontFamily = 'monospace',
}: {
  text: string
  startFrame?: number
  settleDuration?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
}) {
  const frame = useCurrentFrame()

  return (
    <span
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        fontFamily,
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.1,
        letterSpacing: '0.05em',
      }}
    >
      {text.split('').map((char, i) => {
        if (char === ' ')
          return (
            <span
              key={i}
              style={{ display: 'inline-block', width: fontSize * 0.3 }}
            />
          )

        const localFrame = frame - startFrame
        const settleAt = Math.round((i / text.replace(/ /g, '').length) * settleDuration)
        const settled = localFrame >= settleAt
        const progress = Math.max(0, localFrame - settleAt)

        let displayChar = char
        if (!settled) {
          // Show glitch char before settling
          const glitchIndex = Math.floor((localFrame * (i + 7)) % GLITCH_CHARS.length)
          displayChar =
            localFrame < 0 ? ' ' : (GLITCH_CHARS[glitchIndex] ?? char)
        }

        const opacity = localFrame < 0 ? 0 : 1
        const glitchColor =
          !settled && localFrame >= 0 ? 'rgba(0,229,255,0.6)' : color
        const textShadow =
          !settled && localFrame >= 0
            ? `0 0 8px rgba(0,229,255,0.8)`
            : progress < 5
              ? `0 0 ${interpolate(progress, [0, 5], [12, 0])}px rgba(0,229,255,0.6)`
              : 'none'

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              color: glitchColor,
              textShadow,
              transition: 'none',
            }}
          >
            {displayChar}
          </span>
        )
      })}
    </span>
  )
}

// ── TypewriterText: types letter by letter ────────────────────────────────────
function TypewriterText({
  text,
  startFrame = 0,
  charDelay = 3,
  color = '#e2e8f0',
  fontSize = 20,
  fontWeight = 400,
  fontFamily = 'sans-serif',
}: {
  text: string
  startFrame?: number
  charDelay?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
}) {
  const frame = useCurrentFrame()
  const localFrame = frame - startFrame
  const charsToShow = Math.floor(Math.max(0, localFrame) / charDelay)

  return (
    <span
      style={{
        fontFamily,
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.6,
      }}
    >
      {text.slice(0, charsToShow)}
      {charsToShow < text.length && localFrame >= 0 && (
        <span
          style={{
            display: 'inline-block',
            width: 2,
            height: fontSize,
            background: '#00e5ff',
            marginLeft: 2,
            opacity: Math.floor(localFrame / 8) % 2 === 0 ? 1 : 0,
            verticalAlign: 'middle',
          }}
        />
      )}
    </span>
  )
}

// ── SplitTextSpring: per-letter spring entrance ───────────────────────────────
function SplitTextSpring({
  text,
  startFrame = 0,
  letterDelay = 3,
  color = '#ffffff',
  fontSize = 48,
  fontWeight = 700,
  fontFamily = 'sans-serif',
}: {
  text: string
  startFrame?: number
  letterDelay?: number
  color?: string
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <span
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        fontFamily,
        color,
        fontSize,
        fontWeight,
        lineHeight: 1.1,
      }}
    >
      {text.split('').map((char, i) => {
        if (char === ' ')
          return (
            <span
              key={i}
              style={{ display: 'inline-block', width: fontSize * 0.28 }}
            />
          )

        const delay = startFrame + i * letterDelay
        const localFrame = frame - delay
        const prog = spring({
          frame: localFrame,
          fps,
          config: { damping: 10, stiffness: 200 },
        })
        const opacity = interpolate(prog, [0, 0.1], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const y = interpolate(prog, [0, 1], [40, 0])

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

// ── Scene 1: CLIENT STORY — glitch reveal ─────────────────────────────────────
function Scene1({ clientName, industry }: { clientName: string; industry: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  })
  const nameSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 8, stiffness: 180 },
  })
  const nameY = interpolate(nameSpring, [0, 1], [30, 0])
  const nameOpacity = interpolate(nameSpring, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const scanlineOpacity = interpolate(
    frame,
    [0, 10, 80, 90],
    [0, 0.04, 0.04, 0],
    { extrapolateRight: 'clamp' }
  )

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: bgOpacity,
        padding: 48,
      }}
    >
      {/* Scanline effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.015) 2px, rgba(0,229,255,0.015) 4px)',
          opacity: scanlineOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Label */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: 28,
            opacity: frame > 5 ? 1 : 0,
          }}
        >
          ◈ CLIENT STORY ◈
        </div>

        {/* Glitch headline */}
        <div style={{ marginBottom: 12 }}>
          <GlitchText
            text="CLIENT STORY"
            startFrame={8}
            settleDuration={35}
            color="#00e5ff"
            fontSize={64}
            fontWeight={800}
            fontFamily="monospace"
          />
        </div>

        {/* Client name springs in */}
        <div
          style={{
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '10px 28px',
              border: '1px solid rgba(0,229,255,0.3)',
              borderRadius: 8,
              background: 'rgba(0,229,255,0.05)',
            }}
          >
            <span
              style={{
                color: '#ffffff',
                fontSize: 22,
                fontFamily: 'sans-serif',
                fontWeight: 700,
              }}
            >
              {clientName}
            </span>
            <span
              style={{
                color: 'rgba(100,116,139,0.8)',
                fontSize: 14,
                fontFamily: 'monospace',
                marginLeft: 12,
              }}
            >
              · {industry}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 2: THE PROBLEM — typewriter ─────────────────────────────────────────
function Scene2({ problem }: { problem: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const labelProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 200 },
  })
  const labelOpacity = interpolate(labelProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const barWidth = interpolate(frame, [15, 55], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Corner decoration */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 48,
          width: 40,
          height: 40,
          borderTop: '2px solid rgba(0,229,255,0.3)',
          borderLeft: '2px solid rgba(0,229,255,0.3)',
        }}
      />

      <div style={{ opacity: labelOpacity, marginBottom: 16 }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.25em',
            color: 'rgba(239,68,68,0.7)',
            textTransform: 'uppercase',
          }}
        >
          ▸ THE PROBLEM
        </span>
      </div>

      {/* Accent bar */}
      <div
        style={{
          width: `${barWidth}%`,
          maxWidth: 320,
          height: 2,
          background:
            'linear-gradient(90deg, rgba(239,68,68,0.8) 0%, transparent 100%)',
          marginBottom: 28,
        }}
      />

      <div>
        <SplitTextSpring
          text="The Challenge"
          startFrame={20}
          letterDelay={4}
          color="#ffffff"
          fontSize={46}
          fontWeight={700}
          fontFamily="sans-serif"
        />
      </div>

      <div
        style={{
          marginTop: 28,
          padding: '20px 24px',
          border: '1px solid rgba(239,68,68,0.15)',
          borderLeft: '3px solid rgba(239,68,68,0.6)',
          borderRadius: '0 8px 8px 0',
          background: 'rgba(239,68,68,0.04)',
          maxWidth: 680,
        }}
      >
        <TypewriterText
          text={problem}
          startFrame={35}
          charDelay={2}
          color="#e2e8f0"
          fontSize={20}
          fontWeight={400}
          fontFamily="sans-serif"
        />
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 3: THE SOLUTION — accent lines animate in ───────────────────────────
function Scene3({ solution }: { solution: string }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const line1Width = interpolate(frame, [10, 40], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const line2Width = interpolate(frame, [20, 55], [0, 70], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const labelProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 200 },
  })
  const labelOpacity = interpolate(labelProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const cardProg = spring({
    frame: frame - 50,
    fps,
    config: { damping: 10, stiffness: 160 },
  })
  const cardOpacity = interpolate(cardProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const cardY = interpolate(cardProg, [0, 1], [20, 0])

  // Tech tags animate in sequentially
  const tags = solution.split('+').map((t) => t.trim())

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Top-right glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 400,
          height: 300,
          background:
            'radial-gradient(ellipse at 80% 10%, rgba(0,229,255,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ opacity: labelOpacity, marginBottom: 16 }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.25em',
            color: 'rgba(0,229,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          ▸ THE SOLUTION
        </span>
      </div>

      {/* Cyan accent lines */}
      <div
        style={{
          width: `${line1Width}%`,
          maxWidth: 400,
          height: 2,
          background:
            'linear-gradient(90deg, rgba(0,229,255,0.8) 0%, transparent 100%)',
          marginBottom: 6,
        }}
      />
      <div
        style={{
          width: `${line2Width}%`,
          maxWidth: 280,
          height: 1,
          background:
            'linear-gradient(90deg, rgba(0,229,255,0.4) 0%, transparent 100%)',
          marginBottom: 24,
        }}
      />

      <div>
        <SplitTextSpring
          text="The Solution"
          startFrame={15}
          letterDelay={4}
          color="#ffffff"
          fontSize={46}
          fontWeight={700}
          fontFamily="sans-serif"
        />
      </div>

      <div
        style={{
          marginTop: 28,
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          padding: '20px 24px',
          border: '1px solid rgba(0,229,255,0.2)',
          borderLeft: '3px solid rgba(0,229,255,0.7)',
          borderRadius: '0 8px 8px 0',
          background: 'rgba(0,229,255,0.04)',
          maxWidth: 680,
        }}
      >
        <p
          style={{
            color: '#e2e8f0',
            fontSize: 19,
            fontFamily: 'sans-serif',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {solution}
        </p>
      </div>

      {/* Tech tag pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          marginTop: 20,
        }}
      >
        {tags.map((tag, i) => {
          const tagProg = spring({
            frame: frame - (65 + i * 10),
            fps,
            config: { damping: 12, stiffness: 200 },
          })
          const tagOpacity = interpolate(tagProg, [0, 0.1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          const tagScale = interpolate(tagProg, [0, 0.5, 1], [0.7, 1.1, 1])
          return (
            <div
              key={i}
              style={{
                opacity: tagOpacity,
                transform: `scale(${tagScale})`,
                padding: '6px 14px',
                borderRadius: 20,
                border: '1px solid rgba(0,229,255,0.3)',
                background: 'rgba(0,229,255,0.06)',
                color: '#00e5ff',
                fontSize: 12,
                fontFamily: 'monospace',
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 4: THE RESULT — metric counter + bar ────────────────────────────────
function Scene4({ result, metric }: { result: string; metric: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const labelProg = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 200 },
  })
  const labelOpacity = interpolate(labelProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const counterProg = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 80 },
  })
  const counterValue = Math.round(interpolate(counterProg, [0, 1], [0, metric]))

  const barProg = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 100 },
  })
  const barWidth = interpolate(barProg, [0, 1], [0, 85])

  const resultProg = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 160 },
  })
  const resultOpacity = interpolate(resultProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const resultY = interpolate(resultProg, [0, 1], [15, 0])

  const glowOpacity = interpolate(counterProg, [0, 0.5, 1], [0, 0.3, 0.15])

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px',
      }}
    >
      {/* Metric glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 500,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,229,255,${glowOpacity}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ opacity: labelOpacity, marginBottom: 20 }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.25em',
            color: 'rgba(34,197,94,0.7)',
            textTransform: 'uppercase',
          }}
        >
          ▸ THE RESULT
        </span>
      </div>

      <div>
        <SplitTextSpring
          text="Measurable Impact"
          startFrame={12}
          letterDelay={3}
          color="#ffffff"
          fontSize={46}
          fontWeight={700}
          fontFamily="sans-serif"
        />
      </div>

      {/* Big metric number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 12,
          marginTop: 28,
          marginBottom: 16,
        }}
      >
        <span
          style={{
            color: '#00e5ff',
            fontSize: 88,
            fontWeight: 800,
            fontFamily: 'monospace',
            lineHeight: 1,
            textShadow: '0 0 30px rgba(0,229,255,0.3)',
          }}
        >
          {counterValue.toLocaleString()}
        </span>
        <span
          style={{
            color: 'rgba(100,116,139,0.8)',
            fontSize: 22,
            fontFamily: 'monospace',
          }}
        >
          leads/mo
        </span>
      </div>

      {/* Animated bar */}
      <div
        style={{
          width: '100%',
          maxWidth: 560,
          height: 8,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 4,
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: '100%',
            background:
              'linear-gradient(90deg, #00e5ff 0%, rgba(0,229,255,0.4) 100%)',
            borderRadius: 4,
            boxShadow: '0 0 10px rgba(0,229,255,0.5)',
          }}
        />
      </div>

      {/* Result text */}
      <div
        style={{
          opacity: resultOpacity,
          transform: `translateY(${resultY}px)`,
          padding: '16px 20px',
          border: '1px solid rgba(34,197,94,0.2)',
          borderLeft: '3px solid rgba(34,197,94,0.7)',
          borderRadius: '0 8px 8px 0',
          background: 'rgba(34,197,94,0.04)',
          maxWidth: 640,
        }}
      >
        <p
          style={{
            color: '#e2e8f0',
            fontSize: 17,
            fontFamily: 'sans-serif',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {result}
        </p>
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 5: CTA — chiranjib.xyz spring bounce ────────────────────────────────
function Scene5() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const glowOpacity = interpolate(frame, [0, 20, 60, 90], [0, 0.6, 0.3, 0.5], {
    extrapolateRight: 'clamp',
  })
  const ctaProg = spring({
    frame: frame - 45,
    fps,
    config: { damping: 6, stiffness: 250 },
  })
  const ctaScale = interpolate(ctaProg, [0, 0.5, 1], [0.6, 1.12, 1])
  const ctaOpacity = interpolate(ctaProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const subProg = spring({
    frame: frame - 65,
    fps,
    config: { damping: 12, stiffness: 180 },
  })
  const subOpacity = interpolate(subProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const subY = interpolate(subProg, [0, 1], [12, 0])

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,229,255,${glowOpacity * 0.18}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'rgba(0,229,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: 24,
            opacity: frame > 10 ? 1 : 0,
          }}
        >
          ◈ WANT SIMILAR RESULTS? ◈
        </div>

        <div style={{ marginBottom: 8 }}>
          <SplitTextSpring
            text="Ready to automate"
            startFrame={8}
            letterDelay={3}
            color="#e2e8f0"
            fontSize={42}
            fontWeight={700}
            fontFamily="sans-serif"
          />
        </div>
        <div>
          <SplitTextSpring
            text="your business?"
            startFrame={30}
            letterDelay={4}
            color="#00e5ff"
            fontSize={42}
            fontWeight={700}
            fontFamily="sans-serif"
          />
        </div>

        {/* CTA button spring bounce */}
        <div
          style={{
            marginTop: 36,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            display: 'inline-block',
            padding: '16px 44px',
            background: '#00e5ff',
            color: '#050505',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            boxShadow: '0 0 40px rgba(0,229,255,0.4)',
          }}
        >
          chiranjib.xyz
        </div>

        <div
          style={{
            marginTop: 16,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            color: 'rgba(100,116,139,0.7)',
            fontSize: 13,
            fontFamily: 'monospace',
          }}
        >
          Telegram: @chiranjibai · India-based AI Automation
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ── Main Composition ──────────────────────────────────────────────────────────
export function CaseStudyDocComposition(
  props: Partial<CaseStudySchemaType>
) {
  const merged: CaseStudySchemaType = {
    ...caseStudySchema,
    ...props,
  }

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene1 clientName={merged.clientName} industry={merged.industry} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 14, stiffness: 200 }, durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene2 problem={merged.problem} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 14, stiffness: 200 }, durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene3 solution={merged.solution} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={springTiming({ config: { damping: 14, stiffness: 200 }, durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene4 result={merged.result} metric={merged.metric} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-bottom' })}
        timing={springTiming({ config: { damping: 12, stiffness: 180 }, durationInFrames: 15 })}
      />

      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene5 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  )
}
