# checkout-service

A tiny Bun + Hono checkout microservice used as the demo target for the talk
**"Managed Agents with Claude: Code, Ship, and Learn Across Your Dev Workflow."**

It ships with a deliberately planted observability bug so that a Claude agent
can run the full loop: **detect an alert in Dynatrace → investigate the code →
fix the root cause → open a PR.**

## The scenario

`POST /checkout` validates every cart item against a downstream inventory
service. The stock check runs **sequentially** — one awaited call per item.
Small carts are fine; large carts serialize into seconds of latency. Under load
this surfaces in Dynatrace as a response-time degradation on the endpoint.

Measured on this machine:

| Cart size | Sequential (bug) | Concurrent (fix) |
| --------- | ---------------- | ---------------- |
| 2 items   | 181 ms           | 91 ms            |
| 30 items  | **2710 ms**      | **90 ms**        |

The fix turns N sequential round-trips into one concurrent batch (`Promise.all`)
— roughly a **30× improvement** on large carts, with identical behavior.

## Run it

```bash
bun install
bun run dev            # starts on :3000
bun test               # 3 tests, green before and after the fix
```

Generate load so the problem shows up in Dynatrace:

```bash
./scripts/generate-load.sh http://localhost:3000 300
```

## Layout

```
src/
  index.ts              # entrypoint + /health
  routes/checkout.ts    # POST /checkout  ← the bug lives here
  routes/checkout.test.ts
  lib/inventory.ts      # downstream inventory client
scripts/generate-load.sh
dynatrace/README.md     # how the service is wired to Dynatrace + the DQL the agent runs
CLAUDE.md               # agent working context
```

## The agent loop (what the demo shows)

1. Davis opens a **response-time degradation** problem on `/checkout`.
2. The agent pulls the problem and traces via `dtctl` (`--agent` JSON output).
3. It localizes the time to the inventory calls, opens `routes/checkout.ts`,
   and recognizes the sequential N+1.
4. It rewrites the loop as a concurrent batch, runs `bun test` to confirm
   behavior is unchanged, and opens a PR explaining the root cause.

Tooling: [`dtctl`](https://github.com/dynatrace-oss/dtctl) as the Dynatrace CLI,
plus the domain skills from
[`dynatrace-for-ai`](https://github.com/Dynatrace/dynatrace-for-ai).
