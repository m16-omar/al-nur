import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Search, Mic, Bell, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { WHATSAPP, collections } from "@/lib/collections";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { CartSheet } from "./CartSheet";
import { MosqueLogo } from "./MosqueLogo";
import { SearchModal } from "./SearchModal";
import { NotificationsModal } from "./NotificationsModal";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/85 border-b border-border/80 transition-colors">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5 gap-4">
          {/* Logo & Brand Identity matching mobile app HomeHeader */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <MosqueLogo size={42} />
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  Al-Nur
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
                  STORE
                </span>
              </div>
              <span className="text-[10px] tracking-wide text-muted-foreground font-medium hidden sm:block">
                Modest Fashion • Quality • You
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar matching the Flutter SearchBarWidget */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between rounded-full border border-border/80 bg-card/60 hover:bg-card px-4 py-2 cursor-pointer transition-all shadow-sm hover:border-primary/40 text-muted-foreground text-xs"
            >
              <div className="flex items-center gap-2.5 truncate">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">Search for abayas, hijabs, jalabias...</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchOpen(true);
                }}
                className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 shrink-0 ml-2"
                title="Voice Search"
              >
                <Mic className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications with unread badge */}
            <button
              onClick={() => setNotifOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors rounded-full hover:bg-muted/40"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors rounded-full hover:bg-muted/40"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            <ThemeToggle />

            {/* User Profile or Sign In */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-muted/40 transition-colors"
                  title={user.name}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/50 text-primary flex items-center justify-center text-xs font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-card border border-border p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-border/60">
                        <p className="text-xs font-bold text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {user.email || "Al-Nur Member"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                          toast.info("Signed out successfully");
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 rounded-xl transition-colors mt-1 cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 hover:bg-primary/15 px-3.5 py-1.5 text-xs font-semibold text-primary transition-all shadow-sm"
              >
                <User className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* WhatsApp CTA Button */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gold-grad px-4 sm:px-5 py-2 text-xs font-bold text-primary-foreground shadow-gold hover:shadow-glow hover:scale-105 active:scale-95 transition-all"
            >
              <span>WhatsApp</span>
            </a>

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted/40"
              aria-label="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 6L18 18M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-150">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm py-1 font-semibold text-primary">
              Home
            </Link>
            {collections.map((c) => (
              <Link
                key={c.slug}
                to="/collections/"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="text-sm py-1 text-muted-foreground hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gold-grad px-5 py-2.5 text-center text-xs font-bold text-primary-foreground mt-2 shadow-sm"
            >
              Order on WhatsApp
            </a>

            {/* Mobile Auth Actions */}
            <div className="pt-3 mt-1 border-t border-border/80">
              {isAuthenticated && user ? (
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">
                      Assalamu Alaikum, {user.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate max-w-[180px]">
                      {user.email || "Al-Nur Member"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setOpen(false);
                      toast.info("Signed out");
                    }}
                    className="text-xs font-semibold text-red-500 hover:underline p-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 px-3 rounded-xl border border-primary/40 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 px-3 rounded-xl bg-gold-grad text-primary-foreground text-xs font-bold shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartSheet open={cartOpen} setOpen={setCartOpen} />

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      {/* Notifications Modal */}
      {notifOpen && <NotificationsModal onClose={() => setNotifOpen(false)} />}
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-14 px-6 text-center text-sm text-muted-foreground bg-card/30 pb-24 md:pb-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <MosqueLogo size={36} />
          <span className="font-display text-2xl font-bold text-foreground">Al-Nur</span>
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-6">
          Modest Fashion • Quality • You
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-xs">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/"
              params={{ slug: c.slug }}
              className="hover:text-primary transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <div className="text-xs text-muted-foreground/80 max-w-md mx-auto leading-relaxed">
          <p>© {new Date().getFullYear()} Al-Nur Store. All rights reserved.</p>
          <p className="mt-1 text-[11px]">Fast nationwide delivery across all 36 states · Free delivery within Lagos.</p>
        </div>
      </div>
    </footer>
  );
}
