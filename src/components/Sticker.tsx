import './Sticker.css'
import type { StickerItem } from '../types/sticker'

type StickerProps = StickerItem & {
  compact?: boolean
  onRemove?: () => void
  onSelect?: () => void
}

export function Sticker({
  label,
  emoji,
  gif,
  image,
  isCustom,
  caption,
  rotation = 0,
  scale = 1,
  autoCut,
  compact,
  onRemove,
  onSelect,
}: StickerProps) {
  const ariaLabel = emoji ? `${emoji} ${label}` : label
  const mediaSrc = gif ?? image
  const className = [
    'sticker-card',
    compact ? 'sticker-card--compact' : '',
    onSelect ? 'sticker-card--button' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={className}
      aria-label={ariaLabel}
      data-testid="sticker"
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect()
              }
            }
          : undefined
      }
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      <div
        className={`sticker__stage ${autoCut ? 'sticker__stage--cut' : ''}`}
        style={{ transform: `rotate(${rotation}deg) scale(${scale})` }}
      >
        {mediaSrc ? (
          <img className="sticker__media" src={mediaSrc} alt={label} />
        ) : (
          <span className="sticker__emoji" aria-hidden="true">
            {emoji}
          </span>
        )}
        {caption ? <span className="sticker__caption">{caption}</span> : null}
      </div>
      {compact ? null : <span className="sticker__label">{label}</span>}
      {isCustom && onRemove ? (
        <button
          type="button"
          className="sticker__remove"
          onClick={(event) => {
            event.stopPropagation()
            onRemove()
          }}
        >
          Remove
        </button>
      ) : null}
    </article>
  )
}
