// @ts-check

const { translationsData } = require('@verdaccio/local-scripts');
const { themes } = require('prism-react-renderer');

// ── External URLs & credentials ───────────────────────────────────────────────

const GITHUB = {
  REPO: 'https://github.com/verdaccio/verdaccio',
  EDIT_DOCS: 'https://github.com/verdaccio/website/edit/master/website/docs',
  EDIT_BLOG: 'https://github.com/verdaccio/verdaccio/edit/master/website',
  BUTTONS: 'https://buttons.github.io/buttons.js',
};

const CROWDIN = {
  PROJECT: 'https://crowdin.com/project/verdaccio',
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

// ── i18n ──────────────────────────────────────────────────────────────────────

/** @type {Record<string, string>} Maps Docusaurus locale codes to Crowdin language codes */
const LOCALE_TO_CROWDIN = {
  'de-DE': 'de',
  'pl-PL': 'pl',
  'cs-CZ': 'cs',
  'ga-IE': 'ga-IE',
  'fr-FR': 'fr',
  'it-IT': 'it',
  'ru-RU': 'ru',
  'vi-VN': 'vi',
  'yo-NG': 'yo',
};

const MIN_TRANSLATION_PROGRESS = 80;

/**
 * Filters locales by translation progress threshold.
 * English is always included regardless of progress.
 *
 * @param {string[]} locales
 * @returns {string[]}
 */
const filterByProgress = (locales) => {
  return locales.filter((locale) => {
    if (locale === 'en') return true;

    const crowdinKey = LOCALE_TO_CROWDIN[locale] ?? locale;
    const localeData = translationsData[crowdinKey];

    if (!localeData) {
      console.warn(`[i18n] Locale "${crowdinKey}" excluded — not found in translations data`);
      return false;
    }

    const { translationProgress } = localeData;
    if (translationProgress <= MIN_TRANSLATION_PROGRESS) {
      console.warn(
        `[i18n] Locale "${crowdinKey}" excluded — progress ${translationProgress}% is below threshold ${MIN_TRANSLATION_PROGRESS}%`
      );
      return false;
    }

    return true;
  });
};

/** @param {string} crowdinKey @returns {number} */
const progress = (crowdinKey) => translationsData[crowdinKey]?.translationProgress ?? 0;

/** @param {string} label @param {string} crowdinKey @returns {string} */
const localeLabel = (label, crowdinKey) => `${label} (${progress(crowdinKey)}%)`;

const locales = filterByProgress([
  'en',
  'cs-CZ',
  'de-DE',
  'es-ES',
  'fr-FR',
  'it-IT',
  'ga-IE',
  'pl-PL',
  'pt-BR',
  'ru-RU',
  'sr-CS',
  'vi-VN',
  'yo-NG',
  'zh-TW',
  'zh-CN',
]);

console.log('[i18n] Active locales:', locales);

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
    locales,
    localeConfigs: {
      en:      { label: 'English' },
      'it-IT': { label: localeLabel('Italiano', 'it') },
      'es-ES': { label: localeLabel('Español', 'es-ES') },
      'de-DE': { label: localeLabel('Deutsch', 'de') },
      'cs-CZ': { label: localeLabel('Čeština (Česko)', 'cs') },
      'fr-FR': { label: localeLabel('Français', 'fr') },
      'pl-PL': { label: localeLabel('Polski (Polska)', 'pl') },
      'pt-BR': { label: localeLabel('Português (Brasil)', 'pt-BR') },
      'ru-RU': { label: localeLabel('Русский (Россия)', 'ru') },
      'zh-CN': { label: localeLabel('中文（中国）', 'zh-CN') },
      'zh-TW': { label: localeLabel('中文（台灣）', 'zh-TW') },
      'yo-NG': { label: localeLabel('Èdè Yorùbá (Nàìjíríà)', 'yo') },
      'sr-CS': { label: localeLabel('Српски (Србија)', 'sr-CS') },
      'vi-VN': { label: localeLabel('Tiếng Việt (Việt Nam)', 'vi') },
    },
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
    'docusaurus-plugin-sass',
    'docusaurus-plugin-contributors',
    'docusaurus-plugin-downloads',
    ['content-docs', { id: 'community', path: 'community', routeBasePath: 'community', sidebarPath: require.resolve('./sidebarsCommunity.js'), showLastUpdateTime: true }],
    ['content-docs', { id: 'dev',       path: 'dev',       routeBasePath: 'dev',       sidebarPath: require.resolve('./sidebarsDev.js'),       showLastUpdateTime: true }],
    ['content-docs', { id: 'talks',     path: 'talks',     routeBasePath: 'talks',     sidebarPath: require.resolve('./sidebarsTalk.js'),      showLastUpdateTime: true }],
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
          { type: 'doc', docId: 'what-is-verdaccio', position: 'left',  label: 'Docs' },
          { type: 'doc', docId: 'node-api',          position: 'left',  label: 'API' },
          { to: '/blog',                              position: 'left',  label: 'Blog' },
          { href: '/community',                       position: 'left',  label: 'Community' },
          { href: '/talks',                           position: 'left',  label: 'Video Talks' },
          { href: SOCIAL.OPEN_COLLECTIVE,             position: 'right', label: 'Sponsor Us' },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [{ href: CROWDIN.PROJECT, label: 'Help Us Translate' }],
          },
          { href: GITHUB.REPO,    position: 'right', className: 'header-github-link',  'aria-label': 'GitHub Repository' },
          { href: SOCIAL.BLUESKY, position: 'right', className: 'header-bluesky-link', 'aria-label': 'Follow Us on Bluesky' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              { label: 'Getting Started', to: '/docs/what-is-verdaccio' },
              { label: 'Docker',          to: '/docs/docker' },
              { label: 'Configuration',   to: '/docs/configuration' },
              { label: 'Logos',           to: '/docs/logo' },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: SOCIAL.STACK_OVERFLOW },
              { label: 'Discord',        href: SOCIAL.DISCORD },
              { label: 'Bluesky',        href: SOCIAL.BLUESKY },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'Blog',   to: '/blog' },
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
          editUrl: ({ locale, docPath }) =>
            locale !== 'en'
              ? `${CROWDIN.PROJECT}/${locale}`
              : `${GITHUB.EDIT_DOCS}/${docPath}`,
        },
        googleAnalytics: { trackingID: ANALYTICS.GA_TRACKING_ID },
        gtag:            { trackingID: ANALYTICS.GA_TRACKING_ID },
        blog: {
          blogTitle: 'Verdaccio Official Blog',
          blogDescription: 'The official Verdaccio Node.js proxy registry blog',
          showReadingTime: true,
          postsPerPage: 3,
          feedOptions: { type: 'all' },
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
          authorsMapPath: 'authors.yml',
          editUrl: ({ locale, blogDirPath, blogPath }) =>
            locale !== 'en'
              ? `${CROWDIN.PROJECT}/${locale}`
              : `${GITHUB.EDIT_BLOG}/${blogDirPath}/${blogPath}`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],
};
