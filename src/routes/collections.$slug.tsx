import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav, Footer } from "@/components/SiteChrome";
import { collections, getCollection, waLink, WHATSAPP } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }): import("@/lib/collections").Collection => {
    const c = getCollection(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Al-Nur Jewelries & Veils` },
          { name: "description", content: loaderData.intro },
          { property: "og:title", content: `${loaderData.name} — Al-Nur` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:image", content: loaderData.img },
        ]
      : [],
  }),
  component: CollectionPage,
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-40 pb-20 text-center px-6">
        <h1 className="font-display text-5xl text-gold-grad">Collection not found</h1>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-gold-grad px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Go home
        </Link>
      </div>
      <Footer />
    </main>
  ),
});

function CollectionPage() {
  const c = Route.useLoaderData() as import("@/lib/collections").Collection;
  const others = collections.filter((x) => x.slug !== c.slug);
  const { addToCart } = useCart();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-hero arabesque">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-gold-grad opacity-20 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Collection</div>
            <h1 className="font-display text-6xl md:text-7xl font-semibold leading-[0.95] text-gold-grad">
              {c.name}
            </h1>
            <p className="mt-6 font-display italic text-2xl text-foreground/90">{c.tagline}</p>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink(`Hi Al-Nur, I'd like to see your ${c.name} collection.`)}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold-grad px-7 py-3 text-sm font-medium text-primary-foreground shadow-gold hover:shadow-glow transition"
              >
                Inquire on WhatsApp
              </a>
              <Link
                to="/"
                className="rounded-full border border-primary/40 px-7 py-3 text-sm font-medium hover:bg-primary/10 transition"
              >
                ← All collections
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gold-grad rounded-[2rem] blur-2xl opacity-30" />
            <div className="relative overflow-hidden rounded-[2rem] gold-border shadow-deep aspect-square">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-semibold">
              Featured <span className="italic text-gold-grad">pieces</span>
            </h2>
            <span className="hidden md:block text-sm text-muted-foreground">
              {c.products.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="group rounded-3xl gold-border overflow-hidden shadow-deep flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Link to="/product/$id" params={{ id: p.id }} className="block w-full h-full">
                    <img
                      src={c.img}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>
                  <div className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-primary">
                    {p.price}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="font-display text-2xl mb-1 hover:text-primary transition-colors block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-sm text-muted-foreground flex-1">{p.blurb}</p>

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => addToCart(p)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold-grad px-5 py-2.5 text-sm font-medium text-primary-foreground hover:shadow-glow transition"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Bag
                    </button>
                    <a
                      href={waLink(
                        `Hi Al-Nur, I'm interested in "${p.name}" (${p.price}) from your ${c.name} collection.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition"
                      title="Inquire on WhatsApp"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 .9-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl gold-border bg-ember-grad p-10 text-center shadow-deep">
            <h3 className="font-display text-3xl md:text-4xl text-cream">
              Don't see what you want?
            </h3>
            <p className="mt-3 text-cream/90 max-w-xl mx-auto">
              Send us a message and we'll source it for you. Custom bridal & nikkah requests
              welcomed.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-cream text-background px-8 py-3 font-medium hover:opacity-90 transition"
            >
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Other collections */}
      <section className="py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Continue exploring
          </div>
          <h2 className="font-display text-4xl font-semibold mb-10">Other collections</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/collections/$slug"
                params={{ slug: o.slug }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl gold-border shadow-deep"
              >
                <img
                  src={o.img}
                  alt={o.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-display text-2xl">{o.name}</div>
                  <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition mt-1">
                    View →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
