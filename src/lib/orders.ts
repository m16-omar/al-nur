export interface OrderItem {
  id?: string;
  name: string;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  imageUrl: string;
}

export interface OrderTimelineStep {
  title: string;
  subtitle: string;
  date: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export type FulfillmentStatus =
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface StoreOrder {
  id: string;
  orderDate: string;
  status: FulfillmentStatus;
  trackingNumber: string;
  deliveryAddress: string;
  estimatedDelivery: string;
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  courierName?: string;
  courierPhone?: string;
  items: OrderItem[];
  timeline: OrderTimelineStep[];
  paymentStatus?: "pending" | "paid" | "failed";
  paymentReference?: string;
}

export interface UserAddress {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export const DEFAULT_USER_ADDRESSES: UserAddress[] = [
  {
    id: "addr_1",
    title: "Primary Residence",
    address: "Enter your home or estate delivery address",
    city: "Lagos",
    state: "Lagos State",
    isDefault: true,
  },
];

export const SERVERPOD_API_URL = "https://alnur-store.api.serverpod.space";

/**
 * Normalizes any raw backend fulfillment status to the canonical 4-step lifecycle
 */
export function normalizeFulfillmentStatus(rawStatus?: string | null): FulfillmentStatus {
  if (!rawStatus) return "processing";
  const lower = rawStatus.toLowerCase().trim();
  if (lower === "shipped" || lower === "dispatched" || lower === "transit" || lower === "in_transit") {
    return "shipped";
  }
  if (lower === "out_for_delivery" || lower === "outfordelivery" || lower === "delivery") {
    return "out_for_delivery";
  }
  if (lower === "delivered" || lower === "completed" || lower === "fulfilled") {
    return "delivered";
  }
  if (lower === "cancelled" || lower === "rejected") {
    return "cancelled";
  }
  return "processing";
}

/**
 * Generates the unified 5-step milestone tracking timeline for an order
 */
export function buildOrderTimeline(status: FulfillmentStatus, orderDateStr: string): OrderTimelineStep[] {
  const norm = normalizeFulfillmentStatus(status);
  return [
    {
      title: "Order Placed",
      subtitle: "Payment received & confirmed via Monnify / Selar",
      date: orderDateStr || "Just now",
      isCompleted: true,
      isCurrent: norm === "processing",
    },
    {
      title: "Processing & Tailoring",
      subtitle: "Custom sizing and modesty craftsmanship at Al-Nur Atelier",
      date: norm !== "processing" ? "Completed" : "In Progress",
      isCompleted: norm !== "processing",
      isCurrent: norm === "processing",
    },
    {
      title: "Shipped & Dispatched",
      subtitle: "Sealed in gold-foil heirloom box and handed to dispatch courier",
      date: norm === "shipped" || norm === "out_for_delivery" || norm === "delivered" ? "Completed" : "Pending",
      isCompleted: norm === "shipped" || norm === "out_for_delivery" || norm === "delivered",
      isCurrent: norm === "shipped",
    },
    {
      title: "Out for Delivery",
      subtitle: "Courier Ibrahim is en route with your package",
      date: norm === "out_for_delivery" || norm === "delivered" ? "Today" : "Pending",
      isCompleted: norm === "out_for_delivery" || norm === "delivered",
      isCurrent: norm === "out_for_delivery",
    },
    {
      title: "Delivered",
      subtitle: "Package signed and received safely",
      date: norm === "delivered" ? "Delivered" : "Pending",
      isCompleted: norm === "delivered",
      isCurrent: norm === "delivered",
    },
  ];
}

const getOrdersStorageKey = (email?: string | null) =>
  email ? `alnur_orders_user_${email.toLowerCase().trim()}` : "alnur_orders_guest";

const ADDRESSES_STORAGE_KEY = "alnur_user_addresses";

/**
 * Retrieves orders strictly isolated by the user email
 */
export function getSavedOrders(email?: string | null): StoreOrder[] {
  if (!email) return [];
  try {
    const key = getOrdersStorageKey(email);
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load local user orders:", e);
  }
  return [];
}

/**
 * Saves an order to the local cache scoped to the user email
 */
export function saveOrder(newOrder: StoreOrder, email?: string | null): void {
  if (!email) return;
  try {
    const current = getSavedOrders(email);
    const updated = [newOrder, ...current.filter((o) => o.id !== newOrder.id)];
    localStorage.setItem(getOrdersStorageKey(email), JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to persist user order locally:", e);
  }
}

/**
 * Fetches live orders from PostgreSQL via Serverpod with strict user_id isolation
 */
export async function fetchLiveUserOrders(customerEmail: string): Promise<StoreOrder[]> {
  const cleanEmail = customerEmail.toLowerCase().trim();
  if (!cleanEmail) return [];

  try {
    const res = await fetch(`${SERVERPOD_API_URL}/order/getOrders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerEmail: cleanEmail }),
    });

    if (!res.ok) {
      console.warn("Failed to fetch live orders from Serverpod, status:", res.status);
      return getSavedOrders(cleanEmail);
    }

    interface ServerpodOrder {
      id?: number;
      orderRef: string;
      customerEmail: string;
      customerName: string;
      customerPhone?: string;
      shippingAddress: string;
      totalAmount: number;
      paymentStatus: string;
      fulfillmentStatus: string;
      itemsJson: string;
      createdAt: string;
      updatedAt: string;
    }

    const liveOrders: ServerpodOrder[] = await res.json();
    const mapped: StoreOrder[] = liveOrders.map((lo) => {
      let parsedItems: OrderItem[] = [];
      try {
        if (lo.itemsJson) {
          const raw = JSON.parse(lo.itemsJson);
          parsedItems = Array.isArray(raw) ? raw : [];
        }
      } catch (err) {
        console.warn("Error parsing itemsJson:", err);
      }

      const normStatus = normalizeFulfillmentStatus(lo.fulfillmentStatus);
      const createdDate = new Date(lo.createdAt);
      const dateStr = !isNaN(createdDate.getTime())
        ? createdDate.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
        : "Recent";

      return {
        id: lo.orderRef,
        orderDate: dateStr,
        status: normStatus,
        trackingNumber: `ALN-TRK-${lo.orderRef.replace(/[^0-9]/g, "").slice(-7) || "001"}`,
        deliveryAddress: lo.shippingAddress || "Delivery Address on Record",
        estimatedDelivery: normStatus === "delivered" ? "Delivered" : "In 2-3 business days",
        subtotal: lo.totalAmount > 2500 ? lo.totalAmount - 2500 : lo.totalAmount,
        shippingFee: 2500,
        totalAmount: lo.totalAmount,
        courierName: "Ibrahim",
        courierPhone: "+234 803 123 4567",
        items: parsedItems.length > 0 ? parsedItems : [
          {
            name: "Al-Nur Luxury Item",
            category: "Couture",
            quantity: 1,
            price: lo.totalAmount,
            imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
          },
        ],
        timeline: buildOrderTimeline(normStatus, dateStr),
        paymentStatus: (lo.paymentStatus?.toLowerCase() === "paid" ? "paid" : "pending") as "paid" | "pending",
      };
    });

    // Cache locally for offline resilience
    try {
      localStorage.setItem(getOrdersStorageKey(cleanEmail), JSON.stringify(mapped));
    } catch (e) {
      void e;
    }

    return mapped;
  } catch (err) {
    console.error("Network error fetching user orders:", err);
    return getSavedOrders(cleanEmail);
  }
}

export function getSavedAddresses(): UserAddress[] {
  try {
    const saved = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_USER_ADDRESSES;
}

export function saveAddress(address: UserAddress): void {
  try {
    const current = getSavedAddresses();
    const updated = [address, ...current.filter((a) => a.id !== address.id)];
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}
