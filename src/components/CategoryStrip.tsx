import React from "react";
import { Sparkles } from "lucide-react";

interface CategoryStripProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

const categories = [
  {
    id: "all",
    name: "All Items",
    icon: "✦",
    color: "bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200",
  },
  {
    id: "abayas",
    name: "Abayas",
    icon: "👘",
    color: "bg-stone-100/80 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200",
  },
  {
    id: "hijabs",
    name: "Hijabs",
    icon: "🧕",
    color: "bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200",
  },
  {
    id: "jalabias",
    name: "Jalabias",
    icon: "✨",
    color: "bg-yellow-100/60 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-200",
  },
  {
    id: "thobes",
    name: "Thobes",
    icon: "👔",
    color: "bg-blue-100/60 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200",
  },
  {
    id: "jewelries",
    name: "Jewelries",
    icon: "💎",
    color: "bg-purple-100/60 dark:bg-purple-950/40 text-purple-800 dark:text-purple-200",
  },
  {
    id: "veils",
    name: "Veils",
    icon: "👑",
    color: "bg-rose-100/60 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200",
  },
  {
    id: "perfumes",
    name: "Perfumes",
    icon: "🌸",
    color: "bg-orange-100/60 dark:bg-orange-950/40 text-orange-800 dark:text-orange-200",
  },
  {
    id: "bags",
    name: "Bags",
    icon: "👜",
    color: "bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200",
  },
  {
    id: "slippers",
    name: "Slippers",
    icon: "👡",
    color: "bg-teal-100/60 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200",
  },
];

export function CategoryStrip({ activeCategory, onSelectCategory }: CategoryStripProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
            Categories
          </span>
          <h2 className="font-display text-2xl font-bold">Explore by Modest Line</h2>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">
          Scroll horizontally to view all
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {categories.map((c) => {
          const isSelected = activeCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className="group flex flex-col items-center gap-2 shrink-0 focus:outline-none"
            >
              <div
                className={`relative h-16 w-16 sm:h-18 sm:w-18 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${c.color} ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-md"
                    : "hover:scale-105 border border-border/60"
                }`}
              >
                <span>{c.icon}</span>
                {isSelected && (
                  <span className="absolute -bottom-1 h-2 w-2 rounded-full bg-primary animate-ping" />
                )}
              </div>
              <span
                className={`text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
                  isSelected
                    ? "text-primary font-bold"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {c.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
