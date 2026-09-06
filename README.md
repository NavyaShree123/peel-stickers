# Peel Stickers

Interactive sticker peel demo built with Vite and React.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:5173 and drag a sticker upward to peel it off the sheet.

## Add or change stickers

Stickers live in `src/data/stickers.ts`. Each entry supports:

| Field | Description |
| --- | --- |
| `id` | Unique key (used by React) |
| `emoji` | Category emoji shown in the label |
| `label` | Category name |
| `gif` | Path to a GIF in `public/stickers/` |
| `color` | Sticker background color |

Example:

```ts
{
  id: 'memes',
  emoji: '🔥',
  label: 'Memes',
  gif: '/stickers/memes.gif',
  color: '#fca5a5',
}
```

Drop new GIF files into `public/stickers/`, add an object to the `stickers` array, and save.

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
