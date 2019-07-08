---
id: version-4.1.0-cli
title: Command Line Tool
original_id: cli
---

Verdaccio CLI je Vaša početna stanica za pokretanje aplikacije.

## Komande

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Komanda            | Podrazumevano                  | Primer         | Opis                                 |
| ------------------ | ------------------------------ | -------------- | ------------------------------------ |
| --listen \ **-l** | 4873                           | -p 7000        | http port                            |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | file za konfigurisanje               |
| --info \ **-i**   |                                |                | prints local environment information |


## Podrazumevana lokacija config file-a

Kako bismo locirali home directory, oslanjamo se na **$XDG_DATA_HOME** kao prvi izbor u Windows okruženju gde tragamo za [APPDATA environment variablom](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Config file format

Config file should be YAML, JSON or NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, case insensitive).

## Podrazumevana lokacija za čuvanje

Koristimo **$XDG_DATA_HOME** environment variablu kao podrazumevano podešavanje kako bismo locirali podrazumevano mesto za čuvanje koje bi trebalo [da bude isto](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) kao $HOME/.local/share. Ako koristite prilagođeno mesto za čuvanje podataka (custom storage), onda je lokacija irelevantna.

## Podrazumevana lokacija baze podataka

Po pravilu, lokacija fajla baze podataka je podrazumevana lokacija za čuvanje (storage). Počevši od verzije 4.0.0, ime baze podataka će biti **.verdaccio-db.json** za novu instalaciju Verdaccio-a. Prilikom nadogradnje postojećeg Verdaccio servera, ime fajla će ostati **.sinopia-db.json**.