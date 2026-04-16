"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Send, Bot, Sparkles, Zap, Phone, MessageSquare } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant"

type Message = {
  id: number
  role: Role
  content: string
  time: string
  isStreaming?: boolean
}

type APIMessage = {
  role: Role
  content: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  { label: "Pricing",             icon: "💰" },
  { label: "Demo",                icon: "🎯" },
  { label: "WhatsApp Automation", icon: "💬" },
  { label: "AI Calling",          icon: "📞" },
]

const INTRO_SEQUENCE: { role: Role; content: string; typingDelay: number }[] = [
  {
    role: "assistant",
    content: "Hello! 👋 Welcome to **PixoraNest** — I'm Nora, your AI automation consultant.",
    typingDelay: 700,
  },
  {
    role: "assistant",
    content:
      "I can help you explore our services, pricing, or book a free **30-min discovery call**. What are you looking for?",
    typingDelay: 1200,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

let _id = 0
function uid() { return ++_id }

// ─── Inline bold renderer ─────────────────────────────────────────────────────

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

// ─── Typing Indicator (CSS animation only) ───────────────────────────────────

function TypingIndicator() {
  return (
    <div className="chat-typing-in flex items-center gap-2">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm">
        <Bot className="h-3 w-3 text-white" />
      </div>
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm"
        style={{
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(219,234,254,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-2 w-2 rounded-full bg-blue-400 chat-dot"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Message Bubble (CSS animation only) ─────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user"

  return (
    <div className={`chat-msg-in flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
      {!isUser && (
        <div className="flex items-center gap-1.5 mb-0.5 ml-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-sm">
            <Bot className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="text-[10px] font-medium text-blue-600/80 tracking-wide">Nora · PixoraNest AI</span>
        </div>
      )}

      <div
        className={`relative max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
          ${isUser
            ? "rounded-tr-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20"
            : "rounded-tl-sm text-slate-700 shadow-sm"
          }`}
        style={
          !isUser
            ? {
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(219,234,254,0.8)",
                backdropFilter: "blur(8px)",
              }
            : {}
        }
      >
        {!isUser && (
          <div className="pointer-events-none absolute inset-0 rounded-2xl rounded-tl-sm bg-gradient-to-br from-white/50 to-transparent" />
        )}
        <span className="relative">
          <RichText text={msg.content} />
          {msg.isStreaming && (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 rounded-sm bg-blue-400 align-middle chat-cursor" />
          )}
        </span>
      </div>

      <span className={`text-[9px] text-slate-400 px-1 ${isUser ? "text-right" : "text-left"}`}>
        {msg.time}
      </span>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HeroAIChat() {
  const [messages,   setMessages]   = useState<Message[]>([])
  const [inputVal,   setInputVal]   = useState("")
  const [isTyping,   setIsTyping]   = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [introsDone, setIntrosDone] = useState(false)
  const [apiHistory, setApiHistory] = useState<APIMessage[]>([])
  const [visible,    setVisible]    = useState(false)

  const chatBodyRef  = useRef<HTMLDivElement>(null)
  const inputRef     = useRef<HTMLInputElement>(null)
  const cancelledRef = useRef(false)

  // Entrance animation trigger
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  // Scroll chat body only
  const scrollChat = useCallback(() => {
    const el = chatBodyRef.current
    if (!el) return
    const pageY = window.scrollY
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    window.scrollTo({ top: pageY, behavior: "instant" as ScrollBehavior })
  }, [])

  useEffect(() => { scrollChat() }, [messages, isTyping, scrollChat])

  const pushMessage = useCallback((msg: Omit<Message, "id" | "time">): number => {
    const id = uid()
    setMessages((prev) => [...prev, { ...msg, id, time: getTime() }])
    return id
  }, [])

  const streamText = useCallback(async (fullText: string, msgId: number) => {
    let displayed = ""
    for (const char of fullText) {
      if (cancelledRef.current) return
      displayed += char
      setMessages((prev) =>
        prev.map((m) => m.id === msgId ? { ...m, content: displayed, isStreaming: true } : m)
      )
      await sleep(16 + Math.random() * 14)
    }
    setMessages((prev) =>
      prev.map((m) => m.id === msgId ? { ...m, content: fullText, isStreaming: false } : m)
    )
  }, [])

  // Intro sequence
  useEffect(() => {
    cancelledRef.current = false

    async function runIntro() {
      for (const step of INTRO_SEQUENCE) {
        if (cancelledRef.current) return
        await sleep(step.typingDelay)
        setIsTyping(true)
        await sleep(800 + Math.random() * 400)
        if (cancelledRef.current) return
        setIsTyping(false)
        const id = pushMessage({ role: step.role, content: "", isStreaming: true })
        await streamText(step.content, id)
        await sleep(250)
      }
      if (!cancelledRef.current) {
        setIntrosDone(true)
        setIsDisabled(false)
        inputRef.current?.focus()
      }
    }

    runIntro()
    return () => { cancelledRef.current = true }
  }, [pushMessage, streamText])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isDisabled) return

      setIsDisabled(true)
      setInputVal("")
      pushMessage({ role: "user", content: trimmed })

      const newHistory: APIMessage[] = [...apiHistory, { role: "user", content: trimmed }]
      setApiHistory(newHistory)

      await sleep(500 + Math.random() * 300)
      setIsTyping(true)

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newHistory }),
        })
        const data = await res.json()
        const reply: string = data.reply ?? "I didn't catch that — could you rephrase? 🙏"
        await sleep(200)
        setIsTyping(false)
        const id = pushMessage({ role: "assistant", content: "", isStreaming: true })
        await streamText(reply, id)
        setApiHistory((prev) => [...prev, { role: "assistant", content: reply }])
      } catch {
        setIsTyping(false)
        pushMessage({
          role: "assistant",
          content: "Something went wrong on my end. Please try again or visit **pixoranest.com/contact** 🙏",
        })
      }

      setIsDisabled(false)
      inputRef.current?.focus()
    },
    [isDisabled, apiHistory, pushMessage, streamText]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(inputVal)
  }

  return (
    <>
      <style>{`
        .chat-card-enter { opacity: 0; transform: translateX(40px); transition: opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94); }
        .chat-card-enter.chat-visible { opacity: 1; transform: none; }
        .chat-msg-in { animation: chatMsgIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .chat-typing-in { animation: chatMsgIn 0.22s ease both; }
        @keyframes chatMsgIn { from { opacity:0; transform:translateY(14px) scale(0.96); } to { opacity:1; transform:none; } }
        .chat-dot { animation: chatDot 0.75s ease-in-out infinite; }
        @keyframes chatDot { 0%,100% { transform:translateY(0); opacity:0.4; } 50% { transform:translateY(-5px); opacity:1; } }
        .chat-cursor { animation: chatCursor 0.5s steps(1) infinite; }
        @keyframes chatCursor { 0%,100%{opacity:1} 50%{opacity:0} }
        .chat-badge-top { animation: chatFloatTop 3.2s ease-in-out infinite; }
        .chat-badge-bot { animation: chatFloatBot 3.8s ease-in-out infinite; }
        @keyframes chatFloatTop { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes chatFloatBot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
        .chat-quick-btn { opacity: 0; transform: scale(0.82) translateY(4px); animation: chatQuickIn 0.22s ease-out forwards; }
        @keyframes chatQuickIn { to { opacity:1; transform:none; } }
        .chat-glow-pulse { animation: chatGlowPulse 3s ease-in-out infinite; }
        @keyframes chatGlowPulse { 0%,100%{opacity:0.5} 50%{opacity:0.9} }
        @media (prefers-reduced-motion: reduce) {
          .chat-card-enter, .chat-msg-in, .chat-typing-in, .chat-badge-top, .chat-badge-bot, .chat-quick-btn { animation: none; opacity:1; transform:none; }
        }
      `}</style>

      <div className={`relative mx-auto w-full max-w-sm chat-card-enter ${visible ? "chat-visible" : ""}`}>
        {/* Outer ambient glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-[22px] bg-gradient-to-br from-blue-400/15 via-blue-300/8 to-transparent blur-md" />

        {/* Main card */}
        <div
          className="relative flex flex-col overflow-hidden rounded-[18px] shadow-2xl shadow-blue-500/10"
          style={{
            background: "rgba(248,252,255,0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(186,218,255,0.5)",
          }}
        >
          {/* Inner gradient layer */}
          <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-b from-white/70 via-transparent to-blue-50/20" />

          {/* ── HEADER ── */}
          <div
            className="relative flex-none flex items-center gap-3 px-4 py-3.5"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderBottom: "1px solid rgba(186,218,255,0.45)",
            }}
          >
            <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-500/30">
              <Bot style={{ width: 18, height: 18 }} className="text-white" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm" />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-slate-800 leading-none">PixoraNest AI</p>
                <Sparkles className="h-3 w-3 text-blue-500 flex-shrink-0" />
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-green-500">Online · Typically replies instantly</p>
            </div>
            <div
              className="flex items-center gap-1 rounded-full px-2.5 py-1 flex-shrink-0"
              style={{ background: "rgba(239,246,255,0.9)", border: "1px solid rgba(186,218,255,0.7)" }}
            >
              <Zap className="h-2.5 w-2.5 text-blue-500" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">AI</span>
            </div>
          </div>

          {/* ── CHAT BODY ── */}
          <div
            ref={chatBodyRef}
            className="relative flex-none h-64 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            style={{ scrollBehavior: "smooth" }}
            onWheel={(e) => {
              const el = chatBodyRef.current
              if (!el) return
              const atTop    = el.scrollTop === 0 && e.deltaY < 0
              const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0
              if (!atTop && !atBottom) e.stopPropagation()
            }}
          >
            {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}
            {isTyping && <TypingIndicator />}
          </div>

          {/* ── QUICK REPLIES ── */}
          {introsDone && (
            <div
              className="relative flex-none px-4 pt-2.5 pb-2"
              style={{ borderTop: "1px solid rgba(186,218,255,0.4)" }}
            >
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400">Quick Replies</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_REPLIES.map((qr, i) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.label)}
                    disabled={isDisabled}
                    className="chat-quick-btn flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-[11px] font-medium text-slate-600 shadow-sm transition-all duration-200 cursor-pointer hover:border-blue-400/60 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      borderColor: "rgba(186,218,255,0.7)",
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    <span role="img" aria-label={qr.label}>{qr.icon}</span>
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── INPUT ── */}
          <div
            className="relative flex-none flex items-center gap-2.5 px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.92)",
              borderTop: "1px solid rgba(186,218,255,0.45)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              placeholder="Ask about pricing, demo, automation…"
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400/60 outline-none disabled:cursor-not-allowed"
            />
            <button
              onClick={() => sendMessage(inputVal)}
              disabled={isDisabled || !inputVal.trim()}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md shadow-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </div>

          {/* ── FOOTER ── */}
          <div
            className="flex-none flex items-center justify-between px-4 pb-3 pt-0.5"
            style={{ background: "rgba(255,255,255,0.92)" }}
          >
            <p className="text-[9px] text-slate-400 tracking-wide">🔒 Secure · Powered by PixoraNest AI</p>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-2.5 w-2.5 text-slate-300" />
              <Phone className="h-2.5 w-2.5 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Floating badge — top right */}
        <div className="absolute -right-3 -top-3 z-10 chat-badge-top">
          <div
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 shadow-lg"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(186,218,255,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Bot className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[11px] font-semibold text-slate-700">AI Agent</span>
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-sm shadow-green-400/50" />
          </div>
        </div>

        {/* Floating badge — bottom left */}
        <div className="absolute -bottom-3 -left-3 z-10 chat-badge-bot">
          <div
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 shadow-lg"
            style={{
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(186,218,255,0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-[11px] font-semibold text-slate-700">Automation</span>
          </div>
        </div>
      </div>
    </>
  )
}