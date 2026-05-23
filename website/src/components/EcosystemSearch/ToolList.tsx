import Translate, { translate } from '@docusaurus/Translate';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Orama, ProvidedTypes, create, insertMultiple, search } from '@orama/orama';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';

import AddonCard from './AddonCard';
import { Addon, Filters } from './types';

type Props = {
  addons: Addon[];
  filters: Filters;
};

const normalizeResults = (hits) => {
  return hits.reduce((acc, item) => {
    acc.push(item.document);
    return acc;
  }, []);
};

const filterByProperty = (addsOns: Addon[], filters: Filters): Addon[] => {
  return addsOns.filter((item) => {
    // Check origin filter - item must match at least one selected origin
    const originMatch =
      (item.origin === 'core' && filters.core) ||
      (item.origin === 'community' && filters.community);

    if (!originMatch) {
      return false;
    }

    // Check category filter - item's category must be selected
    const categoryMatch = filters[item.category] === true;

    if (!categoryMatch) {
      return false;
    }

    // Check bundled filter - if enabled, only show bundled items; if disabled, show all
    if (filters.bundled && !item.bundled) {
      return false;
    }

    // Hide packages with known CVEs when the toggle is on
    if (filters.excludeVulnerable && (item.vulnerabilities?.count ?? 0) > 0) {
      return false;
    }

    // Show only packages with known CVEs when that toggle is on
    if (filters.onlyVulnerable && (item.vulnerabilities?.count ?? 0) === 0) {
      return false;
    }

    // Hide packages without a declared source code repository when the toggle is on
    if (filters.hideNoSource && !item.repository) {
      return false;
    }

    return true;
  });
};

const ToolList: FC<Props> = ({ addons = [], filters }): React.ReactElement => {
  const theme = useTheme();
  const [db, setDb] = useState<Orama<ProvidedTypes>>();
  const [filteredAddsOn, setFilteredAddsOn] = useState(addons);
  useEffect(() => {
    const createDb = async () => {
      const db = await create({
        schema: {
          name: 'string',
          url: 'string',
          category: 'string',
          bundled: 'boolean',
          origin: 'string',
          latest: 'string',
          downloads: 'number',
          description: 'string',
        },
      });
      setDb(db);
      insertMultiple(db as Orama<ProvidedTypes>, addons);
    };

    createDb();
  }, []);

  useEffect(() => {
    const searchKeyword = async () => {
      let results: Addon[] = addons;
      if (filters.keyword !== '' && db) {
        const dbResults = await search(db as Orama<ProvidedTypes>, {
          term: filters.keyword,
        });
        results = [...normalizeResults(dbResults.hits)];
      }
      // Apply advanced filters (origin, category, bundled)
      const filteredResults = filterByProperty(results, filters);
      // Demote packages without a repository link to the end, then sort by monthly downloads
      filteredResults.sort((a, b) => {
        const aHasRepo = !!a.repository;
        const bHasRepo = !!b.repository;
        if (aHasRepo !== bHasRepo) return aHasRepo ? -1 : 1;
        return (b.downloads ?? 0) - (a.downloads ?? 0);
      });
      setFilteredAddsOn(filteredResults);
    };
    if (db || filters.keyword === '') {
      searchKeyword();
    }
  }, [filters, addons, db]);

  return (
    <div>
      <Typography
        fontSize="lg"
        fontWeight="lg"
        sx={{ marginTop: theme.spacing(1), marginBottom: theme.spacing(1) }}
      >
        <Translate>Total results:</Translate> {filteredAddsOn.length}
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 3, xl: 3 }}>
        {filteredAddsOn.map((item) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }} key={item.name}>
              <AddonCard {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ToolList;
