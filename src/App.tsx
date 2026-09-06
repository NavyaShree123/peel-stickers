import { StickerPeel } from './components/StickerPeel'
import { stickers } from './data/stickers'
import './App.css'

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
          <StickerPeel key={sticker.id} {...sticker} />
        ))}
      </section>
    </main>
  )
}

export default App
