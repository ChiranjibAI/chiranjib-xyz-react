// lib/gemini-tts.ts
// Gemini TTS using Google's REST API — server-side only, never import in client components

/**
 * Wrap raw PCM (16-bit, mono, 24000 Hz) in a RIFF/WAV container.
 * Gemini TTS returns audio/pcm or audio/L16 — browsers need a WAV header to play it.
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitDepth = 16): Buffer {
  const byteRate = (sampleRate * numChannels * bitDepth) / 8
  const blockAlign = (numChannels * bitDepth) / 8
  const dataSize = pcmBuffer.length
  const headerSize = 44
  const wav = Buffer.alloc(headerSize + dataSize)

  // RIFF chunk
  wav.write('RIFF', 0, 'ascii')
  wav.writeUInt32LE(36 + dataSize, 4)   // file size - 8
  wav.write('WAVE', 8, 'ascii')

  // fmt  sub-chunk
  wav.write('fmt ', 12, 'ascii')
  wav.writeUInt32LE(16, 16)             // PCM sub-chunk size
  wav.writeUInt16LE(1, 20)              // AudioFormat = 1 (PCM)
  wav.writeUInt16LE(numChannels, 22)
  wav.writeUInt32LE(sampleRate, 24)
  wav.writeUInt32LE(byteRate, 28)
  wav.writeUInt16LE(blockAlign, 32)
  wav.writeUInt16LE(bitDepth, 34)

  // data sub-chunk
  wav.write('data', 36, 'ascii')
  wav.writeUInt32LE(dataSize, 40)
  pcmBuffer.copy(wav, 44)

  return wav
}

export async function synthesizeSpeech(text: string): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null

  try {
    // gemini-2.5-flash-preview-tts supports AUDIO responseModality
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }],
          generationConfig: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Kore' },
              },
            },
          },
        }),
      }
    )

    if (!response.ok) {
      console.error('[gemini-tts] API error:', response.status, await response.text().catch(() => ''))
      return null
    }

    const data = await response.json()
    const part = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData
    if (!part?.data) return null

    const mimeType: string = part.mimeType ?? ''
    const rawBuffer = Buffer.from(part.data, 'base64')

    // Gemini returns raw PCM (audio/pcm or audio/L16) — wrap in WAV
    if (mimeType.startsWith('audio/pcm') || mimeType.startsWith('audio/l16') || mimeType.startsWith('audio/L16')) {
      // Extract sample rate from mimeType if present (e.g. "audio/pcm;rate=24000")
      const rateMatch = mimeType.match(/rate=(\d+)/)
      const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000
      return pcmToWav(rawBuffer, sampleRate)
    }

    // If already WAV or other browser-playable format, return as-is
    return rawBuffer
  } catch (err) {
    console.error('[gemini-tts] Exception:', err)
    return null
  }
}
