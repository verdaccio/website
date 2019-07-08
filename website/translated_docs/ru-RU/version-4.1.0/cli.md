---
id: version-4.1.0-cli
title: Инструмент командной строки
original_id: cli
---

Инструмент командной строки verdaccio (verdaccio CLI) - это начало вашей работы с приложением.

## Команды

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Команда            | По умолчанию                   | Пример         | Описание                             |
| ------------------ | ------------------------------ | -------------- | ------------------------------------ |
| --listen \ **-l** | 4873                           | -p 7000        | http порт                            |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | файл конфигурации                    |
| --info \ **-i**   |                                |                | prints local environment information |


## Местоположение файла конфигурации по умолчанию

Для того, чтобы определить местоположение домашней директории мы полагаемся на **$XDG_DATA_HOME** в первую очередь и в среде Windows мы ищем переменную окружения [APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Формат config-файла

Config file should be YAML, JSON or NodeJS module. YAML format is detected by parsing config file extension (yaml or yml, case insensitive).

## Местоположение хранилища по умолчанию

Для определения местоположения хранилища, по умолчанию мы используем переменную окружения **$XDG_DATA_HOME**, которая [должна быть похожа](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) на $HOME/.local/share. Но, если вы используете своё место для хранилища, это не имеет значения.

## Местоположение базы данных по умолчанию

По умолчанию, местоположение файла БД совпадает с местоположением хранилища. Начиная с версии 4.0.0, файлу БД будет дано имя **.verdaccio-db.json** для новых установок Verdaccio. При обновлении старых версий, имя файла БД останется старым **.sinopia-db.json**.