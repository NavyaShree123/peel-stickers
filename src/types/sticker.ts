export type StickerItem = {
  id: string
  label: string
  color: string
  emoji?: string
  gif?: string
  image?: string
  isCustom?: boolean
}

export type StickerCategory = {
  id: string
  emoji: string
  name: string
  stickers: StickerItem[]
}

export type UploadedStickerRecord = {
  id: string
  categoryId: string
  label: string
  dataUrl: string
  mimeType: string
  createdAt: number
}
