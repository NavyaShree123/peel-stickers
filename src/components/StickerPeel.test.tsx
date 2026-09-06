import { render, screen } from '@testing-library/react'
import { StickerPeel } from './StickerPeel'
import React from 'react'

describe('StickerPeel', () => {
  it('renders an emoji sticker', () => {
    render(<StickerPeel label="LOL" emoji="😂" color="#fef08a" />)

    expect(screen.getByText('LOL')).toBeInTheDocument()
    expect(screen.getByText('😂')).toBeInTheDocument()
    expect(screen.getByTestId('sticker')).toHaveAttribute('aria-label', 'Peel 😂 LOL sticker')
  })

  it('renders a gif sticker', () => {
    render(
      <StickerPeel
        label="Laughing GIF"
        color="#facc15"
        gif="/stickers/funny-reaction.gif"
      />,
    )

    expect(screen.getByText('Laughing GIF')).toBeInTheDocument()
    expect(screen.getByTestId('sticker')).toHaveAttribute('aria-label', 'Peel Laughing GIF sticker')
    expect(screen.getByTestId('sticker').querySelector('img')).toHaveAttribute(
      'src',
      '/stickers/funny-reaction.gif',
    )
  })
})
