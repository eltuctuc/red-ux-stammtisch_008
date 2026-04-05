---
status: approved
---

# FEAT-1: Foundation
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-1
- **Feature-Name:** Foundation
- **Zielgruppe:** Alle Personas (Lena, Markus, Sarah) – technisches Fundament, nicht direkt sichtbar
- **Abhängigkeiten:** Keine – wird zuerst implementiert
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Ohne dieses Feature funktioniert kein anderes: realistische Mock-Daten, globaler Theme-Kontext und das responsive Layout-Gerüst sind die Basis aller sichtbaren Features.

## Nicht im Scope
- Echte API-Calls (kein Netzwerk-Request)
- User-Authentifizierung
- Portfolio-Verwaltung (Coins hinzufügen/entfernen)
- Server-Side-Rendering

---

## User Stories

**US-1.1** Als Entwickler (Markus) möchte ich dass die App ein konsistentes Daten-Interface nutzt, damit ich beim Durchlesen des Codes sofort verstehe wie Daten fließen.

**US-1.2** Als Nutzer möchte ich dass meine Theme-Präferenz (Dark/Light) nach einem Seiten-Reload erhalten bleibt, damit ich nicht bei jedem Besuch neu einstellen muss.

**US-1.3** Als Nutzer auf einem Desktop möchte ich ein 2-Spalten-Layout sehen (Hauptbereich + Watchlist-Sidebar), damit ich alle relevanten Informationen auf einen Blick erfassen kann.

**US-1.4** Als Nutzer auf einem Smartphone (375px) möchte ich ein vollständig vertikal gestacktes Layout sehen, damit kein Inhalt abgeschnitten ist oder horizontal scrollt.

**US-1.5** Als Entwickler möchte ich realistische, nicht-zufällige Preisverläufe in den Mock-Daten vorfinden, damit das Projekt glaubwürdig wirkt und kein "zufälliges Zacken" entsteht.

---

## Acceptance Criteria

**AC-1.1** Die App stellt Mock-Daten für genau 6 Coins bereit: BTC, ETH, SOL, BNB, ADA, XRP – jeweils mit Name, Symbol, aktuellem Preis, 24h-Änderung (%), 7-Tage-Sparkline und 90-Tage-Preisverlauf.

**AC-1.2** Jeder Preisverlauf ist eine geschwungene Kurve (keine zufälligen Einzelwerte) – realistisch im Charakter der jeweiligen Kryptowährung (BTC > $40.000, ETH > $2.000 etc.).

**AC-1.3** Es gibt genau 5 Mock-Transaktionen mit: Datum, Typ (Kauf/Verkauf), Coin-Symbol, Menge, Preis pro Coin, Gesamtbetrag. Mix aus mind. 2 Käufen und 2 Verkäufen, verschiedene Coins.

**AC-1.4** Ein globaler ThemeContext stellt `theme` (dark | light) und `toggleTheme` bereit und ist in der gesamten App verfügbar.

**AC-1.5** Das Theme wird in `localStorage` unter dem Key `cryptofolio-theme` persistiert und beim App-Start gelesen – kein Flicker beim ersten Render.

**AC-1.6** Dark Theme ist Standard wenn kein localStorage-Eintrag vorhanden ist.

**AC-1.7** Das Layout-Gerüst ist responsive:
- ≥1024px: 2-Spalten (Hauptbereich links, Watchlist-Sidebar rechts, max-width ~1400px, zentriert)
- 768–1023px: Sidebar klappt unter den Hauptbereich (1 Spalte)
- <768px: Vollständig vertikal, keine horizontale Scrollbar

**AC-1.8** Das `<html>`-Element trägt die Klasse `dark` oder `light` je nach aktivem Theme, damit Tailwind-Dark-Mode-Klassen global greifen.

---

## Edge Cases

**EC-1.1** localStorage nicht verfügbar (z.B. Private Mode bestimmter Browser): App fällt auf Dark Theme zurück, kein JS-Fehler wird geworfen.

**EC-1.2** localStorage-Eintrag mit ungültigem Wert (z.B. `"undefined"`): App ignoriert den Eintrag und nutzt Dark Theme als Fallback.

**EC-1.3** Viewport-Resize während der Nutzung: Layout passt sich dynamisch an (kein Reload nötig), keine Layout-Artefakte.

**EC-1.4** Sehr schmaler Viewport (<320px): App ist lesbar, kein Overflow – kein Support für unter 320px erforderlich, aber kein Crash.

**EC-1.5** Mock-Daten werden mehrfach gleichzeitig abgerufen (z.B. von mehreren Komponenten): Daten sind ein einziges importiertes Modul, keine Duplicate-Instanzen oder Race Conditions.

---

## Fortschritt
- Status: Freigegeben
