---
id: plugin-auth
title: "Authentication Plugin"
---

# What's an Authentication Plugin?

Is a sort plugin that allows to handle who access or publish to a specific package. By default the `htpasswd` is built-in, but can
easily be replaced by your own.

 ## Getting Started

The authentication plugins are defined in the `auth:` section, as follows:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
```

also multiple plugins can be chained:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
  anotherAuth:
    foo: bar
    bar: foo
  lastPlugin:
    foo: bar
    bar: foo
```

> If one of the plugin in the chain is able to resolve the request, the next ones will be ignored.

## How to the authentication plugin works?

Basically we have to return an object with a single method called `authenticate` that will recieve 3 arguments (`user, password, callback`).

On each request, `authenticate` will be triggered and the plugin should return the credentials, if the `authenticate` fails, it will fallback to the `$anonymous` role by default.

### API

```typescript
  interface IPluginAuth<T> extends IPlugin<T> {
    authenticate(user: string, password: string, cb: AuthCallback): void;
    adduser?(user: string, password: string, cb: AuthCallback): void;
    changePassword?(user: string, password: string, newPassword: string, cb: AuthCallback): void;
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


## What should I return in each of the methods?

Verdaccio relies on `callback` functions at time of this writing. Each method should call the method and what you returns is important, let's review how to do it.


### `authentication` Callback

Once the authentication has been executed there is 2 options to give a response to `verdaccio`.

##### If the authentication fails

If the auth was unsuccessful, return `false` as the second argument.

```typescript
callback(null, false)
```

##### If the authentication success

The auth was successful.


`groups` is an array of strings where the user is part of.

```
 callback(null, groups);
```

##### If the authentication produce an error

The authentication service might fails, and you might want to reflect that in the user response, eg: service is unavailable.

```
 import { getInternalError } from '@verdaccio/commons-api';

 callback(getInternalError('something bad message), null);
```

> A failure on login is not the same as service error, if you want to notify user the credentails are wrong, just return `false` instead string of groups. The behaviour mostly depends of you.


### `adduser` callback

##### If adduser success

If the service is able to create an user, return `true` as the second argument.

```typescript
callback(null, true)
```

##### If adduser fails

Any other action different than success must return an error.

```typescript
import { getConflict } from '@verdaccio/commons-api';

const err = getConflict('maximum amount of users reached');

callback(err);
```

### `changePassword` callback

##### If the request success

If the service is able to create an user, return `true` as the second argument.

```typescript
const user = serviceUpdatePassword(user, password, newPassword);

callback(null, user)
```

##### If the request fails

Any other action different than success must return an error.

```typescript
import { getNotFound } from '@verdaccio/commons-api';

 const err = getNotFound('user not found');

callback(err);
```

## Example

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

