import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Nav, Footer } from "@/components/SiteChrome";
import { WelcomeBanner } from "@/components/WelcomeBanner";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryStrip } from "@/components/CategoryStrip";
import { AiAssistantCard } from "@/components/AiAssistantCard";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { collections } from "@/lib/collections";
import { CartSheet } from "@/components/CartSheet";

export const Route = createFileRoute("/")({
  component: Index,
});

function CollectionsShowcase() {
  return (
    <section id="collections" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-card/20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-bold">
              Collections
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold max-w-xl text-foreground">
              Five quiet expressions of <span className="italic text-gold-grad">grace</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Every piece chosen by hand, every order packed with care. Tap any collection to explore
            our signature catalogue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[280px]">
          {collections.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl border border-primary/25 shadow-lg cursor-pointer ${
                i === 0 ? "md:col-span-3 md:row-span-2" : ""
              } ${i === 1 ? "md:col-span-3" : ""} ${i === 2 ? "md:col-span-2" : ""} ${
                i === 3 ? "md:col-span-2" : ""
              } ${i === 4 ? "md:col-span-2" : ""}`}
            >
              <Link
                to="/collections/"
                params={{ slug: c.slug }}
                className="absolute inset-0 z-10"
              />
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-1.5">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1 text-foreground">
                  {c.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">{c.tagline}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Collection</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 arabesque opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
          Our Heritage
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight">
          With our curated pieces we elevate <br />
          <span className="italic text-gold-grad">your special occasions</span>
        </h2>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From modest abayas and pure Medina silks to royal Moroccan jalabias and heirloom gold
          bridal sets, every piece at Al-Nur is crafted to make you shine with dignity, modesty, and
          confidence.
        </p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Wedding & Nikkah",
              body: "Bridal sets and embellished abayas curated for the most sacred day.",
            },
            {
              title: "Ramadan & Eid Celebrations",
              body: "Festive jalabias and pure silk hijabs wrapped with heartfelt intention.",
            },
            {
              title: "Everyday Modesty",
              body: "Featherlight fabrics and timeless silhouettes woven into your daily life.",
            },
          ].map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-3xl border border-primary/20 bg-card/60 p-6 sm:p-8 text-left shadow-sm"
            >
              <div className="font-display text-4xl font-bold text-gold-grad mb-3">0{i + 1}</div>
              <h3 className="font-display text-xl font-bold mb-2 text-foreground">{it.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    "Hand-picked premium fabrics from Dubai & Medina",
    "Free delivery within Lagos on eligible orders",
    "Guaranteed nationwide shipping across all 36 states",
    "WhatsApp concierge ordering & instant size guidance",
    "Dedicated Nikkah & Bridal jewellery specialists",
    "100% authentic, modest, and ethically sourced",
  ];

  return (
    <section id="why" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-card/30">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3">
            Why Al-Nur
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Because every woman <br />
            <span className="italic text-gold-grad">deserves to shine with grace.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
            We don't merely offer fashion — we curate moments of quiet luxury, delivered to your
            door with warmth, care, and attention to every stitch.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-start gap-3 rounded-2xl bg-card border border-border/80 p-4 shadow-sm"
            >
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                ✓
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{it}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-[#3A1208] via-[#4A1A0C] to-[#200B04] p-8 sm:p-14 text-center shadow-2xl text-white">
          <div className="absolute inset-0 arabesque opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-300 font-bold mb-3">
              Contact Our Boutique
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white">
              Begin your <span className="italic text-amber-300">Al-Nur</span> moment
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-amber-100/80 max-w-lg mx-auto leading-relaxed">
              We deliver nationwide. Reach our concierge anytime — we would love to assist you with
              custom orders, bridal sizing, or styling advice.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3.5 justify-center">
              <a
                href="https://wa.me/2349166261575"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold-grad px-8 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-gold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>WhatsApp Concierge · 0916 626 1575</span>
              </a>
              <a
                href="https://www.tiktok.com/@alnurstore2"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-300/40 text-amber-200 px-6 py-3.5 text-xs sm:text-sm font-semibold hover:bg-amber-300/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>TikTok · @alnurstore2</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);

  const handleSelectCategorySection = () => {
    const el = document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenAi = () => {
    const aiBtn = document.querySelector("#featured-products");
    if (aiBtn) aiBtn.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-16 md:pb-0 font-body transition-colors">
      <Nav />
      <WelcomeBanner />
      <HeroCarousel />
      <CategoryStrip
        activeCategory={activeCategory}
        onSelectCategory={(id) => {
          setActiveCategory(id);
          const el = document.getElementById("featured-products");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <AiAssistantCard />
      <FeaturedProducts activeCategory={activeCategory} />
      <CollectionsShowcase />
      <Story />
      <Why />
      <Contact />
      <Footer />

      {/* Mobile Bottom Navigation matching Flutter App */}
      <MobileBottomNav
        onOpenCart={() => setCartOpen(true)}
        onOpenAi={handleOpenAi}
        onSelectCategorySection={handleSelectCategorySection}
      />

      <CartSheet open={cartOpen} setOpen={setCartOpen} />
    </main>
  );
}
