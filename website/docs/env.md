---
id: env
title: Environment Variables
---

Verdaccio provides a set of environment variables to modify either permissions, port or http protocol. Here the complete list:

### Docker {#docker}

To change the behavior on runtime on running the image, these are the list of available variables.

| Variable            | Default          | Description                                                    |
| ------------------- | ---------------- | -------------------------------------------------------------- |
| VERDACCIO_APPDIR    | `/opt/verdaccio` | the docker working directory                                   |
| VERDACCIO_USER_NAME | `verdaccio`      | the system user                                                |
| VERDACCIO_USER_UID  | `10001`          | the user id being used to apply folder permissions             |
| VERDACCIO_PORT      | `4873`           | the verdaccio port                                             |
| VERDACCIO_PROTOCOL  | `http`           | the default http protocol                                      |
| VERDACCIO_ADDRESS   | `[::]`           | the default address to listen on (IPv6 `[::]`, all interfaces) |

:::info Changed in the next major (`next`)
The default value of `VERDACCIO_ADDRESS` changed from `0.0.0.0` (IPv4, in **6.x**) to `[::]` (IPv6, in the **next major (`next`)** and later). On dual-stack hosts `[::]` also accepts IPv4 connections, but in environments where IPv6 is not available you may need to set `VERDACCIO_ADDRESS=0.0.0.0` explicitly.
:::

### VERDACCIO_HANDLE_KILL_SIGNALS {#handle-kill-signals}

:::caution Deprecated
This variable only applies to **Verdaccio 6.x**, where graceful shutdown is opt-in by setting `VERDACCIO_HANDLE_KILL_SIGNALS=true`. Starting with the **next major (`next`)** it has been **removed** and graceful shutdown is always enabled, so the variable has no effect.
:::

Enables gracefully shutdown, more info at the [pull request #2121](https://github.com/verdaccio/verdaccio/pull/2121).

### VERDACCIO_PUBLIC_URL {#public-url}

Define a specific public url for your server, it overrules the `Host` and `X-Forwarded-Proto` header if a reverse proxy is being used, it takes in account the `url_prefix` if is defined.

This is handy in such situations where a dynamic url is required.

eg:

```
VERDACCIO_PUBLIC_URL='https://somedomain.org';
url_prefix: '/my_prefix'

// url -> https://somedomain.org/my_prefix/

VERDACCIO_PUBLIC_URL='https://somedomain.org';
url_prefix: '/'

// url -> https://somedomain.org/

VERDACCIO_PUBLIC_URL='https://somedomain.org/first_prefix';
url_prefix: '/second_prefix'

// url -> https://somedomain.org/second_prefix/'
```

### VERDACCIO_FORWARDED_PROTO {#handle-forwarded-proto}

The default header to identify the protocol is `X-Forwarded-Proto`, but there are some environments which [uses something different](https://github.com/verdaccio/verdaccio/issues/990), to change it use the variable `VERDACCIO_FORWARDED_PROTO`

```
$ VERDACCIO_FORWARDED_PROTO=CloudFront-Forwarded-Proto verdaccio --listen 5000
```

### VERDACCIO_STORAGE_PATH {#storage-path}

By default, the storage is taken from config file, but using this variable allows to set it from environment variable.

### VERDACCIO_STORAGE_NAME

The database name for `@verdaccio/local-storage` is by default `.verdaccio-db.json`, but this can be update by using this variable.

### VERDACCIO_LEGACY_ALGORITHM {#legacy-algorithm}

The cipher algorithm used to encrypt/decrypt **legacy authentication tokens** (the pre-JWT npm bearer tokens handled by `@verdaccio/signature`). Defaults to `aes-256-ctr`. This is unrelated to storage; it only affects token encryption, and the key is always 256 bits (32 characters).

The accepted values are the cipher names supported by your Node.js / OpenSSL build — see the [Node.js `crypto` documentation](https://nodejs.org/api/crypto.html) (`crypto.getCiphers()`). Only change it if you need to match tokens produced with a different algorithm.

### VERDACCIO_LEGACY_ENCRYPTION_KEY {#legacy-encryption-key}

Overrides the key used to encrypt/decrypt **legacy authentication tokens**, _not_ storage data.

By default these legacy AES tokens are encrypted with the server `secret` — the 32-character key that Verdaccio auto-generates and persists in the storage database (`.verdaccio-db.json`, the `secret` field). When this variable is set it takes precedence over that secret for the legacy token path only — useful, for example, to keep decrypting tokens issued with a previous secret after the one in `.verdaccio-db.json` has been rotated.

The value **must be exactly 32 characters (256 bits)**, otherwise encryption fails with an _Invalid secret key length_ error. If unset, the server secret is used.
