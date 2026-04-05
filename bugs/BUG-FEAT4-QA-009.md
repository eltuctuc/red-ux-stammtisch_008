---
status: open
severity: Low
feature: FEAT-4
---

# BUG-FEAT4-QA-009: formatDate in ChartTooltip kann bei ungültigem Datum-String crashen

**Severity:** Low
**Feature:** FEAT-4
**Komponente:** `components/chart/ChartTooltip.jsx`, `utils/formatters.js`

## Beschreibung

`ChartTooltip.jsx` ruft `formatDate(label)` auf, wobei `label` der `dataKey="date"` Wert aus Recharts ist. In `formatters.js`:

```js
export function formatDate(isoString) {
  return dateFormatter.format(new Date(isoString))
}
```

`new Date(undefined)` → `Invalid Date`. `dateFormatter.format(Invalid Date)` wirft einen `RangeError: Invalid time value` in einigen Browsern (insbesondere Safari).

In der Praxis ist das nur ein Problem wenn Recharts den `label` als `undefined` übergibt (z.B. beim ersten Render oder bei fehlerhaften Datenpunkten). Der Code in `ChartTooltip.jsx` prüft bereits `label ? formatDate(label) : null` – das verhindert den Crash bei `null` oder leerem String, aber `new Date(null)` gibt das Epoch-Datum zurück (1. Januar 1970), was zu einem falschen Datum im Tooltip führen würde, wenn `label` fälschlicherweise `null` ist.

EC-4.1 (Datensatz mit weniger Punkten) erhöht das Risiko, dass Recharts Randwerte als `undefined` übergibt.

## Reproduktion

1. Recharts Tooltip mit einem ungültigen/fehlenden label triggern
2. Alternativ: `formatDate(null)` aufrufen → rendert "1. Januar 1970" statt nichts

## Erwartetes Verhalten

`formatDate` mit ungültigem Input gibt `null` oder einen leeren String zurück, kein Crash und kein Epoch-Datum.

## Tatsächliches Verhalten

`new Date(null)` = Epoch-Datum → Tooltip würde "1. Januar 1970" anzeigen.

## Fix-Vorschlag

```js
// formatters.js
export function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return ''
  return dateFormatter.format(d)
}
```
