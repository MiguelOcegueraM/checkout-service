# checkout-service — agent context

Small Node + Hono TypeScript service used to demo an agentic incident-response
workflow: an alert fires in Dynatrace, the agent investigates, finds the root
cause in this code, fixes it, and opens a PR.

## Stack
- Runtime: Node (with `--experimental-strip-types` for TS)
- Server: `@hono/node-server`
- Framework: Hono
- Language: TypeScript
- Tests: `npm test` (node:test)

## Layout
- `src/index.ts` — app entrypoint, routes, `/health`
- `src/routes/checkout.ts` — the `POST /checkout` endpoint
- `src/lib/inventory.ts` — client for the downstream inventory service
- `scripts/generate-load.sh` — drives traffic so latency issues surface

## Observability
This service is monitored by Dynatrace. Use the `dtctl` CLI to inspect the
live environment. Prefer `--agent` for structured JSON output.

Useful commands:
- `dtctl doctor` — confirm auth/connectivity
- `dtctl query "fetch dt.davis.problems | filter ..." --agent` — open problems
- `dtctl query "fetch spans | filter ... " --agent` — trace/span data for the endpoint

Domain skills (DQL, problems, services) come from the `dynatrace-for-ai`
skill pack; dtctl is the tool that acts on the environment.

## Working agreement
- Diagnose from real telemetry before changing code. Cite the problem/trace.
- Keep the public behavior of `/checkout` identical; `npm test` must stay green.
- Explain the root cause in the PR description in plain language.
