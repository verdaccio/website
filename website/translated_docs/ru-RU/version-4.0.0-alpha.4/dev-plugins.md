---
id: version-4.0.0-alpha.4-dev-plugins
title: Разработка плагинов
original_id: dev-plugins
---
Есть много способов расширить `verdaccio`, поддерживаются следующие типы плагинов:

* Плагин аутентификации
* Middleware плагины (начиная с `v2.7.0`)
* Плагины для хранения с (`v3.x`)

> Мы рекомендуем разрабатывать плагины с использованием [flow type definitions](https://github.com/verdaccio/flow-types).

## Плагин аутентификации

В основном мы должны возвращать объект с помощью одного метода, называемого `authenticate`, который должен принимать три аругмента (`user, password, callback`).

### API

```flow
interface IPluginAuth extends IPlugin {
  login_url?: string;
  authenticate(user: string, password: string, cb: Callback): void;
  adduser(user: string, password: string, cb: Callback): void;
  allow_access(user: RemoteUser, pkg: $Subtype<PackageAccess>, cb: Callback): void;
  apiJWTmiddleware(user: RemoteUser, pkg: $Subtype<PackageAccess>, cb: Callback): void;
  allow_publish(helpers): void;
}
```

> Only `adduser`, `allow_access`, `apiJWTmiddleware` and `allow_publish` are optional, verdaccio provide a fallback in all those cases.

#### apiJWTmiddleware method

Since `v4.0.0`

`apiJWTmiddleware` was introduced on [PR#1227](https://github.com/verdaccio/verdaccio/pull/1227) in order to have full control of the token handler, overriding this method will disable `login/adduser` support. We recommend don't implement his method unless is totally necessary. See a full example [here](https://github.com/verdaccio/verdaccio/pull/1227#issuecomment-463235068).

#### Callback

После того как аутентификация была выполнена, `verdaccio` может быть возвращено только два ответа.

###### OnError

Либо что-то пошло не так, либо аутентификация была не удачной.

```flow
callback(null, false)
```

###### OnSuccess

Аутентификация прошла успешно.

`groups` это массив строк с именами групп, в которых пользователь состоит.

     callback(null, groups);
    

### Пример

```javascript
function Auth(config, stuff) {
  var self = Object.create(Auth.prototype);
  self._users = {};

  // конфигурация для этого модуля
  self._config = config;

  // verdaccio logger
  self._logger = stuff.logger;

  // pass verdaccio logger to ldapauth
  self._config.client_options.log = stuff.logger;

  return self;
}

Auth.prototype.authenticate = function (user, password, callback) {
  var LdapClient = new LdapAuth(self._config.client_options);
  ....
  LdapClient.authenticate(user, password, function (err, ldapUser) {
    ...
    var groups;
     ...
    callback(null, groups);
  });
};

module.exports = Auth;
```

И конфигурация будет выглядеть как-то так:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Where `htpasswd` is the sufix of the plugin name. eg: `verdaccio-htpasswd` and the rest of the body would be the plugin configuration params.

## Middleware плагин

Middleware плагины могут менять API, добавляя конечные обработчики или перехватывая запросы.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

> Очень хорошим примером middleware-плагина является [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) и [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* реализация плагина */
}
```

Для регистрации плагина, нам нужен объект с единственным методом, называемым `register_middlewares`, который принимает три аргумента (`expressApp, auth, storage`). *Auth* это экземпляр авторизации и *storage* так же является экземпляром главного хранилища, который предоставит доступ ко всем действиям над ним.

## Плагин хранилища

По умолчанию Verdaccio использует плагин хранилища в файловой системе [local-storage](https://github.com/verdaccio/local-storage), но, начиная с `verdaccio@3.x` вы можете устновить свой плагин хранлища, заменив тем самым поведение по умолчанию.

### API

The storage API is a bit more complex, you will need to create a class that return a `IPluginStorage` implementation. Please see details bellow.

```flow
class LocalDatabase<IPluginStorage>{
  constructor(config: $Subtype<verdaccio$Config>, logger: verdaccio$Logger): ILocalData;
}

interface IPluginStorage {
  logger: verdaccio$Logger;
    config: $Subtype<verdaccio$Config>;
  add(name: string, callback: verdaccio$Callback): void;
  remove(name: string, callback: verdaccio$Callback): void;
  get(callback: verdaccio$Callback): void;
  getSecret(): Promise<string>;
  setSecret(secret: string): Promise<any>;
  getPackageStorage(packageInfo: string): verdaccio$IPackageStorage;
  search(onPackage: verdaccio$Callback, onEnd: verdaccio$Callback, validateName: Function): void;
}

interface IPackageStorageManager {
  path: string;
  logger: verdaccio$Logger;
  writeTarball(name: string): verdaccio$IUploadTarball;
  readTarball(name: string): verdaccio$IReadTarball;
  readPackage(fileName: string, callback: verdaccio$Callback): void;
  createPackage(name: string, value: verdaccio$Package, cb: verdaccio$Callback): void;
  deletePackage(fileName: string, callback: verdaccio$Callback): void;
  removePackage(callback: verdaccio$Callback): void;
  updatePackage(pkgFileName: string,
                updateHandler: verdaccio$Callback,
                onWrite: verdaccio$Callback,
                transformPackage: Function,
                onEnd: verdaccio$Callback): void;
  savePackage(fileName: string, json: verdaccio$Package, callback: verdaccio$Callback): void;
}

class verdaccio$IUploadTarball extends stream$PassThrough {
  abort: Function;
  done: Function;
  _transform: Function;
  abort(): void;
  done(): void;
}

class verdaccio$IReadTarball extends stream$PassThrough {
  abort: Function;
  abort(): void;
}
```

> API хранилища всё ещё остаётся экспериментальным и может измениться в следующих минорных версиях. Для получения актуальной информации о API Хранилища пожалуйста перейдите к [типам определённым в нашем репозитории](https://github.com/verdaccio/flow-types).

### Пример плагина хранилища

Данный список плагинов реализует API Хранилища и может использоваться вами как пример.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Are you willing to contribute with new Storage Plugins? [Click here.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)