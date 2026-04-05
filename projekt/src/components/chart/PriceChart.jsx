import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import GlassCard from '../ui/GlassCard.jsx'
import { ChangeBadge } from '../ui/Badge.jsx'
import TimeframeSelector from './TimeframeSelector.jsx'
import ChartTooltip from './ChartTooltip.jsx'
import { formatPrice, formatPriceCompact, formatDateShort } from '../../utils/formatters.js'

export default function PriceChart({ coin, timeframe, onTimeframeChange }) {
  const data = coin.priceHistory[timeframe] ?? []
  const isPositive = coin.change24hPct > 0
  const strokeColor = isPositive ? 'var(--green)' : 'var(--red)'

  // Downsample for display: show max ~60 points to keep chart clean
  const step = Math.max(1, Math.floor(data.length / 60))
  const displayData = data.filter((_, i) => i % step === 0 || i === data.length - 1)

  const prices = displayData.map(d => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const padding = (maxPrice - minPrice) * 0.05
  const domainMin = Math.max(0, minPrice - padding)
  const domainMax = maxPrice + padding

  // Show only ~5 date ticks evenly spaced
  const tickIndices = new Set()
  const tickCount = 5
  for (let i = 0; i < tickCount; i++) {
    tickIndices.add(Math.round((i / (tickCount - 1)) * (displayData.length - 1)))
  }

  return (
    <GlassCard className="overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {coin.symbol}
            </span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {coin.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {formatPrice(coin.price)}
            </span>
            <ChangeBadge value={coin.change24hPct} />
          </div>
        </div>
        <TimeframeSelector selected={timeframe} onChange={onTimeframeChange} />
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-80" role="img" aria-label={`Preisverlauf ${coin.name}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            background="transparent"
          >
            <defs>
              <linearGradient id={`chartGrad-${coin.symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatDateShort(v)}
              interval={0}
              ticks={displayData.filter((_, i) => tickIndices.has(i)).map(d => d.date)}
            />
            <YAxis
              domain={[domainMin, domainMax]}
              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatPriceCompact}
              width={64}
              tickCount={5}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{
                stroke: 'var(--text-muted)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#chartGrad-${coin.symbol})`}
              dot={false}
              activeDot={{ r: 5, fill: strokeColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}
