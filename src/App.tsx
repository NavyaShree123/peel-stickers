import { Sticker } from './components/Sticker'
import { UploadStickerForm } from './components/UploadStickerForm'
import { useStickerCategories } from './hooks/useStickerCategories'
import './App.css'

function App() {
  const { categories, uploadSticker, deleteSticker } = useStickerCategories()

  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">Sticker gallery</p>
        <h1>Stickers</h1>
        <p className="app__lede">
          Browse sticker categories below, or upload your own PNG, JPG, WebP, or GIF
          stickers.
        </p>
      </header>

      <UploadStickerForm
        categories={categories}
        onUpload={async (input) => {
          await uploadSticker(input)
        }}
      />

      <div className="app__categories">
        {categories.map((category) => (
          <section key={category.id} className="category" aria-labelledby={`${category.id}-title`}>
            <header className="category__header">
              <h2 id={`${category.id}-title`} className="category__title">
                <span aria-hidden="true">{category.emoji}</span> {category.name}
              </h2>
            </header>

            <div className="category__grid">
              {category.stickers.map((sticker) => (
                <Sticker
                  key={sticker.id}
                  {...sticker}
                  onRemove={
                    sticker.isCustom ? () => deleteSticker(sticker.id) : undefined
                  }
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

export default App
