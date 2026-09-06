import { useState } from 'react'
import type { StickerCategory } from '../types/sticker'
import './UploadStickerForm.css'

type UploadStickerFormProps = {
  categories: StickerCategory[]
  onUpload: (input: { categoryId: string; label: string; file: File }) => Promise<void>
}

export function UploadStickerForm({ categories, onUpload }: UploadStickerFormProps) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [label, setLabel] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null
    setFile(nextFile)
    setError(null)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      setError('Choose a sticker image or GIF to upload.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await onUpload({ categoryId, label, file })
      setLabel('')
      setFile(null)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      setPreviewUrl(null)
      event.currentTarget.reset()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="upload" aria-labelledby="upload-title">
      <div className="upload__intro">
        <h2 id="upload-title">Upload a sticker</h2>
        <p>Add a PNG, JPG, WebP, or GIF to any category. Uploads are saved in this browser.</p>
      </div>

      <form className="upload__form" onSubmit={handleSubmit}>
        <label className="upload__field">
          <span>Category</span>
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={isSubmitting}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.emoji} {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="upload__field">
          <span>Sticker name</span>
          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="My sticker"
            maxLength={40}
            disabled={isSubmitting}
          />
        </label>

        <label className="upload__field">
          <span>Image or GIF</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
        </label>

        {previewUrl ? (
          <div className="upload__preview">
            <img src={previewUrl} alt="Upload preview" />
          </div>
        ) : null}

        {error ? <p className="upload__error">{error}</p> : null}

        <button type="submit" className="upload__submit" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading…' : 'Add sticker'}
        </button>
      </form>
    </section>
  )
}
