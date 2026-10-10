import CacheFlow from './CacheFlow';
import CodeCard from './CodeCard';
import CommandTabs from './CommandTabs';
import GitHubStars from './GitHubStars';
import styles from './Home.module.scss';
import LatestRelease from './LatestRelease';
import Plugins from './Plugins';
import WebUi from './WebUi';

import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React from 'react';

const USED_BY = [
  { name: 'nx', logo: '/img/users/nx.svg', url: 'https://nx.dev' },
  { name: 'pnpm', logo: '/img/users/pnpm.svg', url: 'https://pnpm.io' },
  { name: 'Vendure', logo: '/img/users/vendure.png', url: 'https://www.vendure.io/' },
  {
    name: 'create-react-app',
    logo: '/img/users/create-react-app.svg',
    url: 'https://create-react-app.dev/',
  },
  { name: 'Angular CLI', logo: '/img/users/angular.svg', url: 'https://angular.io/cli' },
  { name: 'SheetJS', logo: '/img/sponsors/sheetjs.png', url: 'https://sheetjs.com/' },
  { name: 'Storybook', logo: '/img/users/storybook.svg', url: 'https://storybook.js.org/' },
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

const Check = () => (
  <svg
    className={styles.ossCheck}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
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
            <a className={clsx(styles.pill, styles.pillOss)} href="#open-source">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Open source · MIT
            </a>
            <a className={styles.pill} href="#node-api">
              Node.js
            </a>
            <a className={styles.pill} href="#features">
              No database required
            </a>
            <a className={styles.pill} href="#web-interface">
              Web UI included
            </a>
          </div>
          <h1 className={styles.title}>
            <Translate>Your private npm registry.</Translate>
            <em>
              <Translate>In one command.</Translate>
            </em>
          </h1>
          <p className={clsx(styles.lead, styles.heroLead)}>
            <Translate>
              Verdaccio is a lightweight private npm proxy registry. Built for local development,
              ready to run as the hosted registry your whole team shares.
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
          <LatestRelease className={styles.latestInline} />
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
          <LatestRelease className={styles.latestSide} />
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
            <img src={useBaseUrl(u.logo)} alt="" loading="lazy" className={styles.usedByLogo} />
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

    {/* local first, registry ready */}
    <section className={styles.section} id="local-and-registry">
      <div className={styles.wrap}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Two ways to run it</div>
            <h2 className={styles.h2}>
              <Translate>Built for local development. Ready to host as your registry.</Translate>
            </h2>
          </div>
          <p className={styles.lead}>
            <Translate>
              Most people start on their own machine: test a publish, reproduce a CI run, try a
              package manager. When you need to share it, the same configuration runs as a hosted
              registry for your team.
            </Translate>
          </p>
        </div>
        <div className={styles.modes}>
          <div className={clsx(styles.mode, styles.modeLocal)}>
            <div className={styles.modeTag}>
              <span className={clsx(styles.mono, styles.modeBadge)}>START HERE</span>
            </div>
            <h3>
              <Translate>Local development</Translate>
            </h3>
            <ul className={styles.modeList}>
              <li>Test publishes and installs before they reach a real registry</li>
              <li>Run end-to-end tests against real package managers</li>
              <li>Zero config, no database, one command to start</li>
              <li>Cached packages install without touching the network</li>
            </ul>
            <div className={clsx(styles.devCode, styles.mono)}>
              {'$ pnpm dlx verdaccio\n→ http://localhost:4873'}
            </div>
            <Link to="/docs/e2e" className={styles.link}>
              Testing with Verdaccio →
            </Link>
          </div>

          <div className={clsx(styles.modeJoin, styles.mono)} aria-hidden="true">
            <span>same config.yaml</span>
          </div>

          <div className={clsx(styles.mode, styles.modeRegistry)}>
            <div className={styles.modeTag}>
              <span className={clsx(styles.mono, styles.modeBadge)}>HOSTED</span>
            </div>
            <h3>
              <Translate>Hosted registry</Translate>
            </h3>
            <ul className={styles.modeList}>
              <li>Host it on your own server, with one URL for your team and CI runners</li>
              <li>Authentication with htpasswd or your own plugin</li>
              <li>Storage on Amazon S3, Google Cloud Storage or a plugin of your own</li>
              <li>Run it anywhere: official Docker image and Helm chart for Kubernetes</li>
            </ul>
            <div className={clsx(styles.devCode, styles.mono)}>
              {'$ docker run -it -p 4873:4873 \\\n    verdaccio/verdaccio'}
            </div>
            <Link to="/docs/docker" className={styles.link}>
              Run it with Docker →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* features */}
    <section className={styles.section} id="features">
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

    <WebUi />

    {/* open source */}
    <section className={clsx(styles.section, styles.surface)} id="open-source">
      <div className={clsx(styles.wrap, styles.ossGrid)}>
        <div>
          <div className={styles.eyebrow}>Open source</div>
          <h2 className={styles.h2} style={{ marginBottom: 20 }}>
            <Translate>Free, MIT licensed and built in the open.</Translate>
          </h2>
          <p className={styles.lead} style={{ marginBottom: 28 }}>
            <Translate>
              Verdaccio is open source software. Read the code, run it anywhere, fork it, fix it.
              Everything happens in public on GitHub: the registry, its plugins, the Docker image
              and this website.
            </Translate>
          </p>
          <div className={styles.ctas} style={{ marginTop: 0 }}>
            <a
              href="https://github.com/verdaccio/verdaccio"
              className={clsx(styles.btn, styles.btnPrimary)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate>View the source</Translate> →
            </a>
            <GitHubStars />
            <Link to="/community/contributing" className={styles.btn}>
              <Translate>Contribute</Translate>
            </Link>
          </div>
        </div>
        <div className={styles.ossCard}>
          <div className={clsx(styles.codeHead, styles.mono)}>
            <span>LICENSE</span>
            <span>MIT</span>
          </div>
          <ul className={styles.ossList}>
            <li>
              <Check />
              <span>
                <b>MIT licensed.</b> Use it at work and in commercial projects.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Public source.</b> Registry, plugins, Docker image and docs live on GitHub.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Built by contributors.</b> Issues, pull requests and plugins are welcome from
                anyone. <Link to="/contributors">Meet the contributors</Link>.
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Community supported.</b> Sponsors share the tools and services that keep it
                running. <a href="https://opencollective.com/verdaccio">Become a sponsor</a>.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    {/* clients + config */}
    <section className={styles.section}>
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
          <CodeCard
            tabs={[
              {
                label: 'config.yaml',
                lang: 'yaml',
                note: 'the whole server',
                code: `storage: ./storage
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    proxy: npmjs`,
              },
              {
                label: 'ConfigBuilder',
                lang: 'ts',
                note: 'the same, in code',
                code: `import { ConfigBuilder } from '@verdaccio/config';

const config = ConfigBuilder.build()
  .addStorage('./storage')
  .addAuth({ htpasswd: { file: './htpasswd' } })
  .addUplink('npmjs', { url: 'https://registry.npmjs.org/' })
  .addPackageAccess('@*/*', {
    access: '$all',
    publish: '$authenticated',
    proxy: 'npmjs',
  })
  .addPackageAccess('**', { access: '$all', proxy: 'npmjs' })
  .getConfig(); // or .getAsYaml()`,
              },
            ]}
          />
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

    <Plugins />

    {/* run it from code */}
    <section className={clsx(styles.section, styles.surface)} id="node-api">
      <div className={clsx(styles.wrap, styles.clientGrid)}>
        <div>
          <div className={styles.eyebrow}>Node API</div>
          <h2 className={styles.h2} style={{ marginBottom: 20 }}>
            <Translate>Run Verdaccio from your own code.</Translate>
          </h2>
          <p className={styles.lead} style={{ marginBottom: 24 }}>
            <Translate>
              Start a registry without the command line. runServer hands you a Node server that is
              not listening yet, so you choose the port and when to stop it. Ideal for end-to-end
              tests, embedded registries and tooling.
            </Translate>
          </p>
          <ul className={styles.modeList}>
            <li>Typed configuration with ConfigBuilder, no YAML to keep in sync</li>
            <li>A fresh storage per run, so nothing leaks between tests</li>
            <li>Works with the same config you would use in production</li>
          </ul>
          <div className={styles.ctas} style={{ marginTop: 8 }}>
            <Link to="/dev/node-api" className={clsx(styles.btn, styles.btnPrimary)}>
              <Translate>Node API docs</Translate> →
            </Link>
            <Link to="/docs/e2e" className={styles.btn}>
              <Translate>Testing with Verdaccio</Translate>
            </Link>
          </div>
        </div>
        <CodeCard
          tabs={[
            {
              label: 'run.mjs',
              lang: 'ts',
              note: 'runServer',
              code: `import { runServer } from 'verdaccio';
import { ConfigBuilder } from '@verdaccio/config';

const config = ConfigBuilder.build()
  .addStorage('./storage')
  .addAuth({ htpasswd: { file: './htpasswd' } })
  .addUplink('npmjs', { url: 'https://registry.npmjs.org/' })
  .addPackageAccess('**', { access: '$all', proxy: 'npmjs' })
  .getConfig();

const app = await runServer(config);
const server = app.listen(4873); // you pick the port
// ...publish, install, assert...
server.close(); // and when to stop`,
            },
          ]}
        />
      </div>
    </section>

    {/* devops */}
    <section className={styles.section}>
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
        <div className={styles.devExamples}>
          <span className={styles.icon}>
            <Svg d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </span>
          <div>
            <strong>
              <Translate>Looking for a setup that already works?</Translate>
            </strong>
            <p>
              <Translate>
                The Verdaccio repository has runnable examples, including a local storage volume,
                nginx and Apache reverse proxies, S3 storage and GitHub OAuth.
              </Translate>
            </p>
          </div>
          <a
            href="https://github.com/verdaccio/verdaccio/tree/master/docker-examples"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Browse docker-examples →
          </a>
        </div>
      </div>
    </section>

    {/* sponsors */}
    <section className={styles.section}>
      <div className={clsx(styles.wrap, styles.sponsorsGrid)}>
        <div>
          <div className={clsx(styles.eyebrow, styles.eyebrowAccent)}>Community supported</div>
          <h2 className={styles.h2} style={{ marginBottom: 20 }}>
            <Translate>Powered by people and companies who share what they have.</Translate>
          </h2>
          <p className={styles.lead} style={{ marginBottom: 24 }}>
            <Translate>
              Our sponsors provide the tools and free services that keep Verdaccio running, and
              contributors give their time. Want to be part of it?
            </Translate>
          </p>
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
            <Translate>Your own registry is one command away.</Translate>
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
