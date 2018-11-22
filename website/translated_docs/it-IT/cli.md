---
id: cli
title: "Strumento riga di comando"
---
Il CLI di verdaccio è la modalità per avviare l'applicazione.

## Comandi

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Comandi            | Impostazione predefinita       | Esempio        | Descrizione               |
| ------------------ | ------------------------------ | -------------- | ------------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | porta http                |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | il file di configurazione |

## Posizione predefinita dei file config

Per individuare la home directory, ci si affida a **$XDG_DATA_HOME** come prima scelta ed in un ambiente Windows si usa [variabile di ambiente APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Percorso di archiviazione predefinito

Si usa la variabile di ambiente **$XDG_DATA_HOME** di default per individuare l'archiviazione predefinita che [dovrebbe essere la stessa](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) di $HOME/.local/share. Se si utilizza un'archiviazione dati personalizzata, questo percorso è irrilevante.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.