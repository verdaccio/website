---
id: version-4.4.1-best
title: Лучшие практики
original_id: best
---

Это руководство - список лучших практик, которые мы собрали, и которые рекомендуем всем пользователям. Не воспринимайте это руководство как высеченную в камне неделимую истину, вы можете использовать только пару пунктов, если так будет правильно для вас.

<div id="codefund">''</div>

**Не стесняйтесь предлагать свои лучшие практики сообществу Verdaccio**.

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

Помните, **важен порядок доступа к пакетам**, пакеты отображаются всегда сверху вниз.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio скачает только то, что необходимо (= запрошено клиентами)**, и эта информация будет закэширована. Так что если клиент запросит то же самое еще раз, он может быть обслужен без запроса к npmjs.org.

**Пример:**

Если вы запросили `express@4.0.1` с сервера и запрос был успешный, это означает, что вы сможете получить его снова (вместе со всеми зависимостями) в любое время, даже если npmjs.org не работает. Но, скажем, `express@4.0.0` не будет загружен, пока кто-нибудь его не запросит. И если npmjs.org недоступен, сервер будет отвечать, что только `express@4.0.1` (= только то, что в кэше) опубликован, и больше никих версий нет.

### Override public packages

Если вы хотите использовать модифицированную версию какого-либо публичного пакета `foo`, то просто опубликуйте его на вашем локальном сервере, и когда вы запустите команду `npm install foo`, **будет установлена именно ваша версия**.

There's two options here:

1. Вы хотите создать отдельный **форк** и остановить синхронизацию с публичной версией.

   If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Добавьте отдельную запись для этого пакета в `config.yaml` и удалите `npmjs` из списка `proxy`, затем перезапустите сервер.

   ```yaml
    packages:
  '@my-company/*':
    access: $all
    publish: $authenticated
    # закомментировать или оставить пустым
    # proxy:
   ```

   При этом, когда вы локально публикуете пакет, **рекомендуется повысить версию**, чтобы не было конфликта с версией, которая уже есть в кэше.

2. You want to temporarily use your version, but return to public one as soon as it's updated.

   Чтобы избежать конфликта версий, **вам нужно использовать свой пре-релизный суффикс для следующей версии**. Например, если публичный пакет имел версию 0.1.2, вам нужно опубликовать `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   В этом случае ваш пакет будет использоваться до тех пор, пока владелец пакета не опубликует версию `0.1.3`.




## Безопасность

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

### Доступ к пакетам

По умолчанию все опубликованные в Verdaccio пакеты доступны всем, и мы настоятельно рекомендуем защитить ваш реестр от внешних неавторизированных пользователей, установив значение свойства `access` в `$authenticated`.

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

Использование JWT так же увеличивает производительность плагинов аутентификации, так как старая система производила распаковку и проверку credentials во время каждого запроса, тогда как JWT полагается на подпись токена, устраняя эти накладные расходы для плагина.

As a side note, at **npmjs the token never expires**.
