import { useCallback, useMemo, useState } from 'react'
import { stickerCategories as defaultCategories } from '../data/stickers'
import {
  addUploadedSticker,
  mergeCategoriesWithUploads,
  readUploadedStickers,
  removeUploadedSticker,
} from '../lib/uploadedStickersStorage'
import type { StickerCategory } from '../types/sticker'

export function useStickerCategories() {
  const [uploads, setUploads] = useState(readUploadedStickers)

  const categories = useMemo(
    () => mergeCategoriesWithUploads(defaultCategories, uploads),
    [uploads],
  )

  const uploadSticker = useCallback(
    async (input: { categoryId: string; label: string; file: File }) => {
      const record = await addUploadedSticker(input)
      setUploads((current) => [...current, record])
      return record
    },
    [],
  )

  const deleteSticker = useCallback((id: string) => {
    removeUploadedSticker(id)
    setUploads((current) => current.filter((sticker) => sticker.id !== id))
  }, [])

  return { categories, uploadSticker, deleteSticker }
}

export type { StickerCategory }
