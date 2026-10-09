import CacheFlow from './CacheFlow';
import CommandTabs from './CommandTabs';
import GitHubStars from './GitHubStars';
import styles from './Home.module.scss';

import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React from 'react';

const USED_BY = [
  { name: 'nx', url: 'https://nx.dev' },
  { name: 'pnpm', url: 'https://pnpm.io' },
  { name: 'Vendure', url: 'https://www.vendure.io/' },
  { name: 'create-react-app', url: 'https://create-react-app.dev/' },
  { name: 'Angular CLI', url: 'https://angular.io/cli' },
  { name: 'Aurelia', url: 'https://aurelia.io/' },
  { name: 'SheetJS', url: 'https://sheetjs.com/' },
  { name: 'Storybook', url: 'https://storybook.js.org/' },
];

const SPONSORS = [
  {
    name: 'Docker',
    logo: '/img/sponsors/docker.png',
    url: 'https://hub.docker.com/r/verdaccio/verdaccio/tags/',
  },
  { name: 'Crowdin', logo: '/img/sponsors/crowdin.svg', url: 'https://crowdin.com' },
  {
    name: 'JetBrains',
    logo: '/img/sponsors/jetbrains.svg',
    mono: true,
    url: 'https://www.jetbrains.com',
  },
  {
    name: 'Anthropic',
    logo: '/img/sponsors/anthropic.svg',
    mono: true,
    url: 'https://www.anthropic.com',
  },
];

const Svg = ({ d }: { d: string }) => (
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
    <path d={d} />
  </svg>
);

const FEATURES = [
  {
    icon: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
    title: translate({ message: 'Private packages' }),
    text: translate({
      message:
        'Keep your code private and keep using npm the way you already do. Scoped, access-controlled, yours.',
    }),
  },
  {
    icon: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
    title: translate({ message: 'Link registries' }),
    text: translate({
      message:
        'Chain several registries and fetch everything from one endpoint. One URL in every .npmrc.',
    }),
  },
  {
    icon: 'M13 2 3 14h9l-1 8 10-12h-9z',
    title: translate({ message: 'Cache npmjs.org' }),
    text: translate({
      message:
        'Cut install latency in CI and keep limited failover when the public registry has a bad day.',
    }),
  },
  {
    icon: 'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
    title: translate({ message: 'Override public packages' }),
    text: translate({
      message:
        'Need a patched third-party dependency? Publish your fix under the same name, locally.',
    }),
  },
];

