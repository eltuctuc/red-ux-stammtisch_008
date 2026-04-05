---
status: Fixed
severity: Medium
feature: FEAT-5
---

# BUG-FEAT5-QA-004: Mobile Watchlist zeigt keinen "Keine Ergebnisse"-State

**Severity:** Medium
**Feature:** FEAT-5
**Komponente:** `components/watchlist/WatchlistSidebar.jsx`

## Beschreibung

AC-5.8 und EC-5.2 fordern: Wenn alle Coins durch die Suche gefiltert sind, soll ein "Keine Treffer"-Hinweis erscheinen.

Der Desktop-Zweig in `WatchlistSidebar.jsx` implementiert diesen Leer-State korrekt (Zeilen 21–24). Der Mobile-Zweig (Zeilen 40–58) fehlt eine entsprechende Prüfung – bei `filtered.length === 0` rendert der Strip ein leeres `<div>` ohne jeden Hinweis.

```jsx
// Desktop: korrekt implementiert
{filtered.length === 0 ? (
  <p className="px-3 py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
    Keine Ergebnisse
  </p>
) : ( ... )}

// Mobile: fehlende Prüfung – rendert leeres div
<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" ...>
  {filtered.map(coin => (...))}
</div>
```

## Reproduktion

1. App im Mobile-Viewport öffnen (<1024px)
2. In die Suchleiste "DOGE" eingeben (kein Treffer)
3. Der horizontale Watchlist-Strip ist leer – kein Hinweis

## Erwartetes Verhalten

Im Mobile-Strip erscheint "Keine Coins gefunden" als Text-Hinweis.

## Tatsächliches Verhalten

Leerer Strip ohne jede Nutzerkommunikation.

## Fix-Vorschlag

```jsx
<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" ...>
  {filtered.length === 0 ? (
    <p className="text-sm py-2" style={{ color: 'var(--text-muted)' }}>
      Keine Coins gefunden
    </p>
  ) : (
    filtered.map(coin => (
      <WatchlistCard key={coin.id} coin={coin} isSelected={selectedCoin?.id === coin.id} onClick={() => onCoinSelect(coin)} />
    ))
  )}
</div>
```
