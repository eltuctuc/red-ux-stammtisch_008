---
status: Fixed
severity: Medium
feature: FEAT-2
---

# BUG-FEAT2-UX-003: Header Mobile – kein 2-zeiliges Layout, Suchleiste zu schmal

**Severity:** Medium
**Feature:** FEAT-2
**Komponente:** Header.jsx

## Beschreibung
Die Spezifikation (UX-Entscheidungen FEAT-2) definiert für Mobile (<768px) ein 2-zeiliges Header-Layout: Zeile 1 mit Logo + Toggle, Zeile 2 mit der Suchleiste in voller Breite. Begründung laut Spec: "Suchleiste auf 375px braucht min. 200px Breite für sinnvolle Nutzung".

Implementiert ist ein einzeiliges Flex-Layout das auf Mobile nicht umbricht. Die Suchleiste ist durch `w-40` (160px) auf kleinen Viewports sehr eng – auf 375px teilen sich Logo, Suchleiste und Toggle den Raum, wobei der Suchbereich auf circa 130–140px zusammengedrückt wird. Das macht komfortables Eintippen schwierig.

## Auswirkung
Auf einem iPhone SE (375px) sieht der Header gequetscht aus. Der Suchbegriff ist beim Eintippen kaum lesbar. Markus wird das als erstes auf Mobile testen – das ist eine vorhersehbare Kritikstelle (Persona-Zitat: "Ah. Ja. Dachte ich mir.").

## Erwartetes Verhalten
Auf Viewports unter 768px: Header bricht auf zwei Zeilen um. Logo + ThemeToggle in Zeile 1, Suchleiste in Zeile 2 mit voller Breite (`flex: 0 0 100%`). Gesamthöhe ca. 108px.

## Fix-Vorschlag
In `Header.jsx` den Right-Controls-Container per Tailwind responsive gestalten:
```jsx
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 py-3">
  {/* Logo – flex:1 auf Mobile */}
  <div className="flex items-center gap-2 flex-1">...</div>
  
  {/* Toggle – bleibt rechts in Zeile 1 auf Mobile */}
  <ThemeToggle />
  
  {/* Suche – volle Breite als Zeile 2 auf Mobile, normal auf sm+ */}
  <div className="w-full sm:w-auto sm:flex-1 sm:max-w-[400px] order-3 sm:order-2">
    <SearchInput ... />
  </div>
</div>
```
Auf `sm:` und größer: einzeiliges Layout wie bisher.
