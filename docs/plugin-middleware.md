---
id: plugin-middleware
title: "Middleware Plugin"
---

## What's an Middleware Plugin?

<div id="codefund">''</div>

Middleware plugins have the capability to modify the API layer, either adding new endpoints or intercepting requests.

```typescript
interface IPluginMiddleware<T> extends IPlugin<T> {
  register_middlewares(app: any, auth: IBasicAuth<T>, storage: IStorageManager<T>): void;
}
```

### `register_middlewares`

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

```
public register_middlewares(
    app: Application,
    auth: IBasicAuth<CustomConfig>,
    storage: IStorageManager<CustomConfig>
  ): void {
    const router = Router();
    router.post(
      '/custom-endpoint',
      (req: Request, res: Response & { report_error?: Function }, next: NextFunction): void => {
        const encryptedString = auth.aesEncrypt(Buffer.from(this.foo, 'utf8'));
        res.setHeader('X-Verdaccio-Token-Plugin', encryptedString.toString());
        next();
      }
    );
    app.use('/-/npm/something-new', router);
  }
```

The `auth` and `storage` are instances and can be extended, but we don't recommend this approach unless is well founded.


> Feel examples of middleware plugin to look up are [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) and [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

## Generate an middleware plugin

For detailed info check our [plugin generator page](plugin-generator). Run the `yo` command in your terminal and follow the steps.

```
➜ yo verdaccio-plugin

Just found a `.yo-rc.json` in a parent directory.
Setting the project root at: /Users/user/verdaccio_yo_generator

     _-----_     ╭──────────────────────────╮
    |       |    │        Welcome to        │
    |--(o)--|    │ generator-verdaccio-plug │
   `---------´   │   in plugin generator!   │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What is the name of your plugin? custom-endpoint
? Select Language typescript
? What kind of plugin you want to create? middleware
? Please, describe your plugin awesome middleware plugin
? GitHub username or organization myusername
? Author's Name Juan Picado
? Author's Email jotadeveloper@gmail.com
? Key your keywords (comma to split) verdaccio,plugin,auth,awesome,verdaccio-plugin
   create verdaccio-plugin-middleware-custom-endpoint/package.json
   create verdaccio-plugin-middleware-custom-endpoint/.gitignore
   create verdaccio-plugin-middleware-custom-endpoint/.npmignore
   create verdaccio-plugin-middleware-custom-endpoint/jest.config.js
   create verdaccio-plugin-middleware-custom-endpoint/.babelrc
   create verdaccio-plugin-middleware-custom-endpoint/.travis.yml
   create verdaccio-plugin-middleware-custom-endpoint/README.md
   create verdaccio-plugin-middleware-custom-endpoint/.eslintrc
   create verdaccio-plugin-middleware-custom-endpoint/.eslintignore
   create verdaccio-plugin-middleware-custom-endpoint/src/index.ts
   create verdaccio-plugin-middleware-custom-endpoint/index.ts
   create verdaccio-plugin-middleware-custom-endpoint/tsconfig.json
   create verdaccio-plugin-middleware-custom-endpoint/types/index.ts
   create verdaccio-plugin-middleware-custom-endpoint/.editorconfig

I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself.


⸨ ░░░░░░░░░░░░░░░░░⸩ ⠋ fetchMetadata: sill pacote range manifest for @babel/plugin-syntax-jsx@^7.7.4 fetc
```

After the install finish, access to your project scalfold.

```
➜ cd verdaccio-plugin-auth-service-name
➜ cat package.json

  {
  "name": "verdaccio-plugin-middleware-custom-endpoint",
  "version": "0.0.1",
  "description": "awesome middleware plugin",
  ...
```

> Don't include `middleware` in your plugin name, the generator will add it for you.

### List Community Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for *npm audit* cli support (built-in) (compatible since 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin for *npm profile* cli support and *npm profile set password* for *verdaccio-htpasswd* based authentificaton

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware plugin to redirect to https if x-forwarded-proto header is set
