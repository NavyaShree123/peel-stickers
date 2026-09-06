import { render, screen } from '@testing-library/react'
import { StickerPeel } from './StickerPeel'
import React from 'react'

describe('StickerPeel', () => {
  it('renders the sticker label and peel affordance', () => {
    render(<StickerPeel label="Sparkle" emoji="✨" color="#fbbf24" />)

    expect(screen.getByText('Sparkle')).toBeInTheDocument()
    expect(screen.getByText('Drag up to peel')).toBeInTheDocument()
    expect(screen.getByTestId('sticker')).toHaveAttribute('aria-label', 'Peel Sparkle sticker')
  })
})
