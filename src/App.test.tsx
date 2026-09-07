import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import React from 'react'
import App from './App'

beforeEach(() => {
  localStorage.clear()
})

describe('Peel.ly app', () => {
  it('shows a Sticker.ly-style home feed with packs and tabs', () => {
    render(<App />)

    expect(screen.getByText('Peel.ly')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'For You' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'Open Love' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Add' }).length).toBeGreaterThan(0)
  })

  it('opens a pack, adds it to WhatsApp, and lists it in My Stickers', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Open Love' }))
    expect(screen.getByRole('heading', { name: 'Love' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Add to WhatsApp' }))
    expect(screen.getByRole('button', { name: 'Added to WhatsApp' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    fireEvent.click(screen.getByRole('button', { name: 'My Stickers' }))
    expect(screen.getByRole('heading', { name: 'My Stickers' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Love' })).toBeInTheDocument()
  })

  it('filters search results', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    fireEvent.change(screen.getByPlaceholderText('Search packs, creators, memes'), {
      target: { value: 'panda' },
    })
    expect(screen.getByRole('button', { name: 'Open Animals' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open Love' })).not.toBeInTheDocument()
  })
})
