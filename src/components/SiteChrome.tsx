import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { WHATSAPP, collections } from "@/lib/collections";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/60 border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-gold-grad">
            Al-Nur
          </span>
          <span className="hidden sm:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Jewelries & Veils
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-foreground/80 hover:text-primary transition-colors"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
          >
            Home
          </Link>
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="text-sm text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {c.name}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold-grad px-5 py-2 text-sm font-medium text-primary-foreground shadow-gold hover:shadow-glow transition-shadow"
          >
            WhatsApp
          </a>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-foreground p-2" aria-label="Menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? <path d="M6 6L18 18M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm py-1">
            Home
          </Link>
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              onClick={() => setOpen(false)}
              className="text-sm py-1"
            >
              {c.name}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            className="rounded-full bg-gold-grad px-5 py-2 text-center text-sm font-medium text-primary-foreground mt-2"
          >
            Shop on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="font-display text-3xl text-gold-grad mb-2">Al-Nur</div>
        <div className="text-xs uppercase tracking-[0.3em] mb-6">Where elegance meets modesty</div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="hover:text-primary transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Al-Nur Jewelries & Veils. Crafted with care.</p>
      </div>
    </footer>
  );
}
