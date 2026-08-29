---
id: staged-publishing
title: 'Staged publishing'
---

Staged publishing puts a review step in front of every publish. A version is
uploaded to the registry but stays invisible to installs until a maintainer
looks at it and approves it. If nobody approves it, it never becomes a real
version.

It is driven entirely by `npm stage`, so no extra tooling is needed on the
client side.

:::caution
This is an experimental feature behind the `stage` flag. It is off by default,
and the shape of the flag or its behaviour may change in a future release. See
[feature flags](configuration#experiments).
:::

## Requirements {#requirements}

- **npm 11.17 or newer** on the client. `npm stage` does not exist in older
  versions, and there is no Yarn or pnpm equivalent yet.
- A storage plugin, which is anything that works with Verdaccio today. Staged
  versions go through the same storage interface as everything else.

## Enabling it {#enabling}

```yaml
flags:
  stage: true
```

Restart the registry afterwards: the configuration is read at startup.

To confirm it is on, the flag is reported to the web UI and you can read it back
from a running server:

```bash
curl -s http://localhost:4873/-/static/ui-options.js | grep -o '"stage":[^,]*'
# "stage":true
```

With the flag off, none of the routes below exist and the registry behaves
exactly as it always has.

## The flow {#flow}

```
npm stage publish        the version is uploaded but not installable
npm stage list           maintainers see what is waiting
npm stage view <id>      inspect the metadata
npm stage download <id>  inspect the actual tarball
        │
        ├── npm stage approve <id>   published for real, installable now
        └── npm stage reject <id>    record and tarball deleted, never existed
```

### Staging a version {#staging}

From the package directory, exactly where you would run `npm publish`:

```bash
npm stage publish
```

```
npm notice Staging to http://localhost:4873/ with tag latest and default access
+ my-package@1.0.0 (staged with id 9efe8b0c-50b3-4183-ba3f-c46dfc784adb)
```

`--tag` works as usual, so `npm stage publish --tag beta` stages the version to
be published under `beta` once approved.

At this point the version does **not** exist as far as installs are concerned:

```bash
npm view my-package
# npm error 404 'my-package' is not in this registry
```

### Reviewing what is waiting {#reviewing}

```bash
npm stage list
```

```
id: 9efe8b0c-50b3-4183-ba3f-c46dfc784adb
package name: my-package
version: 1.0.0
tag: latest
date staged: 2026-08-29T14:21:45.777Z
staged by: alice (user)
shasum: 54ec43441cacc23ad02ecec43ab46037b0e98aeb
access: public
```

`npm stage list <package-name>` narrows the list to one package, and
`--json` gives you the raw records, which is what you want in a script:

```bash
npm stage list --json | jq -r '.[0].id'
```

The list only shows what you are allowed to see — see
[who can do what](#permissions).

### Inspecting before approving {#inspecting}

`npm stage view <id>` repeats the metadata for a single item. The interesting
one is:

```bash
npm stage download <id>
```

This downloads the staged tarball and prints its contents, so you can check what
is actually in the package before it becomes installable:

```
npm notice Tarball Contents
npm notice 24B index.js
npm notice 274B package.json
npm notice Tarball Details
npm notice name: my-package
npm notice shasum: 54ec43441cacc23ad02ecec43ab46037b0e98aeb
my-package-1.0.0-9efe8b0c-50b3-4183-ba3f-c46dfc784adb.tgz
```

The `shasum` matches the one npm computed when it packed the tarball, so you can
verify nothing changed in transit.

### Approving {#approving}

```bash
npm stage approve 9efe8b0c-50b3-4183-ba3f-c46dfc784adb
```

```
Staged package 9efe8b0c-50b3-4183-ba3f-c46dfc784adb approved and published successfully.
```

Approval replays the ordinary publish path, so everything that normally happens
on a publish happens here too: the version is checked against upstreams,
dist-tags are merged, filter plugins run, and
[notifications](notifications) fire. The staged copy is removed once the version
is really published.

The version is installable immediately afterwards.

### Rejecting {#rejecting}

```bash
npm stage reject 9efe8b0c-50b3-4183-ba3f-c46dfc784adb
```

The staged record and its tarball are deleted. The version never existed, so the
same `name@version` can be staged again later.

## Who can do what {#permissions}

Permissions reuse your existing [package access](packages) rules. There is no
separate configuration.

| Action | Who |
| --- | --- |
| `npm stage publish` | anyone allowed to `publish` that package |
| `npm stage list` | shows items you staged, plus items on packages you may `publish` |
| `npm stage view` / `download` | the person who staged it, or anyone who may `publish` it |
| `npm stage approve` / `reject` | anyone allowed to `publish` that package |

Asking about a staged item you are not allowed to see answers `404`, not `403`.
A `403` would confirm the id exists to someone who has no business knowing that.

Note that approval only requires publish rights, so with a permissive
`packages` configuration the same person can stage and approve their own
version. If you want a genuine four-eyes review, the reviewing group needs
publish rights that the publishing group does not have:

```yaml
packages:
  'my-company-*':
    access: $authenticated
    # only release managers can approve, but any developer can stage
    publish: release-managers
```

With that, a developer without `publish` cannot stage either — staging and
approving are the same permission today. Splitting them is not possible yet.

## The web interface {#web-ui}

When the flag is on, logged-in users get a **Staged packages** entry in the
account menu, or you can go straight to `/-/web/stage`.

The list shows the same fields as the CLI, and each row has buttons to download
the tarball, approve or reject. Approving and rejecting both ask for
confirmation first, because neither can be undone from the UI. Clicking the
package name opens a detail view with the shasum and access level.

You must be logged in: the page needs your session to call the registry.

## Interaction with two-factor authentication {#with-2fa}

Staged publishing and [two-factor authentication](two-factor-authentication) are
independent — you can run either on its own. When both are on, they compose the
way npmjs intends:

- `npm stage publish` **never** asks for a one-time password. Being able to
  publish without proving presence is the point of staging: a CI job can stage a
  release and a human approves it later.
- `npm stage approve` and `npm stage reject` **do** ask for one, if the
  maintainer has `auth-and-writes` mode.

That combination is the reason `npm stage` exists on npmjs, and it is what lets
an automated pipeline prepare a release without holding a second factor.

## HTTP API {#api}

The routes match what npmjs documents, so any client that speaks `npm stage`
works.

| Method | Route | Command |
| --- | --- | --- |
| `POST` | `/-/stage/package/:package` | `npm stage publish` |
| `GET` | `/-/stage?package=&page=&perPage=` | `npm stage list` |
| `GET` | `/-/stage/:stageId` | `npm stage view` |
| `GET` | `/-/stage/:stageId/tarball` | `npm stage download` |
| `POST` | `/-/stage/:stageId/approve` | `npm stage approve` |
| `DELETE` | `/-/stage/:stageId` | `npm stage reject` |

All of them require authentication. `:stageId` is a UUID; the npm CLI validates
the format before it even calls the registry.

The body of `POST /-/stage/package/:package` is the same packument a normal
publish sends, which is why staging reuses every validation the publish path
already does.

## Where staged versions are stored {#storage}

Staged items live under a reserved namespace in whatever storage backend you
already use:

```
<storage>/.stage/package.json            index of everything staged
<storage>/.stage/<uuid>/package.json     the staged record and its metadata
<storage>/.stage/<uuid>/<name>-<v>.tgz   the staged tarball
```

The namespace is deliberately never registered in the storage plugin's package
database, so staged versions never show up in search, in `/-/all`, or on the web
UI home page.

## Limitations {#limitations}

Worth knowing before you turn this on:

- **Nothing expires.** A staged version that nobody approves or rejects stays on
  disk forever. There is no automatic cleanup yet, so keep an eye on
  `<storage>/.stage` if staging is used heavily.
- **One Verdaccio process.** The index of staged items is kept consistent within
  a process. Several Verdaccio instances sharing one storage backend are not
  supported for this feature.
- **Approval holds the tarball in memory.** The tarball is read back in full to
  be republished, so approving a very large package uses memory proportional to
  its size.
- **Staging and approving are the same permission.** See
  [who can do what](#permissions).
- **npm only.** Yarn and pnpm have no equivalent command.

## Troubleshooting {#troubleshooting}

**`404 Not Found - POST http://localhost:4873/-/stage/package/...`**

The flag is off, or the server was not restarted after enabling it. Check it
with the `curl` above; if it reports `"stage":false`, the running server is not
using the configuration you edited.

**`npm error code E404` on `npm stage list`**

Same cause. With the flag off none of the routes are registered.

**A version was approved but `npm install` cannot find it**

Check whether you have `min-release-age` set in your `.npmrc`. npm refuses to
install packages published more recently than that, which looks like the
registry losing the version:

```bash
npm install my-package --min-release-age=0
```

**`409 Conflict` when staging**

Either that exact `name@version` is already published, or it is already staged.
`npm stage list <package>` shows the latter.

**`409 Conflict` when approving**

The version was published by some other route while it sat in the queue. The
staged item is kept on purpose so you can still inspect it and decide; reject it
if the published version is the one you wanted.
