import CurrentVersionShareChart from './Chart/CurrentVersionShareChart';
import DockerPullChart from './Chart/DockerPullChart';
import DockerTotalPull from './Chart/DockerTotalPull';
import EcosystemShareChart from './Chart/EcosystemShareChart';
import MigrationShareChart from './Chart/MigrationShareChart';
import NpmjsMonthlyDownloadsChart from './Chart/MonhtlyNpmjsDownloadsChart';
import TimeToAdoptionChart from './Chart/TimeToAdoptionChart';
import TotalDownloadsHero from './Chart/TotalDownloadsHero';
import VersionDownloadsChart from './Chart/VersionDownloadsChart';
import styles from './Downloads.module.scss';

import Translate from '@docusaurus/Translate';
import React from 'react';

const DownloadsContent: React.FC<{}> = (): React.ReactElement => {
  return (
    <div className={styles.downloadsPage}>
      <TotalDownloadsHero />

      <h2 className={styles.sectionTitle}>
        <Translate>Downloads &amp; Pulls</Translate>
      </h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <NpmjsMonthlyDownloadsChart />
        </div>
        <div className={styles.card}>
          <VersionDownloadsChart />
        </div>
        <div className={styles.card}>
          <DockerPullChart />
        </div>
        <div className={styles.card}>
          <DockerTotalPull />
        </div>
      </div>

      <h2 className={styles.sectionTitle}>
        <Translate>Version Transition</Translate>
      </h2>
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.cardFullWidth}`}>
          <MigrationShareChart />
        </div>
        <div className={`${styles.card} ${styles.cardFullWidth}`}>
          <CurrentVersionShareChart />
        </div>
        <div className={`${styles.card} ${styles.cardFullWidth}`}>
          <TimeToAdoptionChart />
        </div>
      </div>

      <h2 className={styles.sectionTitle}>
        <Translate>Ecosystem Packages</Translate>
      </h2>
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.cardFullWidth}`}>
          <EcosystemShareChart />
        </div>
      </div>
    </div>
  );
};

export default DownloadsContent;
