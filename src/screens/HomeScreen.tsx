import { PackCard } from '../components/PackCard'
import type { StickerPack } from '../types/sticker'
import './HomeScreen.css'

export type HomeFeed = 'for-you' | 'sticker' | 'status'

type HomeScreenProps = {
  packs: StickerPack[]
  addedPackIds: string[]
  feed: HomeFeed
  onFeed: (feed: HomeFeed) => void
  onOpenPack: (id: string) => void
  onAddPack: (id: string) => void
}

const feeds: Array<{ id: HomeFeed; label: string }> = [
  { id: 'for-you', label: 'For You' },
  { id: 'sticker', label: 'Sticker' },
  { id: 'status', label: 'Status' },
]

export function HomeScreen({
  packs,
  addedPackIds,
  feed,
  onFeed,
  onOpenPack,
  onAddPack,
}: HomeScreenProps) {
  const visiblePacks =
    feed === 'status' ? packs.filter((pack) => pack.isAnimated) : packs

  return (
    <section className="home">
      <div className="home__tabs" role="tablist" aria-label="Feed">
        {feeds.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={feed === item.id}
            className={feed === item.id ? 'is-active' : ''}
            onClick={() => onFeed(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {feed === 'status' ? (
        <div className="home__status">
          {visiblePacks.map((pack) => {
            const gif = pack.stickers.find((sticker) => sticker.gif)
            if (!gif?.gif) return null
            return (
              <article key={pack.id} className="status-card">
                <button type="button" onClick={() => onOpenPack(pack.id)}>
                  <img src={gif.gif} alt={pack.name} />
                </button>
                <div>
                  <div>
                    <strong>{pack.name}</strong>
                    <span>{pack.author}</span>
                  </div>
                  <button
                    type="button"
                    className={`wa-add ${addedPackIds.includes(pack.id) ? 'wa-add--added' : ''}`}
                    onClick={() => onAddPack(pack.id)}
                  >
                    {addedPackIds.includes(pack.id) ? 'Added' : 'Add'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="home__grid">
          {visiblePacks.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              added={addedPackIds.includes(pack.id)}
              onOpen={() => onOpenPack(pack.id)}
              onAdd={() => onAddPack(pack.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
