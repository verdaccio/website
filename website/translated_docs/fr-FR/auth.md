---
id: authentification
title: "Authentification"
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions are also handled by the [Package Access](packages.md).

<div id="codefund">''</div>

Le processus d'authentification du client est géré par `npm` lui-même. Une fois que vous êtes connectés à l'application:

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

`verdaccio` allows you to enable anonymous publish, to achieve that you will need to set up correctly your [packages access](packages.md).

Par exemple :

```yaml
  'my-company-*':
    access: $anonymous
    publish: $anonymous
    proxy: npmjs
```

Comme décrit [ dans le cas N°212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500)jusqu'à`npm@5.3.0`et dans toutes les versions mineurs ** vous ne serez pas autorisés à publier sans jeton**.

## Comprendre les groupes

### La signification de `$all` et `$anonymous`

Comme vous le savez *Verdaccio* utilise le `htpasswd` par défaut. Ce plugin ne met pas en œuvre les méthodes `permettre_accès`, `permettre_publier` and `permettre_non publié`. Ainsi, *Verdaccio* traitera cette question de la manière suivante :

* Si vous n'êtes pas connecté (vous êtes anonyme),`$all` et `$anonymous` signifie exactement la même chose.
* Si vous êtes connecté, `$anonymous` ne feront pas partie de vos groupes et `$all` correspondra à tout utilisateur connecté. Un nouveau groupe `$authenticated` sera ajouté à la liste.

As a takeaway, `$all` **will match all users, independently whether is logged or not**.

**Le comportement précédent ne s'applique qu'au plugin d'authentification par défaut**. If you are using a custom plugin and such plugin implements `allow_access`, `allow_publish` or `allow_unpublish`, the resolution of the access depends on the plugin itself. Verdaccio ne définira que les groupes par défaut.

Let's recap:

* **logged**: `$all`, `$authenticated`, + groups added by the plugin
* **anonymous (logged out)**: `$all` and `$anonymous`.

## Htpasswd par défaut

In order to simplify the setup, `verdaccio` uses a plugin based on `htpasswd`. Since version v3.0.x the `verdaccio-htpasswd` plugin is used by default.

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

In case you decide to not allow users to sign up, you can set `max_users: -1`.