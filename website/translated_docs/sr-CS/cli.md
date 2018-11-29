---
id: cli
title: "Command Line Tool"
---
Verdaccio CLI je Vaša početna stanica za pokretanje aplikacije.

## Komande

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Komanda            | Podrazumevano                  | Primer         | Opis                   |
| ------------------ | ------------------------------ | -------------- | ---------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | http port              |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | file za konfigurisanje |

## Podrazumevana lokacija config file-a

To locate the home directory, we rely on **$XDG_CONFIG_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Podrazumevana lokacija za čuvanje

We use **$XDG_CONFIG_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. Ako koristite prilagođeno mesto za čuvanje podataka (custom storage,) onda je lokacija irelevantna.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.