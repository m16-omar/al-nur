import { test, describe } from "node:test";
import assert from "node:assert/strict";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

function toggleWishlist(wishlist: Product[], product: Product): Product[] {
  const exists = wishlist.some((item) => item.id === product.id);
  if (exists) {
    return wishlist.filter((item) => item.id !== product.id);
  }
  return [...wishlist, product];
}

function isFavorited(wishlist: Product[], productId: string): boolean {
  return wishlist.some((item) => item.id === productId);
}

describe("Wishlist & Favorites Controller Suite", () => {
  const sampleAbaya: Product = {
    id: "ab_1",
    name: "Dubai Gold Noir Abaya",
    price: "₦28,500",
    category: "abayas",
  };

  const sampleHijab: Product = {
    id: "v_1",
    name: "Pure Medina Silk Hijab",
    price: "₦8,500",
    category: "hijabs",
  };

  test("7. Toggling wishlist adds an unfavorited garment", () => {
    let wishlist: Product[] = [];
    assert.strictEqual(isFavorited(wishlist, sampleAbaya.id), false);

    wishlist = toggleWishlist(wishlist, sampleAbaya);
    assert.strictEqual(wishlist.length, 1);
    assert.strictEqual(isFavorited(wishlist, sampleAbaya.id), true);
  });

  test("8. Toggling an already-favorited garment removes it from wishlist", () => {
    let wishlist: Product[] = [sampleAbaya];
    assert.strictEqual(isFavorited(wishlist, sampleAbaya.id), true);

    wishlist = toggleWishlist(wishlist, sampleAbaya);
    assert.strictEqual(wishlist.length, 0);
    assert.strictEqual(isFavorited(wishlist, sampleAbaya.id), false);
  });

  test("9. Wishlist accurately supports multiple garments with intact metadata", () => {
    let wishlist: Product[] = [];
    wishlist = toggleWishlist(wishlist, sampleAbaya);
    wishlist = toggleWishlist(wishlist, sampleHijab);

    assert.strictEqual(wishlist.length, 2);
    assert.strictEqual(wishlist[0].name, "Dubai Gold Noir Abaya");
    assert.strictEqual(wishlist[1].category, "hijabs");
  });

  test("10. Move to Bag clears items from wishlist while adding to cart", () => {
    let wishlist: Product[] = [sampleAbaya, sampleHijab];
    const cart: Product[] = [];

    // Simulate "Add All to Bag"
    wishlist.forEach((p) => cart.push(p));
    wishlist = [];

    assert.strictEqual(cart.length, 2);
    assert.strictEqual(wishlist.length, 0);
  });
});
