import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { emojis } = await request.json()

    if (!emojis) {
      return NextResponse.json(
        { error: 'Emojis are required' },
        { status: 400 }
      )
    }

    const groqApiKey = process.env.GROQ_API

    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'GROQ API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a poetic haiku master. Generate a single haiku (5-7-5 syllable structure) inspired by the given emojis. Return ONLY the haiku with each line separated by a newline. No additional text, no quotation marks, just the three lines of the haiku.'
          },
          {
            role: 'user',
            content: `Create a haiku inspired by these emojis: ${emojis}`
          }
        ],
        temperature: 0.9,
        max_tokens: 100,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('GROQ API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to generate haiku' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const haiku = data.choices?.[0]?.message?.content?.trim()

    if (!haiku) {
      return NextResponse.json(
        { error: 'No haiku generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ haiku })
  } catch (error) {
    console.error('Haiku generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate haiku' },
      { status: 500 }
    )
  }
}
