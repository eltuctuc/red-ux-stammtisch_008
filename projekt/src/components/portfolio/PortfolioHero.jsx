import GlassCard from '../ui/GlassCard.jsx'
import { ChangeBadge } from '../ui/Badge.jsx'
import PortfolioSparkline from './PortfolioSparkline.jsx'
import { portfolioData } from '../../data/portfolio.js'
import { formatPrice } from '../../utils/formatters.js'

export default function PortfolioHero() {
  const { totalValue, change24hUSD, change24hPct, sparkline7d } = portfolioData
  const isPositive = change24hPct > 0

  return (
    <GlassCard
      hover
      className="overflow-hidden glass-card-hero"
      style={{ background: 'var(--bg-surface-high)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Left: values */}
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Portfolio-Gesamtwert
          </p>
          <p
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {formatPrice(totalValue)}
          </p>
          <div className="flex items-center gap-3">
            <ChangeBadge value={change24hPct} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isPositive ? '+' : ''}{formatPrice(change24hUSD)} heute
            </span>
          </div>
        </div>

        {/* Right: sparkline */}
        <div className="w-full sm:w-64">
          <PortfolioSparkline data={sparkline7d} isPositive={isPositive} />
          <p className="text-xs text-right mt-1" style={{ color: 'var(--text-muted)' }}>
            7 Tage
          </p>
        </div>

      </div>
    </GlassCard>
  )
}
