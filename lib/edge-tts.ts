// lib/edge-tts.ts
// Microsoft Edge TTS — free, no API key needed
// Uses msedge-tts package which talks to the same endpoint Edge browser uses

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

/**
 * Synthesize text using Microsoft Edge TTS.
 * Returns an MP3 Buffer, or null on failure.
 */
export async function synthesizeSpeechEdge(text: string): Promise<Buffer | null> {
  try {
    const tts = new MsEdgeTTS()

    // en-US-AriaNeural — natural, clear female voice
    await tts.setMetadata(
      'en-US-AriaNeural',
      OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3
    )

    return new Promise<Buffer | null>((resolve) => {
      const chunks: Buffer[] = []
      let resolved = false

      const safe = (val: Buffer | null) => {
        if (!resolved) {
          resolved = true
          resolve(val)
        }
      }

      try {
        const { audioStream } = tts.toStream(text)

        audioStream.on('data', (chunk: Buffer) => chunks.push(chunk))

        audioStream.on('end', () => {
          if (chunks.length === 0) {
            safe(null)
          } else {
            safe(Buffer.concat(chunks))
          }
        })

        audioStream.on('error', (err: Error) => {
          console.error('[edge-tts] Stream error:', err)
          safe(null)
        })

        // Safety timeout — 15s max
        setTimeout(() => safe(null), 15_000)
      } catch (err) {
        console.error('[edge-tts] toStream error:', err)
        safe(null)
      }
    })
  } catch (err) {
    console.error('[edge-tts] Exception:', err)
    return null
  }
}
