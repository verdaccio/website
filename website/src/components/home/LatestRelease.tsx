import { releases } from '@verdaccio/local-scripts';

import styles from './Home.module.scss';

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

const majorOf = (version: string): string => `${version.split('.')[0]}.x`;

// The latest stable release, from npm. The data is refreshed by the weekly `static data` workflow.
const LatestRelease = ({ className }: { className?: string }): React.ReactElement | null => {
  const stable = releases.releases.find((r) => r.channel === 'stable');
  if (!stable) {
    return null;
  }
  const date = formatDate(stable.publishedAt);

  return (
    <a
      className={clsx(styles.latest, className)}
      href={stable.url}
      target="_blank"
      rel="noopener noreferrer"
      title="Release notes on GitHub"
    >
      <span className={styles.latestTag}>
        <span className={styles.latestDot} aria-hidden="true" />
        Latest release
      </span>
      <span className={styles.latestVersion}>
        <span className={styles.latestMajor}>{majorOf(stable.version)}</span>
        <strong>v{stable.version}</strong>
      </span>
      {date && <span className={styles.latestDate}>{date}</span>}
      <span className={styles.latestCta}>Release notes →</span>
    </a>
  );
};

export default LatestRelease;
