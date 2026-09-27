import { pluginUtils } from '@verdaccio/core';
import type { Manifest } from '@verdaccio/types';

/**
 * Options read from your plugin's key in `filters:` of `config.yaml`.
 *
 * ```yaml
 * filters:
 *   hide-canary:
 *     suffix: '-canary.'
 * ```
 */
type CustomConfig = { suffix?: string };

/**
 * A filter plugin sees every package manifest before it reaches the client, and can rewrite
 * it. Tarball, user, profile and token requests do **not** pass through filters, so hiding a
 * version here does not stop someone downloading its tarball directly.
 *
 * @see https://verdaccio.org/dev/plugin-filter
 */
export default class HideCanaryVersions
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ManifestFilter<CustomConfig>
{
  /**
   * Called for every manifest read — and once per matched package during `npm search`, so
   * the cost is multiplied by the size of the result set. The three habits below are what
   * keep that affordable; see the caveats on the docs page for the reasoning.
   *
   * The manifest you receive is a **shallow** copy: `versions`, `dist-tags`, `time` and
   * `_distfiles` are the caller's own objects. Clone the containers you touch and never
   * edit them in place, or you corrupt what Verdaccio later writes to storage.
   *
   * @param manifest the package manifest, already merged with any uplink data
   * @returns the manifest the client will see
   */
  public async filter_metadata(manifest: Manifest): Promise<Manifest> {
    const suffix = (this.config as CustomConfig).suffix;

    // 1. Bail out before cloning when there is nothing to do.
    if (!suffix) {
      return manifest;
    }

    const blocked = Object.keys(manifest.versions).filter((version) => version.includes(suffix));
    if (blocked.length === 0) {
      return manifest;
    }

    // 2. Clone the containers once, then work on that copy.
    const filtered: Manifest = {
      ...manifest,
      versions: { ...manifest.versions },
      'dist-tags': { ...manifest['dist-tags'] },
      time: { ...manifest.time },
    };

    // 3. One pass over what you already know is blocked, not a scan per container.
    for (const version of blocked) {
      delete filtered.versions[version];
      delete filtered.time[version];
    }
    for (const [tag, version] of Object.entries(filtered['dist-tags'])) {
      if (!filtered.versions[version]) {
        delete filtered['dist-tags'][tag];
      }
    }

    return filtered;
  }
}
