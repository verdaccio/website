---
id: didara julọ
title: "Awọn iṣeṣi to Darajulọ"
---

Itọsọna yii jẹ akojọ ti awọn iṣeṣi to dara julọ ti o jẹ gbigba ati eyi ti a saba maa n gba niyanju fun gbogbo awọn olumulo. Maṣe mu itọsọna yi bi dandan, o le mu diẹ ninu wọn ni ibamu si awọn inilo rẹ.

**Ma se mikan lati dabaa awọn iṣesi to dara julọ pẹlu awujọ Verdaccio naa**.

## Ibi iforukọsilẹ Ikọkọ

You can add users and manage which users can access which packages.

Igbaniyanju wa wipe ki o seto iṣaaju kan fun awọn akojọ ikọkọ rẹ, fun apẹẹrẹ `local-*` or scoped `@my-company/*`, nitoriki gbogbo awọn ohun ikọkọ rẹ le dabi iru eyi: `local-foo`. This way you can clearly separate public packages from private ones.

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

Seranti nigbagbogbo, **aato ti iwọlesi ti akojọ se pataki**, awọn akojọ ma n jẹ sisopọ lati oke si isalẹ nigbagbogbo.

### Using public packages from npmjs.org

If some package doesn't exist in the storage, server will try to fetch it from npmjs.org. If npmjs.org is down, it serves packages from cache pretending that no other packages exist. **Verdaccio ma gba ohun ti o nilo nikan (= ti awọn onibara beere fun)**, ati pe alaye yii ma wa ni apo iranti, nitori ti onibara ba beere nkan kanna ni ẹlẹkeji, o le jẹ pipese lai beere lọwọ npmjs.org fun un.

**Apẹẹrẹ:**

Ti o ba se ibeere fun `express@4.0.1` pẹlu aseyọri lati ọdọ olupese yi lẹẹkan, o ma ni anfani lati ṣe eyi lẹẹkansi (pẹlu gbogbo awọn agbẹkẹle rẹ) nigbakugba ati nigbati npmjs.org ko ba ṣiṣẹ gan. Ṣugbọn ka sọpe `express@4.0.0` ko ni jẹ gbigba lati ayelujara titi ti ẹnikan yoo fi nilo rẹ gangan. Atipe ti npmjs.org ko ba si lori ila, olupese yii yoo sọ pe `express@4.0.1` (= ohun ti o wa ni apo iranti nikan) nikan ni o jẹ titẹjade, ko kin se nkan miiran.

### Override public packages

Ti o ba fẹ lo diẹ ninu awọn akopọ ti gbangba ti ẹya to ti ni ayipada `foo`, o le ṣe atẹjade rẹ si olupese ibilẹ rẹ, nitorina nigbati iru `npm install foo` rẹ, **o ma gbero fifi ti iwọ sori ẹrọ**.

There's two options here:

1. O fẹ ṣẹda **fork** to daduro ati ki o da imuṣiṣẹpọ pẹlu gbogbogbo duro.
    
    If you want to do that, you should modify your configuration file so verdaccio won't make requests regarding this package to npmjs anymore. Se afikun iwọle to daduro fun akopọ yi si `config.yaml` ki o si yọ `npmjs` kuro ninu akojọ `proxy` ki o wa tun olupese bẹrẹ.
    
    ```yaml
    awọn akopọ:
      '@my-company/*':
        access: $all
        publish: $authenticated
        # comment it out or leave it empty
        # proxy:
    ```
    
    Nigbati o ba ṣe atẹjade akopọ rẹ ni ibilẹ, **o yẹ ki o bẹrẹ pẹlu ẹya okun ti o ga ju eyi ti o wa tẹlẹ lọ**, nitori ko ma ba tako akopọ to ti wa ninu apo iranti tẹlẹ.

2. You want to temporarily use your version, but return to public one as soon as it's updated.
    
    Lati le yago fun awọn atako ti ẹya, **o yẹ ki o lo afikun ipari ti iṣaaju agbejade to jẹ akanṣe ti awẹ ẹya tokan**. Fun apẹẹrẹ, ti akopọ gbogbogbo ba jẹ ẹya 0.1.2, o le sagbega si `0.1.3-my-temp-fix`.
    
    ```bash
    npm version 0.1.3-my-temp-fix
    npm --publish --tag fix --registry http://localhost:4873
    ```
    
    Ni ọna yii akopọ rẹ ma jẹ lilo titi ti oulowo olutọju rẹ yoo fi ṣe imudojuiwọn akopọ gbogbogbo ti ara rẹ si `0.1.3`.

## Aabo

Aabo naa bẹrẹ ni ayika rẹ, fun iru ohun bẹ ti a ṣe igbaniyanju patapata lati ka **[10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/)** ki o si tẹle awọn iyanju naa.

### Package Access

Ni atilẹwa gbogbo awọn akojọ ti o tẹ jade ni Verdaccio wa fun gbogbo eniyan lati ri, a ṣe igbaniyanju patapata pe ko dabobo ibi iforukọsilẹ rẹ lati ma jẹ ki awọn olumulo alailaṣẹ lati ita maa ṣe imudojuiwọn`access` ohun-ini si `$authenticated`.

```yaml
  awọn akopọ:
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

Ni ọna yẹn, **ẹnikẹni ki yoo lo anfani  ti ibi iforukọsilẹ rẹ ayafi ti o ba gba aṣẹ atipe awọn akojọ ikọkọ ki yooo han ni Intafeesi Olumulo naa**.

## Olupese

### Awọn isopọ to ni Aabo

Lilo ** HTTPS ** jẹ igbaniyanju to wọpọ, fun idi eyi a ṣe igbaniyanju lati ka abala [SSL](ssl.md) lati mu ki Verdaccio ni aabo tabi lilo HTTPS [alayipada aṣoju ikọkọ](reverse-proxy.md) lori ti Verdaccio.

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

As a side note, at **npmjs the token never expires**.