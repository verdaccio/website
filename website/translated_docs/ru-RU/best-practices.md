---
id: best
title: "Лучшие практики"
---

Это руководство - список лучших практик, которые мы собрали, и которые рекомендуем всем пользователям. Не воспринимайте это руководство как высеченную в камне неделимую истину, вы можете использовать только пару пунктов, если так будет правильно для вас.

**Не стесняйтесь предлагать ваши лучшие практики комьюнити Verdaccio**.

## Приватный репозиторий

Вы можете добавлять пользователей и определять, какие пользователи имеют доступ к пакетам.

Мы рекомендуем определить для ваших приватных пакетов префикс, например `local-*`, или скоуп `@my-company/*`, так что все ваши приватные пакеты будут выглядеть примерно так: `local-foo`. Таким образом вы отделите публичные пакеты от приватных.

    yaml
      packages:
        '@my-company/*':
          access: $all
          publish: $authenticated
         'local-*':
          access: $all
          publish: $authenticated
        '@*/*':
          access: $all
          publish: $authenticated
        '**':
          access: $all
          publish: $authenticated

Помните, **порядок пакетов в списке доступа - важен**, потому что совпадения всегда ищутся сверху вниз.

### Использование публичных пакетов с npmjs.org

Если какого-то пакета нет в хранилище, сервер попробует скачать его с npmjs.org. Если npmjs.org недоступен, то сервер будет брать пакеты из кэша, исходя из предположения, что других пакетов нет. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Example:**

If you successfully request `express@4.0.1` from this server once, you'll able to do that again (with all it's dependencies) anytime even if npmjs.org is down. But say `express@4.0.0` will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, this server would say that only `express@4.0.1` (= only what's in the cache) is published, but nothing else.

### Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

There's two options here:

1. You want to create a separate **fork** and stop synchronizing with public version.
    
    If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Add a separate entry for this package to `config.yaml` and remove `npmjs` from `proxy` list and restart the server.
    
    ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    When you publish your package locally, **you should probably start with version string higher than existing one**, so it won't conflict with existing package in the cache.

2. You want to temporarily use your version, but return to public one as soon as it's updated.
    
    In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. For example, if a public package has version 0.1.2, you can upload `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
    ```
    
    This way your package will be used until its original maintainer updates his public package to `0.1.3`.

## Безопасность

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recomendations.

### Доступ к пакетам

By default all packages are you publish in Verdaccio are accessible for all public, we totally recommend protect your registry from external non authorized users updating `access` property to `$authenticated`.

```yaml
  packages:
    '@my-company/*':
      access: $authenticated
      publish: $authenticated
    '@*/*':
      access: $authenticated
      publish: $authenticated
    '**':
      access: $authenticated
      publish: $authenticated
   ```

In that way, **nobody will take advance of your registry unless is authorized and private packages won't be displayed in the User Interface**.

## Server

### Secured Connections

Using **HTTPS** is a common recomendation, for such reason we recommend read the [SSL](ssl.md) section to make Verdaccio secure or using a HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

### Expiring Tokens

In `verdaccio@3.x` the tokens have no expiration date. For such reason we introduced in the next `verdaccio@4.x` the JWT feature [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

```yaml
security:
  api:
    jwt:
      sign:
        expiresIn: 15d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
```

**Using this configuration will override the current system and you will be able to control how long the token will live**.

Using JWT also improves the performance with authentication plugins, the old system will perform an unpackage and validating the credentials in each request, while JWT will rely on the token signature avoiding the overhead for the plugin.

As a side note, at **npmjs the token never expires**.