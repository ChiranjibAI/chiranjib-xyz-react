// Server-side ElevenLabs TTS client — never import this in client components

export async function synthesizeSpeech(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set')
  }

  const voiceId =
    process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM'

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(
      `ElevenLabs API error: ${response.status} ${response.statusText} — ${errorText}`
    )
  }

  return response.arrayBuffer()
}
