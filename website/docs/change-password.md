---
id: change-password
title: 'Changing a password'
---

With the `changePassword` flag on, users can change their own password from the
web UI instead of asking an administrator to rewrite the credentials file.

:::info Off by default, but not experimental
This is a long-standing feature gated by the `changePassword`
[feature flag](configuration#experiments), which is `false` unless you turn it
on.
:::

## Enabling it {#enabling}

```yaml
flags:
  changePassword: true
```

Restart the registry. This registers `PUT /-/verdaccio/sec/reset_password` and
adds the form at `/-/web/change-password`; with the flag off neither exists and
the route answers `404`.

## How it works {#how-it-works}

The form asks for the current password and the new one twice. The registry
identifies you from **the token of your session**, never from anything typed in
the form, and then asks your [authentication plugin](authentication) to make the
change. The default htpasswd plugin rewrites the hash in the htpasswd file.

The current password is verified before anything changes, so a session on its
own is not enough to set a new one.

Your new password must satisfy `server.passwordValidationRegex` if you have set
it; otherwise the registry answers `401` with a password-too-short error.

## You have to be signed in {#signed-in}

:::caution Confusing entry point
The endpoint requires an active session, because the account it changes is taken
from your token. Open `/-/web/change-password` **while signed in**.

The web UI also shows a "change password" link inside the login dialog, which is
only ever displayed to visitors who are _not_ signed in. Following it from there
leads to a form that cannot succeed: the request goes out anonymously and the
registry answers `401`, which the UI reports as a generic failure to change the
password. Sign in first, then open the page.
:::

The form also asks for a username. It is not sent to the registry and has no
effect on which account is changed — that always comes from your session.

## Plugin support {#plugins}

Changing a password is delegated to the authentication plugin, and not every
plugin can do it. The bundled htpasswd plugin implements it. A plugin backed by
a directory it does not own — LDAP or an identity provider, for example —
typically does not, and the request fails even with the flag on. See
[auth plugins](plugin-auth) for the callback involved.
