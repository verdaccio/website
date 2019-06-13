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

O le fẹ dènà ọkan tabi ọpọlọpọ awọn akojọ lati sawari lati awọn ibi ipamọ latọna jijin., Ṣugbọn, ni bakanna, fayegba awọn ẹlomiran lati wọle si awọn orisirisi *uplinks*.

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

The property `publish` handle permissions for `npm publish` and `npm unpublish`. But, if you want to be more specific, you can use the property `unpublish` in your package access section, for instance:

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

In the previous example, the behaviour would be described:

* all users can publish the `jquery` package, but only the user `root` would be able to unpublish any version.
* only authenticated users can publish `my-company-*` packages, but **nobody would be allowed to unpublish them**.
* If `unpublish` is commented out, the access will be granted or denied by the `publish` definition.

### Configuration

You can define mutiple `packages` and each of them must have an unique `Regex`. The syntax is based on [minimatch glob expressions](https://github.com/isaacs/minimatch).

| Ohun ini | Iru     | Ti o nilo | Apẹẹrẹ         | Atilẹyin | Apejuwe                                                                   |
| -------- | ------- | --------- | -------------- | -------- | ------------------------------------------------------------------------- |
| access   | okun    | Rara      | $all           | gbogbo   | define groups allowed to access the package                               |
| publish  | okun    | Rara      | $authenticated | gbogbo   | define groups allowed to publish                                          |
| proxy    | okun    | Rara      | npmjs          | gbogbo   | limit look ups for specific uplink                                        |
| storage  | boolean | Rara      | okun           | `>v4` | it creates a subfolder whithin the storage folder for each package access |

> We higlight that we recommend to not use **allow_access**/**allow_publish** and **proxy_access** anymore, those are deprecated and will soon be removed, please use the short version of each of those (**access**/**publish**/**proxy**).