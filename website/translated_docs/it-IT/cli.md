---
id: cli
title: "Strumento riga di comando"
---

Il CLI di verdaccio è la modalità per avviare l'applicazione.

## Comandi

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Comandi            | Impostazione predefinita       | Esempio        | Descrizione                          |
| ------------------ | ------------------------------ | -------------- | ------------------------------------ |
| --listen \ **-l** | 4873                           | -p 7000        | porta http                           |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | il file di configurazione            |
| --info \ **-i**   |                                |                | prints local environment information |

## Posizione predefinita dei file config

Per individuare la home directory, ci si affida a **$XDG_DATA_HOME** come prima scelta ed in un ambiente Windows si usa [variabile di ambiente APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Formato del file di configurazione

Il file di configurazione dovrebbe essere un modulo YAML, JSON o NodeJS. Il formato YAML viene individuato analizzando l'estensione del file di configurazione (yaml o yml, case insensitive).

## Percorso di archiviazione predefinito

Si usa la variabile di ambiente **$XDG_DATA_HOME** di default per individuare l'archiviazione predefinita che [dovrebbe essere la stessa](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) di $HOME/.local/share. Se si utilizza un'archiviazione dati personalizzata, questo percorso è irrilevante.

## Percorso predefinito del file database

Il percorso predefinito del file di database è il percorso dell'archiviazione. A partire dalla versione 4.0.0, il nome del file di database per una nuova installazione di Verdaccio sarà **.verdaccio-db.json**. Quando si esegue l'upgrade di un server Verdaccio esistente, il nome del file rimarrà **.sinopia-db.json**.