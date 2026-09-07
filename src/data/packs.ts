import type { StickerCategory, StickerPack } from '../types/sticker'

const packAuthors: Record<string, { author: string; authorId: string; downloads: string; likes: number }> = {
  'funny-reaction': { author: 'Meme Lab', authorId: 'meme-lab', downloads: '2.4M', likes: 18240 },
  love: { author: 'Heart Club', authorId: 'heart-club', downloads: '1.8M', likes: 22110 },
  reactions: { author: 'Chat Daily', authorId: 'chat-daily', downloads: '3.1M', likes: 15402 },
  expressions: { author: 'Mood Studio', authorId: 'mood-studio', downloads: '980K', likes: 9330 },
  animals: { author: 'Paws Pack', authorId: 'paws-pack', downloads: '1.2M', likes: 14008 },
  celebration: { author: 'Party Pop', authorId: 'party-pop', downloads: '760K', likes: 8122 },
  'sad-funny': { author: 'Relatable', authorId: 'relatable', downloads: '1.5M', likes: 11990 },
  memes: { author: 'Fire Memes', authorId: 'fire-memes', downloads: '4.0M', likes: 30112 },
}

export function packsFromCategories(categories: StickerCategory[]): StickerPack[] {
  return categories.map((category) => {
    const meta = packAuthors[category.id] ?? {
      author: 'Peel Community',
      authorId: 'community',
      downloads: '120K',
      likes: 2400,
    }

    return {
      id: category.id,
      name: category.name,
      author: meta.author,
      authorId: meta.authorId,
      categoryId: category.id,
      downloads: meta.downloads,
      likes: meta.likes,
      isAnimated: category.stickers.some((sticker) => Boolean(sticker.gif)),
      coverColor: category.stickers[0]?.color ?? '#e2e8f0',
      stickers: category.stickers,
    }
  })
}

export function searchPacks(packs: StickerPack[], query: string): StickerPack[] {
  const needle = query.trim().toLowerCase()
  if (!needle) return packs

  return packs.filter((pack) => {
    const haystack = [
      pack.name,
      pack.author,
      pack.categoryId,
      ...pack.stickers.map((sticker) => sticker.label),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
}
