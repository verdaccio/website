---
id: cli
title: "Инструмент командной строки"
---
Инструмент командной строки verdaccio, это начало вашей работы с приложением.

## Команды

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Команда            | По умолчанию                   | Пример         | Описание          |
| ------------------ | ------------------------------ | -------------- | ----------------- |
| --listen \ **-l** | 4873                           | -p 7000        | http порт         |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | файл конфигурации |

## Расположение файла конфигурации по умолчанию

To locate the home directory, we rely on **$XDG_CONFIG_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Расположение хранилища по умолчанию

We use **$XDG_CONFIG_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. Но, если вы используете своё место для хранилища, это не имеет значения.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.