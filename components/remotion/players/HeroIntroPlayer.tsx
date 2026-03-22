'use client'
import { Player } from '@remotion/player'
import { HeroIntroVideo } from '../HeroIntroVideo'

export function HeroIntroPlayer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-10px_rgba(0,229,255,0.1)]">
      <Player
        component={HeroIntroVideo}
        durationInFrames={450}
        compositionWidth={1280}
        compositionHeight={720}
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
