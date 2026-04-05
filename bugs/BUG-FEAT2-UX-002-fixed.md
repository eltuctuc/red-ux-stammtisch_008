---
status: Fixed
severity: High
feature: FEAT-2
---

# BUG-FEAT2-UX-002: ThemeToggle – Emojis statt SVG-Icons, Touch-Target zu klein

**Severity:** High
**Feature:** FEAT-2
**Komponente:** ThemeToggle.jsx

## Beschreibung
Der ThemeToggle verwendet Emojis (🌙 und ☀️) als visuelle Icons innerhalb eines Toggle-Schalters. Laut Spezifikation (AC-2.7, UX-Entscheidungen) sind Mond- und Sonnen-SVG vorgesehen. Emojis sind font-abhängig, plattforminkonsistent und lassen sich nicht via Design-Tokens in Farbe oder Größe steuern – auf Windows erscheint 🌙 anders als auf macOS.

Zusätzlich: Der Toggle-Schalter ist 48×24px groß. Das Touch-Target liegt damit deutlich unter dem WCAG 2.5.5-Minimum von 44×44px. Die Spec dokumentiert eine Lösung via Wrapper-Padding (Touch-Target-Tabelle FEAT-2), die hier nicht umgesetzt wurde.

Das implementierte Toggle-Muster (Sliding Switch) weicht außerdem vom spezifizierten Muster ab: Die Spec beschreibt einen einfachen quadratischen Button (40×40px) der je nach Theme ein Icon zeigt – kein Slider.

## Auswirkung
Lena (UX-Designerin) sieht sofort dass Emojis als Icons ein No-Go im professionellen Design-Kontext sind. Das Touch-Target ist auf Mobile per Daumen kaum treffsicher. Das abweichende Muster (Slider statt Button) ist an sich nicht problematisch, aber die Kombination aus Emojis und zu kleinem Target wirkt unfertig.

## Erwartetes Verhalten
- SVG-Icons für Mond (Dark Mode) und Sonne (Light Mode) statt Emojis
- Touch-Target: mindestens 44×44px durch ausreichendes Padding am Button
- aria-label korrekt gesetzt (das ist bereits korrekt umgesetzt: "Zu hellem Design wechseln" / "Zu dunklem Design wechseln")

## Fix-Vorschlag
Emojis durch Inline-SVGs ersetzen (je 20×20px). Den Button mit mindestens `p-3` versehen damit der klickbare Bereich 44×44px erreicht. Alternativ das Slider-Muster beibehalten aber die Hit Area durch einen unsichtbaren absolut positionierten Bereich erweitern.
