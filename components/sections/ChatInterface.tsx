'use client'
import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VideoTrigger } from '@/components/video/VideoTrigger'
import { AnimatedLetters } from '@/components/ui/AnimatedLetters'

interface Message {
  role: 'user' | 'assistant'
  content: string
  triggerVideo?: string | null
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm ChiranjibAI's assistant. I can answer questions about Chiranjib's services, pricing, past projects, and automation capabilities. How can I help you today?",
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  )
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send only role+content to the API (no triggerVideo in request)
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to get response')
      }

      const data = await res.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || data.content || 'I could not process that. Please try again.',
        triggerVideo: data.triggerVideo ?? null,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Sorry, I encountered an error connecting to the server. Please try again in a moment.',
        triggerVideo: null,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green border-2 border-surface" />
        </div>
        <div>
          <AnimatedLetters
            text="ChiranjibAI Assistant"
            tag="p"
            className="text-sm font-semibold text-text"
            letterDelay={0.03}
            startDelay={0.1}
          />
          <p className="text-xs text-muted">Online — usually responds instantly</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.role === 'user' ? '' : 'w-full'}`}>
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-cyan text-bg rounded-br-sm font-medium'
                    : 'bg-surface border border-border text-text rounded-bl-sm'
                }`}
              >
                {message.content}
              </div>

              {/* Video trigger: shown below assistant messages that have a triggerVideo */}
              {message.role === 'assistant' && message.triggerVideo && (
                <AnimatePresence>
                  <VideoTrigger serviceId={message.triggerVideo} />
                </AnimatePresence>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border rounded-2xl rounded-bl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-4 border-t border-border bg-surface">
        <div className="flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about services, pricing, or your project idea..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all duration-200 resize-none disabled:opacity-50"
            style={{ maxHeight: '120px', overflowY: 'auto' }}
            aria-label="Chat message input"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan text-bg flex items-center justify-center hover:bg-cyan/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-xs text-muted text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
