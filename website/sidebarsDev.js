// @ts-check
// Developer docs: plugin API and Node API.
//
// This instance is intentionally NOT translated. Its sources live in `website/dev`,
// outside the `/website/docs/**` glob that crowdin.yaml uploads, so Crowdin never
// sees them. Do not move these pages back into `website/docs`.
module.exports = {
  dev: [
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: [
        'dev-plugins',
        'plugin-generator',
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
