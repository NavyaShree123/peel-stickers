import { useMemo, useState } from 'react'
import type { CreatePackInput } from '../hooks/useStickerApp'
import type { StickerCategory } from '../types/sticker'
import './CreatePackScreen.css'

type DraftSticker = {
  id: string
  file: File
  previewUrl: string
  label: string
  caption: string
  rotation: number
  scale: number
  autoCut: boolean
}

type CreatePackScreenProps = {
  categories: StickerCategory[]
  onClose: () => void
  onCreate: (input: CreatePackInput) => Promise<void>
}

export function CreatePackScreen({ categories, onClose, onCreate }: CreatePackScreenProps) {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [isPrivate, setIsPrivate] = useState(true)
  const [drafts, setDrafts] = useState<DraftSticker[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const editing = useMemo(
    () => drafts.find((draft) => draft.id === editingId) ?? null,
    [drafts, editingId],
  )

  const updateDraft = (id: string, patch: Partial<DraftSticker>) => {
    setDrafts((current) => current.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)))
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const next = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      label: file.name.replace(/\.[^.]+$/, '').slice(0, 40) || 'Sticker',
      caption: '',
      rotation: 0,
      scale: 1,
      autoCut: true,
    }))
    setDrafts((current) => [...current, ...next].slice(0, 30))
    setEditingId(next[0]?.id ?? null)
    setError(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    try {
      await onCreate({
        name,
        categoryId,
        isPrivate,
        stickers: drafts.map((draft) => ({
          label: draft.label,
          file: draft.file,
          caption: draft.caption || undefined,
          rotation: draft.rotation,
          scale: draft.scale,
          autoCut: draft.autoCut,
        })),
      })
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not create pack.')
      setIsSaving(false)
    }
  }

  return (
    <section className="create">
      <header className="create__top">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <strong>New pack</strong>
        <button type="button" className="create__save" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Publish'}
        </button>
      </header>

      <label className="create__field">
        <span>Pack name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Weekend mood" />
      </label>

      <label className="create__field">
        <span>Category</span>
        <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.emoji} {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="create__private">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(event) => setIsPrivate(event.target.checked)}
        />
        Private pack — only you can find it
      </label>

      <label className="create__upload">
        <span>Upload photos or GIFs</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,.png,.jpg,.jpeg,.webp,.gif"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      {error ? <p className="create__error">{error}</p> : null}

      {editing ? (
        <div className="editor">
          <div className="editor__canvas">
            <div
              className={`editor__sticker ${editing.autoCut ? 'is-cut' : ''}`}
              style={{ transform: `rotate(${editing.rotation}deg) scale(${editing.scale})` }}
            >
              <img src={editing.previewUrl} alt={editing.label} />
              {editing.caption ? <span>{editing.caption}</span> : null}
            </div>
          </div>
          <label className="create__field">
            <span>Sticker name</span>
            <input
              value={editing.label}
              onChange={(event) => updateDraft(editing.id, { label: event.target.value })}
            />
          </label>
          <label className="create__field">
            <span>Caption</span>
            <input
              value={editing.caption}
              onChange={(event) => updateDraft(editing.id, { caption: event.target.value })}
              placeholder="OMG"
              maxLength={18}
            />
          </label>
          <label className="create__range">
            <span>Rotate {editing.rotation}°</span>
            <input
              type="range"
              min={-30}
              max={30}
              value={editing.rotation}
              onChange={(event) => updateDraft(editing.id, { rotation: Number(event.target.value) })}
            />
          </label>
          <label className="create__range">
            <span>Size {editing.scale.toFixed(2)}</span>
            <input
              type="range"
              min={0.7}
              max={1.3}
              step={0.01}
              value={editing.scale}
              onChange={(event) => updateDraft(editing.id, { scale: Number(event.target.value) })}
            />
          </label>
          <label className="create__private">
            <input
              type="checkbox"
              checked={editing.autoCut}
              onChange={(event) => updateDraft(editing.id, { autoCut: event.target.checked })}
            />
            Auto Cut background
          </label>
        </div>
      ) : null}

      <div className="create__tray" aria-label="Pack stickers">
        {drafts.map((draft) => (
          <button
            key={draft.id}
            type="button"
            className={draft.id === editingId ? 'is-active' : ''}
            onClick={() => setEditingId(draft.id)}
          >
            <img src={draft.previewUrl} alt={draft.label} />
          </button>
        ))}
        {drafts.length === 0 ? <p>Add photos to start editing stickers.</p> : null}
      </div>
    </section>
  )
}
