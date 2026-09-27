---
id: webui
title: 'Web Configuration'
---

![Uplinks](https://user-images.githubusercontent.com/558752/52916111-fa4ba980-32db-11e9-8a64-f4e06eb920b3.png)

Verdaccio has a web user interface to display only the private packages and can be customised to your liking.

```yaml
web:
  enabled: true
  title: Verdaccio
  logo: http://somedomain/somelogo.png
  logoDark: http://somedomain/somelogo-dark.png
  primaryColor: '#4b5e40'
  gravatar: true | false
  scope: '@scope'
  sort_packages: asc | desc
  darkMode: false
  favicon: http://somedomain/favicon.ico | /path/favicon.ico
  rateLimit:
    windowMs: 50000
    max: 1000
  pkgManagers:
    - npm
    - yarn
    - pnpm
  login: true
  scriptsBodyAfter:
    - '<script type="text/javascript" src="https://my.company.com/customJS.min.js"></script>'
  metaScripts:
    - '<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>'
    - '<script type="text/javascript" src="https://browser.sentry-cdn.com/5.15.5/bundle.min.js"></script>'
    - '<meta name="robots" content="noindex" />'
  scriptsbodyBefore:
    - '<div id="myId">html before webpack scripts</div>'
  html_cache: true
  showInfo: true
  showSettings: true
  # In combination with darkMode you can force specific theme
  showThemeSwitch: true
  showFooter: true
  showSearch: true
  showDownloadTarball: true
  showUplinks: true
  showRaw: true
  hideDeprecatedVersions: false
  assetFolder: ./storage/assets
```

All access restrictions defined to [protect your packages](protect-your-dependencies.md) will also apply to the Web Interface.

:::caution `enabled` and `primaryColor`, not `enable` and `primary_color`
The old spellings `enable` and `primary_color` are still read, but they are **deprecated**.
Use `enabled` and `primaryColor` in new configuration files; the `config.yaml` Verdaccio
generates already uses those.

If you set **both** spellings of the colour, the deprecated `primary_color` is the one that
wins — so remove it rather than leaving both in place. An invalid hex value is ignored and
the default is used.
:::

`primaryColor` and `scope` must be wrapped in quotes — `'#000000'` or `"#000000"` — and
`primaryColor` **must be a valid hex representation**.

### Internationalization {#internationalization}

There are translations available.

```yaml
i18n:
  web: en-US
```

> ⚠️ Only the enabled languages on this [file](https://github.com/verdaccio/verdaccio/blob/master/packages/plugins/ui-theme/src/i18n/enabledLanguages.ts) are available, you can contribute by adding new more languages. The default
> one is en-US

### Configuration {#configuration}

| Property                 | Type              | Default   | Description                                                                                                    |
| ------------------------ | ----------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| `enabled`                | boolean           | `true`    | Serve the web interface. `enable` is the deprecated spelling                                                    |
| `title`                  | string            | Verdaccio | HTML head title                                                                                                |
| `gravatar`               | boolean           | `true`    | Generate Gravatars for user avatars                                                                             |
| `sort_packages`          | `asc` \| `desc`   | `asc`     | Direction of the package list ordering                                                                         |
| `sort_field`             | string            | `name`    | Package field the list is ordered by                                                                            |
| `logo`                   | string            | —         | URI of the header logo, a local path or a URL                                                                  |
| `logoDark`               | string            | —         | Logo used when the dark theme is active; falls back to `logo`                                                  |
| `favicon`                | string            | —         | Custom favicon, a local path or a URL                                                                           |
| `primaryColor`           | string            | `#4b5e40` | Primary colour of the UI. `primary_color` is the deprecated spelling                                            |
| `darkMode`               | boolean           | `false`   | Start in the dark theme                                                                                        |
| `scope`                  | string            | `''`      | Scope shown in the registry instructions header, e.g. `'@myscope'`                                               |
| `pkgManagers`            | list              | `yarn`, `pnpm`, `npm` | Which package managers appear in the sidebar and the registry dialog                               |
| `login`                  | boolean           | `true`    | Allow logging in from the UI. `false` also disables the web login endpoints                                     |
| `rateLimit`              | object            | `max: 5000`, `windowMs: 120000` | Rate limit of the web data endpoints only; CSS and JS are not counted. Prefer [`userRateLimit`](configuration#user-rate-limit) |
| `html_cache`             | boolean           | `true`    | Cache the rendered HTML shell                                                                                  |
| `assetFolder`            | string            | —         | Folder served as extra static assets, for logos and files referenced by the options above                        |
| `metaScripts`            | string[]          | —         | Tags injected before `</head>`                                                                                  |
| `scriptsBodyBefore`      | string[]          | —         | Tags injected as the first child of `<body>`                                                                     |
| `scriptsBodyAfter`       | string[]          | —         | Tags injected as the last child of `</body>`                                                                     |
| `showInfo`               | boolean           | `true`    | Show the info button in the header                                                                             |
| `showSettings`           | boolean           | `true`    | Show the settings button in the header                                                                          |
| `showThemeSwitch`        | boolean           | `true`    | Show the theme switch. Combine with `darkMode` to force one theme                                               |
| `showFooter`             | boolean           | `true`    | Show the footer                                                                                                |
| `showSearch`             | boolean           | `true`    | Show the search box                                                                                            |
| `showDownloadTarball`    | boolean           | `true`    | Show the download button in the sidebar                                                                         |
| `showUplinks`            | boolean           | `true`    | Show the uplinks section of the package detail                                                                  |
| `showRaw`                | boolean           | `true`    | Show the raw manifest button in the sidebar                                                                     |
| `hideDeprecatedVersions` | boolean           | `false`   | Leave deprecated versions out of the version list                                                               |

Every option above works on both **6.x** and **7.x**.

:::note `scriptsbodyBefore` with a lowercase `b`
Both `scriptsBodyBefore` and the misspelled `scriptsbodyBefore` are accepted, because the
typo shipped first and configurations in the wild rely on it. Use `scriptsBodyBefore`.
:::

> The recommended logo size is `40x40` pixels.

> `darkMode` can also be toggled from the UI, where the choice is persisted in the
> browser's local storage. Combining `showThemeSwitch: false` with `darkMode` forces one
> theme for everybody. Note that the dark theme ignores `primaryColor`: its palette is not
> customisable.
