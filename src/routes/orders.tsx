import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCw,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { getSavedOrders, StoreOrder } from "@/lib/orders";
import { Nav, Footer } from "@/components/SiteChrome";
import { GuestPromptModal } from "@/components/GuestPromptModal";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const { isGuest, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<StoreOrder[]>(getSavedOrders);
  const [activeTab, setActiveTab] = useState<"all" | "in_transit" | "processing" | "delivered">(
    "all",
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>("ALN-84920");

  // Guest restriction prompt
  const [guestPromptOpen, setGuestPromptOpen] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setOrders(getSavedOrders());
      setIsRefreshing(false);
      toast.success("Order status refreshed from Al-Nur Cloud! 🔄");
    }, 600);
  };

  const filteredOrders = orders.filter((o) => {
    if (activeTab === "all") return true;
    return o.status === activeTab;
  });

  const getStatusBadge = (status: StoreOrder["status"]) => {
    switch (status) {
      case "in_transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
            <Truck className="h-3 w-3 animate-pulse" />
            <span>In Transit</span>
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Clock className="h-3 w-3" />
            <span>Tailoring / Processing</span>
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" />
            <span>Delivered</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-primary/20">
      <Nav />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-full border border-border bg-card hover:bg-muted/40 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                My Modesty Orders
              </h1>
              <p className="text-xs text-muted-foreground">
                Track your tailored abayas, thobes, and couture shipments live
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted/40 text-xs font-semibold text-foreground transition-all shadow-sm active:scale-95 disabled:opacity-60"
            title="Refresh order status"
          >
            <RotateCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Guest Warning Pill if guest */}
        {isGuest && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Package className="h-5 w-5 text-amber-500 shrink-0" />
              <p className="text-xs text-foreground">
                Browsing in Guest Mode. Sign in to link your live orders with your account.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGuestPromptOpen(true)}
              className="text-xs font-bold text-primary hover:underline shrink-0"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {[
            { id: "all", label: "All Orders" },
            { id: "in_transit", label: "In Transit" },
            { id: "processing", label: "Tailoring" },
            { id: "delivered", label: "Delivered" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id as "all" | "in_transit" | "processing" | "delivered")
              }
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm scale-102"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-md transition-all hover:border-primary/40"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-extrabold text-foreground font-display tracking-wide">
                          {order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Placed on {order.orderDate} • Waybill:{" "}
                        <span className="font-mono text-primary font-semibold">
                          {order.trackingNumber}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground block">Order Total</span>
                        <span className="text-base font-extrabold text-primary font-display">
                          ₦{order.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="p-1.5 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
                        title={isExpanded ? "Collapse" : "View tracking details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="py-4 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-14 w-14 rounded-xl object-cover border border-border/60 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground">
                            {item.category} {item.size ? `• Size ${item.size}` : ""}{" "}
                            {item.color ? `• ${item.color}` : ""}
                          </p>
                          <p className="text-xs font-semibold text-primary mt-0.5">
                            {item.quantity}x ₦{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Live Tracking Timeline & Courier Info */}
                  {isExpanded && (
                    <div className="mt-2 pt-4 border-t border-border/60 space-y-5 animate-in fade-in duration-200">
                      {/* Courier Contact Card (if available) */}
                      {order.courierName && (
                        <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                              <Truck className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground">
                                Courier: {order.courierName}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                Active logistics rider in your delivery zone
                              </p>
                            </div>
                          </div>

                          {order.courierPhone && (
                            <a
                              href={`tel:${order.courierPhone}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call</span>
                            </a>
                          )}
                        </div>
                      )}

                      {/* Delivery Address */}
                      <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-foreground">Delivery Destination: </span>
                          <span>{order.deliveryAddress}</span>
                          <span className="block text-[10px] text-primary font-medium mt-0.5">
                            Est. Arrival: {order.estimatedDelivery}
                          </span>
                        </div>
                      </div>

                      {/* Stepper Timeline */}
                      <div>
                        <h4 className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">
                          Live Order Milestones
                        </h4>
                        <div className="space-y-4 pl-2 border-l-2 border-primary/30 ml-2">
                          {order.timeline.map((step, sIdx) => (
                            <div key={sIdx} className="relative pl-5">
                              {/* Step Dot */}
                              <div
                                className={`absolute -left-[9px] top-0.5 h-4 w-4 rounded-full border-2 transition-all ${
                                  step.isCompleted
                                    ? "bg-primary border-primary text-primary-foreground flex items-center justify-center"
                                    : step.isCurrent
                                      ? "bg-amber-500 border-amber-500 animate-ping"
                                      : "bg-card border-muted-foreground/40"
                                }`}
                              >
                                {step.isCompleted && <CheckCircle2 className="h-3 w-3" />}
                              </div>

                              <div>
                                <div className="flex items-baseline justify-between gap-2">
                                  <span
                                    className={`text-xs font-bold ${
                                      step.isCompleted || step.isCurrent
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {step.title}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {step.date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {step.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-bold text-foreground">No orders in this category</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Your past and active modest fashion orders will appear here.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <GuestPromptModal
        isOpen={guestPromptOpen}
        onClose={() => setGuestPromptOpen(false)}
        title="Modesty Orders"
        message="Sign in or create an account to view and track your modest fashion orders."
      />
    </div>
  );
}
