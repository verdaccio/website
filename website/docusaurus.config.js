// @ts-check

const { themes } = require('prism-react-renderer');

// ── External URLs & credentials ───────────────────────────────────────────────

const GITHUB = {
  REPO: 'https://github.com/verdaccio/verdaccio',
  EDIT_DOCS: 'https://github.com/verdaccio/website/edit/master/website/docs',
  EDIT_BLOG: 'https://github.com/verdaccio/verdaccio/edit/master/website',
  BUTTONS: 'https://buttons.github.io/buttons.js',
};

const SOCIAL = {
  DISCORD: 'https://discord.gg/7qWJxBf',
  BLUESKY: 'https://bsky.app/profile/verdaccio.org',
  STACK_OVERFLOW: 'https://stackoverflow.com/questions/tagged/verdaccio',
  OPEN_COLLECTIVE: 'https://opencollective.com/verdaccio',
};

const DONATE = {
  UKRAINE: 'https://u24.gov.ua',
};

const ANALYTICS = {
  GA_TRACKING_ID: 'G-PCYM9FYJZT',
};

// ── Config ────────────────────────────────────────────────────────────────────

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'Verdaccio',
  tagline: 'A lightweight Node.js private proxy registry',
  organizationName: 'verdaccio',
  projectName: 'verdaccio',
  url: 'https://verdaccio.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  // FUTURE: migrate into markdown section on migrate 4.0
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',
  favicon: 'img/logo/uk/verdaccio-tiny-uk-no-bg.svg',
  scripts: [GITHUB.BUTTONS],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  customFields: {
    description: 'A lightweight Node.js private proxy registry',
  },

  plugins: [
    require.resolve('docusaurus-lunr-search'),
    [
      'docusaurus-plugin-llms',
      {
        title: 'Verdaccio',
        description:
          'A lightweight open source private npm proxy registry. Runs on Node.js, caches ' +
          'packages from upstream registries, and is extended through plugins for ' +
          'authentication, storage, middleware, themes and metadata filtering.',
        // Facts a model is likely to get wrong from training data alone, stated before the
        // link list rather than hoping it reads far enough to find them. Keep this about
        // things that changed, not about what Verdaccio is — the description covers that.
        rootContent: [
          '## Release lines',
          '',
          '`6.x` is the current stable line, published as `latest`, and requires Node.js 22 or',
          'newer. `7.x` is the next major, published as `next-7`, and requires Node.js 24 or',
          'newer. Versions 5 and older are end of life. Only the `verdaccio` binary is tagged',
          'after its own line: the `@verdaccio/*` packages and the plugins it is built from',
          'are tagged `latest` for 6.x and `next-9` for 7.x, and the `6-next` and `next-7`',
          'tags on those packages are stale prereleases that should not be used.',
          '',
          '## Things commonly got wrong',
          '',
          '- The default `htpasswd` hashing algorithm is **bcrypt** with 10 rounds, on every',
          '  supported version. `md5`, `sha1` and `crypt` exist only to read files written by',
          '  other tools.',
          '- The plugin interfaces are `ExpressMiddleware`, `Auth`, `Storage`, `StorageHandler`',
          '  and `ManifestFilter`, all under `pluginUtils` in `@verdaccio/core`. The names',
          '  `IPluginMiddleware`, `IPluginAuth`, `IPluginStorage`, `IPackageStorage`,',
          '  `IStorageManager` and `IPlugin` were removed, and so was the',
          '  `@verdaccio/commons-api` package — its helpers are `errorUtils` in `@verdaccio/core`.',
          '- Storage plugins use a **promise** contract. The callback contract is 6.x only and',
          '  runs through a compatibility adapter on 7.x.',
          '- The configuration file is resolved through `XDG_CONFIG_HOME`',
          '  (`~/.config/verdaccio/config.yaml`). `XDG_DATA_HOME` only decides where the',
          '  default storage goes.',
          '- The feature-flag section is `flags`; `experiments` is the former name and still',
          '  accepted. `stage` and `tfa` are 7.x only.',
          '- The web UI options are `enabled` and `primaryColor`; `enable` and `primary_color`',
          '  are deprecated spellings.',
          '- Log rotation is not built in, and the default log format is `json` when',
          '  `NODE_ENV=production`, `pretty` otherwise.',
        ].join('\n'),
        // `dev` is a separate content-docs instance; without listing it here the plugin
        // development docs are left out entirely. `docs` goes first so the file does not
        // read as if Verdaccio were only a plugin API.
        docsDir: [
          { path: 'docs', routeBasePath: 'docs', label: 'Documentation' },
          { path: 'dev', routeBasePath: 'dev', label: 'Developing plugins' },
        ],
        // Lead with what Verdaccio is and how to run it, then the reference, then the
        // plugin API — the order someone learning it would want.
        includeOrder: [
          'docs/what-is-verdaccio.md',
          'docs/install.md',
          'docs/cli.md',
          'docs/cli-registry.md',
          'docs/setup-*.md',
          'docs/config.md',
          'docs/uplinks.md',
          'docs/packages.md',
          'docs/auth.md',
          'docs/web.md',
          'docs/plugins.md',
          'docs/**',
          'dev/**',
        ],
        // the examples folder ships a README for contributors, not a docs page
        ignoreFiles: ['dev/examples/**'],
        includeBlog: false,
        generateLLMsFullTxt: true,
        // `import` lines and the mdx-code-block fences around them are build plumbing;
        // they were leaking into llms-full.txt as if they were sample code.
        excludeImports: true,
        removeDuplicateHeadings: true,
      },
    ],
    'docusaurus-plugin-sass',
    'docusaurus-plugin-contributors',
    'docusaurus-plugin-downloads',
    [
      'content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateTime: true,
      },
    ],
    [
      'content-docs',
      {
        id: 'dev',
        path: 'dev',
        routeBasePath: 'dev',
        sidebarPath: require.resolve('./sidebarsDev.js'),
        showLastUpdateTime: true,
      },
    ],
    [
      'content-docs',
      {
        id: 'talks',
        path: 'talks',
        routeBasePath: 'talks',
        sidebarPath: require.resolve('./sidebarsTalk.js'),
        showLastUpdateTime: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },
      announcementBar: {
        id: 'announcementBar',
        content: `<a target="_blank" rel="noopener noreferrer" href="${DONATE.UKRAINE}">OFFICIAL FUNDRAISING PLATFORM OF UKRAINE</a>!`,
        isCloseable: false,
        backgroundColor: '#1595de',
        textColor: '#ffffff',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Verdaccio',
        logo: {
          alt: 'Verdaccio Logo',
          src: 'img/logo/uk/verdaccio-tiny-uk-no-bg.svg',
        },
        items: [
          { type: 'doc', docId: 'what-is-verdaccio', position: 'left', label: 'Docs' },
          {
            type: 'docSidebar',
            sidebarId: 'dev',
            docsPluginId: 'dev',
            position: 'left',
            label: 'Developers',
          },
          { to: '/blog', position: 'left', label: 'Blog' },
          { href: '/community', position: 'left', label: 'Community' },
          { href: SOCIAL.OPEN_COLLECTIVE, position: 'right', label: 'Sponsor Us' },
          {
            href: GITHUB.REPO,
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub Repository',
          },
          {
            href: SOCIAL.BLUESKY,
            position: 'right',
            className: 'header-bluesky-link',
            'aria-label': 'Follow Us on Bluesky',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/what-is-verdaccio' },
              { label: 'Docker', to: '/docs/docker' },
              { label: 'Configuration', to: '/docs/configuration' },
              { label: 'Logos', to: '/docs/logo' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: SOCIAL.STACK_OVERFLOW },
              { label: 'Discord', href: SOCIAL.DISCORD },
              { label: 'Bluesky', href: SOCIAL.BLUESKY },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog', to: '/blog' },
              { label: 'GitHub', href: GITHUB.REPO },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Verdaccio Community. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarCollapsible: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
            // must run after npm2yarn: it preselects the pnpm tab it generated
            require('./plugins/remark-npm2yarn-default-pnpm'),
          ],
          editUrl: ({ docPath }) => `${GITHUB.EDIT_DOCS}/${docPath}`,
        },
        gtag: { trackingID: ANALYTICS.GA_TRACKING_ID },
        blog: {
          blogTitle: 'Verdaccio Official Blog',
          blogDescription: 'The official Verdaccio Node.js proxy registry blog',
          showReadingTime: true,
          postsPerPage: 3,
          feedOptions: { type: 'all' },
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
          authorsMapPath: 'authors.yml',
          editUrl: ({ blogDirPath, blogPath }) => `${GITHUB.EDIT_BLOG}/${blogDirPath}/${blogPath}`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],
};
