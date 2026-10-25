import { releases } from '@verdaccio/local-scripts';

import styles from './Home.module.scss';

import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';

// fixed locale and time zone, so the server render and the browser print the same date
const formatDate = (iso: string | null): string | null =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : null;

const RELEASE_POST = '/blog/2026/10/25/verdaccio-7-release';

const majorOf = (version: string): string => `${version.split('.')[0]}.x`;

// The latest stable release, from npm. The data is refreshed before every website build.
const LatestRelease = ({ className }: { className?: string }): React.ReactElement | null => {
  const stable = releases.releases.find((r) => r.channel === 'stable');
  if (!stable) {
    return null;
  }
  const date = formatDate(stable.publishedAt);
  const stableMajor = Number(stable.version.split('.')[0]);
  const upcoming = releases.releases
    .filter(
      (release) =>
        release.channel !== 'stable' &&
        release.version.includes('-') &&
        Number(release.version.split('.')[0]) > stableMajor
    )
    .sort((a, b) => Number(a.version.split('.')[0]) - Number(b.version.split('.')[0]))[0];

  return (
    <div className={clsx(styles.releaseGroup, className)}>
      <Link className={styles.latest} to={stableMajor === 7 ? RELEASE_POST : stable.url}>
        <span className={styles.latestTag}>
          <span className={styles.latestDot} aria-hidden="true" />
          Latest release
        </span>
        <span className={styles.latestVersion}>
          <span className={styles.latestMajor}>{majorOf(stable.version)}</span>
          <strong>v{stable.version}</strong>
        </span>
        {date && <span className={styles.latestDate}>{date}</span>}
        <span className={styles.latestCta}>
          {stableMajor === 7 ? 'Discover Verdaccio 7 →' : 'Release notes →'}
        </span>
      </Link>
      {upcoming && (
        <Link
          className={styles.upcomingRelease}
          to={majorOf(upcoming.version) === '7.x' ? RELEASE_POST : upcoming.url}
        >
          <span className={styles.upcomingTag}>Prerelease</span>
          <span>
            Try what's next: <strong>v{upcoming.version}</strong>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
};

export default LatestRelease;
