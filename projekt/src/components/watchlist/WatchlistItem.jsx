import { ChangeBadge } from '../ui/Badge.jsx'
import MiniSparkline from './MiniSparkline.jsx'
import { formatPrice } from '../../utils/formatters.js'

export default function WatchlistItem({ coin, isSelected, onClick }) {
  const isPositive = coin.change24hPct >= 0

  return (
    <button
      onClick={onClick}
      aria-current={isSelected ? 'true' : undefined}
      aria-label={`${coin.name} auswählen, aktueller Preis ${formatPrice(coin.price)}`}
      className="w-full flex items-center justify-between gap-2 px-3 py-3 rounded-xl transition-all duration-200 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      style={{
        backgroundColor: isSelected ? 'var(--accent-muted)' : 'transparent',
        border: `1px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
      }}
    >
      {/* Left: symbol + name */}
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {coin.symbol}
        </p>
        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
          {coin.name}
        </p>
      </div>

      {/* Center: sparkline */}
      <MiniSparkline data={coin.sparkline7d} isPositive={isPositive} />

      {/* Right: price + change */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {formatPrice(coin.price)}
        </p>
        <ChangeBadge value={coin.change24hPct} className="text-xs justify-end" />
      </div>
    </button>
  )
}
