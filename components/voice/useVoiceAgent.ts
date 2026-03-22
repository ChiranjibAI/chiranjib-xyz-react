'use client'

import { useRef, useState, useCallback } from 'react'

export type VoiceStatus = 'idle' | 'loading' | 'playing' | 'error'

export interface UseVoiceAgentReturn {
  status: VoiceStatus
  error: string | null
  speak: (pageId: string) => Promise<void>
  stop: () => void
}

function speakWithBrowser(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.95
  utterance.pitch = 1.0
  utterance.volume = 1.0
  // Try to use a good English voice
  const voices = window.speechSynthesis.getVoices()
  const preferred =
    voices.find((v) => v.lang === 'en-US' && v.name.includes('Google')) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices[0]
  if (preferred) utterance.voice = preferred
  window.speechSynthesis.speak(utterance)
}

type VoiceApiResponse =
  | { audio: string; mimeType: string; source: string; useBrowserTTS?: never; text?: never }
  | { useBrowserTTS: true; text: string; source: string; audio?: never; mimeType?: never }

export function useVoiceAgent(): UseVoiceAgentReturn {
  const [status, setStatus] = useState<VoiceStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)

  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  const stop = useCallback(() => {
    cleanup()
    setStatus('idle')
  }, [cleanup])

  const speak = useCallback(
    async (pageId: string) => {
      // Stop any currently playing audio first
      cleanup()
      setError(null)
      setStatus('loading')

      try {
        const response = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId }),
        })

        if (!response.ok) {
          let errMessage = `Server error: ${response.status}`
          try {
            const json = await response.json()
            if (json?.error) errMessage = json.error
          } catch {
            // ignore parse error
          }
          throw new Error(errMessage)
        }

        const data: VoiceApiResponse = await response.json()

        // Browser TTS fallback path
        if (data.useBrowserTTS) {
          if (!data.text) {
            // Nothing to speak (error-fallback with empty text)
            setStatus('idle')
            return
          }
          setStatus('playing')
          speakWithBrowser(data.text)

          // Poll speechSynthesis to detect when speaking ends
          const pollInterval = setInterval(() => {
            if (typeof window !== 'undefined' && !window.speechSynthesis.speaking) {
              clearInterval(pollInterval)
              setStatus('idle')
            }
          }, 250)
          return
        }

        // Gemini audio path — decode base64 and play
        const { audio, mimeType } = data
        const binaryStr = atob(audio)
        const bytes = new Uint8Array(binaryStr.length)
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: mimeType })
        const objectUrl = URL.createObjectURL(blob)
        objectUrlRef.current = objectUrl

        const audioEl = new Audio(objectUrl)
        audioRef.current = audioEl

        audioEl.addEventListener('ended', () => {
          cleanup()
          setStatus('idle')
        })

        audioEl.addEventListener('error', (e) => {
          console.error('[useVoiceAgent] Audio playback error:', e)
          cleanup()
          setError('Audio playback failed')
          setStatus('error')
        })

        setStatus('playing')
        await audioEl.play()
      } catch (err) {
        cleanup()
        const message = err instanceof Error ? err.message : 'Failed to play voice'
        console.error('[useVoiceAgent] Error:', message)
        setError(message)
        setStatus('error')
      }
    },
    [cleanup]
  )

  return { status, error, speak, stop }
}
