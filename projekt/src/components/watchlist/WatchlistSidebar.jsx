import GlassCard from '../ui/GlassCard.jsx'
import WatchlistItem from './WatchlistItem.jsx'
import WatchlistCard from './WatchlistCard.jsx'
import { coins } from '../../data/coins.js'

function useFilteredCoins(searchQuery) {
  return searchQuery.trim()
    ? coins.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coins
}

export function WatchlistDesktop({ selectedCoin, onCoinSelect, searchQuery }) {
  const filtered = useFilteredCoins(searchQuery)

  return (
    <GlassCard className="!p-3">
      <h2 className="text-sm font-semibold px-3 mb-2" style={{ color: 'var(--text-secondary)' }}>
        Watchlist
      </h2>
      {filtered.length === 0 ? (
        <p className="px-3 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          Keine Ergebnisse
        </p>
      ) : (
        <div className="flex flex-col gap-0.5" role="list" aria-label="Watchlist">
          {filtered.map(coin => (
            <div key={coin.id} role="listitem">
              <WatchlistItem
                coin={coin}
                isSelected={selectedCoin?.id === coin.id}
                onClick={() => onCoinSelect(coin)}
              />
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  )
}

export function WatchlistMobile({ selectedCoin, onCoinSelect, searchQuery }) {
  const filtered = useFilteredCoins(searchQuery)

  return (
    <div>
      <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
        Watchlist
      </h2>
      {filtered.length === 0 ? (
        <p className="py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
          Keine Ergebnisse
        </p>
      ) : (
        <div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          role="list"
          aria-label="Watchlist"
        >
          {filtered.map(coin => (
            <div key={coin.id} role="listitem" className="shrink-0">
              <WatchlistCard
                coin={coin}
                isSelected={selectedCoin?.id === coin.id}
                onClick={() => onCoinSelect(coin)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
