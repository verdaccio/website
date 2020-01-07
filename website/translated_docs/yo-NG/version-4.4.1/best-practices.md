---
id: version-4.4.1-best
title: Awọn iṣeṣi to Darajulọ
original_id: didara julọ
---

Itọsọna yii jẹ akojọ ti awọn iṣeṣi to dara julọ ti o jẹ gbigba ati eyi ti a saba maa n gba niyanju fun gbogbo awọn olumulo. Maṣe mu itọsọna yi bi dandan, o le mu diẹ ninu wọn ni ibamu si awọn inilo rẹ.

<div id="codefund">''</div>

**Feel free to suggest your best practices with the Verdaccio community**.

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

Always remember, **the order of packages access is important**, packages are mached always top to bottom.

### Lilo awọn akopọ gbogbogbo lati npmjs.org

Ti ko ba si awọn akopọ kan ninu ibi ipamọ, olupese yoo gbiyanju lati sawari rẹ lati npmjs.org. Ti npmjs.org ko ba ṣiṣẹ, o ma n pese awọn akopọ lati apo iranti ni idibọn wipe ko si awọn akopọ miiran. **Verdaccio will download only what's needed (= requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Apẹẹrẹ:**

Ti o ba se ibeere fun `express@4.0.1` pẹlu aseyọri lati ọdọ olupese yi lẹẹkan, o ma ni anfani lati ṣe eyi lẹẹkansi (pẹlu gbogbo awọn agbẹkẹle rẹ) nigbakugba ati nigbati npmjs.org ko ba ṣiṣẹ gan. Ṣugbọn ka sọpe `express@4.0.0` ko ni jẹ gbigba lati ayelujara titi ti ẹnikan yoo fi nilo rẹ gangan. Atipe ti npmjs.org ko ba si lori ila, olupese yii yoo sọ pe `express@4.0.1` (= ohun ti o wa ni apo iranti nikan) nikan ni o jẹ titẹjade, ko kin se nkan miiran.

### Fagbara bori awọn akopọ gbogbogbo

If you want to use a modified version of some public package `foo`, you can just publish it to your local server, so when your type `npm install foo`, **it'll consider installing your version**.

Awọn aṣayan meji lo wa nibi:

1. You want to create a separate **fork** and stop synchronizing with public version.

   Ti o ba fẹ ṣe eyi, o yẹ ki o ṣe ayipada faili iṣeto rẹ ki verdaccio ma ṣe le ma beere awọn ibeere nipa akopọ yii si npmjs mọ rara. Se afikun iwọle to daduro fun akopọ yi si `config.yaml` ki o si yọ `npmjs` kuro ninu akojọ `proxy` ki o wa tun olupese bẹrẹ.

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

   In order to avoid version conflicts, **you should use a custom pre-release suffix of the next patch version**. Fun apẹẹrẹ, ti akopọ gbogbogbo ba jẹ ẹya 0.1.2, o le sagbega si `0.1.3-my-temp-fix`.

   ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
   ```

   Ni ọna yii akopọ rẹ ma jẹ lilo titi ti oulowo olutọju rẹ yoo fi ṣe imudojuiwọn akopọ gbogbogbo ti ara rẹ si `0.1.3`.




## Aabo

The security starts in your environment, for such thing we totally recommend read **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** and follow the recommendation.

### Iwọlesi Akopọ

Ni atilẹwa gbogbo awọn akojọ ti o tẹ jade ni Verdaccio wa fun gbogbo eniyan lati ri, a ṣe igbaniyanju patapata pe ko dabobo ibi iforukọsilẹ rẹ lati ma jẹ ki awọn olumulo alailaṣẹ lati ita maa ṣe imudojuiwọn`access` ohun-ini si `$authenticated`.

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

### Secured Connections

Using **HTTPS** is a common recomendation, for such reason we recommend read the [SSL](ssl.md) section to make Verdaccio secure or using a HTTPS [reverse proxy](reverse-proxy.md) on top of Verdaccio.

### Expiring Tokens

In `verdaccio@3.x` the tokens have no expiration date. For such reason we introduced in the next `verdaccio@4.x` the JWT feature [PR#896](https://github.com/verdaccio/verdaccio/pull/896)

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

**Using this configuration will override the current system and you will be able to control how long the token will live**.

Lilo JWT tun n mu atunṣe ba iṣẹ naa pẹlu awọn ohun elo ifasẹsi, eto atijọ naa yoo ṣe atupalẹ akojọ ati afọwọsi awọn iwe-eri ninu ibeere kọọkan, nigbati JWT yoo gbarale ibuwọlu aami naa ni yiyago fun ibori fun ohun elo naa.

As a side note, at **npmjs the token never expires**.
