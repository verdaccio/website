---
id: didara julọ
title: "Awọn iṣeṣi to Darajulọ"
---

Itọsọna yii jẹ akojọ ti awọn iṣeṣi to dara julọ ti o jẹ gbigba ati eyi ti a saba maa n gba niyanju fun gbogbo awọn olumulo. Maṣe mu itọsọna yi bi dandan, o le mu diẹ ninu wọn ni ibamu si awọn inilo rẹ.

**Feel free to suggest your best practices to the Verdaccio community**.

## Ibi iforukọsilẹ Ikọkọ

O se afikun awọn olumulo ati ki o ṣakoso irufẹ awọn olumulo ti o le wọle si irufẹ awọn akopọ.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ `local-*` or scoped `@my-company/*`, nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. Ni ọna yii o le ya awọn akopọ gbogbogbo sọtọ gedegede kuro ni ti awọn ti ikọkọ.

    yaml
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

Always remember, **the order of packages access is important**, packages are matched always top to bottom.

### Lilo awọn akopọ gbogbogbo lati npmjs.org

Ti ko ba si awọn akopọ kan ninu ibi ipamọ, olupese yoo gbiyanju lati sawari rẹ lati npmjs.org. Ti npmjs.org ko ba ṣiṣẹ, o ma n pese awọn akopọ lati apo iranti ni idibọn wipe ko si awọn akopọ miiran. **Verdaccio will download only what's needed (requested by clients)**, and this information will be cached, so if client will ask the same thing second time, it can be served without asking npmjs.org for it.

**Apẹẹrẹ:**

If you successfully request `express@4.0.1` from this server once, you'll be able to do it again (with all it's dependencies) anytime even if npmjs.org is down. Ṣugbọn ka sọpe `express@4.0.0` ko ni jẹ gbigba lati ayelujara titi ti ẹnikan yoo fi nilo rẹ gangan. And if npmjs.org is offline, this server would say that only `express@4.0.1` (only what's in the cache) is published, but nothing else.

### Fagbara bori awọn akopọ gbogbogbo

Ti o ba fẹ lo diẹ ninu awọn akopọ ti gbangba ti ẹya to ti ni ayipada `foo`, o le ṣe atẹjade rẹ si olupese ibilẹ rẹ, nitorina nigbati iru `npm install foo` rẹ, **o ma gbero fifi ti iwọ sori ẹrọ**.

Awọn aṣayan meji lo wa nibi:

1. O fẹ ṣẹda **fork** to daduro ati ki o da imuṣiṣẹpọ pẹlu gbogbogbo duro.
    
    Ti o ba fẹ ṣe eyi, o yẹ ki o ṣe ayipada faili iṣeto rẹ ki verdaccio ma ṣe le ma beere awọn ibeere nipa akopọ yii si npmjs mọ rara. Se afikun iwọle to daduro fun akopọ yi si `config.yaml` ki o si yọ `npmjs` kuro ninu akojọ `proxy` ki o wa tun olupese bẹrẹ.
    
    ```yaml
    awọn akopọ:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    Nigbati o ba ṣe atẹjade akopọ rẹ ni ibilẹ, **o yẹ ki o bẹrẹ pẹlu ẹya okun ti o ga ju eyi ti o wa tẹlẹ lọ**, nitori ko ma ba tako akopọ to ti wa ninu apo iranti tẹlẹ.

2. O fẹ lati lo ẹya ti ara rẹ fun igba diẹ, ṣugbọn pada si ti gbogbogbo ni kete ti o ba ti wa ni imudojuiwọn.
    
    Lati le yago fun awọn atako ti ẹya, **o yẹ ki o lo afikun ipari ti iṣaaju agbejade to jẹ akanṣe ti awẹ ẹya tokan**. Fun apẹẹrẹ, ti akopọ gbogbogbo ba jẹ ẹya 0.1.2, o le sagbega si `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
    ```
    
    Ni ọna yii akopọ rẹ ma jẹ lilo titi ti oulowo olutọju rẹ yoo fi ṣe imudojuiwọn akopọ gbogbogbo ti ara rẹ si `0.1.3`.

## Aabo

Aabo naa bẹrẹ ni ayika rẹ, fun iru ohun bẹ ti a ṣe igbaniyanju patapata lati ka **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** ki o si tẹle awọn iyanju naa.

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

That way, **nobody will take advantage of your registry unless it's authorized and private packages won't be displayed in the User Interface**.

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