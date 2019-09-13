---
id: version-4.2.0-packages
title: Доступ к пакетам
original_id: packages
---

Это набор ограничений, которые разрешают или запрещают доступ к локальному хранилищу по определенному критерию.

Ограничения реализуются плагинами, по умолчанию `verdaccio` использует [плагин htpasswd](https://github.com/verdaccio/verdaccio-htpasswd). Если вы используете другой плагин, то детали могут отличаться. Плагин по умолчанию не реализует `allow_access` and `allow_publish`, использется встроенная реализация, которая включается именно в такой ситуации - когда плагин не реализовал эти методы.

Для более детальной информации о разрешениях, обратитесь к [странице аутентификации в вики](auth.md).

### Использование

```yalm
packages:
  # scoped packages
  '@scope/*':
    access: $all
    publish: $all
    proxy: server2

  'private-*':
    access: $all
    publish: $all
    proxy: uplink1

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    access: $all
    publish: $all
    proxy: uplink2
```

если не задано никаких правил, остается правило по умолчанию

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

Вот список внутренних групп, используемых `verdaccio`:

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Все пользователи получают этот набор групп, независимо от того, аутентифицированы они или нет, плюс группы из плагина, в случае плагина `htpasswd` он вернет имя пользователя в качестве группы. Например, если вы залогинились как `npmUser`, у вас будут вот такие группы.

```js
// группы без '$' будут отмечены как deprecated когда-нибудь
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Если вы хотите разрешить доступ к некоторому набору пакетов только членам своей группы, вам нужно делать так. Давайте будем использовать `regex`, который выберет все пакеты с префиксом `npmuser-`. Мы рекомендем использовать префикс для ваших пакетов, так проще всего настраивать разграничение прав.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Перезапустите `verdaccio` и попробуйте установить `npmuser-core` через консоль.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

Вы можете изменить описанное поведение, используя другой плагин аутентификации. `verdaccio` всего лишь проверяет, входит ли пользователь, который пытается загрузить или опубликовать пакет, в правильную группу.

#### Установка нескольких групп

Указать несколько групп - очень просто, нужно просто записать их через пробел.

```yaml
  'company-*':
    access: admin internal
    publish: admin
    proxy: server1
  'supersecret-*':
    access: secret super-secret-area ultra-secret-area
    publish: secret ultra-secret-area
    proxy: server1
```

#### Блокировка доступа к набору пакетов

If you want to block the access/publish to a specific group of packages. Just do not define `access` and `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Запрещение проксирования для набора пакетов

Вы можете захотеть запретить, для одного или нескольких пакетов, получение из удаленного репозитория, но, в то же время, разрешить остальным пакетом доступ к *аплинкам*.

Рассмотрим следующий пример:

```yaml
packages:
  'jquery':
    access: $all
    publish: $all
  'my-company-*':
    access: $all
    publish: $authenticated
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

Опишем, что мы хотели в примере выше:

* Я хочу хранить свой собственный пакет `jquery`, и мне нужно запретить проксирование для него.
* Я хочу хранить пакеты, удовлетворяющие паттерну `my-company-*`, и мне нужно запретить проксирование для них.
* Я хочу хранить пакеты из скоупа `my-local-scope`, и мне нужно запретить проксирование для них.
* Я хочу проксирование для всех остальных пакетов.

**Учтите, что порядок правил важен, и всегда добавляейте правило для двух звездочек**. Потому что если его не будет, то `verdaccio` сам добавит его, что может повлиять на способ разрешения ваших зависимостей.

#### Удаление опубликованных пакетов

Свойство `publish` определяет права доступа для команд `npm publish` и `npm unpublish`. Но, если вы хотите задать разрешение отдельно, можно использовать свойтство `unpublish` в секции доступа к пакетам, например:

```yalm
packages:
  'jquery':
    access: $all
    publish: $all
    unpublish: root
  'my-company-*':
    access: $all
    publish: $authenticated
    unpublish: 
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
    # unpublish: property commented out
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

В примере выше, было описано такое поведение:

* все пользователи могут публиковать пакет `jquery`, но только пользователь `root` может удалять любые версии.
* только аутентифицированные пользователи могут публиковать покаты `my-company-*`, но **никто не может удалять их**.
* Если `unpublish` закомментировать, то доступ будет определяяться свойством `publish`.

### Конфигурация

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Свойство | Тип    | Обязательное | Пример         | Поддержка      | Описание                                                   |
| -------- | ------ | ------------ | -------------- | -------------- | ---------------------------------------------------------- |
| access   | string | Нет          | $all           | все            | определяет группы, которым можно скачать этот пакет        |
| publish  | string | Нет          | $authenticated | все            | определяет группы, которым можно публиковать этот пакет    |
| proxy    | string | Нет          | npmjs          | все            | определяет аплинки для этого пакета                        |
| storage  | string | Нет          | string         | `/some-folder` | определяет подпапку в хранилище для этого пакета (пакетов) |


> Хочется отдельно отметить, что мы рекомендуем не использовать **allow_access**/**allow_publish** и **proxy_access**, они - deprecated и скоро будут удалены, пожалуйста, используйте короткие версии (**access**/**publish**/**proxy**).

Если вы хотите получить больше информации о том, как использовать свойство **storage**, пожалуйста, обратитесь к этом [комментарию](https://github.com/verdaccio/verdaccio/issues/1383#issuecomment-509933674).