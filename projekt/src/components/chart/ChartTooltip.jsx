import { formatPrice, formatDate } from '../../utils/formatters.js'

export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  const price = payload[0].value
  const date = label ? formatDate(label) : null

  return (
    <div
      className="px-4 py-3 rounded-xl shadow-xl"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {date && (
        <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
          {date}
        </p>
      )}
      <p className="text-base font-semibold">
        {formatPrice(price)}
      </p>
    </div>
  )
}
