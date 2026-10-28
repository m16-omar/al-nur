import React, { useState } from "react";
import { Gift, ChevronRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function WelcomeBanner() {
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("ALNUR15");
    setCopied(true);
    toast.success("Promo code 'ALNUR15' copied to clipboard! (15% OFF)");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <div
          onClick={() => setOpenModal(true)}
          className="group cursor-pointer rounded-2xl border border-primary/25 bg-gradient-to-r from-amber-50/80 via-primary/5 to-amber-50/80 dark:from-card/60 dark:via-primary/10 dark:to-card/60 p-3.5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
              <Gift className="h-5 w-5 animate-bounce" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">
                  New User Welcome Gift
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary-foreground shadow-sm">
                  15% OFF
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground/90 truncate mt-0.5">
                Tap to claim your <span className="text-primary font-bold">ALNUR15</span> voucher & member perks
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Welcome Voucher Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-card border border-primary/30 p-6 sm:p-8 shadow-2xl text-center">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50"
            >
              ✕
            </button>

            <div className="mx-auto h-16 w-16 rounded-2xl bg-gold-grad flex items-center justify-center text-primary-foreground shadow-lg mb-4">
              <Sparkles className="h-8 w-8" />
            </div>

            <span className="inline-block text-xs uppercase tracking-widest text-primary font-bold mb-2">
              Member Exclusive
            </span>
            <h3 className="font-display text-3xl font-semibold text-foreground">
              15% Off Your First Order
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              Welcome to the Al-Nur family! Enjoy 15% off across our entire collection of abayas, hijabs, jalabias, and perfumes.
            </p>

            <div className="mt-6 p-4 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-between gap-3">
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Voucher Code</div>
                <div className="font-mono text-xl font-bold text-primary">ALNUR15</div>
              </div>
              <button
                onClick={handleCopy}
                className="rounded-xl bg-gold-grad px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="h-4 w-4" /> : null}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground mt-3">
              Valid on all web & WhatsApp orders. Free shipping within Lagos applied automatically!
            </p>

            <button
              onClick={() => setOpenModal(false)}
              className="mt-6 w-full rounded-full border border-border py-2.5 text-xs font-semibold hover:bg-muted/50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}
