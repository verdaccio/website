---
id: dev-plugins
title: "Criando Plugins"
---

Existem muitas maneiras de estender o `verdaccio`, os tipos de plugins suportados são:

* Plugins de autenticação
* Plugins middleware (A partir da `v2.7.0`)
* Plugins de armazenamento (A partir da `v3.x`)

> Recomendamos o desenvolvimento de extensões usando nossas [definições de tipo de fluxo](https://github.com/verdaccio/flow-types).

## Plugin de Autenticação

Basicamente, temos que retornar um objeto com um único método chamado `authenticate` que receberá 3 argumentos (`user, password, callback`).

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

> Apenas `adduser`, `allow_access`, `apiJWTmiddleware` e `allow_publish` são opcionais, o verdaccio fornece uma solução de fallback em todos esses casos.

#### método apiJWTmiddleware

A partir da `v4.0.0`

`apiJWTmiddleware` foi introduzido na [PR#1227](https://github.com/verdaccio/verdaccio/pull/1227) para ter controle total do gestor de token, sobrescrever este método irá desativar o suporte ao `login/adduser`. Recomendamos não implementar este método a menos que seja totalmente necessário. Veja um exemplo completo [aqui](https://github.com/verdaccio/verdaccio/pull/1227#issuecomment-463235068).

#### Callback

Once the authentication has been executed there is 2 options to give a response to `verdaccio`.

###### OnError

Either something bad happened or auth was unsuccessful.

```flow
callback(null, false)
```

###### OnSuccess

The auth was successful.

`groups` is an array of strings where the user is part of.

     callback(null, groups);
    

### Exemplo

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

And the configuration will looks like:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Onde `htpasswd` é o sufixo do nome do plugin. Exemplo: `verdaccio-htpasswd` e o resto do corpo seriam os parâmetros de configuração do plugin.

## Plugin Middleware

Middleware plugins have the capability to modify the API layer, either adding new endpoints or intercepting requests.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

O método fornece acesso total à autenticação e armazenamento via `auth` e `storage`. `app` é o aplicativo rápido que permite adicionar novos endpoints.

> Um bom exemplo de plugin de middleware é o [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) e [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

To register a middleware we need an object with a single method called `register_middlewares` that will recieve 3 arguments (`expressApp, auth, storage`). *Auth* is the authentification instance and *storage* is also the main Storage instance that will give you have access to all to the storage actions.

## Plugin de Armazenamento

Verdaccio by default uses a file system storage plugin [local-storage](https://github.com/verdaccio/local-storage), but, since `verdaccio@3.x` you can plug in a custom storage replacing the default behaviour.

### API

A API de armazenamento é um pouco mais complexa, você precisará criar uma classe que retorne uma implementação `IPluginStorage`. Por favor, veja os detalhes abaixo.

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

> A API de armazenamento ainda é experimental e pode mudar nas próximas versões secundárias. Para mais informações sobre a API de Armazenamento, siga as [definições de tipo em nosso repositório oficial](https://github.com/verdaccio/flow-types).

### Exemplos de Armazenamento

The following list of plugins are implementing the Storage API and might be used them as example.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Você está disposto a contribuir com novos plugins de armazenamento? [Clique aqui.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)

## Plugin de Tema

O plugin deve retornar uma função que retorna uma **string**. A string deve ser a localização absoluta da root da sua interface de usuário.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

É importante que o nome do plugin **deve começar com o prefixo `verdaccio-theme-`**.

### Exemplo de Tema

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): O tema padrão do Verdaccio é baseado no React.js.

## Plugin de Filtro

A partir da [`v4.1.0`](https://github.com/verdaccio/verdaccio/pull/1313)

Os plugins de filtro foram introduzidos sob [solicitação](https://github.com/verdaccio/verdaccio/issues/818) para possibilitar a filtragem de metadados de uplinks.

Mais [informações na PR](https://github.com/verdaccio/verdaccio/pull/1161).

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