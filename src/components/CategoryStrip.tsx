import React, { useEffect, useState } from "react";
import { fetchServerCategories, ServerCategory, DEFAULT_SERVER_CATEGORIES } from "@/lib/api";

interface CategoryStripProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

interface DisplayCategory {
  id: string;
  name: string;
  icon: string;
  tagline?: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

function mapServerCategoryToDisplay(cat: ServerCategory): DisplayCategory {
  switch (cat.categoryId.toLowerCase()) {
    case "abayas":
      return {
        id: "abayas",
        name: cat.name,
        icon: "👘",
        tagline: cat.tagline,
        bgColor: "bg-[#F5EFE6] dark:bg-[#2A231C]",
        textColor: "text-[#4A3E35] dark:text-[#EAE0D5]",
        borderColor: "border-[#DFD2C0] dark:border-[#3E342B]",
      };
    case "hijabs":
      return {
        id: "hijabs",
        name: cat.name,
        icon: "🧕",
        tagline: cat.tagline,
        bgColor: "bg-[#E8F1EC] dark:bg-[#1A2620]",
        textColor: "text-[#244E3B] dark:text-[#D1E6DA]",
        borderColor: "border-[#C9DDD1] dark:border-[#2C3E33]",
      };
    case "jalabias":
      return {
        id: "jalabias",
        name: cat.name,
        icon: "✨",
        tagline: cat.tagline,
        bgColor: "bg-[#FBF4E6] dark:bg-[#2B2418]",
        textColor: "text-[#6B4719] dark:text-[#EFE2CC]",
        borderColor: "border-[#E8D7B8] dark:border-[#423725]",
      };
    case "thobes":
      return {
        id: "thobes",
        name: cat.name,
        icon: "👔",
        tagline: cat.tagline,
        bgColor: "bg-[#E9F0FA] dark:bg-[#1A2433]",
        textColor: "text-[#23436B] dark:text-[#D2E2F8]",
        borderColor: "border-[#C8DAF3] dark:border-[#2C3B52]",
      };
    case "perfumes":
      return {
        id: "perfumes",
        name: cat.name,
        icon: "🌸",
        tagline: cat.tagline,
        bgColor: "bg-[#F5EDF9] dark:bg-[#291B2E]",
        textColor: "text-[#582C64] dark:text-[#E8D4F0]",
        borderColor: "border-[#DFC6E8] dark:border-[#3E2945]",
      };
    case "jewelries":
      return {
        id: "jewelries",
        name: cat.name,
        icon: "💎",
        tagline: cat.tagline,
        bgColor: "bg-[#FDF7E7] dark:bg-[#2C2616]",
        textColor: "text-[#6E5417] dark:text-[#EFE5BD]",
        borderColor: "border-[#EFE1AB] dark:border-[#453A20]",
      };
    case "silk-khimars":
      return {
        id: "silk-khimars",
        name: cat.name,
        icon: "🧣",
        tagline: cat.tagline,
        bgColor: "bg-[#F5EFE6] dark:bg-[#2A231C]",
        textColor: "text-[#503A2B] dark:text-[#EAE0D5]",
        borderColor: "border-[#DFD2C0] dark:border-[#3E342B]",
      };
    default:
      return {
        id: cat.categoryId,
        name: cat.name,
        icon: "✦",
        tagline: cat.tagline,
        bgColor: "bg-[#F5EFE6] dark:bg-[#2A231C]",
        textColor: "text-[#4A3E35] dark:text-[#EAE0D5]",
        borderColor: "border-[#DFD2C0] dark:border-[#3E342B]",
      };
  }
}

export function CategoryStrip({ activeCategory, onSelectCategory }: CategoryStripProps) {
  const [categories, setCategories] = useState<DisplayCategory[]>(() => {
    return [
      {
        id: "all",
        name: "All Items",
        icon: "✦",
        tagline: "Explore complete Al-Nur modest collections",
        bgColor: "bg-amber-100/70 dark:bg-amber-950/40",
        textColor: "text-amber-900 dark:text-amber-200",
        borderColor: "border-amber-300 dark:border-amber-800",
      },
      ...DEFAULT_SERVER_CATEGORIES.map(mapServerCategoryToDisplay),
    ];
  });

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const serverCats = await fetchServerCategories();
        if (!isMounted || !serverCats || serverCats.length === 0) return;

        const allPill: DisplayCategory = {
          id: "all",
          name: "All Items",
          icon: "✦",
          tagline: "Explore complete Al-Nur modest collections",
          bgColor: "bg-amber-100/70 dark:bg-amber-950/40",
          textColor: "text-amber-900 dark:text-amber-200",
          borderColor: "border-amber-300 dark:border-amber-800",
        };

        const mapped = serverCats.map(mapServerCategoryToDisplay);
        setCategories([allPill, ...mapped]);
      } catch (e) {
        console.warn("[CategoryStrip] Failed to load server categories:", e);
      }
    }

    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

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
              title={c.tagline || c.name}
              className="group flex flex-col items-center gap-2 shrink-0 focus:outline-none"
            >
              <div
                className={`relative h-16 w-16 sm:h-18 sm:w-18 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${c.bgColor} ${c.textColor} ${c.borderColor} border ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-md"
                    : "hover:scale-105 hover:shadow-sm"
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
