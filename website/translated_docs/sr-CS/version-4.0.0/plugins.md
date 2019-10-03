---
id: version-4.0.0-plugins
title: Plugins
original_id: plugins
---

Verdaccio je plugabilna aplikacija (težak život prevodioca...). Može se proširivati na mnogo načina, dodavanjem novih metoda za autentifikaciju, dodavanjem endpoints-a ili korišćenjem custom storage-a.

There are 4 types of plugins:

* Authentication
* Middleware
* Memorija za skladištenje
* UI Theme

> Ako ste zainteresovani da razvijete sopstveni plugin, pročitajte [development](dev-plugins.md) sekciju.

## Korišćenje

### Instalacija

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` je sinopia fork i poseduje backward compability sa pluginima koji su kompatibilni sa `sinopia@1.4.0`. U tom slučaju, instalacija je potpuno ista.

    $> npm install --global sinopia-memory
    

### Konfigurisanje

Otvorite `config.yaml` fajl i uradite update `auth` sekcije prema sledećim uputstvima:

Podrazumevana konfiguracija izgleda ovako, jer koristimo ugrađeni `htpasswd` plugin kao podrazumevan, a koji možete zaustaviti (disable) tako što ćete sledeće linije pretvoriti u komentar.

### Authentication Configuration

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

i zameniti ih sa datim (ako se odlučite da koristite `ldap` plugin).

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Multiple Authentication plugins

Tehnički je izvodivo, ako postavite da je redosled plugina važan, usled čega će se credentials izvršiti po tom poretku.

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

### Middleware Configuration

Ovde ćete naći primer za podešavanje middleware plugin-a. Svi middleware plugin-i moraju biti definisani u **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> Možete pratiti [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) kao bazični primer.

### Storage Configuration

Ovo je primer kako podesiti storage plugin. Svi middleware plugin-i moraju biti definisani u **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

### Theme Configuration

Verdaccio allows to replace the User Interface with a custom one, we call it **theme**. By default, uses `@verdaccio/ui-theme` that comes built-in, but, you can use something different installing your own plugin.

```bash
<br />$> npm install --global verdaccio-theme-dark

```

> The plugin name prefix must start with `verdaccio-theme`, otherwise the plugin won't load.

You can load only one theme at the time and pass through options if is need it.

```yaml
theme:
  dark:
    option1: foo
    option2: bar
```

## Tradicionalni plugini (Legacy plugins)

### Sinopia Plugins

> If you are relying on any sinopia plugin, remember are deprecated and might no work in the future.

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): auth plugin za sinopia koji podržava npm registry.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): auth plugin za sinopia koji čuva korisnike u memoriji.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): auth plugin za sinopia koji podržava atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): Active Directory authentication plugin za sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): authentication plugin za sinopia2, podržava github oauth web flow.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): Sinopia authentication plugin koji delegira authentifikaciju za drugi HTTP URL
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Alternativni LDAP Auth plugin za Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): Jednostavan i celovit auth-plugin sa konfiguracijom za korišćenjem eksternih API.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Generiše password u htaccess formatu, encrypt sa GPG i šalje preko MailGun API do korisnika.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): Jednostavan i celovit auth-plugin sa konfiguracijom za korišćenje mongodb database.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): auth plugin za sinopia koji podržava htpasswd format.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): a leveldb podržan auth plugin za sinopia private npm.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): Gitlab authentication plugin za sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): Gitlab authentication plugin za sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): LDAP auth plugin za sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) Sinopia authentication plugin sa github oauth web flow.

> Svi sinopia pluginsi, trebalo bi da budu kompatibilni sa svim budućim verzijama verdaccio-a. Bilo kako bilo, ohrabrujemo naše saradnike da pređu na moderni verdaccio API i da koriste prefiks kao *verdaccio-xx-name*.

## Verdaccio Plugins

### Authorization Plugins

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): Bitbucket authentication plugin za verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): Bitbucket Server authentication plugin za verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): LDAP auth plugin za verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): Active Directory authentication plugin za verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): koristi GitLab Personal Access Token za autentifikaciju
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): Omogućava GitLab CI da authenticate protiv verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): File plugin za Auth based on htpasswd (ugrađen), za verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): Github oauth authentication plugin za verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): GitHub OAuth plugin za the verdaccio login dugme.
* [verdaccio-groupnames](https://github.com/deinstapel/verdaccio-groupnames): Plugin to handle dynamic group associations utilizing `$group` syntax. Works best with the ldap plugin.

### Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin za *npm audit* cli support (ugrađen) (kompatibilni od verzije 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacci plugin za *npm profile* cli support i *npm profile set password* za *verdaccio-htpasswd* baziranu autentifikaciju

* [verdaccio-https](https://github.com/honzahommer/verdaccio-https) Verdaccio middleware plugin to redirect to https if x-forwarded-proto header is set

### Storage Plugins

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin za hostovanje paketa u Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin za hostovanje paketa na **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin za hostovanje paketa na **Google Cloud Storage**

## Upozorenja (Caveats)

> Na žalost, svi plugini nisu temeljno testirani i može se dogoditi da neki od njih uopšte ne rade. Molimo Vas da se javite vlasnicima plugin-a ako naiđete na neki problem.