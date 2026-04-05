---
status: Fixed
severity: High
feature: FEAT-5
---

# BUG-FEAT5-UX-001: WatchlistSidebar Mobile – Leerzustand bei 0 Suchergebnissen fehlt

**Severity:** High
**Feature:** FEAT-5
**Komponente:** WatchlistSidebar.jsx

## Beschreibung
Wenn die Suche alle 6 Coins filtert (z.B. Eingabe "xyz"), zeigt der Desktop-Teil der Watchlist korrekt: "Keine Ergebnisse". Der Mobile-Strip-Bereich (`div.lg:hidden`) rendert jedoch bei `filtered.length === 0` ein leeres `<div role="list">` ohne jegliche Rückmeldung. Der Strip-Bereich kollabiert auf 0 Höhe (leeres Flex-Container ohne Kinder) – der User sieht nur die "Watchlist"-Überschrift über einem leeren Bereich.

Laut AC-5.8 und EC-5.2 muss auch im Mobile-Strip ein "Keine Treffer"-Hinweis erscheinen.

## Auswirkung
Auf Mobile tippt der Nutzer einen Suchbegriff ein, die Watchlist-Karten verschwinden, und er sieht eine leere Fläche. Es ist unklar ob die App noch funktioniert, die Daten nicht geladen wurden, oder die Suche kein Ergebnis hat. Das ist eine klassische "blinde Fläche" ohne Feedback.

## Erwartetes Verhalten
Bei 0 Suchergebnissen erscheint im Mobile-Strip an Stelle der Karten ein Hinweistext "Keine Coins gefunden" (analog zur Desktop-Sidebar).

## Fix-Vorschlag
In `WatchlistSidebar.jsx` im Mobile-Bereich eine Leer-State-Behandlung ergänzen:
```jsx
{/* Mobile horizontal strip */}
<div className="lg:hidden">
  <h2 ...>Watchlist</h2>
  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Watchlist">
    {filtered.length === 0 ? (
      <p className="py-4 text-sm" style={{ color: 'var(--text-muted)' }}>
        Keine Coins gefunden
      </p>
    ) : (
      filtered.map(coin => <WatchlistCard key={coin.id} ... />)
    )}
  </div>
</div>
```
