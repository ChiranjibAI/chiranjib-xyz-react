'use client'

import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  className?: string
  external?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-cyan text-bg font-semibold hover:bg-cyan/90 active:scale-[0.97] shadow-[0_0_20px_-4px_rgba(0,229,255,0.25)] hover:shadow-[0_0_28px_-4px_rgba(0,229,255,0.45)]',
  secondary:
    'bg-surface border border-white/10 text-text hover:border-white/20 hover:bg-card active:scale-[0.97]',
  ghost:
    'text-muted hover:text-text hover:bg-white/[0.04] active:scale-[0.97]',
  outline:
    'border border-cyan/30 text-cyan hover:bg-cyan/[0.06] hover:border-cyan/50 active:scale-[0.97]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none'

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external,
  disabled,
  type = 'button',
}: ButtonProps) {
  const cls = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href && !disabled) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
