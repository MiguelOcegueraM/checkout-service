import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { checkout } from "./routes/checkout.ts";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));
app.route("/", checkout);

const port = Number(process.env.PORT ?? 3000);
console.log(`checkout-service listening on :${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0",
});
