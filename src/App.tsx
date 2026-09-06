import { StickerPeel } from './components/StickerPeel'
import { stickerCategories } from './data/stickers'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">Interactive demo</p>
        <h1>Peel Stickers</h1>
        <p className="app__lede">
          Browse sticker categories below. Each section mixes emoji stickers and one
          animated GIF. Drag any sticker upward to peel it off the sheet.
        </p>
      </header>

      <div className="app__categories">
        {stickerCategories.map((category) => (
          <section key={category.id} className="category" aria-labelledby={`${category.id}-title`}>
            <header className="category__header">
              <h2 id={`${category.id}-title`} className="category__title">
                <span aria-hidden="true">{category.emoji}</span> {category.name}
              </h2>
            </header>

            <div className="category__grid">
              {category.stickers.map((sticker) => (
                <StickerPeel key={sticker.id} {...sticker} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
