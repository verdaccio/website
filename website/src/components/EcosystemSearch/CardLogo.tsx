import Logo from '../Logo';

import * as React from 'react';
import { FC } from 'react';

const CardLogo: FC<{ origin: string }> = ({ origin }): React.ReactElement => {
  // Show Verdaccio logo for core plugins
  return origin === 'core' ? <Logo /> : <></>;
};

export default CardLogo;
