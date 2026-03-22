import { NextRequest, NextResponse } from 'next/server'

// ── Groq (primary — blazing fast LPU inference, free tier) ──────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODELS = [
  'llama-3.3-70b-versatile',   // best quality
  'llama-3.1-8b-instant',      // fastest fallback
  'gemma2-9b-it',              // secondary fallback
]

// ── OpenRouter (secondary — wider model selection) ───────────────────────────
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_MODELS = [
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'openai/gpt-oss-20b:free',
]

const SYSTEM_PROMPT = `You are Chiranjib's AI assistant on chiranjib.xyz. Chiranjib is an India-based AI automation specialist, ethical hacker, and AGI researcher based in Kolkata, West Bengal.

## About Chiranjib
- 5+ years experience, 50+ clients served
- Founder of SekkhoAI (Bengali AI education platform)
- Specializes in: AI agents, WhatsApp bots, n8n workflows, RAG/LLM systems, web scraping, cybersecurity

## Services (20 total):

### Agentic AI
- multi-agent-systems: Multi-Agent Systems (CrewAI, LangGraph, AutoGen) — autonomous pipelines, 14-21 days
- mcp-servers: MCP Server Development (Model Context Protocol) — custom AI tool servers, 7-14 days
- browser-agents: AI Browser Automation (Playwright, Puppeteer AI) — autonomous web agents, 10-14 days
- chatbot-builder: AI Chatbot Builder (no-code/low-code) — branded chatbots, 5-7 days

### AI & LLM
- ai-agent: AI Agent Development — autonomous multi-step agents, 14-21 days
- rag-llm: RAG & LLM Integration — knowledge base Q&A systems, 10-21 days
- langchain: LangChain Development — complex LLM chains, 10-14 days
- voice-agent: Voice AI Agent — speech-to-text + response pipelines, 14-21 days

### Automation
- n8n-workflow: n8n Workflow Automation — 400+ integrations, 5-10 days
- make-automation: Make (Integromat) Automation — visual workflow builder, 3-7 days
- zapier-automation: Zapier Automation — business workflow automation, 3-7 days
- airtable-automation: Airtable + AI Automation — database + automation combos, 5-10 days
- whatsapp-bot: WhatsApp Bot (Meta API) — lead qualification + broadcasts, 7-14 days
- email-automation: Email Automation — drip sequences + triggers, 5-10 days
- crm-automation: CRM Automation (Zoho/HubSpot) — sales pipeline automation, 7-14 days

### Data & Scraping
- web-scraping: Web Scraping & Crawling — production scrapers with anti-bot bypass, 5-10 days
- data-pipelines: Data Pipelines & ETL — automated data transformation, 10-14 days

### Security
- ethical-hacking: Ethical Hacking & Pentesting — vulnerability assessment, 3-7 days
- api-pentesting: API Penetration Testing — REST/GraphQL security audit, 5-10 days
- vapt: Web App VAPT — full vulnerability assessment + report, 7-14 days

## Behavior Rules
1. Be conversational, warm, and knowledgeable — you're Chiranjib's representative
2. Answer questions about services, pricing approach, and process
3. For pricing: "Pricing depends on scope — typically ₹15,000 to ₹2,50,000 depending on complexity. Message Chiranjib on Telegram @chiranjibai for a custom quote."
4. When a user asks about a specific service, detect which one and include it in your response metadata
5. Always end responses about services with a subtle CTA to hire or message on Telegram
6. Keep responses concise but helpful (2-4 paragraphs max)
7. Speak naturally — not robotic, not overly formal

## Response Format
You MUST respond with ONLY valid JSON, no markdown, no code blocks:
{"message": "Your response text here", "triggerVideo": "service-id-or-null"}

The triggerVideo field: set to the exact service ID (e.g. "whatsapp-bot", "n8n-workflow", "rag-llm") if the user is specifically asking about that ONE service. Set to null for general questions.`

const STATIC_FALLBACK =
  "I'm having trouble connecting right now. Please message Chiranjib directly on Telegram @chiranjibai — he responds within 2 hours!"

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatResult {
  message: string
  triggerVideo: string | null
}

function parseAIContent(content: string): ChatResult {
  // Strip markdown code blocks if model wrapped it
  const cleaned = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  try {
    const parsed = JSON.parse(cleaned) as { message?: string; triggerVideo?: string | null }
    return {
      message: parsed.message ?? cleaned,
      triggerVideo: parsed.triggerVideo ?? null,
    }
  } catch {
    return { message: content, triggerVideo: null }
  }
}

// ── Groq (primary, fastest) ──────────────────────────────────────────────────
async function callGroq(messages: ChatMessage[], modelIndex = 0): Promise<ChatResult> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new Error('GROQ_API_KEY not set')

  const model = GROQ_MODELS[modelIndex] ?? GROQ_MODELS[0]

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const err = await response.text().catch(() => '')
    console.warn(`[Groq] model ${model} failed (${response.status}):`, err.slice(0, 120))
    if (modelIndex < GROQ_MODELS.length - 1) return callGroq(messages, modelIndex + 1)
    throw new Error(`Groq failed: ${response.status}`)
  }

  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> }
  const content = data.choices?.[0]?.message?.content ?? ''
  return parseAIContent(content)
}

// ── OpenRouter (fallback) ────────────────────────────────────────────────────
async function callOpenRouter(messages: ChatMessage[], modelIndex = 0): Promise<ChatResult> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set')

  const model = OPENROUTER_MODELS[modelIndex] ?? OPENROUTER_MODELS[0]

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://chiranjib.xyz',
      'X-Title': 'Chiranjib AI Assistant',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const err = await response.text().catch(() => '')
    console.warn(`[OpenRouter] model ${model} failed (${response.status}):`, err.slice(0, 120))
    if (modelIndex < OPENROUTER_MODELS.length - 1) return callOpenRouter(messages, modelIndex + 1)
    throw new Error(`OpenRouter failed: ${response.status}`)
  }

  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> }
  const content = data.choices?.[0]?.message?.content ?? ''
  return parseAIContent(content)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { messages?: unknown }
    const messages = Array.isArray(body?.messages) ? (body.messages as ChatMessage[]) : []

    const validMessages = messages.filter(
      (m): m is ChatMessage =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0
    )

    if (validMessages.length === 0) {
      return NextResponse.json({ error: 'No valid messages provided' }, { status: 400 })
    }

    // Try Groq first (fastest), then OpenRouter as fallback
    let result: ChatResult

    if (process.env.GROQ_API_KEY) {
      try {
        result = await callGroq(validMessages)
        console.log('[chat] Groq ✓, triggerVideo:', result.triggerVideo)
        return NextResponse.json(result)
      } catch (groqErr) {
        console.warn('[chat] Groq failed, trying OpenRouter:', groqErr instanceof Error ? groqErr.message : groqErr)
      }
    }

    if (process.env.OPENROUTER_API_KEY) {
      try {
        result = await callOpenRouter(validMessages)
        console.log('[chat] OpenRouter ✓, triggerVideo:', result.triggerVideo)
        return NextResponse.json(result)
      } catch (orErr) {
        console.warn('[chat] OpenRouter failed:', orErr instanceof Error ? orErr.message : orErr)
      }
    }

    console.warn('[chat] All providers failed — returning static fallback')
    return NextResponse.json({ message: STATIC_FALLBACK, triggerVideo: null })
  } catch (error) {
    console.error('[/api/chat] Unexpected error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ message: STATIC_FALLBACK, triggerVideo: null }, { status: 200 })
  }
}
