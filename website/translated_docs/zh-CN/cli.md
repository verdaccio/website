---
id: cli
title: "命令行工具"
---
Verdaccio 命令行是启动和控制此应用的工具。

## 命令

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| 参数                 | 默认值                            | 示例             | 描述        |
| ------------------ | ------------------------------ | -------------- | --------- |
| --listen \ **-l** | 4873                           | -p 7000        | HTTP 监听端口 |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | 配置文件路径    |

## 默认配置文件路径位置

To locate the home directory, we rely on **$XDG_CONFIG_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## 默认存储位置

We use **$XDG_CONFIG_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. 如果您正在使用自定义存储，则与此位置不相干。

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.