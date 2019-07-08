---
id: cli
title: "Narzędzie wiersza poleceń"
---

Verdaccio CLI to Twój start, aby uruchomić aplikację.

## Komendy

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Komenda            | Domyślne                       | Przykład       | Opis                                 |
| ------------------ | ------------------------------ | -------------- | ------------------------------------ |
| --listen \ **-l** | 4873                           | -p 7000        | http port                            |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | plik konfiguracyjny                  |
| --info \ **-i**   |                                |                | prints local environment information |

## Domyślna lokalizacja pliku konfiguracyjnego

Aby znaleźć katalog osobisty, polegamy na **$XDG_DATA_HOME** pierwszym wyborze i środowisku Windows, którego szukamy [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Config file format

Config file should be YAML, JSON or NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, case insensitive).

## Domyślna lokalizacja magazynu danych

Domyślnie używamy zmiennej środowiskowej **$XDG_DATA_HOME**, aby zlokalizować domyślny magazyn danych, który [powinien znajdować się](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) w $HOME/.local/share. Jeśli używasz niestandardowego magazynu danych, ta lokalizacja nie ma znaczenia.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.