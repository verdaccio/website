import data from './addons.json';
import FilterControl from './FilterControl';
import ToolList from './ToolList';
import { Filters } from './types';

import React from 'react';
import { useState } from 'react';

const EcosystemSearch = (): React.ReactElement => {
  const { addons, categories, origin } = data as any;

  const [filters, setFilters] = useState<Filters>({
    bundled: false,
    excludeVulnerable: false,
    onlyVulnerable: false,
    hideNoSource: false,
    core: true,
    community: true,
    middleware: true,
    storage: true,
    tool: true,
    ui: true,
    authentication: true,
    filter: true,
    keyword: '',
  });

  return (
    <>
      <FilterControl
        categories={categories}
        origins={origin}
        filters={filters}
        onChange={setFilters}
      />
      <ToolList addons={addons} filters={filters} />
    </>
  );
};

export default EcosystemSearch;
