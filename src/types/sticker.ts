export type StickerItem = {
  id: string
  label: string
  color: string
  emoji?: string
  gif?: string
  image?: string
  isCustom?: boolean
  caption?: string
  rotation?: number
  scale?: number
  autoCut?: boolean
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
  caption?: string
  rotation?: number
  scale?: number
  autoCut?: boolean
}

export type StickerPack = {
  id: string
  name: string
  author: string
  authorId: string
  categoryId: string
  downloads: string
  likes: number
  isAnimated: boolean
  isPrivate?: boolean
  isCustom?: boolean
  coverColor: string
  stickers: StickerItem[]
}

export type UserPackRecord = {
  id: string
  name: string
  author: string
  categoryId: string
  isPrivate: boolean
  stickerIds: string[]
  createdAt: number
}

export type AppProfile = {
  name: string
  handle: string
  bio: string
}
