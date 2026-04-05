import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import Header from './components/header/Header.jsx'
import PortfolioHero from './components/portfolio/PortfolioHero.jsx'
import PriceChart from './components/chart/PriceChart.jsx'
import WatchlistSidebar from './components/watchlist/WatchlistSidebar.jsx'
import TransactionsTable from './components/transactions/TransactionsTable.jsx'
import { coins } from './data/coins.js'

export default function App() {
  const [selectedCoin, setSelectedCoin] = useState(coins[0])
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <ThemeProvider>
      <AppLayout
        header={
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        }
        portfolioHero={<PortfolioHero />}
        priceChart={
          <PriceChart
            coin={selectedCoin}
            timeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />
        }
        watchlist={
          <WatchlistSidebar
            selectedCoin={selectedCoin}
            onCoinSelect={setSelectedCoin}
            searchQuery={searchQuery}
          />
        }
        transactions={<TransactionsTable />}
      />
    </ThemeProvider>
  )
}
