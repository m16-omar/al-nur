import { test, describe } from "node:test";
import assert from "node:assert/strict";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function calculateCartTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
}

function addToCart(
  cart: CartItem[],
  product: { id: string; name: string; price: number },
  quantity = 1,
): CartItem[] {
  const existingIndex = cart.findIndex((i) => i.id === product.id);
  if (existingIndex > -1) {
    const updated = [...cart];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + quantity,
    };
    return updated;
  }
  return [...cart, { ...product, quantity }];
}

function updateQuantity(cart: CartItem[], productId: string, delta: number): CartItem[] {
  return cart
    .map((item) => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
}

describe("Cart Operations & Calculations Suite", () => {
  test("1. Cart starts empty with 0 items and ₦0 total price", () => {
    const cart: CartItem[] = [];
    const { totalItems, totalPrice } = calculateCartTotals(cart);
    assert.strictEqual(totalItems, 0);
    assert.strictEqual(totalPrice, 0);
  });

  test("2. Adding items increments item count and correctly calculates subtotal", () => {
    let cart: CartItem[] = [];
    cart = addToCart(cart, { id: "ab_1", name: "Dubai Gold Noir Abaya", price: 28500 });
    cart = addToCart(cart, { id: "v_1", name: "Pure Medina Silk Hijab", price: 8500 });

    const { totalItems, totalPrice } = calculateCartTotals(cart);
    assert.strictEqual(totalItems, 2);
    assert.strictEqual(totalPrice, 37000);
  });

  test("3. Adding an existing item increases its quantity without duplicating rows", () => {
    let cart: CartItem[] = [];
    cart = addToCart(cart, { id: "ab_1", name: "Dubai Gold Noir Abaya", price: 28500 });
    cart = addToCart(cart, { id: "ab_1", name: "Dubai Gold Noir Abaya", price: 28500 }, 2);

    assert.strictEqual(cart.length, 1);
    assert.strictEqual(cart[0].quantity, 3);
    const { totalItems, totalPrice } = calculateCartTotals(cart);
    assert.strictEqual(totalItems, 3);
    assert.strictEqual(totalPrice, 85500);
  });

  test("4. Updating item quantity recomputes total price accurately", () => {
    let cart: CartItem[] = [{ id: "j_1", name: "Aisha Bridal Set", price: 55000, quantity: 2 }];
    cart = updateQuantity(cart, "j_1", -1);
    assert.strictEqual(cart[0].quantity, 1);
    assert.strictEqual(calculateCartTotals(cart).totalPrice, 55000);

    cart = updateQuantity(cart, "j_1", 3);
    assert.strictEqual(cart[0].quantity, 4);
    assert.strictEqual(calculateCartTotals(cart).totalPrice, 220000);
  });

  test("5. Reducing quantity to 0 removes the item from the cart", () => {
    let cart: CartItem[] = [{ id: "p_1", name: "Royal Oud", price: 18000, quantity: 1 }];
    cart = updateQuantity(cart, "p_1", -1);
    assert.strictEqual(cart.length, 0);
    assert.strictEqual(calculateCartTotals(cart).totalItems, 0);
  });

  test("6. Clearing the cart resets all entries to empty", () => {
    let cart: CartItem[] = [
      { id: "ab_1", name: "Dubai Abaya", price: 28500, quantity: 2 },
      { id: "v_1", name: "Medina Silk", price: 8500, quantity: 1 },
    ];
    cart = [];
    assert.strictEqual(cart.length, 0);
    assert.strictEqual(calculateCartTotals(cart).totalPrice, 0);
  });
});
