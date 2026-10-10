import UiIcon from '../ui/Icons';

import * as React from 'react';
import { FC } from 'react';

const Icon: FC<{ category: string }> = ({ category }): React.ReactElement => {
  switch (category) {
    case 'middleware':
      return <UiIcon name="route" title="Middleware Plugin" />;
    case 'storage':
      return <UiIcon name="database" title="Storage Plugin" />;
    case 'tool':
      return <UiIcon name="wrench" title="Tool" />;
    case 'filter':
      return <UiIcon name="filter" title="Filter Plugin" />;
    case 'authentication':
      return <UiIcon name="shield" title="Authentication Plugin" />;
    case 'ui':
      return <UiIcon name="palette" title="UI Theme" />;
    default:
      return <UiIcon name="hub" />;
  }
};

export default Icon;
