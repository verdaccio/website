import Translate, { translate } from '@docusaurus/Translate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ReactElement, useState } from 'react';
import { FC } from 'react';

import { Category, Filters, Origin } from './types';

type Props = {
  categories: Category[];
  origins: Origin[];
  filters: Filters;
  onChange: (filters: Filters) => void;
};

const ADDONS_FILE_PATH = 'website/src/components/EcosystemSearch/addons.json';
const ADDONS_FILE_EDIT_URL = `https://github.com/verdaccio/website/edit/master/${ADDONS_FILE_PATH}`;
const ADDON_ISSUE_URL =
  'https://github.com/verdaccio/website/issues/new?template=addon.yml';
const ADDON_ENTRY_EXAMPLE = `{
  "name": "verdaccio-example-plugin",
  "category": "authentication",
  "origin": "community",
  "bundled": false
}`;

const FilterControl: FC<Props> = ({ categories, origins, filters, onChange }): ReactElement => {
  const theme = useTheme();
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

  return (
    <Card sx={{ marginBottom: theme.spacing(2), padding: theme.spacing(2) }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          flexWrap: 'wrap',
          marginBottom: theme.spacing(1),
        }}
      >
        <Typography variant="h6" fontSize="lg" fontWeight="lg">
          <Translate>Search for Plugins and Tools</Translate>
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<InfoOutlinedIcon fontSize="small" />}
          onClick={() => setInfoOpen(true)}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          <Translate>Don't see your plugin? Submit it</Translate>
        </Button>
      </Box>
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Translate>How to add a new addon</Translate>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ marginBottom: theme.spacing(1) }}>
            <Translate>
              The list is hand-curated — packages are NOT auto-discovered from npm keywords.
              The easiest way to propose a new plugin or tool is to file a "Suggest a new
              addon" issue using the template below; a maintainer will review and add it.
              Power users can skip the issue and open a PR directly against the JSON file.
              Once merged, the next scheduled run of the update script fills in the live
              metadata (downloads, version, license, vulnerabilities, etc.).
            </Translate>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(0.5) }}
          >
            <Translate>File to edit</Translate>
          </Typography>
          <Box
            component="code"
            sx={{
              display: 'block',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              padding: theme.spacing(0.75, 1),
              backgroundColor: 'action.hover',
              borderRadius: 1,
              wordBreak: 'break-all',
            }}
          >
            {ADDONS_FILE_PATH}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(0.5) }}
          >
            <Translate>Example entry to append to the `addons` array</Translate>
          </Typography>
          <Box
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              padding: theme.spacing(1),
              margin: 0,
              backgroundColor: 'action.hover',
              borderRadius: 1,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
            {ADDON_ENTRY_EXAMPLE}
          </Box>
          <Typography
            variant="caption"
            sx={{ display: 'block', marginTop: theme.spacing(0.75), color: 'text.secondary' }}
          >
            <Translate>
              Only `name`, `category`, and `origin` are required. `bundled` defaults to false.
              The script fills in url, registry, description, latest, downloads, modified,
              repository, license, hasTypes, and vulnerabilities on the next run.
            </Translate>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: theme.spacing(1.5), marginBottom: theme.spacing(0.5) }}
          >
            <Translate>Eligibility rules</Translate>
          </Typography>
          <Box component="ul" sx={{ paddingLeft: 2, margin: 0, '& li': { fontSize: '0.875rem' } }}>
            <li>
              <Translate>
                Published on the public npm registry at npmjs.org (private or scoped-private
                packages are not eligible; unpublished packages are dropped after 30 days).
              </Translate>
            </li>
            <li>
              <Translate>Declares a `repository` URL in `package.json` (packages without one are dropped after 90 days).</Translate>
            </li>
            <li>
              <Translate>Fits one of the categories: middleware, authentication, filter, storage, ui, tool.</Translate>
            </li>
            <li>
              <Translate>
                Community packages should declare a `license` field in package.json — preferably
                an OSI-approved SPDX identifier. Packages without one are still listed but
                flagged as "No license provided" on the card.
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
                HIGH or CRITICAL CVEs (per OSV.dev) are flagged on the card; if left unfixed
                for more than 12 months the package is dropped from the list. MODERATE/LOW
                advisories are allowed and only flagged.
              </Translate>
            </li>
            <li>
              <Translate>"Core" is reserved for packages maintained by the Verdaccio team.</Translate>
            </li>
          </Box>
          <Typography
            variant="caption"
            sx={{ display: 'block', marginTop: theme.spacing(1.5), color: 'text.secondary' }}
          >
            <Translate>
              Metadata (downloads, version, vulnerabilities) is refreshed periodically from npm
              and OSV.
            </Translate>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button onClick={() => setInfoOpen(false)}>
            <Translate>Close</Translate>
          </Button>
          <Button
            href={ADDONS_FILE_EDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            <Translate>Edit addons.json (PR)</Translate>
          </Button>
          <Button
            variant="contained"
            href={ADDON_ISSUE_URL}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            <Translate>Submit an addon (issue)</Translate>
          </Button>
        </DialogActions>
      </Dialog>
      <Alert severity="info" sx={{ marginBottom: theme.spacing(1) }}>
        <Translate>Items qualified as core are maintained actively by the verdaccio team</Translate>
      </Alert>
      <Grid container spacing={1}>
        <Grid size={12}>
          <TextField
            name="keyword"
            fullWidth
            value={filters.keyword}
            label={translate({ message: 'Filter' })}
            onChange={handleOnChange}
            size="small"
            variant="outlined"
          />
        </Grid>
        <Grid size={12} container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontSize="lg" fontWeight="lg" sx={{ paddingTop: '5px' }}>
              <Translate>Origin</Translate>:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <FormGroup row>
              {Object.values(origins).map((name) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      name={name}
                      onChange={handleOnChange}
                      checked={filters[name]}
                      size="small"
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid size={12} container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontSize="lg" fontWeight="lg" sx={{ paddingTop: '5px' }}>
              <Translate>Categories</Translate>:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <FormGroup row>
              {Object.values(categories).map((name) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      name={name}
                      onChange={handleOnChange}
                      checked={filters[name]}
                      size="small"
                    />
                  }
                  label={name}
                />
              ))}
            </FormGroup>
          </Grid>
        </Grid>
        <Grid size={12} container spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontSize="lg" fontWeight="lg" sx={{ paddingTop: '5px' }}>
              <Translate>Options</Translate>:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="bundled"
                    checked={filters.bundled}
                    size="small"
                    onChange={handleOnChange}
                  />
                }
                label={translate({ message: 'included with Verdaccio' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="excludeVulnerable"
                    checked={filters.excludeVulnerable}
                    size="small"
                    onChange={handleOnChange}
                  />
                }
                label={translate({ message: 'hide packages with known CVEs' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="onlyVulnerable"
                    checked={filters.onlyVulnerable}
                    size="small"
                    onChange={handleOnChange}
                  />
                }
                label={translate({ message: 'only packages with known CVEs' })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="hideNoSource"
                    checked={filters.hideNoSource}
                    size="small"
                    onChange={handleOnChange}
                  />
                }
                label={translate({ message: 'hide packages without source code' })}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FilterControl;
