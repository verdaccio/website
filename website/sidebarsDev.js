// @ts-check
// Developer docs: plugin API and Node API.
//
// Developer reference: plugin API and Node API.
module.exports = {
  dev: [
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: [
        'dev-plugins',
        'plugin-generator',
        'plugin-verifier',
        'plugin-auth',
        'plugin-middleware',
        'plugin-storage',
        {
          type: 'category',
          label: 'Theme',
          items: ['plugin-theme', 'ui-components'],
        },
        'plugin-filter',
      ],
    },
    {
      type: 'category',
      label: 'Node API',
      collapsed: false,
      items: ['node-api'],
    },
    'plugins-search',
  ],
};
