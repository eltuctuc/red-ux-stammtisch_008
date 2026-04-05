---
status: approved
---

# FEAT-4: Preis-Chart
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-4
- **Feature-Name:** Preis-Chart
- **Zielgruppe:** Markus (technische Bewertung), Lena (visuelle Qualität), Demo-Publikum
- **Abhängigkeiten:** FEAT-1 (Mock-Daten), FEAT-5 (Coin-Selektion triggert Chart-Update)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Der interaktive Chart ist das visuell dominanteste Element der App und der stärkste Demo-Moment: Coin wechseln → Chart animiert sich neu. Zeitraum wechseln → andere Daten, sofort sichtbar.

## Nicht im Scope
- Candlestick-Charts
- Volumen-Daten
- Chart-Download oder -Export
- Vergleich mehrerer Coins im gleichen Chart
- Technische Indikatoren (RSI, MACD etc.)

---

## User Stories

**US-4.1** Als Demo-Zuschauer möchte ich sehen wie der Chart auf die Auswahl eines anderen Coins in der Watchlist reagiert, damit die App lebendig und verbunden wirkt.

**US-4.2** Als Nutzer möchte ich zwischen 4 Zeiträumen wählen (1T / 1W / 1M / 3M), damit ich kurz- und langfristige Preisentwicklungen unterscheiden kann.

**US-4.3** Als Nutzer möchte ich beim Hovern über den Chart einen Tooltip mit Datum und Preis sehen, damit ich präzise Werte ablesen kann.

**US-4.4** Als Entwickler (Markus) möchte ich dass der Chart transparent gerendert wird und sich nahtlos in die Glassmorphism-Karte einfügt, damit kein "eingeklebter Screenshot"-Effekt entsteht.

**US-4.5** Als Nutzer im Light-Mode möchte ich dass der Chart auch dort sauber und lesbar aussieht – keine Elemente mit hardcoded dunklen Farben.

---

## Acceptance Criteria

**AC-4.1** Der Chart wird als Recharts `AreaChart` oder `LineChart` gerendert mit `ResponsiveContainer` (width: "100%", height: 280px minimum).

**AC-4.2** Der Chart-Hintergrund ist vollständig transparent (`background: "transparent"` am Chart-Element, kein weißer SVG-Hintergrund).

**AC-4.3** Zeitraum-Buttons zeigen: "1T" / "1W" / "1M" / "3M" – aktiver Button ist visuell hervorgehoben (z.B. accent-farbiger Hintergrund oder Underline).

**AC-4.4** Klick auf Zeitraum-Button wechselt den angezeigten Datensatz sofort (kein Debounce, kein Loading-State nötig da Mock-Daten synchron).

**AC-4.5** Der Tooltip zeigt bei Hover: Datum (formatiert als "12. März 2025") und Preis (formatiert als "$42,350.00").

**AC-4.6** Der Chart zeigt eine Area-Fill (Gradient von Linie nach unten, semi-transparent) oder eine einfache Line – kein vollständig opakes Fill.

**AC-4.7** Die Y-Achse zeigt Preise in verkürzter Form (z.B. "$42K") ohne überfüllte Labels. Die X-Achse zeigt Datums-Labels nur für Anfang und Ende des Zeitraums.

**AC-4.8** Wenn der aktive Coin in der Watchlist wechselt, aktualisiert sich der Chart sofort mit dem neuen Datensatz – der gewählte Zeitraum bleibt erhalten.

**AC-4.9** Der Chart-Bereich hat eine Glassmorphism-Karten-Umrandung (konsistent mit FEAT-3), Hover-Animation (gleiche Spec wie AC in FEAT-3).

---

## Edge Cases

**EC-4.1** Datensatz für "1T" hat weniger als 24 Datenpunkte in den Mock-Daten: Chart rendert mit verfügbaren Punkten, kein Fehler.

**EC-4.2** Viewport-Resize während Tooltip aktiv: Tooltip schließt sich, Chart passt sich via `ResponsiveContainer` automatisch an.

**EC-4.3** Sehr schmaler Viewport (<400px): Chart bleibt nutzbar, Zeitraum-Buttons scrollen horizontal oder wrappen – kein Overflow auf das Gesamt-Layout.

**EC-4.4** Alle Preise im Zeitraum sind identisch (flache Linie): Chart zeigt eine horizontale Linie – kein Division-by-Zero in der Gradient-Berechnung.

**EC-4.5** Theme-Wechsel während Tooltip aktiv: Tooltip schließt sich, Chart wechselt Farbschema sauber.

