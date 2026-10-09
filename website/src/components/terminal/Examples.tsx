import Terminal from './Terminal';
import type { TermLine } from './Terminal';

import React from 'react';

const REG = 'https://registry.npmjs.org';

// one request pair: Verdaccio fetches from the uplink, then serves the client
const req = (row: number, at: number, name: string, bytes: number, tgz?: string): TermLine[] => [
  {
    row,
    at,
    parts: [
      ['http', 'purple'],
      [' --> ', 'orange'],
      ['200', 'cyan'],
      [', req: '],
      [`'GET ${REG}/${name}'`, 'green'],
      [' (streaming)', 'dim'],
    ],
  },
  {
    row: row + 1,
    at: at + 2,
    parts: [
      ['http', 'purple'],
      [' <-- ', 'green'],
      ['200', 'cyan'],
      [', user: '],
      ['undefined', 'dim'],
      ['(127.0.0.1), req: '],
      [`'GET /${tgz ?? name}'`, 'green'],
      [', bytes: '],
      [`0/${bytes}`, 'cyan'],
    ],
  },
];

export const ServerLog = (): React.ReactElement => (
  <Terminal
    title="verdaccio — running on :4873"
    label="Terminal animation: running the verdaccio command starts the registry on port 4873, then each package requested by a client is fetched from npmjs and served."
    rows={12}
    cursorRow={11}
    lines={[
      {
        row: 0,
        at: 2,
        parts: [
          ['$ ', 'prompt'],
          ['verdaccio', 'bold'],
        ],
      },
      {
        row: 1,
        at: 6,
        parts: [
          ['info', 'cyan'],
          [' --- ', 'dim'],
          ['http address ', 'dim'],
          ['http://localhost:4873/', 'green'],
        ],
      },
      ...req(3, 12, 'arr-union', 3013, 'arr-union/-/arr-union-3.1.0.tgz'),
      ...req(5, 24, 'static-extend', 2377, 'static-extend/-/static-extend-0.1.2.tgz'),
      ...req(7, 36, 'is-descriptor', 4275, 'is-descriptor/-/is-descriptor-0.1.6.tgz'),
      ...req(9, 48, 'kind-of', 5747, 'kind-of/-/kind-of-5.1.0.tgz'),
    ]}
  />
);

export const InstallDemo = (): React.ReactElement => (
  <Terminal
    title="my-app — zsh"
    label="Terminal animation: pnpm add lodash with the registry pointing at Verdaccio resolves and installs the package."
    rows={9}
    cursorRow={8}
    lines={[
      {
        row: 0,
        at: 2,
        parts: [
          ['$ ', 'prompt'],
          ['pnpm add lodash --registry http://localhost:4873', 'bold'],
        ],
      },
      {
        row: 2,
        at: 10,
        transient: true,
        parts: [['Progress: resolved 1, reused 0, downloaded 0, added 0', 'dim']],
      },
      {
        row: 2,
        at: 48,
        parts: [
          ['Progress: resolved 1, reused 0, downloaded 1, added 1, ', 'dim'],
          ['done', 'green'],
        ],
      },
      { row: 4, at: 52, parts: [['dependencies:', 'bold']] },
      { row: 5, at: 54, parts: [['+ ', 'green'], ['lodash '], ['4.17.21', 'dim']] },
      { row: 7, at: 60, parts: [['Done in 1.3s', 'dim']] },
    ]}
  />
);
