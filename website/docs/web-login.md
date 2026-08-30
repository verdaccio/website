---
id: web-login
title: 'Browser-based login'
---

With the `webLogin` flag on, `npm login` hands the browser the job of
authenticating you instead of asking for a username and password in the
terminal. npm opens the Verdaccio web UI, you sign in there, and the CLI picks up
the token once you are done.

:::info Off by default, but not experimental
This is a long-standing feature gated by the `webLogin`
[feature flag](configuration#experiments), which is `false` unless you turn it
on. The flag exists so operators opt into the browser flow deliberately, not
because the feature is unfinished.
:::

## Enabling it {#enabling}

```yaml
flags:
  webLogin: true
```

Restart the registry. With the flag off the endpoints below are not registered
at all, and `npm login` falls back to the terminal prompt.

## How it works {#how-it-works}

Three endpoints take part, all registered only when the flag is on:

| Endpoint                          | Role                                        |
| --------------------------------- | ------------------------------------------- |
| `POST /-/v1/login`                | npm starts here and gets the two URLs below |
| `POST /-/v1/login_cli/:sessionId` | the browser hands its result to the session |
| `GET /-/v1/done/:sessionId`       | npm polls here until the token is ready     |

The exchange:

1. `npm login` posts to `/-/v1/login`. The registry opens a session and answers
   with a `loginUrl` — the web UI login page — and a `doneUrl`.
2. npm opens `loginUrl` in your browser and starts polling `doneUrl`.
3. Until somebody signs in, `doneUrl` answers **`202`** with `Retry-After: 5`,
   which tells npm to ask again in five seconds.
4. You sign in in the browser, and the web UI posts the result to the session.
5. The next poll returns the token, and npm writes it to your `.npmrc`.

Two limits are worth knowing:

- **The session expires after two minutes.** Take longer than that to sign in
  and the poll answers `401` with a session-expired error. Run `npm login`
  again.
- **The token is single use.** Once npm has collected it, the session is spent.

## Behind a reverse proxy {#reverse-proxy}

:::caution Known limitation
The `loginUrl` and `doneUrl` the registry returns are built from the request's
protocol and hostname **and from the port Verdaccio itself is listening on**,
not the port the client connected to.

Behind a proxy that terminates TLS on `443` and forwards to Verdaccio on `4873`,
the browser is therefore sent to `https://your-registry:4873/…`, an address it
usually cannot reach. Browser login effectively only works when clients reach
Verdaccio on the same port it listens on.
:::

If you run Verdaccio behind a proxy and want this flow, keep the public port and
the listening port the same. See [reverse proxy](reverse-proxy) for the rest of
the headers involved.
