---
status: Fixed
severity: Medium
feature: FEAT-6
---

# BUG-FEAT6-UX-002: TransactionsTable – th-Elemente ohne scope="col"

**Severity:** Medium
**Feature:** FEAT-6
**Komponente:** TransactionsTable.jsx

## Beschreibung
Die Spezifikation (A11y FEAT-6) verlangt `<th scope="col">` auf allen Header-Zellen der Tabelle. In der Implementierung werden die Header-Zellen per `.map()` über ein Array generiert:

```jsx
{['Datum', 'Typ', 'Coin', 'Menge', 'Preis/Stk.', 'Gesamt'].map(h => (
  <th key={h} className="..." style={...}>{h}</th>
))}
```

Das `scope="col"`-Attribut fehlt auf allen generierten `<th>`-Elementen. Ohne `scope` können Screenreader bei komplexeren Tabellen nicht eindeutig zuordnen, welche Header-Zelle welche Datenzellen beschreibt.

Außerdem fehlt das `<caption>`-Element (laut Spec: `<caption class="sr-only">Letzte 5 Transaktionen</caption>`). Das `aria-label` auf dem `<table>`-Element ist vorhanden, aber `<caption>` ist semantisch präziser und wird von mehr AT-Tools korrekt verarbeitet.

## Auswirkung
Screenreader-Nutzer erhalten bei der Tabellennavigation (Zelle für Zelle mit Pfeiltasten) möglicherweise keine korrekte Header-Zuordnung. Bei einer simplen 6-Spalten-Tabelle ist das oft unkritisch – Browser leiten es ab. Aber es ist ein dokumentierter Verstoß gegen die eigene A11y-Spec.

## Erwartetes Verhalten
Alle `<th>` mit `scope="col"`. Optional: `<caption className="sr-only">Letzte 5 Transaktionen</caption>` innerhalb der `<table>`.

## Fix-Vorschlag
```jsx
{['Datum', 'Typ', 'Coin', 'Menge', 'Preis/Stk.', 'Gesamt'].map(h => (
  <th
    key={h}
    scope="col"
    className="..."
    style={...}
  >
    {h}
  </th>
))}
```
Und vor `<thead>` einfügen:
```jsx
<caption className="sr-only">Letzte 5 Transaktionen</caption>
```
