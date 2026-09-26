---
id: plugin-filter
title: 'Filter Plugin'
---

## What's a filter plugin? {#whats-a-filter-plugin}

### When to use a filter plugin? {#when-to-use}

If you need to mutate the metadata for different reasons this is a way to do it, all manifest request are intercepted, but the tarballs, user, profile or tokens requests are not included. A good example to review is the [verdaccio-plugin-secfilter](https://github.com/Ansile/verdaccio-plugin-secfilter).

### Plugin structure {#build-structure}

The plugin only has one async method named `filter_metadata` that reference of the manifest and must return a copy (or modified object but not recommended) of the metadata.

```ts
import { pluginUtils } from '@verdaccio/core';
import type { Manifest } from '@verdaccio/types';

export default class VerdaccioFilterPlugin
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ManifestFilter<CustomConfig>
{
  async filter_metadata(manifest: Manifest): Promise<Manifest> {
    // return a copy; mutating the argument in place is not supported
    return { ...manifest, name: 'fooName' };
  }
}
```

### Configuration

Just add `filters` to the `config.yaml` file and your own plugin options.

```yaml
filters:
  storage-filter-blackwhitelist:
    filter_file: /path/to/file
```

More [info in the PR](https://github.com/verdaccio/verdaccio/pull/1161).
