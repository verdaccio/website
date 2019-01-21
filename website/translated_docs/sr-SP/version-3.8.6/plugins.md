---
id: version-3.8.6-plugins
title: Plugins
original_id: plugins
---
Verdaccio је плугабилна апликација (тежак живот преводиоца...). Може се проширивати на много начина, додавањем нових метода за аутентификацију, додавањем endpoints-а или коришћењем custom storage-а.

> Ако сте заинтересовани да развијете сопствени plugin, прочитајте [development](dev-plugins.md) секцију.

## Коришћење

### Инсталација

```bash
$> npm install --global verdaccio-activedirectory
```

`verdaccio` је sinopia fork и поседује backward compability са плугинима који су компатибилни са `sinopia@1.4.0`. У том случају, инсталација је потпуно иста.

    $> npm install --global sinopia-memory
    

### Конфигурисање

Отворите `config.yaml` фајл и урадите update `auth` секције према следећим упутствима:

Подразумевана конфигурација изгледа овако, јер користимо уграђени `htpasswd` plugin као подразумеван, а који можете зауставити (disable) тако што ћете следеће линије претворити у коментар.

### Auth Plugin Configuration

```yaml
 htpasswd:
    file: ./htpasswd
    #max_users: 1000
```

и заменити их са датим (ако се одлучите да користите `ldap` plugin).

```yaml
auth:
  activedirectory:
    url: "ldap://10.0.100.1"
    baseDN: 'dc=sample,dc=local'
    domainSuffix: 'sample.local'
```

#### Multiple Auth плугини

Технички је изводиво, ако поставите да је редослед плугина важан, услед чега ће се credentials извршити по том поретку.

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

### Middleware Plugin Configuration

Овде ћете наћи пример за подешавање middleware плугина. Сви middleware плугини морају бити дефинисани у **middlewares** namespace.

```yaml
middlewares:
  audit:
    enabled: true
```

> Можете пратити [audit middle plugin](https://github.com/verdaccio/verdaccio-audit) као базични пример.

### Store Plugin Configuration

Ово је пример како подесити storage plugin. Сви middleware плугини морају бити дефинисани у **store** namespace.

```yaml
store:
  memory:
    limit: 1000
```

> Ако дефинишете custom store, својство **storage** у configuration фајлу ће бити игнорисано.

## Традиционални плугини (Legacy plugins)

### Sinopia Plugins

(компатибилни са свим верзијама)

* [sinopia-npm](https://www.npmjs.com/package/sinopia-npm): auth plugin за sinopia који подржава npm registry.
* [sinopia-memory](https://www.npmjs.com/package/sinopia-memory): auth plugin за sinopia који чува кориснике у меморији.
* [sinopia-github-oauth-cli](https://www.npmjs.com/package/sinopia-github-oauth-cli).
* [sinopia-crowd](https://www.npmjs.com/package/sinopia-crowd): auth plugin за sinopia који подржава atlassian crowd.
* [sinopia-activedirectory](https://www.npmjs.com/package/sinopia-activedirectory): Active Directory authentication plugin за sinopia.
* [sinopia-github-oauth](https://www.npmjs.com/package/sinopia-github-oauth): authentication plugin за sinopia2, подржава github oauth web flow.
* [sinopia-delegated-auth](https://www.npmjs.com/package/sinopia-delegated-auth): Sinopia authentication plugin који delegira authentifikaciju за други HTTP URL
* [sinopia-altldap](https://www.npmjs.com/package/sinopia-altldap): Алтернативни LDAP Auth plugin за Sinopia
* [sinopia-request](https://www.npmjs.com/package/sinopia-request): Једноставан и целовит auth-plugin са конфигурацијом за коришћењем екстерних API.
* [sinopia-htaccess-gpg-email](https://www.npmjs.com/package/sinopia-htaccess-gpg-email): Генерише password у htaccess формату, encrypt са GPG и шаље преко MailGun API до корисника.
* [sinopia-mongodb](https://www.npmjs.com/package/sinopia-mongodb): Једноставан и целовит auth-plugin са конфигурацијом за коришћење mongodb database.
* [sinopia-htpasswd](https://www.npmjs.com/package/sinopia-htpasswd): auth plugin за sinopia који подржава htpasswd формат.
* [sinopia-leveldb](https://www.npmjs.com/package/sinopia-leveldb): a leveldb подржан auth plugin за sinopia private npm.
* [sinopia-gitlabheres](https://www.npmjs.com/package/sinopia-gitlabheres): Gitlab authentication plugin за sinopia.
* [sinopia-gitlab](https://www.npmjs.com/package/sinopia-gitlab): Gitlab authentication plugin за sinopia
* [sinopia-ldap](https://www.npmjs.com/package/sinopia-ldap): LDAP auth plugin за sinopia.
* [sinopia-github-oauth-env](https://www.npmjs.com/package/sinopia-github-oauth-env) Sinopia authentication plugin са github oauth web flow.

> Сви sinopia plugins-и, требало би да буду компатибилни са свим будућим верзијама verdaccio-а. Било како било, охрабрујемо наше сараднике да пређу на модерни verdaccio API и да користе префикс као *verdaccio-xx-name*.

## Verdaccio Plugins

(компатибилно од верзије 2.1.x)

### Authorization Plugins

* [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket): Bitbucket authentication plugin за verdaccio.
* [verdaccio-bitbucket-server](https://github.com/oeph/verdaccio-bitbucket-server): Bitbucket Server authentication plugin за verdaccio.
* [verdaccio-ldap](https://www.npmjs.com/package/verdaccio-ldap): LDAP auth plugin за verdaccio.
* [verdaccio-active-directory](https://github.com/nowhammies/verdaccio-activedirectory): Active Directory authentication plugin за verdaccio
* [verdaccio-gitlab](https://github.com/bufferoverflow/verdaccio-gitlab): користи GitLab Personal Access Token за аутентификацију
* [verdaccio-gitlab-ci](https://github.com/lab360-ch/verdaccio-gitlab-ci): Омогућава GitLab CI да authenticate против verdaccio.
* [verdaccio-htpasswd](https://github.com/verdaccio/verdaccio-htpasswd): File plugin за Auth based on htpasswd (ugrađen), за verdaccio
* [verdaccio-github-oauth](https://github.com/aroundus-inc/verdaccio-github-oauth): Github oauth authentication plugin за verdaccio.
* [verdaccio-github-oauth-ui](https://github.com/n4bb12/verdaccio-github-oauth-ui): GitHub OAuth plugin за verdaccio login дугме.

### Middleware Plugins

* [verdaccio-audit](https://github.com/verdaccio/verdaccio-audit): verdaccio plugin за *npm audit* cli support (уграђен) (компатибилан од верзије 3.x)

* [verdaccio-profile-api](https://github.com/ahoracek/verdaccio-profile-api): verdacciо plugin за *npm profile* cli support и *npm profile set password* за *verdaccio-htpasswd* базирану аутентификацију

### Storage Plugins

(компатибилни од верзије 3.x)

* [verdaccio-memory](https://github.com/verdaccio/verdaccio-memory) Storage plugin за хостовање пакета у Memory
* [verdaccio-s3-storage](https://github.com/remitly/verdaccio-s3-storage) Storage plugin за хостовање пакета на **Amazon S3**
* [verdaccio-google-cloud](https://github.com/verdaccio/verdaccio-google-cloud) Storage plugin за хостовање пакета на **Google Cloud Storage**

## Упозорења (Caveats)

> На жалост, сви плугини нису темељно тестирани и може се догодити да неки од њих уопште не раде. Молимо Вас да се јавите власницима плугина ако наиђете на неки проблем.