import GlassCard from '../ui/GlassCard.jsx'
import WatchlistItem from './WatchlistItem.jsx'
import WatchlistCard from './WatchlistCard.jsx'
import { coins } from '../../data/coins.js'

export default function WatchlistSidebar({ selectedCoin, onCoinSelect, searchQuery }) {
  const filtered = searchQuery.trim()
    ? coins.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coins

  return (
    <>
      {/* Desktop sidebar list */}
      <GlassCard className="hidden lg:block !p-3">
        <h2 className="text-sm font-semibold px-3 mb-2" style={{ color: 'var(--text-secondary)' }}>
          Watchlist
        </h2>
        {filtered.length === 0 ? (
          <p className="px-3 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Keine Ergebnisse
          </p>
        ) : (
          <div className="flex flex-col gap-0.5">
            {filtered.map(coin => (
              <WatchlistItem
                key={coin.id}
                coin={coin}
                isSelected={selectedCoin?.id === coin.id}
                onClick={() => onCoinSelect(coin)}
              />
            ))}
          </div>
        )}
      </GlassCard>

      {/* Mobile horizontal strip */}
      <div className="lg:hidden">
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
          Watchlist
        </h2>
        <div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          role="list"
          aria-label="Watchlist"
        >
          {filtered.map(coin => (
            <WatchlistCard
              key={coin.id}
              coin={coin}
              isSelected={selectedCoin?.id === coin.id}
              onClick={() => onCoinSelect(coin)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
