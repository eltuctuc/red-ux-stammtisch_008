---
status: Fixed
severity: High
feature: FEAT-2
---

# BUG-FEAT2-UX-001: TransactionsTable erhält keine searchQuery-Prop – Suchfilter ohne Effekt

**Severity:** High
**Feature:** FEAT-2
**Komponente:** App.jsx, TransactionsTable.jsx

## Beschreibung
In `App.jsx` wird `<TransactionsTable />` ohne Props gerendert. Die Komponente erwartet laut Spezifikation eine `searchQuery`-Prop und soll die Transaktionsliste entsprechend filtern. Tatsächlich importiert `TransactionsTable.jsx` die `transactions`-Daten direkt und rendert immer alle 5 Einträge – unabhängig davon was in der Suchleiste steht.

Der User gibt "BTC" ein: die Watchlist filtert korrekt, die Transaktionsliste bleibt unverändert. Das Verhalten widerspricht der in AC-2.4 und AC-6.6 definierten Erwartung und bricht die kommunizierte Funktion der globalen Suche.

## Auswirkung
Die globale Suchleiste funktioniert nur halb: Watchlist reagiert, Transaktionen nicht. Das wirkt wie ein kaputtes Feature, nicht wie ein bewusstes Design-Entscheid. Für Markus (Entwickler-Persona) ist das beim Lesen des Codes sofort sichtbar und beschädigt das Vertrauen in die Implementierungsqualität.

## Erwartetes Verhalten
Eingabe von "BTC" in die Suchleiste filtert sowohl die Watchlist als auch die Transaktionsliste. "Keine Transaktionen gefunden" erscheint wenn kein Coin-Symbol oder Typ matcht (AC-6.6).

## Fix-Vorschlag
In `App.jsx` die `searchQuery`-Prop an `TransactionsTable` übergeben:
```jsx
transactions={<TransactionsTable searchQuery={searchQuery} />}
```
In `TransactionsTable.jsx` die Filterlogik aktivieren:
```jsx
export default function TransactionsTable({ searchQuery = '' }) {
  const filtered = transactions.filter(tx =>
    tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // filtered statt transactions in render nutzen
}
```
Außerdem den Leerzustand in der Desktop-Tabelle implementieren (colSpan auf alle 6 Spalten).
