---
status: Fixed
severity: Low
feature: FEAT-6
---

# BUG-FEAT6-QA-013: Tabellen-Header ohne scope="col" – A11y-Spec nicht erfüllt

**Severity:** Low
**Feature:** FEAT-6
**Komponente:** `components/transactions/TransactionsTable.jsx`

## Beschreibung

Das technische Design von FEAT-6 spezifiziert:
> `<th scope="col">` auf alle Header-Zellen

`TransactionsTable.jsx` rendert die Header-Zellen via `.map()` ohne `scope`-Attribut:

```jsx
{['Datum', 'Typ', 'Coin', 'Menge', 'Preis/Stk.', 'Gesamt'].map(h => (
  <th key={h} className="pb-3 text-left font-medium ...">
    {h}
  </th>
))}
```

Ohne `scope="col"` können assistive Technologien (Screen-Reader) die Spaltenbeziehung zwischen Headern und Datenzellen nicht korrekt kommunizieren.

Zusätzlich fehlt das in der Spec geforderte `<caption class="sr-only">Letzte 5 Transaktionen</caption>`.

## Reproduktion

1. Tabelle mit axe DevTools oder einem Screen-Reader analysieren
2. `<th>` ohne `scope` wird als WCAG 1.3.1-Verstoß flagged

## Erwartetes Verhalten

```html
<th scope="col">Datum</th>
<caption class="sr-only">Letzte 5 Transaktionen</caption>
```

## Tatsächliches Verhalten

`<th>` ohne `scope`, keine `<caption>`.

## Fix-Vorschlag

```jsx
// TransactionsTable.jsx
{['Datum', 'Typ', 'Coin', 'Menge', 'Preis/Stk.', 'Gesamt'].map(h => (
  <th key={h} scope="col" className="pb-3 text-left font-medium ...">
    {h}
  </th>
))}

// Caption vor thead:
<caption className="sr-only">Letzte 5 Transaktionen</caption>
```
