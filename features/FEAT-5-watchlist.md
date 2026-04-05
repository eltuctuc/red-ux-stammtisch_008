---
status: approved
---

# FEAT-5: Watchlist
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-5
- **Feature-Name:** Watchlist
- **Zielgruppe:** Markus (Demo-Interaktion), Lena (visuelle Qualität), Demo-Publikum
- **Abhängigkeiten:** FEAT-1 (Mock-Daten), FEAT-4 (Coin-Selektion steuert Chart), FEAT-2 (Suchfilter)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Die Watchlist ist das primäre Navigations-Element: Coin auswählen → Chart aktualisiert sich. Dieser Interaktions-Moment ist der stärkste visuelle Beweis dass die App echten State hat.

## Nicht im Scope
- Coins zur Watchlist hinzufügen oder entfernen
- Reihenfolge per Drag & Drop anpassen
- Alarm / Price Alert setzen
- Klick auf Coin öffnet Detailseite

---

## User Stories

**US-5.1** Als Nutzer möchte ich 6 Kryptowährungen in der Watchlist auf einen Blick sehen (BTC, ETH, SOL, BNB, ADA, XRP), damit ich die wichtigsten Coins im Überblick habe.

**US-5.2** Als Nutzer möchte ich einen Coin in der Watchlist anklicken um ihn zu selektieren, damit der Haupt-Chart sofort den Preisverlauf dieses Coins zeigt.

**US-5.3** Als Demo-Zuschauer möchte ich dass der aktiv selektierte Coin visuell hervorgehoben ist, damit der Zusammenhang zwischen Watchlist und Chart klar erkennbar ist.

**US-5.4** Als Nutzer auf dem Desktop möchte ich die Watchlist als vertikale Sidebar rechts neben dem Chart sehen, damit ich schnell zwischen Coins wechseln kann ohne zu scrollen.

**US-5.5** Als Nutzer auf dem Smartphone möchte ich die Watchlist als horizontalen Scroll-Strip unterhalb des Charts sehen, damit das Layout auf kleinen Bildschirmen nicht bricht.

**US-5.6** Als Nutzer möchte ich pro Coin-Eintrag sehen: Coin-Icon, Name, Symbol, aktuellen Preis, 24h-Änderung (%), Mini-Sparkline.

---

## Acceptance Criteria

**AC-5.1** Die Watchlist enthält genau 6 Einträge: BTC, ETH, SOL, BNB, ADA, XRP – in dieser Reihenfolge.

**AC-5.2** Jeder Eintrag zeigt: Coin-Icon (SVG oder Emoji als Fallback), Name, Symbol, Preis (formatiert: "$42,350.00"), 24h-Änderung (formatiert: "+2.65%" oder "-1.23%"), Mini-Sparkline (7 Tage, 40–60px breit, keine Achsen/Tooltips).

**AC-5.3** 24h-Änderung: positiv = grüne Farbe, negativ = rote Farbe.

**AC-5.4** Klick auf einen Eintrag setzt diesen Coin als `selectedCoin` im globalen State – der Preis-Chart (FEAT-4) reagiert sofort.

**AC-5.5** Der aktiv selektierte Coin-Eintrag hat einen visuellen Highlight-State: accent-farbige linke Border oder leicht erhöhter Hintergrund – deutlich erkennbar ohne aufdringlich zu wirken.

**AC-5.6** Desktop (≥1024px): Watchlist ist eine vertikale Sidebar mit fester Breite (240–280px). Die Einträge sind vertikal gestapelt, scrollbar wenn Inhalte überlaufen.

**AC-5.7** Mobile (<768px): Watchlist wird zu einem horizontal scrollbaren Strip. Jeder Eintrag ist eine kompakte Karte (~140px breit). Horizontal scrollen ist flüssig (`overflow-x: auto`, kein Snap nötig).

**AC-5.8** Suchfilter aus FEAT-2: Coins die nicht dem Suchbegriff entsprechen werden ausgeblendet. Wenn alle Coins gefiltert sind: "Keine Treffer"-Hinweis in der Watchlist.

**AC-5.9** Jede Watchlist-Karte hat Hover-Animation: leichte Aufhellung des Hintergrunds + `cursor: pointer`.

**AC-5.10** Mini-Sparklines sind Recharts-Komponenten mit `background: transparent` – kein weißer Hintergrund.

---

## Edge Cases

