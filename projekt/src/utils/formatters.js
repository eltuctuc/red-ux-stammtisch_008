const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const largePriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const shortDateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
})

export function formatPrice(value) {
  return largePriceFormatter.format(value)
}

export function formatPriceCompact(value) {
  if (Math.abs(value) >= 1000) {
    return '$' + (value / 1000).toFixed(1) + 'K'
  }
  return priceFormatter.format(value)
}

export function formatPercent(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatDate(isoString) {
  return dateFormatter.format(new Date(isoString))
}

export function formatDateShort(isoString) {
  return shortDateFormatter.format(new Date(isoString))
}

export function formatAmount(amount, symbol) {
  const decimals = amount < 1 ? 6 : 4
  return `${amount.toFixed(decimals)} ${symbol}`
}
