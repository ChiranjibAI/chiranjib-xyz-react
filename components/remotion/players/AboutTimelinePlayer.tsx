'use client'
import { Player } from '@remotion/player'
import { AboutTimeline } from '../AboutTimeline'

export function AboutTimelinePlayer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08]">
      <Player
        component={AboutTimeline}
        durationInFrames={330}
        compositionWidth={1280}
        compositionHeight={640}
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
