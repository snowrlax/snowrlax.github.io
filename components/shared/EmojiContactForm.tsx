"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRateLimit } from '@/hooks/useRateLimit'

const emojiCategories = [
  { name: "Feelings", emojis: ["😀", "😍", "🥺", "😎", "🤔", "😴", "🥳", "😱", "🤯", "🙄"] },
  { name: "Objects", emojis: ["💻", "📱", "🎮", "📚", "🎵", "🎬", "🚗", "✈️", "🏠", "🍕"] },
  { name: "Nature", emojis: ["🌞", "🌈", "🌊", "🌵", "🌸", "🍂", "🔥", "❄️", "🌙", "⚡"] },
  { name: "Random", emojis: ["👽", "👻", "🤖", "🦄", "🦸‍♂️", "🧙‍♀️", "🧠", "👑", "💯", "🏆"] }
]

type Step = 'input' | 'preview' | 'success'

export default function EmojiContactForm({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [step, setStep] = useState<Step>('input')
  const [loading, setLoading] = useState(false)
  const [generatingHaiku, setGeneratingHaiku] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [haiku, setHaiku] = useState<string | null>(null)

  const { canSubmit, recordSubmission, submissionsRemaining } = useRateLimit()

  const addEmoji = (emoji: string) => {
    if (message.length < 10) {
      setMessage([...message, emoji])
    }
  }

  const removeLastEmoji = () => {
    setMessage(message.slice(0, -1))
  }

  const generateHaiku = async () => {
    if (!name || !email || message.length === 0) return

    setGeneratingHaiku(true)
    setError(null)

    try {
      const response = await fetch('/api/haiku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emojis: message.join('')
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate haiku')
      }

      const data = await response.json()
      setHaiku(data.haiku)
      setStep('preview')
    } catch {
      setError('Failed to generate haiku. Please try again.')
    } finally {
      setGeneratingHaiku(false)
    }
  }

  const handleConfirmSend = async () => {
    if (!canSubmit()) {
      setError('You have reached the daily limit. Please try again tomorrow.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          emojiMessage: message.join(''),
          haiku
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      recordSubmission()
      setStep('success')
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = () => {
    generateHaiku()
  }

  const handleBackToInput = () => {
    setStep('input')
    setHaiku(null)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl p-6 w-full max-w-md"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Send me a Haiku</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.form
              onSubmit={(e) => { e.preventDefault(); generateHaiku(); }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-sm text-gray-500 text-start mb-2">
                {submissionsRemaining} haiku{submissionsRemaining !== 1 ? 's' : ''} remaining today
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Select Emojis (max 10)</label>
                <div className="min-h-16 p-3 border rounded-lg flex flex-wrap items-center gap-1 mb-2">
                  {message.length > 0 ? (
                    message.map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        {emoji}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">Pick emojis to inspire your haiku...</span>
                  )}
                </div>

                <div className="flex justify-between mb-2">
                  <div className="flex space-x-2">
                    {emojiCategories.map((category, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveCategory(index)}
                        className={`px-2 py-1 text-xs rounded-full ${activeCategory === index ? 'bg-black text-white' : 'bg-gray-100'}`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={removeLastEmoji}
                    className="text-sm text-gray-500 hover:text-black"
                    disabled={message.length === 0}
                  >
                    ⌫
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 p-2 border rounded-lg bg-gray-50">
                  {emojiCategories[activeCategory].emojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      disabled={message.length >= 10}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!name || !email || message.length === 0 || generatingHaiku || !canSubmit()}
              >
                {generatingHaiku ? 'Generating Haiku...' : 'Generate Haiku'}
              </button>

              {!canSubmit() && (
                <p className="text-sm text-gray-500 text-center">
                  Daily limit reached. Try again tomorrow!
                </p>
              )}
            </motion.form>
          )}

          {step === 'preview' && haiku && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{message.join(' ')}</div>
                <p className="text-sm text-gray-500">Your emojis inspired this haiku:</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border">
                {haiku.split('\n').map((line, i) => (
                  <p key={i} className="text-center text-lg italic text-gray-800">
                    {line}
                  </p>
                ))}
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="flex-1 py-3 border border-black text-black rounded-full font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
                  disabled={generatingHaiku}
                >
                  {generatingHaiku ? 'Regenerating...' : 'Regenerate'}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSend}
                  className="flex-1 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Confirm & Send'}
                </button>
              </div>

              <button
                type="button"
                onClick={handleBackToInput}
                className="w-full text-sm text-gray-500 hover:text-black"
              >
                ← Back to edit
              </button>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-5xl mb-4">🎋</div>
              <h3 className="text-xl font-bold mb-2">Haiku Sent!</h3>
              <p className="text-gray-600 mb-4">Your poetic message is on its way.</p>
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="text-2xl mb-2">{message.join(' ')}</div>
                {haiku && haiku.split('\n').map((line, i) => (
                  <p key={i} className="text-sm italic text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
