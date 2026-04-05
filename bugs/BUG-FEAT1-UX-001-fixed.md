---
status: Fixed
severity: Medium
feature: FEAT-1
---

# BUG-FEAT1-UX-001: AppLayout – Header nicht als semantisches `<header>`-Element gerendert

**Severity:** Medium
**Feature:** FEAT-1
**Komponente:** AppLayout.jsx

## Beschreibung
In `AppLayout.jsx` wird der Header-Bereich in einem `<div className="sticky top-0 z-40">` gewrappt. Das eigentliche `<header>`-Element befindet sich in `Header.jsx` und ist korrekt vorhanden. Das Problem: Die Spezifikation (A11y FEAT-2) verlangt `<header role="banner">` – der `role="banner"`-Landmark fehlt am Header-Element.

`<header>` hat implizit `role="banner"` nur wenn es ein direktes Kind von `<body>` ist. Da es hier innerhalb der ThemeProvider-Div-Kette liegt (nicht direkt als Kind von `<body>`), greift die implizite Rolle nicht automatisch in allen Browsern/AT-Kombinationen zuverlässig.

Außerdem fehlt auf der `<main>`-Sektion ein explizites `aria-label` oder `id` zur Navigation per Skiplink. Die Spezifikation sieht `<html lang="de">` vor (korrekt vorhanden in index.html), aber kein Skip-to-Content-Link wurde implementiert.

## Auswirkung
Screenreader-Nutzer können nicht per Landmark-Navigation (Taste `H` oder Landmark-Liste) direkt zum Header-Bereich springen wenn `role="banner"` fehlt. Ohne Skip-Link müssen Keyboard-only-Nutzer durch alle Header-Elemente tabben bevor sie den Hauptinhalt erreichen.

## Erwartetes Verhalten
- `<header role="banner">` am Header-Element in Header.jsx
- `<main id="main-content">` am Main-Element in AppLayout.jsx
- Skip-Link: `<a href="#main-content" className="sr-only focus:not-sr-only ...">Zum Hauptinhalt springen</a>` als erstes Element im Body

## Fix-Vorschlag
In `Header.jsx`: `role="banner"` zum `<header>`-Tag hinzufügen.
In `AppLayout.jsx`: `<main id="main-content" ...>` setzen.
Skip-Link in `AppLayout.jsx` oder `App.jsx` als erstes sichtbares Fokus-Element ergänzen.
