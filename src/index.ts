import { Hono } from "hono";
import { checkout } from "./routes/checkout.js";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));
app.route("/", checkout);

const port = Number(process.env.PORT ?? 3000);
console.log(`checkout-service listening on :${port}`);

export default {
  port,
  fetch: app.fetch,
};
