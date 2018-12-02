---
id: cli
title: "Công cụ dòng lệnh Command line"
---
Dòng lệnh CLI của Verdaccio là công cụ để bạn bắt đầu khởi động và kiểm soát ứng dụng này.

## Các lệnh

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Tham số            | Giá trị mặc định               | Ví dụ          | Miêu tả          |
| ------------------ | ------------------------------ | -------------- | ---------------- |
| --listen \ **-l** | 4873                           | -p 7000        | http port        |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | tệp tin cấu hình |

## Vị trí đường dẫn tệp cấu hình mặc định

To locate the home directory, we rely on **$XDG_CONFIG_HOME** as a first choice and Windows environment we look for [APPDATA environment variable](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Vị trí lưu trữ mặc định

We use **$XDG_CONFIG_HOME** environment variable as default to locate the storage by default which [should be the same](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) as $HOME/.local/share. Vị trí này sẽ không liên quan đến bạn nếu bạn đang sử dụng bộ nhớ tùy chỉnh.

## Default database file location

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.