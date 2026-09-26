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
   * Return a **copy**. The manifest you receive is shared with the caller, so editing it in
   * place can mutate what Verdaccio later writes to storage.
   *
   * Filters run on a hot path — every manifest read, cached or not — so keep the work cheap
   * and avoid I/O.
   *
   * @param manifest the package manifest, already merged with any uplink data
   * @returns the manifest the client will see
   */
  public async filter_metadata(manifest: Manifest): Promise<Manifest> {
    const suffix = (this.config as CustomConfig).suffix ?? '-canary.';
    const versions = Object.fromEntries(
      Object.entries(manifest.versions).filter(([version]) => !version.includes(suffix))
    );

    return { ...manifest, versions };
  }
}
