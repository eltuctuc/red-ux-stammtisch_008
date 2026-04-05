---
status: Fixed
severity: Low
feature: FEAT-5
---

# BUG-FEAT5-UX-003: MiniSparkline – fehlende Margins führen zu abgeschnittenem Stroke

**Severity:** Low
**Feature:** FEAT-5
**Komponente:** MiniSparkline.jsx (auch betroffen: WatchlistItem.jsx, WatchlistCard.jsx)

## Beschreibung
`MiniSparkline.jsx` rendert ein `<LineChart>` ohne Margin-Konfiguration. Recharts setzt standardmäßig Margins von `{ top: 5, right: 5, bottom: 5, left: 5 }`. Das bedeutet: Bei einem `div` mit fester Breite (w-20 = 80px, Höhe h-10 = 40px) wird der Chart in diese Margins eingequetscht.

Das Problem ist subtil aber sichtbar: Der `strokeWidth: 1.5` der Linie wird am Rand exakt auf der Kante des SVG-Viewports gerendert. Wenn die Datenpunkte Extremwerte an den Rändern haben (was bei 7-Tage-Verläufen häufig vorkommt), wird die obere oder untere Hälfte des Linienstrichs abgeschnitten – der Stroke erscheint an den Kanten dünner oder "angeschnitten".

Vergleich zur PortfolioSparkline: Diese setzt `margin={{ top: 2, right: 0, left: 0, bottom: 2 }}` explizit – MiniSparkline fehlt das.

## Auswirkung
Bei extremen Datenpunkten (z.B. Coin mit starkem Preisanstieg am letzten der 7 Tage) kann der Linienstrich oben abgeschnitten wirken. Das ist ein subtiles aber für Lena (UX-Designerin) sichtbares Qualitätsproblem.

## Erwartetes Verhalten
Linienstrich vollständig sichtbar, ohne Abschneidung an den Kanten.

## Fix-Vorschlag
Explizite Margin-Konfiguration in `MiniSparkline.jsx`:
```jsx
<LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
```
