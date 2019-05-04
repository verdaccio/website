---
id: version-4.0.0-alpha.5-best
title: Лучшие практики
original_id: best
---

Это руководство - список лучших практик, которые мы собрали, и которые рекомендуем всем пользователям. Не воспринимайте это руководство как высеченную в камне неделимую истину, вы можете использовать только пару пунктов, если так будет правильно для вас.

**Не стесняйтесь предлагать ваши лучшие практики комьюнити Verdaccio**.

## Приватный репозиторий

You can add users and manage which users can access which packages.

Мы рекомендуем определить для ваших приватных пакетов префикс, например `local-*`, или скоуп `@my-company/*`, так что все ваши приватные пакеты будут выглядеть примерно так: `local-foo`. This way you can clearly separate public packages from private ones.

```yaml
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
   ```

Always remember, **the order of packages access is important**, packages are mached always top to bottom.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

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




## Security

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recomendations.

### Package Access

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

## Сервер

### Защищенные соединения

Использовать **HTTPS** - это частая рекомендация, и мы рекомендуем прочитать раздел [SSL](ssl.md), чтобы включить защиту внутри Verdaccio, или использовать HTTPS [reverse proxy](reverse-proxy.md) поверх Verdaccio.

### Ограничения по времени для токенов

В `verdaccio@3.x` токены не имеют ограничений по времени. Поэтому мы ввели в `verdaccio@4.x` новую фичу - JWT [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

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

**Использование этой конфигурации изменит текущее поведение сервера и вы сможете управлять временим жизни токенов**.

Использование JWT так же увеличивает производительность плагинов аутентификации, так как старая система производила распаковку и проверку credentials во время каждого запроса, тогда как JWT полагается на подпись токена, устраняя эти накладные расходы для плагина.

В качестве примечания, **npmjs токены не имеют ограничений по времени**.