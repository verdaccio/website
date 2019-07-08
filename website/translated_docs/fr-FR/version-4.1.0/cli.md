---
id: version-4.1.0-cli
title: Outil de ligne de commande
original_id: cli
---

La CLI de Verdaccio est votre moyen de lancer l'application.

## Commandes

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Commande           | Par défaut                     | Exemple        | Description                          |
| ------------------ | ------------------------------ | -------------- | ------------------------------------ |
| --listen \ **-l** | 4873                           | -p 7000        | port http                            |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | le fichier de configuration          |
| --info \ **-i**   |                                |                | prints local environment information |


## Emplacement du fichier de configuration par défaut

Pour localiser le répertoire de base, nous nous appuyons sur **$XDG_DATA_HOME** comme premier choix et sur l'environnement Windows que nous cherchons [Variable d’environnement APPDATA ](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Config file format

Config file should be YAML, JSON or NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, case insensitive).

## Emplacement de stockage par défaut

On utilise **$XDG_DATA_HOME**la variable d'environnement par défaut pour trouver le stockage par défaut qui [ devrait être identique ](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) de $HOME/ .local / share. Si vous utilisez un stockage personnalisé, cet emplacement est sans importance.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.