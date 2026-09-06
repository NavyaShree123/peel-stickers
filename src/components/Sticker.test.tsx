import { render, screen } from '@testing-library/react'
import { Sticker } from './Sticker'
import React from 'react'

describe('Sticker', () => {
  it('renders an emoji sticker', () => {
    render(<Sticker label="LOL" emoji="😂" color="#fef08a" />)

    expect(screen.getByText('LOL')).toBeInTheDocument()
    expect(screen.getByText('😂')).toBeInTheDocument()
    expect(screen.getByTestId('sticker')).toHaveAttribute('aria-label', '😂 LOL')
  })

  it('renders a gif sticker', () => {
    render(
      <Sticker label="Laughing GIF" color="#facc15" gif="/stickers/funny-reaction.gif" />,
    )

    expect(screen.getByText('Laughing GIF')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Laughing GIF' })).toHaveAttribute(
      'src',
      '/stickers/funny-reaction.gif',
    )
  })
})
