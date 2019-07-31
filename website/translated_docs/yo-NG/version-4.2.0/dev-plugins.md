---
id: version-4.2.0-dev-plugins
title: Ṣiṣe agbedide Awọn ohun elo
original_id: dev-plugins
---

Awọn ọna pupọ lo wa lati fa `verdaccio` gun si, iru awọn ohun elo ti atilẹyin wa fun ni:

* Awọn ohun elo Middleware (lati `v2.7.0`)

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
  apiJWTmiddleware(user: RemoteUser, pkg: $Subtype<PackageAccess>, cb: Callback): void;
  allow_publish(helpers): void;
}
```

> `adduser`, `allow_access`, `apiJWTmiddleware` ati `allow_publish` nikan ni o jẹ aṣaayan, verdaccio pese apadabọsi ni gbogbo awọn iṣẹlẹ bẹẹ.

#### ilana apiJWTmiddleware

Lati `v4.0.0`

`apiJWTmiddleware` jẹ sisafihan lori [PR#1227](https://github.com/verdaccio/verdaccio/pull/1227) lati le ni iṣakoso ti olutọju aami ni kikun, fifagbara bori ọna yii ma yọ atilẹyin `login/adduser`. A ṣe igbaniyanju pe ki o ma se ṣe amulo ọna yii ayafi ti o ba pọn dandan. Wo apẹẹrẹ ni kikun kan [nibi](https://github.com/verdaccio/verdaccio/pull/1227#issuecomment-463235068).

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

Ọna naa n pese iwọle kikun si sise ifasẹsi ati ibi ipamọ nipasẹ `auth` ati `storage`. `app` jẹ ohun elo ologere ti o n fayegba ọ lati se afikun awọn aaye opin tuntun.

> Apẹẹrẹ didara julọ kan ti o jẹ ti ohun elo middleware ni [sinopia-github-oauth](https://github.com/soundtrackyourbrand/sinopia-github-oauth) ati [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit).

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

Lati ṣe iforukọsilẹ middleware kan a nilo ohun kan pẹlu ọna kan ṣoṣo ti a n pe ni `register_middlewares` ti yoo gba awọn ariyanjiyan mẹta (`expressApp, auth, storage`). *Auth* ni isẹlẹ sise ifasẹsi ati *storage* tun jẹ isẹlẹ Ibi ipamọ to se koko julọ ti yoo fun ọ ni iwọle si gbogbo awọn igbesẹ ibi ipamọ.

## Ohun elo Ibi ipamọ

Verdaccio ni atilẹwa n lo ohun elo ibi ipamọ eto faili [local-storage](https://github.com/verdaccio/local-storage),ṣugbọn, lati `verdaccio@3.x` o le se asomọ ibi ipamọ akanṣe kan ti o rọpo ihuwasi atilẹwa.

### API

API ti Ibi ipamọ jẹ eyi ti o le diẹ, o ma nilo lati ṣẹda kilasi kan ti o n se idapada imuṣiṣẹ `IPluginStorage`. Jọwọ wo alaye labẹ yii.

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

### Awọn apẹẹrẹ Ibi ipamọ

Awọn akojọ ti awọn afikun wọnyi n ṣe imuṣiṣẹ API Ibi ipamọ naa atipe o le jẹ lilo bi apẹẹrẹ.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Ṣe o setan lati ṣe ilọwọsi pẹlu Awọn ohun elo Ibi ipamọ tuntun? [Tẹ ibi.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)

## Ohun elo Akori

Ohun elo naa gbọdọ ṣe idapada iṣẹ kan ti o n ṣe idapada **okun**. Okun naa yẹ ki o jẹ ọgangan ipo ti gbongbo ti intafeesi olumulo rẹ.

### API

```javascript
const path = require('path');

module.exports = (...arguments) => {
  return path.join(__dirname, 'static');
};
```

O jẹ pataki pe orukọ ohun elo naa **gbọdọ bẹrẹ pẹlu afikun iṣaaju `verdaccio-theme-`**.

### Apẹẹrẹ Akori

* [@verdaccio/ui-theme](https://github.com/verdaccio/ui): Akori atilẹwa Verdaccio to da lori React.js.

## Ohun elo Asẹ

Lati [`4.1.0`](https://github.com/verdaccio/verdaccio/pull/1313)

Awọn ohun elo asẹ jẹ ṣiṣe nitori [ibeere fun](https://github.com/verdaccio/verdaccio/issues/818) lati le ni anfani lati ya metadata sọtọ kuro ni ara awọn uplink.

Alaye siwaju si [wa ninu PR](https://github.com/verdaccio/verdaccio/pull/1161).

```yaml
filters:  
   storage-filter-blackwhitelist:
     filter_file: /path/to/file
```

### API

Ọna `filter_metadata` naa yoo gba ọ laaye lati ya metadata ti o wa lati eyikeyi uplink sọtọ, o jẹ eyi to da lori `Ileri` ati pe o ni lati tun da metadata kanna pada pẹlu atunṣe.

> Do not remove properties from the metadata, try to do not mutate rather return a new object.

    interface IPluginStorageFilter<T> extends IPlugin<T> {
        filter_metadata(packageInfo: Package): Promise<Package>;
    }