import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { Nav, Footer } from "@/components/SiteChrome";
import { collections, WHATSAPP } from "@/lib/collections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden bg-hero arabesque pt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-ember-grad opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gold-grad opacity-20 blur-3xl" />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-2 md:items-center md:py-20">
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            New Collection · 1446 AH
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-display text-6xl font-semibold leading-[0.95] sm:text-7xl md:text-8xl">
            <span className="text-gold-grad">Al-Nur</span>
            <span className="block text-foreground/95 italic font-light text-4xl sm:text-5xl md:text-6xl mt-2">Jewelries & Veils</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 max-w-md font-display italic text-xl text-muted-foreground">
            Where elegance meets modesty — a quiet luxury for every woman who carries light.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4">
            <a href="#collections" className="rounded-full bg-gold-grad px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold hover:shadow-glow transition-all hover:scale-[1.02]">
              Explore Collections
            </a>
            <a href="https://wa.me/2349166261575" target="_blank" rel="noreferrer"
               className="rounded-full border border-primary/40 px-7 py-3.5 text-sm font-medium hover:bg-primary/10 transition-colors">
              Order on WhatsApp →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
            <div><div className="font-display text-3xl text-primary">5+</div>Curated lines</div>
            <div className="h-10 w-px bg-border" />
            <div><div className="font-display text-3xl text-primary">36</div>States delivered</div>
            <div className="h-10 w-px bg-border" />
            <div><div className="font-display text-3xl text-primary">100%</div>Hand-picked</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
          className="order-1 md:order-2 relative">
          <div className="absolute -inset-4 bg-gold-grad rounded-[2rem] blur-2xl opacity-30" />
          <div className="relative overflow-hidden rounded-[2rem] gold-border shadow-deep">
            <img src={heroPortrait} alt="Elegant woman wearing veil and gold jewelry" width={1024} height={1024}
                 className="w-full h-auto object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary">Featured</div>
                <div className="font-display text-xl">The Aisha Set</div>
              </div>
              <button className="rounded-full bg-background/80 backdrop-blur p-3 hover:bg-primary hover:text-primary-foreground transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block float">
            <div className="rounded-2xl gold-border bg-card p-4 shadow-deep">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gold-grad flex items-center justify-center text-primary-foreground">★</div>
                <div>
                  <div className="text-xs text-muted-foreground">Bridal Special</div>
                  <div className="text-sm font-medium">Nikkah Ready</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/40 backdrop-blur-sm py-4 overflow-hidden">
        <div className="flex gap-12 animate-[shimmer_30s_linear_infinite] whitespace-nowrap text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12">
              <span>✦ Perfumes</span><span>✦ Veils</span><span>✦ Jewelries</span><span>✦ Bags</span>
              <span>✦ Slippers</span><span>✦ Free delivery in Lagos</span><span>✦ Nationwide shipping</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">What we sell</div>
            <h2 className="font-display text-5xl md:text-6xl font-semibold max-w-xl">
              Five quiet expressions of <span className="italic text-gold-grad">grace</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Every piece chosen by hand, every order packed with care. Tap a collection to begin a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[280px]">
          {collections.map((c, i) => (
            <motion.a
              key={c.name}
              href={`/collections/${c.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl gold-border shadow-deep cursor-pointer
                ${i === 0 ? "md:col-span-3 md:row-span-2" : ""}
                ${i === 1 ? "md:col-span-3" : ""}
                ${i === 2 ? "md:col-span-2" : ""}
                ${i === 3 ? "md:col-span-2" : ""}
                ${i === 4 ? "md:col-span-2" : ""}
              `}>
              <img src={c.img} alt={c.name} loading="lazy"
                   className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">0{i + 1}</div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold mb-1">{c.name}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{c.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 arabesque opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Our story</div>
        <h2 className="font-display text-5xl md:text-7xl font-semibold leading-tight">
          With our gold sets we elevate <br />
          <span className="italic text-gold-grad">your special occasions</span>
        </h2>
        <p className="mt-10 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From elegant veils that embrace modest fashion to perfumes that whisper of tradition,
          every piece at Al-Nur is crafted to make you shine with confidence and dignity.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Wedding & Nikkah", body: "Bridal sets curated for the most sacred day." },
            { title: "Celebration & Gifts", body: "Heartfelt gifts wrapped with intention." },
            { title: "Everyday Elegance", body: "A quiet touch of luxury, woven into daily life." },
          ].map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl gold-border p-8 text-left">
              <div className="font-display text-5xl text-gold-grad mb-4">0{i + 1}</div>
              <h3 className="font-display text-2xl mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    "Hand-picked premium pieces",
    "Free delivery within Lagos",
    "Nationwide shipping in 36 states",
    "WhatsApp concierge ordering",
    "Bridal & Nikkah specialists",
    "Authentic, ethically sourced",
  ];
  return (
    <section id="why" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Why choose us</div>
          <h2 className="font-display text-5xl md:text-6xl font-semibold leading-tight">
            Because every woman <br />
            <span className="italic text-gold-grad">deserves to shine.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            We don't sell products — we curate small ceremonies of elegance, delivered to your door with the warmth of a friend.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-xl bg-card/50 border border-border p-4">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-grad text-primary-foreground text-xs">✓</span>
              <span className="text-sm">{it}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] gold-border bg-ember-grad p-10 md:p-16 text-center shadow-deep">
          <div className="absolute inset-0 arabesque opacity-20" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-cream/80 mb-4">Contact us</div>
            <h2 className="font-display text-5xl md:text-7xl font-semibold text-cream">
              Begin your <span className="italic">Al-Nur</span> moment
            </h2>
            <p className="mt-6 text-cream/90 max-w-xl mx-auto">
              We deliver nationwide. Reach us anytime — we'd love to help you find the perfect piece.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/2349166261575" target="_blank" rel="noreferrer"
                 className="group rounded-full bg-cream text-background px-8 py-4 font-medium hover:bg-gold-grad transition-colors flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.3 4.7 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.8-3.1-.2-.3C4 14.7 3.6 13.4 3.6 12 3.6 7.4 7.4 3.6 12 3.6S20.4 7.4 20.4 12 16.6 20 12 20z"/></svg>
                <span>WhatsApp · 0916 626 1575</span>
              </a>
              <a href="https://www.tiktok.com/@alnurstore2" target="_blank" rel="noreferrer"
                 className="rounded-full border border-cream/40 text-cream px-8 py-4 font-medium hover:bg-cream/10 transition-colors flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 6.3a4.8 4.8 0 01-3.8-2.1V14a5.4 5.4 0 11-5.4-5.4v2.6a2.8 2.8 0 102.8 2.8V2h2.6a4.8 4.8 0 003.8 4.3z"/></svg>
                <span>TikTok · @alnurstore2</span>
              </a>
            </div>

            <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-cream/30 bg-cream/10 px-5 py-2 text-sm text-cream">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              We deliver nationwide
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Collections />
      <Story />
      <Why />
      <Contact />
      <Footer />
    </main>
  );
}
