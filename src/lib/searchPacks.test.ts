import { describe, expect, it } from 'vitest'
import { packsFromCategories, searchPacks } from '../data/packs'
import { stickerCategories } from '../data/stickers'

describe('packsFromCategories', () => {
  it('turns each category into a WhatsApp-style sticker pack', () => {
    const packs = packsFromCategories(stickerCategories)
    const love = packs.find((pack) => pack.id === 'love')

    expect(packs).toHaveLength(stickerCategories.length)
    expect(love?.author).toBe('Heart Club')
    expect(love?.isAnimated).toBe(true)
    expect(love?.stickers.some((sticker) => sticker.label === 'Heart')).toBe(true)
  })
})

describe('searchPacks', () => {
  it('filters packs by name, author, or sticker label', () => {
    const packs = packsFromCategories(stickerCategories)

    expect(searchPacks(packs, 'panda').map((pack) => pack.id)).toEqual(['animals'])
    expect(searchPacks(packs, 'fire memes').map((pack) => pack.id)).toEqual(['memes'])
    expect(searchPacks(packs, '   ')).toHaveLength(packs.length)
  })
})
