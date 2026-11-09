# Rapportblock

Fickblock i mobilen för hemvärnets vanligaste rapporter och instruktioner. Snabbval och fritext, uppläsningsläge för radio, och logg.

**Öppna:** https://mmarpik.github.io/rapportblock/

<img src="qr.png" alt="QR-kod till https://mmarpik.github.io/rapportblock/" width="240">

## Innehåll

FORS, BSÖ och 7S/8S ligger som knappar. Övriga finns i menyn **Fler**.

| Grupp | Formulär |
|---|---|
| Rapporter (sänds på radio) | FORS, 7S/8S, PEDARS |
| Instruktioner (sägs till soldaterna) | OBO, Marschorder, ERER/EKER, EOBUSARE, BSÖ, OBSLÖSA |
| Kontroll | 8F |

## Anropssignaler

Tryck på signalerna överst (till exempel `EA → AN`).

- **Mina signaler:** dina egna, till exempel `EA, EA2`. Under **Jag är** väljer du den du går som just nu.
- **Mottagare:** de du rapporterar till, till exempel `AN, AN2`. Under **Min chef** väljer du vem rapporterna går till som standard.
- I FORS, 7S/8S och PEDARS finns raden **Till** överst. Där kan du byta mottagare för just den rapporten. Rensa går tillbaka till chefen.

## Visa och skicka med QR-kod

- **Visa** visar rapporten i stor text, så att någon kan läsa på din skärm. **QR-kod** gör om den till en kod.
- Mottagaren trycker på QR-knappen överst (eller **Logg → Läs QR**) och riktar kameran mot koden. Rapporten sparas i loggen som mottagen och kan visas, öppnas eller läsas upp. Går kameran inte att använda kan man välja en bild på koden.
- Koden innehåller vanlig text, så den går också att läsa med telefonens kamera.
- Långa rapporter ger täta koder. Håll telefonerna nära varandra. Högst cirka 1 500 tecken.
- Den som ser skärmen kan skanna koden. Visa den bara för den som ska ha rapporten.

## Installera på telefonen

1. Öppna länken i Chrome (Android) eller Safari (iPhone).
2. Välj **Lägg till på startskärmen**.
3. Öppna appen en gång med täckning. Därefter fungerar den även offline.

## Var sparas rapporterna?

Bara i telefonens webbläsare. Inget skickas någonstans. Under **Logg** finns **Exportera** (sparar loggen som en JSON-fil) och **Importera** (läser in en sådan fil, utan dubbletter). Använd det som säkerhetskopia eller för att flytta loggen till en ny telefon.

Skriv inte in hemliga uppgifter, till exempel lösen.

## Teknik

En enda HTML-fil utan byggsteg, plus `sw.js` för offline och `manifest.webmanifest` för installation. Formulären definieras som data i `FORMS` i `index.html`. Höj `CACHE` i `sw.js` när filerna ändras.

QR-biblioteken ligger inbäddade sist i `index.html`, så att de fungerar offline: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) 1.4.4 (MIT) och [jsQR](https://github.com/cozmo/jsQR) 1.4.0 (Apache-2.0).
