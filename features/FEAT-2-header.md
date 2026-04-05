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

## Fortschritt
- Status: Freigegeben
