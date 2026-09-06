import { render, screen } from '@testing-library/react'
import { StickerPeel } from './StickerPeel'
import React from 'react'

describe('StickerPeel', () => {
  it('renders the sticker label and peel affordance', () => {
    render(
      <StickerPeel
        label="Funny/reaction"
        emoji="😂"
        color="#fef08a"
        gif="/stickers/funny-reaction.gif"
      />,
    )

    expect(screen.getByText('😂 Funny/reaction')).toBeInTheDocument()
    expect(screen.getByText('Drag up to peel')).toBeInTheDocument()
    expect(screen.getByTestId('sticker')).toHaveAttribute(
      'aria-label',
      'Peel 😂 Funny/reaction sticker',
    )
    expect(screen.getByTestId('sticker').querySelector('img')).toHaveAttribute(
      'src',
      '/stickers/funny-reaction.gif',
    )
  })
})
