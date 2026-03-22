'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/showreel', label: 'Showreel' },
  { href: '/about', label: 'About' },
  { href: '/chat', label: 'ChiranjibAI', special: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_1px_0_rgba(0,229,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-base tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-text">chiranjib</span>
          <span className="text-cyan">.xyz</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href))
            if (l.special) {
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="ml-1 px-3.5 py-1.5 rounded-full text-sm font-medium border border-white/10 text-text hover:border-cyan/30 hover:text-cyan transition-all duration-200"
                >
                  {l.label}
                </Link>
              )
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive ? 'text-text font-medium' : 'text-muted hover:text-text'
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan"
                  />
                )}
              </Link>
            )
          })}

          <Link
            href="/hire"
            className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_16px_-4px_rgba(0,229,255,0.4)] hover:shadow-[0_0_24px_-4px_rgba(0,229,255,0.6)]"
          >
            Hire Me
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 text-muted hover:text-text transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden bg-bg/98 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {[...NAV_LINKS, { href: '/hire', label: 'Hire Me', special: false }].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-3 rounded-xl text-sm transition-all ${
                    pathname === l.href
                      ? 'text-text font-medium bg-white/[0.04]'
                      : 'text-muted hover:text-text hover:bg-white/[0.03]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
