'use client'
import { useState } from 'react'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'
import { GlitchText } from '@/components/ui/GlitchText'

const BUDGET_OPTIONS = [
  { value: '25k-50k', label: 'INR 25,000 – 50,000' },
  { value: '50k-1l', label: 'INR 50,000 – 1,00,000' },
  { value: '1l-3l', label: 'INR 1,00,000 – 3,00,000' },
  { value: '3l+', label: 'INR 3,00,000+' },
]

const SERVICE_OPTIONS = [
  { value: 'ai-agents', label: 'AI Agents' },
  { value: 'whatsapp-automation', label: 'WhatsApp Automation' },
  { value: 'n8n-workflows', label: 'n8n Workflows' },
  { value: 'rag-llm', label: 'RAG / LLM Integration' },
  { value: 'web-scraping', label: 'Web Scraping' },
  { value: 'security-audit', label: 'Security Audit' },
  { value: 'computer-vision', label: 'Computer Vision' },
  { value: 'voice-ai', label: 'Voice AI' },
  { value: 'custom', label: 'Something Else' },
]

interface FormState {
  name: string
  email: string
  whatsapp: string
  budget: string
  service: string
  description: string
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const inputBase =
  'w-full bg-bg border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-text placeholder:text-muted/40 focus:outline-none focus:border-cyan/35 focus:ring-1 focus:ring-cyan/15 transition-all duration-200'

const labelBase =
  'block text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60 mb-2'

export default function HireForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    whatsapp: '',
    budget: '',
    service: '',
    description: '',
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/hire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Submission failed. Please try again.')
      }
      setSubmitState('success')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitState('error')
    }
  }

  /* ── Success State ── */
  if (submitState === 'success') {
    return (
      <div className="rounded-2xl border border-cyan/20 bg-cyan/[0.03] p-8">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/25 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan/60 mb-0.5"><GlitchText text="Received" /></p>
            <AnimatedLetters text="Submission sent successfully" tag="h3" className="text-[15px] font-bold text-text" startDelay={0.1} letterDelay={0.04} />
          </div>
        </div>
        <p className="text-[13px] text-muted leading-[1.8]">
          I have your project details. I will review them and get back to you within 24 hours
          on WhatsApp or email. Need a faster reply? Message me directly at{' '}
          <a
            href="https://t.me/chiranjibai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-cyan/70 transition-colors"
          >
            @chiranjibai
          </a>{' '}
          on Telegram.
        </p>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">

      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className={labelBase}>
            Your Name <span className="text-cyan/60">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Rajesh Kumar"
            className={inputBase}
            aria-required="true"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelBase}>
            Email Address <span className="text-cyan/60">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="rajesh@company.com"
            className={inputBase}
            aria-required="true"
          />
        </div>
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <label htmlFor="whatsapp" className={labelBase}>
          WhatsApp Number
          <span className="ml-2 text-muted/40 normal-case tracking-normal font-sans" style={{ fontSize: '10px' }}>optional</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          className={inputBase}
        />
      </div>

      {/* Row: Budget + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="budget" className={labelBase}>
            Budget Range <span className="text-cyan/60">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            required
            value={form.budget}
            onChange={handleChange}
            className={inputBase + ' cursor-pointer'}
            aria-required="true"
          >
            <option value="" disabled>Select a budget range</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className={labelBase}>
            Service Needed <span className="text-cyan/60">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className={inputBase + ' cursor-pointer'}
            aria-required="true"
          >
            <option value="" disabled>Select a service type</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className={labelBase}>
          Project Description <span className="text-cyan/60">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={6}
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your current process, what you want automated, and what outcome you expect. The more context you give, the better I can scope the project."
          className={inputBase + ' resize-none leading-relaxed'}
          aria-required="true"
        />
        <p className="text-[11px] text-muted/50">
          Be specific about the problem. Minimum 50 characters.
        </p>
      </div>

      {/* Error */}
      {submitState === 'error' && (
        <div className="flex items-start gap-3 bg-red-500/[0.06] border border-red-500/20 rounded-xl px-4 py-3" role="alert">
          <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
          <p className="text-[13px] text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === 'loading'}
        className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-[14px] font-semibold bg-cyan text-bg hover:bg-cyan/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_24px_-4px_rgba(0,229,255,0.35)] hover:shadow-[0_0_32px_-4px_rgba(0,229,255,0.5)]"
      >
        {submitState === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Sending brief...
          </>
        ) : (
          <>
            Submit Project Brief
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 7.5h11M9 3l4 4.5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="text-[11px] text-muted/40 text-center">
        I respond to all submissions within 24 hours. No spam, no newsletter.
      </p>

    </form>
  )
}
