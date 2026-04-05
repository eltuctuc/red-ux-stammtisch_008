---
status: approved
---

# FEAT-2: Header
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-2
- **Feature-Name:** Header
- **Zielgruppe:** Alle Personas – erster sichtbarer Bereich, bildet ersten Eindruck
- **Abhängigkeiten:** FEAT-1 (ThemeContext, Mock-Daten für Suchfilter)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Der Header ist das erste was jeder sieht – App-Identität und Live-Suche müssen sofort funktionieren und hochwertig wirken. Das Dark/Light-Toggle ist ein klassischer Demo-Moment.

## Nicht im Scope
- Navigation zu Unterseiten (es gibt nur eine Seite)
- User-Account oder Avatar
- Notifications
- Mobile Hamburger-Menü (kein Menü nötig – keine Navigation)

---

## User Stories

**US-2.1** Als Besucher möchte ich den App-Namen "Cryptofolio" mit einem passenden Icon im Header sehen, damit ich sofort weiß welche App ich nutze.

**US-2.2** Als Nutzer möchte ich über die Suchleiste gleichzeitig die Watchlist und die Transaktionsliste filtern, damit ich schnell einen bestimmten Coin finden kann.

**US-2.3** Als Entwickler (Markus) möchte ich dass die Suche als Controlled Input implementiert ist (nicht debounced DOM-Manipulation), damit ich die State-Architektur im Code nachvollziehen kann.

**US-2.4** Als Nutzer möchte ich über einen Toggle zwischen Dark und Light Mode wechseln, damit ich das Theme meiner Umgebung anpassen kann.

**US-2.5** Als Demo-Zuschauer (Lena, Markus) möchte ich dass der Theme-Wechsel mit einer sanften CSS-Transition animiert ist, damit er sich poliert und hochwertig anfühlt.

---

## Acceptance Criteria

**AC-2.1** Der Header enthält: ein Icon/Logo-Element links, den Text "Cryptofolio" als App-Titel, eine Suchleiste mittig oder rechts, einen Theme-Toggle-Button rechts.

**AC-2.2** Die Suchleiste ist ein Controlled Input (`value` + `onChange` via React State) – kein uncontrolled Input, kein setTimeout-Debounce.

**AC-2.3** Beim Eintippen in die Suchleiste werden Watchlist-Einträge (FEAT-5) gefiltert: nur Coins deren Name oder Symbol den Suchbegriff enthalten sind sichtbar, die anderen werden ausgeblendet (nicht nur gegraut).

**AC-2.4** Beim Eintippen in die Suchleiste werden Transaktions-Zeilen (FEAT-6) gefiltert: nur Zeilen die den Suchbegriff im Coin-Symbol oder Typ enthalten sind sichtbar.

**AC-2.5** Die Suche ist case-insensitive ("btc" findet "BTC").

**AC-2.6** Ein leeres Suchfeld zeigt alle Einträge ungefiltert.

**AC-2.7** Der Theme-Toggle-Button zeigt ein Mond-Icon im Dark-Mode und ein Sonnen-Icon im Light-Mode.

**AC-2.8** Klick auf Toggle ruft `toggleTheme()` aus dem ThemeContext auf – Theme wechselt sofort, kein Reload nötig.

**AC-2.9** Der Theme-Wechsel ist mit einer CSS-Transition animiert (`transition: colors 300ms ease`), sodass der Farbwechsel nicht abrupt wirkt.

**AC-2.10** Der Header ist sticky (bleibt beim Scrollen oben) und hat einen leichten `backdrop-blur` Glassmorphism-Effekt.

---

## Edge Cases

**EC-2.1** Sucheingabe mit Sonderzeichen (z.B. "€", "/", "."): App wirft keinen Fehler – Filterung liefert leere Ergebnisse, kein Crash.

**EC-2.2** Sucheingabe länger als die Suchleiste: Text scrollt horizontal innerhalb des Inputs, kein Overflow-Artefakt.

**EC-2.3** Suchfeld ist gefüllt und User wechselt Theme: Suchfilter bleibt aktiv, kein Reset.

**EC-2.4** Suchfeld ist gefüllt und kein Ergebnis matcht: Watchlist und Transaktions-Tabelle zeigen einen "Keine Ergebnisse"-Hinweis, keine leere weiße Fläche.

**EC-2.5** Header auf 375px (iPhone SE): App-Name und Toggle bleiben sichtbar, Suchleiste ist nutzbar (mind. 120px breit), kein Element wird abgeschnitten.

---

## 2. UX Entscheidungen
*Erstellt von: /red:proto-ux — 2026-04-05*

### Einbettung
Der Header ist eine permanente, sticky Top-Bar. Keine Drawer, kein Hamburger-Menü – eine einzige Seite braucht keine Navigation. Der Header kommuniziert App-Identität und stellt globale Steuerung bereit.

### Komponenten & Layout

