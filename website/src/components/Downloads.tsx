import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import React from 'react';

import DockerPullChart from './Chart/DockerPullChart';
import DockerTotalPull from './Chart/DockerTotalPull';
import MajorVersionsStackedChart from './Chart/MajorVersionsStackedChart';
import NpmjsMonthlyDownloadsChart from './Chart/MonhtlyNpmjsDownloadsChart';
import NpmjsVersionsChart from './Chart/NpmjsVersionsChart';
import VersionComparisonTable from './Chart/VersionComparisonTable';
import VersionDownloadsChart from './Chart/VersionDownloadsChart';
import NpmjsYearlyDownloadsChart from './Chart/YearlyNpmjsDownloadsChart';
import styles from './Downloads.module.scss';

const Downloads: React.FC<{}> = (): React.ReactElement => {
  return (
    <Layout title="Downloads" description="Verdaccio Downloads">
      <div className={styles.downloadsPage}>
        <header className={styles.header}>
          <h1>
            <Translate>Download Metrics</Translate>
          </h1>
          <p>
            <Translate>
              Track Verdaccio adoption and usage across npm and Docker. This page shows weekly and
              monthly download trends, version-by-version breakdowns for the 5.x and 6.x release
              lines, a side-by-side comparison of their popularity and growth over the last six
              months, aggregated downloads by major version, pre-release adoption for upcoming
              releases, and Docker Hub pull statistics. All data is updated periodically from the
              npm registry and Docker Hub APIs.
            </Translate>
          </p>
        </header>

        <h2 className={styles.sectionTitle}>
          <Translate>npm Downloads</Translate>
        </h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <VersionDownloadsChart />
          </div>
          <div className={styles.card}>
            <NpmjsYearlyDownloadsChart />
          </div>
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <NpmjsMonthlyDownloadsChart />
          </div>
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <NpmjsVersionsChart majorFilter="v5" />
          </div>
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <NpmjsVersionsChart majorFilter="v6" />
          </div>
          {/* <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <NpmjsVersionsChart majorFilter="latest" />
          </div> */}
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <VersionComparisonTable />
          </div>
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <MajorVersionsStackedChart />
          </div>
          <div className={`${styles.card} ${styles.cardFullWidth}`}>
            <NpmjsVersionsChart prerelease />
          </div>
        </div>

        <h2 className={styles.sectionTitle}>
          <Translate>Docker Pulls</Translate>
        </h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <DockerPullChart />
          </div>
          <div className={styles.card}>
            <DockerTotalPull />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Downloads;
