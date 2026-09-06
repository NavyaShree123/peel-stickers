import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Sticker } from './Sticker'
import React from 'react'

describe('Sticker', () => {
  it('renders an emoji sticker', () => {
    render(<Sticker label="LOL" emoji="😂" color="#fef08a" />)

    expect(screen.getByText('LOL')).toBeInTheDocument()
    expect(screen.getByText('😂')).toBeInTheDocument()
  })

  it('renders a gif sticker', () => {
    render(
      <Sticker label="Laughing GIF" color="#facc15" gif="/stickers/funny-reaction.gif" />,
    )

    expect(screen.getByRole('img', { name: 'Laughing GIF' })).toHaveAttribute(
      'src',
      '/stickers/funny-reaction.gif',
    )
  })

  it('renders remove button for custom stickers', () => {
    const onRemove = vi.fn()

    render(
      <Sticker
        label="Custom"
        color="#e2e8f0"
        image="data:image/png;base64,abc"
        isCustom
        onRemove={onRemove}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})
