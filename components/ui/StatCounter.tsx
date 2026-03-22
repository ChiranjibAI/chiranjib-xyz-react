'use client'
import { useEffect, useRef, useState } from 'react'
type Props = { value: number; suffix?: string; label: string; duration?: number }
export default function StatCounter({ value, suffix='', label, duration=2000 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const p = Math.min((Date.now()-start)/duration,1)
          setCount(Math.round((1-Math.pow(1-p,3))*value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold:0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-cyan font-mono">{count}{suffix}</div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  )
}
