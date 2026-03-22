'use client'

import { Player } from '@remotion/player'
import { CaseStudyDocComposition } from '../CaseStudyDocComposition'
import type { CaseStudySchemaType } from '../CaseStudyDocComposition'

type Props = Partial<CaseStudySchemaType>

export function CaseStudyDocPlayer(props: Props) {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-20px_rgba(0,229,255,0.15)]">
      <Player
        component={CaseStudyDocComposition}
        inputProps={props}
        durationInFrames={450}
        compositionWidth={1280}
        compositionHeight={640}
        fps={30}
        style={{ width: '100%' }}
        autoPlay
        loop
        controls
        clickToPlay
      />
    </div>
  )
}
