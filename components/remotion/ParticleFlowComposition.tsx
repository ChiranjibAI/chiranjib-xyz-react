/**
 * ParticleFlowComposition — Remotion + @remotion/three
 * 500 cyan particles flowing left→right, wrapping, glowing at center (AI processing zone).
 * Pure frame-driven animation — NO useState / useEffect.
 */
import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import { ThreeCanvas } from '@remotion/three'

// ── Seeded pseudo-random (deterministic) ──────────────────────────────────────
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const PARTICLE_COUNT = 500

// Pre-compute static particle data (only depends on index, not frame)
interface ParticleData {
  startX: number
  y: number
  z: number
  speed: number // 0.3 – 1.2 units/sec
}

const PARTICLES: ParticleData[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  startX: -6 + seededRandom(i * 4 + 0) * 12, // spread across full range initially
  y: (seededRandom(i * 4 + 1) - 0.5) * 4,    // -2 to 2
  z: (seededRandom(i * 4 + 2) - 0.5) * 2,    // -1 to 1
  speed: 0.3 + seededRandom(i * 4 + 3) * 0.9, // 0.3 – 1.2
}))

// ── Particle Points scene component ──────────────────────────────────────────
function ParticleScene() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Compute positions every frame — deterministic from frame number
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const sz  = new Float32Array(PARTICLE_COUNT)

    const timeSeconds = frame / fps

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = PARTICLES[i]

      // Move right; wrap when x exceeds 6
      let x = p.startX + timeSeconds * p.speed
      // Wrap: map x into [-6, 6) range
      x = ((x + 6) % 12) - 6

      const y = p.y
      const z = p.z

      pos[i * 3 + 0] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      // AI processing glow zone: x in [-0.5, 0.5]
      const distFromCenter = Math.abs(x)
      const inGlowZone = distFromCenter < 0.5

      if (inGlowZone) {
        // Glow: bright white-cyan
        const glow = 1.0 - distFromCenter / 0.5 // 0→1 as approaches center
        col[i * 3 + 0] = 0.6 + glow * 0.4  // R: 0.6–1.0
        col[i * 3 + 1] = 0.9 + glow * 0.1  // G: 0.9–1.0
        col[i * 3 + 2] = 1.0               // B: full
        sz[i] = 0.04 + glow * 0.04          // larger when glowing
      } else {
        // Normal cyan
        col[i * 3 + 0] = 0.0
        col[i * 3 + 1] = 0.898 // #00e5ff → 0x00/0xe5/0xff
        col[i * 3 + 2] = 1.0
        sz[i] = 0.02 + seededRandom(i * 7 + 5) * 0.02 // 0.02 – 0.04
      }
    }

    return { positions: pos, colors: col, sizes: sz }
  }, [frame, fps])

  return (
    <>
      {/* Dim ambient — particles are self-lit via vertexColors */}
      <ambientLight intensity={0.05} />

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={PARTICLE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
            count={PARTICLE_COUNT}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          sizeAttenuation
          size={0.03}
        />
      </points>

      {/* Subtle cyan point light at the processing zone */}
      <pointLight position={[0, 0, 1]} intensity={0.4} color="#00e5ff" distance={4} />
    </>
  )
}

// ── Root Remotion Composition ─────────────────────────────────────────────────
export function ParticleFlowComposition() {
  const { width, height } = useVideoConfig()

  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ background: '#050505' }}
      camera={{ position: [0, 0, 5], fov: 60 }}
    >
      <ParticleScene />
    </ThreeCanvas>
  )
}
