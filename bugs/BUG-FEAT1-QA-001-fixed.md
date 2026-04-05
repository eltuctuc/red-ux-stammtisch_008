---
status: Fixed
severity: Critical
feature: FEAT-1
---

# BUG-FEAT1-QA-001: coin.currentPrice existiert nicht – überall NaN/undefined

**Severity:** Critical
**Feature:** FEAT-1
**Komponente:** `data/coins.js`, `components/watchlist/WatchlistItem.jsx`, `components/watchlist/WatchlistCard.jsx`, `components/chart/PriceChart.jsx`

## Beschreibung

Das Daten-Modell in `coins.js` definiert den Preis eines Coins unter dem Key `price`. An mindestens drei Stellen im Code wird jedoch `coin.currentPrice` referenziert – ein Feld das im Daten-Modell nicht existiert.

Betroffene Stellen:
- `WatchlistItem.jsx` Zeile 12: `formatPrice(coin.currentPrice)` → `undefined` → rendert `$NaN`
- `WatchlistItem.jsx` Zeile 12 (aria-label): `formatPrice(coin.currentPrice)` → Screen-Reader liest `$NaN`
- `WatchlistCard.jsx` Zeile 12: `formatPrice(coin.currentPrice)` → `$NaN`
- `PriceChart.jsx` Zeile 48: `formatPrice(coin.currentPrice)` → `$NaN` im Chart-Header

## Reproduktion

1. App starten
2. Watchlist ansehen: alle Preise in WatchlistItem und WatchlistCard zeigen `$NaN`
3. PriceChart-Header zeigt `$NaN` statt dem aktuellen Coin-Preis

## Erwartetes Verhalten

Alle Preisanzeigen zeigen den formatierten USD-Preis, z.B. "$42,350.00"

## Tatsächliches Verhalten

Alle Preisanzeigen zeigen `$NaN` – der Coin-Preis ist in der gesamten Watchlist und im Chart-Header nicht sichtbar.

## Fix-Vorschlag

`coin.currentPrice` in `WatchlistItem.jsx`, `WatchlistCard.jsx` und `PriceChart.jsx` durch `coin.price` ersetzen.

```js
// WatchlistItem.jsx, WatchlistCard.jsx, PriceChart.jsx
formatPrice(coin.price)  // statt formatPrice(coin.currentPrice)
```
