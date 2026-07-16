import { Hono } from "hono";
import { getStock } from "../lib/inventory.ts";

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
 * The stock checks are fanned out concurrently with Promise.all, so the
 * downstream inventory calls run as a single parallel batch instead of one
 * sequential round-trip per item. Latency is therefore driven by the slowest
 * single call rather than scaling linearly with cart size.
 */
checkout.post("/checkout", async (c) => {
  const body = await c.req.json<CheckoutBody>();

  if (!body?.items?.length) {
    return c.json({ error: "cart is empty" }, 400);
  }

  // Fan the per-item stock checks out concurrently. Promise.all preserves
  // input order, so `outOfStock` still lists SKUs in cart order — the
  // response is identical to the previous sequential implementation.
  const results = await Promise.all(
    body.items.map(async (item) => {
      const stock = await getStock(item.sku);
      return stock.available < item.qty ? item.sku : null;
    }),
  );
  const outOfStock = results.filter((sku): sku is string => sku !== null);

  if (outOfStock.length > 0) {
    return c.json({ status: "rejected", outOfStock }, 409);
  }

  return c.json({
    status: "confirmed",
    cartId: body.cartId,
    itemCount: body.items.length,
  });
});
