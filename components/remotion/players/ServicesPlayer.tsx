'use client'
import { Player } from '@remotion/player'
import { ServicesShowreel } from '../ServicesShowreel'

export function ServicesPlayer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08]">
      <Player
        component={ServicesShowreel}
        durationInFrames={300}
        compositionWidth={1280}
        compositionHeight={600}
        fps={30}
        style={{ width: '100%' }}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  )
}
