---
name: Mein Weg zum OP – Editorial Route
beschreibung: Neu illustrierte mobile Patienten-Wegkarte.
colors:
  paper: "#f5f1e8"
  white: "#fffdf7"
  ink: "#102d48"
  muted: "#4d687a"
  mint: "#bfe3d8"
  teal: "#238c88"
  coral: "#ef6a52"
  sun: "#f6bb3b"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible, Aptos, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 10vw, 5.6rem)"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Atkinson Hyperlegible, Aptos, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.08rem, 4vw, 1.35rem)"
    lineHeight: 1.45
rounded:
  control: "12px"
  notice: "10px"
  point: "50%"
spacing:
  compact: "10px"
  standard: "18px"
  section: "44px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 15px"
    height: "58px"
---

# Design System: Mein Weg zum OP – Editorial Route

## Overview

**Creative North Star: "Die freundliche Wegkarte"**

Die neu illustrierte Version behandelt den OP-Ablauf als sichtbare Route. Kräftige Konturen, flache Farbfelder und nummerierte Kontrollpunkte vermitteln Standort und nächste Handlung ohne klinische Kälte. Die 15 eigens erzeugten Illustrationen sind bildschirmfüllend und bleiben in allen Sprachen dieselbe visuelle Referenz.

**Key Characteristics:**
- editorialer Flat-Illustrationsstil mit Marinekonturen
- fortlaufende Korallroute mit gelbem aktuellem Punkt
- warmes Kartenpapier statt Klinik-Dashboard
- klare, schwarz umrandete Touchflächen

## Colors

Marineblau trägt Text und Konturen; Mint bildet ruhige Szenen, Koralle markiert die Bewegung und Sonnengelb den aktuellen Standort.

**The Route Color Rule.** Koralle gehört dem Weg und der Vorwärtsaktion; Gelb gehört dem aktuellen Standort und Fokus.

## Typography

Eine hochlesbare Sans-Familie übernimmt alle Rollen. Schrittüberschriften stehen extrem groß und kompakt, Fließtext bleibt kurz und offen.

**The One Scene Rule.** Eine Ansicht zeigt ein Bild, eine Überschrift und eine kurze Erklärung.

## Layout

Auf dem Smartphone liegt die Route horizontal über einer hohen Illustration; Text und fixe Navigation folgen darunter. Ab 880px wird die Route zur linken Legende und Bild sowie Text stehen in zwei Spalten. Die Illustration nimmt den größten Flächenanteil ein.

## Elevation & Depth

Das System ist bewusst flach. Trennung entsteht durch 2–3px starke Marinekonturen, Farbfelder und Überlagerung; dekorative Schatten werden nicht verwendet.

## Shapes

Bedienelemente verwenden kompakte 10–12px-Radien. Routenpunkte und Bildnummer sind kreisförmig. Bildflächen bleiben geradlinig und erinnern an gedruckte Kartenfelder.

## Components

### Buttons
- Primär: Koralle, weiße Schrift, 3px Marinekontur, 58px Höhe.
- Sekundär: Papierweiß, Marineschrift, identische Kontur.
- Fokus: 4px sonnengelber Außenring.

### Route
- 15 nummerierte Kontrollpunkte.
- erledigte Punkte werden mint, der aktuelle Punkt sonnengelb mit Korallring.
- die Route ist zusätzlich als linearer Balken ablesbar.

### Illustration Stage
- hohe, generierte WebP-Illustration ohne Text oder Marke.
- mobile Darstellung beschneidet nur Randfläche; die zentrale Handlung bleibt sichtbar.

## Do's and Don'ts

### Do:
- **Do** die Illustration als primäre Orientierung behandeln.
- **Do** Standort, Schrittzahl und Richtung gleichzeitig sichtbar halten.
- **Do** medizinische Prüfung für Illustrationen und Übersetzungen offen kennzeichnen.

### Don't:
- **Don't** neue medizinische Aussagen aus den Illustrationen ableiten.
- **Don't** die Wegkarte durch generische Fortschrittskarten ersetzen.
- **Don't** fotorealistische oder markenspezifische Klinikdetails ergänzen.
