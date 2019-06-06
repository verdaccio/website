---
id: awọn igbesẹ-github
title: "Awọn igbesẹ-Github"
---

Pẹlu [Awọn igbesẹ Github](https://github.com/features/actions) o le ṣe ilana iṣẹ rẹ ni aifọwọyi, Igbesẹ Github kọọkan n ṣe igbesẹ kan ni pato ninu ilana kan.

![awọn igbesẹ](/img/github-actions.png)

## Sisedanwo awọn akopọ rẹ

Verdaccio n pese igbesẹ akanṣe fun imusisẹpọ to rọrun ninu ilana rẹ, iwọ kan ma se afikun awọn wọnyi si `main.workflow` rẹ ninu igbesẹ ti o ro pe o dara julọ fun ilana rẹ.

```gha
action "Publish Verdaccio" {
  uses = "verdaccio/github-actions/publish@master"
  args = ["publish"]
}
```

The action will perform a `npm publish` and if the publishing finishes successfully will allow to continue to the next step, otherwise will fails. Ti isoro eyikeyi ba wa ni sise atẹjade akopọ kan o maa ṣe akiyesi rẹ nipa lilo igbesẹ yii.

Laarin aworan `verdaccio-auth-memory` ati `verdaccio-memory` lo awọn ohun elo lati sakoso sise ifasẹsi ati ipamọ lati mu ki ilana na yara si.

Ti o ba fẹ mọ sii nipa igbesẹ naa, [lọ si ibi ipamọ wa](https://github.com/verdaccio/github-actions) ti a gbekalẹ fun Awọn igbesẹ GitHub.