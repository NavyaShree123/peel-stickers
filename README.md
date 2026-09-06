# Peel Stickers

Interactive sticker peel demo built with Vite and React.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:5173 and drag a sticker upward to peel it off the sheet.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |
| `npm run test` | Run Vitest unit tests |

## Cloud Agent environment

The repository includes `.cursor/environment.json` for Cloud Agents:

- `install` runs `npm ci`
- `start` launches the dev server in the background with a readiness check
- `terminals` exposes the foreground Vite dev server for logs and restarts
