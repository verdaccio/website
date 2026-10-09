import addonData from '../EcosystemSearch/addons.json';
import styles from './Home.module.scss';

import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import React from 'react';

type Addon = { name: string; category: string; origin: string };
const addons = addonData.addons as Addon[];

// Real counts from the plugin catalog (updated by the addon-data workflow).
const total = addons.length;
const core = addons.filter((a) => a.origin === 'core').length;
const countOf = (category: string): number => addons.filter((a) => a.category === category).length;
const exists = (name: string): boolean => addons.some((a) => a.name === name);

const KINDS = [
  {
    category: 'authentication',
    title: 'Authentication',
    text: 'Decide who can log in and publish.',
    icon: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
    examples: [
      'verdaccio-htpasswd',
      'verdaccio-openid',
      'verdaccio-github-oauth-ui',
      'verdaccio-ldap',
    ],
  },
  {
    category: 'storage',
    title: 'Storage',
    text: 'Keep packages on S3, Google Cloud or your own backend.',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
    examples: ['verdaccio-aws-s3-storage', 'verdaccio-google-cloud', 'verdaccio-minio'],
  },
  {
    category: 'middleware',
    title: 'Middleware',
    text: 'Add endpoints, metrics and hooks to the registry.',
    icon: 'M12 3l9 5-9 5-9-5z M3 12.5l9 5 9-5',
    examples: ['verdaccio-audit', 'verdaccio-openmetrics', 'verdaccio-badges'],
  },
  {
    category: 'ui',
    title: 'Theme UI',
    text: 'Replace or restyle the web interface.',
    icon: 'M3 5h18v14H3z M3 9h18',
    examples: ['@verdaccio/ui-theme', 'verdaccio-oidc-ui'],
  },
  {
    category: 'filter',
    title: 'Filters',
    text: 'Hide or block versions before they are served.',
    icon: 'M3 4h18l-7 8v6l-4 2v-8z',
    examples: ['verdaccio-plugin-secfilter', 'verdaccio-plugin-delay-filter'],
  },
];

const Plugins = (): React.ReactElement => (
  <section className={clsx(styles.section, styles.pluginsSection)} id="plugins">
    <div className={styles.wrap}>
      <div className={styles.sectionHead}>
        <div>
          <div className={styles.eyebrow}>Plugins</div>
          <h2 className={styles.h2}>
            <Translate>Verdaccio does the basics. Plugins do the rest.</Translate>
          </h2>
        </div>
        <div>
          <p className={styles.lead} style={{ marginBottom: 20 }}>
            <Translate>
              Authentication, storage, middleware, the web interface and package filters can all be
              swapped or extended. Use one from the community or write your own.
            </Translate>
          </p>
          <div className={clsx(styles.pluginStats, styles.mono)}>
            <span>
              <b>{total}</b> plugins
            </span>
            <span>
              <b>{core}</b> from the core team
            </span>
            <span>
              <b>{total - core}</b> from the community
            </span>
          </div>
        </div>
      </div>

      <div className={styles.kinds}>
        {KINDS.map((kind) => (
          <div key={kind.category} className={styles.kind}>
            <div className={styles.featureTop}>
              <span className={styles.icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={kind.icon} />
                </svg>
              </span>
              <span className={styles.mono}>{countOf(kind.category)}</span>
            </div>
            <h3>{kind.title}</h3>
            <p>{kind.text}</p>
            <div className={clsx(styles.chips, styles.mono)}>
              {kind.examples
                .filter(exists)
                .slice(0, 2)
                .map((name) => (
                  <span key={name} className={styles.chip} title={name}>
                    {name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.ctas}>
        <Link to="/dev/plugins-search" className={clsx(styles.btn, styles.btnPrimary)}>
          <Translate>Browse all plugins</Translate> →
        </Link>
        <Link to="/docs/plugins" className={styles.btn}>
          <Translate>Use a plugin</Translate>
        </Link>
        <Link to="/dev/dev-plugins" className={styles.btn}>
          <Translate>Build your own</Translate>
        </Link>
      </div>
    </div>
  </section>
);

export default Plugins;
