# Peel.ly

Sticker.ly-style sticker maker built with Vite and React. Browse community packs, follow creators, make a pack from your photos, and add stickers to a WhatsApp-style library.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:5173.

## What you can do

- **Home** — For You, Sticker, and Status feeds of community packs
- **Search** — Find packs by name, creator, or sticker label
- **Create (+)** — Name a pack, upload PNG/JPG/WebP/GIF files, Auto Cut, caption, rotate/scale, then publish (up to 30 stickers)
- **Pack page** — Preview stickers, Follow, Share link, Add to WhatsApp
- **My Stickers** — Packs you created and packs you added
- **Profile** — Name, handle, and bio saved in this browser

Uploads and library state stay in local storage on this device. Add to WhatsApp is a local demo action (it does not talk to the WhatsApp API).

Built-in GIF and emoji stickers live in `src/data/stickers.ts` and `public/stickers/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run Oxlint |
| `npm run test` | Run Vitest unit tests |
| `npm run preview` | Preview the production build |

## Cloud Agent environment

The repository includes `.cursor/environment.json` for Cloud Agents:

- `install` runs `npm ci`
- `start` launches the dev server in the background with a readiness check
- `terminals` exposes the foreground Vite dev server for logs and restarts
