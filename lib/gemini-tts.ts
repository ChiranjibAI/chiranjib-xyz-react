// lib/gemini-tts.ts
// Gemini TTS using Google's REST API — server-side only, never import in client components

export async function synthesizeSpeech(text: string): Promise<Buffer | null> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null

  try {
    // Use Gemini 1.5 Flash TTS endpoint
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

    if (!response.ok) return null

    const data = await response.json()
    const audioData = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data
    if (!audioData) return null

    return Buffer.from(audioData, 'base64')
  } catch {
    return null
  }
}
