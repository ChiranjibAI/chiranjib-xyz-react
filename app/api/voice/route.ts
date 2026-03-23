import { NextRequest, NextResponse } from 'next/server'
import { synthesizeSpeech } from '@/lib/gemini-tts'
import { synthesizeSpeechEdge } from '@/lib/edge-tts'

const VOICE_SCRIPTS: Record<string, string> = {
  home: "Hi, I'm Chiranjib — India's leading AI automation specialist. I build autonomous AI agents, WhatsApp bots, n8n workflows, and complete business automation systems that actually deliver results. Whether you're a startup founder or an established business, I can automate your operations and save you hundreds of hours every month. My projects start at 25,000 rupees and I've automated over 50 businesses across India and globally. To get started, click the Hire Me button or send me a message on Telegram at ChiranjibAI.",
  services:
    'I specialize in 17 plus automation categories. From AI agents that handle customer queries 24/7, to WhatsApp bots that qualify leads while you sleep, to complex n8n workflows that connect all your business tools. I also build RAG systems for document intelligence, web scrapers for competitive research, and conduct security audits to protect your business. Every automation I build is custom-made for your specific needs.',
  pricing:
    'My pricing is transparent and results-focused. Starter projects begin at 25,000 rupees — perfect for a single automation like a WhatsApp bot or lead scraper. Growth packages at 75,000 rupees cover multi-system integrations. Enterprise solutions at 2 lakh rupees plus handle complete business automation overhauls. I also offer monthly retainer packages for ongoing support and maintenance.',
  about:
    "I'm Chiranjib, an AGI developer and ethical hacker based in India. I've spent 3 years building AI systems that automate real business operations. I've worked with 50 plus clients ranging from solo founders to enterprise teams. My approach is simple: understand your business deeply, build automation that fits your workflow, and ensure it actually works before I hand it over.",
  hire: "Ready to automate your business? Tell me about your project. I work with founders and businesses to build AI systems that save time, reduce costs, and grow revenue. The process is simple: we discuss your needs, I propose a solution, we build it together, and I support you after launch. Fill out the form and I'll respond within 24 hours.",
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const pageId: string = typeof body?.pageId === 'string' ? body.pageId : 'home'
    const text = VOICE_SCRIPTS[pageId] ?? VOICE_SCRIPTS['home']

    // ── 1. Try Gemini TTS (highest quality) ──────────────────────────────────
    const geminiBuffer = await synthesizeSpeech(text)
    if (geminiBuffer) {
      return NextResponse.json({
        audio: geminiBuffer.toString('base64'),
        mimeType: 'audio/wav',
        source: 'gemini',
      })
    }

    // ── 2. Try Microsoft Edge TTS (free, no key, great quality) ──────────────
    console.log('[voice] Gemini failed — trying Edge TTS fallback')
    const edgeBuffer = await synthesizeSpeechEdge(text)
    if (edgeBuffer) {
      return NextResponse.json({
        audio: edgeBuffer.toString('base64'),
        mimeType: 'audio/mpeg',
        source: 'edge',
      })
    }

    // ── 3. Browser TTS as last resort ─────────────────────────────────────────
    console.log('[voice] Edge TTS failed — falling back to browser TTS')
    return NextResponse.json({
      useBrowserTTS: true,
      text,
      source: 'browser-fallback',
    })
  } catch {
    return NextResponse.json(
      { useBrowserTTS: true, text: '', source: 'error-fallback' },
      { status: 200 }
    )
  }
}
