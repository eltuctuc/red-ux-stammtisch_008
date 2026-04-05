---
status: draft
---

# Product Requirements Document
*Erstellt: 2026-04-05*

## Scope-Typ
Funktionierender Prototyp

## Vision
Cryptofolio ist ein visuell beeindruckendes Krypto-Portfolio-Dashboard für Entwickler und Designer, das als Showcase-Projekt zeigt, wie ein Premium-Fintech-Produkt mit React, Vite, TailwindCSS und Recharts aussehen und sich anfühlen kann.

## Zielgruppe
Primär: Entwickler und UX-Designer auf dem UX Stammtisch #008 – die Qualität von UI-Code und Designentscheidungen beurteilen können.
Sekundär: Recruiter / Reviewer eines GitHub-Portfolios.

## Kernproblem
Showcase-Projekte sehen oft entweder zu generisch aus (Bootstrap-Clone) oder sie sind visuell beeindruckend aber technisch hohl. Cryptofolio soll beides vereinen: echter React-State, funktionierende Interaktionen – und trotzdem Premium-Look.

## Tech-Stack
- React 18 + Vite
- TailwindCSS (v3)
- Recharts (Hauptchart + Sparklines)
- Keine weiteren UI-Libraries

## Scope (In)

### Header
- App-Name "Cryptofolio" mit Logo-Icon
- Suchleiste: filtert Watchlist + Transaktionen live (controlled input, echte Filterlogik)
- Dark/Light Mode Toggle: schaltet Theme global um, persistiert in localStorage

### Portfolio-Übersicht (Hero-Bereich)
- Gesamtwert in USD
- 24h-Änderung (Betrag + Prozent, grün/rot)
- Sparkline Mini-Chart (letzten 7 Tage)
- Glassmorphism-Karte mit Hover-Animation

### Interaktiver Preis-Chart
- Recharts LineChart oder AreaChart
- Zeitraum-Auswahl: 1T / 1W / 1M / 3M (wechselt Mock-Datensatz)
- Hover-Tooltip mit Preis + Datum
- Transparenter Hintergrund (kompatibel mit Glassmorphism)

### Watchlist-Sidebar
- 6 Kryptowährungen (BTC, ETH, SOL, BNB, ADA, XRP)
- Pro Eintrag: Icon, Name, Preis, 24h-Änderung (%), Sparkline
- Aktive Selektion wechselt den Haupt-Chart
- Mobile: wird zu horizontalem Scroll-Strip unter dem Chart

### Letzte Transaktionen
- Tabelle mit 5 Mock-Einträgen
- Spalten: Datum, Typ (Kauf/Verkauf), Coin, Menge, Preis, Gesamt
- Filterbar über die globale Suchleiste
- Kauf = grün markiert, Verkauf = rot

### Design-System
- Dark Theme als Standard, Light Theme umschaltbar
- Glassmorphism-Karten: `backdrop-blur`, semi-transparente Hintergründe
- Sanfte Hover-Animationen: `transition-all`, leichte `scale` oder `shadow`-Änderung
- Voll responsiv:
  - Desktop (≥1024px): 2-Spalten-Layout mit Sidebar rechts
  - Tablet (768–1023px): Sidebar klappt unter den Chart
  - Mobile (<768px): Watchlist als horizontaler Scroll-Strip

## Out-of-Scope
- Echte API-Calls oder WebSocket-Daten
- User-Authentifizierung
- Portfolio-Verwaltung (Coins hinzufügen/entfernen)
- Mehrsprachigkeit
- PWA / Offline-Funktionalität

## Erfolgskriterien
- Dark/Light Toggle funktioniert und persistiert nach Reload
- Suchleiste filtert Watchlist und Transaktionen live
- Zeitraum-Auswahl wechselt Chart-Daten sichtbar
- Klick auf Watchlist-Coin aktualisiert Haupt-Chart
- Auf iPhone SE (375px) ist alles bedienbar ohne horizontales Scrollen
- Recharts-Charts sehen auf Glassmorphism-Karten sauber aus (transparenter BG)

## Mock-Daten
- 6 Coins mit je 90 Tagen Preisverlauf (realistisch geschwungen, nicht zufällig)
- 5 Transaktionen mit plausiblen Daten (verschiedene Coins, Kauf + Verkauf Mix)
- Gesamtwert ~$47.800 (typisches "ich hab mal angefangen"-Portfolio)

## Offene Fragen
- Soll die Suche auch Coin-Namen in der Watchlist filtern (Hide-Logik) oder nur highlighten?
- Light-Theme-Variante: komplett weißer BG oder helles Grau wie Linear/Vercel?
