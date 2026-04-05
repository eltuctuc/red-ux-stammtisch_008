# Produktfähigkeiten

## Foundation & Theme-System *(FEAT-1, 2026-04-05)*
Cryptofolio stellt ein vollständiges Design-System mit Glassmorphism-Karten, Dark/Light-Theme (no-flicker via localStorage), deterministischen Mock-Preiskurven für 6 Kryptowährungen und alle benötigten Formatierungs-Utilities bereit. Das Theme wird per CSS Custom Properties gesteuert und wechselt ohne Flash of Unstyled Content.

## Header mit Suche und Theme-Toggle *(FEAT-2, 2026-04-05)*
Ein sticky Header mit SVG-basiertem Theme-Toggle (44px Touch-Target), Suchleiste (2-zeilig auf Mobile) und Live-Filterung aller Watchlist- und Transaktions-Einträge. Keyboard-zugänglich mit Skip-Link und korrekten ARIA-Attributen.

## Portfolio-Übersicht *(FEAT-3, 2026-04-05)*
Die Portfolio-Hero-Karte zeigt den Gesamtwert ($47.823,50), die 24h-Änderung in USD und Prozent sowie eine 7-Tage-Sparkline. Hover-Animation hebt die Karte visuell an.

## Interaktiver Preis-Chart *(FEAT-4, 2026-04-05)*
AreaChart (Recharts) mit 4 Zeiträumen (1T/1W/1M/3M), adaptiven Y-Achsen-Skalen, Custom-Tooltip mit deutschem Datum und farbkodiertem Gradient (grün/rot je nach 24h-Performance). Default-Zeitraum: 1 Monat.

## Watchlist *(FEAT-5, 2026-04-05)*
Sidebar mit 6 Kryptowährungen, Preis, 24h-Änderung und Mini-Sparkline. Desktop: vertikale Liste mit Klick-Selektion (aktueller Coin wird im Chart angezeigt). Mobile: horizontaler Scroll-Strip als kompakte Karten. Leer-State bei 0 Suchergebnissen auf beiden Layouts.

## Transaktionshistorie *(FEAT-6, 2026-04-05)*
Tabelle mit 5 Mock-Transaktionen (Datum, Typ-Badge, Symbol, Menge, Einzelpreis, Gesamtbetrag). Wird durch die globale Suche gefiltert. Desktop: vollständige Tabelle mit scope=col. Mobile: kompakte Karten-Ansicht mit Coin-Name. Leer-State bei 0 Treffern.
