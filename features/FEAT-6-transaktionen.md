---
status: approved
---

# FEAT-6: Transaktionen
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-6
- **Feature-Name:** Transaktionen
- **Zielgruppe:** Sarah (Vollständigkeit des Showcases), Markus (Tabellenimplementierung)
- **Abhängigkeiten:** FEAT-1 (Mock-Daten), FEAT-2 (Suchfilter)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Die Transaktions-Tabelle vervollständigt das Dashboard und zeigt dass auch Tabellen-UI premium aussehen kann. Kauf/Verkauf-Unterscheidung und Suchfilter-Integration machen sie interaktiv.

## Nicht im Scope
- Transaktionen hinzufügen, bearbeiten oder löschen
- Sortierung nach Spalten (kein klickbarer Tabellen-Header)
- Paginierung (5 Einträge sind fixiert)
- CSV-Export
- Transaktions-Details-View

---

## User Stories

**US-6.1** Als Nutzer möchte ich die letzten 5 Transaktionen in einer übersichtlichen Tabelle sehen, damit ich meine jüngste Trading-Aktivität auf einen Blick überblicke.

**US-6.2** Als Nutzer möchte ich sofort erkennen welche Transaktionen Käufe und welche Verkäufe sind, damit ich die Tabelle schnell scannen kann ohne jeden Eintrag einzeln zu lesen.

**US-6.3** Als Nutzer möchte ich über die globale Suchleiste die Tabelle filtern können, damit ich schnell alle Transaktionen eines bestimmten Coins finden kann.

**US-6.4** Als Entwickler (Markus) möchte ich dass die Tabelle auf Mobile sauber aussieht (kein horizontales Overflow), damit das Mobile-Rendering nicht als vergessener Punkt auffällt.

**US-6.5** Als Recruiter (Sarah) möchte ich dass die Tabelle optisch zum Rest des Dashboards passt (gleicher Glassmorphism-Stil, gleiche Farb-Semantik), damit das Projekt konsistent und durchdesignt wirkt.

---

## Acceptance Criteria

**AC-6.1** Die Tabelle zeigt genau 5 Mock-Transaktionen in dieser Spalten-Reihenfolge: Datum, Typ, Coin, Menge, Preis pro Coin, Gesamt.

**AC-6.2** Datum ist formatiert als "12. März 2025" (deutsches Format) – keine ISO-Strings.

**AC-6.3** Typ-Spalte: "Kauf" in grüner Farbe + optionalem Pfeil-Icon. "Verkauf" in roter Farbe + optionalem Pfeil-Icon.

**AC-6.4** Menge ist formatiert mit max. 6 Dezimalstellen (z.B. "0.045231 BTC").

**AC-6.5** Preis pro Coin und Gesamt sind als USD-Beträge formatiert (z.B. "$42,350.00").

**AC-6.6** Suchfilter aus FEAT-2: Zeilen die nicht dem Suchbegriff entsprechen (Coin-Symbol oder Typ) werden ausgeblendet. Bei keinen Treffern erscheint ein "Keine Transaktionen gefunden"-Hinweis.

**AC-6.7** Die Tabelle ist in einer Glassmorphism-Karte eingebettet (konsistenter Stil mit FEAT-3, FEAT-4).

**AC-6.8** Tabellen-Header-Zeile ist visuell abgesetzt (z.B. etwas dunklerer Hintergrund, `text-muted`-Farbe für Labels).

**AC-6.9** Jede Daten-Zeile hat einen Hover-State: leichte Hintergrundaufhellung.

**AC-6.10** Auf Mobile (<768px): Tabelle ist lesbar ohne horizontales Scrollen. Lösung: entweder weniger Spalten anzeigen (Menge + Preis ausblenden, nur Typ + Coin + Gesamt), oder die Tabelle hat `overflow-x: auto` mit einem visuellen Scroll-Hint.

---

## Edge Cases

**EC-6.1** Suchfilter blendet alle 5 Transaktionen aus: Tabellen-Body zeigt "Keine Transaktionen gefunden" (colspan über alle Spalten), Header bleibt sichtbar.

**EC-6.2** Sehr langer Coin-Name in der Mock-Datei: Text wird mit `truncate` oder `text-overflow: ellipsis` abgeschnitten, kein Overflow ins Layout.

**EC-6.3** Gesamt-Betrag ist sehr groß (>6 Stellen vor Komma): Formatierung bleibt lesbar, Spaltenbreite passt sich nicht dynamisch aus dem Proportionen.

**EC-6.4** Suche findet nur Teilergebnisse (z.B. "eth" → 2 von 5 Zeilen): Die anderen 3 Zeilen werden ausgeblendet, Tabelle zeigt nur die 2 Treffer ohne Layout-Bruch.

**EC-6.5** Theme-Wechsel: Tabelle übernimmt sofort die neuen Farben (Dark/Light), keine partiell gecachten Styles.

---

## 2. UX Entscheidungen
*Erstellt von: /red:proto-ux — 2026-04-05*

### Einbettung
Die Transaktions-Tabelle ist das letzte Element im Main-Bereich, unter dem Preis-Chart. Volle Breite des Main-Bereichs. Auf Desktop: deutlich sichtbar ohne Scrolling nötig (wenn genug Viewport-Höhe). Auf Mobile: scrollt ins Bild.

### Komponenten & Layout

