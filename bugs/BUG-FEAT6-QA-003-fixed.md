---
status: Fixed
severity: High
feature: FEAT-6
---

# BUG-FEAT6-QA-003: Kein Leer-State in TransactionsTable – fehlende "Keine Transaktionen"-Anzeige

**Severity:** High
**Feature:** FEAT-6
**Komponente:** `components/transactions/TransactionsTable.jsx`

## Beschreibung

AC-6.6 fordert: "Bei keinen Treffern erscheint ein 'Keine Transaktionen gefunden'-Hinweis." EC-6.1 präzisiert: "Tabellen-Body zeigt 'Keine Transaktionen gefunden' (colspan über alle Spalten), Header bleibt sichtbar."

`TransactionsTable.jsx` enthält weder Filterlogik noch einen Leer-State. Das `<tbody>` würde leer bleiben, was eine weiße Fläche ohne Hinweis hinterlässt – direkt gegen die Spec.

Dieser Bug ist funktional mit BUG-FEAT6-QA-002 verknüpft (fehlendes `searchQuery`-Prop), aber unabhängig davon muss der Leer-State implementiert werden.

## Reproduktion

Voraussetzung: BUG-FEAT6-QA-002 ist gefixt (searchQuery-Prop wird weitergegeben).

1. In Suchleiste "DOGE" eingeben (kein Treffer in den Mock-Daten)
2. Tabellen-Body ist leer – kein Hinweis sichtbar

## Erwartetes Verhalten

Tabellen-Header bleibt sichtbar. Im Tabellen-Body erscheint eine Zeile mit `colspan={6}` und dem Text "Keine Transaktionen gefunden".

## Tatsächliches Verhalten

Tabellen-Body ist leer, keine Fehlermeldung, keine Nutzerkommunikation.

## Fix-Vorschlag

```jsx
<tbody>
  {filteredTransactions.length === 0 ? (
    <tr>
      <td colSpan={6} className="py-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Keine Transaktionen gefunden
      </td>
    </tr>
  ) : (
    filteredTransactions.map((tx, i) => ( /* ... */ ))
  )}
</tbody>
```
