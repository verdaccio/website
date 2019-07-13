---
id: version-4.0.0-alpha.5-best
title: Awọn iṣeṣi to Darajulọ
original_id: didara julọ
---

Itọsọna yii jẹ akojọ ti awọn iṣeṣi to dara julọ ti o jẹ gbigba ati eyi ti a saba maa n gba niyanju fun gbogbo awọn olumulo. Maṣe mu itọsọna yi bi dandan, o le mu diẹ ninu wọn ni ibamu si awọn inilo rẹ.

**Ma se mikan lati dabaa awọn iṣesi to dara julọ pẹlu awujọ Verdaccio naa**.

## Ibi iforukọsilẹ Ikọkọ

O se afikun awọn olumulo ati ki o ṣakoso irufẹ awọn olumulo ti o le wọle si irufẹ awọn akopọ.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ `local-*` or scoped `@my-company/*`, nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. Ni ọna yii o le ya awọn akopọ gbogbogbo sọtọ gedegede kuro ni ti awọn ti ikọkọ.

```yaml
  packages:
    '@my-company/*':
      access: $all
      publish: $authenticated
     'local-*':
      access: $all
      publish: $authenticated
    '@*/*':
      access: $all
      publish: $authenticated
    '**':
      access: $all
      publish: $authenticated
   ```

Seranti nigbagbogbo, **aato ti iwọlesi ti akojọ se pataki**, awọn akojọ ma n jẹ sisopọ lati oke si isalẹ nigbagbogbo.

### Lilo awọn akopọ gbogbogbo lati npmjs.org

Ti ko ba si awọn akopọ kan ninu ibi ipamọ, olupese yoo gbiyanju lati sawari rẹ lati npmjs.org. Ti npmjs.org ko ba ṣiṣẹ, o ma n pese awọn akopọ lati apo iranti ni idibọn wipe ko si awọn akopọ miiran. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Example:**

If you successfully request `express@4.0.1` from this server once, you'll able to do that again (with all it's dependencies) anytime even if npmjs.org is down. But say `express@4.0.0` will not be downloaded until it's actually needed by somebody. And if npmjs.org is offline, this server would say that only `express@4.0.1` (= only what's in the cache) is published, but nothing else.

### Override public packages

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

There's two options here:

1. You want to create a separate **fork** and stop synchronizing with public version.

   Ti o ba fẹ ṣe eyi, o yẹ ki o ṣe ayipada faili iṣeto rẹ ki verdaccio ma ṣe le ma beere awọn ibeere nipa akopọ yii si npmjs mọ rara. Add a separate entry for this package to `config.yaml` and remove `npmjs` from `proxy` list and restart the server.

   ```yaml
    packages:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
   ```

   When you publish your package locally, **you should probably start with version string higher than existing one**, so it won't conflict with existing package in the cache.

2. O fẹ lati lo ẹya ti ara rẹ fun igba diẹ, ṣugbọn pada si ti gbogbogbo ni kete ti o ba ti wa ni imudojuiwọn.

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. For example, if a public package has version 0.1.2, you can upload `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   This way your package will be used until its original maintainer updates his public package to `0.1.3`.




## Security

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recomendations.

### Package Access

By default all packages are you publish in Verdaccio are accessible for all public, we totally recommend protect your registry from external non authorized users updating `access` property to `$authenticated`.

```yaml
  packages:
    '@my-company/*':
      access: $authenticated
      publish: $authenticated
    '@*/*':
      access: $authenticated
      publish: $authenticated
    '**':
      access: $authenticated
      publish: $authenticated
   ```

In that way, **nobody will take advance of your registry unless is authorized and private packages won't be displayed in the User Interface**.

## Olupese

### Awọn isopọ to ni Aabo

Lilo ** HTTPS** jẹ igbaniyanju to wọpọ, fun idi eyi a ṣe igbaniyanju lati ka abala [SSL](ssl.md) lati mu ki Verdaccio ni aabo tabi lilo HTTPS [alayipada aṣoju ikọkọ](reverse-proxy.md) lori ti Verdaccio.

### Awọn aami to ti n Jotan

Ni `verdaccio@3.x` awọn aami naa ko kin ni ọjọ ijotan. Fun idi eyi a ṣafihan ẹya ara JWT ninu `verdaccio@4.x` tokan [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

```yaml
security:
  api:
    jwt:
      sign:
        expiresIn: 15d
        notBefore: 0
  web:
    sign:
      expiresIn: 7d
```

**Lilo iṣeto yii yoo ṣe atẹmọlẹ eto ti lọwọlọwọ yii atipe iwọ yoo le ṣakoso iye igba ti aami naa yoo fi wa laye**.

Lilo JWT tun n mu atunṣe ba iṣẹ naa pẹlu awọn ohun elo ifasẹsi, eto atijọ naa yoo ṣe atupalẹ akojọ ati afọwọsi awọn iwe-eri ninu ibeere kọọkan, nigbati JWT yoo gbarale ibuwọlu aami naa ni yiyago fun ibori fun ohun elo naa.

Gẹgẹbi akọsilẹ ẹgbẹ kan, ni **npmjs aami naa ko kin jotan**.