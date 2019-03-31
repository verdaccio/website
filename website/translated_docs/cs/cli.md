---
id: cli
title: "Command Line Tool"
---
The verdaccio CLI is your go start the application.

## Commands

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Command            | Default                        | Example        | Description         |
| ------------------ | ------------------------------ | -------------- | ------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | http port           |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | konfigurační soubor |

## Výchozí lokace konfiguračního souboru

To locate the home directory, we rely on **$XDG_DATA_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Výchozí místo úložiště

We use **$XDG_DATA_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. Pokud používáte vlastní úložiště, tato lokace je irelevantní.

## Výchozí lokace databázového souboru

Výchozí lokace databázového souboru v úložišti. Počínaje verzí 4.0.0, pro nové instalace Verdaccia bude název souboru databáze **.verdaccio-db.json**. Při aktualizaci existujícího serveru Verdaccia zůstane název souboru **.sinopia-db.json**.