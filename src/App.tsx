import { StickerPeel } from './components/StickerPeel'
import './App.css'

const stickers = [
  { label: 'Sparkle', emoji: '✨', color: '#fbbf24' },
  { label: 'Rocket', emoji: '🚀', color: '#60a5fa' },
  { label: 'Heart', emoji: '💜', color: '#c084fc' },
]

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">Interactive demo</p>
        <h1>Peel Stickers</h1>
        <p className="app__lede">
          Drag each sticker upward to peel it off the sheet. Peel far enough and it
          lifts away completely.
        </p>
      </header>

      <section className="app__grid" aria-label="Sticker sheet">
        {stickers.map((sticker) => (
          <StickerPeel key={sticker.label} {...sticker} />
        ))}
      </section>
    </main>
  )
}

export default App
