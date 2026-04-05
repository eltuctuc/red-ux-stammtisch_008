---
status: Fixed
severity: Low
feature: FEAT-2
---

# BUG-FEAT2-QA-008: ThemeToggle ist ein Toggle-Switch – Spec fordert Icon-Button (Mond/Sonne)

**Severity:** Low
**Feature:** FEAT-2
**Komponente:** `components/header/ThemeToggle.jsx`

## Beschreibung

AC-2.7 fordert: "Der Theme-Toggle-Button zeigt ein Mond-Icon im Dark-Mode und ein Sonnen-Icon im Light-Mode."
Das technische Design spezifiziert: "Rendert entweder Mond-Icon oder Sonnen-Icon je nach theme – Icons: Inline SVG (kein Icon-Library-Import), 20×20px."

Die Implementierung realisiert stattdessen einen iOS-artigen Toggle-Switch (12px Pill mit verschiebendem Circle). Das Mond- (🌙) und Sonnen-Emoji (☀️) ist im Innern des Circles sichtbar, aber das grundsätzliche Interaktionsparadigma ist ein Slide-Toggle, kein Icon-Button.

Das ist eine Abweichung vom spezifizierten Interaktionsmuster. Der Wechsel von Icon-Button auf Toggle-Switch ist eine eigenmächtige UX-Entscheidung des Developers.

Hinweis: Emojis statt Inline-SVGs wie spezifiziert. Das führt zu plattformabhängiger Emoji-Darstellung (iOS vs. Android vs. Windows) und kann optisch inkonsistent wirken.

## Reproduktion

1. App starten
2. Theme-Toggle im Header ansehen – erscheint als Pill/Slide-Toggle, nicht als Icon-Button
3. Spec: Icon-Button (40×40px) mit Mond-SVG oder Sonnen-SVG

## Erwartetes Verhalten

Einfacher `<button>` mit Icon (Mond-SVG bei Dark Mode, Sonnen-SVG bei Light Mode), 40×40px.

## Tatsächliches Verhalten

Toggle-Switch (w-12 h-6 rounded-full) mit Emoji im verschiebbaren Circle.

## Fix-Vorschlag

Ersatz durch einen einfachen Icon-Button:

```jsx
<button
  onClick={toggleTheme}
  aria-label={isDark ? 'Zu hellem Design wechseln' : 'Zu dunklem Design wechseln'}
  className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-150 ..."
  style={{ color: 'var(--text-secondary)' }}
>
  {isDark ? <MoonIcon /> : <SunIcon />}  {/* Inline SVG, 20×20px */}
</button>
```
