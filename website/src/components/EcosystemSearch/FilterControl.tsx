import Dialog from '../ui/Dialog';
import UiIcon from '../ui/Icons';
import ui from '../ui/Ui.module.scss';
import styles from './Ecosystem.module.scss';
import { Category, Filters, Origin } from './types';

import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import React, { ReactElement, useState } from 'react';
import { FC } from 'react';

type Props = {
  categories: Category[];
  origins: Origin[];
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const ADDONS_FILE_PATH = 'website/src/components/EcosystemSearch/addons.json';
const ADDONS_FILE_EDIT_URL = `https://github.com/verdaccio/website/edit/master/${ADDONS_FILE_PATH}`;
const ADDON_ISSUE_URL = 'https://github.com/verdaccio/website/issues/new?template=addon.yml';
const ADDON_ENTRY_EXAMPLE = `{
  "name": "verdaccio-example-plugin",
  "category": "authentication",
  "origin": "community",
  "bundled": false
}`;

const FilterControl: FC<Props> = ({ categories, origins, filters, onChange }): ReactElement => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleOnChange = (event) => {
    const { name } = event.target;
    let _filters = { ...filters };
    const validation = [
      ...origins,
      ...categories,
      'bundled',
      'excludeVulnerable',
      'onlyVulnerable',
      'hideNoSource',
      'keyword',
    ];
    if (!validation.includes(name)) {
      return;
    }
    if (name !== 'keyword') {
      _filters = { ..._filters, [name]: event.target.checked };
      // excludeVulnerable and onlyVulnerable are mutually exclusive
      if (name === 'excludeVulnerable' && event.target.checked) {
        _filters.onlyVulnerable = false;
      } else if (name === 'onlyVulnerable' && event.target.checked) {
        _filters.excludeVulnerable = false;
      }
    } else {
      _filters = { ..._filters, keyword: event.target.value };
    }

    onChange(_filters);
  };

  const option = (name: string, label: string) => (
    <label key={name} className={styles.check}>
      <input type="checkbox" name={name} checked={!!filters[name]} onChange={handleOnChange} />
      {label}
    </label>
  );

  return (
    <section className={styles.filters}>
      <div className={styles.filtersHead}>
        <h2>
          <Translate>Search for Plugins and Tools</Translate>
        </h2>
        <button type="button" className={ui.btn} onClick={() => setInfoOpen(true)}>
          <UiIcon name="info" size={16} />
          <Translate>Don't see your plugin? Submit it</Translate>
        </button>
      </div>

      <Dialog
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        titleId="add-addon-title"
        title={<Translate>How to add a new addon</Translate>}
        actions={
          <>
            <button type="button" className={ui.btn} onClick={() => setInfoOpen(false)}>
              <Translate>Close</Translate>
            </button>
            <a
              className={ui.btn}
              href={ADDONS_FILE_EDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate>Edit addons.json (PR)</Translate>
              <UiIcon name="external" size={14} />
            </a>
            <a
              className={clsx(ui.btn, ui.btnPrimary)}
              href={ADDON_ISSUE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate>Submit an addon (issue)</Translate>
              <UiIcon name="external" size={14} />
            </a>
          </>
        }
      >
        <p className={styles.dialogText}>
          <Translate>
            The list is hand-curated — packages are NOT auto-discovered from npm keywords. The
            easiest way to propose a new plugin or tool is to file a "Suggest a new addon" issue
            using the template below; a maintainer will review and add it. Power users can skip the
            issue and open a PR directly against the JSON file. Once merged, the next scheduled run
            of the update script fills in the live metadata (downloads, version, license,
            vulnerabilities, etc.).
          </Translate>
        </p>
        <h3 className={styles.dialogSub}>
          <Translate>File to edit</Translate>
        </h3>
        <code className={styles.codeBlock}>{ADDONS_FILE_PATH}</code>
        <h3 className={styles.dialogSub}>
          <Translate>Example entry to append to the `addons` array</Translate>
        </h3>
        <pre className={styles.codeBlock}>{ADDON_ENTRY_EXAMPLE}</pre>
        <span className={styles.small}>
          <Translate>
            Only `name`, `category`, and `origin` are required. `bundled` defaults to false. The
            script fills in url, registry, description, latest, downloads, modified, repository,
            license, hasTypes, and vulnerabilities on the next run.
          </Translate>
        </span>
        <h3 className={styles.dialogSub}>
          <Translate>Eligibility rules</Translate>
        </h3>
        <ul className={styles.rules}>
          <li>
            <Translate>
              Published on the public npm registry at npmjs.org (private or scoped-private packages
              are not eligible; unpublished packages are dropped after 30 days).
            </Translate>
          </li>
          <li>
            <Translate>
              Declares a `repository` URL in `package.json` (packages without one are dropped after
              90 days).
            </Translate>
          </li>
          <li>
            <Translate>
              Fits one of the categories: middleware, authentication, filter, storage, ui, tool.
            </Translate>
          </li>
          <li>
            <Translate>
              Community packages should declare a `license` field in package.json — preferably an
              OSI-approved SPDX identifier. Packages without one are still listed but flagged as "No
              license provided" on the card.
            </Translate>
          </li>
          <li>
            <Translate>
              Actively maintained: a new version published within the last 12 months, and the
              repository accepting issues / pull requests (not archived).
            </Translate>
          </li>
          <li>
            <Translate>
              HIGH or CRITICAL CVEs (per OSV.dev) are flagged on the card; if left unfixed for more
              than 12 months the package is dropped from the list. MODERATE/LOW advisories are
              allowed and only flagged.
            </Translate>
          </li>
          <li>
            <Translate>"Core" is reserved for packages maintained by the Verdaccio team.</Translate>
          </li>
        </ul>
        <span className={styles.small}>
          <Translate>
            Metadata (downloads, version, vulnerabilities) is refreshed periodically from npm and
            OSV.
          </Translate>
        </span>
      </Dialog>

      <div className={ui.callout}>
        <UiIcon name="info" size={18} />
        <span>
          <Translate>
            Items qualified as core are maintained actively by the verdaccio team
          </Translate>
        </span>
      </div>

      <input
        className={styles.search}
        type="search"
        name="keyword"
        value={filters.keyword}
        placeholder={translate({ message: 'Filter' })}
        aria-label={translate({ message: 'Filter' })}
        onChange={handleOnChange}
      />

      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <Translate>Origin</Translate>
        </div>
        <div className={styles.checks}>
          {Object.values(origins).map((name) => option(name, name))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <Translate>Categories</Translate>
        </div>
        <div className={styles.checks}>
          {Object.values(categories).map((name) => option(name, name))}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowLabel}>
          <Translate>Options</Translate>
        </div>
        <div className={styles.checks}>
          {option('bundled', translate({ message: 'included with Verdaccio' }))}
          {option('excludeVulnerable', translate({ message: 'hide packages with known CVEs' }))}
          {option('onlyVulnerable', translate({ message: 'only packages with known CVEs' }))}
          {option('hideNoSource', translate({ message: 'hide packages without source code' }))}
        </div>
      </div>
    </section>
  );
};

export default FilterControl;
