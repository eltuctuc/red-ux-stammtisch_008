---
status: approved
---

# FEAT-1: Foundation
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-1
- **Feature-Name:** Foundation
- **Zielgruppe:** Alle Personas (Lena, Markus, Sarah) – technisches Fundament, nicht direkt sichtbar
- **Abhängigkeiten:** Keine – wird zuerst implementiert
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Ohne dieses Feature funktioniert kein anderes: realistische Mock-Daten, globaler Theme-Kontext und das responsive Layout-Gerüst sind die Basis aller sichtbaren Features.

## Nicht im Scope
- Echte API-Calls (kein Netzwerk-Request)
- User-Authentifizierung
- Portfolio-Verwaltung (Coins hinzufügen/entfernen)
- Server-Side-Rendering

---

## User Stories

**US-1.1** Als Entwickler (Markus) möchte ich dass die App ein konsistentes Daten-Interface nutzt, damit ich beim Durchlesen des Codes sofort verstehe wie Daten fließen.

**US-1.2** Als Nutzer möchte ich dass meine Theme-Präferenz (Dark/Light) nach einem Seiten-Reload erhalten bleibt, damit ich nicht bei jedem Besuch neu einstellen muss.

**US-1.3** Als Nutzer auf einem Desktop möchte ich ein 2-Spalten-Layout sehen (Hauptbereich + Watchlist-Sidebar), damit ich alle relevanten Informationen auf einen Blick erfassen kann.

**US-1.4** Als Nutzer auf einem Smartphone (375px) möchte ich ein vollständig vertikal gestacktes Layout sehen, damit kein Inhalt abgeschnitten ist oder horizontal scrollt.

**US-1.5** Als Entwickler möchte ich realistische, nicht-zufällige Preisverläufe in den Mock-Daten vorfinden, damit das Projekt glaubwürdig wirkt und kein "zufälliges Zacken" entsteht.

---

## Acceptance Criteria

**AC-1.1** Die App stellt Mock-Daten für genau 6 Coins bereit: BTC, ETH, SOL, BNB, ADA, XRP – jeweils mit Name, Symbol, aktuellem Preis, 24h-Änderung (%), 7-Tage-Sparkline und 90-Tage-Preisverlauf.

**AC-1.2** Jeder Preisverlauf ist eine geschwungene Kurve (keine zufälligen Einzelwerte) – realistisch im Charakter der jeweiligen Kryptowährung (BTC > $40.000, ETH > $2.000 etc.).

**AC-1.3** Es gibt genau 5 Mock-Transaktionen mit: Datum, Typ (Kauf/Verkauf), Coin-Symbol, Menge, Preis pro Coin, Gesamtbetrag. Mix aus mind. 2 Käufen und 2 Verkäufen, verschiedene Coins.

**AC-1.4** Ein globaler ThemeContext stellt `theme` (dark | light) und `toggleTheme` bereit und ist in der gesamten App verfügbar.

**AC-1.5** Das Theme wird in `localStorage` unter dem Key `cryptofolio-theme` persistiert und beim App-Start gelesen – kein Flicker beim ersten Render.

**AC-1.6** Dark Theme ist Standard wenn kein localStorage-Eintrag vorhanden ist.

**AC-1.7** Das Layout-Gerüst ist responsive:
- ≥1024px: 2-Spalten (Hauptbereich links, Watchlist-Sidebar rechts, max-width ~1400px, zentriert)
- 768–1023px: Sidebar klappt unter den Hauptbereich (1 Spalte)
- <768px: Vollständig vertikal, keine horizontale Scrollbar

**AC-1.8** Das `<html>`-Element trägt die Klasse `dark` oder `light` je nach aktivem Theme, damit Tailwind-Dark-Mode-Klassen global greifen.

---

## Edge Cases

**EC-1.1** localStorage nicht verfügbar (z.B. Private Mode bestimmter Browser): App fällt auf Dark Theme zurück, kein JS-Fehler wird geworfen.

**EC-1.2** localStorage-Eintrag mit ungültigem Wert (z.B. `"undefined"`): App ignoriert den Eintrag und nutzt Dark Theme als Fallback.

**EC-1.3** Viewport-Resize während der Nutzung: Layout passt sich dynamisch an (kein Reload nötig), keine Layout-Artefakte.

**EC-1.4** Sehr schmaler Viewport (<320px): App ist lesbar, kein Overflow – kein Support für unter 320px erforderlich, aber kein Crash.

**EC-1.5** Mock-Daten werden mehrfach gleichzeitig abgerufen (z.B. von mehreren Komponenten): Daten sind ein einziges importiertes Modul, keine Duplicate-Instanzen oder Race Conditions.

