---
id: sise asopọ-ibi iforukọsilẹ-ọlọna jijin
title: "Sise asopọ ibi iforukọsilẹ ọlọna jijin kan"
---

Verdaccio jẹ aṣoju ikọkọ ati nipa atilẹda [n se asopọ](uplinks.md) ibi iforukọsilẹ ti gbogbogbo.

```yaml
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

O le ṣe asopọ awọn ibi iforukọsilẹ ọlọpọlọpọ, iwe wọnyii yoo ṣe atọkun rẹ bi iranlọwọ diẹ lara awọn iṣeto.

## Lilo Ilana ti Alabasepọ

Ọna ara lati wọle si awọn ibi iforukọsilẹ ọlọpọlọpọ nipa lilo `.npmrc` jẹ ilana ẹya ara bi atẹle yii:

    // .npmrc
    registry=https://registry.npmjs.org
    @mycompany:registry=http://localhost:4873
    

Ọna yii fẹsẹmulẹ, ṣugbọn o wa pẹlu ọpọlọpọ awọn akude:

* O **n ṣiṣẹ pẹlu awọn scope nikan**
* Scope gbọdọ baramu, **ko si igbalaaye fun Awọn ifarahan Yẹpẹrẹ kankan**
* Scope kan **kole sawari lati awọn ibi iforukọsilẹ ọlọpọlọpọ**
* Awọn aami/awọn ọrọ igbaniwọle **gbọdọ wa ni asọye laarin** `.npmrc` atipe jẹ gbigbe wọle sinu ibi ipamọ naa.

Wo apẹẹrẹ kikun kan [nibi](https://stackoverflow.com/questions/54543979/npmrc-multiple-registries-for-the-same-scope/54550940#54550940).

## Sise asopọ Ibi iforukọsilẹ kan

Sise asopọ ibi iforukọsilẹ kan rọrun gan. Lakọkọ, ṣe asọye abala tuntun kan ni abala ti `uplinks`. Akiyesi, eto ti ibi ko ṣe pataki.

```yaml
  uplinks:
    private:
      url: https://private.registry.net/npm

    ... [truncated] ...

  'webpack':
    access: $all
    publish: $authenticated
    proxy: private

```

Se afikun abala `aṣoju ikọkọ` lati seto ibi iforukọsilẹ to jẹ yiyan ti o fẹ lati se ni aṣoju ikọkọ.

## Siṣe asopọ Awọn ibi iforukọsilẹ ọlọpọlọpọ

```yaml
  uplinks:
    server1:
      url: https://server1.registry.net/npm
    server2:
      url: https://server2.registry.net/npm

    ... [truncated] ...

  'webpack':
    access: $all
    publish: $authenticated
    proxy: server1 server2
```

Verdaccio supports multiple registries on the `proxy` field. The request will be resolved with the first in the list; if that fails, it will try with the next in the list and so on.

## Offline Registry

Having a full Offline Registry is completely possible. If you don't want any connectivity with external remotes you can do the following.

```yaml
<br />auth:
  htpasswd:
    file: ./htpasswd
uplinks:
packages:
  '@my-company/*':
    access: $all
    publish: none
  '@*/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
```

Remove all `proxy` fields within each section of `packages`. The registry will become full offline.