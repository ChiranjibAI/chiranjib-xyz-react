# Design Spec: AI Video + Voice + Chat Systems
**Date:** 2026-03-22
**Project:** chiranjib-xyz-react (Next.js 14)

---

## Overview

Three parallel systems that transform chiranjib.xyz from a static portfolio into a live AI-powered experience where visitors can talk to Chiranjib's AI, get instant video demos of any service, and have a multi-model chat powered by free APIs.

---

## System 1 — Voice Agent Fix (Gemini TTS)

**Problem:** Voice agent broken. `lib/elevenlabs.ts` missing. `.env.local` has placeholder keys.

**Solution:**
- Create `lib/gemini-tts.ts` — calls Gemini TTS endpoint, returns audio buffer
- Update `/api/voice/route.ts` — use Gemini TTS, fallback to Web Speech API signal
- Update `useVoiceAgent.ts` — add Web Speech API fallback if Gemini fails
- Add `GEMINI_API_KEY` to `.env.local`

**Flow:**
1. User clicks mic → STT via Web Speech API (browser native)
2. Transcript sent to `/api/chat` → response text returned
3. Text sent to `/api/voice` → Gemini TTS generates audio → returned as base64
4. Fallback: if Gemini fails, `useVoiceAgent` uses `window.speechSynthesis`

---

## System 2 — Chat Upgrade (OpenRouter Multi-Model)

**Problem:** `/api/chat/route.ts` uses Anthropic SDK with placeholder key. No service detection.

**Solution:**
- Update `/api/chat/route.ts` to use OpenRouter API (free models: gemini-2.0-flash:free, nvidia/llama-3.1-nemotron-70b-instruct:free)
- Enhanced system prompt: Chiranjib persona + all 20 services listed
- Response includes `triggerVideo?: serviceId` when a specific service is discussed
- Add `OPENROUTER_API_KEY` to `.env.local`

**Models (free tier):**
- Primary: `google/gemini-2.0-flash-exp:free`
- Fallback: `nvidia/llama-3.1-nemotron-70b-instruct:free`

---

## System 3 — Remotion Service Demo Videos

**Goal:** When user asks about any of the 20 services, AI detects the service and offers an instant video demo. Video is rendered client-side in browser using `@remotion/player`.

**Stack:**
- `@remotion/player` — browser-side rendering, no Lambda needed
- `@remotion/core` — compositions, sequences, animations
- OpenRouter — generates video script (narration per scene)
- Gemini TTS — generates voiceover audio for each scene
- Web Speech API — fallback TTS

**Video Spec:**
- Duration: 390 frames @ 30fps = 13 seconds
- 5 scenes × ~78 frames each:
  1. **Intro** — Service name + tagline, animated
  2. **Problem** — The pain point this service solves
  3. **Solution** — How Chiranjib builds it
  4. **Results** — Real metrics from case studies
  5. **CTA** — "Start a Project → chiranjib.xyz/hire"

**Files:**
- `components/video/ServiceDemoVideo.tsx` — Remotion composition
- `components/video/VideoPlayer.tsx` — `<Player>` wrapper, client component
- `components/video/scenes/` — 5 scene components
- `/api/generate-video/route.ts` — Generates script + TTS audio URLs per scene
- Chat UI update: "Generate Demo Video" button appears when `triggerVideo` present

**Integration in Chat:**
```
User: "tell me about WhatsApp bots"
AI: { message: "...", triggerVideo: "whatsapp-bot" }
Chat UI: Shows [▶ Watch 30-sec Demo] button
User clicks → VideoPlayer mounts with ServiceDemoVideo composition
```

---

## API Keys Needed

```env
GEMINI_API_KEY=         # Gemini TTS + flash model
OPENROUTER_API_KEY=     # Free models gateway
```

---

## File Structure

```
lib/
  gemini-tts.ts          # NEW: Gemini TTS wrapper
app/api/
  voice/route.ts         # UPDATE: use gemini-tts
  chat/route.ts          # UPDATE: OpenRouter
  generate-video/route.ts # NEW: script + TTS gen
components/
  voice/
    useVoiceAgent.ts     # UPDATE: Web Speech fallback
    VoiceAgent.tsx       # minor UI update
  video/
    ServiceDemoVideo.tsx # NEW: Remotion composition
    VideoPlayer.tsx      # NEW: Player wrapper
    scenes/
      SceneIntro.tsx
      SceneProblem.tsx
      SceneSolution.tsx
      SceneResults.tsx
      SceneCTA.tsx
```
