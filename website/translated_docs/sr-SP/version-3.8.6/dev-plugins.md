---
id: version-3.8.6-dev-plugins
title: Developing Plugins
original_id: dev-plugins
---
Има много начина да проширите `verdaccio`, типови подржаних plugin-а су:

* Authentication plugins
* Middleware plugins (од верзије `v2.7.0`)
* Storage plugins (од верзије `v3.x`)

> Препоручујемо developing plugins који користе наше [flow type дефиниције](https://github.com/verdaccio/flow-types).

## Authentication Plugin

У суштини треба да вратимо објекат коришћењем методе зване `authenticate` која прима 3 аргумента (`user, password, callback`).

### API

```flow
interface IPluginAuth extends IPlugin {
  login_url?: string;
  authenticate(user: string, password: string, cb: Callback): void;
  adduser(user: string, password: string, cb: Callback): void;
  allow_access(user: RemoteUser, pkg: $Subtype<PackageAccess>, cb: Callback): void;
  allow_publish(user: RemoteUser, pkg: $Subtype<PackageAccess>, cb: Callback): void;
}
```

> Једини опциони су `adduser`, `allow_access` и `allow_publish` и verdaccio омогућава fallback у свим наведеним случајевима.

#### Callback

Једном када се аутентификација изврши, на располагању су 2 опције које дају одговор `verdaccio-у`.

###### OnError

Или се нешто лоше догодило или auth није била успешна.

```flow
callback(null, false)
```

###### OnSuccess

Auth је успешно објављена.

`groups` чини низ стрингова у који спада корисник.

     callback(null, groups);
    

### Пример

```javascript
function Auth(config, stuff) {
  var self = Object.create(Auth.prototype);
  self._users = {};

  // config for this module
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

И на крају, конфигурација изгледа овако:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

При чему је `htpasswd` суфикс за име плугина. пример: `verdaccio-htpasswd` и остатак body секције ће дати параметре за конфигурисање плугина.

## Middleware Plugin

Middleware plugins имају моћ да модификују API layer, било додавањем нових endpoints или intercepting захтева.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

Метод обезбеђује пуни приступ аутентификацији и простору за складиштење (storage) преко `auth` и `storage`. `app` је експрес апликација која Вам омогућава да додајете нове крајње тачке (endpoints).

> Прилично добри примери за middleware plugin су [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) и [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

Како бисмо регистровали middleware, потребан нам је објекат са јединственим методом званим `register_middlewares` који ће примити 3 аргумента (`expressApp, auth, storage`). *Auth* jе инстанца за аутентификацију, а *storage* је такође главна инстанца за Storage која ће Вам дати приступ свим акцијама које се односе на storage.

## Storage Plugin

Verdaccio по фабричким подешавањима користи file system storage plugin [local-storage](https://github.com/verdaccio/local-storage), али, почевши од верзије `verdaccio@3.x` можете убацити custom storage plugin и тако заменити постојећи начин извршавања (behaviour).

### API

За storage API, ствари су нешто компликованије, пошто ћете морати да креирате класу која враћа `IPluginStorage` имплементацију. Испод имате детаљно објашњење.

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

> Storage API је и даље у експерименталној фази и могуће је да ће претрпети неке измене у наредним верзијама. За више информација о Storage API молимо Вас да пратите [types дефиниције у нашем званичном репозиторијуму](https://github.com/verdaccio/flow-types).

### Примери за Storage Plugins

Наведена листа plugina имплементује Storage API и можете их користити као примере.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Да ли бисте желели да допринесете развоју нових Storage Plugina? [Кликните овде.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)