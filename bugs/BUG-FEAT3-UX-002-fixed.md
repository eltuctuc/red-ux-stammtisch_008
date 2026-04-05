---
status: Fixed
severity: Medium
feature: FEAT-3
---

# BUG-FEAT3-UX-002: PortfolioSparkline – Tooltip in Mini-Sparkline widerspricht der Spec

**Severity:** Medium
**Feature:** FEAT-3
**Komponente:** PortfolioSparkline.jsx

## Beschreibung
Die Spezifikation definiert für die Portfolio-Sparkline (AC-3.5): "keine Achsenbeschriftung, ohne Grid, ohne Tooltip." Und in den UX-Entscheidungen: "kein Achsen-Label, kein Tooltip, Farbe: grün wenn positive 24h-Change".

`PortfolioSparkline.jsx` implementiert jedoch einen `<Tooltip content={<SparkTooltip />} cursor={false} />`. Der Tooltip erscheint beim Hovern über die Mini-Sparkline und zeigt den kompakten Preis. Das ist eine Abweichung von der Spec – die Sparkline soll eine reine visuelle Indikation sein, kein interaktives Datenelement.

Für sich genommen wäre ein Tooltip ein Nice-to-have. Das Problem: Die Spec ist hier absichtlich restriktiv (Mini = keine Interaktion, nur Trend), und der Tooltip auf einer 64px hohen Fläche erscheint näher am Chart-Bereich als an der Mini-Karte – was visuell verwirrend sein kann wenn der User hover-navigiert.

## Auswirkung
Geringes Reibungspotenzial. Nutzer die über die Hero-Karte hovern (wegen der fehlenden Hover-Animation eigentlich kein geplanter Moment) sehen unerwartet Tooltip-Daten auf einer Mini-Sparkline die als rein dekorativ konzipiert ist.

## Erwartetes Verhalten
Keine Tooltip-Komponente auf der Portfolio-Sparkline. Nur die Area-Kurve als visueller Trend-Indikator.

## Fix-Vorschlag
In `PortfolioSparkline.jsx` die `<Tooltip>`-Zeile und die `SparkTooltip`-Komponente entfernen:
```jsx
// Entfernen:
<Tooltip content={<SparkTooltip />} cursor={false} />
```
