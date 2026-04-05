import { ChangeBadge } from '../ui/Badge.jsx'
import MiniSparkline from './MiniSparkline.jsx'
import { formatPrice } from '../../utils/formatters.js'

export default function WatchlistCard({ coin, isSelected, onClick }) {
  const isPositive = coin.change24hPct >= 0

  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`${coin.name}, ${formatPrice(coin.price)}`}
      className="shrink-0 w-36 flex flex-col gap-2 p-3 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      style={{
        backgroundColor: isSelected ? 'var(--accent-muted)' : 'var(--bg-surface)',
        border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{coin.symbol}</span>
        <ChangeBadge value={coin.change24hPct} className="text-xs" />
      </div>
      <MiniSparkline data={coin.sparkline7d} isPositive={isPositive} />
      <p className="text-sm font-semibold text-left" style={{ color: 'var(--text-primary)' }}>
        {formatPrice(coin.price)}
      </p>
    </button>
  )
}
