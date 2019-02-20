---
id: dev-plugins
title: "Phát triển các phần mềm bổ trợ"
---
Có nhiều cách để mở rộng `verdaccio`. Các loại phần mềm bổ trợ là:

* Xác minh các phần mềm bổ trợ
* Phần mềm bổ trợ Middleware (kể từ phiên bản `v2.7.0`)
* Phần mềm bổ trợ lưu trữ từ phiên bản (` v3.x `)

> Chúng tôi khuyên bạn nên phát triển phần mềm bổ trợ bằng cách sử dụng [định nghĩa loại luồng ](https://github.com/verdaccio/flow-types) của chúng tôi.

## Xác minh phần mềm bổ trợ

Cơ bản chúng ta phải trả về một đối tượng với phương thức được gọi là `authenticate`, và sẽ nhận lại 3 tham số (`user, password, callback`).

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

Khi xác thực được thực hiện, có hai tùy chọn để trả lời `verdaccio`.

###### OnError

Hiện lỗi này nghĩa là hoặc xảy ra lỗi hoặc xác thực không thành công.

```flow
callback(null, false)
```

###### OnSuccess

Xác thực thành công.

`groups` là một tập hợp các chuỗi người dùng.

     callback(null, groups);
    

### Ví dụ

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

Cấu hình sẽ trông như thế này:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

Where `htpasswd` is the sufix of the plugin name. eg: `verdaccio-htpasswd` and the rest of the body would be the plugin configuration params.

## Phần mềm bổ trợ Middleware

Phần mềm bổ trợ Middleware có khả năng sửa đổi giao diện API để thêm các điểm cuối mới hoặc chặn các yêu cầu.

```flow
interface verdaccio$IPluginMiddleware extends verdaccio$IPlugin {
  register_middlewares(app: any, auth: IBasicAuth, storage: IStorageManager): void;
}
```

### register_middlewares

The method provide full access to the authentification and storage via `auth` and `storage`. `app` is the express application that allows you to add new endpoints.

> Một ví dụ điển hình về phần mềm bổ trợ Middleware là [ sinopia-github-oauth ](https://github.com/soundtrackyourbrand/sinopia-github-oauth) và <a href = "https: // Github.com/verdaccio/verdaccio-audit">verdaccio-audit </a>.

### API

```js
function register_middlewares(expressApp, authInstance, storageInstance) {
   /* more stuff */
}
```

Bằng cách sử dụng một cách thức duy nhất để đăng ký middleware là `register_middlewares`, chúng ta cần tìm một đối tượng có thể nhận được 3 tham số (` expressApp, auth, storage `) được gọi là. Lớp xác thực *Auth* và lớp lưu trữ chính *storage* cho phép bạn truy cập vào tất cả các hoạt động lưu trữ.

## Phần mềm bổ trợ lưu trữ

Theo mặc định, Verdaccio sử dụng phần mềm bổ trợ lưu trữ hệ thống tệp [local-storage](https://github.com/verdaccio/local-storage), tuy nhiên, từ phiên bản `verdaccio@3.x ` bạn có thể chèn lưu trữ tùy chỉnh thay vì hành vi mặc định.

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

> API lưu trữ vẫn đang trong quá trình chạy thử nghiệm và có thể sẽ được sửa đổi trong phiên bản tiếp theo. Để biết thêm thông tin về API lưu trữ, vui lòng truy cập [ và nhập định nghĩa trong kho lưu trữ chính thức của chúng tôi ](https://github.com/verdaccio/flow-types).

### Những ví dụ về phần mềm bổ trợ bộ nhớ

Dưới đây là danh sách những phần mềm bổ trợ đang sử dụng API lưu trữ và có thể được sử dụng làm ví dụ.

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory)
* [local-storage](https://github.com/verdaccio/local-storage)
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud)
* [verdaccio-s3-storage](https://github.com/Remitly/verdaccio-s3-storage/tree/s3)

> Bạn đã sẵn sàng đóng góp vào phần mềm bổ trợ lưu trữ mới chưa? [Nhấp vào đây.](https://github.com/verdaccio/verdaccio/issues/103#issuecomment-357478295)