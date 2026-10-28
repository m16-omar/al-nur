import React, { useState } from "react";
import { Search, Mic, X, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { featuredProducts, Product } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { addToCart } = useCart();

  const handleVoiceSearch = () => {
    setIsListening(true);
    toast.info("Listening... (Simulating Voice Search)");
    setTimeout(() => {
      setQuery("Dubai Abaya");
      setIsListening(false);
      toast.success("Found results for 'Dubai Abaya'!");
    }, 1500);
  };

  const results = query.trim()
    ? featuredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.blurb.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : featuredProducts.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-card border border-primary/30 shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Search Input */}
        <div className="relative flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground absolute left-4 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for abayas, hijabs, jalabias, perfumes..."
            className="w-full rounded-full border border-primary/30 bg-background pl-11 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              onClick={handleVoiceSearch}
              className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
              title="Voice Search"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-muted-foreground shrink-0">Popular:</span>
          {["Abayas", "Silk Hijabs", "Bridal Set", "Royal Oud", "Jalabias"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1 hover:border-primary/40 hover:text-primary transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-[380px] overflow-y-auto space-y-2.5 divide-y divide-border/60">
          {results.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No modest pieces found for "{query}". Try another search or ask the AI Stylist!
            </div>
          ) : (
            results.map((p) => (
              <div key={p.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-12 w-12 rounded-xl object-cover shrink-0 border border-border/60"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold truncate hover:text-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs font-bold text-primary">{p.price}</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    addToCart(p);
                    toast.success(`Added ${p.name} to cart!`);
                  }}
                  className="shrink-0 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
