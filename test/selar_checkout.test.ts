import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import {
  DEFAULT_SELAR_STORE_URL,
  getActiveSelarStoreUrl,
  setActiveSelarStoreUrl,
  buildSelarCheckoutUrl,
  isPaymentSuccessUrl,
} from "../src/lib/selar.ts";

describe("Selar Halal Gateway & Merchant Routing Suite", () => {
  // Mock localStorage for Node test runner
  const storageMap = new Map<string, string>();
  const mockLocalStorage = {
    getItem: (key: string) => storageMap.get(key) || null,
    setItem: (key: string, value: string) => storageMap.set(key, value),
    removeItem: (key: string) => storageMap.delete(key),
    clear: () => storageMap.clear(),
  };

  beforeEach(() => {
    storageMap.clear();
    // @ts-expect-error Mocking global localStorage for unit tests
    globalThis.localStorage = mockLocalStorage;
    // @ts-expect-error Mocking global window for unit tests
    globalThis.window = {
      localStorage: mockLocalStorage,
      location: { origin: "https://al-nur.store" },
    };
  });

  it("27. Default Selar store URL strictly targets the official Al-Nur store (alnurstore)", () => {
    assert.strictEqual(DEFAULT_SELAR_STORE_URL, "https://selar.com/m/alnurstore");
    assert.ok(
      !DEFAULT_SELAR_STORE_URL.includes("fatima-muhammad"),
      "Must not point to fatima-muhammad account",
    );
  });

  it("28. getActiveSelarStoreUrl sanitizes and auto-migrates away from fatima-muhammad", () => {
    // Case A: Nothing in localStorage
    storageMap.clear();
    assert.strictEqual(getActiveSelarStoreUrl(), "https://selar.com/m/alnurstore");

    // Case B: Stale legacy URL in localStorage
    storageMap.set("alnur_selar_store_url", "https://selar.com/m/fatima-muhammad3397104");
    const migrated = getActiveSelarStoreUrl();
    assert.strictEqual(migrated, "https://selar.com/m/alnurstore");
    assert.strictEqual(
      storageMap.get("alnur_selar_store_url"),
      "https://selar.com/m/alnurstore",
      "Stale URL in localStorage must be overwritten with official alnurstore URL",
    );
  });

  it("29. buildSelarCheckoutUrl constructs valid pre-filled checkout link for Al-Nur merchant", () => {
    const urlString = buildSelarCheckoutUrl({
      name: "Amina Bello",
      email: "amina@example.com",
      phone: "08012345678",
      amount: 85000,
      orderSummary: "1x Dubai 18K Solid Gold-Bonded Marital Bands (Pair)",
      orderId: "ALN-99881",
      origin: "https://al-nur.store",
    });

    const parsed = new URL(urlString);
    assert.strictEqual(parsed.origin, "https://selar.com");
    assert.strictEqual(parsed.pathname, "/m/alnurstore");
    assert.strictEqual(parsed.searchParams.get("name"), "Amina Bello");
    assert.strictEqual(parsed.searchParams.get("email"), "amina@example.com");
    assert.strictEqual(parsed.searchParams.get("phone"), "08012345678");
    assert.strictEqual(parsed.searchParams.get("amount"), "85000");
    assert.strictEqual(parsed.searchParams.get("ref"), "ALN-99881");
    assert.strictEqual(
      parsed.searchParams.get("order_summary"),
      "1x Dubai 18K Solid Gold-Bonded Marital Bands (Pair)",
    );
    assert.strictEqual(parsed.searchParams.get("redirect_url"), "https://al-nur.store/orders");
  });

  it("30. Custom valid merchant URL is respected when not containing invalid account keywords", () => {
    setActiveSelarStoreUrl("https://selar.com/m/alnurstore-vip");
    const active = getActiveSelarStoreUrl();
    assert.strictEqual(active, "https://selar.com/m/alnurstore-vip");
  });

  it("31. isPaymentSuccessUrl correctly detects success callbacks", () => {
    assert.strictEqual(
      isPaymentSuccessUrl("https://selar.com/m/alnurstore/receipt/RCP123?status=success"),
      true,
    );
    assert.strictEqual(isPaymentSuccessUrl("https://al-nur.store/orders?status=successful"), true);
    assert.strictEqual(isPaymentSuccessUrl("https://selar.com/m/alnurstore?failed=true"), false);
  });
});