**EC-5.1** Suchfilter blendet den aktuell selektierten Coin aus: Selektion bleibt im State, der Chart zeigt weiterhin diesen Coin – nur die Watchlist-Anzeige filtert.

**EC-5.2** Alle 6 Coins werden durch Suche ausgeblendet: "Keine Treffer"-Hinweis erscheint, Chart bleibt unverändert.

**EC-5.3** Horizontaler Scroll-Strip auf Mobile mit Touch-Gerät: Scrollen funktioniert nativ, keine JS-Scroll-Bibliothek nötig.

**EC-5.4** Coin mit negativem 24h-Wert und positiver Sparkline (oder umgekehrt): Beide Werte werden unabhängig korrekt gefärbt.

**EC-5.5** Viewport zwischen Desktop und Mobile beim Resize: Layout wechselt flüssig zwischen Sidebar und Strip-Ansicht, kein State-Reset.

---

## 2. UX Entscheidungen
*Erstellt von: /red:proto-ux — 2026-04-05*

### Einbettung
Desktop: Vertikale Sidebar, 260px breit, rechts neben Main-Bereich, volle Höhe (sticky, scrollt nicht mit). Mobile: Horizontaler Scroll-Strip zwischen Preis-Chart und Transaktionen-Tabelle.

### Komponenten & Layout

**Desktop – Sidebar:**
```
┌── Glass Card (260px breit) ────┐
│  "Watchlist"  (Label, 11px)    │
│                                │
│  ┌── Coin-Eintrag ──────────┐  │
│  │ [Icon] Bitcoin  BTC      │  │
│  │        $42,350.00        │  │
│  │  ↑ +2.65%  [Sparkline]   │  │
│  └──────────────────────────┘  │
│  ┌── Coin-Eintrag (aktiv) ──┐  │
│  │ [Accent-Border links]    │  │
│  │ [Icon] Ethereum  ETH     │  │
│  │        $2,340.00         │  │
│  │  ↑ +1.2%   [Sparkline]   │  │
│  └──────────────────────────┘  │
│  ...                           │
└────────────────────────────────┘
```

**Mobile – Scroll-Strip:**
```
← [BTC-Karte] [ETH-Karte] [SOL-Karte] [BNB-Karte] [ADA-Karte] [XRP-Karte] →
   (overflow-x: auto, kein Scrollbar sichtbar, kein Snap nötig)
```

### Coin-Eintrag Design (Desktop)

Interne Struktur einer Karten-Zeile:
```
[Icon 32px]  [Name 14px/600]   [Symbol 12px/secondary]   [Sparkline 56×24px]
             [$42,350.00 15px/tabular-nums]
             [↑ +2.65% 13px, grün/rot]
```

- Padding: 12px 16px
- Mindesthöhe: 64px (Icon + 2 Zeilen Text + Spacing)
- Hover: `background: var(--bg-surface-high)`, Transition 150ms
- Cursor: pointer
- Border-Left aktiv: `4px solid var(--accent)`, Padding-Left reduziert um 4px

**Aktiv-State:**
- `border-left: 4px solid var(--accent)`
- `background: var(--accent-bg)`
- Kein Bold-Toggle – zu abrupt

### Coin-Icon
- Primär: Emoji (₿ Bitcoin, Ξ Ethereum, ◎ Solana, 🔷 BNB, ₳ Cardano, ✕ XRP)
- Alternativ: Farbige Initial-Badges (Kreis 32px, Coin-Farbe als BG, Symbol als Text)
- Entscheidung für Entwickler: SVG-Sprites bevorzugt wenn vorhanden, Emoji als Fallback

### Sparkline (Watchlist-intern)
- Breite: 56px, Höhe: 24px, kein Container erforderlich (feste Größe)
- Recharts `<LineChart width={56} height={24}>`
- Keine Achsen, kein Grid, kein Tooltip
- `strokeWidth: 1.5`, Farbe: `var(--green)` / `var(--red)` je nach 24h-Change
- `isAnimationActive={false}`
- `dot={false}`

### Mobile-Scroll-Strip Design

