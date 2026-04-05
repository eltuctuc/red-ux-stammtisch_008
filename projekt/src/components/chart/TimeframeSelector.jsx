const TIMEFRAMES = [
  { key: '1T', label: '1T' },
  { key: '1W', label: '1W' },
  { key: '1M', label: '1M' },
  { key: '3M', label: '3M' },
]

export default function TimeframeSelector({ selected, onChange }) {
  return (
    <div
      className="flex rounded-xl overflow-hidden border"
      style={{ borderColor: 'var(--border)' }}
      role="group"
      aria-label="Zeitraum auswählen"
    >
      {TIMEFRAMES.map(({ key, label }) => {
        const isActive = selected === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className="px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]"
            style={{
              backgroundColor: isActive ? 'var(--accent)' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-secondary)',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
