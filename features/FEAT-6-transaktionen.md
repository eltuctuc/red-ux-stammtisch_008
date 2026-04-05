---
status: approved
---

# FEAT-6: Transaktionen
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-6
- **Feature-Name:** Transaktionen
- **Zielgruppe:** Sarah (Vollständigkeit des Showcases), Markus (Tabellenimplementierung)
- **Abhängigkeiten:** FEAT-1 (Mock-Daten), FEAT-2 (Suchfilter)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Die Transaktions-Tabelle vervollständigt das Dashboard und zeigt dass auch Tabellen-UI premium aussehen kann. Kauf/Verkauf-Unterscheidung und Suchfilter-Integration machen sie interaktiv.

## Nicht im Scope
- Transaktionen hinzufügen, bearbeiten oder löschen
- Sortierung nach Spalten (kein klickbarer Tabellen-Header)
- Paginierung (5 Einträge sind fixiert)
- CSV-Export
- Transaktions-Details-View

---

## User Stories

**US-6.1** Als Nutzer möchte ich die letzten 5 Transaktionen in einer übersichtlichen Tabelle sehen, damit ich meine jüngste Trading-Aktivität auf einen Blick überblicke.

**US-6.2** Als Nutzer möchte ich sofort erkennen welche Transaktionen Käufe und welche Verkäufe sind, damit ich die Tabelle schnell scannen kann ohne jeden Eintrag einzeln zu lesen.

**US-6.3** Als Nutzer möchte ich über die globale Suchleiste die Tabelle filtern können, damit ich schnell alle Transaktionen eines bestimmten Coins finden kann.

**US-6.4** Als Entwickler (Markus) möchte ich dass die Tabelle auf Mobile sauber aussieht (kein horizontales Overflow), damit das Mobile-Rendering nicht als vergessener Punkt auffällt.

**US-6.5** Als Recruiter (Sarah) möchte ich dass die Tabelle optisch zum Rest des Dashboards passt (gleicher Glassmorphism-Stil, gleiche Farb-Semantik), damit das Projekt konsistent und durchdesignt wirkt.

---

## Acceptance Criteria

**AC-6.1** Die Tabelle zeigt genau 5 Mock-Transaktionen in dieser Spalten-Reihenfolge: Datum, Typ, Coin, Menge, Preis pro Coin, Gesamt.

**AC-6.2** Datum ist formatiert als "12. März 2025" (deutsches Format) – keine ISO-Strings.

**AC-6.3** Typ-Spalte: "Kauf" in grüner Farbe + optionalem Pfeil-Icon. "Verkauf" in roter Farbe + optionalem Pfeil-Icon.

**AC-6.4** Menge ist formatiert mit max. 6 Dezimalstellen (z.B. "0.045231 BTC").

**AC-6.5** Preis pro Coin und Gesamt sind als USD-Beträge formatiert (z.B. "$42,350.00").

**AC-6.6** Suchfilter aus FEAT-2: Zeilen die nicht dem Suchbegriff entsprechen (Coin-Symbol oder Typ) werden ausgeblendet. Bei keinen Treffern erscheint ein "Keine Transaktionen gefunden"-Hinweis.

**AC-6.7** Die Tabelle ist in einer Glassmorphism-Karte eingebettet (konsistenter Stil mit FEAT-3, FEAT-4).

**AC-6.8** Tabellen-Header-Zeile ist visuell abgesetzt (z.B. etwas dunklerer Hintergrund, `text-muted`-Farbe für Labels).

**AC-6.9** Jede Daten-Zeile hat einen Hover-State: leichte Hintergrundaufhellung.

**AC-6.10** Auf Mobile (<768px): Tabelle ist lesbar ohne horizontales Scrollen. Lösung: entweder weniger Spalten anzeigen (Menge + Preis ausblenden, nur Typ + Coin + Gesamt), oder die Tabelle hat `overflow-x: auto` mit einem visuellen Scroll-Hint.

---

## Edge Cases

**EC-6.1** Suchfilter blendet alle 5 Transaktionen aus: Tabellen-Body zeigt "Keine Transaktionen gefunden" (colspan über alle Spalten), Header bleibt sichtbar.

**EC-6.2** Sehr langer Coin-Name in der Mock-Datei: Text wird mit `truncate` oder `text-overflow: ellipsis` abgeschnitten, kein Overflow ins Layout.

**EC-6.3** Gesamt-Betrag ist sehr groß (>6 Stellen vor Komma): Formatierung bleibt lesbar, Spaltenbreite passt sich nicht dynamisch aus dem Proportionen.

**EC-6.4** Suche findet nur Teilergebnisse (z.B. "eth" → 2 von 5 Zeilen): Die anderen 3 Zeilen werden ausgeblendet, Tabelle zeigt nur die 2 Treffer ohne Layout-Bruch.

**EC-6.5** Theme-Wechsel: Tabelle übernimmt sofort die neuen Farben (Dark/Light), keine partiell gecachten Styles.

---

## Fortschritt
- Status: Freigegeben
