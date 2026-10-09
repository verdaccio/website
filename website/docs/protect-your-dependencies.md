---
id: protect-your-dependencies
title: 'Protecting packages'
description: 'Stop private packages from being published or read by the wrong people, and avoid dependency confusion with upstream registries.'
---

import { ProtectedInstall } from '@site/src/components/terminal/Examples';

Verdaccio lets you decide who can **read** and who can **publish** each package. You do that in the `packages` section of the configuration, see [package access](packages.md) for every option.

### Key terms {#key-terms}

| Term                            | What it means                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `access`                        | Who can **read** (install) the package.                                            |
| `publish`                       | Who can publish new versions.                                                      |
| `unpublish`                     | Who can remove versions. Falls back to `publish` when you leave it out.            |
| `$all`                          | **Everyone**, including visitors who are not logged in.                            |
| `$authenticated`                | **Any logged-in user**.                                                            |
| `$anonymous`                    | Only visitors who are **not** logged in. Logged-in users are excluded.             |
| a group or user name            | Members of that group, for example `admin`, or a single user, for example `alice`. |
| several values, space separated | The user needs to belong to **at least one** of them, for example `admin teamA`.   |

The patterns (`'my-company-*'`, `'@scope/*'`, `'**'`) are matched from top to bottom and the **first match wins**, so put the most specific ones first and keep `'**'` last. How each group is assigned is explained in [groups](packages.md#groups).

### Common recipes {#recipes}

**Anyone can install, only logged-in users publish** (the default):

```yaml
'**':
  access: $all
  publish: $authenticated
```

**Everything is private, you must log in even to install:**

```yaml
'**':
  access: $authenticated
  publish: $authenticated
```

**Only a team can read, only maintainers publish:**

```yaml
'my-company-*':
  access: admin teamA teamB
  publish: admin
```

**Read-only mirror, nobody publishes** (an empty `publish` matches nobody):

```yaml
'**':
  access: $all
  proxy: npmjs
```

### Package configuration {#package-configuration}

Let's see for instance the following set up. You have a set of dependencies that are prefixed with `my-company-*` and you need to protect them from anonymous or other non-authorized logged-in users.

```yaml
'my-company-*':
  access: admin teamA teamB teamC
  publish: admin teamA
```

With this configuration, we allow the groups **admin** and **teamA** to _publish_ and **teamA**, **teamB** and **teamC** to _access_ the specified dependencies.

### Use case: teamD tries to access the dependency {#use-case-teamd-tries-to-access-the-dependency}

So, if I am logged as **teamD**, I shouldn't be able to access any dependency that matches the `my-company-*` pattern. I won't have access to them and they also won't be visible in the web interface for user **teamD**. If I try to install one, with `npm` or with `yarn`, the registry answers with a `403 Forbidden`:

<ProtectedInstall />
