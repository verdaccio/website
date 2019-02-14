---
id: version-3.8.6-plugins
title: Wtyczki
original_id: wtyczki
---
Verdaccio is an plugabble aplication. It can be extended in many ways, either new authentication methods, adding endpoints or using a custom storage.

> Jeśli jesteś zainteresowany stworzeniem swojej własnej wtyczki, przeczytaj sekcję dotyczącą [programowania](dev-plugins.md).

## Użycie

### Instalacja

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` as a sinopia fork it has backward compability with plugins that are compatible with `sinopia@1.4.0`. In such case the installation is the same.

    $> npm install --global sinopia-memory
    

### Konfiguracja

Otwórz plik `config.yaml` i zaktualizuj sekcję `auth` następująco:

Domyślna konfiguracja wygląda tak, ponieważ domyślnie używamy wbudowanej wtyczki `htpasswd`, którą można wyłączyć jedynie poprzez komentowanie następujących wierszy.

### Auth Plugin Configuration

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

i zastąpienie ich (w przypadku, gdy zdecydujesz się użyć wtyczki `ldap`).

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Multiple Auth plugins

Jest to technicznie możliwe, nadając ważność kolejności wtyczek, ponieważ kwalifikacje zostaną rozstrzygnięte w kolejności.

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

### Konfiguracja wtyczki oprogramowania pośredniego

This is an example how to set up a middleware plugin. All middleware plugins must be defined in the **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> Możesz uznać [środkową wtyczkę kontroli](https://github.com/verdaccio/verdaccio-audit) jako przykład podstawowy.

### Przechowuj Konfigurację Wtyczki

This is an example how to set up a storage plugin. All storage plugins must be defined in the **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

> Jeśli zdefiniujesz niestandardowy magazyn, właściwość **storage** w pliku konfiguracyjnym zostanie zignorowana.

## Starsze wtyczki

### Wtyczki Sinopia

(kompatybilne ze wszystkimi wersjami)

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): wtyczka auth dla sinopii obsługujący rejestr npm.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): wtyczka auth dla sinopii, która przechowuje użytkowników w pamięci.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): wtyczka auth dla sinopii obsługująca atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): wtyczka uwierzytelniająca Active Directory dla sinopii.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): wtyczka uwierzytelniająca dla sinopii2, obsługująca przepływ dla sieci github oauth.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): Wtyczka uwierzytelniająca Sinopii, która deleguje uwirzytelnienie do innego HTTP URL
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Alternatywna wtyczka uwierzytelniająca LDAP dla Sinopii
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): Łatwa i w pełni uwierzytelniająca wtyczka z konfiguracją do korzystania z zewnętrznego API.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Generate password in htaccess format, encrypt with GPG and send via MailGun API to users.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): Łatwa i w pełni autoryzująca wtyczka z konfiguracją do korzystania z bazy danych mongodb.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): i wtyczka autoryzująca dla sinopii obsługująca format htpasswd.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): wspierana przez leveldb wtyczka uwierzytelniająca dla prywatnego npm sinopii.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): wtyczka uwierzytelniająca Gitlab dla sinopii.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): wtyczka uwierzytelniająca Gitlab dla sinopii
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): wtyczka uwierzytelniająca LDAP dla sinopii.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) Sinopia authentication plugin with github oauth web flow.

> All sinopia plugins should be compatible with all future verdaccio versions. Anyhow, we encourage contributors to migrate them to the modern verdaccio API and using the prefix as *verdaccio-xx-name*.

## Verdaccio Plugins

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

## Caveats

> Not all these plugins are been tested continuously, some of them might not work at all. Please if you found any issue feel free to notify the owner of each plugin.