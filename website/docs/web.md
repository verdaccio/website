---
id: webui
title: 'Web Configuration'
description: 'Configure the web interface: title, logo, colours, dark mode, which features are visible, and injecting your own scripts.'
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
    - bun
  login: true
  footer: 'Need help? Read the [registry guide](https://verdaccio.org/docs/cli-registry)'
  poweredBy: true
  help: |
    ## Platform registry
    Run `npm config set registry {{registryUrl}}` before publishing.
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

| Property                         | Type            | Default                         | Description                                                                                                                       |
| -------------------------------- | --------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                        | boolean         | `true`                          | Serve the web interface. `enable` is the deprecated spelling                                                                      |
| `title`                          | string          | Verdaccio                       | HTML head title                                                                                                                   |
| `gravatar`                       | boolean         | `true`                          | Generate Gravatars for user avatars                                                                                               |
| `sort_packages`                  | `asc` \| `desc` | `asc`                           | Direction of the package list ordering                                                                                            |
| `sort_field` <small>7.x</small>  | string          | `name`                          | Package field the list is ordered by                                                                                              |
| `logo`                           | string          | —                               | URI of the header logo, a local path or a URL                                                                                     |
| `logoDark`                       | string          | —                               | Logo used when the dark theme is active; falls back to `logo`                                                                     |
| `favicon`                        | string          | —                               | Custom favicon, a local path or a URL                                                                                             |
| `primaryColor`                   | string          | `#4b5e40`                       | Primary colour of the UI. `primary_color` is the deprecated spelling                                                              |
| `darkMode`                       | boolean         | `false`                         | Start in the dark theme                                                                                                           |
| `scope`                          | string          | `''`                            | Scope shown in the registry instructions header, e.g. `'@myscope'`                                                                |
| `pkgManagers`                    | list            | `yarn`, `pnpm`, `npm`, `bun`    | Which package managers appear in the sidebar, the welcome card and the registry dialog, see [Package managers](#package-managers) |
| `login`                          | boolean         | `true`                          | Allow logging in from the UI. `false` also disables the web login endpoints                                                       |
| `rateLimit`                      | object          | `max: 5000`, `windowMs: 120000` | Rate limit of the web data endpoints only; CSS and JS are not counted. Prefer [`userRateLimit`](config.md#user-rate-limit)        |
| `html_cache`                     | boolean         | `true`                          | Cache the rendered HTML shell                                                                                                     |
| `assetFolder` <small>7.x</small> | string          | —                               | Folder served under `/-/assets/`, for logos and files referenced above; handy with Docker volumes                                 |
| `metaScripts`                    | string[]        | —                               | Tags injected before `</head>`                                                                                                    |
| `scriptsBodyBefore`              | string[]        | —                               | Tags injected as the first child of `<body>`                                                                                      |
| `scriptsBodyAfter`               | string[]        | —                               | Tags injected as the last child of `</body>`                                                                                      |
| `showInfo`                       | boolean         | `true`                          | Show the info button in the header                                                                                                |
| `showSettings`                   | boolean         | `true`                          | Show the settings button in the header                                                                                            |
| `showThemeSwitch`                | boolean         | `true`                          | Show the theme switch. Combine with `darkMode` to force one theme                                                                 |
| `showFooter`                     | boolean         | `true`                          | Show the footer                                                                                                                   |
| `footer`                         | string          | —                               | Markdown that replaces the left side of the footer, see [Footer](#footer)                                                         |
| `poweredBy`                      | boolean, string | `true`                          | `false` hides the "Powered by" link, markdown replaces it, see [Footer](#footer)                                                  |
| `help`                           | string          | —                               | Markdown that replaces the welcome card of an empty registry, see [Welcome card](#welcome-card)                                   |
| `showSearch`                     | boolean         | `true`                          | Show the search box; `false` also disables the web search endpoint, see [Search](#search)                                         |
| `showDownloadTarball`            | boolean         | `true`                          | Show the tarball download button in the sidebar and in the package list of the home page                                          |
| `showPackageListToolbar`         | boolean         | `true` on 7.x, `false` on 6.x   | Show the filter, scope and sort bar above the home page package list, see [Package list](#package-list)                           |
| `showUplinks`                    | boolean         | `true`                          | Show the uplinks section of the package detail; it also groups search results by origin                                           |
| `showRaw`                        | boolean         | `true`                          | Show the raw manifest button in the sidebar                                                                                       |
| `hideDeprecatedVersions`         | boolean         | `false`                         | Leave deprecated versions out of the version list                                                                                 |

`footer`, `poweredBy`, `help`, `showPackageListToolbar`, `bun` in `pkgManagers` and the search
endpoint switch need a recent release; older releases ignore them.

:::note `scriptsbodyBefore` with a lowercase `b`
Both `scriptsBodyBefore` and the misspelled `scriptsbodyBefore` are accepted, because the
typo shipped first and configurations in the wild rely on it. Use `scriptsBodyBefore`.
:::

> The recommended logo size is `40x40` pixels.

> `darkMode` can also be toggled from the UI, where the choice is persisted in the
> browser's local storage. Combining `showThemeSwitch: false` with `darkMode` forces one
> theme for everybody. Note that the dark theme ignores `primaryColor`: its palette is not
> customisable.

### Footer {#footer}

`footer` and `poweredBy` take markdown, so the footer can carry text, links and images.
`footer` replaces the default "Made with ♥" message on the left; `poweredBy` controls the
"Powered by" link on the right.

```yaml
web:
  assetFolder: ./storage/assets
  footer: '![Platform team](/-/assets/team-logo.png) Run by the platform team · [Status](https://status.my.company.com)'
  # false hides it; a string replaces it; leave it out to keep the default
  poweredBy: '[Support](https://my.company.com/support)'
```

- Images are shown at most 32 pixels high. Serve them from
  [`assetFolder`](#configuration) <small>7.x</small>, published under `/-/assets/`, or use an
  absolute URL.
- Links open in a new tab. Raw HTML in the markdown is not rendered; use
  [`scriptsBodyAfter`](#configuration) if you need markup the markdown cannot express.
- `showFooter: false` still hides the whole footer, whatever these two options say.
- On narrow screens the two sides stack instead of shrinking.

### Welcome card {#welcome-card}

While the registry has no packages, the home page shows a step-by-step guide to point a
package manager at the registry, log in and publish. `help` replaces it with your
own markdown, for example instructions specific to your company:

````yaml
web:
  help: |
    ## Platform registry
    This registry serves the company packages and proxies npmjs.

    ```
    npm config set registry {{registryUrl}}
    ```

    Read the [onboarding guide](https://my.company.com/registry) before publishing.
````

`{{registryUrl}}` is replaced with the address of the registry, as seen by the browser.
Links open in a new tab and raw HTML is not rendered. A blank value keeps the default guide.

### Package managers {#package-managers}

`pkgManagers` decides which commands the package sidebar offers, which setup tabs the
welcome card shows while the registry has no packages, and which sections the registry
information dialog opens. `bun` is part of the default list (`yarn`, `pnpm`, `npm`, `bun`); a registry that sets `pkgManagers` keeps exactly the list it sets.

With `bun` listed, the sidebar shows `bun add <package>`, and the welcome card and the
registry dialog show the `bunfig.toml` setup and `bun publish --registry <url>`. bun has no
login command; it uses the token `npm adduser` saves in `.npmrc`. See [bun](setup-bun.md).
The sidebar also shows the `.npmrc` line for the registry, scoped (`@scope:registry=...`)
for scoped packages.

### Search {#search}

`showSearch: false` hides the search box in the header and also disables the web search
endpoint (`/-/verdaccio/data/search`), which then answers `404`. The npm search API
behind `npm search` is not affected.

### Package list {#package-list}

With two or more packages, the home page can show a bar above the list: a text filter on name,
description and keywords, a scope selector when the registry holds more than one scope, and a
sort by name or by most recent publication. The filter and the scope are kept in the address
(`?q=` and `?scope=`), so going back from a package restores them.

The bar is on by default on 7.x and off by default on 6.x, so a 6.x upgrade keeps the home page
as it was. Set the option to choose explicitly:

```yaml
web:
  showPackageListToolbar: true # false shows the plain list, in the server order
```
