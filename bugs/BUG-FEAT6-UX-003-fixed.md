---
status: Fixed
severity: Low
feature: FEAT-6
---

# BUG-FEAT6-UX-003: TransactionsTable – Coin-Name in Mobile-Ansicht fehlt

**Severity:** Low
**Feature:** FEAT-6
**Komponente:** TransactionsTable.jsx

## Beschreibung
Die Spezifikation (UX-Entscheidungen FEAT-6, Mobile-Handling) definiert für die Mobile-Ansicht (<768px) 3 kombinierte Spalten: "Datum, Typ + Coin kombiniert, Gesamt". Die Kombinations-Spalte soll lauten: "↑ Kauf · BTC".

In der implementierten Mobile-Card-Liste (`<div className="sm:hidden">`) wird der Typ-Badge getrennt vom Symbol angezeigt – das ist grundsätzlich akzeptabel. Aber der Coin-Name fehlt komplett in der Mobile-Ansicht. Die Mobile-Zeile zeigt: `[TypeBadge] [Symbol]` und `[Datum]` links sowie `[Gesamt] [Menge]` rechts.

Das Symbol "BTC" allein ist für einen Coin ausreichend, aber der `coinName` ("Bitcoin") ist in der Mobile-Ansicht nicht mehr sichtbar. Bei ADA oder XRP könnte das für weniger erfahrene Nutzer verwirrend sein.

## Auswirkung
Geringes Problem für den Prototyp-Kontext (Zielgruppe kennt Crypto-Symbole). Für einen vollständigen Showcase-Eindruck ist es ein Feinschliff-Item.

## Erwartetes Verhalten
Mobile-Zeile zeigt Coin-Symbol und darunter den Coin-Namen als zweite Zeile (bereits für Symbol vorhanden in der Desktop-Ansicht), oder zumindest "Kauf · BTC" als kombinierte Zeile wie in der Spec.

## Fix-Vorschlag
In der Mobile-Card-Struktur:
```jsx
<div>
  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
    {tx.symbol}
  </p>
  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
    {tx.coinName}  {/* Hinzufügen */}
  </p>
  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
    {formatDate(tx.date)}
  </p>
</div>
```
