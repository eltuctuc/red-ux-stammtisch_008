---
status: Fixed
severity: Medium
feature: FEAT-5
---

# BUG-FEAT5-UX-002: WatchlistItem – aria-pressed semantisch falsch, keine Listbox-Rolle

**Severity:** Medium
**Feature:** FEAT-5
**Komponente:** WatchlistItem.jsx

## Beschreibung
`WatchlistItem.jsx` und `WatchlistCard.jsx` verwenden `<button aria-pressed={isSelected}>`. Das ist semantisch inkorrekt: `aria-pressed` ist für Toggle-Buttons gedacht (ein/aus-Zustand), nicht für die Selektion in einer Liste. Der Nutzer wählt einen Coin aus einer Menge aus – das ist eine `aria-selected`-Semantik innerhalb einer Listbox, nicht ein Toggle.

Die Spezifikation (A11y FEAT-5) nennt selbst: `<button role="option" aria-selected={isSelected}>`. Diese Kombination ist ebenfalls problematisch (button + role="option" ist invalides ARIA), aber der Intent ist klar: Die Selektion soll als Auswahl kommuniziert werden, nicht als Toggle-Zustand.

Ein Screenreader liest bei `aria-pressed={true}` vor: "Bitcoin auswählen, gedrückt" – was impliziert der Button sei aktiviert/gedrückt geblieben, nicht dass BTC der aktuell angezeigte Coin ist.

## Auswirkung
Für Screenreader-Nutzer ist die semantische Bedeutung der Coin-Auswahl unklar. "Gedrückt" klingt nach einem dauerhaft aktivierten Schalter, nicht nach "aktuell ausgewählt und im Chart angezeigt".

## Erwartetes Verhalten
Die semantische Ansage beim ausgewählten Coin sollte lauten: "Bitcoin ausgewählt" – klar vermittelt dass dieser Coin der aktive/angezeigte ist.

## Fix-Vorschlag
`aria-pressed` durch `aria-current="true"` ersetzen: Das ist für "aktuell ausgewählt/aktiv" semantisch präziser in einem nicht-Listbox-Kontext:
```jsx
<button
  aria-current={isSelected ? 'true' : undefined}
  aria-label={`${coin.name} anzeigen${isSelected ? ', aktuell ausgewählt' : ''}`}
  ...
>
```
Alternativ die gesamte Liste als `role="listbox"` mit `role="option"` und `aria-selected` auf den Einträgen strukturieren – aufwendiger, aber semantisch optimal.
