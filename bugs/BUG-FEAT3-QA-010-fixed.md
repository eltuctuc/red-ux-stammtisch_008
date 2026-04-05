---
status: Fixed
severity: Low
feature: FEAT-3
---

# BUG-FEAT3-QA-010: PortfolioHero kein hover=true auf GlassCard – AC-3.7 nicht erfüllt

**Severity:** Low
**Feature:** FEAT-3
**Komponente:** `components/portfolio/PortfolioHero.jsx`

## Beschreibung

AC-3.7 fordert: "Hover-Animation: `transform: translateY(-2px)` + verstärkter Box-Shadow – Transition `200ms ease-out`."

`GlassCard.jsx` implementiert diese Hover-Animation korrekt über das `hover`-Prop (`hover ? 'glass-card-hover' : ''`).

`PortfolioHero.jsx` rendert jedoch:
```jsx
<GlassCard className="overflow-hidden">
```

Das `hover`-Prop fehlt. Die Hero-Karte hat dadurch keine Hover-Animation und hebt sich nicht beim Darüberfahren.

## Reproduktion

1. App starten
2. Mit der Maus über die Portfolio-Hero-Karte fahren
3. Keine Animation sichtbar

## Erwartetes Verhalten

Karte hebt sich um 2px und intensiviert den Box-Shadow beim Hover.

## Tatsächliches Verhalten

Keine Reaktion auf Hover.

## Fix-Vorschlag

```jsx
// PortfolioHero.jsx
<GlassCard hover className="overflow-hidden">
```
