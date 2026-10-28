import React from "react";
import { Home, LayoutGrid, Sparkles, ShoppingBag, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

interface MobileBottomNavProps {
  onOpenCart: () => void;
  onOpenAi: () => void;
  onSelectCategorySection: () => void;
}

export function MobileBottomNav({
  onOpenCart,
  onOpenAi,
  onSelectCategorySection,
}: MobileBottomNavProps) {
  const { totalItems } = useCart();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border/80 px-4 py-2 pb-safe shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        {/* Home */}
        <a
          href="#top"
          className="flex flex-col items-center gap-1 text-primary focus:outline-none p-1.5"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">Home</span>
        </a>

        {/* Categories */}
        <button
          onClick={onSelectCategorySection}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1.5"
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[10px] font-medium">Categories</span>
        </button>

        {/* Floating Center AI Assistant button matching mobile app */}
        <div className="-mt-7 flex flex-col items-center">
          <button
            onClick={onOpenAi}
            className="h-13 w-13 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-gold hover:scale-110 active:scale-95 transition-all border-2 border-background ring-2 ring-primary/40"
            title="AI Assistant"
          >
            <Sparkles className="h-6 w-6 animate-pulse text-amber-200" />
          </button>
          <span className="text-[10px] font-bold text-primary mt-1">AI Stylist</span>
        </div>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1.5"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
              {totalItems}
            </span>
          )}
          <span className="text-[10px] font-medium">Cart</span>
        </button>

        {/* Profile / Account */}
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1.5"
        >
          <div className="relative">
            <User className="h-5 w-5" />
            {isAuthenticated && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
            )}
          </div>
          <span className="text-[10px] font-medium">
            {isAuthenticated && user ? "Account" : "Sign In"}
          </span>
        </Link>
      </div>
    </div>
  );
}
