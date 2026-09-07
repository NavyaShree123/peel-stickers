import { beforeEach, describe, expect, it } from 'vitest'
import {
  addUserPack,
  readAddedPackIds,
  readFollows,
  readProfile,
  readUserPacks,
  saveProfile,
  toggleAddedPack,
  toggleFollow,
} from './userPacksStorage'

beforeEach(() => {
  localStorage.clear()
})

describe('userPacksStorage', () => {
  it('saves created packs and WhatsApp library ids', () => {
    addUserPack({
      id: 'pack-1',
      name: 'Weekend Mood',
      author: 'You',
      categoryId: 'memes',
      isPrivate: true,
      stickerIds: ['upload-1'],
      createdAt: 1,
    })

    expect(readUserPacks()[0]?.name).toBe('Weekend Mood')
    expect(toggleAddedPack('love')).toEqual(['love'])
    expect(readAddedPackIds()).toEqual(['love'])
    expect(toggleAddedPack('love')).toEqual([])
  })

  it('tracks followed creators and profile edits', () => {
    expect(toggleFollow('meme-lab')).toEqual(['meme-lab'])
    expect(readFollows()).toEqual(['meme-lab'])
    saveProfile({ name: 'Maya', handle: 'maya.stickers', bio: 'Pets and memes' })
    expect(readProfile().handle).toBe('maya.stickers')
  })
})
