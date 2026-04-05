---
status: approved
---

# FEAT-3: Portfolio-Hero
*Erstellt von: /red:proto-requirements — 2026-04-05*

## Meta
- **Feature-ID:** FEAT-3
- **Feature-Name:** Portfolio-Hero
- **Zielgruppe:** Lena (erster visueller Eindruck), Sarah (Screenshot-Tauglichkeit)
- **Abhängigkeiten:** FEAT-1 (Mock-Daten, ThemeContext)
- **Fix-Schwelle:** Critical, High (Funktionierender Prototyp)

## Kernwert
Die Portfolio-Übersicht ist der visuelle Anker der App – Gesamtwert und 24h-Performance auf einen Blick. Glassmorphism-Karte mit Sparkline ist der erste "Wow"-Moment beim Beamer-Demo.

## Nicht im Scope
- Echte Portfolio-Berechnung aus Transaktionen
- Mehrere Portfolios / Konten
- Historischer Vergleich über 24h hinaus in dieser Karte
- Edit-Funktionalität

---

## User Stories

**US-3.1** Als Demo-Zuschauer möchte ich auf einen Blick den Gesamtwert des Portfolios in USD sehen, damit ich sofort den "Stakes" des Portfolios einschätzen kann.

**US-3.2** Als Nutzer möchte ich die 24h-Änderung in Betrag (USD) und Prozent sehen, damit ich auf einen Blick erkenne ob das Portfolio heute im Plus oder Minus ist.

**US-3.3** Als Nutzer möchte ich eine Mini-Sparkline der letzten 7 Tage in der Hero-Karte sehen, damit ich den Trend des Portfolios schnell einschätzen kann.

**US-3.4** Als Demo-Zuschauer (Lena) möchte ich dass die Hero-Karte sich beim Hovern subtil hebt (Animation), damit die App sich lebendig und poliert anfühlt.

**US-3.5** Als Recruiter (Sarah) möchte ich dass die Hero-Karte optisch dominiert und professionell wirkt, damit das Projekt im Screenshot überzeugend aussieht.

---

## Acceptance Criteria

**AC-3.1** Die Hero-Karte zeigt den Gesamtwert als formatierte USD-Zahl (z.B. "$47,823.50") in großer, gut lesbarer Schrift (≥28px).

**AC-3.2** Die 24h-Änderung wird als zwei Werte angezeigt: absoluter Betrag in USD (z.B. "+$1,234.56") und Prozentwert (z.B. "+2.65%") – beide in derselben Zeile.

**AC-3.3** Positiver Wert = grüne Textfarbe + Aufwärts-Pfeil-Icon. Negativer Wert = rote Textfarbe + Abwärts-Pfeil-Icon.

**AC-3.4** Die Sparkline ist eine Recharts-Komponente (ResponsiveContainer + LineChart) mit `background: transparent` – kein weißer Hintergrund auf der Glasskarte.

**AC-3.5** Die Sparkline zeigt genau 7 Datenpunkte (letzte 7 Tage des Mock-Datensatzes) ohne Achsenbeschriftung, ohne Grid, ohne Tooltip.

**AC-3.6** Die Karte hat einen Glassmorphism-Stil: `backdrop-filter: blur(12px)`, semi-transparenter Hintergrund, subtile Border (`border: 1px solid rgba(255,255,255,0.1)`).

**AC-3.7** Hover-Animation: `transform: translateY(-2px)` + verstärkter Box-Shadow – Transition `200ms ease-out`.

**AC-3.8** Im Light-Mode passt sich die Karte farblich an: hellerer semi-transparenter Hintergrund, dunklere Textfarbe – Glassmorphism-Effekt bleibt erhalten.

---

## Edge Cases

**EC-3.1** Gesamtwert = $0: Wird als "$0.00" angezeigt, keine Division-by-Zero bei Prozentberechnung.

**EC-3.2** 24h-Änderung ist exakt 0%: Weder grün noch rot – neutrale Farbe (grau), kein Pfeil-Icon.

**EC-3.3** Gesamtwert hat mehr als 8 Stellen: Zahl bleibt lesbar, kein Overflow – ggf. Schriftgröße durch `text-ellipsis` oder responsive Größe anpassen.

**EC-3.4** Sparkline-Datenpunkte sind alle gleich (flache Linie): Chart zeigt eine horizontale Linie, kein Render-Fehler.

**EC-3.5** Theme-Wechsel während Hover-State aktiv: Transition läuft sauber durch, kein visuelles Glitching.

---

## Fortschritt
- Status: Freigegeben
