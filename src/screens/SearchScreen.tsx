import { useMemo, useState } from 'react'
import { searchPacks } from '../data/packs'
import { PackCard } from '../components/PackCard'
import type { StickerPack } from '../types/sticker'
import './SearchScreen.css'

type SearchScreenProps = {
  packs: StickerPack[]
  addedPackIds: string[]
  onOpenPack: (id: string) => void
  onAddPack: (id: string) => void
}

export function SearchScreen({ packs, addedPackIds, onOpenPack, onAddPack }: SearchScreenProps) {
  const [query, setQuery] = useState('')
  const [animatedOnly, setAnimatedOnly] = useState(false)
  const results = useMemo(() => {
    const found = searchPacks(packs, query)
    return animatedOnly ? found.filter((pack) => pack.isAnimated) : found
  }, [packs, query, animatedOnly])

  return (
    <section className="search">
      <label className="search__box">
        <span className="sr-only">Search stickers</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search packs, creators, memes"
        />
      </label>
      <label className="search__filter">
        <input
          type="checkbox"
          checked={animatedOnly}
          onChange={(event) => setAnimatedOnly(event.target.checked)}
        />
        Animated only
      </label>
      <div className="home__grid">
        {results.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            added={addedPackIds.includes(pack.id)}
            onOpen={() => onOpenPack(pack.id)}
            onAdd={() => onAddPack(pack.id)}
          />
        ))}
      </div>
      {results.length === 0 ? <p className="search__empty">No packs match that search.</p> : null}
    </section>
  )
}
