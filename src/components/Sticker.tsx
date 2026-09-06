import './Sticker.css'

type StickerProps = {
  label: string
  color: string
  emoji?: string
  gif?: string
}

export function Sticker({ label, emoji, color, gif }: StickerProps) {
  const isGifSticker = Boolean(gif)
  const ariaLabel = emoji ? `${emoji} ${label}` : label

  return (
    <article
      className={`sticker-card ${isGifSticker ? 'sticker-card--gif' : ''}`}
      style={{ '--sticker-color': color } as React.CSSProperties}
      aria-label={ariaLabel}
      data-testid="sticker"
    >
      {gif ? (
        <img className="sticker__gif" src={gif} alt={label} />
      ) : (
        <span className="sticker__emoji" aria-hidden="true">
          {emoji}
        </span>
      )}
      <span className="sticker__label">{label}</span>
    </article>
  )
}
