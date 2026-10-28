import React from "react";

interface MosqueLogoProps {
  className?: string;
  size?: number;
}

export function MosqueLogo({ className = "w-10 h-10", size = 40 }: MosqueLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-xl bg-primary/10 border border-primary/25 shadow-sm ${className}`}
    >
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Islamic dome arch */}
        <path
          d="M 6 36 L 6 21 C 6 10 18 5 20 2 C 22 5 34 10 34 21 L 34 36 L 26 36 L 26 26 C 26 20 14 20 14 26 L 14 36 Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Crescent moon at apex */}
        <circle cx="20" cy="3" r="2.2" fill="currentColor" className="text-gold" />
        <circle cx="20.8" cy="2.6" r="1.8" fill="currentColor" className="text-background" />
      </svg>
    </div>
  );
}
