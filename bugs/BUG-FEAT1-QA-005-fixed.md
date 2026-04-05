---
status: Fixed
severity: Medium
feature: FEAT-1
---

# BUG-FEAT1-QA-005: selectedTimeframe-Default ist '1W' statt '1M' (Spec-Abweichung)

**Severity:** Medium
**Feature:** FEAT-1
**Komponente:** `App.jsx`

## Beschreibung

Das technische Design in FEAT-1 (und FEAT-4) spezifiziert den Default-Timeframe als `"1M"`:

> `selectedTimeframe: "1T" | "1W" | "1M" | "3M" = "1M"`

In `App.jsx` Zeile 13 ist der initiale State auf `'1W'` gesetzt:

```jsx
const [selectedTimeframe, setSelectedTimeframe] = useState('1W')
```

Das bedeutet: beim App-Start wird der 7-Tage-Chart angezeigt, nicht der 30-Tage-Chart. Für den Showcase-Eindruck ist der 1M-Chart üblicherweise aussagekräftiger und war bewusst als Standard gewählt.

## Reproduktion

1. App starten
2. PriceChart zeigt standardmäßig "1W" als aktiven Zeitraum
3. Spec fordert "1M" als Default

## Erwartetes Verhalten

App startet mit "1M" als aktivem Zeitraum im PriceChart.

## Tatsächliches Verhalten

App startet mit "1W" als aktivem Zeitraum.

## Fix-Vorschlag

```jsx
// App.jsx Zeile 13
const [selectedTimeframe, setSelectedTimeframe] = useState('1M')
```
