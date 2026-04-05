import { coins } from './coins.js'

// Deterministic portfolio sparkline (7-day aggregate)
function generatePortfolioSparkline() {
  const weights = { BTC: 0.45, ETH: 0.25, SOL: 0.15, BNB: 0.08, ADA: 0.04, XRP: 0.03 }
  const btcHistory = coins.find(c => c.symbol === 'BTC').sparkline7d
  return btcHistory.map((point, i) => {
    const weightedPrice = coins.reduce((sum, coin) => {
      return sum + coin.sparkline7d[i].price * (weights[coin.symbol] || 0) * 10
    }, 0)
    return { date: point.date, price: Math.round(weightedPrice * 100) / 100 }
  })
}

export const portfolioData = {
  totalValue: 47823.50,
  change24hUSD: 1234.56,
  change24hPct: 2.65,
  sparkline7d: generatePortfolioSparkline(),
}
