import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { TransitionSeries, linearTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'

// ── Waveform Visualizer ────────────────────────────────────────────────────────
function WaveformVisualizer() {
  const frame = useCurrentFrame()
  const BAR_COUNT = 30

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 3,
        padding: '0 40px 12px',
      }}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const height = Math.abs(Math.sin(frame / 8 + i * 0.4)) * 60 + 10
        const opacity = interpolate(height, [10, 70], [0.2, 0.9], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              background: `rgba(0,229,255,${opacity})`,
              borderRadius: 2,
              flexShrink: 0,
              boxShadow: `0 0 ${height * 0.15}px rgba(0,229,255,${opacity * 0.5})`,
            }}
          />
        )
      })}
    </div>
  )
}

// ── Scene 1: Stats ─────────────────────────────────────────────────────────────
function StatsScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const clientCount = Math.round(
    interpolate(frame, [0, 120], [0, 50], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )

  const revenueProg = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 180 } })
  const automationProg = spring({ frame: frame - 60, fps, config: { damping: 14, stiffness: 180 } })

  const revenueY = interpolate(revenueProg, [0, 1], [40, 0])
  const revenueOpacity = interpolate(revenueProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const automationY = interpolate(automationProg, [0, 1], [40, 0])
  const automationOpacity = interpolate(automationProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  const titleProg = spring({ frame, fps, config: { damping: 12, stiffness: 200 } })
  const titleScale = interpolate(titleProg, [0, 1], [0.8, 1])
  const titleOpacity = interpolate(titleProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: '#00e5ff',
          textTransform: 'uppercase',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 8,
        }}
      >
        Chiranjib Ghosh · AI Automation Specialist
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-end' }}>
        {/* Clients counter */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 96,
              fontWeight: 800,
              color: '#00e5ff',
              lineHeight: 1,
              textShadow: '0 0 40px rgba(0,229,255,0.4)',
            }}
          >
            {clientCount}+
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 16, color: '#64748b', marginTop: 8 }}>
            Clients Served
          </div>
        </div>

        {/* Revenue */}
        <div
          style={{
            textAlign: 'center',
            opacity: revenueOpacity,
            transform: `translateY(${revenueY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 96,
              fontWeight: 800,
              color: '#22c55e',
              lineHeight: 1,
              textShadow: '0 0 40px rgba(34,197,94,0.4)',
            }}
          >
            ₹2Cr+
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 16, color: '#64748b', marginTop: 8 }}>
            Revenue Generated
          </div>
        </div>

        {/* Automations */}
        <div
          style={{
            textAlign: 'center',
            opacity: automationOpacity,
            transform: `translateY(${automationY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: 96,
              fontWeight: 800,
              color: '#a855f7',
              lineHeight: 1,
              textShadow: '0 0 40px rgba(168,85,247,0.4)',
            }}
          >
            200+
          </div>
          <div style={{ fontFamily: 'sans-serif', fontSize: 16, color: '#64748b', marginTop: 8 }}>
            Automations Built
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 2: Services ──────────────────────────────────────────────────────────
const SERVICES = [
  { name: 'AI Agents', icon: '🤖', color: '#00e5ff' },
  { name: 'WhatsApp Bots', icon: '💬', color: '#22c55e' },
  { name: 'n8n Workflows', icon: '⚡', color: '#f59e0b' },
  { name: 'RAG Systems', icon: '🧠', color: '#a855f7' },
]

function ServicesScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: '#00e5ff',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Core Services
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {SERVICES.map((svc, i) => {
          const prog = spring({
            frame: frame - i * 18,
            fps,
            config: { damping: 12, stiffness: 200 },
          })
          const y = interpolate(prog, [0, 1], [60, 0])
          const opacity = interpolate(prog, [0, 0.1], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })
          const scale = interpolate(prog, [0, 1], [0.7, 1])

          return (
            <div
              key={svc.name}
              style={{
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                background: '#0a0a0a',
                border: `1px solid ${svc.color}25`,
                borderRadius: 20,
                padding: '32px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
                minWidth: 200,
                boxShadow: `0 0 40px -10px ${svc.color}20`,
              }}
            >
              <div style={{ fontSize: 48 }}>{svc.icon}</div>
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                {svc.name}
              </div>
              <div
                style={{
                  width: 32,
                  height: 3,
                  background: svc.color,
                  borderRadius: 2,
                  boxShadow: `0 0 10px ${svc.color}`,
                }}
              />
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 3: Tech Stack ────────────────────────────────────────────────────────
const TECH_STACK = [
  { name: 'OpenAI', color: '#10a37f', letter: 'O' },
  { name: 'LangChain', color: '#1c3d5a', letter: 'L' },
  { name: 'n8n', color: '#ea4b71', letter: 'n' },
  { name: 'Python', color: '#3776ab', letter: 'Py' },
  { name: 'React', color: '#61dafb', letter: 'R' },
]

function TechStackScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: '#00e5ff',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Tech Stack
      </div>

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800 }}>
        {TECH_STACK.map((tech, i) => {
          const prog = spring({
            frame: frame - i * 15,
            fps,
            config: { damping: 10, stiffness: 250 },
          })
          const scale = interpolate(prog, [0, 1], [0, 1])
          const opacity = interpolate(prog, [0, 0.05], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })
          const rotate = interpolate(prog, [0, 1], [-20, 0])

          return (
            <div
              key={tech.name}
              style={{
                opacity,
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: `${tech.color}18`,
                  border: `2px solid ${tech.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 800,
                  color: tech.color,
                  fontFamily: 'monospace',
                  boxShadow: `0 0 20px -4px ${tech.color}40`,
                }}
              >
                {tech.letter}
              </div>
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#94a3b8',
                }}
              >
                {tech.name}
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 4: Case Study ────────────────────────────────────────────────────────
const CASE_BARS = [
  { label: 'Leads/Month', value: 847, max: 900, color: '#00e5ff' },
  { label: 'Hours Saved', value: 320, max: 400, color: '#22c55e' },
  { label: 'Conversion %', value: 34, max: 50, color: '#a855f7' },
]

function CaseStudyScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleProg = spring({ frame, fps, config: { damping: 14, stiffness: 180 } })
  const titleOpacity = interpolate(titleProg, [0, 0.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const titleY = interpolate(titleProg, [0, 1], [30, 0])

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
        padding: '0 80px 80px',
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: '#00e5ff',
          textTransform: 'uppercase',
          marginBottom: 12,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Case Study · Real Estate Client
      </div>

      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: 28,
          fontWeight: 700,
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: 8,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: 700,
        }}
      >
        847 leads/month automated
      </div>
      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: 16,
          color: '#64748b',
          marginBottom: 40,
          opacity: interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Full WhatsApp + CRM pipeline automation
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 600 }}>
        {CASE_BARS.map((bar, i) => {
          const barProg = interpolate(
            frame,
            [30 + i * 20, 90 + i * 20],
            [0, bar.value / bar.max],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          )
          const labelOpacity = interpolate(frame, [20 + i * 20, 40 + i * 20], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          })

          return (
            <div key={bar.label} style={{ opacity: labelOpacity }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontFamily: 'sans-serif',
                  fontSize: 14,
                  color: '#94a3b8',
                }}
              >
                <span>{bar.label}</span>
                <span style={{ color: bar.color, fontWeight: 700 }}>
                  {Math.round(barProg * bar.value)}
                </span>
              </div>
              <div
                style={{
                  background: '#1a1a1a',
                  borderRadius: 6,
                  height: 12,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${barProg * 100}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})`,
                    borderRadius: 6,
                    boxShadow: `0 0 10px ${bar.color}60`,
                    transition: 'none',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

// ── Scene 5: CTA ───────────────────────────────────────────────────────────────
function CTAScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Typewriter effect for "chiranjib.xyz"
  const CTA_TEXT = 'chiranjib.xyz'
  const charsToShow = Math.floor(
    interpolate(frame, [20, 80], [0, CTA_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  )

  const subtitleProg = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 160 } })
  const subtitleOpacity = interpolate(subtitleProg, [0, 0.1], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  })
  const subtitleY = interpolate(subtitleProg, [0, 1], [20, 0])

  // Pulsing dot
  const pulseScale = 1 + Math.sin(frame / 8) * 0.3

  // Glow orb
  const orbScale = spring({ frame, fps, config: { damping: 20, stiffness: 100 } })
  const orbSize = interpolate(orbScale, [0, 1], [0, 400])

  return (
    <AbsoluteFill
      style={{
        background: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80,
      }}
    >
      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          width: orbSize,
          height: orbSize,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 4,
          color: '#64748b',
          textTransform: 'uppercase',
          marginBottom: 20,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        Ready to automate your business?
      </div>

      {/* Typewriter URL */}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 80,
          fontWeight: 800,
          color: '#00e5ff',
          textShadow: '0 0 60px rgba(0,229,255,0.5)',
          letterSpacing: -2,
          position: 'relative',
        }}
      >
        {CTA_TEXT.slice(0, charsToShow)}
        {charsToShow < CTA_TEXT.length && (
          <span
            style={{
              display: 'inline-block',
              width: 4,
              height: 72,
              background: '#00e5ff',
              marginLeft: 4,
              verticalAlign: 'middle',
              opacity: Math.sin(frame / 6) > 0 ? 1 : 0,
            }}
          />
        )}
      </div>

      {/* Available for projects */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 24,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#22c55e',
            transform: `scale(${pulseScale})`,
            boxShadow: `0 0 ${10 + pulseScale * 8}px rgba(34,197,94,0.8)`,
          }}
        />
        <span
          style={{
            fontFamily: 'sans-serif',
            fontSize: 20,
            color: '#94a3b8',
            fontWeight: 500,
          }}
        >
          Available for projects
        </span>
      </div>
    </AbsoluteFill>
  )
}

// ── Main Composition ───────────────────────────────────────────────────────────
const SCENE_DURATION = 180
const TRANSITION_DURATION = 15

export function ShowreelComposition() {
  return (
    <AbsoluteFill style={{ background: '#050505' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <ServicesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <TechStackScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <CaseStudyScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Waveform always visible at bottom */}
      <WaveformVisualizer />

      {/* Persistent branding */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 28,
          fontFamily: 'monospace',
          fontSize: 11,
          color: 'rgba(0,229,255,0.3)',
          letterSpacing: 2,
        }}
      >
        chiranjib.xyz
      </div>
    </AbsoluteFill>
  )
}
