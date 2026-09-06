import { Sticker } from './components/Sticker'
import { stickerCategories } from './data/stickers'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">Sticker gallery</p>
        <h1>Stickers</h1>
        <p className="app__lede">
          Browse sticker categories below. Each section includes emoji stickers and one
          animated GIF.
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
                <Sticker key={sticker.id} {...sticker} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
