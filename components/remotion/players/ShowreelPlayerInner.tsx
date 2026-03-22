'use client'

import { Player } from '@remotion/player'
import { ShowreelComposition } from '../ShowreelComposition'

export function ShowreelPlayerInner() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-20px_rgba(0,229,255,0.15)]">
      <Player
        component={ShowreelComposition}
        durationInFrames={900}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        style={{ width: '100%' }}
        autoPlay
        loop
        controls
        clickToPlay={false}
      />
    </div>
  )
}
