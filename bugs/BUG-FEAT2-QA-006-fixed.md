---
status: Fixed
severity: Medium
feature: FEAT-2
---

# BUG-FEAT2-QA-006: Header nicht 2-zeilig auf Mobile – Suchleiste zu schmal

**Severity:** Medium
**Feature:** FEAT-2
**Komponente:** `components/header/Header.jsx`, `components/header/SearchInput.jsx`

## Beschreibung

Die UX-Spec für FEAT-2 fordert auf Mobile (<768px) ein 2-zeiliges Header-Layout:
- Zeile 1: Logo + Theme-Toggle
- Zeile 2: Suchleiste in voller Breite

Das technische Design spezifiziert:
```css
@media (max-width: 767px) {
  header { flex-wrap: wrap; }
  .logo { flex: 1; }
  .search-wrapper { order: 3; flex: 0 0 100%; }
}
```

Die Implementierung in `Header.jsx` nutzt `flex items-center justify-between gap-4` in einer einzigen Zeile ohne `flex-wrap`. Die Suchleiste ist auf `w-40` (160px) begrenzt – auf einem 375px-Viewport bleiben damit nur wenige Pixel für das eigentliche Input-Feld. Die Suchleiste bekommt keine volle Breite auf Mobile.

Laut AC-2.5 (EC-2.5): "Suchleiste ist nutzbar (mind. 120px breit)" – das ist knapp erfüllt, aber die Spec ist explizit 2-zeilig.

## Reproduktion

1. App auf 375px (iPhone SE) öffnen
2. Header ist einzeilig: Logo, schmales Suchinput, Toggle-Knopf in einer Reihe
3. Spec fordert: Suche in der zweiten Zeile, volle Breite

## Erwartetes Verhalten

Header wird 2-zeilig auf <768px: Logo+Toggle in Zeile 1, Suchleiste in voller Breite in Zeile 2.

## Tatsächliches Verhalten

Einzeiliger Header mit schmaler Suchleiste (w-40 = 160px) neben Logo und Toggle.

## Fix-Vorschlag

```jsx
// Header.jsx – flex-wrap + mobile ordering
<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-16 flex flex-wrap items-center gap-3 py-3 sm:py-0">
  <div className="flex items-center gap-2 flex-1">
    {/* Logo */}
  </div>
  {/* SearchInput: full width on mobile, fixed width on sm+ */}
  <div className="order-3 sm:order-2 w-full sm:w-auto sm:flex-1 sm:max-w-[400px]">
    <SearchInput value={searchQuery} onChange={onSearchChange} />
  </div>
  <div className="order-2 sm:order-3 shrink-0">
    <ThemeToggle />
  </div>
</div>
```
