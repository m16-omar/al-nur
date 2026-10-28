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

export interface StoreOrder {
  id: string;
  orderDate: string;
  status: "processing" | "in_transit" | "delivered" | "cancelled";
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
    title: "Home",
    address: "Plot 14, Admiralty Way, Lekki Phase 1",
    city: "Lagos",
    state: "Lagos State",
    isDefault: true,
  },
  {
    id: "addr_2",
    title: "Office / Boutique",
    address: "No. 8, Gana Street, Maitama",
    city: "Abuja",
    state: "FCT",
    isDefault: false,
  },
];

export const INITIAL_ORDERS: StoreOrder[] = [
  {
    id: "ALN-84920",
    orderDate: "Yesterday, 10:15 AM",
    status: "in_transit",
    trackingNumber: "ALN-TRK-9920148",
    deliveryAddress: "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
    estimatedDelivery: "Today by 4:30 PM",
    subtotal: 37000,
    shippingFee: 2500,
    totalAmount: 39500,
    courierName: "Ibrahim",
    courierPhone: "+234 803 123 4567",
    items: [
      {
        name: "Dubai Gold Noir Abaya",
        category: "Abayas",
        quantity: 1,
        size: "56",
        color: "Midnight Black / Gold",
        price: 28500,
        imageUrl:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Pure Medina Silk Hijab",
        category: "Hijabs",
        quantity: 1,
        size: "Standard (180x75cm)",
        color: "Emerald Silk",
        price: 8500,
        imageUrl:
          "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=500&q=80",
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        subtitle: "Payment verified successfully via Card",
        date: "Yesterday, 10:15 AM",
        isCompleted: true,
      },
      {
        title: "Custom Sizing & Quality Check",
        subtitle: "Inspected by Al-Nur Master Tailors",
        date: "Yesterday, 03:40 PM",
        isCompleted: true,
      },
      {
        title: "Dispatched from Hub",
        subtitle: "En route from Lekki Fulfilment Center",
        date: "Today, 09:20 AM",
        isCompleted: true,
      },
      {
        title: "Out for Delivery",
        subtitle: "Courier Driver: Ibrahim (+234 803 123 4567)",
        date: "Today, 01:10 PM",
        isCompleted: true,
        isCurrent: true,
      },
      {
        title: "Delivered",
        subtitle: "Package signed and handed over",
        date: "Estimated by 4:30 PM",
        isCompleted: false,
      },
    ],
  },
  {
    id: "ALN-79104",
    orderDate: "Oct 20, 2026",
    status: "processing",
    trackingNumber: "ALN-TRK-7719280",
    deliveryAddress: "No. 8, Gana Street, Maitama, Abuja FCT",
    estimatedDelivery: "Oct 25, 2026",
    subtotal: 36000,
    shippingFee: 3000,
    totalAmount: 39000,
    items: [
      {
        name: "Moroccan Royal Jalabia",
        category: "Jalabias",
        quantity: 1,
        size: "L",
        color: "Royal Emerald / Gold Sfifa",
        price: 36000,
        imageUrl:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
      },
    ],
    timeline: [
      {
        title: "Order Confirmed",
        subtitle: "Artisanal Moroccan tailoring scheduled",
        date: "Oct 20, 02:15 PM",
        isCompleted: true,
      },
      {
        title: "Handcrafted Embroidery",
        subtitle: "Applying intricate Sfifa gold threading",
        date: "Oct 21, 11:30 AM",
        isCompleted: true,
        isCurrent: true,
      },
      {
        title: "Packaging & Blessing",
        subtitle: "Perfumed with natural Oud & sealed",
        date: "Pending",
        isCompleted: false,
      },
      {
        title: "Courier Dispatch",
        subtitle: "Waybill generated for Abuja air transit",
        date: "Pending",
        isCompleted: false,
      },
    ],
  },
  {
    id: "ALN-64218",
    orderDate: "Oct 14, 2026",
    status: "delivered",
    trackingNumber: "ALN-TRK-6421800",
    deliveryAddress: "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
    estimatedDelivery: "Delivered on Oct 14, 2026",
    subtotal: 52000,
    shippingFee: 2500,
    totalAmount: 54500,
    items: [
      {
        name: "Aisha 24K Bridal Set",
        category: "Jewelries",
        quantity: 1,
        color: "24K Yellow Gold",
        price: 52000,
        imageUrl:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80",
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        subtitle: "Payment received",
        date: "Oct 12, 09:00 AM",
        isCompleted: true,
      },
      {
        title: "Dispatched",
        subtitle: "Lagos logistics partner picked up parcel",
        date: "Oct 13, 02:00 PM",
        isCompleted: true,
      },
      {
        title: "Delivered & Signed",
        subtitle: "Recipient signed at front gate",
        date: "Oct 14, 11:45 AM",
        isCompleted: true,
      },
    ],
  },
];

const ORDERS_STORAGE_KEY = "alnur_user_orders";
const ADDRESSES_STORAGE_KEY = "alnur_user_addresses";

export function getSavedOrders(): StoreOrder[] {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_ORDERS;
}

export function saveOrder(newOrder: StoreOrder): void {
  try {
    const current = getSavedOrders();
    const updated = [newOrder, ...current];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
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
