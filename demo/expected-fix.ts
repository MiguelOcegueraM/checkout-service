/**
 * REFERENCE FIX (for you, the presenter — not committed to main before the demo)
 *
 * This is what a good agent should converge on. Keep it handy so you can confirm
 * the agent's PR is correct on stage. Two things matter:
 *   1. Fan the N calls out concurrently (Promise.all) instead of awaiting in a loop.
 *   2. (Bonus) add a timeout so one slow downstream call can't hang checkout.
 *
 * Behavior is identical to the original; only the latency profile changes.
 */

import { getStock } from "../src/lib/inventory.js";

interface CartItem {
  sku: string;
  qty: number;
}

// --- Minimal fix: concurrent fan-out ---
export async function checkStockConcurrent(items: CartItem[]): Promise<string[]> {
  const results = await Promise.all(
    items.map(async (item) => {
      const stock = await getStock(item.sku);
      return stock.available < item.qty ? item.sku : null;
    })
  );
  return results.filter((sku): sku is string => sku !== null);
}

// --- Better fix: concurrent + per-call timeout ---
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`inventory call timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function checkStockConcurrentWithTimeout(
  items: CartItem[]
): Promise<string[]> {
  const results = await Promise.all(
    items.map(async (item) => {
      const stock = await withTimeout(getStock(item.sku), 500);
      return stock.available < item.qty ? item.sku : null;
    })
  );
  return results.filter((sku): sku is string => sku !== null);
}
