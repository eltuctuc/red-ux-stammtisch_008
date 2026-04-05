---
status: approved
---

# Product Flows
*Erstellt von: /red:proto-flows — 2026-04-05*
*Letzte Aktualisierung: 2026-04-05*

> Dieses Dokument ist die verbindliche Navigations- und Interaktions-Referenz für Cryptofolio.
> Cryptofolio ist eine Single-Page Application (SPA) ohne Routing.
> Es gibt keinen Seitenwechsel – alle Interaktionen sind State-Übergänge innerhalb eines Screens.
> Kein Interaktions-Flow darf vom `frontend-developer` implementiert werden, der hier nicht definiert ist.

---

## Screens

| Screen-ID | Screen-Name | Route | Feature | Typ |
|-----------|-------------|-------|---------|-----|
| S-01 | Dashboard | / (root) | FEAT-1, FEAT-2, FEAT-3, FEAT-4, FEAT-5, FEAT-6 | Page (SPA, kein Routing) |

---

## Layout-Zonen (innerhalb S-01)

| Zone-ID | Zone-Name | Position (Desktop) | Position (Mobile) | Feature |
|---------|-----------|-------------------|-------------------|---------|
| Z-01 | Header | Oben, sticky, volle Breite | Oben, sticky, volle Breite | FEAT-2 |
| Z-02 | Portfolio-Hero | Links oben, unter Header | Oben, nach Header | FEAT-3 |
| Z-03 | Preis-Chart | Links Mitte, unter Hero | Mitte, nach Hero | FEAT-4 |
| Z-04 | Watchlist | Rechts, volle Höhe (Sidebar) | Unten, nach Chart (Scroll-Strip) | FEAT-5 |
| Z-05 | Transaktionen | Links unten, unter Chart | Unten, nach Watchlist | FEAT-6 |

---

## Einstiegspunkte

| Kontext | Einstiegs-Screen | Initialzustand |
|---------|-----------------|----------------|
| App-Start (kein localStorage) | S-01 Dashboard | Dark Theme, BTC selektiert, Zeitraum 1M, Suche leer |
| App-Start (localStorage vorhanden) | S-01 Dashboard | Gespeichertes Theme, BTC selektiert, Zeitraum 1M, Suche leer |

---

## State-Definitionen

| State-Variable | Initialwert | Typ | Verwaltet in |
|---------------|-------------|-----|-------------|
| `theme` | `"dark"` (localStorage-Fallback) | `"dark" \| "light"` | ThemeContext |
| `selectedCoin` | `"BTC"` | String (Coin-Symbol) | App-Root oder Context |
| `selectedTimeframe` | `"1M"` | `"1T" \| "1W" \| "1M" \| "3M"` | App-Root oder Context |
| `searchQuery` | `""` | String | Header-Komponente (geliftet) |

---

## Interaktions-Flows (State-Transitions)

### FLOW-01: Coin-Selektion
*Auslöser: Klick auf Watchlist-Eintrag*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | Z-04 Watchlist | Nutzer klickt auf Coin-Eintrag (z.B. ETH) |
| 2 | State | `selectedCoin` wechselt zu "ETH" |
| 3 | Z-04 Watchlist | ETH-Eintrag erhält Highlight-State (accent Border/BG), vorheriger Coin verliert ihn |
| 4 | Z-03 Preis-Chart | Chart lädt Datensatz für ETH, aktueller Zeitraum (`selectedTimeframe`) bleibt erhalten |
| 5 | Z-03 Preis-Chart | Chart rendert neu (Recharts interne Transition) |

**Feature:** FEAT-4, FEAT-5
**Bedingung:** Coin ist in der Watchlist sichtbar (nicht durch Suche ausgeblendet)

---

### FLOW-02: Zeitraum-Auswahl
*Auslöser: Klick auf Zeitraum-Button im Preis-Chart*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | Z-03 Preis-Chart | Nutzer klickt auf Zeitraum-Button (z.B. "3M") |
| 2 | State | `selectedTimeframe` wechselt zu "3M" |
| 3 | Z-03 Preis-Chart | Aktiver Button-Highlight wechselt zu "3M" |
| 4 | Z-03 Preis-Chart | Chart lädt Datensatz für aktuellen Coin über 3 Monate, rendert neu |

