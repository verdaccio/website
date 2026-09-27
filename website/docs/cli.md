---
id: cli
title: 'Command Line Tool'
description: 'The verdaccio command: its options, where the configuration file and the storage are resolved from, and the config file formats accepted.'
---

The Verdaccio CLI is your tool to start and stop the application.

## Commands {#commands}

```bash
verdaccio --listen 4000 --config ./config.yaml
```

| Command                                  | Default                          | Example          | Description                                     |
| ---------------------------------------- | -------------------------------- | ---------------- | ----------------------------------------------- |
| `--listen` / `-l`                        | `localhost:4873`                 | `7000`           | Protocol + host + port to listen on (see below) |
| `--port` / `-p` <small>7.x</small>       | `localhost:4873`                 | `7000`           | Aliases of `--listen`                           |
| `--config` / `-c`                        | `~/.config/verdaccio/config.yaml` | `./config.yaml` | Location of the configuration file              |
| `--info` / `-i`                          |                                  |                  | Print local environment information             |
| `--mask` <small>7.x</small>              | `false`                          |                  | With `--info`, obscures file paths in the report |
| `--version` / `-v`                       |                                  |                  | Show version information                        |

`--listen` accepts `port`, `host:port`, `proto://host:port`, an IPv6 address in brackets
and a `unix:/path/to.sock` socket — the same values as the `listen` key of the
[configuration file](configuration#listen-port). Passing it on the command line overrides
that key.

`--port` / `-p` and `--mask` exist on **7.x**; on **6.x** use `--listen` and `--info`.

## Default config file location {#default-config-file-location}

When `--config` is not given, Verdaccio builds a list of candidate paths and **uses the
first one that already holds a file**:

1. `$XDG_CONFIG_HOME/verdaccio/config.yaml`, where `$XDG_CONFIG_HOME` falls back to
   `$HOME/.config` — so `~/.config/verdaccio/config.yaml` on Linux and macOS. Only
   considered if that base directory exists.
2. `%APPDATA%\verdaccio\config.yaml` on Windows, e.g.
   `C:\Users\<user>\AppData\Roaming\verdaccio\config.yaml`.
3. `./verdaccio/config.yaml`, relative to the current working directory.
4. `./config.yaml`, kept so that older setups keep working.

If **none** of them exists, Verdaccio creates one at the **first** candidate, writing out
the default configuration, and reports the path it chose in the startup log.

:::note `XDG_CONFIG_HOME`, not `XDG_DATA_HOME`
The configuration is resolved through `XDG_CONFIG_HOME`. `XDG_DATA_HOME` is a different
variable and only decides where the [default storage](#default-storage-location) lives.
:::

Not sure which file a running process picked up? `verdaccio --info` reports it, and so
does the `conf` field of the [`/-/_debug` endpoint](/dev/node-api#debug-endpoint).

## Config file format {#config-file-format}

Config files should be YAML, JSON or a NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, case insensitive).

## Default storage location {#default-storage-location}

The default storage lives under **`$XDG_DATA_HOME`**, which falls back to
`$HOME/.local/share` when unset — so `~/.local/share/verdaccio/storage`. If you configured
a `storage` path of your own, or a storage plugin, this location is irrelevant.

You can use `VERDACCIO_STORAGE_PATH` to define an alternative storage path, read more about `VERDACCIO_STORAGE_PATH` [at the environment variables page](env.md#storage-path).

## Default database file location {#default-database-file-location}

The default database file location is within the storage location.

## Environment variables {#environment-variables}

[Full list of environment variables](env).

- `VERDACCIO_HANDLE_KILL_SIGNALS` to enable graceful shutdown. Only applies to **6.x**: on
  **7.x** graceful shutdown is always on and the variable was removed, see
  [environment variables](env#handle-kill-signals).