**Desktop (≥768px):**
```
[Logo + "Cryptofolio"]  [───── Suchleiste (flex-1, max 400px) ─────]  [Theme-Toggle]
```
- Logo: 28px Emoji oder einfaches SVG (₿ oder 🔷), gefolgt von "Cryptofolio" in 18px / 700
- Suchleiste: flex-1, max-width 400px, zentriert im restlichen Raum
- Toggle: 40px × 40px Button, mit 2px padding → effektive Touch-Area 44px × 44px

**Mobile (<768px):**
```
[Logo + "Cryptofolio"]                          [Theme-Toggle]
[──────────────── Suchleiste (volle Breite) ──────────────────]
```
- Header wird 2-zeilig: Zeile 1 (Logo + Toggle), Zeile 2 (Suche volle Breite)
- Höhe gesamt: ~108px (64px + 44px Suche + 8px gap)
- Begründung: Suchleiste auf 375px braucht min. 200px Breite für sinnvolle Nutzung

### Suchleiste Design
- Hintergrund: `var(--bg-surface-high)` – leicht über BG-Page-Niveau, aber dunkler als Karten
- Border: `1px solid var(--border)`, border-radius: 10px
- Placeholder-Text: "Suchen..." in `var(--text-muted)`
- Fokus-State: Border-Farbe → `var(--accent)`, leichter Box-Shadow `0 0 0 3px var(--accent-bg)`
- Padding: 10px 16px, Höhe: 40px (→ 44px durch Wrapper-Padding)
- Kein Such-Icon nötig – zu viel visuelles Gewicht für ein minimales Interface

### Theme-Toggle Design
- Mond-Icon (Dark Mode aktiv): ausgefülltes Mond-SVG, `var(--text-secondary)`
- Sonnen-Icon (Light Mode aktiv): ausgefülltes Sonnen-SVG, `var(--text-secondary)`
- Button-Hintergrund: transparent, Hover: `var(--bg-surface-high)`
- Border-Radius: 8px
- Transition: Icon-Opacity 150ms ease (kein Flip-Animation – zu ablenkend)

### Header selbst
- Höhe: 64px (Desktop), variabel (Mobile, s.o.)
- Hintergrund: `var(--bg-page)` mit `backdrop-filter: blur(16px)` – stärker als Karten
- Border-Bottom: `1px solid var(--border)`
- Padding horizontal: 24px (Desktop), 16px (Mobile)
- `position: sticky; top: 0; z-index: 50`

### Touch-Target-Tabelle

| Element | Höhe | WCAG 2.5.5 (44px) | Lösung |
|---------|------|-------------------|--------|
| Theme-Toggle Button | 40px visuell | ❌ | 2px padding-y im Wrapper → 44px effektiv |
| Suchleiste | 40px | ❌ | 2px padding-y im Container → 44px effektiv |

---

## 3. Technisches Design
*Erstellt von: /red:proto-architect — 2026-04-05*

### State-Komplexität
State Machine nicht erforderlich – `searchQuery` ist ein einzelner String-State ohne Edit-/Save-Logik.

### Komponenten

**Header.jsx** – Container-Komponente
- Props: `searchQuery: string`, `setSearchQuery: func`
- Holt `theme` + `toggleTheme` aus `useTheme()` Hook intern
- Rendert: Logo-Bereich, SearchInput, ThemeToggle
- Kein lokaler State – alles über Props oder Context

**SearchInput.jsx**
- Props: `value: string`, `onChange: func`
- Controlled `<input type="search">` mit `value={value}` + `onChange={e => onChange(e.target.value)}`
- `type="search"` gibt Browser-natives Clear-Button geschenkt (auf iOS/Chrome)
- `autoComplete="off"`, `spellCheck="false"`, `autoCorrect="off"`

**ThemeToggle.jsx**
- Kein Props – nutzt `useTheme()` intern
- Rendert entweder Mond-Icon oder Sonnen-Icon je nach `theme`
- Icons: Inline SVG (kein Icon-Library-Import), 20×20px

### Responsive Layout

Desktop (≥768px): CSS Flexbox, eine Zeile
```css
header { display: flex; align-items: center; gap: 16px; }
.search-wrapper { flex: 1; max-width: 400px; }
```

Mobile (<768px): CSS Flex-Wrap + full-width Suche
```css
@media (max-width: 767px) {
  header { flex-wrap: wrap; }
  .logo { flex: 1; }
  .search-wrapper { order: 3; flex: 0 0 100%; }
}
```
Kein JS für Layout-Wechsel – pure CSS.

### A11y
- `<header role="banner">`
- Suchfeld: `<label for="search" class="sr-only">Suchen</label>` + `id="search"`
- ThemeToggle: `aria-label` dynamisch: `"Zu Light Mode wechseln"` / `"Zu Dark Mode wechseln"`
- Toggle ist `<button type="button">` (kein `div`)

### Fortschritt
- Status: Freigegeben, Aktueller Schritt: Tech