**Feature:** FEAT-4
**Bedingung:** –

---

### FLOW-03: Live-Suche
*Auslöser: Texteingabe in die Suchleiste*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | Z-01 Header | Nutzer tippt in Suchleiste (z.B. "eth") |
| 2 | State | `searchQuery` wechselt zu "eth" |
| 3 | Z-04 Watchlist | Nur Coins die "eth" im Namen/Symbol enthalten bleiben sichtbar (ETH), andere werden ausgeblendet |
| 4 | Z-05 Transaktionen | Nur Transaktions-Zeilen die "eth" im Coin-Symbol oder Typ enthalten bleiben sichtbar |
| 5a | Beide Zonen | Wenn Treffer vorhanden: gefilterte Liste anzeigen |
| 5b | Beide Zonen | Wenn keine Treffer: "Keine Ergebnisse"-Hinweis anzeigen |

**Feature:** FEAT-2, FEAT-5, FEAT-6
**Bedingung:** Suche ist case-insensitive. `selectedCoin` wird durch Suche nicht verändert (Chart bleibt).

---

### FLOW-04: Suche zurücksetzen
*Auslöser: Suchfeld leeren (alle Zeichen löschen)*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | Z-01 Header | Nutzer löscht alle Zeichen aus der Suchleiste |
| 2 | State | `searchQuery` wechselt zu `""` |
| 3 | Z-04 Watchlist | Alle 6 Coins werden wieder angezeigt |
| 4 | Z-05 Transaktionen | Alle 5 Transaktionen werden wieder angezeigt |

**Feature:** FEAT-2, FEAT-5, FEAT-6

---

### FLOW-05: Theme-Toggle
*Auslöser: Klick auf Theme-Toggle-Button im Header*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | Z-01 Header | Nutzer klickt auf Mond-Icon (Dark) oder Sonnen-Icon (Light) |
| 2 | ThemeContext | `toggleTheme()` wird aufgerufen |
| 3 | State | `theme` wechselt: `"dark"` → `"light"` oder `"light"` → `"dark"` |
| 4 | DOM | `<html>`-Element erhält Klasse `"light"` oder `"dark"` |
| 5 | localStorage | Neues Theme wird unter `"cryptofolio-theme"` gespeichert |
| 6 | Gesamte App | Alle Komponenten wechseln via Tailwind-Dark-Mode-Klassen das Farbschema |
| 7 | Z-01 Header | Toggle-Icon wechselt (Mond ↔ Sonne) |

**Feature:** FEAT-1, FEAT-2
**Animation:** CSS-Transition `300ms ease` auf allen Farb-Eigenschaften

---

### FLOW-06: App-Start (initialer Zustand)
*Auslöser: Browser lädt App*

| Schritt | Wo | Was passiert |
|---------|----|-------------|
| 1 | ThemeContext | `localStorage.getItem("cryptofolio-theme")` wird gelesen |
| 2a | Wenn Wert vorhanden und valide | `theme` = gespeicherter Wert |
| 2b | Wenn kein Wert / ungültig | `theme` = `"dark"` (Fallback) |
| 3 | DOM | `<html>` erhält Theme-Klasse – **vor** erstem Render (kein Flicker) |
| 4 | App | Dashboard rendert mit: Dark/Light Theme, BTC selektiert, Zeitraum 1M, Suche leer |

**Feature:** FEAT-1

---

## Offene Transitions

Transitions die während der Implementierung als fehlend gemeldet wurden:

| Gemeldet von | Von Zone | Situation | Status |
|--------------|----------|-----------|--------|
| *(noch keine Meldungen)* | – | – | – |

*(Wird vom `frontend-developer` befüllt wenn eine Transition fehlt. UX Designer muss entscheiden und Tabelle oben ergänzen.)*
