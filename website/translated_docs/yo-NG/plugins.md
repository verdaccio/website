---
id: awọn ohun elo
title: "Awọn ohun elo"
---

Verdaccio jẹ ohun elo alasomọ. O le se fagun ni ọpọlọpọ awọn ọna, boya awọn ọna ifasẹsi tuntun, sise afikun awọn aaye opin tabi lilo akanṣe ibi ipamọ.

Oriṣi awọn asomọ mẹrin lo wa:

* Ifasẹsi
* Middleware
* Ibi ipamọ
* Akori UI

> Ti o ba nifẹ lati se agbedide asomọ ti ara rẹ, ka [abala](dev-plugins.md) agbedide.

## Ilo

### Ifi sori ẹrọ

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` gẹgẹ bi ẹya ti o wa lati sinopia o ni ibasisẹpọ ẹlẹyin pẹlu awọn asomọ ti o ni ibasisẹpọ pẹlu `sinopia@1.4.0`. Ni iru eyi ifi sori ẹrọ na jẹ nkan kanna.

    $> npm install --global sinopia-memory
    

### Iṣeto

Sii faili `config.yaml` ki o si ṣe imudojuiwọn abala `auth` naa bi atẹle yi:

Iṣeto atilẹwa naa dabi iru eyi, nitoripe a lo ohun elo alakọmọ `htpasswd` ni atilẹwa pe ki o le yọ kuro nipa yiyọ awọn ila wọnyi.

### Iṣeto Ifasẹsi

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

ati rirọpo wọn pẹlu (toba sẹlẹ pe o pinnu lati lo ohun elo `ldap`.

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Awọn ohun elo Ifasẹsi ọlọpọlọpọ

Eyi ṣeeṣe pẹlu ọgbọn, ṣiṣe aṣẹ ohun elo naa ni pataki, gẹgẹbi awọn iwe ẹri naa yoo ṣe jẹ yiyanju lẹsẹẹsẹ.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    #max_users: 1000
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

### Iṣeto Middleware

Eyi jẹ apẹẹrẹ bi o ṣe le seto ohun asomọ middleware kan. Gbogbo awọn ohun asomọ gbọdọ wa ni asọye ninu aaye orukọ **middlewares**.

```yaml
middlewares:
  audit:
    enabled: true
```

> O le tẹle [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) bi apẹẹrẹ ipilẹ.

### Iṣeto Ibi ipamọ

Eyi jẹ apẹẹrẹ bi o ṣe le ṣeto ohun asomọ ibi ipamọ kan. Gbogbo awọn ohun asomọ ibi ipamọ gbọdọ wa ni asọye ni aaye orukọ **store**.

```yaml
store:
  memory:
    limit: 1000
```

### Iṣeto Akori

Verdaccio n gbanilaaye lati rọpo Intafeesi olumulo pẹlu eyi to jẹ akanṣe, a n pe ni **akori**. Ni atilẹwa, o n lo `@verdaccio/ui-theme` ti o ba wa lati ilẹ, ṣugbọn, o le lo ohun ti o yatọ lati fi ohun asomọ ti ara rẹ sori ẹrọ.

```bash
<br />$> npm install --global verdaccio-theme-dark

```

> Orukọ iṣaaju ohun asomọ naa gbọdọ bẹrẹ pẹlu `verdaccio-theme`, bibẹkọ ohun asomọ naa koni ṣiṣẹ.

O le lo akori kan ṣoṣo ni akoko kan ati ki o kọja laarin awọn aṣayan ti o ba nilo rẹ.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

## Awọn ohun elo Ijogun

### Awọn ohun elo Sinopia

> Ti o ba ni igbarale lori eyikeyi ohun elo sinopia kankan, ranti pe adinku ti ba iwulo wọn atipe wọn le ma sisẹ mọ lọjọ iwaju.

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): ohun elo ifasẹsi fun sinopia to n ṣe atilẹyin ibi iforukọsilẹ npm kan.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): ohun elo ifasẹsi fun sinopia ti o n se itọju awọn olumulo sinu iranti.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli)。.
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): ohun elo ifasẹsi fun sinopia to n ṣe atilẹyin atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): Active Directory authentication plugin for sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): authentication plugin for sinopia2, supporting github oauth web flow.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): Sinopia authentication plugin that delegates authentication to another HTTP URL
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Alternate LDAP Auth plugin for Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): An easy and fully auth-plugin with configuration to use an external API.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Generate password in htaccess format, encrypt with GPG and send via MailGun API to users.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): An easy and fully auth-plugin with configuration to use a mongodb database.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): auth plugin for sinopia supporting htpasswd format.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): a leveldb backed auth plugin for sinopia private npm.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): Gitlab authentication plugin for sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): Gitlab authentication plugin for sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): LDAP auth plugin for sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) Sinopia authentication plugin with github oauth web flow.

> All sinopia plugins should be compatible with all future verdaccio versions. Anyhow, we encourage contributors to migrate them to the modern verdaccio API and using the prefix as *verdaccio-xx-name*.

## Awọn ohun elo Verdaccio

### Authorization Plugins

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): Bitbucket authentication plugin for verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): Bitbucket Server authentication plugin for verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): LDAP auth plugin for verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): Active Directory authentication plugin for verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): use GitLab Personal Access Token to authenticate
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): Enable GitLab CI to authenticate against verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): Auth based on htpasswd file plugin (built-in) for verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): Github oauth authentication plugin for verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): GitHub OAuth plugin for the verdaccio login button.
* [verdaccio-groupnames](https://github.com/deinstapel/verdaccio-groupnames): Ohun elo lati mojuto awọn ẹgbẹ akojọ alaidurolojukan ti nipa lilo sintasi `$group`. O ma n ṣiṣẹ dara julọ pẹlu ohun elo ldap.

### Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for *npm audit* cli support (built-in) (compatible since 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin for *npm profile* cli support and *npm profile set password* for *verdaccio-htpasswd* based authentificaton

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Ohun elo Verdaccio middleware lati ṣe àtúnjúwe si https ti o ba ṣeto x-forwarded-proto gẹgẹbi akọsori

### Storage Plugins

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin to host packages in Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin to host packages **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin to host packages **Google Cloud Storage**

## Awọn akiyesi

> Ko kin ṣe gbogbo awọn ohun elo asomọ wọnyi ni o n jẹ didanwo nigbagbogbo, diẹ ninu awọn wọn le ma ṣiṣẹ rara. Jọwọ ti o ba ri eyikeyi isoro kankan ma se kọ lati fi to ẹniti to ni ohun elo naa leti.