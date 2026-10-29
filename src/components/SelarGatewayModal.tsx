import React, { useState, useEffect } from "react";
import { ShieldCheck, X, Check, RotateCcw, ExternalLink } from "lucide-react";
import {
  DEFAULT_SELAR_STORE_URL,
  getActiveSelarStoreUrl,
  setActiveSelarStoreUrl,
} from "@/lib/selar";
import { toast } from "sonner";

interface SelarGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelarGatewayModal({ isOpen, onClose }: SelarGatewayModalProps) {
  const [storeUrl, setStoreUrl] = useState(DEFAULT_SELAR_STORE_URL);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStoreUrl(getActiveSelarStoreUrl());
      setIsEditing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = storeUrl.trim();
    if (!trimmed || !trimmed.startsWith("http")) {
      toast.error("Please enter a valid https:// URL");
      return;
    }
    if (trimmed.includes("fatima-muhammad") || trimmed.includes("fatimamuhammad")) {
      toast.error("Invalid merchant URL", {
        description: "Please use the official Al-Nur Selar merchant link.",
      });
      setStoreUrl(DEFAULT_SELAR_STORE_URL);
      setActiveSelarStoreUrl(DEFAULT_SELAR_STORE_URL);
      return;
    }
    setActiveSelarStoreUrl(trimmed);
    toast.success("Payment Gateway Updated", {
      description: `Merchant URL set to ${trimmed}`,
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    setActiveSelarStoreUrl(DEFAULT_SELAR_STORE_URL);
    setStoreUrl(DEFAULT_SELAR_STORE_URL);
    setIsEditing(false);
    toast.success("Reset to Default Merchant", {
      description: DEFAULT_SELAR_STORE_URL,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Emblem */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-sm">
          <ShieldCheck className="h-7 w-7" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-foreground font-display text-center">
          Selar Halal Gateway
        </h3>
        <p className="mt-1 text-xs text-muted-foreground text-center">
          Official Al-Nur merchant payment integration
        </p>

        {/* Merchant Info Card */}
        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">Merchant Account:</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Active
            </span>
          </div>

          <div className="text-xs">
            <span className="text-muted-foreground block mb-1">Store URL:</span>
            {isEditing ? (
              <input
                type="url"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                placeholder="https://selar.com/m/alnurstore"
                className="w-full rounded-xl border border-primary/40 bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            ) : (
              <div className="flex items-center justify-between bg-background/80 rounded-xl px-3 py-2 border border-border/60">
                <span className="font-mono text-[11px] text-primary truncate max-w-[240px]">
                  {storeUrl}
                </span>
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors ml-2"
                  title="Open merchant page"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
            Supports Mastercard, Visa, Verve, Nigerian Bank Transfers, and USSD payments.
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 rounded-2xl bg-gold-grad py-2.5 px-4 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Link</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-2xl border border-border bg-background py-2.5 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex-1 rounded-2xl border border-primary/30 bg-primary/10 py-2.5 px-4 text-xs font-bold text-primary hover:bg-primary/20 transition-all text-center"
              >
                Configure Link
              </button>
              {storeUrl !== DEFAULT_SELAR_URL && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-2xl border border-border bg-background py-2.5 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                  title="Reset to default Al-Nur store"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl bg-gold-grad py-2.5 px-4 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow transition-all"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
