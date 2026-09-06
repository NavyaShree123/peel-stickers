import type { StickerCategory, StickerItem, UploadedStickerRecord } from '../types/sticker'

const STORAGE_KEY = 'peel-stickers:uploads'
const MAX_FILE_SIZE_BYTES = 1024 * 1024

export function readUploadedStickers(): UploadedStickerRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as UploadedStickerRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveUploadedStickers(stickers: UploadedStickerRecord[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers))
  } catch {
    throw new Error('Could not save sticker. The file may be too large for browser storage.')
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Could not read file'))
      }
    }
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.readAsDataURL(file)
  })
}

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif'])

function fileExtension(name: string) {
  const dotIndex = name.lastIndexOf('.')
  return dotIndex === -1 ? '' : name.slice(dotIndex).toLowerCase()
}

export function validateUploadFile(file: File): string | null {
  const extension = fileExtension(file.name)
  const hasAllowedType = file.type.startsWith('image/')
  const hasAllowedExtension = ALLOWED_EXTENSIONS.has(extension)

  if (!hasAllowedType && !hasAllowedExtension) {
    return 'Choose a PNG, JPG, WebP, or GIF file.'
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'File must be 1 MB or smaller.'
  }
  return null
}

export function uploadedRecordToStickerItem(record: UploadedStickerRecord): StickerItem {
  const isGif = record.mimeType === 'image/gif'
  return {
    id: record.id,
    label: record.label,
    color: '#e2e8f0',
    isCustom: true,
    ...(isGif ? { gif: record.dataUrl } : { image: record.dataUrl }),
  }
}

export function mergeCategoriesWithUploads(
  categories: StickerCategory[],
  uploads: UploadedStickerRecord[],
): StickerCategory[] {
  const uploadsByCategory = uploads.reduce<Record<string, StickerItem[]>>((groups, record) => {
    const item = uploadedRecordToStickerItem(record)
    groups[record.categoryId] = [...(groups[record.categoryId] ?? []), item]
    return groups
  }, {})

  return categories.map((category) => ({
    ...category,
    stickers: [...category.stickers, ...(uploadsByCategory[category.id] ?? [])],
  }))
}

export async function addUploadedSticker(input: {
  categoryId: string
  label: string
  file: File
}): Promise<UploadedStickerRecord> {
  const validationError = validateUploadFile(input.file)
  if (validationError) {
    throw new Error(validationError)
  }

  const trimmedLabel = input.label.trim()
  if (!trimmedLabel) {
    throw new Error('Enter a sticker name.')
  }

  const dataUrl = await fileToDataUrl(input.file)
  const mimeType =
    input.file.type ||
    ({
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    }[fileExtension(input.file.name)] ??
      'application/octet-stream')

  const record: UploadedStickerRecord = {
    id: `upload-${crypto.randomUUID()}`,
    categoryId: input.categoryId,
    label: trimmedLabel,
    dataUrl,
    mimeType,
    createdAt: Date.now(),
  }

  const next = [...readUploadedStickers(), record]
  saveUploadedStickers(next)
  return record
}

export function removeUploadedSticker(id: string) {
  const next = readUploadedStickers().filter((sticker) => sticker.id !== id)
  saveUploadedStickers(next)
}
