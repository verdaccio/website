# Verdaccio Website

The official Verdaccio documentation website, built with [Docusaurus 2](https://docusaurus.io/) — a modern static website generator.

## Requirements

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/)

## Installation

```console
pnpm install
```

## Local Development

```console
pnpm start
```

Starts a local development server and opens a browser window. Most changes are reflected live without restarting the server.

## Build

```console
pnpm build
```

Generates static content into the `build` directory, which can be served by any static hosting service.

## Translations

This site supports multiple languages via [Crowdin](https://crowdin.com/project/verdaccio). To contribute a translation, click **Help Us Translate** in the language switcher on the site, or visit the Crowdin project directly.

### Language filtering

Not all languages appear in the site navigation. A locale is included only when its **translation progress exceeds the minimum threshold** (currently `80%`). Languages that fall below this threshold are excluded at build time, and a warning is printed to the console:

```
[i18n] Locale "de" excluded — progress 72% is below threshold 80%
```

Locales with no matching entry in the translations data are also excluded:

```
[i18n] Locale "xx" excluded — not found in translations data
```

The active locales for the current build are logged on startup:

```
[i18n] Active locales: [ 'en', 'de-DE', 'fr-FR', ... ]
```

### Adding or updating a locale

1. Open `docusaurus.config.js` and add the locale code to the `filterByProgress` call.
2. Add a corresponding entry in `LOCALE_TO_CROWDIN` if the Crowdin key differs from the Docusaurus locale code (e.g. `'de-DE' → 'de'`).
3. Add a `localeConfigs` entry using the `localeLabel` helper so the language switcher shows the current progress percentage.
4. Translate the content on [Crowdin](https://crowdin.com/project/verdaccio) until the locale clears the threshold.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for general contribution guidelines.
