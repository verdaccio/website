---
id: authentication
title: 'Authentication'
description: 'How authentication works: the default htpasswd plugin and its hashing algorithms, the built-in groups, and how access is resolved with a custom plugin.'
---

The authentication is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

The client authentication is handled by the `npm` client itself. Once you log in to the application:

```bash
npm adduser --registry http://localhost:4873
```

A token is generated in the `npm` configuration file hosted in your user home folder. For more information about `.npmrc` read the [official documentation](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Anonymous publish {#anonymous-publish}

`verdaccio` allows you to enable anonymous publish. To achieve that you will need to correctly set up your [packages access](packages.md).

Eg:

```yaml
'my-company-*':
  access: $anonymous
  publish: $anonymous
  proxy: npmjs
```

:::caution
Allowing `$anonymous` to publish is not enough on its own: **npm still refuses to
publish without being logged in**, answering `ENEEDAUTH`, no matter what the
registry permits. This is current behaviour, not a historical quirk — it was
originally reported in
[issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500)
against `npm@5.3.0` and still applies to `npm@11`.

Run `npm adduser` first, even when the package itself needs no permissions.
:::

## Understanding Groups {#understanding-groups}

### The meaning of `$all` and `$anonymous` {#the-meaning-of-all-and-anonymous}

As you know _Verdaccio_ uses `htpasswd` by default. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`.
Thus, _Verdaccio_ will handle that in the following way:

- If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
- If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to your group list.

Please note: `$all` **will match all users, whether logged in or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements
`allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

- **logged in**: `$all` and `$authenticated` + groups added by the plugin.
- **logged out (anonymous)**: `$all` and `$anonymous`.

## Default htpasswd {#default-htpasswd}

In order to simplify the setup, `verdaccio` ships with the `verdaccio-htpasswd` plugin
enabled by default, so a fresh installation authenticates against an `htpasswd` file
without any extra configuration.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000
    # Hash algorithm. The default is "bcrypt"; "md5", "sha1" and "crypt" exist only to
    # keep reading htpasswd files written by other tools.
    algorithm: bcrypt
    # Rounds number for "bcrypt", will be ignored for other algorithms.
    rounds: 10
    # Log a warning when password verification takes longer than this many milliseconds.
    slow_verify_ms: 200
```

:::info The default is `bcrypt`
**You do not need to set `algorithm` to get a secure hash.** On both **6.x** and **7.x**,
omitting it means `bcrypt` with 10 rounds. An unrecognised value also falls back to
`bcrypt`, with a warning in the log.

`md5`, `sha1` and `crypt` are accepted so that Verdaccio can read `htpasswd` files
produced elsewhere. None of them is suitable for a password you care about, so do not
pick them for a new registry. Existing entries hashed with them keep working — they are
only rehashed when the user changes their password.
:::

| Property       | Type   | Required | Example               | Support  | Description                                                                                       |
| -------------- | ------ | -------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| file           | string | Yes      | ./htpasswd            | all      | file that host the encrypted credentials                                                          |
| max_users      | number | No       | 1000                  | all      | set limit of users                                                                                |
| algorithm      | string | No       | bcrypt/md5/sha1/crypt | all      | password hashing algorithm, defaults to `bcrypt`                                                  |
| rounds         | number | No       | 10                    | all      | Rounds number for "bcrypt", will be ignored for other algorithms                                  |
| slow_verify_ms | number | No       | 200                   | 6.x, 7.x | Log a warning when password verification exceeds this duration in milliseconds; defaults to `200` |

> In case you decide to prevent users from signing up themselves, you can set `max_users: -1`.

### Password verification performance {#password-verification-performance}

Basic authentication sends a username and password on each request, so parallel
manifest and tarball downloads can repeat expensive bcrypt checks. Increasing
`rounds` increases both password-hashing and verification cost. `slow_verify_ms`
only controls when a warning is logged; it does not impose a timeout or reduce
the cost of verification. Setting it to `0` falls back to the default of `200` ms.

### Proposed verification cache {#verification-cache}

:::caution Not yet available in 7.x
The `verify_cache_ms` option is proposed in
[verdaccio/verdaccio#6351](https://github.com/verdaccio/verdaccio/pull/6351).
It is not included in the plugin version used by Verdaccio `7.0.0-next-7.30`.
Do not add it to your configuration expecting caching until a release includes it.
:::

The proposal adds `verify_cache_ms` in milliseconds, disabled by default (`0`).
A positive value such as `60000` would cache successful password verifications
and share identical checks already in flight. Failed results would not be cached.
The cache would hold at most 1000 entries, keyed by an HMAC of the username,
password and stored hash with a random per-instance secret. Reloading a changed
password hash or removing a user would prevent existing entries from matching.

Expired entries would be pruned on lookup and insertion, with a timer also
sweeping while idle. Under normal clock progression, entries would be removed
within about twice the configured duration. Someone with access to process memory
could recover the secret and cached HMACs and test password guesses much faster
than bcrypt allows, so the proposed option should use a short duration.

## Two-factor authentication {#two-factor}

Independently of which authentication plugin you use, users can add a
time-based one-time password on top of their password. See
[two-factor authentication](two-factor-authentication.md).
