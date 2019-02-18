---
id: dev-plugins
title: "Developing Plugins"
---
Ima mnogo načina da proširite `verdaccio`, tipovi podržanih plugin-a su:

* Authentication plugins
* Middleware plugins (od verzije `v2.7.0`)
* Storage plugins (od verzije `v3.x`)

> Preporučujemo developing plugins koji koriste naše [flow type definicije](https://github.com/verdaccio/flow-types).

## Authentication Plugin

U suštini treba da vratimo objekat korišćenjem metode zvane `authenticate` koja prima 3 argumenta (`user, password, callback`).

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

Jednom kada se autentifikacija izvrši, na raspolaganju su 2 opcije koje daju odgovor `verdaccio-u`.

###### OnError

Ili se nešto loše dogodilo ili auth nije bila uspešna.

```flow
callback(null, false)
```

###### OnSuccess

Auth je uspešno objavljena.

`groups` čini niz stringova u koji spada korisnik.

     callback(null, groups);
    

### Primer

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

I na kraju, konfiguracija izgleda ovako:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Where `htpasswd` is the sufix of the plugin name. eg: `verdaccio-htpasswd` and the rest of the body would be the plugin configuration params.

## Middleware Plugin

Middleware plugins imaju moć da modifikuju API layer, bilo dodavanjem novih endpoints ili intercepting zahteva.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

> Prilično dobri primeri za middleware plugin su [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) i [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

Kako bismo registrovali middleware, potreban nam je objekat sa jedinstvenim metodom zvanim `register_middlewares` koji će primiti 3 argumenta (`expressApp, auth, storage`). *Auth* je instanca za autentifikaciju, a *storage* je takođe glavna instanca za Storage koja će Vam dati pristup svim akcijama koje se odnose na storage.

## Storage Plugin

Verdaccio po fabričkim podešavanjima koristi file system storage plugin [local-storage](https://github.com/verdaccio/local-storage), ali, počevši od verzije `verdaccio@3.x` možete ubaciti custom storage plugin i tako zameniti postojeći način izvršavanja (behaviour).

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

> Storage API je i dalje u eksperimentalnoj fazi i moguće je da će pretrpeti neke izmene u narednim verzijama. Za više informacija o Storage API molimo Vas da pratite [types definicije u našem zvaničnom repozitorijumu](https://github.com/verdaccio/flow-types).

### Primeri za Storage Plugins

Navedena lista plugina implementuje Storage API i možete ih koristiti kao primere.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Da li ste voljni da date doprinos razvoju novih Storage Plugins? [Kliknite ovde.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)