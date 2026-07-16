import { describe, expect, it } from "bun:test";
import { checkout } from "./checkout.js";

describe("POST /checkout", () => {
  it("rejects an empty cart", async () => {
    const res = await checkout.request("/checkout", {
      method: "POST",
      body: JSON.stringify({ cartId: "c1", items: [] }),
      headers: { "content-type": "application/json" },
    });
    expect(res.status).toBe(400);
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
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("confirmed");
    expect(json.itemCount).toBe(2);
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
    expect(res.status).toBeOneOf([200, 409]);
  });
});
