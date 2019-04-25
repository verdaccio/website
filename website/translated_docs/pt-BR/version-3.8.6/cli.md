---
id: version-3.8.6-cli
title: Utilitário na Linha de Comando
original_id: cli
---

A linha de comando é por onde você pode controlar toda a sua instalação Verdaccio.

## Comandos

```bash
verdaccio --listen 4000 --config ~./config.yaml
```

| Comando            | Padrão                         | Exemplo        | Descrição                 |
| ------------------ | ------------------------------ | -------------- | ------------------------- |
| --listen \ **-l** | 4873                           | -p 7000        | porta http                |
| --config \ **-c** | ~/.local/verdaccio/config.yaml | ~./config.yaml | o arquivo de configuração |

## Local padrão das Configurações

Para encontrar o diretório padrão de configuração, é usada a variável **$XDG_DATA_HOME** em sistemas Linux e Mac, em instalações Windows é usada a [variável APPDATA](https://www.howtogeek.com/318177/what-is-the-appdata-folder-in-windows/).

## Armazenamento Padrão

A variável **$XDG_DATA_HOME** é usada para determinar o local de armazenamento padrão. Em geral essa variável [deve ser](https://askubuntu.com/questions/538526/is-home-local-share-the-default-value-for-xdg-data-home-in-ubuntu-14-04) igual a $HOME/.local/share. Se você estiver usando um tipo de armazenamento diferente do padrão, essa informação é irrelevante.

## Localização padrão da base de dados

The default database file location is in the storage location. Starting with version 4.0.0, the database file name will be **.verdaccio-db.json** for a new installation of Verdaccio. When upgrading an existing Verdaccio server, the file name will remain **.sinopia-db.json**.