import React, { useState } from "react";
import { Bot, Sparkles, Send, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { WHATSAPP } from "@/lib/collections";

export function AiAssistantCard() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-[#3A1208] via-[#4A1A0C] to-[#5A1C0C] p-6 sm:p-10 shadow-2xl text-white">
          {/* Subtle animated sparkles */}
          <div className="absolute top-4 right-10 text-amber-200/40 animate-pulse text-lg">✦</div>
          <div className="absolute bottom-6 right-24 text-amber-200/30 animate-pulse text-2xl delay-300">✦</div>
          <div className="absolute top-1/2 right-1/3 text-amber-200/20 text-sm">✨</div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 sm:gap-6">
              {/* Cute 3D-styled Mascot matching the mobile app */}
              <div className="relative shrink-0">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-[#200B04] border-2 border-primary/50 flex items-center justify-center shadow-lg">
                  <div className="flex flex-col items-center">
                    {/* Glowing golden visor */}
                    <div className="w-12 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-200 flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(245,158,11,0.6)]">
                      <div className="w-2 h-2 rounded-full bg-[#3A1208] animate-ping" />
                      <div className="w-2 h-2 rounded-full bg-[#3A1208]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mt-2">Al-Nur AI</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-[#3A1208] flex items-center justify-center text-[10px]">
                  ✓
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  AI Shop Assistant
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-white leading-tight">
                  Need help finding the perfect outfit?
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/80 mt-1.5 max-w-lg leading-relaxed">
                  Tell me what you're looking for — I'll match your style, occasion, and budget across all our luxury modest collections.
                </p>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(true)}
              className="shrink-0 w-full md:w-auto rounded-full bg-gold-grad px-8 py-4 text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Chat with AI →</span>
            </button>
          </div>
        </div>
      </div>

      {chatOpen && <AiChatModal onClose={() => setChatOpen(false)} />}
    </>
  );
}

function AiChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Assalamu Alaikum! I'm your Al-Nur Personal Stylist. What can I help you discover today — a bridal set, Dubai abaya, Medina silk hijab, or long-lasting oud?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    "I need an outfit for a Nikkah wedding",
    "Best silk hijabs for daily wear",
    "Match a veil and jewelry set",
    "Long-lasting oud perfumes",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes("nikkah") || lower.includes("wedding") || lower.includes("bridal")) {
        reply = "For a Nikkah celebration, I recommend our 'Aisha 24K Bridal Set' (₦55,000) paired with the 'Champagne Silk Bisht Abaya' (₦32,000) and 'Bridal Attar' (₦25,000). Would you like to order this curated ensemble directly via WhatsApp concierge?";
      } else if (lower.includes("hijab") || lower.includes("silk")) {
        reply = "Our 'Pure Medina Silk Hijab' (₦8,500) is hand-selected from Medina — featherlight, 100% opaque, and pairs exquisitely with all neutral abayas. We have it in Rose, Ivory, Espresso, and Desert Gold.";
      } else if (lower.includes("perfume") || lower.includes("oud")) {
        reply = "Our signature 'Royal Oud Attar' (₦18,000) features Cambodian agarwood softened with warm Bourbon vanilla. It lasts over 18 hours on prayer garbs and silks.";
      } else {
        reply = "We have exquisite hand-picked pieces in stock! Our 'Dubai Gold Noir Abaya' (₦28,500) and 'Zahra Bangles' (₦22,000) are currently our top customer favorites. You can also chat directly with our Lagos boutique concierge on WhatsApp!";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-primary/30 shadow-2xl flex flex-col h-[580px] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border bg-gradient-to-r from-[#3A1208] to-[#5A1C0C] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-white">Al-Nur AI Stylist</h4>
              <p className="text-[11px] text-amber-200/80 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online · Modest Fashion Assistant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-background/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none shadow-sm"
                    : "bg-card border border-border text-foreground rounded-tl-none shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-card border border-border p-3 text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-150" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce delay-300" />
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt pills */}
        <div className="px-4 py-2 border-t border-border/60 bg-card/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="shrink-0 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 px-3 py-1 text-[11px] font-medium text-foreground transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 border-t border-border bg-card flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about sizes, fabrics, wedding sets..."
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={() => handleSend()}
            className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
