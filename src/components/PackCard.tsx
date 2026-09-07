import type { StickerPack } from '../types/sticker'
import { Sticker } from './Sticker'
import './PackCard.css'

type PackCardProps = {
  pack: StickerPack
  added?: boolean
  onOpen: () => void
  onAdd: () => void
}

export function PackCard({ pack, added, onOpen, onAdd }: PackCardProps) {
  const preview = pack.stickers.slice(0, 4)

  return (
    <article className="pack-card">
      <button type="button" className="pack-card__preview" onClick={onOpen} aria-label={`Open ${pack.name}`}>
        {preview.map((sticker) => (
          <Sticker key={sticker.id} {...sticker} compact />
        ))}
      </button>
      <div className="pack-card__meta">
        <div>
          <h3>{pack.name}</h3>
          <p>
            {pack.author}
            {pack.isAnimated ? ' · GIF' : ''}
            {pack.isPrivate ? ' · Private' : ''}
          </p>
        </div>
        <button
          type="button"
          className={`wa-add ${added ? 'wa-add--added' : ''}`}
          onClick={onAdd}
        >
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </article>
  )
}
