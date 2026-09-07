import { useState } from 'react'
import type { AppProfile } from '../types/sticker'
import './ProfileScreen.css'

type ProfileScreenProps = {
  profile: AppProfile
  createdCount: number
  addedCount: number
  followingCount: number
  onSave: (profile: AppProfile) => void
}

export function ProfileScreen({
  profile,
  createdCount,
  addedCount,
  followingCount,
  onSave,
}: ProfileScreenProps) {
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)

  return (
    <section className="profile">
      <div className="profile__avatar" aria-hidden="true">
        {draft.name.slice(0, 1).toUpperCase()}
      </div>
      <h1>{draft.name}</h1>
      <p className="profile__handle">@{draft.handle}</p>
      <div className="profile__stats">
        <span>
          <strong>{createdCount}</strong> packs
        </span>
        <span>
          <strong>{addedCount}</strong> added
        </span>
        <span>
          <strong>{followingCount}</strong> following
        </span>
      </div>
      <label className="create__field">
        <span>Name</span>
        <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
      </label>
      <label className="create__field">
        <span>Handle</span>
        <input value={draft.handle} onChange={(event) => setDraft({ ...draft, handle: event.target.value })} />
      </label>
      <label className="create__field">
        <span>Bio</span>
        <input value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} />
      </label>
      <button
        type="button"
        className="profile__save"
        onClick={() => {
          onSave(draft)
          setSaved(true)
        }}
      >
        Save profile
      </button>
      {saved ? <p className="profile__saved">Profile saved on this device.</p> : null}
    </section>
  )
}
