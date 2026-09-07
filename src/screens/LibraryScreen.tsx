import { PackCard } from '../components/PackCard'
import type { StickerPack } from '../types/sticker'
import './LibraryScreen.css'

type LibraryScreenProps = {
  packs: StickerPack[]
  addedPackIds: string[]
  onOpenPack: (id: string) => void
  onAddPack: (id: string) => void
}

export function LibraryScreen({ packs, addedPackIds, onOpenPack, onAddPack }: LibraryScreenProps) {
  const mine = packs.filter((pack) => pack.isCustom)
  const added = packs.filter((pack) => addedPackIds.includes(pack.id) && !pack.isCustom)

  return (
    <section className="library">
      <h1>My Stickers</h1>
      <h2>Created</h2>
      {mine.length === 0 ? <p className="library__empty">Tap + to make a sticker pack from your photos.</p> : null}
      <div className="home__grid">
        {mine.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            added={addedPackIds.includes(pack.id)}
            onOpen={() => onOpenPack(pack.id)}
            onAdd={() => onAddPack(pack.id)}
          />
        ))}
      </div>
      <h2>Added to WhatsApp</h2>
      {added.length === 0 ? <p className="library__empty">Packs you add from the feed show up here.</p> : null}
      <div className="home__grid">
        {added.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            added
            onOpen={() => onOpenPack(pack.id)}
            onAdd={() => onAddPack(pack.id)}
          />
        ))}
      </div>
    </section>
  )
}
