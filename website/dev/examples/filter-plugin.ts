import { pluginUtils } from '@verdaccio/core';
import type { Manifest } from '@verdaccio/types';

type CustomConfig = { suffix?: string };

/**
 * A filter plugin sees every manifest before it reaches the client.
 * Return a copy — mutating the argument in place is not supported.
 */
export default class HideCanaryVersions
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ManifestFilter<CustomConfig>
{
  public async filter_metadata(manifest: Manifest): Promise<Manifest> {
    const suffix = (this.config as CustomConfig).suffix ?? '-canary.';
    const versions = Object.fromEntries(
      Object.entries(manifest.versions).filter(([version]) => !version.includes(suffix))
    );

    return { ...manifest, versions };
  }
}
