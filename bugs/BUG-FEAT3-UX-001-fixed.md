---
status: Fixed
severity: High
feature: FEAT-3
---

# BUG-FEAT3-UX-001: PortfolioHero – Hover-Animation fehlt (GlassCard ohne hover-Prop)

**Severity:** High
**Feature:** FEAT-3
**Komponente:** PortfolioHero.jsx, GlassCard.jsx

## Beschreibung
Die Spezifikation definiert in AC-3.7 explizit: "Hover-Animation: `transform: translateY(-2px)` + verstärkter Box-Shadow – Transition 200ms ease-out". Das Feature-Doc führt das als Demo-Moment: "US-3.4: Als Demo-Zuschauer möchte ich dass die Hero-Karte sich beim Hovern subtil hebt".

`GlassCard.jsx` implementiert die Hover-Animation korrekt als `.glass-card-hover`-Klasse, die über das `hover`-Prop gesteuert wird. In `PortfolioHero.jsx` wird `<GlassCard>` jedoch ohne das `hover`-Prop gerendert:
```jsx
<GlassCard className="overflow-hidden">
```
Die Hover-Animation ist dadurch für die wichtigste Demo-Karte der App komplett deaktiviert.

## Auswirkung
Die Hero-Karte ist das erste visuelle Element unter dem Header und soll laut Spec den "Wow-Moment" beim Demo setzen. Ohne die Hover-Animation wirkt sie statisch und weniger lebendig als alle anderen Karten (PriceChart hat ebenfalls keine Hover-Animation, was konsistent wäre – aber die Spec ist hier eindeutig).

## Erwartetes Verhalten
Die Portfolio-Hero-Karte hebt sich beim Hover um 2px auf der Y-Achse mit verstärktem Box-Shadow, Transition 200ms.

## Fix-Vorschlag
In `PortfolioHero.jsx` das `hover`-Prop ergänzen:
```jsx
<GlassCard hover className="overflow-hidden">
```
Die `.glass-card-hover`-Klasse in `index.css` ist bereits korrekt definiert – nur die Aktivierung fehlt.
