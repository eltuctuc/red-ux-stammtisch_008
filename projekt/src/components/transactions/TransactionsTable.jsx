import GlassCard from '../ui/GlassCard.jsx'
import { TypeBadge } from '../ui/Badge.jsx'
import { transactions } from '../../data/transactions.js'
import { formatPrice, formatDate, formatAmount } from '../../utils/formatters.js'

export default function TransactionsTable({ searchQuery = '' }) {
  const filtered = searchQuery.trim()
    ? transactions.filter(tx =>
        tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.coinName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions

  return (
    <GlassCard>
      <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        Letzte Transaktionen
      </h2>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Keine Transaktionen für „{searchQuery}"
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm" aria-label="Transaktionshistorie">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Datum', 'Typ', 'Coin', 'Menge', 'Preis/Stk.', 'Gesamt'].map(h => (
                    <th
                      key={h}
                      scope="col"
                      className="pb-3 text-left font-medium first:pl-0 last:text-right last:pr-0 px-3"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, i) => (
                  <tr
                    key={tx.id}
                    className="transition-colors duration-150 hover:bg-[var(--accent-muted)]"
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <td className="py-3 pl-0 px-3 whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                      {formatDate(tx.date)}
                    </td>
                    <td className="py-3 px-3">
                      <TypeBadge type={tx.type} />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{tx.symbol}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{tx.coinName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>
                      {formatAmount(tx.amount, tx.symbol)}
                    </td>
                    <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>
                      {formatPrice(tx.pricePerUnit)}
                    </td>
                    <td className="py-3 pr-0 px-3 text-right font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(tx.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden flex flex-col gap-3">
            {filtered.map((tx, i) => (
              <div
                key={tx.id}
                className="flex items-center justify-between gap-2 py-3"
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <TypeBadge type={tx.type} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {tx.symbol} <span className="font-normal text-xs" style={{ color: 'var(--text-muted)' }}>{tx.coinName}</span>
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {formatDate(tx.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {formatPrice(tx.total)}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {formatAmount(tx.amount, tx.symbol)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </GlassCard>
  )
}
