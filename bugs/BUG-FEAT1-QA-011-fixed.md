---
status: Fixed
severity: High
feature: FEAT-1
---

# BUG-FEAT1-QA-011: WatchlistSidebar wird zweimal in den React-Baum eingehängt – doppelte Instanz

**Severity:** High
**Feature:** FEAT-1
**Komponente:** `components/layout/AppLayout.jsx`, `App.jsx`

## Beschreibung

`AppLayout.jsx` empfängt das `watchlist`-Prop als fertig gerendertes JSX-Element und platziert es an zwei verschiedenen Stellen im DOM:

```jsx
{/* Mobile-only: watchlist as horizontal scroll strip */}
<div className="lg:hidden">
  {watchlist}          // Erste Instanz
</div>

{/* Right column: watchlist sidebar – desktop only */}
<div className="hidden lg:block ...">
  <div className="sticky top-[80px]">
    {watchlist}        // Zweite Instanz – dieselbe JSX-Referenz
  </div>
</div>
```

React erlaubt zwar das gleiche JSX-Element technisch an mehreren Orten zu rendern, aber: zwei React-Komponenteninstanzen entstehen, beide registrieren Event-Handler, beide verarbeiten den gleichen State. Wenn man auf einen Coin in der Desktop-Sidebar klickt, ist das "erste" DOM-Element das Mobile-Strip, das `lg:hidden` ist – da die Einträge in beiden Instanzen gerendert werden, können Click-Events von der "falschen" Instanz ausgelöst werden. In StrictMode (Entwicklung) wird der Effekt noch verstärkt da Komponenten zweimal gemountet werden.

Der korrekte Pattern laut FEAT-5 Tech-Design wäre: `WatchlistSidebar` rendert intern beide Varianten mit CSS-Klassen (`hidden lg:flex` bzw. `flex lg:hidden`) und wird genau einmal als Komponente instanziiert. Das ist in `WatchlistSidebar.jsx` tatsächlich so implementiert – die Komponente enthält beide Varianten intern. Aber durch das doppelte Rendern via AppLayout werden beide Varianten doppelt instanziiert.

Konkretes Problem: Es entstehen 12 React-Instanzen von WatchlistItem/WatchlistCard (2 × 6 Coins) statt 6. Auf Desktop sind beide Watchlist-Varianten im DOM, nur eine ist via CSS ausgeblendet. Das führt zu unnötigem DOM-Overhead und potentiellen Focus-Problemen (zwei Buttons mit identischem aria-label).

## Reproduktion

1. Browser DevTools öffnen → Elements-Tab
2. Nach `.glass-card` suchen – die Watchlist-GlassCard erscheint zweimal im DOM
3. 12 WatchlistItem-Buttons sind im DOM, nur 6 sichtbar

## Erwartetes Verhalten

`WatchlistSidebar` wird genau einmal instanziiert. Die Komponente selbst verwaltet intern die Responsive-Darstellung (Desktop-Sidebar vs. Mobile-Strip) via CSS-Klassen.

## Tatsächliches Verhalten

`WatchlistSidebar` wird zweimal in AppLayout eingehängt – 2 React-Instanzen mit 12 Coin-Einträgen im DOM.

## Fix-Vorschlag

**Option A (empfohlen):** AppLayout rendert `{watchlist}` nur einmal, am Desktop-Position. `WatchlistSidebar` enthält intern beide Varianten (ist bereits so implementiert). `lg:hidden`-Wrapper in AppLayout entfernen:

```jsx
// AppLayout.jsx – lg:hidden Block entfernen
// Mobile strip ist bereits in WatchlistSidebar.jsx intern implementiert

{/* Nur einmal rendern: */}
<div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0">
  <div className="sticky top-[80px]">
    {watchlist}
  </div>
</div>
```

Dann muss WatchlistSidebar die Mobile-Variante selbst in den Haupt-Flow einbetten. Alternativ:

**Option B:** Zwei Props `watchlistDesktop` und `watchlistMobile` – aber das erfordert zwei separate Komponenten-Instanziierungen und ist aufwändiger.
