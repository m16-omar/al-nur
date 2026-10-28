import React from "react";
import { MosqueLogo } from "./MosqueLogo";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* 3D Mini Arch Emblem matching Flutter app */}
      <div className="relative group transition-transform duration-300 hover:scale-105">
        <div
          className="w-18 h-18 rounded-[22px] flex items-center justify-center p-3.5 relative shadow-[0_10px_25px_rgba(200,122,30,0.3)] border border-[#D4AF37]/70"
          style={{
            background: "linear-gradient(135deg, #5A1C0C 0%, #3A1208 50%, #2E110A 100%)",
            transform: "perspective(800px) rotateX(4deg)",
          }}
        >
          {/* Mosque Emblem */}
          <div className="text-[#D4AF37] flex items-center justify-center">
            <MosqueLogo size={36} />
          </div>

          {/* Golden star/accent dot in top right */}
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#FBF4E6] shadow-[0_0_8px_#D4AF37]" />
        </div>
      </div>

      {/* Brand Title */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        <span className="font-display text-2xl font-bold tracking-tight text-primary">Al-Nur</span>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
          STORE
        </span>
      </div>

      {/* Screen Title */}
      <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-sm">
        {subtitle}
      </p>
    </div>
  );
}
