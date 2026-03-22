'use client'

import { Player } from '@remotion/player'
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

// Lazily load the composition (no SSR — needs WebGL + Remotion internals)
const NeuralBrainComp = dynamic(
  () =>
    import('../NeuralBrainComposition').then((m) => ({
      default: m.NeuralBrainComposition,
    })),
  { ssr: false }
) as ComponentType<Record<string, never>>

/**
 * NeuralBrainPlayer
 * Wraps the Remotion <Player> with the NeuralBrainComposition.
 * Renders a 10-second looping 3D neural network animation.
 * Must be imported with dynamic(..., { ssr: false }) from parent.
 */
export function NeuralBrainPlayer() {
  return (
    <Player
      component={NeuralBrainComp}
      durationInFrames={300}
      compositionWidth={1280}
      compositionHeight={720}
      fps={30}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
