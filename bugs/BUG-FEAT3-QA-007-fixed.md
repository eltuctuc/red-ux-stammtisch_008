---
status: Fixed
severity: Low
feature: FEAT-3
---

# BUG-FEAT3-QA-007: PortfolioSparkline hat Tooltip – Spec fordert ausdrücklich keinen Tooltip

**Severity:** Low
**Feature:** FEAT-3
**Komponente:** `components/portfolio/PortfolioSparkline.jsx`

## Beschreibung

AC-3.5 fordert: "ohne Tooltip".
Das UX-Design (Abschnitt 2, Sparkline-Spec) wiederholt: "kein Tooltip".
Das technische Design: `<LineChart>` ohne Tooltip.

`PortfolioSparkline.jsx` enthält trotzdem eine `<Tooltip>`-Komponente mit einem custom `SparkTooltip`:

```jsx
<Tooltip content={<SparkTooltip />} cursor={false} />
```

Das ist eine bewusste Spec-Abweichung. Für eine Sparkline die nur den Trend anzeigt, ist ein Tooltip konzeptuell inkonsistent und erzeugt beim Hover einen visuellen State (Tooltip-Box) der nicht vorgesehen ist.

## Reproduktion

1. App starten
2. Über die Portfolio-Sparkline (oben rechts in der Hero-Karte) hovern
3. Ein Tooltip mit dem kompakten Preiswert erscheint

## Erwartetes Verhalten

Kein Tooltip beim Hovern über die Portfolio-Sparkline.

## Tatsächliches Verhalten

Tooltip mit Preis erscheint beim Hovern.

## Fix-Vorschlag

`<Tooltip>`-Import und -Verwendung aus `PortfolioSparkline.jsx` entfernen. Auch den `SparkTooltip`-Helper entfernen da er dann unused ist.

```jsx
// PortfolioSparkline.jsx – Tooltip-Import entfernen
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
// SparkTooltip-Funktion entfernen
// <Tooltip>-Zeile aus dem JSX entfernen
```
