'use client'
import { motion } from 'framer-motion'
import { EXPERTISE_SKILLS } from '@/lib/content'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

type SkillGroup = (typeof EXPERTISE_SKILLS)[number]

interface SkillMatrixProps {
  skills: SkillGroup[]
}

export default function SkillMatrix({ skills }: SkillMatrixProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((group, groupIndex) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: groupIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <AnimatedLetters
            text={group.category}
            tag="h3"
            className="text-sm font-bold text-cyan uppercase tracking-widest mb-6"
            letterDelay={0.04}
            startDelay={groupIndex * 0.1}
          />
          <div className="space-y-4">
            {group.skills.map((skill, skillIndex) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-text">{skill.name}</span>
                  <span className="text-xs text-muted">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-cyan/60"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: groupIndex * 0.1 + skillIndex * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
