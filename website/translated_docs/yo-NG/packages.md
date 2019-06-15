---
id: awọn akopọ
title: "Iwọlesi Akopọ"
---

O jẹ oriṣi awọn idina ti o fayegba tabi ṣe idena wiwọle si ibi ipamọ ibilẹ ti o da lori pato awọn ilana kan.

Awọn idina aabo wa lori awọn ejika ti ohun elo ti a n lo, nipa atilẹwa `verdaccio` n samulo [htpasswd plugin](https://github.com/verdaccio/verdaccio-htpasswd). Ti o ba lo ohun elo to yatọ ihuwasi naa le yatọ. Ohun elo atilẹwa ko kin bojuto `allow_access` ati `allow_publish` funrarẹ, o n lo ipadabọsi ti abẹle to ba lọ jẹpe ohun elo naa ko ti ṣetan fun un.

Fun alaye siwaju sii nipa awọn igbanilaaye lọ si [abala sise ifasẹsi ninu wiki naa](auth.md).

### Ilo

```yalm
packages:
  # scoped packages
  '@scope/*':
    access: $all
    publish: $all
    proxy: server2

  'private-*':
    access: $all
    publish: $all
    proxy: uplink1

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    access: $all
    publish: $all
    proxy: uplink2
```

ti ikankan ko ba jẹ yiyan ni pato, ohun ti atilẹwa ma si wa nibẹ

```yaml
packages:
  '**':
    access: $all
    publish: $authenticated
```

Akojọ ti awọn ẹgbẹ abẹle n sakoso nipasẹ `verdaccio` ni wọnyii:

```js
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous'
```

Gbogbo awọn olumulo ma n gba gbogbo awọn igbanilaaye naa ni olominira ti alainidamọ tabi ti kii ṣe bẹ awọn ẹgbẹ ti o jẹ pipese nipasẹ ohun elo naa, nitori ti `htpasswd` ba da orukọ olumulo pada gẹgẹbi ẹgbẹ kan. Fun apẹẹrẹ, ti o ba wọle bi `npmUser` akojọ awọn ẹgbẹ yoo wa bẹ.

```js
// groups without '$' are going to be deprecated eventually
'$all', '$anonymous', '@all', '@anonymous', 'all', 'undefined', 'anonymous', 'npmUser'
```

Ti o ba fẹ lati dabobo pato eto awọn akopọ kan labẹ ẹgbẹ rẹ, o nilo lati ṣe nkan bi eleyi. Jẹ ki a lo `Regex` ti o bo gbogbo awọn akopọ `npmuser-` ti iṣaaju. A ṣe igbaniyanju nipa lilo eto iṣaaju fun awọn akopọ rẹ, ni ọna yii o ma rọrun lati dabobo wọn.

```yaml
packages:
  'npmuser-*':
    access: npmuser
    publish: npmuser
```

Se atunbẹrẹ `verdaccio` ati ninu kọnsolu rẹ gbiyanju lati fi `npmuser-core` sori ẹrọ.

```bash
$ npm install npmuser-core
npm install npmuser-core
npm ERR! code E403
npm ERR! 403 Forbidden: npmuser-core@latest

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/user/.npm/_logs/2017-07-02T12_20_14_834Z-debug.log
```

O le sayipada awọn ihuwasi to ti wa tẹlẹ nipa lilo ifasẹsi ohun elo to yatọ. `verdaccio` kan ma n sayẹwo boya olumulo naa ti o gbiyanju lati wọle si tabi ṣagbejade pato akopọ kan jẹ ara ẹgbẹ ti o yẹ.

#### Seto awọn akopọ ọlọpọ

Ṣiṣagbekalẹ awọn ẹgbẹ ọlọpọ iwọle jẹ irọrun, kan ṣagbekalẹ wọn pẹlu alafo funfun kan laarin wọn.

```yaml
  'company-*':
    access: admin internal
    publish: admin
    proxy: server1
  'supersecret-*':
    access: secret super-secret-area ultra-secret-area
    publish: secret ultra-secret-area
    proxy: server1
```

#### Didena wiwọle si iṣeto ti awọn akojọ

Ti o ba fẹ lati dènà wiwọle/atẹjade si pato ẹgbẹ ti awọn akojọ kan. Sa ma ṣeto `access` ati `publish`.

```yaml
packages:
  'old-*':
  '**':
    access: $all
    publish: $authenticated
```

#### Didena ṣiṣe aṣoju ikọkọ ti eto pato awọn akojọ kan

O le fẹ dènà ọkan tabi ọpọlọpọ awọn akojọ lati sawari lati awọn ibi ipamọ latọna jijin., sugbọn, ni bakanna, fayegba awọn ẹlomiran lati wọle si awọn orisirisi *uplinks*.

Jẹ ki a wo apẹẹrẹ wọnyii:

```yaml
packages:
  'jquery':
    access: $all
    publish: $all
  'my-company-*':
    access: $all
    publish: $authenticated
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

Jẹ ki a ṣe apejuwe ohun ti a fẹ pẹlu apẹẹrẹ oke yii:

* Mo fẹ lati gbalejo igbarale `jquery` ti ara mi ṣugbọn mo nilo lati yago fun ṣiṣe aṣoju ikọkọ rẹ.
* Mo fẹ ki gbogbo awọn igbarale ti o ni ibaamu pẹlu `my-company-*` ṣugbọn mo nilo lati yago fun ṣiṣe aṣoju ikọkọ qọn.
* Mo fẹ ki gbogbo awọn igbarale ti o wa ni iwoye `my-local-scope` scope ṣugbọn mo nilo lati yago fun ṣiṣe aṣoju ikọkọ wọn.
* Mo fẹ ki ṣe aṣoju ikọkọ wa fun gbogbo awọn igbarale yoku.

Lọ **mọ pe aṣẹ ti awọn itumọ awọn akopọ rẹ jẹ pataki ati ki o ma lo wildcard nigbagbogbo**. Nitori ti o ko ba se afikun rẹ `verdaccio` yoo se afikun rẹ fun ẹ atipe o ma kan ọna ti awọn igbarale rẹ jẹ yiyanju si.

#### Ṣiṣe aitẹjade Awọn akopọ

Ohun ini `publish` naa n mojuto awọn igbanilaaye fun `npm publish` ati `npm unpublish`. Ṣugbọn, ti o ba fẹ lati wa ni pato, o le lo ohun ini `unpublish` naa ni abala iwọle akopọ rẹ, fun apẹẹrẹ:

```yalm
packages:
  'jquery':
    access: $all
    publish: $all
    unpublish: root
  'my-company-*':
    access: $all
    publish: $authenticated
    unpublish: 
  '@my-local-scope/*':
    access: $all
    publish: $authenticated
    # unpublish: property commented out
  '**':
    access: $all
    publish: $authenticated
    proxy: npmjs
```

Ninu apẹẹrẹ titẹlẹ, ihuwasi naa yoo jẹ jijuwe:

* gbogbo awọn olumulo le ṣe atẹjade akopọ `jquery`, ṣugbọn olumulo `root` nikan ni yoo ni anfani lati ṣe aitẹjade eyikeyi ti ẹya.
* awọn olumulo to ni ifasẹsi nikan ni o le ṣe atẹjade awọn akopọ `my-company-*`, sugbọn ** ko si aaye fun ẹnikẹni lati aitẹjade wọn**.
* Ti `unpublish` ba ti jẹ sisọ jade, iwọle naa yoo jẹ fifọwọsi tabi kikọ nipasẹ agbekalẹ `publish` naa.

### Configuration

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Ohun ini    | Iru     | Ti o nilo | Apẹẹrẹ         | Atilẹyin | Apejuwe                                                           |
| ----------- | ------- | --------- | -------------- | -------- | ----------------------------------------------------------------- |
| iwọle       | okun    | Rara      | $all           | gbogbo   | seto awọn ẹgbẹ ti aaye wa fun lati wọle si akopọ naa              |
| atẹjade     | okun    | Rara      | $authenticated | gbogbo   | seto awọn ẹgbẹ ti aaye wa fun lati wọle se atẹjade                |
| aṣoju ikọkọ | okun    | Rara      | npmjs          | gbogbo   | se adinku awọn iwa jade fun pato uplink kan                       |
| ibi ipamọ   | boolean | Rara      | okun           | `>v4` | o n ṣẹda ẹka foda kan ninu foda ibi ipamọ fun ọkọọkan iwọle akopọ |

> A ṣafihan pe a ṣe igbaniyanju lati ma se lo **allow_access**/**allow_publish** ati **proxy_access** rara mọ, adinku ti ba iwulo wọn atipe wọn ma jẹ yiyọ kuro laipẹ, jọwọ lo ẹya kukuru ti ọkọọkan wọn (**access**/**publish**/**proxy**).