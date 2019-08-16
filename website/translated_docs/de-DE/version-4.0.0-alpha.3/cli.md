---
id: version-4.0.0-alpha.3-cli
title: Befehlszeilen-Tool
original_id: cli
---

Mit der verdaccio CLI kann die Anwendung gestartet werden.

## Befehle

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Befehl             | Standard                       | Beispiel       | Beschreibung            |
| ------------------ | ------------------------------ | -------------- | ----------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | http port               |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | Die Konfigurationsdatei |

## Standardpfad zur Konfigurationsdatei

To locate the home directory, we rely on **$XDG_DATA_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Default storage location

We use **$XDG_DATA_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. If you are using a custom storage, this location is irrelevant.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.