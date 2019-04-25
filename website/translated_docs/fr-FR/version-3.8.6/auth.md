---
id: version-3.8.6-authentification
title: Authentification
original_id: authentification
---

The authentification is tied to the auth [plugin](plugins.md) you are using. The package restrictions also is handled by the [Package Access](packages.md).

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

Comme décrit [ dans le cas N°212](https://github.com/verdaccio/verdaccio/issues/212#issuecomment-308578500)jusqu'à`npm@5.3.0`et dans toutes les versions mineurs ** vous ne serez pas autorisés à publier sans jeton**. Cependant `yarn` n'a pas une telle limitation.

## Htpasswd par défaut

Afin de simplifier la configuration, `verdaccio` utilise un plugin basé sur `htpasswd`. A partir de la version 3.0.x, le [ plugin externe ](https://github.com/verdaccio/verdaccio-htpasswd) est utilisé par défaut. La version v2.x de ce paquet contient toujours la version intégrée de ce plugin.

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