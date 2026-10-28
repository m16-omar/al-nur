import React from "react";
import { X, ShoppingBag, Trash2, Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { Product } from "@/lib/collections";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlist, removeFromWishlist, clearWishlist, moveAllToCart } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const handleMoveToBag = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success(`Moved "${product.name}" to your Shopping Bag!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-card border border-border/80 rounded-3xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Modesty Wishlist</h2>
              <p className="text-xs text-muted-foreground">
                {wishlist.length} {wishlist.length === 1 ? "garment" : "garments"} favorited
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-muted/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 divide-y divide-border/40">
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                <Link
                  to="/product/$id"
                  params={{ id: item.id }}
                  onClick={onClose}
                  className="shrink-0"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover border border-border/60"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: item.id }}
                    onClick={onClose}
                    className="text-xs sm:text-sm font-bold text-foreground truncate hover:text-primary transition-colors block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-[11px] text-muted-foreground capitalize">{item.category}</p>
                  <p className="text-xs font-extrabold text-primary mt-0.5">{item.price}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleMoveToBag(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition-all shadow-sm active:scale-95"
                    title="Move to Shopping Bag"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Move to Bag</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded-full hover:bg-destructive/10 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Luxury Empty State */
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3 border border-rose-500/20">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Your Modesty Wishlist is Empty
              </h3>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Tap the heart on any luxury abaya, hijab, or perfume to curate your personal modest
                fashion edit.
              </p>
              <button
                onClick={onClose}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-grad px-5 py-2 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow transition-all"
              >
                <span>Explore Collections</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors font-medium"
            >
              Clear All
            </button>

            <button
              type="button"
              onClick={() => moveAllToCart(addToCart)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gold-grad px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow active:scale-95 transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add All to Bag</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
