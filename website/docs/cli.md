---
id: cli
title: 'Command Line Tool'
---

The Verdaccio CLI is your tool to start and stop the application.

## Commands {#commands}

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Command            | Default                        | Example        | Description                                                                                                                                                               |
| ------------------ | ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --listen \ **-l**  | http:localhost:4873            | 7000           | Define protocol + host + port ([formats](https://github.com/verdaccio/verdaccio/blob/08c36e688e8635733f92080eb3598239d43259cb/packages/node-api/src/cli-utils.ts#L7-L16)) |
| --config \ **-c**  | ~/.local/verdaccio/config.yaml | ~./config.yaml | Set location of the configuration file                                                                                                                                    |
| --info \ **-i**    |                                |                | Print local environment information                                                                                                                                       |
| --version \ **-v** |                                |                | Show version information                                                                                                                                                  |

## Default config file location {#default-config-file-location}

To locate the home directory, verdaccio relies on **$XDG_DATA_HOME** as a first choice and for Windows environments we look for the [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Config file format {#config-file-format}

Before Verdaccio 7.x, config files could be YAML, JSON, or a Node.js module. YAML format was detected by parsing the config file extension (`.yaml` or `.yml`, case insensitive).

:::warning

Since Verdaccio 7.x, configuration files must be YAML only (`.yaml` or `.yml`). JSON files and Node.js module config files are no longer loaded.

:::

## Default storage location {#default-storage-location}

We use the **$XDG_DATA_HOME** environment by variable default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share.
If you are using a custom storage, this location is irrelevant.

You can use `VERDACCIO_STORAGE_PATH` to define an alternative storage path, read more about `VERDACCIO_STORAGE_PATH` [at the environment variables page](env.md#storage-path).

## Default database file location {#default-database-file-location}

The default database file location is within the storage location.

## Environment variables {#environment-variables}

[Full list of environment variables](https://github.com/verdaccio/verdaccio/blob/master/docs/env.variables.md).

- `VERDACCIO_HANDLE_KILL_SIGNALS` to enable gracefully shutdown (since v4.12.0)
