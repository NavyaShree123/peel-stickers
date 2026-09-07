import type { AppProfile, UserPackRecord } from '../types/sticker'

const PACKS_KEY = 'peel-stickers:user-packs'
const ADDED_KEY = 'peel-stickers:added-packs'
const FOLLOWS_KEY = 'peel-stickers:follows'
const PROFILE_KEY = 'peel-stickers:profile'

const defaultProfile: AppProfile = {
  name: 'You',
  handle: 'you',
  bio: 'Making stickers for chats',
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readUserPacks(): UserPackRecord[] {
  const parsed = readJson<UserPackRecord[]>(PACKS_KEY, [])
  return Array.isArray(parsed) ? parsed : []
}

export function saveUserPacks(packs: UserPackRecord[]) {
  localStorage.setItem(PACKS_KEY, JSON.stringify(packs))
}

export function addUserPack(pack: UserPackRecord) {
  saveUserPacks([...readUserPacks(), pack])
}

export function removeUserPack(id: string) {
  saveUserPacks(readUserPacks().filter((pack) => pack.id !== id))
}

export function readAddedPackIds(): string[] {
  const parsed = readJson<string[]>(ADDED_KEY, [])
  return Array.isArray(parsed) ? parsed : []
}

export function saveAddedPackIds(ids: string[]) {
  localStorage.setItem(ADDED_KEY, JSON.stringify(ids))
}

export function toggleAddedPack(id: string): string[] {
  const current = readAddedPackIds()
  const next = current.includes(id) ? current.filter((packId) => packId !== id) : [...current, id]
  saveAddedPackIds(next)
  return next
}

export function readFollows(): string[] {
  const parsed = readJson<string[]>(FOLLOWS_KEY, [])
  return Array.isArray(parsed) ? parsed : []
}

export function toggleFollow(authorId: string): string[] {
  const current = readFollows()
  const next = current.includes(authorId)
    ? current.filter((id) => id !== authorId)
    : [...current, authorId]
  localStorage.setItem(FOLLOWS_KEY, JSON.stringify(next))
  return next
}

export function readProfile(): AppProfile {
  return { ...defaultProfile, ...readJson<Partial<AppProfile>>(PROFILE_KEY, {}) }
}

export function saveProfile(profile: AppProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}
