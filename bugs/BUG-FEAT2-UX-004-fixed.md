---
status: Fixed
severity: Medium
feature: FEAT-2
---

# BUG-FEAT2-UX-004: SearchInput – kein sichtbares Label-Element für Screenreader

**Severity:** Medium
**Feature:** FEAT-2
**Komponente:** SearchInput.jsx

## Beschreibung
Die Spezifikation (A11y-Abschnitt FEAT-2) verlangt ein `<label for="search" class="sr-only">Suchen</label>` kombiniert mit `id="search"` auf dem Input. Das Input-Element hat zwar ein `aria-label="Coins suchen"`, aber kein verknüpftes `<label>`-Element.

Das `aria-label`-Attribut ist eine akzeptable Alternative für Screenreader, aber die Best Practice nach WCAG 1.3.1 (Info and Relationships) ist ein explizites `<label>` mit `for`-Attribut – da es programmatische Zuordnung sicherstellt auch wenn `aria-label` durch AT-Konfigurationen überschrieben wird.

Zweites Problem: Das Input verwendet `type="search"`. In Chrome/Safari erscheint ein natives Clear-X-Icon im Input-Feld. Dieses Icon hat kein zugängliches Label (`aria-label` auf dem nativen Clear-Button ist browser-abhängig und oft "Clear" auf Englisch, nicht auf Deutsch).

## Auswirkung
Für die meisten Screenreader-Nutzer funktioniert das `aria-label` ausreichend. Die Abweichung von Best Practice ist eine small A11y-Lücke, keine kritische Barriere.

## Erwartetes Verhalten
Explizites `<label htmlFor="coin-search" className="sr-only">Coins suchen</label>` vor dem Input. Input erhält `id="coin-search"`.

## Fix-Vorschlag
```jsx
<div className="relative">
  <label htmlFor="coin-search" className="sr-only">Coins suchen</label>
  <span ...>SVG-Icon</span>
  <input
    id="coin-search"
    type="search"
    // aria-label kann entfernt werden wenn label vorhanden
    ...
  />
</div>
```
