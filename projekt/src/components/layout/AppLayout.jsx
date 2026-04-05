export default function AppLayout({ header, portfolioHero, priceChart, watchlist, transactions }) {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-40">
        {header}
      </div>

      {/* Main content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 sm:px-6 lg:px-8">

        {/* Portfolio Hero – full width */}
        <div className="mb-6">
          {portfolioHero}
        </div>

        {/* Desktop: 2-column grid (chart + watchlist), Mobile: stacked */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left column: chart + transactions */}
          <div className="flex flex-col gap-6 min-w-0 flex-1">
            {priceChart}

            {/* Mobile-only: watchlist as horizontal scroll strip */}
            <div className="lg:hidden">
              {watchlist}
            </div>

            {transactions}
          </div>

          {/* Right column: watchlist sidebar – desktop only */}
          <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0">
            <div className="sticky top-[80px]">
              {watchlist}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
