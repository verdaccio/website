---
id: user-registration
title: 'User registration'
---

With the `createUser` flag on, the web UI grows a sign-up form so people can
create their own account from the browser instead of an administrator adding
them by hand.

:::info Off by default, but not experimental
This is a long-standing feature gated by the `createUser`
[feature flag](configuration#experiments), which is `false` unless you turn it
on. Self-registration is a deliberate choice, so it is never enabled for you.
:::

## Enabling it {#enabling}

```yaml
flags:
  createUser: true
```

Restart the registry. This adds the sign-up screen to the web UI and registers
the endpoint behind it; with the flag off, neither exists.

## What it does and does not cover {#scope}

The flag governs **registration from the web UI only**.

Registering from the command line — `npm adduser` — goes through the registry's
own user endpoint and is **not** affected by this flag. Whether it succeeds is
decided by your [authentication plugin](authentication). With the default
htpasswd plugin, `max_users` is the setting that controls it:

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # -1 refuses every registration, including npm adduser
    max_users: 100
```

So turning `createUser` off does not close the door on its own. If your intent
is that nobody registers themselves, set `max_users: -1` as well.

## Who can then do what {#permissions}

Creating an account and being allowed to read or publish are separate matters. A
freshly registered user is simply authenticated; what they can reach is decided
by your [package access rules](packages). Registration is only worth enabling
alongside rules that do not hand `$authenticated` more than you intend:

```yaml
packages:
  '@my-company/*':
    access: $authenticated
    publish: $authenticated # every self-registered account could publish here
```

Review those rules before opening registration on a registry reachable beyond
your network.