**Karten-Struktur:**
```
┌─── Glass Card (24px padding) ──────────────────────────────────────────────┐
│  "Letzte Transaktionen"  (Label 11px, uppercase)                           │
│                                                                             │
│  ┌── Header-Zeile (11px, uppercase, text-secondary) ──────────────────────┐│
│  │  DATUM    │  TYP    │  COIN  │  MENGE         │  PREIS      │  GESAMT  ││
│  ├─────────────────────────────────────────────────────────────────────────┤│
│  │  12.03.25 │ ↑ Kauf  │  BTC   │  0.012345 BTC  │  $42,350    │  $508    ││
│  │  (hover)  │ (grün)  │        │                │             │         ││
│  ├─────────────────────────────────────────────────────────────────────────┤│
│  │  08.03.25 │ ↓ Verk. │  ETH   │  1.500000 ETH  │  $2,340     │  $3,510  ││
│  │           │ (rot)   │        │                │             │         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tabellen-Header
- Hintergrund: `var(--bg-surface-high)` – leicht dunkler als Zeilen-BG
- Text: 11px / 600 / uppercase / `letter-spacing: 0.08em` / `var(--text-secondary)`
- Padding: 10px 16px
- Keine horizontale Border-Separation – subtiler Hintergrund reicht

### Tabellen-Zeilen
- Hintergrund: transparent (Glasskarte als Hintergrund)
- Hover: `background: var(--bg-surface-high)`, Transition 150ms
- Trennlinie zwischen Zeilen: `border-top: 1px solid var(--border)` (subtle)
- Padding: 14px 16px
- Zeilenhöhe: ~52px

### Typ-Spalte (Kauf/Verkauf)
- "Kauf": `var(--green)` + Pfeil-Icon ↑ (14px)
- "Verkauf": `var(--red)` + Pfeil-Icon ↓ (14px)
- Icon + Text in einem `<span>`, leicht abgerundetes Badge: `background: var(--green-bg)` / `var(--red-bg)`, padding: 2px 8px, border-radius: 6px

### Zahlen-Formatierung
- Preise und Gesamt: `font-variant-numeric: tabular-nums` – wichtig damit Zahlen in Spalten exakt untereinander stehen
- Menge: max 6 Dezimalstellen, Coin-Symbol dahinter in `var(--text-secondary)` (z.B. "0.012345 BTC")
- Datum: "12. März 2025" – ausgeschrieben, kein ISO-Format

### Mobile-Handling (<768px)
**Lösung: Reduzierte Spalten**
- Desktop: 6 Spalten (Datum, Typ, Coin, Menge, Preis, Gesamt)
- Mobile: 3 Spalten (Datum, Typ + Coin kombiniert, Gesamt)
- Zusammenfassung Typ+Coin-Spalte Mobile: `"↑ Kauf · BTC"` in einer Zeile
- Begründung: Radikale Vereinfachung statt horizontales Scrollen – cleaner, ehrlicher für Mobile

**Implementierungs-Hinweis:** Tailwind `hidden md:table-cell` auf Menge- und Preis-Spalten.

### "Keine Transaktionen"-State
- Text: "Keine Transaktionen gefunden" in `var(--text-secondary)`, 14px, zentriert
- Colspan auf alle Spalten
- Tabellen-Header bleibt sichtbar

### Touch-Target-Tabelle

| Element | Höhe visuell | WCAG 2.5.5 (44px) | Lösung |
|---------|-------------|-------------------|--------|
| Tabellen-Zeile | ~52px | ✅ | Native (keine klickbaren Zeilen) |

*(Zeilen sind nicht klickbar – kein Navigations-Ziel, nur Anzeige)*

---

## 3. Technisches Design
*Erstellt von: /red:proto-architect — 2026-04-05*

### State-Komplexität
Keine – reine Anzeige-Komponente, `searchQuery` kommt als Prop.

### Komponenten

**TransactionsTable.jsx** – Container
- Props: `searchQuery: string`
- Importiert `transactions` aus `data/transactions.js`
- Filtert nach `searchQuery`: Symbol oder Typ enthält den Suchbegriff
- Rendert `<GlassCard>` + `<table>`

### Filterlogik

```js
const filteredTransactions = transactions.filter(tx =>
  tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
  tx.type.toLowerCase().includes(searchQuery.toLowerCase())
)
```

### Mobile-Spalten-Hiding

Tailwind-Responsive-Klassen auf `<th>` und `<td>`:
```jsx
// Menge-Spalte: nur ab md sichtbar
<th className="hidden md:table-cell">Menge</th>
<td className="hidden md:table-cell">{formatAmount(tx.amount, tx.symbol)}</td>

// Preis-Spalte: nur ab md sichtbar
<th className="hidden md:table-cell">Preis</th>
<td className="hidden md:table-cell">{formatPrice(tx.pricePerUnit)}</td>
```

### Typ-Badge

```jsx
// Inline-Komponente in TransactionsTable.jsx
function TypeBadge({ type }) {
  const isBuy = type === "buy"
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
      ${isBy ? "bg-[var(--green-bg)] text-[var(--green)]" : "bg-[var(--red-bg)] text-[var(--red)]"}`}>
      {isBy ? "↑" : "↓"} {isBy ? "Kauf" : "Verkauf"}
    </span>
  )
}
```

### Leer-State

```jsx
{filteredTransactions.length === 0 && (
  <tr>
    <td colSpan={6} className="text-center py-8 text-[var(--text-secondary)]">
      Keine Transaktionen gefunden
    </td>
  </tr>
)}
```

### A11y
- `<section aria-label="Letzte Transaktionen">`
- `<table>` mit `<caption class="sr-only">Letzte 5 Transaktionen</caption>`
- `<th scope="col">` auf alle Header-Zellen
- `tabindex="0"` auf Tabellen-Container für Keyboard-Scrollbarkeit auf Mobile

### Fortschritt
- Status: Freigegeben, Aktueller Schritt: Tech
