import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

interface ReportRequest {
  industry: string
  hoursWasted: number
  teamSize: number
}

interface ReportResult {
  problem: string
  solution: string
  hoursBack: number
  roiEstimate: string
  topAutomations: string[]
}

function buildPrompt(industry: string, hoursWasted: number, teamSize: number): string {
  return `You are Chiranjib, an India-based AI automation specialist. A business has shared their operational data with you.

Industry: ${industry}
Hours wasted per week on manual tasks: ${hoursWasted}
Team size: ${teamSize} people

Generate a specific, realistic automation ROI analysis for this business. Be concrete — mention specific tools, workflows, and numbers.

You MUST respond with ONLY valid JSON, no markdown, no code blocks:
{
  "problem": "A 1-2 sentence description of the core manual process bottleneck specific to their industry",
  "solution": "A 2-3 sentence description of the ideal automation stack for this business (mention specific tools: n8n, WhatsApp API, RAG, CRM, etc.)",
  "hoursBack": <integer: realistic hours per week they'll save, based on hoursWasted and teamSize, typically 60-80% of wasted hours>,
  "roiEstimate": "A specific ROI estimate string like '₹4.2L/year saved' or '3.5x ROI in 6 months' based on Indian market rates",
  "topAutomations": ["automation 1 specific to their industry", "automation 2", "automation 3", "automation 4"]
}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Partial<ReportRequest>

    const industry = typeof body.industry === 'string' && body.industry.trim()
      ? body.industry.trim()
      : 'General Business'

    const hoursWasted = typeof body.hoursWasted === 'number' && body.hoursWasted > 0
      ? Math.min(body.hoursWasted, 168)
      : 10

    const teamSize = typeof body.teamSize === 'number' && body.teamSize > 0
      ? Math.min(body.teamSize, 500)
      : 5

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.warn('[automation-report] GROQ_API_KEY not set — returning fallback')
      return NextResponse.json(buildFallback(industry, hoursWasted, teamSize))
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'user',
            content: buildPrompt(industry, hoursWasted, teamSize),
          },
        ],
        temperature: 0.75,
        max_tokens: 700,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.warn(`[automation-report] Groq failed (${response.status}):`, errText.slice(0, 120))
      return NextResponse.json(buildFallback(industry, hoursWasted, teamSize))
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data.choices?.[0]?.message?.content ?? ''

    // Strip markdown code fences if model wrapped them
    const cleaned = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

    let parsed: Partial<ReportResult>
    try {
      parsed = JSON.parse(cleaned) as Partial<ReportResult>
    } catch {
      console.warn('[automation-report] JSON parse failed, using fallback')
      return NextResponse.json(buildFallback(industry, hoursWasted, teamSize))
    }

    const result: ReportResult = {
      problem: typeof parsed.problem === 'string' ? parsed.problem : buildFallback(industry, hoursWasted, teamSize).problem,
      solution: typeof parsed.solution === 'string' ? parsed.solution : buildFallback(industry, hoursWasted, teamSize).solution,
      hoursBack: typeof parsed.hoursBack === 'number' ? parsed.hoursBack : Math.round(hoursWasted * 0.7),
      roiEstimate: typeof parsed.roiEstimate === 'string' ? parsed.roiEstimate : buildFallback(industry, hoursWasted, teamSize).roiEstimate,
      topAutomations: Array.isArray(parsed.topAutomations) && parsed.topAutomations.every(a => typeof a === 'string')
        ? (parsed.topAutomations as string[]).slice(0, 5)
        : buildFallback(industry, hoursWasted, teamSize).topAutomations,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[/api/automation-report] Unexpected error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ── Static fallback when Groq is unavailable ──────────────────────────────────
function buildFallback(industry: string, hoursWasted: number, teamSize: number): ReportResult {
  const hoursBack = Math.round(hoursWasted * 0.72)
  const monthlyHoursSaved = hoursBack * teamSize * 4
  const monthlySavings = Math.round(monthlyHoursSaved * 350) // ₹350/hr avg cost
  const annualSavings = monthlySavings * 12

  const industrialAutomations: Record<string, string[]> = {
    'Real Estate': [
      'WhatsApp lead qualification bot (Meta API)',
      'n8n CRM pipeline automation (Zoho/HubSpot)',
      'AI property matching & follow-up sequences',
      'Automated site-visit scheduling via Google Calendar API',
    ],
    'E-Commerce': [
      'Order status WhatsApp notifications',
      'AI-powered customer support chatbot',
      'Inventory sync automation via n8n',
      'Abandoned cart recovery email sequences',
    ],
    'SaaS': [
      'Automated onboarding drip sequences',
      'AI support ticket triage & routing',
      'Usage analytics reporting pipeline',
      'Churn prediction alert workflows',
    ],
    'Healthcare': [
      'Appointment reminder WhatsApp bot',
      'Patient intake form automation',
      'Report generation & email delivery',
      'Insurance claim status automation',
    ],
    'Education': [
      'Student enrollment & onboarding bot',
      'Assignment submission & grading notifications',
      'Fee reminder automation sequences',
      'Course completion certificate generation',
    ],
  }

  const automations = industrialAutomations[industry] ?? [
    'WhatsApp customer support automation',
    'n8n workflow integration (400+ apps)',
    'AI-powered data entry elimination',
    'Automated reporting & analytics pipeline',
  ]

  return {
    problem: `Your ${industry} team spends ~${hoursWasted}h/week on manual processes that block revenue growth and burn out your staff.`,
    solution: `Deploy a custom n8n automation stack with AI agents to handle repetitive tasks — WhatsApp bots, CRM syncs, and report generation running 24/7.`,
    hoursBack,
    roiEstimate: `₹${(annualSavings / 100000).toFixed(1)}L/year saved (${teamSize} people × ${hoursBack}h/week recovered)`,
    topAutomations: automations,
  }
}
