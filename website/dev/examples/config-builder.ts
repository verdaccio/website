import { ConfigBuilder } from '@verdaccio/config';

/**
 * `ConfigBuilder` assembles a configuration object without writing YAML by hand. Every
 * `add*` method returns the builder, so calls chain.
 *
 * It is the practical companion to `runServer`, which accepts the same object, and it is what
 * Verdaccio's own tests use to spin up a registry per case.
 *
 * On Verdaccio 6 and 7 it is re-exported from `verdaccio`; on 9 it lives only in
 * `@verdaccio/config`, so import it from there and your code works on every line.
 */
export function buildConfig() {
  return (
    ConfigBuilder.build()
      .addStorage('./storage')
      .addAuth({ htpasswd: { file: './htpasswd' } })
      .addUplink('npmjs', { url: 'https://registry.npmjs.org/' })
      // `packages` order matters: the first pattern that matches wins, so the
      // catch-all goes last, exactly as in config.yaml.
      .addPackageAccess('@*/*', {
        access: '$all',
        publish: '$authenticated',
        proxy: 'npmjs',
      })
      .addPackageAccess('**', {
        access: '$all',
        publish: '$authenticated',
        proxy: 'npmjs',
      })
      .addLogger({ type: 'stdout', format: 'pretty', level: 'http' })
      .addMaxBodySize('100mb')
  );
}

/**
 * Two ways out of the builder:
 *
 * - `getConfig()` returns the plain object, which is what you hand to `runServer`.
 * - `getAsYaml()` serialises it, for writing an actual `config.yaml` to disk.
 */
export function configAsObject() {
  return buildConfig().getConfig();
}

export function configAsYaml(): string {
  return buildConfig().getAsYaml();
}
