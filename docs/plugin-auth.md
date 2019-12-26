---
id: plugin-auth
title: "Authentication Plugin"
---

# What's an Authentication Plugin?

dasdsa [dasdsa](plugin-generator.md) dasdsa


## Getting Started



## Authentication Plugin

Basically we have to return an object with a single method called `authenticate` that will recieve 3 arguments (`user, password, callback`).

### API

```typescript
  type AuthAccessCallback = (error: string | null, access: boolean) => void;
  type AuthCallback = (error: string | null, groups: string[] | false) => void;

  interface IPluginAuth<T> extends IPlugin<T> {
    authenticate(user: string, password: string, cb: AuthCallback): void;
    adduser?(user: string, password: string, cb: AuthCallback): void;
    changePassword?(user: string, password: string, newPassword: string, cb: AuthCallback): void;
    allow_publish?(user: RemoteUser, pkg: T & PackageAccess, cb: AuthAccessCallback): void;
    allow_access?(user: RemoteUser, pkg: T & PackageAccess, cb: AuthAccessCallback): void;
    allow_unpublish?(user: RemoteUser, pkg: T & PackageAccess, cb: AuthAccessCallback): void;
    allow_publish?(user: RemoteUser, pkg: AllowAccess & PackageAccess, cb: AuthAccessCallback): void;
    allow_access?(user: RemoteUser, pkg: AllowAccess & PackageAccess, cb: AuthAccessCallback): void;
    allow_unpublish?(user: RemoteUser, pkg: AllowAccess & PackageAccess, cb: AuthAccessCallback): void;
    apiJWTmiddleware?(helpers: any): Function;
  }

```
> Only `adduser`, `allow_access`, `apiJWTmiddleware`, `allow_publish`  and `allow_unpublish` are optional, verdaccio provide a fallback in all those cases.

#### apiJWTmiddleware method

Since `v4.0.0`

`apiJWTmiddleware` was introduced on [PR#1227](https://github.com/verdaccio/verdaccio/pull/1227) in order to have full control of the token handler, overriding this method will disable `login/adduser` support. We recommend don't implement this method unless is totally necessary. See a full example [here](https://github.com/verdaccio/verdaccio/pull/1227#issuecomment-463235068).

#### Callback

Once the authentication has been executed there is 2 options to give a response to `verdaccio`.

###### OnError

Either something bad happened or auth was unsuccessful.

```typescript
callback(null, false)
```

###### OnSuccess

The auth was successful.


`groups` is an array of strings where the user is part of.

```
 callback(null, groups);
```

### Example

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
Where `htpasswd` is the sufix of the plugin name. eg: `verdaccio-htpasswd` and the rest of the body would be the plugin configuration params.

### List Community Authentication Plugins

