import styles from './styles.module.scss';

import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';
import clsx from 'clsx';
import React from 'react';

const LostPackage = (): React.ReactElement => (
  <svg className={styles.scene} viewBox="30 50 300 210" aria-hidden="true">
    <path className={styles.ground} d="M40 246 H320" />
    <g className={styles.tumbleweed}>
      <g className={styles.spin}>
        <circle cx="0" cy="0" r="18" />
        <path d="M-16 -6 C-4 -18 10 -14 16 4 M-12 10 C-2 -4 8 2 14 -10 M-6 16 C-10 0 2 -12 6 -17 M-17 2 C-2 8 6 14 12 12" />
      </g>
    </g>
    <ellipse className={styles.shadow} cx="180" cy="248" rx="62" ry="7" />
    <g className={styles.character}>
      <g className={styles.question}>
        <text x="262" y="96" className={styles.mark}>
          ?
        </text>
      </g>
      <path
        className={styles.drop}
        d="M248 140 C252 148 256 152 256 157 A6 6 0 0 1 244 157 C244 152 246 148 248 140 Z"
      />
      <ellipse className={styles.foot} cx="152" cy="240" rx="14" ry="6" />
      <ellipse className={styles.foot} cx="208" cy="240" rx="14" ry="6" />
      <g className={styles.body}>
        <path
          className={clsx(styles.flap, styles.flapLeft)}
          d="M120 130 L96 108 L150 108 L170 130 Z"
        />
        <path
          className={clsx(styles.flap, styles.flapRight)}
          d="M240 130 L264 108 L210 108 L190 130 Z"
        />
        <rect className={styles.face} x="120" y="130" width="120" height="104" rx="6" />
        <path className={styles.tape} d="M180 130 V160" />
        <g className={styles.eyes}>
          <circle className={styles.eyeWhite} cx="158" cy="176" r="15" />
          <circle className={styles.eyeWhite} cx="202" cy="176" r="15" />
          <g className={styles.pupils}>
            <circle className={styles.pupil} cx="158" cy="178" r="7" />
            <circle className={styles.pupil} cx="202" cy="178" r="7" />
            <circle className={styles.glint} cx="161" cy="175" r="2.2" />
            <circle className={styles.glint} cx="205" cy="175" r="2.2" />
          </g>
        </g>
        <ellipse className={styles.cheek} cx="138" cy="200" rx="8" ry="5" />
        <ellipse className={styles.cheek} cx="222" cy="200" rx="8" ry="5" />
        <ellipse className={styles.mouth} cx="180" cy="208" rx="7" ry="9" />
      </g>
    </g>
  </svg>
);

export default function NotFoundContent({ className }: { className?: string }): React.ReactElement {
  const { pathname } = useLocation();
  const spec = pathname.replace(/^\/+|\/+$/g, '') || 'page';

  return (
    <main className={clsx('container margin-vert--lg', styles.wrap, className)}>
      <div className={styles.art}>
        <LostPackage />
      </div>
      <div className={styles.content}>
        <Heading as="h1" className={styles.title}>
          <Translate id="theme.NotFound.title" description="The title of the 404 page">
            Package not found
          </Translate>
        </Heading>
        <code className={styles.npm}>
          <span className={styles.err}>npm error 404</span> &apos;{spec}@*&apos; is not in this
          registry.
        </code>
        <p className={styles.text}>
          <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
            We opened the box and it was empty. This page was never published, or it moved.
          </Translate>
        </p>
        <Link className={clsx('button button--primary button--lg', styles.home)} to="/">
          <Translate
            id="theme.NotFound.home"
            description="Link back to the home page on the 404 page"
          >
            Back to the home page
          </Translate>
        </Link>
        <section className={styles.cache}>
          <Heading as="h2" className={styles.cacheTitle}>
            <Translate
              id="theme.NotFound.cache.title"
              description="Title of the install hint on the 404 page"
            >
              Didn't find what you were looking for?
            </Translate>
          </Heading>
          <p className={styles.text}>
            <Translate
              id="theme.NotFound.cache.text"
              description="Install hint on the 404 page"
              values={{
                link: (
                  <Link to="/docs/caching">
                    <Translate id="theme.NotFound.cache.link">cached</Translate>
                  </Link>
                ),
              }}
            >
              {'Maybe it just was not {link} yet. Run your own Verdaccio and next time it will be:'}
            </Translate>
          </p>
          <Tabs className={styles.tabs} groupId="package-manager">
            <TabItem value="pnpm" label="pnpm" default>
              <CodeBlock language="bash">{'pnpm add -g verdaccio\nverdaccio'}</CodeBlock>
            </TabItem>
            <TabItem value="npm" label="npm">
              <CodeBlock language="bash">{'npm install -g verdaccio\nverdaccio'}</CodeBlock>
            </TabItem>
            <TabItem value="docker" label="Docker">
              <CodeBlock language="bash">
                {'docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio'}
              </CodeBlock>
            </TabItem>
          </Tabs>
        </section>
      </div>
    </main>
  );
}
