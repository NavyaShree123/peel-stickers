import './Sticker.css'

type StickerProps = {
  label: string
  color: string
  emoji?: string
  gif?: string
}

export function Sticker({ label, emoji, gif }: StickerProps) {
  const ariaLabel = emoji ? `${emoji} ${label}` : label

  return (
    <article className="sticker-card" aria-label={ariaLabel} data-testid="sticker">
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
