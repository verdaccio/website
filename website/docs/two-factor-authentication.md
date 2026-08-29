---
id: two-factor-authentication
title: 'Two-factor authentication'
---

Two-factor authentication adds a time-based one-time password (TOTP) on top of a
user's password. Once enabled, the registry asks for a six-digit code from an
authenticator app before it accepts logins, new tokens and — depending on the
mode — publishes.

It works with the standard `npm profile` commands and with both npm and Yarn.

:::info Available from 7.x — test it on 9.x
This feature ships in Verdaccio **7.x** and later. It is **not** available in
**6.x**, which does not receive new features.

To try it today, use the **9.x experimental** line, which is where it lands
first:

```bash
npm install -g verdaccio@next-9
# or
docker pull verdaccio/verdaccio:nightly-master
```

Experimental releases are **not production-ready** and are meant for testing and
early feedback. Node.js `>= 24` is required.
:::

:::caution
This is an experimental feature behind the `tfa` flag. It is off by default, and
the shape of the flag or its behaviour may change in a future release. See
[feature flags](configuration#experiments).

**Not recommended for production yet.** We would rather gather enough real usage
first — see below on how to help with that.
:::

:::info Feedback wanted
This feature is experimental and shaped by what people report while using it.
Tell us whether the workflow fits how your team releases, what it does not cover
for your setup, and any rough edge or confusing error — in
[GitHub Discussions](https://github.com/verdaccio/verdaccio/discussions), as an
issue at [verdaccio/verdaccio](https://github.com/verdaccio/verdaccio/issues),
or on [Discord](https://discord.gg/7qWJxBf).

Reports about what does **not** work are the most useful thing you can send
while a feature is still experimental: they decide whether it graduates, changes
shape, or gets dropped.
:::


## Requirements {#requirements}

- **A storage plugin that supports tokens.** The bundled `local-storage` and
  `memory` plugins both do. If yours does not, Verdaccio refuses to start with
  the flag on rather than failing later on every write.
- **An authenticator app** — anything speaking TOTP works: 1Password, Bitwarden,
  Google Authenticator, Aegis, and so on.
- **A reasonably accurate clock** on the server. Codes are accepted within one
  30-second step either side, so roughly a minute of tolerance.

## Enabling it {#enabling}

```yaml
flags:
  tfa: true
```

Restart the registry afterwards.

Turning the flag on does not enable two-factor for anybody. It only makes the
feature available; each user opts in for their own account.

## Enrolling {#enrolling}

```bash
npm profile enable-2fa auth-and-writes
```

npm asks for your account password, prints a QR code and a secret, then asks for
the first code from your app:

```
npm notice profile Enabling two factor authentication for auth-and-writes
npm password:
Scan into your authenticator app:
  <QR code>
 Or enter code: 47MCG4BVDPYJPBQ4WVWH6OP3E2ILAJWM
And an OTP code from your authenticator: 536729
2FA successfully enabled. Below are your recovery codes, please print these out.
You will need these to recover access to your account if you lose your authentication device.
	d9723b8e995d164a
	4fe949ab41d72d8d
	...
```

:::warning
**Save the recovery codes now.** They are shown exactly once and cannot be shown
again. Each one works a single time, and they are the only way back into your
account if you lose your authenticator.
:::

Verify it took effect:

```bash
npm profile get
# two-factor auth: auth-and-writes
```

## How it works {#how-it-works}

There is no external service involved, no email and no SMS. Everything is
[RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238) TOTP: the registry and
your authenticator app share one random secret, and both derive the same
six-digit code from it and the current time.

### Enrolment, step by step {#enrolment-internals}

1. `npm profile enable-2fa` asks for your account password and posts it to the
   registry.
2. The registry re-checks the password through your auth plugin, generates a
   random 160-bit secret, and stores it as *pending*.
3. It answers with a plain `otpauth://` URI:

   ```
   otpauth://totp/My%20Registry:alice?issuer=My%20Registry&secret=JBSWY3DPEHPK3PXP&algorithm=SHA1&digits=6&period=30
   ```

4. **npm turns that URI into the QR code**, using
   [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal) to draw it
   in your terminal. The registry never produces an image — it only returns the
   string. That is why the QR appears even though Verdaccio has no web page for
   it.
5. You scan it, or paste the `secret` value by hand if your app prefers that.
   Both carry exactly the same information.
6. npm asks for the first code and sends it back. The registry checks it, marks
   the secret as confirmed, and returns the recovery codes.

The pending state matters: until step 6 succeeds, the account is **not**
protected. That is what `pending: true` means in
[the profile response](#api).

### Verifying a code {#verification-internals}

When a code is required, the registry recomputes what the code should be for the
current 30-second window and compares. One step either side is accepted, giving
about a minute of tolerance for clock drift — which is why an inaccurate server
clock rejects everything.

The comparison is constant-time, and repeated failures
[lock the account out](#lockout), because six digits are otherwise cheap to guess
at scale.

### What is stored {#storage-internals}

The secret, the hashed recovery codes and the failure counters live in the
storage plugin's token store, encrypted at rest with the server secret. Nothing
is written to the user's htpasswd entry, which is why this works the same with
any [auth plugin](authentication).

## Modes {#modes}

There are two, and the difference is only about writes.

| | `auth-only` | `auth-and-writes` |
| --- | --- | --- |
| `npm login` | code required | code required |
| `npm token create` | code required | code required |
| `npm publish` | not asked | **code required** |
| `npm unpublish` | not asked | **code required** |
| `npm dist-tag add` / `rm` | not asked | **code required** |
| `npm stage approve` / `reject` | not asked | **code required** |
| `npm stage publish` | never asked | **never asked** |

`auth-and-writes` is the default when you do not pass a mode, and it is the one
worth having: it is the mode that stops a leaked token from publishing.

Switch between them by running `npm profile enable-2fa <mode>` again with the
other value.

## Publishing with two-factor on {#publishing}

npm prompts for the code when the terminal is interactive:

```bash
npm publish
# This operation requires a one-time password.
# Enter OTP:
```

In a non-interactive shell it fails with a clear error instead:

```
npm error code EOTP
npm error This operation requires a one-time password from your authenticator.
npm error You can provide a one-time password by passing --otp=<code> to the command you ran.
```

So pass it directly when scripting:

```bash
npm publish --otp=123456
```

Yarn behaves the same way and prompts on its own:

```bash
yarn npm publish
# Provide a one-time password from your authenticator app.
# One-time password: ‹
```

## Recovery codes {#recovery-codes}

Anywhere a one-time password is accepted, a recovery code works instead:

```bash
npm publish --otp=d9723b8e995d164a
```

Each code is consumed on first use. When you run low, turn two-factor off and on
again to get a fresh set — there is no separate command to regenerate them.

## Turning it off {#disabling}

```bash
npm profile disable-2fa
```

It asks for your account password and a current one-time password. Both are
required: holding a valid token is not enough to remove someone's second factor.

## Failed attempts and lockout {#lockout}

Six digits are easy to guess at scale, so failures are counted. After **five**
wrong codes the account stops accepting one-time passwords for **five minutes**,
even correct ones. A successful verification resets the counter.

A lockout only affects operations that need a code. Reads, installs and anything
else keep working.

## For operators {#operators}

### Users who never enable it are unaffected {#unaffected}

The check returns immediately for anyone without a two-factor record, and does
not run at all when the flag is off. Enabling the flag does not change behaviour
for users who do not opt in.

### Rotating the server secret locks people out {#secret-rotation}

This is the one thing to be careful about.

Two-factor records are encrypted with the server secret (`config.secret`, or
`VERDACCIO_LEGACY_ENCRYPTION_KEY`). **If you rotate that secret, every existing
two-factor record becomes undecryptable and every user who enabled it is locked
out of publishing and logging in.**

Verdaccio fails loudly rather than quietly pretending those users have no second
factor, which would be worse — it would silently drop everybody's protection.
You will see:

```
error --- the two-factor record of alice could not be decrypted, has the server secret changed?
```

There is no self-service recovery from this yet. Plan a secret rotation by
asking users to disable two-factor first, and re-enable it afterwards.

### Continuous integration {#ci}

With `auth-and-writes`, any pipeline that publishes needs a one-time password,
which a pipeline cannot produce. There are two ways around it today:

- Publish from CI with an account that uses `auth-only`, or no two-factor at
  all, and protect it with [package access rules](packages) instead.
- Use [staged publishing](staged-publishing): CI runs `npm stage publish`, which
  never asks for a code, and a human approves the release afterwards with theirs.
  This is what the two features are designed to do together.

npmjs solves this with automation tokens that bypass two-factor; Verdaccio does
not implement `bypass_2fa` yet.

### It is independent of your auth plugin {#auth-plugins}

Two-factor lives in the storage layer, not the authentication plugin, so it
works with htpasswd, LDAP, or anything else. The one place it touches the auth
plugin is re-checking the account password when enabling or disabling, which
goes through `auth.authenticate` like a normal login.

### Where the configuration is stored {#storage}

Records live in the storage plugin's token store under a reserved key, encrypted
at rest. They are deliberately hidden from the token APIs: `npm token ls` does
not list them, and `npm token rm` refuses to delete them — otherwise anybody
holding a token could switch off their own second factor without a password.

## What the registry reports {#api}

`npm profile get` reads the state from `GET /-/npm/v1/user`, which reports one
of:

```json
{ "tfa": false }
{ "tfa": { "mode": "auth-and-writes", "pending": false } }
```

`pending: true` means enrolment was started but the first code was never
confirmed. **That state does not protect the account** — finish enrolling, or
disable and start again.

When a code is required but not supplied, the registry answers:

```
401 Unauthorized
WWW-Authenticate: otp
npm-notice: Provide a one-time password from your authenticator app.

{ "error": "You must provide a one-time pass. Upgrade your client to npm@latest in order to use 2FA." }
```

The `WWW-Authenticate: otp` header is what npm and Yarn look for to know they
should retry. Clients then repeat the request with the code in the `npm-otp`
header.

## Limitations {#limitations}

- **TOTP only.** Security keys and WebAuthn are not supported.
- **No web login flow.** The browser-based `authUrl`/`doneUrl` exchange npmjs
  offers is not implemented, so the code always comes from the terminal.
- **No `bypass_2fa` tokens.** See [continuous integration](#ci).
- **No recovery from a rotated server secret.** See
  [above](#secret-rotation).
- **Enrolment is CLI-only for now.** There is no web UI to scan the QR code yet.

## Troubleshooting {#troubleshooting}

**`npm error code EOTP` in a script**

Expected: npm cannot prompt without a TTY. Pass `--otp=<code>`, or use
[staged publishing](staged-publishing) so the pipeline does not need a code at
all.

**"Unable to authenticate, need: Bearer"**

The registry answered a plain `401` where it should have answered a two-factor
challenge. That is not a client problem — check that the version you run
includes two-factor support.

**Codes are always rejected**

Almost always clock drift. Codes are valid for one 30-second step either side,
so a server clock more than a minute off rejects everything. Check NTP on the
server and the time on the phone.

**Locked out with no recovery codes left**

There is no self-service path. An operator has to remove the user's two-factor
record from the storage backend directly.

**`503 the two-factor authentication is not yet supported`**

The `tfa` flag is off, or the server was not restarted after enabling it.
