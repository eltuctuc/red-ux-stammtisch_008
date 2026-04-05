export default function SearchInput({ value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Suchen…"
        aria-label="Coins suchen"
        className="pl-9 pr-4 py-2 rounded-xl text-sm w-40 sm:w-56 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}
