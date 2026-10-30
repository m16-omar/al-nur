import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Printer,
  Phone,
  MessageCircle,
  MapPin,
  Navigation,
  Scissors,
  XCircle,
  PackageCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Nav, Footer } from "@/components/SiteChrome";

export const Route = createFileRoute("/admin")({
  component: AdminOrdersPage,
});

interface ServerpodStoreOrder {
  id?: number;
  orderRef: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  shippingAddress: string;
  totalAmount: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  idempotencyKey?: string;
  paymentReference?: string;
  itemsJson: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ParsedOrderItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
}

const SERVERPOD_API_URL = "https://alnur-store.api.serverpod.space";

function AdminOrdersPage() {
  const [orders, setOrders] = useState<ServerpodStoreOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "placed" | "processing" | "shipped" | "out_for_delivery" | "delivered" | "cancelled" | "paid" | "pending"
  >("all");
  const [selectedOrder, setSelectedOrder] = useState<ServerpodStoreOrder | null>(null);

  const fetchOrders = async (showToastNotice = false) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`${SERVERPOD_API_URL}/order/getOrders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminKey: "AlNur2026!" }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        if (showToastNotice) {
          toast.success(`Synced ${data.length} live orders from PostgreSQL database! ✨`);
        }
      } else {
        toast.error("Failed to fetch live orders from Serverpod");
      }
    } catch (err) {
      console.error("Failed to connect to orders API:", err);
      toast.error("Network error connecting to Serverpod API");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders(false);
  }, []);

  const parseItems = (itemsJson: string): ParsedOrderItem[] => {
    try {
      if (!itemsJson) return [];
      return JSON.parse(itemsJson);
    } catch {
      return [];
    }
  };

  const handleUpdateFulfillment = async (orderRef: string, newStatus: string) => {
    toast.loading(`Updating order #${orderRef} to ${newStatus.toUpperCase()}...`, { id: "status-toast" });
    try {
      await fetch(`${SERVERPOD_API_URL}/order/updateOrderStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderRef, fulfillmentStatus: newStatus }),
      });
    } catch (err) {
      console.warn("Notice updating order status:", err);
    }

    // Optimistic update
    setOrders((prev) =>
      prev.map((o) =>
        o.orderRef === orderRef ? { ...o, fulfillmentStatus: newStatus, updatedAt: new Date().toISOString() } : o
      )
    );
    if (selectedOrder && selectedOrder.orderRef === orderRef) {
      setSelectedOrder((prev) => (prev ? { ...prev, fulfillmentStatus: newStatus } : null));
    }
    toast.success(`Order #${orderRef} marked as ${newStatus.toUpperCase()}! 🚚`, { id: "status-toast" });
  };

  const handleUpdatePayment = async (orderRef: string, newStatus: string) => {
    toast.loading(`Updating payment for #${orderRef}...`, { id: "pay-toast" });
    try {
      await fetch(`${SERVERPOD_API_URL}/order/updatePaymentStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderRef, paymentStatus: newStatus }),
      });
    } catch (err) {
      console.warn("Notice updating payment status:", err);
    }

    setOrders((prev) =>
      prev.map((o) =>
        o.orderRef === orderRef ? { ...o, paymentStatus: newStatus, updatedAt: new Date().toISOString() } : o
      )
    );
    if (selectedOrder && selectedOrder.orderRef === orderRef) {
      setSelectedOrder((prev) => (prev ? { ...prev, paymentStatus: newStatus } : null));
    }
    toast.success(`Payment status set to ${newStatus.toUpperCase()}! 💳`, { id: "pay-toast" });
  };

  const normalizeStatus = (status?: string | null) => {
    if (!status) return "placed";
    const lower = status.toLowerCase().trim().replace(/ /g, "_");
    if (lower.includes("cancel")) return "cancelled";
    if (lower.includes("deliver") || lower === "completed" || lower === "fulfilled") return "delivered";
    if (lower.includes("out_for_delivery") || lower.includes("transit")) return "out_for_delivery";
    if (lower.includes("ship") || lower.includes("dispatch") || lower.includes("courier")) return "shipped";
    if (lower.includes("tailor") || lower.includes("process") || lower.includes("craft")) return "processing";
    if (lower.includes("place") || lower.includes("confirm")) return "placed";
    return "placed";
  };

  const filteredOrders = orders.filter((o) => {
    const fulfill = normalizeStatus(o.fulfillmentStatus);
    const pay = (o.paymentStatus || "pending").toLowerCase();
    if (activeTab === "placed" && fulfill !== "placed") return false;
    if (activeTab === "processing" && fulfill !== "processing") return false;
    if (activeTab === "shipped" && fulfill !== "shipped") return false;
    if (activeTab === "out_for_delivery" && fulfill !== "out_for_delivery") return false;
    if (activeTab === "delivered" && fulfill !== "delivered") return false;
    if (activeTab === "cancelled" && fulfill !== "cancelled") return false;
    if (activeTab === "paid" && pay !== "paid") return false;
    if (activeTab === "pending" && pay !== "pending") return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const ref = (o.orderRef || "").toLowerCase();
      const name = (o.customerName || "").toLowerCase();
      const email = (o.customerEmail || "").toLowerCase();
      const phone = (o.customerPhone || "").toLowerCase();
      const addr = (o.shippingAddress || "").toLowerCase();
      return (
        ref.includes(q) ||
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        addr.includes(q)
      );
    }
    return true;
  });

  const totalRevenue = orders
    .filter((o) => (o.paymentStatus || "").toLowerCase() === "paid")
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  const placedCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "placed"
  ).length;
  const processingCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "processing"
  ).length;
  const shippedCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "shipped"
  ).length;
  const outForDeliveryCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "out_for_delivery"
  ).length;
  const deliveredCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "delivered"
  ).length;
  const cancelledCount = orders.filter(
    (o) => normalizeStatus(o.fulfillmentStatus) === "cancelled"
  ).length;

  const printWaybillSlip = (order: ServerpodStoreOrder) => {
    const items = parseItems(order.itemsJson);
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) {
      alert("Please enable popups to print packing waybill.");
      return;
    }

    const itemsRows = items
      .map(
        (it) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #EBE4D8;font-weight:bold;">${it.name || "Artisanal Item"}</td>
          <td style="padding:10px;border-bottom:1px solid #EBE4D8;font-size:12px;color:#8F581B;">Size ${it.selectedSize || "Standard"} • ${it.selectedColor || "Default"}</td>
          <td style="padding:10px;border-bottom:1px solid #EBE4D8;text-align:center;">${it.quantity || 1}</td>
          <td style="padding:10px;border-bottom:1px solid #EBE4D8;text-align:right;font-family:monospace;">₦${(it.price || 0).toLocaleString()}</td>
          <td style="padding:10px;border-bottom:1px solid #EBE4D8;text-align:right;font-family:monospace;font-weight:bold;">₦${((it.quantity || 1) * (it.price || 0)).toLocaleString()}</td>
        </tr>
      `
      )
      .join("");

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Al-Nur Store Waybill #${order.orderRef}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #2E110A; background: #FCF8F1; }
          .header { border-bottom: 2px solid #C87A1E; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .title { font-size: 22px; font-weight: 800; color: #C87A1E; letter-spacing: 2px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
          .card { background: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #EBE4D8; font-size: 13px; line-height: 1.6; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; background: #FFFFFF; border-radius: 8px; overflow: hidden; }
          th { background: #F9EFE4; text-align: left; padding: 10px; font-size: 11px; text-transform: uppercase; color: #8F581B; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">AL-NUR STORE</div>
            <div style="font-size:12px;color:#8F581B;margin-top:4px;">Modest Haute Couture Logistics & Dispatch</div>
          </div>
          <div style="text-align:right;">
            <h3 style="margin:0;color:#2E110A;">WAYBILL & PACKING SLIP</h3>
            <div style="font-family:monospace;font-weight:bold;color:#C87A1E;font-size:16px;">#${order.orderRef}</div>
            <div style="font-size:11px;color:#8F581B;margin-top:4px;">${new Date(order.createdAt || Date.now()).toLocaleDateString("en-GB")}</div>
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <strong>CUSTOMER</strong><br>
            Name: ${order.customerName}<br>
            Email: ${order.customerEmail}<br>
            Phone: ${order.customerPhone || "N/A"}<br>
            Payment: ${(order.paymentStatus || "PENDING").toUpperCase()}
          </div>
          <div class="card">
            <strong>DELIVERY ADDRESS</strong><br>
            ${order.shippingAddress}<br>
            <span style="font-size:11px;color:#C87A1E;margin-top:8px;display:block;font-weight:bold;">Package: Handcrafted Gold-Foil Heirloom Box</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Variant</th>
              <th style="text-align:center;">Qty</th>
              <th style="text-align:right;">Unit Price</th>
              <th style="text-align:right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div style="text-align:right;margin-top:24px;">
          <span style="font-size:13px;color:#8F581B;">Total Paid:</span>
          <div style="font-size:24px;font-weight:bold;font-family:monospace;color:#2E110A;">₦${(order.totalAmount || 0).toLocaleString()}</div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-primary/20">
      <Nav />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-full border border-border bg-card hover:bg-muted/40 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
                  Store Orders & Fulfillment
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/30">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Admin Mode</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage live customer shipments, update fulfillment states, and print courier waybills
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => fetchOrders(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted/40 text-xs font-semibold text-foreground transition-all shadow-sm active:scale-95 disabled:opacity-60"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
              <span>Sync Orders</span>
            </button>

            <a
              href="https://alnur-store.serverpod.space/admin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-all"
            >
              <span>Serverpod ERP Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xs">
            <span className="text-[11px] text-muted-foreground block font-medium">Total Orders</span>
            <span className="text-2xl font-extrabold text-foreground font-display mt-0.5 block">
              {orders.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xs">
            <span className="text-[11px] text-muted-foreground block font-medium">Paid Revenue</span>
            <span className="text-2xl font-extrabold text-primary font-display font-mono mt-0.5 block">
              ₦{totalRevenue.toLocaleString()}
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xs">
            <span className="text-[11px] text-muted-foreground block font-medium">Processing / Tailoring</span>
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-display mt-0.5 block">
              {processingCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-xs">
            <span className="text-[11px] text-muted-foreground block font-medium">Dispatched & Delivered</span>
            <span className="text-2xl font-extrabold text-primary font-display mt-0.5 block">
              {shippedCount + outForDeliveryCount + deliveredCount}
            </span>
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "all", label: `All (${orders.length})` },
              { id: "placed", label: `1. Placed (${placedCount})` },
              { id: "processing", label: `2. Tailoring (${processingCount})` },
              { id: "shipped", label: `3. Shipped (${shippedCount})` },
              { id: "out_for_delivery", label: `4. Out for Delivery (${outForDeliveryCount})` },
              { id: "delivered", label: `5. Delivered (${deliveredCount})` },
              { id: "cancelled", label: `Cancelled (${cancelledCount})` },
              { id: "paid", label: "Paid" },
              { id: "pending", label: "Pending" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "all"
                      | "placed"
                      | "processing"
                      | "shipped"
                      | "out_for_delivery"
                      | "delivered"
                      | "cancelled"
                      | "paid"
                      | "pending"
                  )
                }
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ref, customer, email..."
              className="w-full bg-card border border-border rounded-xl px-3 py-1.5 pl-9 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Orders Table & Cards */}
        {isLoading ? (
          <div className="py-20 text-center">
            <RotateCw className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
            <p className="text-xs text-muted-foreground">Loading orders from PostgreSQL database...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-border bg-card/40 p-8">
            <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-bold text-foreground text-sm font-display">No Orders Found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
              No orders matched your selected status filter or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const items = parseItems(order.itemsJson);
              const cleanPhone = (order.customerPhone || "").replace(/[^0-9]/g, "");
              const waLink = cleanPhone
                ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Assalamu alaykum ${order.customerName}, this is Al-Nur Store concierge regarding your order #${order.orderRef}.`)}`
                : null;
              const normFulfill = normalizeStatus(order.fulfillmentStatus);

              return (
                <div
                  key={order.orderRef}
                  className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:border-primary/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono font-extrabold text-sm text-primary">
                          #{order.orderRef}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                            normFulfill === "delivered"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                              : normFulfill === "out_for_delivery"
                              ? "bg-[#ECE2D0] text-[#5C3710] border border-[#8F581B]/40"
                              : normFulfill === "shipped"
                              ? "bg-[#F5EBE1] text-[#7A4917] border border-[#C87A1E]/40"
                              : normFulfill === "cancelled"
                              ? "bg-rose-500/10 text-rose-600 border border-rose-500/30"
                              : normFulfill === "processing"
                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                              : "bg-[#FAF3E8] text-[#8F581B] border border-[#E5A83B]/40"
                          }`}
                        >
                          {normFulfill === "placed"
                            ? "1. Placed & Confirmed"
                            : normFulfill === "processing"
                            ? "2. Tailoring"
                            : normFulfill === "shipped"
                            ? "3. Shipped"
                            : normFulfill === "out_for_delivery"
                            ? "4. Out for Delivery"
                            : normFulfill === "delivered"
                            ? "5. Delivered"
                            : "Cancelled"}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                            order.paymentStatus === "paid"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                          }`}
                        >
                          {order.paymentStatus === "paid" ? "Verified Paid" : "Pending Payment"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recent"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground block">Grand Total</span>
                        <span className="text-base font-extrabold text-foreground font-mono">
                          ₦{(order.totalAmount || 0).toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => printWaybillSlip(order)}
                        className="p-2 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-all"
                        title="Print Waybill Slip"
                      >
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Customer Contact
                      </span>
                      <p className="font-bold text-foreground">{order.customerName}</p>
                      <p className="text-muted-foreground font-mono text-[11px]">{order.customerEmail}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {order.customerPhone && (
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-foreground font-semibold hover:text-primary"
                          >
                            <Phone className="h-3 w-3 text-primary" />
                            <span>{order.customerPhone}</span>
                          </a>
                        )}
                        {waLink && (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold hover:underline"
                          >
                            <MessageCircle className="h-3 w-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        Shipping Address
                      </span>
                      <div className="flex items-start gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{order.shippingAddress || "Store Pickup"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Ordered List */}
                  <div className="pt-3 border-t border-border/60">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                      Order Items ({items.length})
                    </span>
                    <div className="space-y-1.5">
                      {items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-muted/20"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{it.quantity}x</span>
                            <span className="font-medium text-foreground">{it.name}</span>
                            {(it.selectedSize || it.selectedColor) && (
                              <span className="text-[10px] text-muted-foreground">
                                ({[it.selectedSize ? `Size: ${it.selectedSize}` : "", it.selectedColor].filter(Boolean).join(", ")})
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-foreground font-bold">
                            ₦{((it.quantity || 1) * (it.price || 0)).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-4 border-t border-border/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-muted-foreground font-semibold">Fulfillment:</span>
                      {normFulfill === "placed" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFulfillment(order.orderRef, "processing")}
                          className="px-3 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs"
                          title="Advance to Level 2: Processing & Handcrafted Tailoring"
                        >
                          <Scissors className="h-3.5 w-3.5" />
                          <span>Start Tailoring →</span>
                        </button>
                      )}
                      {normFulfill === "processing" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFulfillment(order.orderRef, "shipped")}
                          className="px-3 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs"
                          title="Advance to Level 3: Shipped & Handed to Courier"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span>Mark Shipped →</span>
                        </button>
                      )}
                      {normFulfill === "shipped" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFulfillment(order.orderRef, "out_for_delivery")}
                          className="px-3 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-xs"
                          title="Advance to Level 4: Out for Delivery"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          <span>Out for Delivery →</span>
                        </button>
                      )}
                      {normFulfill === "out_for_delivery" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFulfillment(order.orderRef, "delivered")}
                          className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-xs"
                          title="Advance to Level 5: Delivered"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Mark Delivered ✓</span>
                        </button>
                      )}
                      {normFulfill === "delivered" && (
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>5. Delivered ✓</span>
                        </span>
                      )}
                      {normFulfill === "cancelled" && (
                        <button
                          type="button"
                          onClick={() => handleUpdateFulfillment(order.orderRef, "processing")}
                          className="px-3 py-1 rounded-xl border border-border bg-card text-foreground text-xs font-bold hover:bg-muted transition-all flex items-center gap-1.5"
                        >
                          <RotateCw className="h-3.5 w-3.5" />
                          <span>Reopen Order</span>
                        </button>
                      )}
                      {normFulfill !== "delivered" && normFulfill !== "cancelled" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to cancel Order #${order.orderRef}?`)) {
                              handleUpdateFulfillment(order.orderRef, "cancelled");
                            }
                          }}
                          className="px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/20 transition-all flex items-center gap-1"
                          title="Cancel Order"
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Cancel Order</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {order.paymentStatus !== "paid" && (
                        <button
                          type="button"
                          onClick={() => handleUpdatePayment(order.orderRef, "paid")}
                          className="px-3 py-1 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => printWaybillSlip(order)}
                        className="px-3 py-1 rounded-xl border border-border bg-card text-foreground text-xs font-semibold hover:bg-muted/40 transition-all flex items-center gap-1.5"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Print Waybill</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
