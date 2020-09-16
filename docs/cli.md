---
id: cli
title: "Command Line Tool"
---

Welcome to the Verdaccio CLI! This article introduces the CLI and helps you complete common tasks.

## Options

Run Verdaccio listening on port 4000 using a custom config file named config.yaml

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

### `--listen, -l`

Define the HTTP port on which Verdaccio will run. If you don't use it, the default port is **4873**.

### `--config, -c`

Points to a configuration file you need to use. If you don't use it, the default config file is located in **~/.local/verdaccio/config.yaml**.

### `--info, -i`

Prints local environment information.

```bash
mapo@localhost:~$ verdaccio -i

Environment Info:

  System:
    OS: Linux 4.4 Ubuntu 18.04.4 LTS (Bionic Beaver)
    CPU: (4) x64 Intel(R) Core(TM) i7-7500U CPU @ 2.70GHz
  Binaries:
    Node: 12.18.2 - /usr/bin/node
    Yarn: 1.22.4 - /usr/bin/yarn
    npm: 6.14.8 - /usr/bin/npm
  Virtualization:
    Docker: 19.03.12 - /usr/bin/docker
  npmGlobalPackages:
    verdaccio: 4.8.0
```

### Default config file location

To locate the home directory on Linux/MacOS enviroments, we rely on **$XDG_DATA_HOME** as the first choice and on Windows environments we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

### Config file format

Config file should be YAML, JSON or NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, not case sensitive).

### Default storage location

We use **$XDG_DATA_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share.
If you are using custom storage, this location is irrelevant.

### Default database file location

The default database file location is in the storage location.
Starting with version 4.0.0, new Verdaccio installations will use `.verdaccio-db.json` as database file extension.
When upgrading an existing Verdaccio server, the database file extension will remain as `.sinopia-db.json`.