---

## 2. UX Entscheidungen
*Erstellt von: /red:proto-ux — 2026-04-05*

### Einbettung
Foundation ist kein sichtbares UI-Feature. Es definiert das vollständige Design-Token-System, das alle anderen Features verwenden. Alle Token-Entscheidungen hier sind verbindlich für FEAT-2 bis FEAT-6.

---

### Design Token System

#### Farb-Palette

**Dark Theme (Standard):**
```
--bg-page:         #0a0b0f          (tiefschwarz mit Blau-Unterton)
--bg-surface:      rgba(255,255,255,0.04)   (Glasskarte Hintergrund)
--bg-surface-high: rgba(255,255,255,0.07)   (erhöhte Karte, Hover)
--border:          rgba(255,255,255,0.08)   (subtile Glassborder)
--text-primary:    #f1f5f9          (slate-100)
--text-secondary:  #64748b          (slate-500)
--text-muted:      #334155          (slate-700, für Placeholder)
--accent:          #818cf8          (indigo-400)
--accent-bg:       rgba(129,140,248,0.12)
--green:           #10b981          (emerald-500)
--green-bg:        rgba(16,185,129,0.12)
--red:             #f87171          (red-400)
--red-bg:          rgba(248,113,113,0.12)
```

**Light Theme:**
```
--bg-page:         #f1f5f9          (slate-100, kein reines Weiß)
--bg-surface:      rgba(255,255,255,0.80)
--bg-surface-high: rgba(255,255,255,0.95)
--border:          rgba(0,0,0,0.07)
--text-primary:    #0f172a          (slate-900)
--text-secondary:  #64748b          (slate-500)
--text-muted:      #94a3b8          (slate-400)
--accent:          #4f46e5          (indigo-600)
--accent-bg:       rgba(79,70,229,0.10)
--green:           #059669          (emerald-600)
--green-bg:        rgba(5,150,105,0.10)
--red:             #dc2626          (red-600)
--red-bg:          rgba(220,38,38,0.10)
```

**Begründung:** Slate-100 als Light-BG (nicht reines Weiß) – wirkt Premium wie Linear, Vercel, Stripe. Indigo als Accent statt Orange/Blau: zeitgemäß, nicht krypto-cliché. Alle Farben haben semantische bg-Varianten für Badges.

---

#### Glassmorphism System

```
.glass-card {
  background: var(--bg-surface);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow (dark):  0 4px 24px rgba(0,0,0,0.40),
                      0 1px 0 rgba(255,255,255,0.05) inset;
  box-shadow (light): 0 4px 24px rgba(0,0,0,0.08),
                      0 1px 0 rgba(255,255,255,0.80) inset;
}
```

**Begründung:** blur(12px) ist die Schwelle zwischen "sichtbarer Effekt" und "unlesbarem Chart". saturate(120%) intensiviert die Farben im Hintergrund leicht. Inset-Shadow oben gibt die Glasskante.

---

#### Typografie-Skala

```
--text-value:      40px / 700 / letter-spacing: -0.02em   (Portfolio-Gesamtwert)
--text-heading:    20px / 600 / letter-spacing: -0.01em   (Sektions-Titel)
--text-price:      15px / 600 / font-variant-numeric: tabular-nums
--text-change:     13px / 500                             (24h-Änderung)
--text-label:      11px / 600 / uppercase / letter-spacing: 0.08em  (Tabellen-Header)
--text-body:       14px / 400                             (Tabellenzellen, Body)
--text-timestamp:  13px / 400 / color: var(--text-secondary)
```

Font-Stack: `"Inter", system-ui, -apple-system, sans-serif`
Hinweis: Inter wird per Google Fonts oder lokal eingebunden (Entscheidung für Entwickler).

---

#### Spacing-System

```
--space-xs:  4px
--space-sm:  8px
--space-md:  12px
--space-lg:  16px
--space-xl:  24px
--space-2xl: 32px
--space-3xl: 48px
Card-Padding Desktop: 24px
Card-Padding Mobile:  16px
Section-Gap:          16px
```

---

#### Breakpoints

```
mobile:    < 768px
tablet:    768px – 1023px
desktop:   ≥ 1024px
max-width: 1400px (zentriert, auto margins)
```

---

#### Layout-Struktur (Desktop)

