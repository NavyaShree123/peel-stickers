import { useMemo, useState } from 'react'
import { BottomNav, type AppTab } from './components/BottomNav'
import { Sticker } from './components/Sticker'
import { useStickerApp } from './hooks/useStickerApp'
import { CreatePackScreen } from './screens/CreatePackScreen'
import { HomeScreen, type HomeFeed } from './screens/HomeScreen'
import { LibraryScreen } from './screens/LibraryScreen'
import { PackDetailScreen } from './screens/PackDetailScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { SearchScreen } from './screens/SearchScreen'
import './App.css'

type Overlay =
  | { type: 'pack'; id: string }
  | { type: 'create' }
  | { type: 'sticker'; packId: string; stickerId: string }

function App() {
  const app = useStickerApp()
  const [tab, setTab] = useState<AppTab>('home')
  const [feed, setFeed] = useState<HomeFeed>('for-you')
  const [overlay, setOverlay] = useState<Overlay | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 2200)
  }

  const openPack = (id: string) => setOverlay({ type: 'pack', id })
  const selectedPack = useMemo(() => {
    if (overlay?.type === 'pack') {
      return app.allPacks.find((pack) => pack.id === overlay.id)
    }
    if (overlay?.type === 'sticker') {
      return app.allPacks.find((pack) => pack.id === overlay.packId)
    }
    return undefined
  }, [app.allPacks, overlay])

  const selectedSticker =
    overlay?.type === 'sticker'
      ? selectedPack?.stickers.find((sticker) => sticker.id === overlay.stickerId)
      : undefined

  const addPack = (id: string) => {
    const alreadyAdded = app.addedPackIds.includes(id)
    app.addPackToWhatsApp(id)
    showToast(alreadyAdded ? 'Removed from WhatsApp' : 'Added to WhatsApp')
  }

  const sharePack = async (id: string) => {
    const url = `${window.location.origin}/?pack=${id}`
    try {
      await navigator.clipboard.writeText(url)
      showToast('Share link copied')
    } catch {
      showToast(url)
    }
  }

  return (
    <div className="phone">
      <header className="phone__header">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <strong>Peel.ly</strong>
        </div>
        <p>Sticker maker for chats</p>
      </header>

      <main className="phone__body">
        {overlay?.type === 'create' ? (
          <CreatePackScreen
            categories={app.categories}
            onClose={() => setOverlay(null)}
            onCreate={async (input) => {
              const pack = await app.createPack(input)
              setOverlay({ type: 'pack', id: pack.id })
              setTab('library')
              showToast('Pack published')
            }}
          />
        ) : overlay?.type === 'pack' && selectedPack ? (
          <PackDetailScreen
            pack={selectedPack}
            added={app.addedPackIds.includes(selectedPack.id)}
            following={app.follows.includes(selectedPack.authorId)}
            onBack={() => setOverlay(null)}
            onAdd={() => addPack(selectedPack.id)}
            onFollow={() => app.followCreator(selectedPack.authorId)}
            onShare={() => sharePack(selectedPack.id)}
            onSelectSticker={(stickerId) =>
              setOverlay({ type: 'sticker', packId: selectedPack.id, stickerId })
            }
            onDelete={
              selectedPack.isCustom
                ? () => {
                    app.deletePack(selectedPack.id)
                    setOverlay(null)
                    showToast('Pack deleted')
                  }
                : undefined
            }
          />
        ) : tab === 'search' ? (
          <SearchScreen
            packs={app.allPacks}
            addedPackIds={app.addedPackIds}
            onOpenPack={openPack}
            onAddPack={addPack}
          />
        ) : tab === 'library' ? (
          <LibraryScreen
            packs={app.allPacks}
            addedPackIds={app.addedPackIds}
            onOpenPack={openPack}
            onAddPack={addPack}
          />
        ) : tab === 'profile' ? (
          <ProfileScreen
            profile={app.profile}
            createdCount={app.createdPacks.length}
            addedCount={app.addedPackIds.length}
            followingCount={app.follows.length}
            onSave={app.updateProfile}
          />
        ) : (
          <HomeScreen
            packs={app.allPacks}
            addedPackIds={app.addedPackIds}
            feed={feed}
            onFeed={setFeed}
            onOpenPack={openPack}
            onAddPack={addPack}
          />
        )}
      </main>

      {overlay?.type === 'sticker' && selectedPack && selectedSticker ? (
        <div className="lightbox" role="dialog" aria-label={selectedSticker.label}>
          <Sticker {...selectedSticker} />
          <button
            type="button"
            onClick={() => setOverlay({ type: 'pack', id: selectedPack.id })}
          >
            Close
          </button>
        </div>
      ) : null}

      {toast ? (
        <p className="toast" role="status">
          {toast}
        </p>
      ) : null}

      {overlay?.type === 'create' ? null : (
        <BottomNav tab={tab} onTab={(next) => {
          setOverlay(null)
          setTab(next)
        }} onCreate={() => setOverlay({ type: 'create' })} />
      )}
    </div>
  )
}

export default App
