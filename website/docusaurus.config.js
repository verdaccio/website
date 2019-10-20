const {loadYaml} = require('./utils');

// const team = loadYaml("./data/team.yml");
// const nonSponsorUsers = [
//   {
//     caption: "Filiosoft",
//     image: "img/users/filiosoft.png",
//     infoLink: "https://filiosoft.com/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Mozilla Neutrino",
//     image: "img/users/neutrino.png",
//     infoLink: "https://neutrinojs.org/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Angular CLI",
//     image: "img/users/angular.png",
//     infoLink: "https://cli.angular.io/",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "pnpm",
//     image: "img/users/pnpm_logo.png",
//     infoLink: "https://pnpm.js.org/",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "nodesource",
//     image: "img/users/nodesource.jpg",
//     infoLink: "https://nodesource.com/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Strapi",
//     image: "img/users/strapijs.jpg",
//     infoLink: "https://strapi.io/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Innovaccer",
//     image: "img/users/innovaccer.png",
//     infoLink: "http://innovaccer.com/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Storybook",
//     image: "img/users/storybook.svg",
//     infoLink: "https://storybook.js.org",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "create-react-app",
//     image: "img/users/create-react-app.svg",
//     infoLink: "https://facebook.github.io/create-react-app/",
//     fbOpenSource: true,
//     pinned: true,
//   },
//   {
//     caption: "Gatsby",
//     image: "img/users/gatsby.svg",
//     infoLink: "https://www.gatsbyjs.org/",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "Uppy",
//     image: "img/users/uppy.svg",
//     infoLink: "https://uppy.io/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Aurelia",
//     image: "img/users/aurelia.svg",
//     infoLink: "https://aurelia.io/",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "Bit",
//     image: "img/users/bit.png",
//     infoLink: "https://bit.dev/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Yoshi",
//     image: "img/users/yoshi.webp",
//     infoLink: "https://wix.github.io/yoshi/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "JustAnswer",
//     image: "img/users/justanswer.svg",
//     infoLink: "https://www.justanswer.com/",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "vendure",
//     image: "img/users/vendure.png",
//     infoLink: "https://www.vendure.io/",
//     fbOpenSource: false,
//     pinned: true,
//   },
//   {
//     caption: "webiny",
//     image: "img/users/webiny.png",
//     infoLink: "https://www.webiny.com",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "embark",
//     image: "img/users/embark.png",
//     infoLink: "https://embark.status.im",
//     fbOpenSource: false,
//     pinned: false,
//   },
//   {
//     caption: "Satispay",
//     image: "img/users/satispay.png",
//     infoLink: "https://www.satispay.com",
//     fbOpenSource: false,
//     pinned: false,
//   },
// ];
//
// const sponsorUsers = [
//   {
//     caption: "SheetJS",
//     image: "img/users/sheetjs.png",
//     infoLink: "https://sheetjs.com/",
//     fbOpenSource: false,
//     pinned: true,
//   },
// ];
//
// const users = [...sponsorUsers, ...nonSponsorUsers];

const docusaurusConfig = {
  title: 'Verdaccio' /* title for your website */,
  tagline: 'A lightweight private npm proxy registry',
  url: 'https://verdaccio.org/' /* your website url */,
  organizationName: 'verdaccio',
  cname: 'verdaccio.org',
  baseUrl: '/' /* base url for your project */,
  projectName: 'website',
  favicon: 'img/favicon/favicon.ico',
  copyright:
    'Copyright © ' + new Date().getFullYear() + ' Verdaccio community',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  scripts: [
    'https://codefund.io/properties/256/funder.js',
    'https://buttons.github.io/buttons.js',
    'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
    '/js/code-blocks-buttons.js',
  ],
  stylesheets: [
    '/css/code-blocks-buttons.css',
  ],
  repoUrl: 'https://github.com/verdaccio/verdaccio',
  themeConfig: {
    algolia: {
      apiKey: 'a8b4d117e513cd8d71d6a95e3d9d4a91',
      indexName: 'verdaccio'
    },
    googleAnalytics: {
      trackingID: 'UA-2527438-21',
    },
    navbar: {
      title: 'Verdaccio',
      logo: {
        alt: 'Verdaccio Logo',
        src: 'img/logo/symbol/svg/verdaccio-tiny.svg',
      },
      // headerLinks: [
      //   { doc: 'installation', label: 'Docs'},
      //   { blog: true, label: 'Blog'},
      //   { href: "https://twitter.com/verdaccio_npm", label: 'Twitter'},
      //   { page: 'help', label: 'Help'},
      //   { href: "https://github.com/verdaccio", label: "GitHub" },
      //   { search: true },
      //   { page: 'team', label: 'Team'},
      //   { href: "https://opencollective.com/verdaccio", label: "Donate" },
      // ],
      links: [
        {to: 'docs/installation', label: 'Docs', position: 'left'},
        {to: 'team', label: 'Team', position: 'right'},
        {
          href: 'https://github.com/verdaccio',
          label: 'GitHub',
          position: 'right',
        },
        {to: 'help', label: 'Help', position: 'right'},
        {to: 'blog', label: 'Blog', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Verdaccio Dark Mode Logo',
        src: 'img/logo/symbol/svg/verdaccio-blackwhite.svg',
      }
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        {
          docs: {
            // docs folder path relative to website dir.
            path: '../docs',
            // sidebars file relative to website dir.
            sidebarPath: require.resolve('./sidebars.json'),
            editUrl: 'https://github.com/verdaccio/website/tree/master/docs/',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          },
          blog: {
            postsPerPage: 10,
          },
        },
      ],
    ],
  }
};

module.exports = docusaurusConfig;
