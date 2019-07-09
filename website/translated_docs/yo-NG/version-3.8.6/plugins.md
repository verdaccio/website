---
id: version-3.8.6-plugins
title: Awọn ohun elo
original_id: awọn ohun elo
---

Verdaccio jẹ ohun elo alasomọ. O le se fagun ni ọpọlọpọ awọn ọna, boya awọn ọna ifasẹsi tuntun, sise afikun awọn aaye opin tabi lilo akanṣe ibi ipamọ.

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

### Iṣeto Ohun elo Ifasẹsi

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

#### Awọn ohun elo Ifasẹsi ọlọpọ

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

### Iṣeto Ohun elo Middleware

Eyi jẹ apẹẹrẹ bi o ṣe le seto ohun asomọ middleware kan. Gbogbo awọn ohun asomọ gbọdọ wa ni asọye ninu aaye orukọ **middlewares**.

```yaml
middlewares:
  audit:
    enabled: true
```

> O le tẹle [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) bi apẹẹrẹ ipilẹ.

### Iṣeto Ohun elo Ibi ipamọ

Eyi jẹ apẹẹrẹ bi o ṣe le ṣeto ohun asomọ ibi ipamọ kan. Gbogbo awọn ohun asomọ ibi ipamọ gbọdọ wa ni asọye ni aaye orukọ **store**.

```yaml
store:
  memory:
    limit: 1000
```

> Ti o ba ṣe asọye aṣa ibi ipamọ alakanṣe kan, ohun ini **ibi ipamọ** ninu faili iṣeto naa yoo jẹ fifojufo.

## Awọn ohun elo Ijogun

### Awọn ohun elo Sinopia

(ni ibamu pẹlu awọn ẹya gbogbo)

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): ohun elo ifasẹsi fun sinopia to n ṣe atilẹyin ibi iforukọsilẹ npm kan.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): ohun elo ifasẹsi fun sinopia ti o n se itọju awọn olumulo sinu iranti.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli)。.
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): ohun elo ifasẹsi fun sinopia to n ṣe atilẹyin atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): Active Directory ohun elo ifasẹsi fun sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): ohun elo ifasẹsi fun sinopia2, to n ṣe atilẹyin github oauth web flow.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): Ohun elo ifasẹsi Sinopia ti o n ṣe atunpin ifasẹsi si HTTP URL miran
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Ohun elo ifasẹsi LDAP Miiran fun Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): Ohun elo-ifasẹsi to rọrun ati to kun pẹlu iṣeto lati lo API ita kan.
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

(compatible since 2.1.x)

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

### Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin for *npm audit* cli support (built-in) (compatible since 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin for *npm profile* cli support and *npm profile set password* for *verdaccio-htpasswd* based authentificaton

### Storage Plugins

(compatible since 3.x)

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin to host packages in Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin to host packages **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin to host packages **Google Cloud Storage**

## Awọn akiyesi

> Not all these plugins are been tested continuously, some of them might not work at all. Please if you found any issue feel free to notify the owner of each plugin.