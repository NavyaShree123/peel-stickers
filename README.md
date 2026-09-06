# Stickers

Sticker gallery built with Vite and React. Browse emoji and GIF stickers by category.

## Development

```bash
npm ci
npm run dev
```

Open http://localhost:5173 to browse the sticker categories.

## Upload your own stickers

Use the **Upload a sticker** form at the top of the app:

1. Pick a category
2. Enter a name
3. Choose a PNG, JPG, WebP, or GIF (max 1 MB)
4. Click **Add sticker**

Uploads are saved in your browser's local storage, so they persist on refresh in the same browser. Custom stickers include a **Remove** button.

## Add built-in stickers in code

Stickers are grouped by category in `src/data/stickers.ts`. Each category has a heading plus a mix of emoji stickers and one GIF sticker.

```ts
{
  id: 'funny-reaction',
  emoji: '😂',
  name: 'Funny/reaction',
  stickers: [
    { id: 'lol', emoji: '😂', label: 'LOL', color: '#fef08a' },          // emoji sticker
    { id: 'laughing-gif', label: 'Laughing GIF', gif: '/stickers/funny-reaction.gif', color: '#facc15' }, // GIF sticker
  ],
}
```

- **Emoji sticker:** set `emoji` + `label` (no `gif`)
- **GIF sticker:** set `gif` + `label` (no `emoji`)
- Drop GIF files into `public/stickers/`

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
