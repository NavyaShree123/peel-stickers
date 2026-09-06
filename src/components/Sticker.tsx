import './Sticker.css'

type StickerProps = {
  label: string
  color: string
  emoji?: string
  gif?: string
  image?: string
  isCustom?: boolean
  onRemove?: () => void
}

export function Sticker({ label, emoji, gif, image, isCustom, onRemove }: StickerProps) {
  const ariaLabel = emoji ? `${emoji} ${label}` : label
  const mediaSrc = gif ?? image

  return (
    <article className="sticker-card" aria-label={ariaLabel} data-testid="sticker">
      {mediaSrc ? (
        <img className="sticker__media" src={mediaSrc} alt={label} />
      ) : (
        <span className="sticker__emoji" aria-hidden="true">
          {emoji}
        </span>
      )}
      <span className="sticker__label">{label}</span>
      {isCustom && onRemove ? (
        <button type="button" className="sticker__remove" onClick={onRemove}>
          Remove
        </button>
      ) : null}
    </article>
  )
}
