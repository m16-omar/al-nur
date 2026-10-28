import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { WHATSAPP } from "@/lib/collections";

const slides = [
  {
    tag: "HAUTE MODESTY",
    title: "Luxury Abayas for Every Occasion",
    subtitle: "Modest. Stylish. Timeless. Hand-tailored Dubai crepe with golden wrist embroidery.",
    cta: "Shop Abayas →",
    link: "#featured-products",
    img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    badge: "1446 AH Collection",
  },
  {
    tag: "RAMADAN & EID",
    title: "Pure Medina Silk Hijabs",
    subtitle:
      "Breathable. Graceful. Pure. Featherlight silk in soft tones designed to drape like poetry.",
    cta: "Explore Hijabs →",
    link: "#featured-products",
    img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
    badge: "Best Seller",
  },
  {
    tag: "ARTISANAL LUXURY",
    title: "Royal Moroccan Jalabias & Veils",
    subtitle: "Handmade Sfifa embroidery on premium velvet with artisanal gold finishes.",
    cta: "View Jalabias →",
    link: "#featured-products",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
    badge: "Exclusive Edition",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-primary/20 bg-card shadow-xl min-h-[360px] sm:min-h-[460px] md:min-h-[500px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Rich gradient overlay for text readability matching mobile app */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/40 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 sm:hidden" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl">
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md px-3.5 py-1 text-xs uppercase tracking-[0.25em] text-primary font-bold"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            {slide.tag} · {slide.badge}
          </motion.div>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-foreground tracking-tight"
          >
            {slide.title}
          </motion.h1>

          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed"
          >
            {slide.subtitle}
          </motion.p>

          <motion.div
            key={`actions-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a
              href={slide.link}
              className="rounded-full bg-gold-grad px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary/40 bg-card/60 backdrop-blur-sm px-6 py-3.5 text-xs sm:text-sm font-semibold hover:bg-primary/10 transition-colors"
            >
              Order on WhatsApp →
            </a>
          </motion.div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-5 right-6 sm:right-10 z-20 flex items-center gap-3">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="h-9 w-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current
                    ? "w-7 bg-primary"
                    : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
            className="h-9 w-9 rounded-full border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
