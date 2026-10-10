import AddonCard from './AddonCard';
import styles from './Ecosystem.module.scss';
import { Addon, Filters } from './types';

import Translate from '@docusaurus/Translate';
import { Orama, ProvidedTypes, create, insertMultiple, search } from '@orama/orama';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react';

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
      <div className={styles.total}>
        <Translate>Total results:</Translate> {filteredAddsOn.length}
      </div>
      <div className={styles.grid}>
        {filteredAddsOn.map((item) => (
          <AddonCard key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ToolList;