---

## 2. UX Entscheidungen
*Erstellt von: /red:proto-ux — 2026-04-05*

### Einbettung
Der Preis-Chart ist das visuelle Herzstück und nimmt den größten Bereich des Main-Bereichs ein. Er liegt direkt unter der Hero-Karte, volle Breite des Main-Bereichs.

### Komponenten & Layout

**Karten-Struktur:**
```
┌─── Glass Card (24px padding) ──────────────────────────────────┐
│  [Coin-Name + Symbol]         [1T] [1W] [1M] [3M]             │
│  $42,350.00  ↑ +2.3%                                           │
│  ┌──────────────── AreaChart (100% × 280px) ─────────────────┐ │
│  │ $45K ┤                                                     │ │
│  │ $40K ┤    ╭───╮      ╭─────╮                              │ │
│  │ $35K ┤───╯   ╰──────╯     ╰────                           │ │
│  │      └────────────────────────────── Jan  →  Apr           │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### Zeitraum-Button-Gruppe
- 4 Buttons: "1T" / "1W" / "1M" / "3M"
- Layout: inline-flex, gap 4px, float rechts oben in der Karte
- Aktiver Button: `background: var(--accent-bg)`, `color: var(--accent)`, `border: 1px solid var(--accent)`, border-radius 8px
- Inaktiver Button: `background: transparent`, `color: var(--text-secondary)`, Hover: `background: var(--bg-surface-high)`
- Padding: 6px 12px → Höhe ~32px (kleiner als normale Touch-Targets ok, da Desktop-Primär)
- Mobile: Buttons in voller Breite als Tabs unter dem Karten-Titel

### AreaChart Konfiguration
- Recharts `<AreaChart>` (nicht LineChart – Area-Fill ist visuell eindrucksvoller)
- Höhe: 280px (Desktop), 200px (Mobile)
- Background: `"transparent"` – kritisch für Glassmorphism-Kompatibilität
- Area-Fill: `<defs><linearGradient>` von `var(--accent)` mit opacity 0.3 oben → 0 unten
- Linie: `stroke: var(--accent)`, `strokeWidth: 2`
- Dot: `dot={false}`, `activeDot={{ r: 4, fill: var(--accent) }}`
- isAnimationActive: `true`, animationDuration: `600`

### Achsen
- **YAxis:** `tickFormatter={(v) => v >= 1000 ? '$' + (v/1000).toFixed(0) + 'K' : '$' + v}`, width: 50px, `tick={{ fill: var(--text-secondary), fontSize: 11 }}`, keine vertikale Linie (`axisLine={false}`, `tickLine={false}`)
- **XAxis:** Nur 2 Ticks: erster und letzter Datenpunkt. `tick={{ fill: var(--text-secondary), fontSize: 11 }}`, `axisLine={false}`, `tickLine={false}`
- **CartesianGrid:** `strokeDasharray="4 4"`, `stroke: rgba(255,255,255,0.05)` (dark) / `rgba(0,0,0,0.05)` (light)

### Tooltip
```
┌──────────────────┐
│  12. März 2025   │
│  $42,350.00      │
└──────────────────┘
```
- Custom `<Tooltip contentStyle>`: glass-card Stil (blur + border + border-radius 10px)
- `labelFormatter`: Datum als "12. März 2025"
- `formatter`: Preis als "$42,350.00"
- `cursor={{ stroke: var(--accent), strokeWidth: 1, strokeDasharray: '4 4' }}`

### Coin-Info im Chart-Header (unter Karten-Titel)
- Coin-Name (z.B. "Bitcoin") + Symbol (z.B. "BTC") in 16px / 600
- Aktueller Preis in 15px / 600 / tabular-nums
- 24h-Change in 13px / 500, grün/rot
- Begründung: Nutzer sieht sofort welcher Coin gerade angezeigt wird – kein Suchen nötig

### Touch-Target-Tabelle

| Element | Höhe visuell | WCAG 2.5.5 (44px) | Lösung |
|---------|-------------|-------------------|--------|
| Zeitraum-Buttons Desktop | ~32px | ❌ Desktop-Only | Akzeptiert – primäres Gerät Desktop |
| Zeitraum-Buttons Mobile | 44px als Tabs | ✅ | volle Breite, 44px Höhe |
| Chart selbst (Hover) | – | n/a | Keine Touch-Target-Anforderung |

### Fortschritt
- Status: Freigegeben, Aktueller Schritt: UX
