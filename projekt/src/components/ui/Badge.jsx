export function ChangeBadge({ value, className = '' }) {
  const isPositive = value > 0
  const isNeutral = value === 0

  if (isNeutral) {
    return (
      <span className={`inline-flex items-center gap-1 text-[var(--text-secondary)] ${className}`}>
        – 0.00%
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-0.5 font-medium
      ${isPositive ? 'text-[var(--green)]' : 'text-[var(--red)]'} ${className}`}>
      {isPositive ? '↑' : '↓'}
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  )
}

export function TypeBadge({ type }) {
  const isBuy = type === 'buy'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
      ${isBuy
        ? 'bg-[var(--green-bg)] text-[var(--green)]'
        : 'bg-[var(--red-bg)] text-[var(--red)]'
      }`}>
      {isBuy ? '↑' : '↓'} {isBuy ? 'Kauf' : 'Verkauf'}
    </span>
  )
}
