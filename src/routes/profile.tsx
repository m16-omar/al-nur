import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  User,
  Settings,
  ShoppingBag,
  Package,
  Heart,
  Award,
  MapPin,
  CreditCard,
  Ruler,
  Bell,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { getSavedAddresses, getSavedOrders } from "@/lib/orders";
import { Nav, Footer } from "@/components/SiteChrome";
import { GuestPromptModal } from "@/components/GuestPromptModal";
import { WishlistModal } from "@/components/WishlistModal";
import { SizeGuideModal } from "@/components/SizeGuideModal";
import { SelarGatewayModal } from "@/components/SelarGatewayModal";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isGuest, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [selarModalOpen, setSelarModalOpen] = useState(false);
  const [guestPromptOpen, setGuestPromptOpen] = useState(false);
  const [guestPromptContent, setGuestPromptContent] = useState({ title: "", message: "" });

  const [savedSize, setSavedSize] = useState<string | null>(() => {
    try {
      return localStorage.getItem("alnur_saved_abaya_size");
    } catch {
      return null;
    }
  });

  const ordersCount = isGuest ? 0 : getSavedOrders().length;
  const addresses = isGuest ? [] : getSavedAddresses();

  const triggerGuestRestriction = (title: string, message: string) => {
    setGuestPromptContent({ title, message });
    setGuestPromptOpen(true);
  };

  const handleSettingsClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Account Settings",
        "Please sign in or create an account to access and manage your Al-Nur account settings.",
      );
    } else {
      toast.info("Account settings: Preferences synchronized.");
    }
  };

  const handleFavoritesClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Modesty Wishlist",
        "Sign in or create an account to view and sync your favorited modest couture across all your devices.",
      );
    } else {
      setWishlistModalOpen(true);
    }
  };

  const handleCartClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Sign In Required to Checkout",
        "Assalamu Alaikum! Your modest garments are securely saved. Please sign in or create an account to proceed to checkout and finalize your order.",
      );
    } else {
      navigate({ to: "/checkout" });
    }
  };

  const handleOrdersClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Modesty Orders",
        "Sign in or create an account to view and track your modest fashion orders.",
      );
    } else {
      navigate({ to: "/orders" });
    }
  };

  const handlePaymentClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Payment & Cards",
        "Sign in or create an account to securely save and manage your payment methods.",
      );
    } else {
      setSelarModalOpen(true);
    }
  };

  const handleAddressClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Delivery Addresses",
        "Please sign in to save your preferred delivery addresses for fast 1-tap checkout.",
      );
    } else {
      toast.info(`Managing ${addresses.length} delivery addresses.`);
    }
  };

  const handlePersonalInfoClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Personal Information",
        "Please sign in or create an account to save your name, contact phone, and custom modesty sizing.",
      );
    } else {
      toast.info(`Signed in as ${user?.name} (${user?.email})`);
    }
  };

  const handleLoyaltyPointsClick = () => {
    if (isGuest) {
      triggerGuestRestriction(
        "Al-Nur Loyalty Points",
        "Join Al-Nur Loyalty! Sign in to earn modesty points on every modest wear purchase.",
      );
    } else {
      toast.success("You have 3,450 Al-Nur Points (₦3,450 discount on next order!)");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-primary/20">
      <Nav />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* Top Header Card */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-xl mb-6 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Profile & Modesty Settings
            </span>
            <button
              type="button"
              onClick={handleSettingsClick}
              className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-primary/20 border-2 border-primary/50 text-primary flex items-center justify-center text-2xl font-bold shadow-md">
                {isAuthenticated && user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <User className="h-9 w-9 text-primary" />
                )}
              </div>
              {isAuthenticated && (
                <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              )}
            </div>

            {/* User Meta */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground font-display">
                {isAuthenticated && user?.name ? user.name : "Guest Shopper"}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isAuthenticated && user?.email
                  ? user.email
                  : "Sign in to sync your bag, orders & modesty rewards"}
              </p>

              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
                {isAuthenticated ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-[11px] font-bold text-primary">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Verified Modesty Member</span>
                  </span>
                ) : (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-grad text-primary-foreground text-xs font-bold shadow-gold hover:shadow-glow transition-all"
                  >
                    <span>Sign In to Account</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Tiles matching Flutter ProfileView */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {/* Cart Metric */}
          <button
            type="button"
            onClick={handleCartClick}
            className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 text-center transition-all shadow-sm hover:scale-102 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-foreground font-display block">
              {totalItems}
            </span>
            <span className="text-[11px] text-muted-foreground">Shopping Bag</span>
          </button>

          {/* Orders Metric */}
          <button
            type="button"
            onClick={handleOrdersClick}
            className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 text-center transition-all shadow-sm hover:scale-102 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-2">
              <Package className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-foreground font-display block">
              {ordersCount}
            </span>
            <span className="text-[11px] text-muted-foreground">Orders</span>
          </button>

          {/* Favorites Metric */}
          <button
            type="button"
            onClick={handleFavoritesClick}
            className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 text-center transition-all shadow-sm hover:scale-102 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-2">
              <Heart className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-foreground font-display block">
              {isGuest ? "0" : wishlist.length}
            </span>
            <span className="text-[11px] text-muted-foreground">Favorites</span>
          </button>

          {/* Loyalty Metric */}
          <button
            type="button"
            onClick={handleLoyaltyPointsClick}
            className="p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/40 text-center transition-all shadow-sm hover:scale-102 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-2">
              <Award className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-foreground font-display block">
              {isGuest ? "0" : "3,450"}
            </span>
            <span className="text-[11px] text-muted-foreground">Al-Nur Points</span>
          </button>
        </div>

        {/* Section 1: Account & Details */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Account & Address
          </h3>
          <div className="rounded-3xl border border-border/80 bg-card divide-y divide-border/60 overflow-hidden shadow-sm">
            {/* Personal Info */}
            <button
              type="button"
              onClick={handlePersonalInfoClick}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Personal Information
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {isGuest
                      ? "Sign in to save your personal details"
                      : user?.name || "Name and details"}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Delivery Addresses */}
            <button
              type="button"
              onClick={handleAddressClick}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Saved Delivery Addresses
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {isGuest
                      ? "Sign in to save delivery addresses"
                      : `${addresses.length} saved addresses (Default: Lekki Phase 1, Lagos)`}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Payment & Cards */}
            <button
              type="button"
              onClick={handlePaymentClick}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">Payment & Cards</p>
                  <p className="text-[11px] text-muted-foreground">
                    {isGuest ? "Sign in to manage payment methods" : "Mastercard & Selar Gateway"}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Section 2: Modesty Fit & Preferences */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Modesty Fit & Preferences
          </h3>
          <div className="rounded-3xl border border-border/80 bg-card divide-y divide-border/60 overflow-hidden shadow-sm">
            {/* Abaya Size Profile */}
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Ruler className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground">
                    Abaya & Thobe Size Profile
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {savedSize
                      ? `Saved Fit: Size ${savedSize} (Floor-Grazing)`
                      : "Calculate & save your custom floor-grazing length"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {savedSize && (
                  <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25">
                    Size {savedSize}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          </div>
        </div>

        {/* Store Admin & Fulfillment Portal */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
            Store Management
          </h3>
          <div className="rounded-3xl border border-border/80 bg-card divide-y divide-border/60 overflow-hidden shadow-sm">
            <Link
              to="/admin"
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-2">
                    <span>Admin Orders & Fulfillment</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/25">
                      Live
                    </span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Manage customer orders, update dispatch statuses & print waybills
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Developer controls: strictly restricted to non-guest */}
        {isAuthenticated && !isGuest && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
              Account Controls
            </h3>
            <div className="rounded-3xl border border-border/80 bg-card p-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  logout();
                  toast.info("Signed out successfully");
                  navigate({ to: "/" });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out of Al-Nur Store</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Wishlist Modal */}
      <WishlistModal isOpen={wishlistModalOpen} onClose={() => setWishlistModalOpen(false)} />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={(s) => setSavedSize(s)}
        onGuestRestricted={triggerGuestRestriction}
      />

      {/* Selar Gateway Modal */}
      <SelarGatewayModal isOpen={selarModalOpen} onClose={() => setSelarModalOpen(false)} />

      {/* Guest Prompt Modal */}
      <GuestPromptModal
        isOpen={guestPromptOpen}
        onClose={() => setGuestPromptOpen(false)}
        title={guestPromptContent.title}
        message={guestPromptContent.message}
      />
    </div>
  );
}
