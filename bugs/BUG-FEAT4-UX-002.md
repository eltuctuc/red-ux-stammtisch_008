---
status: open
severity: Low
feature: FEAT-4
---

# BUG-FEAT4-UX-002: TimeframeSelector – aktiver Button-Stil im Light Mode

**Severity:** Low
**Feature:** FEAT-4
**Komponente:** TimeframeSelector.jsx

## Beschreibung
Der aktive Zeitraum-Button verwendet `backgroundColor: 'var(--accent)'` mit `color: '#fff'` (hardcoded Weiß). Im Light Mode ist `--accent: #4f46e5` (Indigo-600).

Weißer Text (#ffffff) auf Indigo-600 (#4f46e5) ergibt ein Kontrastverhältnis von ca. 5.9:1 – das besteht WCAG AA knapp. Im Dark Mode ist `--accent: #818cf8` (Indigo-400). Weißer Text auf Indigo-400 ergibt ca. 2.5:1 – das verfehlt WCAG AA für normalen Text (4.5:1 gefordert) deutlich.

Zwei Probleme in einem: (1) Die `color: '#fff'` ist hardcoded statt als Token, (2) der aktive Button-Text ist im Dark Mode nicht ausreichend kontrastreich.

## Auswirkung
Im Dark Mode (Standardtheme der App) ist der Text des aktiven Zeitraum-Buttons ("1W", "1M" etc.) mit weißem Text auf hellem Indigo-Hintergrund schlecht lesbar. Der aktive Zustand ist zwar erkennbar durch den Hintergrund, aber der Text-Kontrast erfüllt nicht WCAG AA.

## Erwartetes Verhalten
Aktiver Button: Textfarbe mit ausreichendem Kontrast auf dem Accent-Hintergrund. Im Dark Mode bedeutet das dunkle Textfarbe auf dem hellen Indigo-400-Hintergrund, z.B. `--bg-page` (#0a0b0f) statt Weiß. Alternativ: Aktiver Zustand ohne vollen Hintergrund-Fill, sondern nur Accent-Border + Accent-Textfarbe.

## Fix-Vorschlag
Option A: Textfarbe für aktiven State auf ein dunkles Token setzen, das auf Accent-Hintergrund kontrastiert – z.B. `color: isDark ? 'var(--bg-page)' : '#fff'`.
Option B: Aktiver State nur mit `color: var(--accent)` + `border: 1px solid var(--accent)` ohne Hintergrund-Fill (keine Kontrast-Problematik, da Text direkt auf Karten-BG).
Option C: `color: '#fff'` durch `color: 'var(--bg-page)'` ersetzen (passt für beide Themes da bg-page immer deutlich von accent kontrastiert).
