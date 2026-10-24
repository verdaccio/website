---
id: tarball-metadata
title: 'Tarball metadata'
description: 'Show the README of the exact version in the web UI and fill missing dist.fileCount and dist.unpackedSize by reading the package tarball, without slowing down installs.'
---

The npm registry does not always send READMEs in package metadata. For some
large packages, for example `react`, the `readme` field is empty for every
version, and by default Verdaccio keeps only the latest README of the packages
published to it (see [`keep_readmes`](config.md#keep-readmes)). The web UI then
shows _"No README data found"_, or the README of a different version.

With the `tarballMetadata` flag, Verdaccio reads the README straight from the
tarball of the version being viewed, and fills `dist.fileCount` and
`dist.unpackedSize` when the uplink did not provide them.

:::info Available from 7.x — test it on 9.x
This feature ships in Verdaccio **7.x** and later. It is **not** available in
**6.x**, which does not receive new features.

To try it today, use the **9.x experimental** line, which is where it lands
first:

```bash
npm install -g verdaccio@next-9
# or
docker pull verdaccio/verdaccio:nightly-master
```

Experimental releases are **not production-ready** and are meant for testing and
early feedback. Node.js `>= 24` is required.
:::

:::caution
This is an experimental feature behind the `tarballMetadata` flag. It is off by
default, and the shape of the flag or its behaviour may change in a future
release. See [feature flags](config.md#experiments).
:::

## Enable it {#enable}

```yaml
flags:
  tarballMetadata: true

tarball_metadata:
  # tarballs larger than this are never unpacked (default: 20)
  max_size_mb: 20
```

## When a tarball is unpacked {#when}

A tarball is only ever unpacked in two situations:

| When                                                                  | Where the tarball comes from                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Right after a version is **published**, in the background             | The upload itself, already in memory                               |
| When the **web UI** asks for a README that the manifest does not have | The tarball cached in storage, or the uplink when it is not cached |

**Installs never unpack tarballs.** `npm install`, `pnpm install` and the other
clients download tarballs exactly as they do with the flag off, so install
performance is unaffected.

The README of a version is looked up in this order:

1. the `readme` stored for that version in the manifest (see [`keep_readmes`](#keep-readmes));
2. the package README, when the requested version is `latest`;
3. the README inside that version's tarball;
4. the previous fallback, the README of `latest`.

## Limits and caching {#limits}

- Tarballs larger than `tarball_metadata.max_size_mb` are skipped before
  anything is unpacked when the size is known in advance, or as soon as the
  limit is crossed otherwise. Those versions keep the previous fallback.
- At most two tarballs are read at a time, and concurrent requests for the same
  tarball share one read. A read that stalls is abandoned after 60 seconds.
- READMEs are kept in memory (up to 50 MB). After a restart they are read again
  from the cached tarball on the next visit.
- `dist.fileCount` and `dist.unpackedSize` are written into the cached manifest
  only when they are missing. Values that the uplink already provides are never
  overwritten.
- Only a README at the package root counts (`README`, `README.md`,
  `README.markdown` or `README.txt`, in any case). READMEs of bundled
  dependencies are ignored, and READMEs larger than 1 MB are not returned.

Viewing the README of a version whose tarball is not cached downloads that
tarball from the uplink and caches it (when the uplink has `cache: true`), the
same as an install would.

## Combining it with `keep_readmes` {#keep-readmes}

[`keep_readmes`](config.md#keep-readmes) decides which READMEs are stored in the
manifest; this flag only reads the tarball when the manifest has none for the
requested version. The flag never writes READMEs into the manifest.

| `keep_readmes` | Packages published to Verdaccio                               | Packages from npmjs                                     |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| default        | Latest README from the manifest, other versions from tarballs | Always from tarballs; npmjs sends no per-version README |
| `'tagged'`     | Tagged versions from the manifest, the rest from tarballs     | Same as default                                         |
| `'all'`        | Every version from the manifest; tarballs are not read for it | Same as default                                         |

With the flag on, the default `keep_readmes` is usually the best choice: the
manifests stay small and tarballs cover the rest.

## Logs {#logs}

Every unpack is logged at `info` level with the time it took, including the
download when the tarball came from the uplink:

```
info --- tarball metadata for react react-19.3.1.tgz in 8ms: 27 files, 178663 bytes, readme yes
info --- tarball next-15.0.0.tgz of next is larger than 20 MB, not unpacked (202ms)
```

A failed read is logged at `warn` level and retried on the next visit.
