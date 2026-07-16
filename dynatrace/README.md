# Dynatrace setup for the demo

This folder documents how the `checkout-service` is wired into Dynatrace so the
agentic demo has a real problem to investigate.

## What to have in place before recording

1. **OneAgent** monitoring the host/container running `checkout-service`, or
   OpenTelemetry export configured so the `POST /checkout` endpoint shows up as
   a service in Dynatrace.
2. A **response-time degradation** baseline on the checkout service (Davis
   detects this automatically once there's enough baseline traffic).
3. Run `scripts/generate-load.sh` for a few minutes to establish a healthy
   baseline, then let the 30-item carts push the average up until Davis opens a
   problem.

## DQL the agent will run (via dtctl)

Open problems on the service:

```dql
fetch dt.davis.problems
| filter event.status == "ACTIVE"
| filter contains(affected_entity_names, "checkout")
| fields display_id, event.name, event.category, event.start, root_cause_entity_name
| sort event.start desc
```

Endpoint latency over time (confirming the degradation):

```dql
timeseries avg(dt.service.request.response_time),
  by: { dt.entity.service },
  filter: { endsWith(endpoint.name, "/checkout") }
```

Where the time is spent (points at the inventory calls):

```dql
fetch spans
| filter request.path == "/checkout"
| summarize avg(duration), by: { span.name }
| sort `avg(duration)` desc
```

Run these with `dtctl query "<dql>" --agent` so the agent gets structured JSON.
