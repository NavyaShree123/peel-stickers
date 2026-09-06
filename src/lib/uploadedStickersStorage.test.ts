import { describe, expect, it, beforeEach } from 'vitest'
import {
  addUploadedSticker,
  mergeCategoriesWithUploads,
  readUploadedStickers,
  removeUploadedSticker,
  uploadedRecordToStickerItem,
  validateUploadFile,
} from './uploadedStickersStorage'
import { stickerCategories } from '../data/stickers'

beforeEach(() => {
  localStorage.clear()
})

describe('uploadedStickersStorage', () => {
  it('validates image uploads', () => {
    const png = new File(['x'], 'sticker.png', { type: 'image/png' })
    const text = new File(['x'], 'notes.txt', { type: 'text/plain' })

    expect(validateUploadFile(png)).toBeNull()
    expect(validateUploadFile(text)).toBe('Choose an image or GIF file.')
  })

  it('stores and merges uploaded stickers into categories', async () => {
    const file = new File([Uint8Array.from([1, 2, 3])], 'party.gif', { type: 'image/gif' })

    const record = await addUploadedSticker({
      categoryId: 'celebration',
      label: 'My GIF',
      file,
    })

    expect(readUploadedStickers()).toHaveLength(1)
    expect(record.mimeType).toBe('image/gif')
    expect(uploadedRecordToStickerItem(record).gif).toMatch(/^data:image\/gif/)

    const merged = mergeCategoriesWithUploads(stickerCategories, [record])
    const celebration = merged.find((category) => category.id === 'celebration')
    expect(celebration?.stickers.some((sticker) => sticker.label === 'My GIF')).toBe(true)

    removeUploadedSticker(record.id)
    expect(readUploadedStickers()).toHaveLength(0)
  })
})
