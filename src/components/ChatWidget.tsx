import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey 👋 I'm CartBot, your professionally sleep-deprived shopping buddy. Ask me about products, vent about your 8am, or both.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Something short-circuited. Try again?",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "The wifi ghosted us. Try again?" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full btn-glow animate-glow shadow-xl transition hover:scale-110"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[min(22rem,calc(100vw-2rem))] animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-strong flex h-[32rem] flex-col overflow-hidden rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/40 to-cyan-400/40">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-display text-sm font-bold">
                  Cart<span className="neon-text">Bot</span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Powered by caffeine & AI
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-br from-fuchsia-500/80 to-purple-500/80 px-3 py-2 text-sm text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm glass px-3 py-2 text-sm whitespace-pre-wrap"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl rounded-bl-sm px-3 py-2 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2 rounded-2xl glass p-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Ask me anything, roast your prof..."
                  className="max-h-24 flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-xl btn-glow disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                CartBot may hallucinate. Your debt is real though.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
