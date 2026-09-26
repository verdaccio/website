import { pluginUtils } from '@verdaccio/core';

import express, { type Express } from 'express';

/** Whatever your plugin accepts under its key in `config.yaml`. */
type CustomConfig = { greeting?: string };

/**
 * The type parameters are `<PluginConfig, Storage, Auth>`, but `register_middlewares`
 * receives `auth` before `storage`. Use `unknown` for the ones you do not touch.
 */
export default class CustomEndpoint
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.ExpressMiddleware<CustomConfig, unknown, pluginUtils.IBasicAuth>
{
  public register_middlewares(app: Express, _auth: pluginUtils.IBasicAuth): void {
    const router = express.Router();

    router.get('/hello', (req, res) => {
      this.options.logger.info({ url: req.url }, 'custom-endpoint: incoming request');
      res.json({ hello: (this.config as CustomConfig).greeting ?? 'world' });
    });

    app.use('/-/npm/v2/my-endpoint', router);
  }
}
