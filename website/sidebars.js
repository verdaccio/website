// @ts-check
module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'installation',
        'what-is-verdaccio',
        'cli',
        {
          type: 'category',
          label: 'Setting up Verdaccio',
          items: ['cli-registry', 'setup-pnpm', 'setup-npm', 'setup-yarn', 'setup-bun'],
        },
        'who-is-using',
        'usage-adoption',
        'best',
        'docker',
        'env',
        'protect-your-dependencies',
        'e2e',
        'logo',
        {
          type: 'category',
          label: 'Use Cases',
          items: ['caching', 'linking-remote-registry'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'configuration',
        'uplinks',
        'packages',
        'authentication',
        {
          type: 'category',
          label: 'Feature flags',
          items: [
            'two-factor-authentication',
            'staged-publishing',
            'web-login',
            'user-registration',
            'change-password',
          ],
        },
        'notifications',
        'logger',
        {
          type: 'category',
          label: 'User Interface',
          items: ['webui'],
        },
        'plugins',
        {
          type: 'link',
          label: 'Search for Plugins & Tools',
          href: '/dev/plugins-search',
        },
      ],
    },
    {
      type: 'category',
      label: 'Server',
      items: ['server-configuration', 'reverse-proxy', 'ssl', 'windows', 'iss-server'],
    },
    {
      type: 'category',
      label: 'DevOps',
      items: [
        'kubernetes',
        'github-actions',
        {
          type: 'category',
          label: 'Tools',
          items: ['ansible', 'puppet', 'chef'],
        },
      ],
    },
  ],
};
