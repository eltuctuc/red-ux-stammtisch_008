---
status: Fixed
severity: Low
feature: FEAT-2
---

# BUG-FEAT2-QA-012: Header fehlt role="banner" – A11y-Spec nicht erfüllt

**Severity:** Low
**Feature:** FEAT-2
**Komponente:** `components/header/Header.jsx`

## Beschreibung

Das technische Design von FEAT-2 spezifiziert:
> `<header role="banner">`

`Header.jsx` rendert `<header>` ohne `role="banner"`. Zwar ist `<header>` als Top-Level-Element implizit ein Landmark, aber nur wenn es direkt im `<body>` steht. Da `Header.jsx` innerhalb von `AppLayout` in einem `<div>` eingebettet ist, verliert das `<header>`-Element seinen impliziten `banner`-Landmark. Screen-Reader können das Element dann nicht als Seitenheader identifizieren.

## Reproduktion

1. App mit Screen-Reader oder axe DevTools analysieren
2. Kein `banner`-Landmark erkennbar

## Erwartetes Verhalten

`<header role="banner">` – Screen-Reader identifizieren den Header korrekt als Seitenheader-Landmark.

## Tatsächliches Verhalten

`<header>` ohne `role` – in verschachteltem Kontext kein implizites Banner-Landmark.

## Fix-Vorschlag

```jsx
// Header.jsx
<header
  role="banner"
  className="backdrop-blur-md border-b"
  ...
>
```
