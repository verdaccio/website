import styles from './Header.module.scss';

import useBaseUrl from '@docusaurus/useBaseUrl';
import * as React from 'react';
import { FC } from 'react';

const Logo: FC = (): React.ReactElement => {
  return (
    <img
      className={styles['header--imageLogo']}
      src={useBaseUrl('/img/logo/uk/verdaccio-tiny-uk-no-bg.svg')}
      alt="Verdaccio Logo"
    />
  );
};

export default Logo;
