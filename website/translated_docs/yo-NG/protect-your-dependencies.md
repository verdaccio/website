---
id: dabobo-awọn igbarale-rẹ
title: "Didabobo awọn akopọ"
---

`verdaccio` faye gba ọ lati dabobo atẹjade, lati ṣe aṣeyọri pẹlu iyẹn o ma nilo lati ṣeto [iwọlesi awọn akopọ](packages) rẹ dardara.

### Iṣeto akopọ

Jẹ ki a wo fun apẹẹrẹ awọn iseto wọnyi. O ni eto ti awọn igbarale kan ti o wa lati ilẹ tẹlẹ pẹlu `my-company-*` atipe o nilo lati dabobo wọn kuro lọdọ alainidamọ tabi olumulo miiran ti o wọle laini awọn iwe ẹri to tọ.

```yaml
  'my-company-*':
    access: admin teamA teamB teamC
    publish: admin teamA
    proxy: npmjs
```

Pẹlu iṣeto yii, lakotan a fayegba awọn ẹgbẹ **admin** ati **teamA** lati *se atẹjade* ati **teamA** **teamB** **teamC** *wiwọle* si awọn igbarale bẹ.

### Use case: teamD try to access the dependency

So, if I am logged as **teamD**. I shouldn't be able to access all dependencies that match with `my-company-*` pattern.

```bash
➜ npm whoami
teamD
```

I won't have access to such dependencies and also won't be visible via web for user **teamD**. If I try to access the following will happen.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```

or with `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 
error An unexpected error occurred: "http://localhost:5555/webpack-1: unregistered users are not allowed to access package my-company-core".
```