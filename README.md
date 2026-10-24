# Súria · Ep, Súria!

A bilingual local-services prototype for the people of Súria: what is happening, how to get around and where to find practical information. Built with Astro in Catalan and Spanish.

**[Try the prototype](https://freixanet.github.io/suria/)**

## Product decisions

- Residents come first: everyday services, local events and useful next steps.
- Time-sensitive information carries sources and validity. An unconfirmed schedule is not presented as live tracking.
- Bus and service logic is tested across device time zones and daylight saving changes.
- Content is static; the weather integration uses MET Norway, with attribution in “Fonts i crèdits”.

This is an independent prototype, not a website of the town council. Its public pages retain the independence notice and `noindex` while the experience is being tested.

## Develop

Node.js 22.12 or newer and npm:

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run test:unit
npm run build
npm run build:proves
npm run test:e2e -- --workers=1
```

Browser tests use an installed Google Chrome. The unit command also exercises time-sensitive logic in the Pacific/Auckland and America/New_York time zones.

## Build and publish

`npm run build` writes `dist/`. The Pages workflow runs unit tests and builds before publishing changes to `main`.

To check the Pages URL prefix locally:

```sh
SURIA_SITE=https://freixanet.github.io SURIA_BASE=/suria npm run build -- --outDir dist-pages
```

## Decisions and credits

- [Product scope](PRODUCT.md) and [design system](DESIGN.md).
- Sources, image credits and service attribution are collected in the site's “Fonts i crèdits”.
- [Marcos Freixanet](https://github.com/Freixanet) — design and implementation.