```
┌──────────────────────────────────────────────────┐
│  Header (sticky, 64px, backdrop-blur)            │
├─────────────────────────────────┬────────────────┤
│  Main (flex-1)                  │  Sidebar       │
│  ┌──────────────────────────┐   │  260px         │
│  │  Portfolio Hero (FEAT-3) │   │  (FEAT-5)      │
│  └──────────────────────────┘   │                │
│  ┌──────────────────────────┐   │                │
│  │  Preis-Chart (FEAT-4)    │   │                │
│  └──────────────────────────┘   │                │
│  ┌──────────────────────────┐   │                │
│  │  Transaktionen (FEAT-6)  │   │                │
│  └──────────────────────────┘   │                │
└─────────────────────────────────┴────────────────┘
```

**Mobile (< 768px):** Sidebar fällt als horizontaler Strip zwischen Preis-Chart und Transaktionen ein.

---

#### Animation-System

```
--transition-hover:  transform 200ms cubic-bezier(0.2, 0, 0, 1),
                     box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
--transition-theme:  background-color 300ms ease,
                     color 300ms ease,
                     border-color 300ms ease,
                     box-shadow 300ms ease;
--hover-lift:        translateY(-2px)
--hover-shadow:      0 8px 32px rgba(0,0,0,0.50) (dark)
                     0 8px 32px rgba(0,0,0,0.14) (light)
```

Recharts Hauptchart: `isAnimationActive={true}`, `animationDuration={600}`
Recharts Sparklines: `isAnimationActive={false}` (Performance)

---

### Responsive Verhalten

| Breakpoint | Spalten | Sidebar | Card-Padding |
|------------|---------|---------|-------------|
| Desktop ≥1024px | 2 Spalten (Main + Sidebar) | Vertikal rechts, 260px | 24px |
| Tablet 768–1023px | 1 Spalte | Unter Main, volle Breite | 20px |
| Mobile < 768px | 1 Spalte | Horizontal-Strip | 16px |

---

## 3. Technisches Design
*Erstellt von: /red:proto-architect — 2026-04-05*

### State-Komplexität
State Machine nicht erforderlich – kein Edit-Modus, kein Multi-Step, keine Race Conditions.

### Externe Daten: Validation-Strategie (localStorage)
```
Quelle: localStorage ('cryptofolio-theme')
Validation: try/catch + Whitelist-Check ('dark' | 'light')
Fallback: 'dark'

function getStoredTheme() {
  try {
    const v = localStorage.getItem('cryptofolio-theme')
    return (v === 'dark' || v === 'light') ? v : 'dark'
  } catch { return 'dark' }
}
```

### Verzeichnis-Struktur

```
projekt/src/
├── data/
│   ├── coins.js              Mock-Daten: 6 Coins
│   └── transactions.js       Mock-Daten: 5 Transaktionen
├── context/
│   └── ThemeContext.jsx      Provider + useTheme Hook
├── components/
│   ├── layout/
│   │   └── AppLayout.jsx     Haupt-Layout mit Header + Grid
│   ├── header/               → FEAT-2
│   ├── portfolio/            → FEAT-3
│   ├── chart/                → FEAT-4
│   ├── watchlist/            → FEAT-5
│   ├── transactions/         → FEAT-6
│   └── ui/
│       ├── GlassCard.jsx     Glassmorphism-Wrapper-Komponente
│       └── Badge.jsx         Kauf/Verkauf/Prozent-Badge
├── utils/
│   └── formatters.js         formatPrice, formatDate, formatPercent
├── App.jsx                   Root: globaler State + Provider
├── main.jsx
└── index.css                 Tailwind + CSS Custom Properties
```

### Daten-Modell: coins.js

```js
// coins.js – ein Array, direkt importierbar
export const coins = [
  {
    id: "bitcoin",          // Slug für Keys
    symbol: "BTC",
    name: "Bitcoin",
    price: 42350.00,
    change24hPct: 2.65,     // Prozent
    change24hUSD: 1095.67,  // Absoluter Betrag
    priceHistory: {
      "1T": [/* 24 Objekte: { date, price } */],
      "1W": [/* 7 Objekte */],
      "1M": [/* 30 Objekte */],
      "3M": [/* 90 Objekte */],
    },
    sparkline7d: [/* 7 Objekte: { date, price } */],
  },
  // ETH, SOL, BNB, ADA, XRP ...
]

// Lookup-Map für O(1)-Zugriff:
export const coinsMap = Object.fromEntries(coins.map(c => [c.symbol, c]))
```

**Preisverlauf-Generierung:** Geschwungene Kurven via Sinus/Cosinus-Superposition mit realistischen Basiswerten. KEINE Math.random() – deterministisch damit die Daten bei jedem Reload identisch sind.

### Daten-Modell: transactions.js