const HomePage = (): React.ReactElement => (
  <div className={styles.home}>
    {/* hero */}
    <section className={styles.hero}>
      <div className={clsx(styles.wrap, styles.heroGrid)}>
        <div>
          <div className={styles.pills}>
            <span className={styles.pill}>Open source · MIT</span>
            <span className={styles.pill}>Node.js</span>
            <span className={styles.pill}>No database required</span>
          </div>
          <h1 className={styles.title}>
            <Translate>Your private npm registry.</Translate>
            <em>
              <Translate>In one command.</Translate>
            </em>
          </h1>
          <p className={clsx(styles.lead, styles.heroLead)}>
            <Translate>
              Verdaccio is a lightweight private npm proxy registry. Publish private packages, cache
              the public ones, and chain registries behind a single endpoint.
            </Translate>
          </p>
          <CommandTabs
            tabs={[
              { label: 'pnpm', command: 'pnpm add --global verdaccio' },
              { label: 'npm', command: 'npm install --global verdaccio' },
              { label: 'Docker', command: 'docker run -it -p 4873:4873 verdaccio/verdaccio' },
              { label: 'Helm', command: 'helm install verdaccio verdaccio/verdaccio' },
            ]}
          />
          <div className={styles.ctas}>
            <Link to="/docs/what-is-verdaccio" className={clsx(styles.btn, styles.btnPrimary)}>
              <Translate>Get started</Translate> →
            </Link>
            <Link to="/talks" className={styles.btn}>
              ▸ <Translate>Watch talks</Translate>
            </Link>
            <a href="https://opencollective.com/verdaccio" className={styles.btn}>
              <Translate>Donate</Translate>
            </a>
            <GitHubStars />
          </div>
        </div>

        <div className={styles.flow} aria-label="How a request flows">
          <div className={clsx(styles.eyebrow, styles.flowLabel)}>How a request flows</div>
          <div className={styles.flowTeam}>
            <div className={styles.flowRow}>
              <strong>Your team</strong>
              <span className={styles.mono}>clients · CI</span>
            </div>
            <div className={clsx(styles.chips, styles.mono)}>
              {['pnpm', 'npm', 'yarn', 'CI runners'].map((c) => (
                <span key={c} className={styles.chip}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className={clsx(styles.flowArrow, styles.mono)}>GET /@acme/ui · GET /react</div>
          <div className={styles.flowCore}>
            <div className={styles.flowRow}>
              <strong>verdaccio</strong>
              <span className={clsx(styles.port, styles.mono)}>localhost:4873</span>
            </div>
            <div className={styles.flowCards}>
              <div className={styles.flowCard}>
                <small className={styles.mono}>PRIVATE</small>
                @acme/* served from storage
              </div>
              <div className={styles.flowCard}>
                <small className={styles.mono}>CACHE</small>
                public tarballs kept locally
              </div>
            </div>
          </div>
          <div className={clsx(styles.flowArrow, styles.mono)}>only on cache miss</div>
          <div className={styles.flowUplinks}>
            <strong>Uplinks</strong>
            <span className={styles.mono}>registry.npmjs.org + any registry</span>
          </div>
        </div>
      </div>
    </section>

    {/* cache + uplinks animation */}
    <section className={styles.flowBand}>
      <div className={styles.wrap}>
        <div className={styles.flowPanel}>
          <CacheFlow />
        </div>
      </div>
    </section>

    {/* used by */}
    <section className={styles.usedBy}>
      <div className={clsx(styles.wrap, styles.usedByRow)}>
        <span className={clsx(styles.eyebrow)} style={{ margin: 0 }}>
          Used by
        </span>
        {USED_BY.map((u) => (
          <a
            key={u.name}
            href={u.url}
            className={styles.usedByName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {u.name}
          </a>
        ))}
        <a
          className={styles.link}
          href="https://github.com/verdaccio/verdaccio?tab=readme-ov-file#who-is-using-verdaccio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Translate>and many more</Translate> →
        </a>
      </div>
    </section>

    {/* features */}
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <h2 className={styles.h2}>
            <Translate>A registry that stays out of your way.</Translate>
          </h2>
          <p className={styles.lead}>
            <Translate>
              No database to start: Verdaccio ships with its own small one. It proxies registries
              like npmjs.org, caches what you download, and plugs into storage such as Amazon S3 or
              Google Cloud Storage when you outgrow the disk.
            </Translate>
          </p>
        </div>
        <div className={styles.features}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.feature}>
              <div className={styles.featureTop}>
                <span className={styles.icon}>
                  <Svg d={f.icon} />
                </span>
                <span className={styles.mono}>0{i + 1}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 40 }}>
          <Link to="/docs/configuration" className={styles.link}>
            <Translate>Discover more features</Translate> →
          </Link>
        </p>
      </div>
    </section>

    {/* clients + config */}
    <section className={styles.section} style={{ paddingTop: 0 }}>
      <div className={clsx(styles.wrap, styles.clientGrid)}>
        <div>
          <div className={styles.eyebrow}>Bring your own client</div>
          <h2 className={styles.h2} style={{ marginBottom: 20 }}>
            <Translate>pnpm, npm, Yarn. One line to switch.</Translate>
          </h2>
          <p className={styles.lead} style={{ marginBottom: 24 }}>
            <Translate>
              Point your package manager at Verdaccio and keep every command you already know.
            </Translate>
          </p>
          <CommandTabs
            tabs={[
              { label: 'pnpm', command: 'pnpm config set registry http://localhost:4873/' },
              { label: 'npm', command: 'npm set registry http://localhost:4873/' },
              {
                label: 'yarn',
                command: 'yarn config set npmRegistryServer http://localhost:4873/',
              },
            ]}
          />
        </div>
        <div>
          <div className={styles.codeCard}>
            <div className={clsx(styles.codeHead, styles.mono)}>
              <span>config.yaml</span>
              <span>the whole server</span>
            </div>
            <pre className={clsx(styles.code, styles.mono)}>
              <span className={styles.k}>storage:</span> ./storage{'\n'}
              <span className={styles.k}>auth:</span>
              {'\n  '}
              <span className={styles.k}>htpasswd:</span>
              {'\n    '}
              <span className={styles.k}>file:</span> ./htpasswd{'\n'}
              <span className={styles.k}>uplinks:</span>
              {'\n  '}
              <span className={styles.k}>npmjs:</span>
              {'\n    '}
              <span className={styles.k}>url:</span>{' '}
              <span className={styles.v}>https://registry.npmjs.org/</span>
              {'\n'}
              <span className={styles.k}>packages:</span>
              {'\n  '}
              <span className={styles.v}>'@*/*':</span>
              {'\n    '}
              <span className={styles.k}>access:</span> $all{'\n    '}
              <span className={styles.k}>publish:</span> $authenticated{'\n    '}
              <span className={styles.k}>proxy:</span> npmjs{'\n  '}
              <span className={styles.v}>'**':</span>
              {'\n    '}
              <span className={styles.k}>access:</span> $all{'\n    '}
              <span className={styles.k}>proxy:</span> npmjs
            </pre>
          </div>
          <div className={styles.keyNotes}>
            <div>
              <b>storage</b> · where tarballs live
            </div>
            <div>
              <b>auth</b> · htpasswd or plugins
            </div>
            <div>
              <b>uplinks</b> · registries to proxy
            </div>
            <div>
              <b>packages</b> · who reads, who publishes
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* devops */}
    <section className={clsx(styles.section, styles.surface)}>
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>DevOps, made easy</div>
            <h2 className={styles.h2}>
              <Translate>Ship it where you ship everything else.</Translate>
            </h2>
          </div>
          <p className={styles.lead}>
            <Translate>
              An official Docker image and a Helm chart for Kubernetes, maintained alongside the
              core.
            </Translate>
          </p>
        </div>
        <div className={styles.devops}>
          <div className={styles.devCard}>
            <h3>
              <span className={styles.icon}>
                <Svg d="M3 10h18v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z M7 10V6h4v4" />
              </span>
              Docker
            </h3>
            <div className={clsx(styles.devCode, styles.mono)}>
              {
                '$ docker pull verdaccio/verdaccio\n$ docker run -it -p 4873:4873 verdaccio/verdaccio'
              }
            </div>
            <Link to="/docs/docker" className={styles.link}>
              Docker guide →
            </Link>
          </div>
          <div className={styles.devCard}>
            <h3>
              <span className={styles.icon}>
                <Svg d="M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 8v8" />
              </span>
              Kubernetes · Helm
            </h3>
            <div className={clsx(styles.devCode, styles.mono)}>
              {
                '$ helm repo add verdaccio https://charts.verdaccio.org\n$ helm install verdaccio/verdaccio'
              }
            </div>
            <Link to="/docs/kubernetes" className={styles.link}>
              Helm chart →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* sponsors */}
    <section className={styles.section}>
      <div className={clsx(styles.wrap, styles.sponsorsGrid)}>
        <div>
          <div className={clsx(styles.eyebrow, styles.eyebrowAccent)}>Community funded</div>
          <h2 className={styles.h2} style={{ marginBottom: 24 }}>
            <Translate>Kept alive by people and companies who depend on it.</Translate>
          </h2>
          <a href="https://opencollective.com/verdaccio" className={styles.btn}>
            <Translate>Become a sponsor</Translate>
          </a>
        </div>
        <div className={styles.sponsorCells}>
          {SPONSORS.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
              <img
                src={useBaseUrl(s.logo)}
                alt=""
                loading="lazy"
                className={clsx(styles.sponsorLogo, s.mono && styles.sponsorLogoMono)}
              />
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* final CTA */}
    <section style={{ paddingBottom: 96 }}>
      <div className={styles.wrap}>
        <div className={styles.cta}>
          <h2>
            <Translate>Your own registry, running before your coffee cools.</Translate>
          </h2>
          <div>
            <div className={clsx(styles.ctaBox, styles.mono)}>
              <span>$ pnpm dlx verdaccio</span>
            </div>
            <Link to="/docs/what-is-verdaccio" className={styles.ctaLink}>
              Read the getting-started guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
