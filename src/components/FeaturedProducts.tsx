import React from "react";
import { Heart, Star, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { featuredProducts, Product, waLink } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";

interface FeaturedProductsProps {
  activeCategory: string;
}

export function FeaturedProducts({ activeCategory }: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`, {
      description: `Price: ${product.price} · Click Cart to checkout`,
    });
  };

  const filtered =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category === activeCategory);

  return (
    <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
            Curated For You
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1">
            Featured Products
          </h2>
        </div>
        <div className="text-xs text-muted-foreground">
          Showing {filtered.length} modest luxury pieces
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((p) => {
          const isFav = isFavorite(p.id);
          return (
            <div
              key={p.id}
              className="group relative flex flex-col rounded-2xl sm:rounded-3xl border border-border/80 bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted/40">
                <Link to="/product/$id" params={{ id: p.id }} className="block w-full h-full">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>

                {/* Popular Badge */}
                {p.isPopular && (
                  <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-primary-foreground shadow-sm">
                    Popular
                  </span>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(p)}
                  aria-label="Favorite"
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isFav ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 mb-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-foreground">{p.rating.toFixed(1)}</span>
                    <span className="text-[11px] text-muted-foreground">({p.reviewCount})</span>
                  </div>

                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="font-display text-base sm:text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {p.blurb}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-extrabold text-primary">
                      {p.price}
                    </span>
                    {p.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="rounded-xl bg-primary text-primary-foreground py-2 text-xs font-bold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </button>
                    <a
                      href={waLink(
                        `Assalamu Alaikum, I would like to order ${p.name} (${p.price})`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-primary/30 py-2 text-xs font-bold text-foreground hover:bg-primary/10 active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>WhatsApp</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
