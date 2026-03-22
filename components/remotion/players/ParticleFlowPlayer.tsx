'use client'
import dynamic from 'next/dynamic'
import { Player } from '@remotion/player'

// Dynamic import for the composition to avoid SSR issues with Three.js / WebGL
const ParticleFlowComposition = dynamic(
  () =>
    import('../ParticleFlowComposition').then((m) => m.ParticleFlowComposition),
  { ssr: false }
)

export function ParticleFlowPlayer() {
  return (
    <div style={{ width: '100%', height: 400, position: 'relative' }}>
      <Player
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component={ParticleFlowComposition as any}
        durationInFrames={300}   // 10s @ 30fps
        compositionWidth={1280}
        compositionHeight={400}
        fps={30}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  )
}
