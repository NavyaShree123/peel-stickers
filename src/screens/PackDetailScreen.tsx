import { Sticker } from '../components/Sticker'
import type { StickerPack } from '../types/sticker'
import './PackDetailScreen.css'

type PackDetailScreenProps = {
  pack: StickerPack
  added: boolean
  following: boolean
  onBack: () => void
  onAdd: () => void
  onFollow: () => void
  onShare: () => void
  onSelectSticker?: (id: string) => void
  onDelete?: () => void
}

export function PackDetailScreen({
  pack,
  added,
  following,
  onBack,
  onAdd,
  onFollow,
  onShare,
  onSelectSticker,
  onDelete,
}: PackDetailScreenProps) {
  return (
    <section className="pack-detail">
      <header className="pack-detail__top">
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="button" onClick={onShare}>
          Share
        </button>
      </header>

      <div className="pack-detail__hero">
        <h1>{pack.name}</h1>
        <p>
          {pack.stickers.length} stickers · {pack.downloads} adds
        </p>
        <div className="pack-detail__author">
          <strong>{pack.author}</strong>
          {pack.authorId !== 'you' ? (
            <button type="button" className={following ? 'is-following' : ''} onClick={onFollow}>
              {following ? 'Following' : 'Follow'}
            </button>
          ) : null}
        </div>
      </div>

      <div className="pack-detail__grid">
        {pack.stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            {...sticker}
            compact
            onSelect={onSelectSticker ? () => onSelectSticker(sticker.id) : undefined}
          />
        ))}
      </div>

      <div className="pack-detail__cta">
        <button type="button" className={`wa-add wa-add--lg ${added ? 'wa-add--added' : ''}`} onClick={onAdd}>
          {added ? 'Added to WhatsApp' : 'Add to WhatsApp'}
        </button>
        {onDelete ? (
          <button type="button" className="pack-detail__delete" onClick={onDelete}>
            Delete pack
          </button>
        ) : null}
      </div>
    </section>
  )
}
