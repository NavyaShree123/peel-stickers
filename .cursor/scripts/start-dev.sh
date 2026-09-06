#!/usr/bin/env bash
set -euo pipefail

PORT="${VITE_PORT:-5173}"
HOST="${VITE_HOST:-0.0.0.0}"
LOG_FILE="/tmp/peel-stickers-dev.log"
PID_FILE="/tmp/peel-stickers-dev.pid"

if [[ -f "${PID_FILE}" ]] && kill -0 "$(cat "${PID_FILE}")" 2>/dev/null; then
  if curl -sf "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then
    echo "Dev server already running on port ${PORT}"
    exit 0
  fi
fi

nohup npm run dev -- --host "${HOST}" --port "${PORT}" >"${LOG_FILE}" 2>&1 &
echo $! >"${PID_FILE}"

for _ in $(seq 1 45); do
  if curl -sf "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then
    echo "Dev server ready at http://${HOST}:${PORT}"
    exit 0
  fi
  sleep 1
done

echo "Timed out waiting for dev server. See ${LOG_FILE}" >&2
exit 1
