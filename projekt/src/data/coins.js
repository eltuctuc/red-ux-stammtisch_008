// Deterministic sinusoidal price curves – no Math.random()
function generatePriceHistory(base, amplitude, days, pointsPerDay = 1) {
  const totalPoints = days * pointsPerDay
  const result = []
  const now = new Date('2025-04-05')

  for (let i = 0; i < totalPoints; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() - (totalPoints - 1 - i) * (1 / pointsPerDay))
    const t = i / totalPoints
    // Two overlapping sine waves for realistic curvature
    const price = base
      + amplitude * Math.sin(t * Math.PI * 6 + 0.5)
      + amplitude * 0.4 * Math.sin(t * Math.PI * 13 + 1.2)
    result.push({ date: d.toISOString().split('T')[0], price: Math.round(price * 100) / 100 })
  }
  return result
}

function makeCoin({ id, symbol, name, base, amp, change24hPct }) {
  const change24hUSD = Math.round(base * change24hPct / 100 * 100) / 100
  return {
    id,
    symbol,
    name,
    price: base,
    change24hPct,
    change24hUSD,
    priceHistory: {
      '1T': generatePriceHistory(base, amp * 0.15, 1, 24),
      '1W': generatePriceHistory(base, amp * 0.4, 7),
      '1M': generatePriceHistory(base, amp * 0.8, 30),
      '3M': generatePriceHistory(base, amp, 90),
    },
    sparkline7d: generatePriceHistory(base, amp * 0.4, 7),
  }
}

export const coins = [
  makeCoin({ id: 'bitcoin',  symbol: 'BTC', name: 'Bitcoin',  base: 42350, amp: 8000, change24hPct:  2.65 }),
  makeCoin({ id: 'ethereum', symbol: 'ETH', name: 'Ethereum', base:  2340, amp:  450, change24hPct:  1.23 }),
  makeCoin({ id: 'solana',   symbol: 'SOL', name: 'Solana',   base:   148, amp:   28, change24hPct: -3.41 }),
  makeCoin({ id: 'bnb',      symbol: 'BNB', name: 'BNB',      base:   398, amp:   55, change24hPct:  0.87 }),
  makeCoin({ id: 'cardano',  symbol: 'ADA', name: 'Cardano',  base:  0.52, amp: 0.09, change24hPct: -1.15 }),
  makeCoin({ id: 'xrp',      symbol: 'XRP', name: 'XRP',      base:  0.61, amp: 0.08, change24hPct:  4.32 }),
]

export const coinsMap = Object.fromEntries(coins.map(c => [c.symbol, c]))
