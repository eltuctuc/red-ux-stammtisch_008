import { LineChart, Line, ResponsiveContainer } from 'recharts'

export default function MiniSparkline({ data, isPositive }) {
  const color = isPositive ? 'var(--green)' : 'var(--red)'
  return (
    <div className="w-20 h-10">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
