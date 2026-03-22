'use client'

import dynamic from 'next/dynamic'

// The inner player component — imported dynamically to avoid SSR
const ShowreelPlayerInner = dynamic(
  () => import('./ShowreelPlayerInner').then((mod) => mod.ShowreelPlayerInner),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: '#0a0a0a',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          fontSize: 13,
          color: '#64748b',
        }}
      >
        Loading showreel...
      </div>
    ),
  }
)

export function ShowreelPlayer() {
  return <ShowreelPlayerInner />
}
