---
status: Fixed
severity: High
feature: FEAT-6
---

# BUG-FEAT6-QA-002: TransactionsTable empfängt kein searchQuery-Prop – Suchfilter funktioniert nicht

**Severity:** High
**Feature:** FEAT-6
**Komponente:** `App.jsx`, `components/transactions/TransactionsTable.jsx`

## Beschreibung

Laut AC-6.6 soll die Transaktions-Tabelle über die globale Suchleiste filterbar sein. `App.jsx` rendert die Komponente aber ohne das `searchQuery`-Prop:

```jsx
// App.jsx Zeile 40
transactions={<TransactionsTable />}
```

`TransactionsTable.jsx` selbst definiert keine Props, importiert keine Filterlogik und rendert immer alle 5 Transaktionen ungefiltert.

## Reproduktion

1. App starten
2. In die Suchleiste "BTC" eintippen
3. Watchlist filtert korrekt auf BTC-Einträge
4. Transaktions-Tabelle zeigt weiterhin alle 5 Einträge ungefiltert

## Erwartetes Verhalten

Suchbegriff "BTC" filtert die Transaktions-Tabelle auf BTC-Einträge (t1 und t4). Alle anderen Zeilen werden ausgeblendet. Bei keinen Treffern erscheint "Keine Transaktionen gefunden".

## Tatsächliches Verhalten

Die Transaktions-Tabelle zeigt immer alle 5 Einträge, unabhängig vom Suchbegriff. Die Suche hat keinerlei Effekt auf die Tabelle.

## Fix-Vorschlag

1. `TransactionsTable` mit `searchQuery` Prop ausstatten und Filterlogik ergänzen:

```jsx
// App.jsx
transactions={<TransactionsTable searchQuery={searchQuery} />}
```

2. In `TransactionsTable.jsx`:

```jsx
export default function TransactionsTable({ searchQuery = '' }) {
  const filtered = transactions.filter(tx =>
    tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase())
  )
  // Leerzustand rendern wenn filtered.length === 0
  // filtered statt transactions verwenden
}
```
