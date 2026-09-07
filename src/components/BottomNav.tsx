import './BottomNav.css'

export type AppTab = 'home' | 'search' | 'library' | 'profile'

type BottomNavProps = {
  tab: AppTab
  onTab: (tab: AppTab) => void
  onCreate: () => void
}

const items: Array<{ id: AppTab; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'search', label: 'Search', icon: '⌕' },
]

export function BottomNav({ tab, onTab, onCreate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav__item ${tab === item.id ? 'is-active' : ''}`}
          onClick={() => onTab(item.id)}
        >
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </button>
      ))}
      <button type="button" className="bottom-nav__create" onClick={onCreate} aria-label="Create sticker pack">
        +
      </button>
      <button
        type="button"
        className={`bottom-nav__item ${tab === 'library' ? 'is-active' : ''}`}
        onClick={() => onTab('library')}
      >
        <span aria-hidden="true">▣</span>
        My Stickers
      </button>
      <button
        type="button"
        className={`bottom-nav__item ${tab === 'profile' ? 'is-active' : ''}`}
        onClick={() => onTab('profile')}
      >
        <span aria-hidden="true">●</span>
        Profile
      </button>
    </nav>
  )
}
