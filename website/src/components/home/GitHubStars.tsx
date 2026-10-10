import styles from './Home.module.scss';

import React from 'react';

// The same GitHub star button the previous landing page used (served by ghbtns.com).
const GitHubStars = (): React.ReactElement => (
  <iframe
    className={styles.starsFrame}
    src="https://ghbtns.com/github-btn.html?user=verdaccio&repo=verdaccio&type=star&count=true&size=large"
    title="Star Verdaccio on GitHub"
    width="160"
    height="30"
    scrolling="no"
    loading="lazy"
  />
);

export default GitHubStars;
