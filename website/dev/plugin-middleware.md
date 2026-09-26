---
id: plugin-middleware
title: 'Middleware Plugin'
---

```mdx-code-block
import CodeBlock from '@theme/CodeBlock';
import MiddlewareExample from '!!raw-loader!./examples/middleware-plugin.ts';
```

## What's a Middleware Plugin? {#whats-a-middleware-plugin}

Middleware plugins have the capability to modify the API (web and cli) layer, either adding new endpoints or intercepting requests.

### API {#api}

The interface lives in `@verdaccio/core`, under the `pluginUtils` namespace:

```typescript
import { pluginUtils } from '@verdaccio/core';

interface ExpressMiddleware<PluginConfig, Storage, Auth> extends Plugin<PluginConfig> {
  register_middlewares(app: Express, auth: Auth, storage: Storage): void;
}
```

:::note
The type parameters are declared in the order `<PluginConfig, Storage, Auth>`, but
`register_middlewares` receives **`auth` before `storage`**. The compiler will not catch
the two being swapped when both are `any`.
:::

`Storage` and `Auth` are the types of the instances Verdaccio injects. A plugin that only
needs `auth` can declare `{}` for `Storage`, as the generator template does.

### `register_middlewares` {#register_middlewares}

`app` is the Express application, so the method can mount any router or middleware on it.
`auth` and `storage` are the live instances and can be extended, though we don't recommend
it unless well founded.

<CodeBlock language="ts">{MiddlewareExample}</CodeBlock>

This is the same shape the [plugin generator](plugin-generator.md) scaffolds, so running it
is the quickest way to get a compiling starting point.

> A good example of a middleware plugin is the [verdaccio-audit](https://github.com/verdaccio/monorepo/tree/master/plugins/audit).

## Overwriting HTTP Security Headers {#overwrite-http-security-headers]

By default, Verdaccio sets the following HTTP headers. If you have other security requirements, you can overwrite these settings using a middleware plugin (Verdaccio 6.2.5 or higher).

| Header                  | Verdaccio Setting  |
| ----------------------- | ------------------ |
| Content-Security-Policy | connect-src 'self' |
| X-Content-Type-Options  | nosniff            |
| X-Frame-Options         | deny               |
| X-XSS-Protection        | 1; mode=block      |

## Generate a middleware plugin {#generate-a-middleware-plugin}

Run `yo verdaccio-plugin` and pick `middleware` when asked for the plugin type; the
[plugin generator page](plugin-generator.md) covers installation and the full prompt list.
The scaffold it produces is the example shown above, already compiling against the current
`@verdaccio/core`.

The middleware are registrered after built-in endpoints, thus, it is not possible to override the implemented ones.

### List Community Middleware Plugins {#list-community-middleware-plugins}

- [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for _npm audit_ cli support (built-in) (compatible since 3.x)

- [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdaccio plugin for _npm profile_ cli support and _npm profile set password_ for _verdaccio-htpasswd_ based authentificaton

- [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware plugin to redirect to https if x-forwarded-proto header is set
- [verdaccio-badges](https://github.com/tavvy/verdaccio-badges) A verdaccio plugin to provide a version badge generator endpoint
- [verdaccio-openmetrics](https://github.com/freight-hub/verdaccio-openmetrics) Verdaccio plugin exposing an OpenMetrics/Prometheus endpoint with health and traffic metrics
- [verdaccio-sentry](https://github.com/juanpicado/verdaccio-sentry) sentry loggin errors
- [verdaccio-pacman](https://github.com/PaddeK/verdaccio-pacman) Verdaccio Middleware Plugin to manage tags and versions of packages
