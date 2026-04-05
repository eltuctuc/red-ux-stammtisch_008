import ThemeToggle from './ThemeToggle.jsx'
import SearchInput from './SearchInput.jsx'

export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header
      className="backdrop-blur-md border-b"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-2xl" aria-hidden="true">◈</span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Crypto<span style={{ color: 'var(--accent)' }}>folio</span>
          </span>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
          <ThemeToggle />
        </div>

      </div>
    </header>
  )
}
