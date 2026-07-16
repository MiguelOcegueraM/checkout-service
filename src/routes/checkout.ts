import { Hono } from "hono";
import { getStock } from "../lib/inventory.js";

export const checkout = new Hono();

interface CartItem {
  sku: string;
  qty: number;
}

interface CheckoutBody {
  cartId: string;
  items: CartItem[];
}

/**
 * POST /checkout
 *
 * Validates that every item in the cart is in stock, then confirms the order.
 *
 * ⚠️ PLANTED BUG (this is what the agent will find and fix):
 * The stock check runs sequentially inside a for-loop — one awaited
 * downstream call per item (classic N+1). A 3-item cart is fine (~270ms),
 * but a 30-item cart serializes into ~2.7s. Under load this shows up in
 * Dynatrace as a "Response time degradation" problem on the /checkout
 * endpoint, with the time spent in the inventory service calls.
 *
 * The fix: fan the calls out with Promise.all (and ideally add a timeout),
 * turning N sequential round-trips into one concurrent batch.
 */
checkout.post("/checkout", async (c) => {
  const body = await c.req.json<CheckoutBody>();

  if (!body?.items?.length) {
    return c.json({ error: "cart is empty" }, 400);
  }

  const outOfStock: string[] = [];

  // BUG: sequential await inside the loop — latency scales with cart size.
  for (const item of body.items) {
    const stock = await getStock(item.sku);
    if (stock.available < item.qty) {
      outOfStock.push(item.sku);
    }
  }

  if (outOfStock.length > 0) {
    return c.json({ status: "rejected", outOfStock }, 409);
  }

  return c.json({
    status: "confirmed",
    cartId: body.cartId,
    itemCount: body.items.length,
  });
});
