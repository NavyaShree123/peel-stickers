import { useCallback, useRef, useState } from 'react'
import './StickerPeel.css'

type StickerPeelProps = {
  label: string
  emoji: string
  color: string
}

export function StickerPeel({ label, emoji, color }: StickerPeelProps) {
  const [peelAmount, setPeelAmount] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const startPeel = useRef(0)

  const clampPeel = (value: number) => Math.min(100, Math.max(0, value))

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      setIsDragging(true)
      startY.current = event.clientY
      startPeel.current = peelAmount
    },
    [peelAmount],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      const delta = startY.current - event.clientY
      setPeelAmount(clampPeel(startPeel.current + delta * 0.35))
    },
    [isDragging],
  )

  const finishDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return
      event.currentTarget.releasePointerCapture(event.pointerId)
      setIsDragging(false)
      setPeelAmount((current) => (current > 55 ? 100 : 0))
    },
    [isDragging],
  )

  const reset = useCallback(() => setPeelAmount(0), [])

  const peelRadians = (peelAmount / 100) * 1.15

  return (
    <article className="sticker-card" style={{ '--sticker-color': color } as React.CSSProperties}>
      <div className="sticker__surface" aria-hidden="true" />
      <div
        className={`sticker ${peelAmount >= 100 ? 'sticker--removed' : ''}`}
        style={{
          transform: `rotateX(${peelRadians}rad)`,
          opacity: peelAmount >= 100 ? 0 : 1,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        role="button"
        tabIndex={0}
        aria-label={`Peel ${label} sticker`}
        data-testid="sticker"
      >
        <span className="sticker__emoji" aria-hidden="true">
          {emoji}
        </span>
        <span className="sticker__label">{label}</span>
        <span className="sticker__hint">Drag up to peel</span>
      </div>
      {peelAmount >= 100 ? (
        <button type="button" className="sticker__reset" onClick={reset}>
          Place sticker again
        </button>
      ) : null}
    </article>
  )
}