Pro Karte im Strip:
```
┌── Karte (140px × 96px) ───┐
│  [Icon]  BTC               │
│  $42,350                   │
│  ↑ +2.65%                  │
│  [Sparkline 80×24px]       │
└────────────────────────────┘
```
- Strip-Wrapper: `display: flex`, `overflow-x: auto`, `gap: 8px`, `padding: 0 16px 8px`
- Scrollbar versteckt: `-webkit-scrollbar: none`, `scrollbar-width: none`
- Kein Fade-Edge (zu komplex, kein echter Mehrwert)
- Aktive Karte: accent-farbige Border, leicht erhöhter Hintergrund

### "Keine Treffer"-State
- Text: "Keine Coins gefunden" in `var(--text-secondary)`, 14px
- Mittig in der Sidebar (Desktop) oder im Strip-Bereich (Mobile)
- Kein Icon nötig

### Touch-Target-Tabelle

| Element | Höhe visuell | WCAG 2.5.5 (44px) | Lösung |
|---------|-------------|-------------------|--------|
| Coin-Eintrag Desktop | 64px | ✅ | Native |
| Coin-Karte Mobile Strip | 96px | ✅ | Native |

---

## 3. Technisches Design
*Erstellt von: /red:proto-architect — 2026-04-05*

### State-Komplexität
Kein State Machine – `selectedCoin` und `searchQuery` kommen als Props, kein lokaler State außer ggf. Hover (CSS-only, kein JS).

### Komponenten

**WatchlistSidebar.jsx** – Container
- Props: `selectedCoin: string`, `onCoinSelect: func`, `searchQuery: string`
- Filtert `coins` nach `searchQuery` → `filteredCoins`
- Rendert auf Desktop `<WatchlistItem>` vertikal; auf Mobile `<WatchlistStrip>` horizontal
- Kein JS für Breakpoint-Erkennung – CSS `hidden lg:block` / `block lg:hidden`

**WatchlistItem.jsx** – Desktop Coin-Eintrag (Presentational)
- Props: `coin`, `isSelected: bool`, `onSelect: func`
- Rendert: Icon-Badge, Name, Symbol, Preis, Change-Badge, Mini-Sparkline
- Aktiv-State via `isSelected` → Tailwind-Conditional-Klassen

**WatchlistStrip.jsx** – Mobile horizontaler Strip
- Props: gleiche wie WatchlistSidebar (filteredCoins, selectedCoin, onSelect)
- `<div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">`
- Rendert `<WatchlistCard>` pro Coin

**WatchlistCard.jsx** – Mobile kompakte Karte (Presentational)
- Props: `coin`, `isSelected: bool`, `onSelect: func`
- Kompaktere Version von WatchlistItem

**MiniSparkline.jsx** – Shared Sparkline
- Props: `data: [{date, price}]`, `color: string`, `width: number`, `height: number`
- Recharts `<LineChart>` mit fester Größe, keine Achsen
- Nutzt von FEAT-3 und FEAT-5

### Responsive Strategie

**CSS-only, kein JS-Breakpoint-Hook:**
```jsx
<>
  {/* Desktop: nur ab lg sichtbar */}
  <aside className="hidden lg:flex flex-col w-64 ...">
    {filteredCoins.map(coin => <WatchlistItem ... />)}
  </aside>
  {/* Mobile: bis lg sichtbar */}
  <div className="flex lg:hidden overflow-x-auto gap-2 ...">
    {filteredCoins.map(coin => <WatchlistCard ... />)}
  </div>
</>
```

### Filterlogik

```js
const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
)
```

Leerer `searchQuery` → `filteredCoins === coins` (alle anzeigen).

### A11y
- `<aside aria-label="Watchlist">` (Desktop)
- Coin-Einträge: `<button role="option" aria-selected={isSelected}>` (keine echte Listbox, aber semantisch passend)
- Aktiver Coin: `aria-selected="true"`

### Fortschritt
- Status: Freigegeben, Aktueller Schritt: Tech

## 5. QA Ergebnisse
*2026-04-05*

### Acceptance Criteria Status
- [x] AC-5.1–5.10 ✅ Alle ACs passed

### Behobene Bugs
- BUG-FEAT5-QA-004 – Mobile Leer-State (Medium, Fixed)
- BUG-FEAT5-UX-001 – Mobile Leer-State (High, Fixed)
- BUG-FEAT5-UX-002 – aria-pressed → aria-current (Medium, Fixed)
- BUG-FEAT5-UX-003 – MiniSparkline Margins (Low, Fixed)

### Summary
- ✅ 10/10 ACs passed | ✅ 4 Bugs gefixt

### Production-Ready
✅ Ready
