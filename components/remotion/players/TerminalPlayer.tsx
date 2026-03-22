'use client'
import { Player } from '@remotion/player'
import { TerminalComposition } from '../TerminalComposition'

export function TerminalPlayer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06]">
      <Player
        component={TerminalComposition}
        durationInFrames={390}
        compositionWidth={1280}
        compositionHeight={560}
        fps={30}
        style={{ width: '100%', aspectRatio: '16/9' }}
        autoPlay
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  )
}
