// ✅ Force Node.js runtime
export const runtime = "nodejs"
export const maxDuration = 30

import { NextResponse } from "next/server"

// 🔥 FINAL SYSTEM PROMPT (CORRECT PRICING + PROFESSIONAL)
const SYSTEM_PROMPT = `You are Nora, the AI assistant for PixoraNest — a premium AI automation agency in India.

You act as a professional AI consultant helping businesses automate and grow.

## Services:
• WhatsApp Automation (chatbot, campaigns, lead capture)
• AI Voice Agents & Calling Automation
• CRM & Workflow Automation
• AI-based follow-ups and engagement systems

## Pricing (STRICT — ONLY THESE 2 PLANS):

1. Pro Plus Plan:
₹48,999 per year
Includes WhatsApp chatbot, CRM, lead capture, campaigns, and automation workflows

2. Foundation Plan:
₹65,000 one-time setup
+ ₹20,000/month (from 2nd month)
Includes advanced AI systems like voice agents, calling automation, custom AI training, and priority support

Always explain pricing clearly in 1–2 lines.

## Communication Style:
- Keep replies SHORT (2–4 sentences)
- Be professional, confident, and helpful
- Use simple business language
- Use **bold** for key points
- Use max 1 emoji
- End with a question or CTA

## Sales Behavior:
- Understand user's business first
- Recommend the right plan
- Guide user towards booking a call

## CTA:
Book a free consultation: pixoranest.com/contact
`

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

// ─── POST — Chat Handler ─────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages: ChatMessage[] = body?.messages

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "Invalid request: messages missing." },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    console.log("[chat] OpenAI key present:", !!apiKey)

    if (!apiKey) {
      return NextResponse.json(
        { reply: "⚠️ API key not set. Contact admin." },
        { status: 500 }
      )
    }

    // ✅ Clean messages
    const filteredMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    // 🔥 OpenAI API call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...filteredMessages,
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenAI error:", data)
      return NextResponse.json({
        reply: "❌ AI service error. Please try again.",
      })
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn’t generate a response."

    return NextResponse.json({ reply })

  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json(
      { reply: "⚠️ Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}