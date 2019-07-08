---
id: version-4.1.0-dev-plugins
title: Tworzenie wtyczek
original_id: dev-plugins
---

Istnieje wiele sposobów na rozszerzenie funkcjonalności `verdaccio`, wspierane są następujące rodzaje wtyczek:

* Wtyczki uwierzytelniania
* Wtyczki oprogramowania pośredniego (od wersji `v2.7.0`)
* Wtyczki magazynu danych od wersji (`v3.x`)

> Zalecamy tworzenie wtyczek za pomocą naszych [flow type definitions](https://github.com/verdaccio/flow-types).

## Wtyczka uwierzytelniania

Musimy tylko zwrócić obiekt pojedynczą metodą `authenticate`, która otrzyma 3 argumenty (`user, password, callback`).

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

`apiJWTmiddleware` was introduced on [PR#1227](https://github.com/verdaccio/verdaccio/pull/1227) in order to have full control of the token handler, overriding this method will disable `login/adduser` support. We recommend don't implement this method unless is totally necessary. See a full example [here](https://github.com/verdaccio/verdaccio/pull/1227#issuecomment-463235068).

#### Callback

Po wykonaniu uwierzytelniania mamy 2 opcje na odpowiedź do `verdaccio`.

###### OnError

Gdy coś złego się wydarzy, lub uwierzytelnianie nie powiedzie się.

```flow
callback(null, false)
```

###### OnSuccess

Uwierzytelnianie zakończone sukcesem.

`grupy` to tablica ciągów znaków, w których użytkownik jest częścią.

     callback(null, groups);
    

### Przykład

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

Konfiguracja będzie wyglądać następująco:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Where `htpasswd` is the sufix of the plugin name. eg: `verdaccio-htpasswd` and the rest of the body would be the plugin configuration params.

## Wtyczka oprogramowania pośredniego

Wtyczki pośrednie mają możliwość modyfikowania warstwy API, dodając nowe punkty końcowe lub przechwytywania żądań.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

> Całkiem dobry przykład wtyczki pośredniej to [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) i <a href = "https://github.com/ verdaccio / verdaccio-audit ">verdaccio-audit</a>.

### API

```js
funkcja register_middlewares(expressApp, authInstance, storageInstance) {
   /* więcej rzeczy */
}
```

Aby zarejestrować oprogramowanie pośrednie potrzebujemy obiekt z pojedynczą metodą `register_middlewares`, która otrzyma 3 argumenty (`expressApp, auth, storage`). *Auth* to instancja uwierzytelniania, a *storage* to także główna instancja Storage, która zapewnia dostęp do wszystkich działań związanych z pamięcią masową.

## Wtyczka magazynu danych

Verdaccio domyślnie używa wtyczki pamięci masowej do systemu plików [lokalnego magazynu](https://github.com/verdaccio/local-storage), ale od `verdaccio@3.x` możesz podłączyć niestandardową pamięć masową zastępując zachowanie domyślne.

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

> API magazynu danych jest nadal w fazie eksperymentalnej i może się zmienić w następnej pomniejszej wersji. Aby uzyskać więcej informacji na temat Magazynu API, skorzystaj z [typów definicji w naszym oficjalnym repozytorium](https://github.com/verdaccio/flow-types).

### Storage Examples

Poniższa lista wtyczek wdraża API magazynu danych oraz mogą być użyte jako przykład.

* [pamięć-verdaccio](https://github.com/verdaccio/verdaccio-memory)
* [magazyn-lokalny](https://github.com/verdaccio/local-storage)
* [verdaccio-chmura-google](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-magazyn-s3](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Are you willing to contribute with new Storage Plugins? [Click here.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)

## Theme Plugin

The plugin must return a function that returns a **string**. The string should be the absolute location of the root of your user interface.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

It is imporant that the name of the plugin **must start with `verdaccio-theme-` prefix**.

### Theme Example

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): The default Verdaccio theme based in React.js.

## Filter Plugin

Since [`4.1.0`](https://github.com/verdaccio/verdaccio/pull/1313)

Filter plugins were introduced due a [request](https://github.com/verdaccio/verdaccio/issues/818) in order to be able to filter metadata from uplinks.

More [info in the PR](https://github.com/verdaccio/verdaccio/pull/1161).

```yaml
filters:  
   storage-filter-blackwhitelist:
     filter_file: /path/to/file
```

### API

The method `filter_metadata` will allow you to filter metadata that comes from any uplink, it is `Promise` based and has to return the same metadata modified.

> Do not remove properties frm the metadata, try to do not mutate rather return a new object.

    interface IPluginStorageFilter<T> extends IPlugin<T> {
        filter_metadata(packageInfo: Package): Promise<Package>;
    }