'use client'
import { Player } from '@remotion/player'
import { GlobeComposition } from '../GlobeComposition'

export function GlobePlayer() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Player
        component={GlobeComposition}
        durationInFrames={450}
        compositionWidth={1280}
        compositionHeight={500}
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
