---
status: Fixed
severity: Medium
feature: FEAT-4
---

# BUG-FEAT4-UX-001: ChartTooltip – --text-muted für Datum hat unzureichenden Kontrast im Dark Mode

**Severity:** Medium
**Feature:** FEAT-4
**Komponente:** ChartTooltip.jsx

## Beschreibung
`ChartTooltip.jsx` rendert das Datum mit `color: 'var(--text-muted)'`. Im Dark Mode ist `--text-muted: #334155` (slate-700). Der Tooltip-Hintergrund ist `--bg-elevated: rgba(30, 32, 48, 0.95)`, was einem sehr dunklen Grauton entspricht (RGB ca. 30,32,48).

Kontrast: #334155 (RGB 51,65,85) auf RGB(30,32,48) – das Kontrastverhältnis liegt bei circa 1.5:1. Das liegt dramatisch unter dem WCAG AA-Minimum von 4.5:1 für normalen Text (12px). Der Datumtext im Tooltip ist praktisch unlesbar im Dark Mode.

Das Problem liegt im Zusammenspiel: `--text-muted` ist als Platzhalter-Token konzipiert (sehr dunkel im Dark Mode) und macht Sinn auf hellem Kartenhintergrund. Im Tooltip wird es auf einem fast identisch dunklen Hintergrund verwendet – da bricht der Kontrast zusammen.

## Auswirkung
Der Datum-Text im Chart-Tooltip ist im Dark Mode (dem Standard) nicht lesbar. Nutzer sehen nur den Preis, aber nicht das zugehörige Datum. Das untergräbt den Kernwert des Tooltips (US-4.3: "Tooltip mit Datum und Preis").

## Erwartetes Verhalten
Datum im Tooltip ist in beiden Themes lesbar. Kontrast mindestens 4.5:1. Für den Tooltip-Kontext wäre `--text-secondary` (#64748b im Dark Mode) sinnvoller – oder `--text-primary` gedimmt via Opacity.

## Fix-Vorschlag
In `ChartTooltip.jsx` `--text-muted` durch `--text-secondary` ersetzen:
```jsx
<p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
  {date}
</p>
```
`--text-secondary` (#64748b slate-500) auf `--bg-elevated` (dark: ~30,32,48) ergibt ebenfalls keinen optimalen Kontrast, daher besser `--text-primary` mit reduzierter Opacity oder ein eigenes Token für Tooltip-Labels definieren. Einfachste pragmatische Lösung: `color: 'rgba(241,245,249,0.5)'` (text-primary mit 50% opacity) direkt im Tooltip-Style setzen.
