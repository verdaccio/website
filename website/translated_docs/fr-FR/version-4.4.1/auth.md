---
id: version-4.4.1-authentification
title: Authentification
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

<div id="codefund">''</div>

The client authentification is handled by `npm` client itself. Once you login to the application:

```bash
npm adduser --registry http://localhost:4873
```

Un jeton est généré dans le `npm` fichier de configuration hébergé dans votre répertoire personnel. Pour plus d'informations sur `.npmrc` lire la [documentation officielle](https://docs.npmjs.com/files/npmrc).

```bash
cat .npmrc
registry=http://localhost:5555/
//localhost:5555/:_authToken="secretVerdaccioToken"
//registry.npmjs.org/:_authToken=secretNpmjsToken
```

#### Publication anonyme

`verdaccio` vous permet d'activer la publication anonyme. Pour utiliser cette fonction, vous devez définir correctement votre [accès aux packages](packages.md).

Par exemple :

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

As is described [on issue #212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500) until `npm@5.3.0` and all minor releases **won't allow you publish without a token**.

## Understanding Groups

### The meaning of `$all` and `$anonymous`

As you know *Verdaccio* uses the `htpasswd` by default. That plugin does not implement the methods `allow_access`, `allow_publish` and `allow_unpublish`. Thus, *Verdaccio* will handle that in the following way:

* If you are not logged in (you are anonymous), `$all` and `$anonymous` means exactly the same.
* If you are logged in, `$anonymous` won't be part of your groups and `$all` will match any logged user. A new group `$authenticated` will be added to the list.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**The previous behavior only applies to the default authentication plugin**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio will only set the default groups.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Htpasswd par défaut

Afin de simplifier la configuration, `verdaccio` utilise un plugin basé sur `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

```yaml
auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    #max_users: 1000
```

| Propriété | Type   | Obligatoire | Exemple    | Soutien | Description                                                     |
| --------- | ------ | ----------- | ---------- | ------- | --------------------------------------------------------------- |
| fichier   | chaîne | Oui         | ./htpasswd | tous    | fichier qui héberge les informations d'identification chiffrées |
| max_users | numéro | Non         | 1000       | tous    | définir un nombre limite d'utilisateurs                         |

Si vous décidez d'empêcher un utilisateur de se connecter, vous pouvez définir `max_users: -1`.
