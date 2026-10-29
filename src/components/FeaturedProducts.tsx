import React, { useEffect, useState } from "react";
import { Heart, Star, ShoppingBag, ArrowUpRight, Loader2, RefreshCw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  fetchServerProducts,
  mapServerProductToProduct,
  toggleServerFavorite,
  DEFAULT_SERVER_CATEGORIES,
} from "@/lib/api";
import { Product, waLink } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "sonner";

interface FeaturedProductsProps {
  activeCategory: string;
}

export function FeaturedProducts({ activeCategory }: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const serverProducts = await fetchServerProducts(
        activeCategory === "all" ? undefined : activeCategory,
      );
      const mapped = serverProducts.map(mapServerProductToProduct);
      setProducts(mapped);
    } catch (err) {
      console.error("[FeaturedProducts] Error loading from server:", err);
      setError("Unable to load collections from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [activeCategory]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`, {
      description: `Price: ${product.price} · Click Cart to checkout`,
    });
  };

  const handleToggleFavorite = (product: Product) => {
    toggleFavorite(product);
    const numId = parseInt(product.id, 10);
    if (!isNaN(numId)) {
      toggleServerFavorite(numId);
    }
  };

  const currentCat = DEFAULT_SERVER_CATEGORIES.find(
    (c) => c.categoryId.toLowerCase() === activeCategory.toLowerCase(),
  );

  const title =
    activeCategory === "all"
      ? "Featured Products"
      : `${currentCat?.name || activeCategory} Collection`;

  return (
    <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-bold">
            Curated For You · Live from Server
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-1 capitalize">
            {title}
          </h2>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          {loading ? (
            <span className="inline-flex items-center gap-1.5 text-primary">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Syncing from server...
            </span>
          ) : (
            <span>Showing {products.length} luxury pieces</span>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`skel-${i}`}
              className="rounded-2xl sm:rounded-3xl border border-border/60 bg-card overflow-hidden p-3 sm:p-4 animate-pulse flex flex-col justify-between"
            >
              <div className="aspect-[4/5] bg-muted/60 rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/60 rounded w-3/4" />
                <div className="h-3 bg-muted/40 rounded w-1/2" />
                <div className="h-5 bg-muted/60 rounded w-1/3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-center my-6">
          <p className="text-destructive font-semibold mb-3">{error}</p>
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry Sync
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center my-6">
          <p className="text-muted-foreground text-sm">
            No items found in this collection on the server.
          </p>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => {
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
                    onClick={() => handleToggleFavorite(p)}
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
                      <span className="text-xs font-bold text-foreground">
                        {p.rating.toFixed(1)}
                      </span>
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
                        className="rounded-xl bg-primary text-primary-foreground py-2 text-xs font-bold hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                      <a
                        href={waLink(
                          `Assalamu Alaikum Al-Nur, I would like to order "${p.name}" (${p.price})`,
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
      )}
    </section>
  );
}
