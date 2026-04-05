import ThemeToggle from './ThemeToggle.jsx'
import SearchInput from './SearchInput.jsx'

export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header
      role="banner"
      className="backdrop-blur-md border-b"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        Zum Hauptinhalt
      </a>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">

        {/* Logo – always left */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl shrink-0" aria-hidden="true">◈</span>
          <span
            className="text-xl font-bold tracking-tight whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            Crypto<span style={{ color: 'var(--accent)' }}>folio</span>
          </span>
        </div>

        {/* Theme toggle – right on mobile (order-2), right on desktop */}
        <div className="order-2 sm:order-3 shrink-0">
          <ThemeToggle />
        </div>

        {/* Search – full width on mobile (order-3 = second row), auto width on sm+ */}
        <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-xs">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>

      </div>
    </header>
  )
}
