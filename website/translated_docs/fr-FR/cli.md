---
id: cli
title: "Outil de ligne de commande"
---
La CLI de Verdaccio est votre moyen de lancer l'application.

## Commandes

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Commande           | Par défaut                     | Exemple        | Description                 |
| ------------------ | ------------------------------ | -------------- | --------------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | port http                   |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | le fichier de configuration |

## Emplacement du fichier de configuration par défaut

To locate the home directory, we rely on **$XDG_CONFIG_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Emplacement de stockage par défaut

We use **$XDG_CONFIG_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. Si vous utilisez un stockage personnalisé, cet emplacement est sans importance.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.