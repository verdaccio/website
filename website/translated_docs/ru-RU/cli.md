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

Для того, чтобы определить местоположение домашней директории мы полагаемся на **$XDG_DATA_HOME** в первую очередь и в среде Windows мы ищем переменную окружения [APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Расположение хранилища по умолчанию

Для определения местоположения хранилища, по умолчанию мы используем переменную окружения **$XDG_DATA_HOME**, которая [должна быть похожа](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) на $HOME/.local/share. Но, если вы используете своё место для хранилища, это не имеет значения.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.