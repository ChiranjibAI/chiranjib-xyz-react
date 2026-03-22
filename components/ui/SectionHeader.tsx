'use client'
import { motion } from 'framer-motion'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'
type Props = { eyebrow?: string; title: string; subtitle?: string; align?: 'left'|'center' }
export default function SectionHeader({ eyebrow, title, subtitle, align='center' }: Props) {
  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }} className={`mb-12 ${align==='center'?'text-center':'text-left'}`}>
      {eyebrow && <span className="inline-block text-xs font-semibold text-cyan uppercase tracking-[0.2em] mb-3"><GlitchText text={eyebrow} /></span>}
      <AnimatedLetters text={title} tag="h2" className="text-3xl md:text-4xl font-bold text-text tracking-tight" startDelay={0.1} letterDelay={0.04} />
      {subtitle && (
        <AnimatedLetters
          text={subtitle}
          tag="p"
          className="mt-4 text-base text-muted leading-relaxed max-w-2xl mx-auto"
          letterDelay={0.02}
          startDelay={0.4}
        />
      )}
    </motion.div>
  )
}
