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
        // The plugin contracts were renamed in Verdaccio 7 and years of tutorials still
        // use the old names, so state it before the link list rather than hoping a model
        // reads far enough to find out.
        rootContent: [
          'The plugin interfaces are `ExpressMiddleware`, `Auth`, `Storage`, `StorageHandler`',
          'and `ManifestFilter`, all under `pluginUtils` in `@verdaccio/core`. The names',
          '`IPluginMiddleware`, `IPluginAuth`, `IPluginStorage`, `IPackageStorage`,',
          '`IStorageManager` and `IPlugin` were removed, and so was the',
          '`@verdaccio/commons-api` package — its helpers are `errorUtils` in `@verdaccio/core`.',
        ].join(' '),
        // `dev` is a separate content-docs instance; without listing it here the plugin
        // development docs are left out entirely.
        docsDir: [
          { path: 'dev', routeBasePath: 'dev', label: 'Developing plugins' },
          { path: 'docs', routeBasePath: 'docs', label: 'Documentation' },
        ],
        // the examples folder ships a README for contributors, not a docs page
        ignoreFiles: ['dev/examples/**'],
        includeBlog: false,
        generateLLMsFullTxt: true,
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
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
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
