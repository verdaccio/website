---
id: best
title: "Лучшие практики"
---

Это руководство - список лучших практик, которые мы собрали, и которые рекомендуем всем пользователям. Не воспринимайте это руководство как высеченную в камне неделимую истину, вы можете использовать только пару пунктов, если так будет правильно для вас.

**Feel free to suggest your best practices to the Verdaccio community**.

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

Always remember, **the order of packages access is important**, packages are matched always top to bottom.

### Использование публичных пакетов с npmjs.org

Если какого-то пакета нет в хранилище, сервер попробует скачать его с npmjs.org. Если npmjs.org недоступен, то сервер будет брать пакеты из кэша, исходя из предположения, что других пакетов нет. **Verdaccio will download only what's needed (requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Пример:**

If you successfully request `express@4.0.1` from this server once, you'll be able to do it again (with all it's dependencies) anytime even if npmjs.org is down. Но, скажем, `express@4.0.0` не будет загружен, пока кто-нибудь его не запросит. And if npmjs.org is offline, this server would say that only `express@4.0.1` (only what's in the cache) is published, but nothing else.

### Переопределение публичных пакетов

Если вы хотите использовать модифицированную версию какого-либо публичного пакета `foo`, то просто опубликуйте его на вашем локальном сервере, и когда вы запустите команду `npm install foo`, **будет становлена именно ваша версия**.

Возможны две ситуации:

1. Вы хотите создать отдельный **форк** и остановить синхронизацию с публичной версией.
    
    Если вы хотите сделать это, то надо изменить конфигурационный файл так, чтобы verdaccio не делал больше запросы к npmjs. Добавьте отдельную запись для этого пакета в `config.yaml` и удалите `npmjs` из списка `proxy`, затем перезапустите сервер.
    
    ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    При этом, когда вы локально публикуете пакет, **рекомендуется повысить версию**, чтобы не было конфликта с версией, которая же есть в кэше.

2. Вы хотите временно использовать свою версию, но вернуться к публичному пакету, когда выйдет обновление.
    
    Чтобы избежать конфликта версий, **вам нужно использовать свой пре-релизный суффикс для следующей версии**. Например, если публичный пакет имел версию 0.1.2, вам нужно опубликовать `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm publish --tag fix --registry http://localhost:4873
    ```
    
    В этом случае ваш пакет будет использоваться до тех пор, пока владелец пакета не опубликует версию `0.1.3`.

## Безопасность

Безопасность начинается с окружения вашего сервера, так что очень рекомендуем прочитать **[10 лучших практик npm по безопасности](https://snyk.io/blog/ten-npm-security-best-practices/)** и следовать рекомендациям.

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

That way, **nobody will take advantage of your registry unless it's authorized and private packages won't be displayed in the User Interface**.

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