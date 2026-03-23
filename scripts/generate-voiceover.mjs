import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'voiceover', 'demo')

const SCENES = [
  {
    id: 's1-hook',
    text: "What if I told you... the hours you spend on repetitive tasks every single day... could be completely automated? Welcome to chiranjib dot xyz — the future of business operations in India.",
  },
  {
    id: 's2-pain',
    text: "Right now, businesses like yours are losing 8 or more hours every single day to manual work. Copy-pasting data. Answering the same customer questions over and over. Following up on leads manually. While your competitors are already using AI to run on complete autopilot — 24 hours a day, 7 days a week.",
  },
  {
    id: 's3-solution',
    text: "Hi, I'm Chiranjib — India's leading AI automation specialist. For 3 years, I've been helping businesses across India and globally eliminate manual work completely, using custom AI agents, WhatsApp bots, n8n workflows, and intelligent automation systems built specifically for your business.",
  },
  {
    id: 's4-services',
    text: "I offer 5 powerful automation categories. First — Agentic AI: autonomous AI systems that think, decide, and act on your behalf. Second — AI and LLM Integration: connecting GPT, Gemini, and Claude to your business workflows. Third — Business Automation: n8n workflows and WhatsApp bots that handle operations while you sleep. Fourth — Data and Research Intelligence: web scrapers, RAG systems, and competitive research tools. And Fifth — Cybersecurity: penetration testing and security audits that protect everything you've built.",
  },
  {
    id: 's5-demo',
    text: "Let me show you chiranjib dot xyz. This is not just a portfolio — it's a complete demonstration of what AI automation looks like in practice. The AI voice you're hearing right now — that's powered by Gemini TTS. The chat agent that answers your questions — trained on my full service catalog. Over 20 specialized automation services, each with a real demo video showing exactly what you'll get. Every service is custom-built, delivered in as few as 7 days, with full post-launch support.",
  },
  {
    id: 's6-proof',
    text: "The results speak for themselves. Over 50 businesses automated across India, UAE, Saudi Arabia, and globally. Clients saving hundreds of hours every single month. Projects delivered fast, with measurable ROI from day one. From Kolkata startups to international enterprises — the businesses I automate don't just save time, they gain a serious competitive edge.",
  },
  {
    id: 's7-pricing',
    text: "Pricing is transparent and accessible. Single automation projects start at just 25,000 rupees. Multi-system Growth packages at 75,000 rupees. Complete enterprise automation from 2 lakh rupees. And ongoing retainer support for businesses that want continuous improvement.",
  },
  {
    id: 's8-cta',
    text: "Ready to automate your business? Visit chiranjib dot xyz today. Or message me directly on Telegram at ChiranjibAI. Your first consultation is completely free. Let's build AI systems that run your business on autopilot — so you can focus on what actually matters. Automate your growth. Start today.",
  },
]

async function generateVoiceover(scene) {
  const outputPath = path.join(OUTPUT_DIR, `${scene.id}.mp3`)

  if (existsSync(outputPath)) {
    console.log(`[SKIP] ${scene.id}.mp3 already exists`)
    return
  }

  console.log(`[GEN]  Generating ${scene.id}.mp3 ...`)

  try {
    // Fresh instance per scene — reusing the same instance causes voiceLocale errors
    const tts = new MsEdgeTTS()
    await tts.setMetadata(
      'en-US-ChristopherNeural',
      OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3
    )

    // toStream() returns { audioStream, rawStream } — destructure audioStream
    const { audioStream } = tts.toStream(scene.text)

    const chunks = []
    await new Promise((resolve, reject) => {
      audioStream.on('data', (chunk) => chunks.push(chunk))
      audioStream.on('end', resolve)
      audioStream.on('error', reject)
      setTimeout(() => reject(new Error('Timeout after 30s')), 30000)
    })

    const buffer = Buffer.concat(chunks)
    await writeFile(outputPath, buffer)
    console.log(`[OK]   ${scene.id}.mp3 saved (${(buffer.length / 1024).toFixed(1)} KB)`)
  } catch (err) {
    console.error(`[ERR]  Failed to generate ${scene.id}: ${err.message}`)
    throw err
  }
}

async function main() {
  console.log('=== Chiranjib.xyz Voiceover Generator ===')
  console.log(`Output directory: ${OUTPUT_DIR}`)
  console.log(`Scenes to generate: ${SCENES.length}`)
  console.log('')

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
    console.log(`[DIR]  Created ${OUTPUT_DIR}`)
  }

  let successCount = 0
  let errorCount = 0

  for (const scene of SCENES) {
    try {
      await generateVoiceover(scene)
      successCount++
    } catch (err) {
      errorCount++
      console.error(`[FAIL] ${scene.id}: ${err.message}`)
    }
    // Small delay between requests to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300))
  }

  console.log('')
  console.log('=== Generation Complete ===')
  console.log(`Success: ${successCount} / ${SCENES.length}`)
  if (errorCount > 0) {
    console.log(`Errors: ${errorCount}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