```js
export const transactions = [
  {
    id: "t1",
    date: "2025-03-12",     // ISO-String, Anzeige durch formatDate()
    type: "buy",            // "buy" | "sell"
    symbol: "BTC",
    coinName: "Bitcoin",
    amount: 0.012345,
    pricePerUnit: 42350.00,
    total: 522.55,
  },
  // 4 weitere, Mix aus buy/sell, verschiedene Coins
]
```

### ThemeContext

```
ThemeContext stellt bereit:
  theme: "dark" | "light"
  toggleTheme: () => void

Provider-Logik:
  1. Initial: getStoredTheme() → setzt theme-State
  2. toggleTheme: wechselt State → schreibt localStorage → setzt html.className
  3. useEffect bei theme-Änderung: document.documentElement.className = theme
```

### No-Flicker Pattern (index.html)

Inline-Script VOR React-Mount, direkt im `<head>`:
```html
<script>
  (function(){
    try {
      var t = localStorage.getItem('cryptofolio-theme');
      document.documentElement.className = (t==='light') ? 'light' : 'dark';
    } catch(e) {
      document.documentElement.className = 'dark';
    }
  })();
</script>
```
Wichtig: Muss VOR `<link>` und `<script type="module">` stehen.

### Tailwind v4 Dark Mode

Tailwind v4 verwendet CSS-basierte Konfiguration. Dark-Mode über `.dark`-Klasse auf `<html>`:

```css
/* index.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

/* CSS Custom Properties (aus FEAT-1 UX-Tokens): */
:root {
  --bg-page: #f1f5f9;
  --bg-surface: rgba(255,255,255,0.80);
  /* ... alle Light-Token */
}

.dark {
  --bg-page: #0a0b0f;
  --bg-surface: rgba(255,255,255,0.04);
  /* ... alle Dark-Token */
}
```

Tailwind-Klassen referenzieren die CSS-Vars via `[var(--bg-page)]`-Syntax.

### GlassCard.jsx (Shared Component)

Wrapper-Komponente die den Glassmorphism-Stil kapselt. Props: `className`, `hover` (bool), `children`. Alle Feature-Karten nutzen diese Komponente – keine duplizierten Glassmorphism-Styles.

### formatters.js

```
formatPrice(value): "$42,350.00"  → Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
formatPercent(value): "+2.65%"   → Vorzeichen + 2 Dezimalstellen
formatDate(isoString): "12. März 2025" → Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
```

### App-Root State

```
App.jsx verwaltet:
  selectedCoin: string = "BTC"
  selectedTimeframe: "1T" | "1W" | "1M" | "3M" = "1M"
  searchQuery: string = ""

Weitergabe als Props:
  Header: searchQuery, setSearchQuery
  WatchlistSidebar: selectedCoin, setSelectedCoin, searchQuery
  PriceChart: selectedCoin, selectedTimeframe, setSelectedTimeframe
  TransactionsTable: searchQuery
```

### A11y
- `<html lang="de">`
- ThemeToggle: `aria-label="Dark Mode aktivieren"` / `"Light Mode aktivieren"`
- GlassCard: semantisches HTML (`<section>`, `<article>` wo sinnvoll)

### Dependencies
- Keine neuen npm-Packages nötig – alle Funktionen mit React 18, Vite, Tailwind v4, Recharts abgedeckt

### Fortschritt
- Status: Freigegeben, Aktueller Schritt: Tech

## 5. QA Ergebnisse
*2026-04-05*

### Acceptance Criteria Status
- [x] AC-1.1 ✅ 6 Coins korrekt implementiert
- [x] AC-1.2 ✅ Deterministische Sinus-Kurven
- [x] AC-1.3 ✅ 5 Transaktionen (3 buy, 2 sell)
- [x] AC-1.4 ✅ ThemeContext mit theme + toggleTheme
- [x] AC-1.5 ✅ localStorage mit try/catch
- [x] AC-1.6 ✅ Dark als Default
- [x] AC-1.7 ✅ Responsive Breakpoint-Logik
- [x] AC-1.8 ✅ html-Klasse korrekt gesetzt

### Security: n/a (Frontend-Only) | A11y: Skip-Link + role=banner implementiert

### Behobene Bugs
- BUG-FEAT1-QA-001 – coin.currentPrice → coin.price (Critical, Fixed)
- BUG-FEAT1-QA-011 – WatchlistSidebar doppelte Instanz (High, Fixed)
- BUG-FEAT1-QA-005 – selectedTimeframe Default 1W → 1M (Medium, Fixed)
- BUG-FEAT1-UX-001 – role=banner, Skip-Link (Medium, Fixed)

### Summary
- ✅ 8/8 ACs passed | ✅ 4 Bugs gefixt

### Production-Ready
✅ Ready
