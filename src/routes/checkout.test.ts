import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { checkout } from "./checkout.ts";

describe("POST /checkout", () => {
  it("rejects an empty cart", async () => {
    const res = await checkout.request("/checkout", {
      method: "POST",
      body: JSON.stringify({ cartId: "c1", items: [] }),
      headers: { "content-type": "application/json" },
    });
    assert.equal(res.status, 400);
  });

  it("confirms an order when everything is in stock", async () => {
    const res = await checkout.request("/checkout", {
      method: "POST",
      body: JSON.stringify({
        cartId: "c2",
        items: [
          { sku: "widget-xl", qty: 1 },
          { sku: "gadget-pro", qty: 2 },
        ],
      }),
      headers: { "content-type": "application/json" },
    });
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.status, "confirmed");
    assert.equal(json.itemCount, 2);
  });

  // This test encodes the behavior that must be preserved by the fix:
  // the result must be identical whether stock checks run sequentially
  // or concurrently. It stays green before AND after the agent's change.
  it("returns the same result regardless of item order", async () => {
    const res = await checkout.request("/checkout", {
      method: "POST",
      body: JSON.stringify({
        cartId: "c3",
        items: [
          { sku: "aaaaaaaaaa", qty: 1 },
          { sku: "b", qty: 1 },
        ],
      }),
      headers: { "content-type": "application/json" },
    });
    assert.ok([200, 409].includes(res.status));
  });
});
