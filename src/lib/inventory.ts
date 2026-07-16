/**
 * Inventory client — talks to the (simulated) downstream inventory service.
 *
 * In the real world this would be an HTTP call to another microservice.
 * For the demo we simulate network latency so the N+1 pattern in the
 * checkout route produces a visible, Dynatrace-detectable degradation.
 */

export interface StockResult {
  sku: string;
  available: number;
}

// Simulated per-call downstream latency (network + DB lookup on the other side).
const DOWNSTREAM_LATENCY_MS = 90;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch stock for a single SKU from the inventory service.
 * NOTE: no timeout is applied here — see checkout route for the consequence.
 */
export async function getStock(sku: string): Promise<StockResult> {
  await sleep(DOWNSTREAM_LATENCY_MS);
  // Deterministic pseudo-stock so the demo is reproducible.
  const available = (sku.length * 7) % 50;
  return { sku, available };
}
