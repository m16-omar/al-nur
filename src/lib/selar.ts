export const DEFAULT_SELAR_STORE_URL = "https://selar.com/m/alnurstore";
export const DEFAULT_SELAR_API_KEY = "sat_873skzy08l1889v50814bs77093r4818j38f8";

/**
 * Retrieves the verified Al-Nur Selar merchant store URL.
 * Automatically sanitizes legacy or invalid endpoints stored in localStorage.
 */
export function getActiveSelarStoreUrl(): string {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return DEFAULT_SELAR_STORE_URL;
    }
    const stored = localStorage.getItem("alnur_selar_store_url");
    if (
      !stored ||
      stored.trim().length === 0 ||
      stored.includes("fatima-muhammad") ||
      stored.includes("fatimamuhammad") ||
      stored.endsWith("/alnur") ||
      stored.endsWith("/alnur/")
    ) {
      localStorage.setItem("alnur_selar_store_url", DEFAULT_SELAR_STORE_URL);
      return DEFAULT_SELAR_STORE_URL;
    }
    return stored.trim();
  } catch {
    return DEFAULT_SELAR_STORE_URL;
  }
}

/**
 * Sets or updates the active Selar merchant store URL.
 */
export function setActiveSelarStoreUrl(url: string): void {
  try {
    const trimmed = url.trim();
    if (
      !trimmed ||
      trimmed.includes("fatima-muhammad") ||
      trimmed.includes("fatimamuhammad") ||
      trimmed.endsWith("/alnur") ||
      trimmed.endsWith("/alnur/")
    ) {
      localStorage.setItem("alnur_selar_store_url", DEFAULT_SELAR_STORE_URL);
      return;
    }
    localStorage.setItem("alnur_selar_store_url", trimmed);
  } catch {
    // Ignore in non-browser env
  }
}

/**
 * Builds the fully pre-filled Selar checkout URL for payment processing.
 */
export function buildSelarCheckoutUrl(params: {
  storeUrl?: string;
  name: string;
  email: string;
  phone?: string;
  amount: number | string;
  orderSummary: string;
  orderId: string;
  origin?: string;
}): string {
  const base = params.storeUrl || getActiveSelarStoreUrl();
  const url = new URL(base);
  url.searchParams.set("name", params.name);
  url.searchParams.set("email", params.email);
  if (params.phone && params.phone.trim().length > 0) {
    url.searchParams.set("phone", params.phone.trim());
  }
  url.searchParams.set("amount", String(params.amount));
  url.searchParams.set("order_summary", params.orderSummary);
  url.searchParams.set("ref", params.orderId);
  if (params.origin) {
    url.searchParams.set("redirect_url", `${params.origin}/orders`);
  }
  return url.toString();
}

/**
 * Checks if a navigated URL indicates that payment succeeded.
 */
export function isPaymentSuccessUrl(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes("success") ||
    lower.includes("/receipt/") ||
    lower.includes("thank-you") ||
    lower.includes("order-complete") ||
    lower.includes("status=success") ||
    lower.includes("status=successful")
  );
}
