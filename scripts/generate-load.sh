#!/usr/bin/env bash
#
# generate-load.sh — hammer /checkout with progressively larger carts so the
# N+1 bug surfaces in Dynatrace as a response-time degradation.
#
# Usage:
#   ./scripts/generate-load.sh http://localhost:3000  300
#                              ^ base URL              ^ seconds to run
#
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
DURATION="${2:-300}"

echo "Generating load against ${BASE_URL}/checkout for ${DURATION}s..."
echo "Small carts stay fast; large carts serialize and degrade."

end=$(( $(date +%s) + DURATION ))

# Build a large cart payload (30 items) — this is the one that hurts.
big_items=$(for i in $(seq 1 30); do printf '{"sku":"sku-%03d","qty":1},' "$i"; done)
big_items="[${big_items%,}]"
big_payload="{\"cartId\":\"load\",\"items\":${big_items}}"

# Small cart for contrast.
small_payload='{"cartId":"load","items":[{"sku":"a","qty":1},{"sku":"b","qty":1}]}'

while [ "$(date +%s)" -lt "$end" ]; do
  # 3 big requests to 1 small — skews the average up.
  for _ in 1 2 3; do
    curl -s -o /dev/null -X POST "${BASE_URL}/checkout" \
      -H 'content-type: application/json' -d "$big_payload" &
  done
  curl -s -o /dev/null -X POST "${BASE_URL}/checkout" \
    -H 'content-type: application/json' -d "$small_payload" &
  wait
done

echo "Load generation complete."
