import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'
import { formatPriceCompact } from '../../utils/formatters.js'

function SparkTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-2 py-1 rounded-lg text-xs"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
      }}
    >
      {formatPriceCompact(payload[0].value)}
    </div>
  )
}

export default function PortfolioSparkline({ data, isPositive }) {
  const color = isPositive ? 'var(--green)' : 'var(--red)'

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#portfolioGradient)"
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
          />
          <Tooltip content={<SparkTooltip />} cursor={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
