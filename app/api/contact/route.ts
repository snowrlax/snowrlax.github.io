import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, emojiMessage, haiku } = await request.json()

    if (!name || !email || !emojiMessage || !haiku) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const haikuLines = haiku.split('\n').map((line: string) => `<p style="margin: 0; font-style: italic;">${line}</p>`).join('')

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'pranavv.tech@gmail.com',
      replyTo: email,
      subject: `Haiku from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Haiku Message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Emojis:</strong></p>
          <p style="font-size: 32px; letter-spacing: 8px;">${emojiMessage}</p>
          <p><strong>Haiku:</strong></p>
          <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #333; margin: 16px 0;">
            ${haikuLines}
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
