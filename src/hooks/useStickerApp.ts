import { useCallback, useMemo, useState } from 'react'
import { packsFromCategories } from '../data/packs'
import { stickerCategories as defaultCategories } from '../data/stickers'
import {
  addUploadedSticker,
  mergeCategoriesWithUploads,
  readUploadedStickers,
  removeUploadedSticker,
  uploadedRecordToStickerItem,
} from '../lib/uploadedStickersStorage'
import {
  addUserPack,
  readAddedPackIds,
  readFollows,
  readProfile,
  readUserPacks,
  removeUserPack,
  saveAddedPackIds,
  saveProfile,
  toggleAddedPack,
  toggleFollow,
} from '../lib/userPacksStorage'
import type { AppProfile, StickerPack, UserPackRecord } from '../types/sticker'

export type CreatePackInput = {
  name: string
  categoryId: string
  isPrivate: boolean
  stickers: Array<{
    label: string
    file: File
    caption?: string
    rotation?: number
    scale?: number
    autoCut?: boolean
  }>
}

export function useStickerApp() {
  const [uploads, setUploads] = useState(readUploadedStickers)
  const [userPacks, setUserPacks] = useState(readUserPacks)
  const [addedPackIds, setAddedPackIds] = useState(readAddedPackIds)
  const [follows, setFollows] = useState(readFollows)
  const [profile, setProfile] = useState(readProfile)

  const categories = useMemo(() => {
    const privateStickerIds = new Set(
      userPacks.filter((pack) => pack.isPrivate).flatMap((pack) => pack.stickerIds),
    )
    const visibleUploads = uploads.filter((record) => !privateStickerIds.has(record.id))
    return mergeCategoriesWithUploads(defaultCategories, visibleUploads)
  }, [uploads, userPacks])

  const communityPacks = useMemo(() => packsFromCategories(categories), [categories])

  const createdPacks: StickerPack[] = useMemo(() => {
    return userPacks.map((pack) => {
      const stickers = uploads
        .filter((record) => pack.stickerIds.includes(record.id))
        .map(uploadedRecordToStickerItem)

      return {
        id: pack.id,
        name: pack.name,
        author: pack.author,
        authorId: 'you',
        categoryId: pack.categoryId,
        downloads: '0',
        likes: 0,
        isAnimated: stickers.some((sticker) => Boolean(sticker.gif)),
        isPrivate: pack.isPrivate,
        isCustom: true,
        coverColor: stickers[0]?.color ?? '#dbeafe',
        stickers,
      }
    })
  }, [userPacks, uploads])

  const allPacks = useMemo(
    () => [...createdPacks, ...communityPacks],
    [createdPacks, communityPacks],
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

  const createPack = useCallback(
    async (input: CreatePackInput) => {
      if (!input.name.trim()) {
        throw new Error('Name your sticker pack.')
      }
      if (input.stickers.length === 0) {
        throw new Error('Add at least one sticker.')
      }
      if (input.stickers.length > 30) {
        throw new Error('A pack can have up to 30 stickers.')
      }

      const records: Awaited<ReturnType<typeof addUploadedSticker>>[] = []
      for (const sticker of input.stickers) {
        records.push(
          await addUploadedSticker({
            categoryId: input.categoryId,
            label: sticker.label,
            file: sticker.file,
            caption: sticker.caption,
            rotation: sticker.rotation,
            scale: sticker.scale,
            autoCut: sticker.autoCut,
          }),
        )
      }

      const pack: UserPackRecord = {
        id: `pack-${crypto.randomUUID()}`,
        name: input.name.trim(),
        author: profile.name,
        categoryId: input.categoryId,
        isPrivate: input.isPrivate,
        stickerIds: records.map((record) => record.id),
        createdAt: Date.now(),
      }

      addUserPack(pack)
      setUploads((current) => [...current, ...records])
      setUserPacks((current) => [...current, pack])
      setAddedPackIds(toggleAddedPack(pack.id))
      return pack
    },
    [profile.name],
  )

  const deletePack = useCallback((id: string) => {
    const pack = readUserPacks().find((item) => item.id === id)
    pack?.stickerIds.forEach(removeUploadedSticker)
    removeUserPack(id)
    setUserPacks((current) => current.filter((item) => item.id !== id))
    setUploads(readUploadedStickers())
    const nextAdded = readAddedPackIds().filter((packId) => packId !== id)
    saveAddedPackIds(nextAdded)
    setAddedPackIds(nextAdded)
  }, [])

  const addPackToWhatsApp = useCallback((id: string) => {
    setAddedPackIds(toggleAddedPack(id))
  }, [])

  const followCreator = useCallback((authorId: string) => {
    setFollows(toggleFollow(authorId))
  }, [])

  const updateProfile = useCallback((next: AppProfile) => {
    saveProfile(next)
    setProfile(next)
  }, [])

  return {
    categories,
    allPacks,
    createdPacks,
    addedPackIds,
    follows,
    profile,
    uploadSticker,
    deleteSticker,
    createPack,
    deletePack,
    addPackToWhatsApp,
    followCreator,
    updateProfile,
  }
}
