'use client'

import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────
type Industry =
  | 'Real Estate'
  | 'E-Commerce'
  | 'SaaS'
  | 'Healthcare'
  | 'Education'
  | 'Other'

interface FormState {
  industry: Industry
  hoursWasted: string
  teamSize: string
}

interface ReportResult {
  problem: string
  solution: string
  hoursBack: number
  roiEstimate: string
  topAutomations: string[]
}

const INDUSTRIES: Industry[] = [
  'Real Estate',
  'E-Commerce',
  'SaaS',
  'Healthcare',
  'Education',
  'Other',
]

// ── Typing dots indicator ─────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan animate-bounce"
          style={{ animationDelay: `${i * 0.18}s`, animationDuration: '0.8s' }}
        />
      ))}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function AutomationCalculator() {
  const [form, setForm] = useState<FormState>({
    industry: 'Real Estate',
    hoursWasted: '',
    teamSize: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ReportResult | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)

    const hours = Number(form.hoursWasted)
    const team = Number(form.teamSize)

    if (!hours || hours < 1 || hours > 168) {
      setError('Please enter hours wasted between 1 and 168 per week.')
      return
    }
    if (!team || team < 1 || team > 500) {
      setError('Please enter a team size between 1 and 500.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/automation-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: form.industry,
          hoursWasted: hours,
          teamSize: team,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(data.error ?? `Request failed (${res.status})`)
      }

      const data = await res.json() as ReportResult
      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/[0.08] bg-surface/50 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted/50">
            ROI Calculator — Enter Your Numbers
          </p>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Industry */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="industry"
              className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60"
            >
              Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              className="bg-bg border border-white/[0.1] rounded-lg px-3 py-2.5 text-[13px] text-text appearance-none cursor-pointer focus:outline-none focus:border-cyan/40 transition-colors"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Hours wasted */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="hoursWasted"
              className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60"
            >
              Hours Wasted / Week
            </label>
            <input
              id="hoursWasted"
              name="hoursWasted"
              type="number"
              min={1}
              max={168}
              placeholder="e.g. 20"
              value={form.hoursWasted}
              onChange={handleChange}
              className="bg-bg border border-white/[0.1] rounded-lg px-3 py-2.5 text-[13px] text-text placeholder:text-muted/30 focus:outline-none focus:border-cyan/40 transition-colors"
            />
          </div>

          {/* Team size */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="teamSize"
              className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted/60"
            >
              Team Size
            </label>
            <input
              id="teamSize"
              name="teamSize"
              type="number"
              min={1}
              max={500}
              placeholder="e.g. 5"
              value={form.teamSize}
              onChange={handleChange}
              className="bg-bg border border-white/[0.1] rounded-lg px-3 py-2.5 text-[13px] text-text placeholder:text-muted/30 focus:outline-none focus:border-cyan/40 transition-colors"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-4 px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/5">
            <p className="text-[12px] text-red-400">{error}</p>
          </div>
        )}

        <div className="px-6 pb-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan text-bg text-[13px] font-bold font-mono tracking-wide hover:bg-cyan/90 active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
          >
            {loading ? (
              <>
                <span className="text-bg/80">Calculating</span>
                <TypingIndicator />
              </>
            ) : (
              'Calculate My ROI →'
            )}
          </button>
        </div>
      </form>

      {/* Result card */}
      {result && (
        <div className="mt-6 rounded-2xl border border-cyan/20 bg-surface/50 overflow-hidden shadow-[inset_0_1px_0_rgba(0,229,255,0.07),0_0_60px_-20px_rgba(0,229,255,0.12)] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan/60">
              Your Automation ROI Report
            </p>
            <span className="text-[10px] font-mono text-muted/40 bg-cyan/[0.06] border border-cyan/10 px-2.5 py-1 rounded-full">
              AI-Generated
            </span>
          </div>

          <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Hours back */}
            <div className="rounded-xl border border-white/[0.06] bg-bg/40 px-5 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/50 mb-1">
                Hours Recovered
              </p>
              <p className="text-[40px] font-bold font-mono text-cyan leading-none">
                {result.hoursBack}
                <span className="text-[16px] text-muted/50 font-normal ml-1">
                  hrs/wk
                </span>
              </p>
            </div>

            {/* ROI estimate */}
            <div className="rounded-xl border border-white/[0.06] bg-bg/40 px-5 py-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted/50 mb-1">
                Estimated ROI
              </p>
              <p className="text-[24px] font-bold font-mono text-text leading-tight break-words">
                {result.roiEstimate}
              </p>
            </div>
          </div>

          {/* Problem */}
          <div className="px-6 pb-4">
            <div className="rounded-lg border border-red-500/10 border-l-[3px] border-l-red-500/50 bg-red-500/[0.03] px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-red-400/60 mb-1.5">
                Your Core Problem
              </p>
              <p className="text-[13px] text-muted leading-relaxed">{result.problem}</p>
            </div>
          </div>

          {/* Solution */}
          <div className="px-6 pb-4">
            <div className="rounded-lg border border-cyan/10 border-l-[3px] border-l-cyan/50 bg-cyan/[0.03] px-4 py-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-cyan/60 mb-1.5">
                Recommended Solution
              </p>
              <p className="text-[13px] text-muted leading-relaxed">{result.solution}</p>
            </div>
          </div>

          {/* Top automations */}
          <div className="px-6 pb-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted/50 mb-3">
              Top Automations for Your Business
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.topAutomations.map((automation, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-lg border border-white/[0.06] bg-bg/30 px-3.5 py-2.5"
                >
                  <span className="text-cyan font-mono text-[11px] mt-0.5 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-[12px] text-muted/80 leading-relaxed">
                    {automation}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6">
            <div className="rounded-xl border border-white/[0.08] bg-bg/40 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-[13px] text-text font-medium mb-0.5">
                  Get your full automation plan
                </p>
                <p className="text-[12px] text-muted/60">
                  Custom roadmap, tools, timeline &amp; pricing — free consultation
                </p>
              </div>
              <a
                href="https://t.me/chiranjibai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan text-bg text-[13px] font-bold hover:bg-cyan/90 transition-colors whitespace-nowrap"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.608c-.15.673-.543.838-1.1.52l-3.04-2.24-1.466 1.41c-.162.162-.297.297-.609.297l.217-3.07 5.593-5.05c.243-.217-.054-.337-.375-.12L6.87 13.928l-2.96-.923c-.643-.2-.655-.643.135-.952l11.549-4.456c.535-.193 1.003.13.968.65z" />
                </svg>
                Get Full Plan → @chiranjibai
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
