---
id: version-3.8.6-dabobo-awọn igbarale-rẹ
title: Didabobo awọn akopọ
original_id: dabobo-awọn igbarale-rẹ
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

### Lo apẹẹrẹ: teamD gbiyanju lati wọle si igbarale naa

Nitorina, ti mo ba wọle bi **teamD**. Ko yẹ ki n ni anfani lati wọle si gbogbo awọn igbarale ti o ni baamu pẹlu ilana `my-company-*`.

```bash
➜ npm whoami
teamD
```

Mi koni raye wọle si awọn igbarale bẹ atipe kii yoo han nipasẹ ayelujara fun olumulo **teamD**. Ti mo ba gbiyanju lati wọle awọn wọnyi yoo ṣẹlẹ.

```bash
➜ npm install my-company-core
npm ERR! code E403
npm ERR! 403 Forbidden: webpack-1@latest
```

tabi pẹlu `yarn`

```bash
➜ yarn add my-company-core
yarn add v0.24.6
info No lockfile found.
[1/4] 🔍  N yanju awọn akopọ...
aṣiṣe Aṣiṣe airotẹlẹ kan ṣẹlẹ: "http://localhost:5555/webpack-1: awọn olumulo alaiforukọsilẹ ko ni ifayegba lati wọle si akojọ my-company-core".
```