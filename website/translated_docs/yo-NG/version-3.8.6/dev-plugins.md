---
id: version-3.8.6-dev-plugins
title: Ṣiṣe agbedide Awọn ohun elo
original_id: dev-plugins
---

Awọn ọna pupọ lo wa lati fa `verdaccio` gun si, iru awọn ohun elo ti atilẹyin wa fun ni:

* Awọn ohun elo Ifasẹsi
* Awọn ohun elo Middleware (lati `v2.7.0`)
* Awọn ohun elo Ibi ipamọ lati (`v3.x`)

> A ṣe igbaniyanju agbedide awọn ohun elo afikun nipa lilo [awọn itumọ iru ilana](https://github.com/verdaccio/flow-types) wa.

## Ohun elo Ifasẹsi

Ni pataki julọ a ni lati da ohun kan pada pẹlu ọna kan ti a n pe ni `ifasẹsi` ti o ma gba awọn ariyanjiyan mẹta (`olumulo, ọrọ igbaniwọle, ipe pada`).

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

> `adduser`, `allow_access` ati `allow_publish` nikan ni o jẹ aṣayan, verdaccio pese apadabọsi ni gbogbo awọn iṣẹlẹ bẹẹ.

#### Ipepada

Lọgan ti ifasẹsi naa ti waye awọn aṣayan meji lo wa lati fun `verdaccio` ni esi.

###### OnError

Boya a jẹ wipe ohun buburu kan sẹlẹ tabi ifasẹsi ko jẹ aṣeyọri.

```flow
callback(null, false)
```

###### OnSuccess

Ifasẹsi naa jẹ aṣeyọri.

`awọn ẹgbẹ` jẹ oriṣi eto ti awọn okun nibi ti olumulo naa ti jẹ ara ti.

     callback(null, groups);
    

### Apẹẹrẹ

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

Atipe iṣeto naa yoo dabi:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Nibi ti `htpasswd` ti jẹ afikun ipari ti orukọ ohun elo naa. fun apẹẹrẹ: `verdaccio-htpasswd` ati awọn iyoku ti ara ma jẹ awọn odiwọn iṣeto ohun elo naa.

## Ohun elo Middleware

Awọn ohun elo Middleware ni agbara lati ṣe ayipada ipele API naa, boya sise afikun awọn aaye opin tuntun tabi ṣiṣe idalọna awọn ibeere.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

> Apẹẹrẹ didara julọ kan ti o jẹ ti ohun elo middleware ni [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) ati [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

To register a middleware we need an object with a single method called `register_middlewares` that will recieve 3 arguments (`expressApp, auth, storage`). *Auth* is the authentification instance and *storage* is also the main Storage instance that will give you have access to all to the storage actions.

## Ohun elo Ibi ipamọ

Verdaccio by default uses a file system storage plugin [local-storage](https://github.com/verdaccio/local-storage), but, since `verdaccio@3.x` you can plug in a custom storage replacing the default behaviour.

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

> API Ibi ipamọ ṣi jẹ onidanwo atipe o le yipada ninu awọn ẹya kekere ti o n bọ. Fun alaye siwaju sii nipa API Ibi ipamọ jọwọ tẹle [iru awọn itumọ ninu ibi ipamọ wa](https://github.com/verdaccio/flow-types).

### Storage Plugins Examples

The following list of plugins are implementing the Storage API and might be used them as example.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Are you willing to contribute with new Storage Plugins? [Click here.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)