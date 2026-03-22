import { NextRequest, NextResponse } from 'next/server'

interface HireBody {
  name?: string
  email?: string
  whatsapp?: string
  budget?: string
  service?: string
  description?: string
}

async function sendTelegramNotification(data: Required<HireBody>): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.warn('[/api/hire] Telegram credentials not set — skipping notification')
    return
  }

  const text = [
    '🚀 New Project Inquiry',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `WA: ${data.whatsapp || 'Not provided'}`,
    `Budget: ${data.budget || 'Not specified'}`,
    `Service: ${data.service || 'Not specified'}`,
    `Details: ${data.description}`,
  ].join('\n')

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    const err = await response.text().catch(() => 'Unknown error')
    console.error('[/api/hire] Telegram API error:', response.status, err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: HireBody = await request.json().catch(() => ({}))

    // Validate required fields
    const missing: string[] = []
    if (!body.name?.trim()) missing.push('name')
    if (!body.email?.trim()) missing.push('email')
    if (!body.description?.trim()) missing.push('description')

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missing.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email!)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send Telegram notification (non-blocking — don't fail the response if it fails)
    await sendTelegramNotification({
      name: body.name!.trim(),
      email: body.email!.trim(),
      whatsapp: body.whatsapp?.trim() ?? '',
      budget: body.budget?.trim() ?? '',
      service: body.service?.trim() ?? '',
      description: body.description!.trim(),
    }).catch((err) => {
      console.error('[/api/hire] Failed to send Telegram notification:', err)
    })

    return NextResponse.json({
      success: true,
      message:
        "Thanks! I've received your project inquiry. I'll get back to you within 24 hours. For urgent matters, reach me on Telegram @ChiranjibAI.",
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Internal server error'
    console.error('[/api/hire] Error:', message)
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    )
  }
}
