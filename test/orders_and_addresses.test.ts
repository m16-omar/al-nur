import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { INITIAL_ORDERS, DEFAULT_USER_ADDRESSES } from "../src/lib/orders.ts";
import type { StoreOrder, UserAddress } from "../src/lib/orders.ts";

describe("Live Cloud Orders, Delivery Addresses & Courier Milestones Suite", () => {
  test("16. Orders dataset contains structured couture items and valid milestone timeline", () => {
    assert.strictEqual(INITIAL_ORDERS.length >= 3, true);

    const activeOrder: StoreOrder | undefined = INITIAL_ORDERS.find((o) => o.id === "ALN-84920");
    assert.ok(activeOrder);
    assert.strictEqual(activeOrder.status, "in_transit");
    assert.strictEqual(activeOrder.trackingNumber, "ALN-TRK-9920148");
    assert.strictEqual(activeOrder.courierName, "Ibrahim");
    assert.strictEqual(activeOrder.items.length, 2);
    assert.strictEqual(activeOrder.timeline.length, 5);

    // Milestones check
    assert.strictEqual(activeOrder.timeline[0].title, "Order Placed");
    assert.strictEqual(activeOrder.timeline[0].isCompleted, true);
    assert.strictEqual(activeOrder.timeline[3].title, "Out for Delivery");
    assert.strictEqual(activeOrder.timeline[3].isCurrent, true);
  });

  test("17. Default delivery address resolves customer's saved default address", () => {
    const addresses: UserAddress[] = DEFAULT_USER_ADDRESSES;
    assert.strictEqual(addresses.length, 2);

    const defaultAddr = addresses.find((a) => a.isDefault);
    assert.ok(defaultAddr);
    assert.match(defaultAddr.address, /Admiralty Way, Lekki Phase 1/i);
    assert.strictEqual(defaultAddr.city, "Lagos");
  });

  test("18. Secondary delivery address resolves Abuja FCT destination", () => {
    const addresses: UserAddress[] = DEFAULT_USER_ADDRESSES;
    const officeAddr = addresses.find((a) => !a.isDefault);
    assert.ok(officeAddr);
    assert.match(officeAddr.address, /Gana Street, Maitama/i);
    assert.strictEqual(officeAddr.city, "Abuja");
  });
});
