import React from "react";
import { Lock, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface GuestPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function GuestPromptModal({ isOpen, onClose, title, message }: GuestPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-card border border-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-150 text-center"
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

        {/* Lock Emblem */}
        <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mx-auto mb-4 border border-primary/30 shadow-gold">
          <Lock className="h-7 w-7" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground font-display">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-border bg-background py-2.5 px-3 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all cursor-pointer"
          >
            Stay as Guest
          </button>

          <Link
            to="/login"
            onClick={onClose}
            className="w-full rounded-2xl bg-gold-grad py-2.5 px-3 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow transition-all flex items-center justify-center text-center"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
