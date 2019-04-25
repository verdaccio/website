---
id: version-4.0.0-alpha.5-dev-plugins
title: Sviluppare Estensioni
original_id: dev-plugins
---

Esistono diversi modi di ampliare `verdaccio`, i tipi di estensioni supportati sono:

* Plugin di autenticazione
* Plugin Middleware (da `v2.7.0`)
* Plugin di archiviazione da (`v3.x`)

> Consigliamo di sviluppare estensioni utilizzando le nostre [definizioni di tipo di flusso](https://github.com/verdaccio/flow-types).

## Plugin di autenticazione

Fondamentalmente dobbiamo restituire un oggetto con un unico metodo chiamato `authenticate` che riceverà 3 argomenti (`user, password, callback`).

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

Una volta che l'autenticazione viene eseguita, esistono 2 possibili opzioni per dare una risposta a `verdaccio`.

###### OnError

Nel caso in cui qualcosa sia andato storto oppure l'auth sia fallita.

```flow
callback(null, false)
```

###### OnSuccess

Nel caso in cui l'auth sia andata a buon fine.

`groups` è un array di stringhe di cui l'utente fa parte.

     callback(null, groups);
    

### Esempio

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

E la configurazione apparirà così:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Dove `thpasswd` è il suffisso del nome del plugin. ad esempio: `verdaccio-htpasswd` e il resto del corpo sarebbero l parametri di configurazione del plugin.

## Plugin Middleware

Le estensioni Middleware possiedono la capacità di modificare il livello API, aggiungendo nuovi endpoint o intercettando richieste.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

Il metodo fornisce l'accesso completo all'autenticazione e all'archiviazione tramite `auth` e `storage`. `app` è l'applicazione espressa che consente di aggiungere nuovi endpoint.

> Un bell'esempio di plugin middleware è il [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) ed il [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

Per registrare un middleware necessitiamo di un oggetto con un unico metodo chiamato `register_middlewares` il quale riceverà 3 argomenti (`expressApp, auth, storage`). *Auth* è l'istanza di autenticazione e *storage* è anche la principale istanza di Archiviazione che darà accesso a tutte le azioni di memorizzazione.

## Plugin di archiviazione

Verdaccio di default utilizza un'estensione di archiviazione del file system [local-storage](https://github.com/verdaccio/local-storage), ma, dalla versione di `verdaccio@3.x` in poi è possibile collegarne una personalizzata che sostituisca la condotta predefinita.

### API

L'API di archiviazione è un po' più complessa, è necessario creare una classe che restituisca un'implementazione `IPluginStorage`. Si prega di leggere i dettagli qui sotto.

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

> L'API di archiviazione è ancora in via sperimentale e potrebbe cambiare nelle successive versioni minori. Per ulteriori informazioni sull'API di archiviazione si prega di seguire le [ definizioni dei tipi nel nostro archivio ufficiale](https://github.com/verdaccio/flow-types).

### Esempi di Plugin di Archiviazione

Il seguente è un elenco di estensioni che utilizzano l'API di archiviazione e che potrebbero essere utilizzate come esempio.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Sei disponibile a contribuire a nuovi Plugin di Archiviazione? [Clicca qui.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)