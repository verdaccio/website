import HomePage from '../components/home/HomePage';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import React from 'react';

const Home = (): React.ReactElement => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description={siteConfig.customFields.description as string}>
      <HomePage />
    </Layout>
  );
};

export default Home;
