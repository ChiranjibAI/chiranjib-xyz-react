'use client'
import dynamic from 'next/dynamic'
import { Player } from '@remotion/player'
import { getServiceData } from '@/lib/serviceData'
import type { ComponentType } from 'react'
import type { ServiceDemoProps } from '@/components/remotion/ServiceDemoComposition'

// Dynamic import — SSR safe
const ServiceDemoComp = dynamic(
  () => import('@/components/remotion/ServiceDemoComposition')
    .then(m => m.ServiceDemoComposition),
  { ssr: false }
) as unknown as ComponentType<Record<string, unknown>>

export function ServiceDemoPlayer({ serviceId }: { serviceId: string }) {
  const data = getServiceData(serviceId)

  return (
    <Player
      component={ServiceDemoComp}
      inputProps={data}
      durationInFrames={390}
      compositionWidth={1280}
      compositionHeight={720}
      fps={30}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      style={{ width: '100%', height: '100%', borderRadius: '12px' }}
    />
  )
}
