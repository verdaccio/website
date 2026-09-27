import { pluginUtils } from '@verdaccio/core';

import express, { type Express } from 'express';

/**
 * Whatever your plugin accepts under its own key in `middlewares:` of `config.yaml`.
 *
 * ```yaml
 * middlewares:
 *   audit:
 *     enabled: true      # keep it: defining this block replaces the default list
 *   my-endpoint:
 *     greeting: hola
 * ```
 */
type CustomConfig = { greeting?: string };

/**
 * A middleware plugin mounts routes on the Express application Verdaccio built.
 *
 * Two things about the signature that the compiler will not warn you about:
 *
 * - The type parameters are `<PluginConfig, Storage, Auth>`, but `register_middlewares`
 *   receives **`auth` before `storage`**. Declare `unknown` for the ones you do not use.
 * - `this.config` is typed `PluginConfig | unknown` on the base class, hence the cast below.
 *
 * @see https://verdaccio.org/dev/plugin-middleware
 */
export default class CustomEndpoint
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ExpressMiddleware<CustomConfig, unknown, pluginUtils.IBasicAuth>
{
  /**
   * Called once at startup, in the order the plugins appear in `middlewares:`.
   *
   * Your routes are registered **before** the registry API, so a matching route answers and
   * the built-in handler never runs — mount on a prefix unless overriding is the point.
   *
   * By the time a request reaches this router, Verdaccio has already:
   *
   * - parsed the JSON body, so `req.body` is an object and reading the raw stream fails
   *   (7.x; on 6.x there is no parser and `req.body` is `undefined`);
   * - run the JWT middleware, so `req.remote_user` is set — except under `/-/verdaccio/`,
   *   the web UI namespace, which is skipped on purpose.
   *
   * @param app the Express application; mount routers on it
   * @param _auth the live auth instance, for permission checks
   */
  public register_middlewares(app: Express, _auth: pluginUtils.IBasicAuth): void {
    const router = express.Router();

    router.get('/hello', (req, res) => {
      this.options.logger.info({ url: req.url }, 'custom-endpoint: incoming request');
      res.json({ hello: (this.config as CustomConfig).greeting ?? 'world' });
    });

    // Prefer a prefix. A bare `app.use(router)` sees every request to the registry.
    app.use('/-/npm/v2/my-endpoint', router);
  }
}
