import styles from './Home.module.scss';

import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import React from 'react';

const PACKAGES = [
  {
    name: '@verdaccio/ui',
    version: '2.4.0',
    text: 'Components of the web interface',
    active: true,
  },
  { name: '@verdaccio/core', version: '1.12.3', text: 'Shared types and utilities' },
  { name: '@verdaccio/config', version: '0.9.1', text: 'Configuration loader and builder' },
  { name: '@verdaccio/logger', version: '3.0.0', text: 'Structured logging for the registry' },
];

const VERSIONS = ['2.4.0', '2.3.1', '2.3.0', '2.2.4'];

// A stylised illustration of the web interface, not a screenshot: it shows what you get, with
// example packages.
const Mock = (): React.ReactElement => (
  <div
    className={styles.uiWin}
    role="img"
    aria-label="Illustration of the Verdaccio web interface: a package list with search, and the page of a package with install commands, versions and tags."
  >
    <div className={styles.uiBar}>
      <span className={styles.uiDots}>
        <i />
        <i />
        <i />
      </span>
      <span className={clsx(styles.uiUrl, styles.mono)}>localhost:4873</span>
    </div>
    <div className={styles.uiBody}>
      <div className={styles.uiNav}>
        <strong>verdaccio</strong>
        <span className={styles.uiSearch}>Search packages…</span>
        <span className={styles.uiLogin}>Login</span>
      </div>
      <div className={styles.uiCols}>
        <ul className={styles.uiList}>
          {PACKAGES.map((pkg) => (
            <li key={pkg.name} className={pkg.active ? styles.uiActive : undefined}>
              <span className={styles.uiPkg}>
                {pkg.name}
                <span className={clsx(styles.uiVersion, styles.mono)}>v{pkg.version}</span>
              </span>
              <span className={styles.uiDesc}>{pkg.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.uiDetail}>
          <h3>
            @verdaccio/ui <span className={clsx(styles.uiVersion, styles.mono)}>v2.4.0</span>
          </h3>
          <div className={styles.uiInstall}>
            <div className={clsx(styles.uiTabs, styles.mono)}>
              <span className={styles.uiTab}>pnpm</span>
              <span>npm</span>
              <span>yarn</span>
            </div>
            <code className={styles.mono}>$ pnpm add @verdaccio/ui</code>
          </div>
          <div className={styles.uiMeta}>
            <div>
              <b>Versions</b>
              <span className={clsx(styles.chips, styles.mono)}>
                {VERSIONS.map((v) => (
                  <span key={v} className={styles.chip}>
                    {v}
                  </span>
                ))}
              </span>
            </div>
            <div>
              <b>Tags</b>
              <span className={clsx(styles.chips, styles.mono)}>
                <span className={styles.chip}>latest · 2.4.0</span>
                <span className={styles.chip}>next · 3.0.0-beta.1</span>
              </span>
            </div>
          </div>
          <div className={styles.uiReadme}>
            <b>README</b>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WebUi = (): React.ReactElement => (
  <section className={clsx(styles.section, styles.webUiSection)} id="web-interface">
    <div className={clsx(styles.wrap, styles.clientGrid)}>
      <div>
        <div className={styles.eyebrow}>Web interface</div>
        <h2 className={styles.h2} style={{ marginBottom: 20 }}>
          <Translate>Browse what you publish.</Translate>
        </h2>
        <p className={styles.lead} style={{ marginBottom: 24 }}>
          <Translate>
            Verdaccio ships with a web interface. Search your packages, read their README, copy the
            install command for your package manager and check versions, tags and dependencies,
            without leaving the browser.
          </Translate>
        </p>
        <ul className={styles.modeList}>
          <li>Search and browse the packages in your registry</li>
          <li>README, versions, tags, dependencies and uplinks for every package</li>
          <li>Install commands for pnpm, npm and yarn, ready to copy</li>
          <li>Login, dark mode and translations; your access rules apply to it too</li>
        </ul>
        <div className={styles.ctas} style={{ marginTop: 8 }}>
          <Link to="/docs/webui" className={clsx(styles.btn, styles.btnPrimary)}>
            <Translate>Configure the interface</Translate> →
          </Link>
          <Link to="/dev/plugin-theme" className={styles.btn}>
            <Translate>Build a theme</Translate>
          </Link>
        </div>
      </div>
      <Mock />
    </div>
  </section>
);

export default WebUi;
