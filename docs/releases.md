# Release-History

## v0.1.0 – 2026-04-05
**Erstes vollständiges Release – Cryptofolio Showcase**

### Neue Features
- FEAT-1: Foundation (Theme-System, Mock-Daten, CSS Tokens, GlassCard, Badge)
- FEAT-2: Header (Logo, Suche, Dark/Light-Toggle, responsive 2-zeilig)
- FEAT-3: Portfolio-Hero (Gesamtwert, 24h-Änderung, Sparkline)
- FEAT-4: Preis-Chart (Recharts, 4 Zeiträume, Custom-Tooltip)
- FEAT-5: Watchlist (Desktop-Sidebar + Mobile-Strip, Live-Filter)
- FEAT-6: Transaktionen (Tabelle + Mobile-Cards, Suche, Leer-State)

### Bug-Fixes (26 von 28 gefixt)
- Critical: coin.currentPrice → coin.price (überall $NaN behoben)
- High: ThemeToggle Emojis → SVG-Icons mit korrektem Touch-Target
- High: TransactionsTable globale Suche implementiert
- High: WatchlistSidebar doppelte React-Instanz beseitigt
- High: Leer-States für Mobile-Watchlist und Transaktionen
- High: PortfolioHero Hover-Animation
- Medium: Header 2-zeiliges Mobile-Layout
- Medium: SearchInput sr-only Label, aria-current auf Watchlist
- Medium: scope=col auf Tabellen-Header
- (weitere, siehe bugs/)

### Known Issues (Low – unter Fix-Schwelle)
- BUG-FEAT4-QA-009: formatDate edge case bei null-Datum
- BUG-FEAT4-UX-002: Timeframe-Button Text-Kontrast im Dark Mode grenzwertig
