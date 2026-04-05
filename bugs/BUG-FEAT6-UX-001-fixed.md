---
status: Fixed
severity: High
feature: FEAT-6
---

# BUG-FEAT6-UX-001: TransactionsTable – Suchfilter fehlt vollständig (Folgebug zu BUG-FEAT2-UX-001)

**Severity:** High
**Feature:** FEAT-6
**Komponente:** TransactionsTable.jsx

## Beschreibung
Dieser Bug ist die Komponentenseite von BUG-FEAT2-UX-001: `TransactionsTable.jsx` akzeptiert keine Props und hat keine Filterlogik. Die Komponente rendert immer alle 5 Transaktionen aus `transactions.js`, unabhängig von der Sucheingabe.

Konkret fehlend:
1. Props-Deklaration: `export default function TransactionsTable()` statt `TransactionsTable({ searchQuery = '' })`
2. Filterlogik: Keine `filteredTransactions`-Variable
3. Leerzustand Desktop: Kein `<tr><td colSpan={6}>Keine Transaktionen gefunden</td></tr>`
4. Leerzustand Mobile: Kein leerer Zustand in der Mobile-Card-Liste

## Auswirkung
Die globale Suche ist die einzige interaktive Funktion die alle Bereiche der App gleichzeitig filtert. Wenn sie für die Transaktionsliste nicht funktioniert, wirkt die Suchleiste halb kaputt. Das beschädigt das Vertrauen in die gesamte App – besonders bei Markus (Demo: "Suche ich nach ETH – Watchlist filtert, Transaktionen aber nicht?").

## Erwartetes Verhalten
Sucheingabe "eth" filtert: Watchlist zeigt ETH-Karte, Transaktionen zeigt nur ETH-Transaktionen. Bei 0 Treffern: "Keine Transaktionen gefunden" mit sichtbarem Header.

## Fix-Vorschlag
Vollständige Implementierung der Filterlogik – Details im Fix-Vorschlag von BUG-FEAT2-UX-001. Zusätzlich für den Leerzustand in der Desktop-Tabelle:
```jsx
{filteredTransactions.length === 0 && (
  <tr>
    <td colSpan={6} className="py-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
      Keine Transaktionen gefunden
    </td>
  </tr>
)}
```
Für Mobile analog mit einem zentrierten Hinweistext.
