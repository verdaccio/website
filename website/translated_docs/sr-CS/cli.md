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

Kako bismo locirali home directory, oslanjamo se na **$XDG_CONFIG_HOME**. Kao prvi izbor za Windows okruženje, tražimo [APPDATA environment variablu](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Podrazumevana lokacija za čuvanje

Koristimo **$XDG_CONFIG_HOME** environment variablu kao podrazumevanu kako bismo locirali prostor za čuvanje podataka koji bi po pravilu [trebalo da bude isti](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) kao $HOME/.local/share. Ako koristite prilagođeno mesto za čuvanje podataka (custom storage,) onda je lokacija irelevantna.

## Podrazumevana lokacija baze podataka

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.